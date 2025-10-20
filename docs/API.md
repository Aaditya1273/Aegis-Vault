# LUMINAUT API Documentation

## Overview

LUMINAUT provides a comprehensive tRPC API for interacting with Web3 wallets, blockchain data, and AI-powered insights.

## Authentication

All API endpoints require a valid wallet address. Authentication is handled via wallet signature verification.

## Wallet Endpoints

### Get Balance

Retrieve native token balance for a specific chain.

\`\`\`typescript
const balance = await trpc.wallet.getBalance.query({
  address: "0x...",
  chainId: 1
});
\`\`\`

**Response:**
\`\`\`typescript
{
  chainId: number;
  chainName: string;
  address: string;
  balance: string;
  usdValue: number;
  lastUpdated: Date;
}
\`\`\`

### Get All Balances

Retrieve balances across all supported chains.

\`\`\`typescript
const balances = await trpc.wallet.getAllBalances.query({
  address: "0x..."
});
\`\`\`

### Get Token Balances

Retrieve all token balances for a specific chain.

\`\`\`typescript
const tokens = await trpc.wallet.getTokenBalances.query({
  address: "0x...",
  chainId: 1
});
\`\`\`

### Get Transaction History

Retrieve transaction history for a wallet.

\`\`\`typescript
const transactions = await trpc.wallet.getTransactionHistory.query({
  address: "0x...",
  chainId: 1,
  limit: 10
});
\`\`\`

## Token Endpoints

### Get Token Price

Retrieve current price for a token.

\`\`\`typescript
const price = await trpc.token.getPrice.query({
  symbol: "ETH"
});
\`\`\`

### Get Multiple Token Prices

Retrieve prices for multiple tokens.

\`\`\`typescript
const prices = await trpc.token.getPrices.query({
  symbols: ["ETH", "USDC", "SOL"]
});
\`\`\`

### Swap Tokens

Get swap quote and execute token swap.

\`\`\`typescript
const swap = await trpc.token.swap.query({
  fromToken: "0x...",
  toToken: "0x...",
  amount: "1000000000000000000",
  chainId: 1
});
\`\`\`

## AI Endpoints

### Generate Response

Get AI-powered insights and recommendations.

\`\`\`typescript
const response = await trpc.ai.generateResponse.mutate({
  query: "Analyze my portfolio",
  context: {
    portfolioValue: 25000,
    trustScore: 87,
    recentTransactions: 5,
    assets: [...]
  }
});
\`\`\`

## Supported Chains

- Ethereum (chainId: 1)
- Polygon (chainId: 137)
- Base (chainId: 8453)
- Solana (chainId: 900)

## Error Handling

All endpoints return errors in the following format:

\`\`\`typescript
{
  code: string;
  message: string;
  data?: any;
}
\`\`\`

## Rate Limiting

API calls are rate-limited to 100 requests per minute per wallet address.

## Webhooks

Subscribe to wallet events via webhooks:

- `wallet.transaction.confirmed`
- `wallet.balance.changed`
- `wallet.alert.triggered`

## SDK

Use the official LUMINAUT SDK for easier integration:

\`\`\`bash
npm install @luminaut/sdk
\`\`\`

\`\`\`typescript
import { LuminautSDK } from "@luminaut/sdk";

const sdk = new LuminautSDK({
  apiKey: "your-api-key",
  network: "mainnet"
});

const balance = await sdk.wallet.getBalance("0x...");
\`\`\`
