;; Traits
(use-trait sip-010-trait .aegis-sip10-v3.sip-010-trait)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-insufficient-collateral (err u101))
(define-constant err-unhealthy-position (err u102))
(define-constant err-invalid-amount (err u103))
(define-constant err-not-authorized (err u104))
(define-constant err-no-yield (err u105))

;; Protocol Parameters
(define-constant ltv-ratio u70) ;; 70% Loan-to-Value
(define-constant liquidation-threshold u80) ;; 80% Liquidation threshold

;; Configurable Dependencies
(define-data-var sbtc-token principal .mock-btc-v5)
(define-data-var yield-engine (optional principal) none)

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

;; Use the local Oracle contract for real-time pricing
(define-public (get-sbtc-price)
    (contract-call? .aegis-oracle-v3 get-price)
)

(define-public (calculate-health-factor (user principal))
    (let (
        (vault (get-vault user))
        (price (unwrap! (get-sbtc-price) (ok u0)))
        (collateral-value (/ (* (get collateral vault) price) u100000000))
    )
        (if (is-eq (get debt vault) u0)
            (ok u1000) ;; Infinite health if no debt
            (ok (/ (* collateral-value u100) (get debt vault)))
        )
    )
)

(define-public (calculate-max-mint (collateral uint))
    (let (
        (price (unwrap! (get-sbtc-price) (ok u0)))
        (collateral-value (/ (* collateral price) u100000000))
    )
    (ok (/ (* collateral-value ltv-ratio) u100))
    )
)

;; --- Public Functions ---

;; 1. Deposit Collateral
(define-public (deposit-collateral (amount uint) (token <sip-010-trait>))
    (let (
        (current-vault (get-vault tx-sender))
    )
        (asserts! (is-eq (contract-of token) (var-get sbtc-token)) err-not-authorized)
        (asserts! (> amount u0) err-invalid-amount)
        
        ;; Transfer sBTC to vault
        (try! (contract-call? token transfer amount tx-sender (as-contract tx-sender) none))
        
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
        (max-mint (unwrap-panic (calculate-max-mint (get collateral current-vault))))
    )
    (begin
        (asserts! (> amount u0) err-invalid-amount)
        (asserts! (<= new-debt max-mint) err-insufficient-collateral)
        
        ;; Mint aeUSD to user using local contract reference
        (try! (contract-call? .aegis-aeusd-v5 mint amount tx-sender))
        
        ;; Update Vault
        (map-set vaults { user: tx-sender } (merge current-vault {
            debt: new-debt,
            last-block: block-height
        }))
        
        (ok true)
    )
    )
)

;; 4. Repay aeUSD
(define-public (repay-aeusd (amount uint))
    (let (
        (current-vault (get-vault tx-sender))
        (actual-amount (if (> amount (get debt current-vault)) (get debt current-vault) amount))
    )
    (begin
        (asserts! (> actual-amount u0) err-invalid-amount)
        
        ;; Burn aeUSD
        (try! (contract-call? .aegis-aeusd-v5 burn actual-amount tx-sender))
        
        ;; Update Vault
        (map-set vaults { user: tx-sender } (merge current-vault {
            debt: (- (get debt current-vault) actual-amount),
            last-block: block-height
        }))
        
        (ok true)
    )
    )
)

;; 3. Withdraw Collateral
(define-public (withdraw-collateral (amount uint) (token <sip-010-trait>))
    (let (
        (current-vault (get-vault tx-sender))
        (new-collateral (- (get collateral current-vault) amount))
        (max-mint (unwrap-panic (calculate-max-mint new-collateral)))
    )
        (asserts! (is-eq (contract-of token) (var-get sbtc-token)) err-not-authorized)
        (asserts! (> amount u0) err-invalid-amount)
        (asserts! (>= (get collateral current-vault) amount) err-invalid-amount)
        (asserts! (>= max-mint (get debt current-vault)) err-unhealthy-position)
        
        ;; Transfer sBTC back to user
        (try! (as-contract (contract-call? token transfer amount (as-contract tx-sender) tx-sender none)))
        
        ;; Update Vault
        (map-set vaults { user: tx-sender } (merge current-vault {
            collateral: new-collateral,
            last-block: block-height
        }))
        
        (ok true)
    )
)

;; --- Phase 2: Auto-Deleverage & Repay Logic ---

(define-data-var total-yield-harvested uint u0)
(define-data-var repayment-percentage uint u1) ;; 1% reduction per harvest for demo

;; Internal Harvest Yield Logic
(define-private (harvest-yield-internal (user principal))
    (let (
        (vault (get-vault user))
        (debt (get debt vault))
        (repay-amount (/ (* debt (var-get repayment-percentage)) u100))
    )
        (if (> debt u0)
            (begin
                ;; Update Vault debt directly
                (map-set vaults { user: user } (merge vault {
                    debt: (- debt (if (> repay-amount debt) debt repay-amount)),
                    last-block: block-height
                }))
                ;; Update global stats
                (var-set total-yield-harvested (+ (var-get total-yield-harvested) (if (> repay-amount debt) debt repay-amount)))
                (ok (if (> repay-amount debt) debt repay-amount))
            )
            err-no-yield
        )
    )
)

;; Protocol Repay (Available for authorized yield-harvest bots or the auto-repay engine)
(define-public (protocol-repay (user principal) (amount uint))
    (let (
        (current-vault (get-vault user))
        (actual-repay (if (> amount (get debt current-vault)) (get debt current-vault) amount))
    )
        ;; Check authorization (Owner or authorized Yield Engine)
        (asserts! (or 
            (is-eq tx-sender contract-owner) 
            (is-eq (some contract-caller) (var-get yield-engine))
        ) err-not-authorized)
        
        ;; Update Vault debt
        (map-set vaults { user: user } (merge current-vault {
            debt: (- (get debt current-vault) actual-repay),
            last-block: block-height
        }))
        
        (ok actual-repay)
    )
)

;; Auto-Deleverage Engine: Triggered if health factor drops below a threshold
(define-public (auto-deleverage (user principal))
    (let (
        (health-factor (unwrap-panic (calculate-health-factor user)))
    )
        (asserts! (< health-factor liquidation-threshold) err-not-authorized)
        
        ;; Call local harvest logic
        (harvest-yield-internal user)
    )
)

;; Admin Controls
(define-public (set-repayment-percentage (new-percentage uint))
    (begin
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (var-set repayment-percentage new-percentage)
        (ok true)
    )
)

(define-public (set-yield-engine (new-engine principal))
    (begin
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (var-set yield-engine (some new-engine))
        (ok true)
    )
)

(define-public (update-sbtc-token (new-token principal))
    (begin
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (var-set sbtc-token new-token)
        (ok true)
    )
)

(define-read-only (get-total-yield-harvested)
    (ok (var-get total-yield-harvested))
)
