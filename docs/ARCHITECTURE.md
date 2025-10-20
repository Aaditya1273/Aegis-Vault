# LUMINAUT Architecture

## System Overview

LUMINAUT is built with a modern, scalable architecture combining Next.js frontend with tRPC backend.

## Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 with Shadcn/UI components
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **State Management**: React Query (via tRPC)
- **Forms**: React Hook Form + Zod validation

### Backend
- **API**: tRPC with Next.js API routes
- **Blockchain**: Alchemy SDK, ethers.js, viem
- **AI**: OpenAI API
- **Social**: Farcaster & Lens APIs
- **Caching**: Node-cache

### Infrastructure
- **Hosting**: Vercel
- **Database**: PostgreSQL (optional)
- **Cache**: Redis (optional)
- **CDN**: Vercel Edge Network

## Directory Structure

\`\`\`
luminaut/
├── app/                    # Next.js app directory
│   ├── api/               # API routes & tRPC
│   ├── dashboard/         # Protected dashboard pages
│   ├── onboarding/        # Onboarding flow
│   ├── auth/              # Authentication pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── dashboard/        # Dashboard components
│   ├── trust-engine/     # Trust analytics components
│   ├── ai-assistant/     # AI chat components
│   └── social-identity/  # Social profile components
├── lib/                   # Utility functions & services
│   ├── blockchain/       # Blockchain services
│   ├── ai/              # AI services
│   ├── social/          # Social API services
│   ├── hooks/           # Custom React hooks
│   └── types.ts         # TypeScript types
├── server/              # Backend code
│   ├── routers/         # tRPC routers
│   └── trpc.ts          # tRPC setup
├── public/              # Static assets & PWA files
├── docs/                # Documentation
└── package.json         # Dependencies
\`\`\`

## Data Flow

1. **User Action** → React Component
2. **Component** → tRPC Client Hook
3. **tRPC Client** → API Route Handler
4. **API Handler** → Service Layer (Blockchain, AI, Social)
5. **Service Layer** → External APIs (Alchemy, OpenAI, etc.)
6. **Response** → tRPC Client → Component State → UI Update

## Security Considerations

- All API keys stored in environment variables
- Wallet signatures required for sensitive operations
- Rate limiting on API endpoints
- CORS protection enabled
- Input validation with Zod schemas
- Service worker caching strategy

## Performance Optimizations

- Server-side rendering for initial page load
- Code splitting with dynamic imports
- Image optimization with Next.js Image component
- API response caching with Node-cache
- Service worker for offline support
- Lazy loading of components

## Scalability

- Stateless API design for horizontal scaling
- Database connection pooling
- Redis caching for frequently accessed data
- CDN for static assets
- Vercel Edge Functions for low-latency responses
