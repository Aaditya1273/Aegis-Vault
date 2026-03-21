Gaps & Issues to Know About
Contracts

oracle.clar is centralized (owner-only price updates). Pyth integration (SP1CGXWEAMG6P6FT04W66NVGJ7PQWMDAC19R7PJ0Y.pyth-oracle-v4) is documented in info.md but not implemented.
auto-repay.clar is a simulation — it reduces debt by a flat percentage per call, not actually triggered by PoX reward events. For the demo this is fine, but it's the core USP so worth flagging.
vault.clar has repay-aeusd still present — the docs say to remove it and replace with auto-repay only, but it's still there. Minor inconsistency with the pitch narrative.
Clarinet.toml lists aeusd-v2 and oracle-v2 as external requirements pointing to the deployer address, but the local contracts are aeusd.clar and oracle.clar — these need to be registered as local contracts too, or the cross-contract calls will fail in devnet.
aeusd.clar uses (define-constant contract-owner tx-sender) — this captures the deployer at deploy time, which is 
correct, but vault-contract is hardcoded to a specific principal. Needs updating post-deploy.


Frontend

Stats are mostly hardcoded fallbacks (142904.22, $1.24B TVL, 0% liquidations) — fine for demo, but the live on-chain reads via getVaultStats are wired up and should work on testnet.
The sponsored: true flag on contract calls means transactions need a fee sponsor — there's no sponsor service set up, so these calls will likely fail unless that's handled.
No withdraw UI exists yet (the contract has withdraw-collateral but no frontend page).
The ecosystem logos on the landing page include Ethereum, Solana, Polygon, Binance — these aren't actually ecosystem partners, just visual filler. Fine for hackathon, but worth noting.