(impl-trait .aegis-sip10-v3.sip-010-trait)

(define-fungible-token aegis-lp)

(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-authorized (err u101))

(define-data-var token-name (string-ascii 32) "Aegis LP aeUSD/sBTC")
(define-data-var token-symbol (string-ascii 10) "aeLP")
(define-data-var token-uri (optional (string-utf8 256)) none)
(define-data-var token-decimals uint u6)

;; --- Authorization ---
(define-data-var pool-contract (optional principal) none)

(define-public (set-pool-contract (new-pool principal))
    (begin
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (var-set pool-contract (some new-pool))
        (ok true)
    )
)

;; --- SIP-010 Functions ---

(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
    (begin
        (asserts! (is-eq tx-sender sender) err-not-authorized)
        (ft-transfer? aegis-lp amount sender recipient)
    )
)

(define-read-only (get-name)
    (ok (var-get token-name))
)

(define-read-only (get-symbol)
    (ok (var-get token-symbol))
)

(define-read-only (get-decimals)
    (ok (var-get token-decimals))
)

(define-read-only (get-balance (user principal))
    (ok (ft-get-balance aegis-lp user))
)

(define-read-only (get-total-supply)
    (ok (ft-get-supply aegis-lp))
)

(define-read-only (get-token-uri)
    (ok (var-get token-uri))
)

;; --- Mint/Burn (Restricted to Pool) ---

(define-public (mint (amount uint) (recipient principal))
    (begin
        (asserts! (is-eq (some contract-caller) (var-get pool-contract)) err-not-authorized)
        (ft-mint? aegis-lp amount recipient)
    )
)

(define-public (burn (amount uint) (owner principal))
    (begin
        (asserts! (is-eq (some contract-caller) (var-get pool-contract)) err-not-authorized)
        (ft-burn? aegis-lp amount owner)
    )
)
