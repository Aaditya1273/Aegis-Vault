# LUMINAUT Setup Guide

## Prerequisites

- Node.js 18+
- npm or yarn
- Git

## Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/luminaut/wallet.git
cd luminaut
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Configure your API keys in `.env.local`:

\`\`\`
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
OPENAI_API_KEY=your_openai_key
FARCASTER_API_KEY=your_farcaster_key
LENS_API_KEY=your_lens_key
\`\`\`

## Development

Start the development server:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Docker

\`\`\`bash
docker build -t luminaut .
docker run -p 3000:3000 luminaut
\`\`\`

## Configuration

### Supported Chains

Edit `lib/blockchain/chains.ts` to add or modify supported chains:

\`\`\`typescript
export const SUPPORTED_CHAINS = {
  1: {
    id: 1,
    name: "Ethereum",
    symbol: "ETH",
    rpcUrl: "https://eth-mainnet.alchemyapi.io/v2/...",
    explorerUrl: "https://etherscan.io"
  },
  // Add more chains...
};
\`\`\`

### AI Model

Change the AI model in `lib/ai/openai-service.ts`:

\`\`\`typescript
const response = await openai.chat.completions.create({
  model: "gpt-4-turbo-preview", // Change this
  // ...
});
\`\`\`

## Troubleshooting

### Service Worker Not Registering

Check browser console for errors. Ensure HTTPS is enabled in production.

### API Calls Failing

Verify API keys are correctly set in environment variables. Check network tab in browser DevTools.

### Wallet Connection Issues

Ensure MetaMask or compatible wallet is installed and connected to the correct network.

## Support

For issues and questions, visit [GitHub Issues](https://github.com/luminaut/wallet/issues)
