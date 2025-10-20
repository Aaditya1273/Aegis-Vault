# LUMINAUT - AI-Powered Web3 Wallet

A production-ready, unified, intelligent, cross-chain decentralized wallet with AI trust analytics, real blockchain integrations, and social credibility scoring.

## Features

### Core Wallet
- **Multi-Chain Support**: Ethereum, Polygon, Base with Alchemy SDK integration
- **Real-Time Balances**: Live token and native asset tracking across chains
- **Transaction History**: Complete on-chain transaction data with filtering
- **Send & Swap**: Direct token transfers and DEX swaps via 1Inch API
- **Gas Estimation**: Real gas fee calculation and optimization

### AI Trust Engine (TrustLens)
- **Real-Time Risk Analysis**: AI-powered transaction risk scoring
- **Trust Score Calculation**: Multi-factor reputation system
- **Anomaly Detection**: Pattern-based fraud detection
- **Portfolio Insights**: OpenAI-powered investment recommendations
- **Transaction Intelligence**: Contextual safety warnings

### Social Identity Layer
- **Farcaster Integration**: Real profile verification via Neynar API
- **Lens Protocol**: On-chain social graph integration
- **Reputation Scoring**: Calculated from social metrics and on-chain activity
- **Verification Status**: Email, phone, social, and KYC tracking
- **Social Activity Feed**: Real-time social engagement tracking

### Developer Experience
- **tRPC API**: Type-safe backend with automatic client generation
- **Official SDK**: TypeScript SDK for third-party integration
- **Comprehensive Docs**: API reference, setup guides, architecture docs
- **PWA Support**: Offline-capable progressive web app
- **Docker Ready**: Production-grade containerization

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 with Shadcn/UI components
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **State**: React Query via tRPC
- **Forms**: React Hook Form + Zod

### Backend
- **API**: tRPC with Next.js API routes
- **Blockchain**: Alchemy SDK, ethers.js, viem
- **AI**: OpenAI GPT-4 Turbo
- **Social**: Farcaster (Neynar), Lens Protocol
- **Pricing**: CoinGecko API with Node-cache
- **Caching**: Node-cache for performance

### Infrastructure
- **Hosting**: Vercel (recommended) or self-hosted
- **Database**: PostgreSQL (optional)
- **Cache**: Redis (optional)
- **CDN**: Vercel Edge Network

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Quick Start (5 minutes)

