;; Aegis-Vault: Core Vault Contract
;; Handles sBTC collateral and aeUSD minting.

;; Traits
(use-trait sbtc-trait 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token.sbtc-token-trait)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant sbtc-token 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token)
(define-constant aeusd-token .aeusd)

;; Errors
(define-constant err-owner-only (err u100))
(define-constant err-insufficient-collateral (err u101))
(define-constant err-unhealthy-position (err u102))
(define-constant err-invalid-amount (err u103))
(define-constant err-not-authorized (err u104))

;; Protocol Parameters
(define-constant ltv-ratio u70) ;; 70% Loan-to-Value
(define-constant liquidation-threshold u80) ;; 80% Liquidation threshold

;; Data Maps
(define-map vaults
    { user: principal }
    {
        collateral: uint,    ;; sBTC amount
        debt: uint,          ;; aeUSD amount
        last-block: uint
    }
)

;; --- Read-Only Functions ---

(define-read-only (get-vault (user principal))
    (default-to { collateral: u0, debt: u0, last-block: u0 } (map-get? vaults { user: user }))
)

;; In Phase 1, we simulate the price as 1:1 or use a placeholder
;; Actual oracle integration happens in Phase 2
(define-read-only (get-sbtc-price)
    (ok u100000000) ;; Placeholder for 1 sBTC = $100,000 (with decimals)
)

(define-read-only (calculate-max-mint (collateral uint))
    (let (
        (price (unwrap-panic (get-sbtc-price)))
        (collateral-value (/ (* collateral price) u100000000))
    )
    (/ (* collateral-value ltv-ratio) u100)
    )
)

;; --- Public Functions ---

;; 1. Deposit Collateral
(define-public (deposit-collateral (amount uint))
    (let (
        (current-vault (get-vault tx-sender))
    )
        (asserts! (> amount u0) err-invalid-amount)
        
        ;; Transfer sBTC to vault
        (try! (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token transfer amount tx-sender (as-contract tx-sender) none))
        
        ;; Update Vault
        (map-set vaults { user: tx-sender } (merge current-vault {
            collateral: (+ (get collateral current-vault) amount),
            last-block: block-height
        }))
        
        (ok true)
    )
)

;; 2. Mint aeUSD
(define-public (mint-aeusd (amount uint))
    (let (
        (current-vault (get-vault tx-sender))
        (new-debt (+ (get debt current-vault) amount))
        (max-mint (calculate-max-mint (get collateral current-vault)))
    )
        (asserts! (> amount u0) err-invalid-amount)
        (asserts! (<= new-debt max-mint) err-insufficient-collateral)
        
        ;; Mint aeUSD to user
        (try! (contract-call? .aeusd mint amount tx-sender))
        
        ;; Update Vault
        (map-set vaults { user: tx-sender } (merge current-vault {
            debt: new-debt,
            last-block: block-height
        }))
        
        (ok true)
    )
)

;; 3. Repay aeUSD (Burn)
(define-public (repay-aeusd (amount uint))
    (let (
        (current-vault (get-vault tx-sender))
        (actual-repay (if (> amount (get debt current-vault)) (get debt current-vault) amount))
    )
        (asserts! (> actual-repay u0) err-invalid-amount)
        
        ;; Burn aeUSD from user
        (try! (contract-call? .aeusd burn actual-repay tx-sender))
        
        ;; Update Vault
        (map-set vaults { user: tx-sender } (merge current-vault {
            debt: (- (get debt current-vault) actual-repay),
            last-block: block-height
        }))
        
        (ok true)
    )
)

;; 4. Withdraw Collateral
(define-public (withdraw-collateral (amount uint))
    (let (
        (current-vault (get-vault tx-sender))
        (new-collateral (- (get collateral current-vault) amount))
        (max-mint (calculate-max-mint new-collateral))
    )
        (asserts! (> amount u0) err-invalid-amount)
        (asserts! (>= (get collateral current-vault) amount) err-invalid-amount)
        (asserts! (>= max-mint (get debt current-vault)) err-unhealthy-position)
        
        ;; Transfer sBTC back to user
        (try! (as-contract (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token transfer amount (as-contract tx-sender) tx-sender none)))
        
        ;; Update Vault
        (map-set vaults { user: tx-sender } (merge current-vault {
            collateral: new-collateral,
            last-block: block-height
        }))
        
        (ok true)
    )
)

;; Phase 2 Bonus Logic (Placeholder for Auto-Repay Hook)
(define-public (protocol-repay (user principal) (amount uint))
    (let (
        (current-vault (get-vault user))
        (actual-repay (if (> amount (get debt current-vault)) (get debt current-vault) amount))
    )
        ;; Only the Auto-Repay contract can call this
        (asserts! (is-eq contract-caller .auto-repay) err-not-authorized)
        
        ;; Update Vault (No burning needed if we assume protocol yield is internal)
        (map-set vaults { user: user } (merge current-vault {
            debt: (- (get debt current-vault) actual-repay),
            last-block: block-height
        }))
        
        (ok actual-repay)
    )
)
