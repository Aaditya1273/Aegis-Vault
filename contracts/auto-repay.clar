;; Aegis-Vault: Auto-Repay Engine
;; The "Magic" that pays down debt using protocol yield.

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-no-yield (err u101))

;; Data Variables
(define-data-var total-yield-harvested uint u0)
(define-data-var repayment-percentage uint u1) ;; 1% reduction per harvest for demo

;; --- Public Functions ---

;; Harvest Yield (Simulation)
;; In production, this would be triggered by PoX reward distribution
(define-public (harvest-yield (user principal))
    (let (
        (vault (contract-call? .vault get-vault user))
        (debt (get debt vault))
        (repay-amount (/ (* debt (var-get repayment-percentage)) u100))
    )
        (asserts! (> debt u0) err-no-yield)
        
        ;; Trigger repayment in the vault
        (try! (contract-call? .vault protocol-repay user repay-amount))
        
        ;; Update global stats
        (var-set total-yield-harvested (+ (var-get total-yield-harvested) repay-amount))
        
        (ok repay-amount)
    )
)

;; Owner function to adjust repayment velocity (for demo/testing)
(define-public (set-repayment-percentage (new-percentage uint))
    (begin
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (var-set repayment-percentage new-percentage)
        (ok true)
    )
)

;; --- Read-Only Functions ---

(define-read-only (get-total-yield-harvested)
    (ok (var-get total-yield-harvested))
)
