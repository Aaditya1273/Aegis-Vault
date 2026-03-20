;; Aegis-Vault: Oracle Adapter
;; Integrates with Pyth/RedStone for real-time pricing.

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))

;; Data Variables
(define-data-var last-price uint u10000000000) ;; $100,000 in 8 decimals
(define-data-var last-update uint u0)

;; --- Public Functions ---

;; In a real scenario, this would call 'SP1CGXWEAMG6P6FT04W66NVGJ7PQWMDAC19R7PJ0Y.pyth-oracle-v4
(define-public (update-price (new-price uint))
    (begin
        ;; For now, let owner update it or simulate from off-chain
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (var-set last-price new-price)
        (var-set last-update block-height)
        (ok true)
    )
)

;; --- Read-Only Functions ---

(define-read-only (get-price)
    (ok (var-get last-price))
)

(define-read-only (get-last-update)
    (ok (var-get last-update))
)
