export interface TokenMetadata {
  address: string
  symbol: string
  name: string
  decimals: number
  chainId: number
  logoUrl?: string
  coingeckoId?: string
}

// Popular tokens across supported chains
export const POPULAR_TOKENS: Record<number, TokenMetadata[]> = {
  1: [
    {
      address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      symbol: "WETH",
      name: "Wrapped Ether",
      decimals: 18,
      chainId: 1,
      coingeckoId: "ethereum",
    },
    {
      address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      chainId: 1,
      coingeckoId: "usd-coin",
    },
    {
      address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      chainId: 1,
      coingeckoId: "tether",
    },
    {
      address: "0x6b175474e89094c44da98b954eedeac495271d0f",
      symbol: "DAI",
      name: "Dai Stablecoin",
      decimals: 18,
      chainId: 1,
      coingeckoId: "dai",
    },
  ],
  137: [
    {
      address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
      symbol: "WMATIC",
      name: "Wrapped Matic",
      decimals: 18,
      chainId: 137,
      coingeckoId: "matic-network",
    },
    {
      address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      chainId: 137,
      coingeckoId: "usd-coin",
    },
  ],
  8453: [
    {
      address: "0x4200000000000000000000000000000000000006",
      symbol: "WETH",
      name: "Wrapped Ether",
      decimals: 18,
      chainId: 8453,
      coingeckoId: "ethereum",
    },
    {
      address: "0x833589fcd6edb6e08f4c7c32d4f71b1566469c3d",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      chainId: 8453,
      coingeckoId: "usd-coin",
    },
  ],
}

// Get token metadata
export function getTokenMetadata(address: string, chainId: number): TokenMetadata | undefined {
  return POPULAR_TOKENS[chainId]?.find((t) => t.address.toLowerCase() === address.toLowerCase())
}

// Get all tokens for a chain
export function getChainTokens(chainId: number): TokenMetadata[] {
  return POPULAR_TOKENS[chainId] || []
}
