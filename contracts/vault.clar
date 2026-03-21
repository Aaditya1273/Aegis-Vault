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

;; Use the Oracle contract for real-time pricing
(define-read-only (get-sbtc-price)
    (contract-call? .oracle get-price)
)

(define-read-only (calculate-health-factor (user principal))
    (let (
        (vault (get-vault user))
        (price (unwrap-panic (get-sbtc-price)))
        (collateral-value (/ (* (get collateral vault) price) u100000000))
    )
        (if (is-eq (get debt vault) u0)
            u1000 ;; Infinite health if no debt
            (/ (* collateral-value u100) (get debt vault))
        )
    )
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

;; --- Phase 2: Auto-Deleverage & Repay Logic ---

;; Protocol Repay (Called by Auto-Repay contract)
(define-public (protocol-repay (user principal) (amount uint))
    (let (
        (current-vault (get-vault user))
        (actual-repay (if (> amount (get debt current-vault)) (get debt current-vault) amount))
    )
        ;; Check authorization (only auto-repay or authorized bots)
        (asserts! (is-eq contract-caller .auto-repay) err-not-authorized)
        
        ;; Update Vault debt without burning aeUSD (as it's settled by protocol yield)
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
        (health-factor (calculate-health-factor user))
    )
        (asserts! (< health-factor liquidation-threshold) err-not-authorized) ;; Only deleverage if risky
        
        ;; In a real scenario, this would use protocol reserves to buy back debt
        ;; For the demo, we call harvest-yield with a boosted rate
        (contract-call? .auto-repay harvest-yield user)
    )
)
