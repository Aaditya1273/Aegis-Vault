;; Mock BTC Token (SIP-010)
;; For Buidl Battle Hackathon Demo Purposes

(impl-trait .aegis-sip10-v3.sip-010-trait)

(define-fungible-token btc-testnet)

(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))

(define-data-var token-name (string-ascii 32) "Bitcoin Testnet")
(define-data-var token-symbol (string-ascii 10) "BTC")
(define-data-var token-uri (optional (string-utf8 256)) none)
(define-data-var token-decimals uint u8)

;; --- SIP-010 Standard Methods ---

(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
    (begin
        (asserts! (is-eq tx-sender sender) err-not-token-owner)
        (ft-transfer? btc-testnet amount sender recipient)
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

(define-read-only (get-balance (who principal))
    (ok (ft-get-balance btc-testnet who))
)

(define-read-only (get-total-supply)
    (ok (ft-get-supply btc-testnet))
)

(define-read-only (get-token-uri)
    (ok (var-get token-uri))
)

;; --- Faucet Mechanism (Hackathon Only) ---

(define-public (faucet)
    (begin
        (ft-mint? btc-testnet u100000000 tx-sender) ;; Mint 1.0 BTC
    )
)