1. **Clone Repository**
   \`\`\`bash
   git clone https://github.com/luminaut/wallet.git
   cd luminaut
   npm install
   \`\`\`

2. **Get API Keys**
   - Alchemy: https://www.alchemy.com/
   - OpenAI: https://platform.openai.com/
   - Farcaster: https://neynar.com/

3. **Configure Environment**
   \`\`\`bash
   cp .env.example .env.local
   # Add your API keys to .env.local
   \`\`\`

4. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open Browser**
   - Visit http://localhost:3000
   - Connect your wallet
   - Explore the dashboard

## Project Structure

\`\`\`
luminaut/
├── app/                      # Next.js app directory
│   ├── api/                 # tRPC and API routes
│   ├── dashboard/           # Protected dashboard pages
│   ├── onboarding/          # Wallet onboarding flow
│   ├── auth/                # Authentication pages
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── ui/                 # Shadcn UI components
│   ├── dashboard/          # Dashboard components
│   ├── trust-engine/       # Trust analytics UI
│   ├── ai-assistant/       # AI chat interface
│   └── social-identity/    # Social profile components
├── lib/                     # Utilities and services
│   ├── blockchain/         # Alchemy, wallet, token services
│   ├── ai/                # OpenAI integration
│   ├── social/            # Farcaster, Lens services
│   ├── hooks/             # Custom React hooks
│   └── types.ts           # TypeScript definitions
├── server/                  # Backend code
│   ├── routers/           # tRPC routers
│   └── trpc.ts            # tRPC configuration
├── sdk/                     # Official TypeScript SDK
├── docs/                    # Documentation
├── public/                  # Static assets & PWA files
└── package.json
\`\`\`

## API Documentation

### Wallet Endpoints

\`\`\`typescript
// Get balance for a chain
const balance = await trpc.wallet.getBalance.query({
  address: "0x...",
  chainId: 1
});

// Get all token balances
const tokens = await trpc.wallet.getTokenBalances.query({
  address: "0x...",
  chainId: 1
});

// Get transaction history
const txs = await trpc.wallet.getTransactionHistory.query({
  address: "0x...",
  chainId: 1,
  limit: 10
});
\`\`\`

### Token Endpoints

\`\`\`typescript
// Get token price
const price = await trpc.token.getPrice.query({ symbol: "ETH" });

// Swap tokens
const swap = await trpc.token.swap.query({
  fromToken: "0x...",
  toToken: "0x...",
  amount: "1000000000000000000",
  chainId: 1
});
\`\`\`

### AI Endpoints

\`\`\`typescript
// Generate AI insights
const response = await trpc.ai.generateResponse.mutate({
  query: "Analyze my portfolio",
  context: { portfolioValue: 25000, trustScore: 87 }
});
\`\`\`

See [API Documentation](docs/API.md) for complete reference.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

### Docker

\`\`\`bash
docker build -t luminaut .
docker run -p 3000:3000 luminaut
\`\`\`

### Self-Hosted

See [Deployment Guide](docs/DEPLOYMENT.md) for detailed instructions.

## Environment Variables

Required API keys:
- `NEXT_PUBLIC_ALCHEMY_API_KEY` - Blockchain data
- `OPENAI_API_KEY` - AI insights
- `FARCASTER_API_KEY` - Social verification
- `LENS_API_KEY` - Lens integration

See `.env.example` for all available options.

## Documentation

- [Quick Start Guide](docs/QUICKSTART.md) - 5-minute setup
- [API Reference](docs/API.md) - Complete endpoint documentation
- [Architecture Guide](docs/ARCHITECTURE.md) - System design and patterns
- [Setup Guide](docs/SETUP.md) - Detailed installation
- [Deployment Guide](docs/DEPLOYMENT.md) - Production deployment
- [Contributing Guide](docs/CONTRIBUTING.md) - Development workflow

## SDK Usage

\`\`\`typescript
import { LuminautClient } from "@luminaut/sdk";

const client = new LuminautClient({
  apiKey: "your-api-key",
  network: "mainnet"
});

// Get wallet balance
const balance = await client.wallet.getBalance("0x...", 1);

// Get token prices
const prices = await client.token.getPrices(["ETH", "USDC"]);

// Generate AI insights
const insights = await client.ai.generateResponse(
  "What should I do with my portfolio?",
  { portfolioValue: 25000 }
);
\`\`\`

## Features Implemented

### Phase 1: Foundation ✓
- Project setup with Next.js 15
- Database schema design
- Component architecture

### Phase 2: Authentication ✓
- Wallet onboarding flow
- Multi-step verification
- Session management

### Phase 3: Dashboard ✓
- Portfolio overview with real data
- Asset management
- Transaction history

### Phase 4: AI Trust Engine ✓
- Real OpenAI integration
- Risk analysis algorithms
- Transaction intelligence

### Phase 5: Blockchain Layer ✓
- Alchemy SDK integration
- Multi-chain support
- Real token data

### Phase 6: AI Assistant ✓
- OpenAI GPT-4 Turbo
- Contextual responses
- Portfolio insights

### Phase 7: Social Identity ✓
- Farcaster integration
- Lens Protocol support
- Reputation scoring

### Phase 8: PWA & Deployment ✓
- Service worker implementation
- Offline support
- Production deployment

## Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <2.5s
- **API Response Time**: <200ms (cached)
- **Service Worker**: Offline-capable

## Security

- Non-custodial wallet design
- Secure environment variables
- CORS protection enabled
- Rate limiting on APIs
- Input validation with Zod
- Service worker caching strategy

## Contributing

Contributions are welcome! Please read our [Contributing Guide](docs/CONTRIBUTING.md) for details on our code of conduct and development process.

## Support

- GitHub Issues: Report bugs and request features
- Documentation: Check [docs/](docs/) for guides
- Discord: Join our community (link in docs)

## License

MIT - See LICENSE file for details

## Acknowledgments

Built with:
- Alchemy for blockchain data
- OpenAI for AI capabilities
- Farcaster & Lens for social integration
- Vercel for hosting and deployment
