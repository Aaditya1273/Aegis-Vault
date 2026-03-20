1. Chain / Network Info (Stacks + Bitcoin for sBTC)
Stacks (where your contracts live):

Testnet RPC: https://api.testnet.hiro.so/
Mainnet RPC: https://api.hiro.so/
Local Node RPC (if you run your own): http://localhost:20443/v2/info
Explorer: https://explorer.hiro.so/ (add ?chain=testnet for testnet)
Network objects (in stacks.js): Use STACKS_TESTNET or STACKS_MAINNET — no Ethereum-style chain ID needed.

Bitcoin (for sBTC peg-in/out):

Users send real BTC (or testnet BTC) to an sBTC deposit address.
Testnet BTC Explorer: https://mempool.space/testnet
Mainnet BTC Explorer: https://mempool.space
Public BTC testnet RPC (if you need to simulate): Use any public node (e.g., via Blockstream or run bitcoind).
→ sBTC bridge handles the peg automatically — you don’t need BTC RPC in your contracts.

sBTC Token Details:

SIP-010 fungible token (same interface as any Stacks token).
Mainnet sBTC token contract: SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token
Other core contracts: sbtc-deposit, sbtc-registry (Clarinet auto-adds them).

2. 
Topic                                      Direct Link
Main Stacks Docs                           https://docs.stacks.co/Developer
Quickstart                                 https://docs.stacks.co/get-started/developer-quickstart
Clarity Language Reference                 https://docs.stacks.co/docs/clarity + https://book.clarity-lang.org/
sBTC Integration in Clarinet               https://docs.stacks.co/build/clarinet-integrations/sbtc-integration
Pyth Oracle (BTC/USD)                      https://docs.pyth.network/price-feeds/core/use-real-time-data/pull-integration/stacks
stacks.js (frontend)                       https://stacks.js.org/
Clarinet GitHub                            https://github.com/stx-labs/clarinet
PoX / Stacking Contracts                   https://docs.stacks.co/cookbook/clarity/example-contracts/proof-of-transfer-pox
Wallets & Account Abstraction              https://docs.stacks.co/learn/network-fundamentals/wallets-and-accounts
Explorer                                   https://explorer.hiro.so/



3. 

4. Full “What You Need to Build” Checklist
Tools to Install (5 minutes)

Clarinet: brew install clarinet (or npm)
VS Code + “Clarity – Stacks Labs” extension
Leather Wallet (browser extension) → for testnet testing
Node.js (for frontend + tests)

Step-by-Step Setup (Copy-Paste Ready)

Create ProjectBashclarinet new aegis-vault
cd aegis-vault
Add Official sBTC (auto-funding in devnet)
Edit Clarinet.toml and run:Bashclarinet requirements add SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-deposit
Clarinet now automatically includes sbtc-token, sbtc-registry, etc. and gives you free test sBTC in local devnet.

Add Pyth Oracle for Auto-Deleverage (BTC/USD price)
Pyth contract (works on both testnet & mainnet):
SP1CGXWEAMG6P6FT04W66NVGJ7PQWMDAC19R7PJ0Y.pyth-oracle-v4
BTC/USD price ID: 0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43
Example Clarity call (copy into your vault contract):clarity(contract-call? 'SP1CGXWEAMG6P6FT04W66NVGJ7PQWMDAC19R7PJ0Y.pyth-oracle-v4
  get-price
  0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43
  'SP1CGXWEAMG6P6FT04W66NVGJ7PQWMDAC19R7PJ0Y.pyth-storage-v4)
Frontend fetches VAA from Hermes client and passes it in the transaction.

Write Your Contracts
Vault logic (deposit sBTC → mint aeUSD)
Auto-deleverage engine (uses Pyth + PoX rewards)
PoX reward harvesting (call pox-4 wrapper or system contract)

Frontend (One-Click UX)
Use @stacks/connect + Leather wallet
Account abstraction = sponsored transactions or session signatures (no seed phrases for users)

Testing & Deployment
Local test: clarinet test
Deploy to testnet: clarinet deployments apply --testnet
Live demo in <10 seconds: BTC peg-in → sBTC → mint aeUSD