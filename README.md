# Aegis-Vault

**Decentralized, non-custodial credit protocol on Stacks**  
Mint yield-bearing stablecoin (aeUSD) against sBTC collateral — where the loan **auto-repays itself** using Stacks Proof-of-Transfer (PoX) rewards.

## Introduction

Aegis-Vault unlocks the full potential of Bitcoin as productive capital. Bitcoin holders can now access instant liquidity (aeUSD stablecoin) without selling their BTC or making manual repayments. By leveraging sBTC as collateral and native PoX yield, the protocol turns "lazy" Bitcoin into self-sustaining, debt-repaying money — all while staying fully non-custodial and Bitcoin-secured.

Built for the **Buidl Battle: The Bitcoin Builders Tournament** on Stacks.

- **Live Demo**: [Link if deployed]
- **GitHub Repo**: [Link]
- **Pitch Video**: [YouTube/Vimeo link, <5 mins]

## The Problem: The HODLer's Dilemma

Bitcoin is the world's hardest money — but it's also the laziest.  
- Holders want to **HODL forever** but often need liquidity for real-world use.  
- Traditional loans force selling BTC, monthly payments, or risky custodians.  
- Existing DeFi lending on other chains suffers from hacks, high fees, and poor Bitcoin integration.  
- Result: ~$2 Trillion in BTC sits idle, earning nothing while users miss opportunities.

Bitcoin needs a way to **work harder** without compromising security or sovereignty.

## The Solution: Self-Repaying Loans Powered by PoX

Aegis-Vault is a **decentralized credit protocol** on Stacks:

1. User pegs BTC → sBTC (trustless via sBTC bridge).  
2. Deposits sBTC as collateral → mints aeUSD (stablecoin pegged to USD).  
3. **No monthly payments** — accrued PoX rewards (Stacks' native yield from Proof-of-Transfer) automatically repay the debt over time.  
4. **Auto-Deleverage Engine**: If BTC/USD price drops (via decentralized oracle like RedStone/Pyth), protocol uses incoming PoX rewards to buy back collateral and prevent liquidation cascades.  
5. **One-Click UX** via Stacks Account Abstraction — feels like a modern banking app: "Deposit BTC → Get Dollars."

Collateral remains self-custodial; everything runs on Clarity smart contracts secured by Bitcoin.

## Uniqueness & Differentiation

- **Native PoX-powered auto-repayment** — First protocol to make loans literally pay themselves using Stacks' consensus yield (not external staking or incentives).  
- **sBTC as core collateral** — Directly drives demand for sBTC peg-ins and locks real BTC liquidity into Stacks.  
- **Mathematical security via Clarity** — Decidable language allows formal verification; impossible to have "drainable" bugs like Solidity exploits (Celsius/FTX class failures).  
- **Auto-Deleverage** — Proactive risk management using protocol yield instead of brutal liquidations.  
- **Production-scale ready** — Optional deployment on Stacks Hyper-chains/Subnets for high TPS if needed.

Unlike basic over-collateralized lending (e.g., Aave-style forks), Aegis creates **sustainable, Bitcoin-native yield loops**.

## Why This Wins 1st Place in Buidl Battle

**Perfect alignment with judging criteria & bounties:**

- **Innovation** — Solves HODLer's dilemma creatively with self-repaying mechanics.  
- **Technical Implementation** — Deep Clarity usage, oracle integration, auto-logic, security proofs.  
- **Stacks Alignment** — Heavy leverage of sBTC, PoX, Clarity, account abstraction — textbook ecosystem driver.  
- **User Experience** — Mainstream-friendly one-click flow.  
- **Impact Potential** — Massive sBTC TVL growth, aeUSD liquidity for Stacks DeFi, healthier PoX participation.

**Bounty Sweep Potential**:
- **Most Innovative Use of sBTC** — Creates highest demand (mandatory collateral + yield loop).  
- Strong fit for UX/Institutional themes (account abstraction + Clarity proofs).

Top 3 get Stacks Labs 1:1 + Endowment intros — ideal for turning this into production.

## Technical Highlights

- **sBTC native peg-in/out** in contracts.  
- **Decentralized price oracle** (RedStone/Pyth) for BTC/USD monitoring.  
- **Auto-Deleverage** smart contract logic to use PoX rewards for collateral protection.  
- **Account Abstraction** for seamless onboarding.  
- **Clarity contracts** — verifiable, no reentrancy/overflow risks.

## Business Model (Revenue Engine)

Sustainable from day one:

- **PoX Reward Spread** — Protocol takes ~0.5% of accrued rewards.  
- **Minting Fee** — 0.1% on aeUSD issuance.  
- **Liquidity Partnerships** — aeUSD becomes desirable stablecoin; DEXs/protocols pay to integrate/bridge it.  
- Long-term: Governance token or fees from expanded vaults.

Positions Aegis as a **kingmaker** for Stacks liquidity.

## Pitch Strategy (Founder-Level, Not Hacker-Level)

**Video Structure (<5 mins):**

1. **Hook** (0–15s): "Bitcoin has a $2 Trillion problem: it's lazy money. Aegis-Vault makes Bitcoin work so you don't have to."  
2. **Problem & Demo** (15–90s): Show live BTC → sBTC → aeUSD mint + auto-repay simulation in <10 seconds.  
3. **Vision** (90–120s): "We aren't building a dApp. We're building the Federal Reserve of Bitcoin."  
4. **Proof** (120–180s): Highlight Clarity formal verification ("Mathematically incapable of Celsius/FTX bugs") + sBTC demand impact.  
5. **Call to Action** (end): Ecosystem growth + production roadmap.

This isn't just a hackathon project — it's the launchpad for Bitcoin-native credit at scale.

🚀 Built for Buidl Battle. Let's make Bitcoin productive.
