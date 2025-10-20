// SDK Type Definitions
export interface LuminautConfig {
  apiKey?: string
  apiUrl?: string
  network?: "mainnet" | "testnet"
  timeout?: number
}

export interface WalletBalance {
  chainId: number
  chainName: string
  address: string
  balance: string
  usdValue: number
  lastUpdated: Date
}

export interface TokenBalance extends WalletBalance {
  tokenAddress: string
  tokenSymbol: string
  tokenName: string
  decimals: number
}

export interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  chainId: number
  timestamp: Date
  status: "pending" | "confirmed" | "failed"
}

export interface TokenPrice {
  symbol: string
  price: number
  change24h: number
  marketCap?: number
  volume24h?: number
}

export interface AIResponse {
  message: string
  insights: Array<{
    type: "portfolio" | "risk" | "opportunity" | "alert"
    title: string
    description: string
    priority: "low" | "medium" | "high"
  }>
  suggestions: string[]
}

export interface SocialProfile {
  id: string
  platform: "farcaster" | "lens" | "twitter"
  username: string
  displayName: string
  followers: number
  verified: boolean
}
