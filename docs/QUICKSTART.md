# LUMINAUT Quick Start Guide

## 5-Minute Setup

### 1. Clone & Install

\`\`\`bash
git clone https://github.com/luminaut/wallet.git
cd luminaut
npm install
\`\`\`

### 2. Get API Keys

1. **Alchemy**: https://www.alchemy.com/
   - Create account and app
   - Copy API key

2. **OpenAI**: https://platform.openai.com/
   - Create account
   - Generate API key

3. **Farcaster**: https://neynar.com/
   - Sign up for Neynar API
   - Get API key

### 3. Configure Environment

\`\`\`bash
# .env.local
NEXT_PUBLIC_ALCHEMY_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
FARCASTER_API_KEY=your_key_here
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000

## First Steps

1. **Connect Wallet**: Click "Connect Wallet" and sign with MetaMask
2. **View Dashboard**: See your portfolio and assets
3. **Try AI Assistant**: Ask "Analyze my portfolio"
4. **Send Crypto**: Use the Send button to transfer assets
5. **Check Trust Score**: View your AI-calculated trust metrics

## Common Tasks

### View Token Balances

\`\`\`typescript
import { useWalletData } from "@/lib/hooks/use-wallet-data"

function MyComponent() {
  const { tokenBalances } = useWalletData("0x...", 1)
  return <div>{tokenBalances.map(t => t.tokenSymbol)}</div>
}
\`\`\`

### Get AI Insights

\`\`\`typescript
import { trpc } from "@/lib/trpc-client"

const response = await trpc.ai.generateResponse.mutate({
  query: "What should I do with my portfolio?",
  context: { portfolioValue: 25000 }
})
\`\`\`

### Swap Tokens

\`\`\`typescript
const swap = await trpc.token.swap.query({
  fromToken: "0x...",
  toToken: "0x...",
  amount: "1000000000000000000",
  chainId: 1
})
\`\`\`

## Troubleshooting

### Service Worker Not Working

- Check browser console for errors
- Ensure HTTPS in production
- Clear browser cache

### API Calls Failing

- Verify API keys in .env.local
- Check network tab in DevTools
- Ensure wallet is connected

### Wallet Connection Issues

- Install MetaMask extension
- Switch to correct network
- Check wallet permissions

## Next Steps

- Read [API Documentation](API.md)
- Explore [Architecture](ARCHITECTURE.md)
- Check [Contributing Guide](CONTRIBUTING.md)
- Join [Discord Community](https://discord.gg/luminaut)
