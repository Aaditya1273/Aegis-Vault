;; aeUSD Stablecoin (SIP-010)
;; The stablecoin for the Aegis-Vault protocol.

(impl-trait .sip-010-v1.sip-010-trait)

(define-fungible-token aeusd)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-authorized (err u101))

;; Data Variables
(define-data-var token-name (string-ascii 32) "Aegis USD")
(define-data-var token-symbol (string-ascii 10) "aeUSD")
(define-data-var token-uri (optional (string-utf8 256)) none)
(define-data-var token-decimals uint u6)

;; Authorization: Only the Vault contract can mint/burn
(define-data-var vault-contract principal .vault-v2)

;; --- SIP-010 Functions ---

(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
    (begin
        (asserts! (is-eq tx-sender sender) err-not-authorized)
        (ft-transfer? aeusd amount sender recipient)
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
    (ok (ft-get-balance aeusd user))
)

(define-read-only (get-total-supply)
    (ok (ft-get-supply aeusd))
)

(define-read-only (get-token-uri)
    (ok (var-get token-uri))
)

;; --- Internal Management Functions ---

(define-public (mint (amount uint) (recipient principal))
    (begin
        (asserts! (is-eq tx-sender (var-get vault-contract)) err-not-authorized)
        (ft-mint? aeusd amount recipient)
    )
)

(define-public (burn (amount uint) (owner principal))
    (begin
        (asserts! (is-eq tx-sender (var-get vault-contract)) err-not-authorized)
        (ft-burn? aeusd amount owner)
    )
)

;; Owner-only function to update the vault contract address
(define-public (set-vault-contract (new-vault principal))
    (begin
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (var-set vault-contract new-vault)
        (ok true)
    )
)
