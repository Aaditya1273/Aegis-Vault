;; Aegis-Vault: Oracle Adapter
;; Integrates with Pyth for real-time pricing.

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-oracle-failed (err u101))

;; Pyth Constants
(define-constant btc-usd-id 0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43)

;; Data Variables
(define-data-var last-price uint u10000000000) ;; Default $100k for safety
(define-data-var last-update uint u0)
(define-data-var use-fallback bool false)

;; --- Public Functions ---

;; Main Price Function
(define-public (get-price)
    (if (var-get use-fallback)
        (ok (var-get last-price))
        (match (contract-call? 'SP1CGXWEAMG6P6FT04W66NVGJ7PQWMDAC19R7PJ0Y.pyth-oracle-v4 get-price btc-usd-id 'SP1CGXWEAMG6P6FT04W66NVGJ7PQWMDAC19R7PJ0Y.pyth-storage-v4)
            price-res (ok (to-uint (get price price-res)))
            error-code (err error-code)
        )
    )
)

;; --- Admin Functions ---

;; Manual price update (Fallback only)
(define-public (update-price (new-price uint))
    (begin
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (var-set last-price new-price)
        (var-set last-update block-height)
        (ok true)
    )
)

;; Toggle Fallback
(define-public (set-fallback (status bool))
    (begin
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (var-set use-fallback status)
        (ok true)
    )
)

;; --- Read-Only Functions ---

(define-read-only (get-last-update)
    (ok (var-get last-update))
)
