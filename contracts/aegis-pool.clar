;; Aegis-Vault: AMM Liquidity Pool (aeUSD / sBTC)
;; A constant-product (x * y = k) AMM.

;; Traits
(use-trait sip-010-trait .aegis-sip10-v3.sip-010-trait)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-insufficient-liquidity (err u101))
(define-constant err-invalid-amount (err u102))
(define-constant err-math-overflow (err u103))

;; Traits
(use-trait sip-010-trait .aegis-sip10-v3.sip-010-trait)

;; State
(define-data-var reserve-aeusd uint u0)
(define-data-var reserve-sbtc uint u0)

;; --- Read-Only Functions ---

(define-read-only (get-reserves)
    {
        aeusd: (var-get reserve-aeusd),
        sbtc: (var-get reserve-sbtc)
    }
)

;; Calculate dy given dx (Constant Product: (x + dx) * (y - dy) = x * y)
(define-read-only (get-swap-output (amount-in uint) (reserve-in uint) (reserve-out uint))
    (let (
        (amount-in-with-fee (/ (* amount-in u997) u1000)) ;; 0.3% fee
        (numerator (* amount-in-with-fee reserve-out))
        (denominator (+ reserve-in amount-in-with-fee))
    )
        (if (or (is-eq reserve-in u0) (is-eq reserve-out u0))
            u0
            (/ numerator denominator)
        )
    )
)

;; --- Public Functions ---

;; 1. Add Liquidity
(define-public (add-liquidity (amount-aeusd uint) (amount-sbtc uint) (sbtc-token <sip-010-trait>))
    (let (
        (total-lp (unwrap-panic (contract-call? .aegis-lp-token-v3 get-total-supply)))
        (reserves (get-reserves))
        (lp-to-mint 
            (if (is-eq total-lp u0)
                (+ amount-aeusd amount-sbtc) 
                (let (
                    (share-aeusd (/ (* amount-aeusd total-lp) (get aeusd reserves)))
                    (share-sbtc (/ (* amount-sbtc total-lp) (get sbtc reserves)))
                )
                    (if (< share-aeusd share-sbtc) share-aeusd share-sbtc)
                )
            )
        )
    )
        (asserts! (and (> amount-aeusd u0) (> amount-sbtc u0)) err-invalid-amount)
        
        (try! (contract-call? .aegis-aeusd-v3 transfer amount-aeusd tx-sender (as-contract tx-sender) none))
        (try! (contract-call? sbtc-token transfer amount-sbtc tx-sender (as-contract tx-sender) none))
        
        (var-set reserve-aeusd (+ (get aeusd reserves) amount-aeusd))
        (var-set reserve-sbtc (+ (get sbtc reserves) amount-sbtc))
        (try! (as-contract (contract-call? .aegis-lp-token-v3 mint lp-to-mint tx-sender)))
        (ok lp-to-mint)
    )
)

;; 2. Remove Liquidity
(define-public (remove-liquidity (lp-amount uint) (sbtc-token <sip-010-trait>))
    (let (
        (total-lp (unwrap-panic (contract-call? .aegis-lp-token-v3 get-total-supply)))
        (reserves (get-reserves))
        (share-aeusd (/ (* lp-amount (get aeusd reserves)) total-lp))
        (share-sbtc (/ (* lp-amount (get sbtc reserves)) total-lp))
    )
        (asserts! (> lp-amount u0) err-invalid-amount)
        (asserts! (<= lp-amount total-lp) err-insufficient-liquidity)
        
        (try! (contract-call? .aegis-lp-token-v3 burn lp-amount tx-sender))
        (try! (as-contract (contract-call? .aegis-aeusd-v3 transfer share-aeusd (as-contract tx-sender) tx-sender none)))
        (try! (as-contract (contract-call? sbtc-token transfer share-sbtc (as-contract tx-sender) tx-sender none)))
        
        (var-set reserve-aeusd (- (get aeusd reserves) share-aeusd))
        (var-set reserve-sbtc (- (get sbtc reserves) share-sbtc))
        (ok { aeusd: share-aeusd, sbtc: share-sbtc })
    )
)

;; 3. Swap aeUSD for sBTC
(define-public (swap-aeusd-for-sbtc (amount-in uint) (sbtc-token <sip-010-trait>))
    (let (
        (reserves (get-reserves))
        (amount-out (get-swap-output amount-in (get aeusd reserves) (get sbtc reserves)))
    )
        (asserts! (> amount-in u0) err-invalid-amount)
        (asserts! (< amount-out (get sbtc reserves)) err-insufficient-liquidity)
        
        (try! (contract-call? .aegis-aeusd-v3 transfer amount-in tx-sender (as-contract tx-sender) none))
        (try! (as-contract (contract-call? sbtc-token transfer amount-out (as-contract tx-sender) tx-sender none)))
        
        (var-set reserve-aeusd (+ (get aeusd reserves) amount-in))
        (var-set reserve-sbtc (- (get sbtc reserves) amount-out))
        (ok amount-out)
    )
)

;; 4. Swap sBTC for aeUSD
(define-public (swap-sbtc-for-aeusd (amount-in uint) (sbtc-token <sip-010-trait>))
    (let (
        (reserves (get-reserves))
        (amount-out (get-swap-output amount-in (get sbtc reserves) (get aeusd reserves)))
    )
        (asserts! (> amount-in u0) err-invalid-amount)
        (asserts! (< amount-out (get aeusd reserves)) err-insufficient-liquidity)
        
        (try! (contract-call? sbtc-token transfer amount-in tx-sender (as-contract tx-sender) none))
        (try! (as-contract (contract-call? .aegis-aeusd-v3 transfer amount-out (as-contract tx-sender) tx-sender none)))
        
        (var-set reserve-sbtc (+ (get sbtc reserves) amount-in))
        (var-set reserve-aeusd (- (get reserve-aeusd) amount-out))
        (ok amount-out)
    )
)
