export interface User {
  id: string
  walletAddress: string
  email?: string
  username?: string
  avatarUrl?: string
  createdAt: Date
}

export interface Wallet {
  id: string
  userId: string
  chainId: number
  chainName: string
  walletAddress: string
  balance: string
  createdAt: Date
}

export interface Asset {
  id: string
  walletId: string
  tokenAddress?: string
  tokenSymbol: string
  tokenName: string
  balance: string
  usdValue: number
  chainId: number
}

export interface Transaction {
  id: string
  walletId: string
  txHash: string
  fromAddress: string
  toAddress: string
  amount: string
  tokenSymbol: string
  status: "pending" | "completed" | "failed"
  chainId: number
  createdAt: Date
}

export interface TrustScore {
  id: string
  walletId: string
  score: number
  riskLevel: "low" | "medium" | "high" | "critical"
  factors: Record<string, any>
  createdAt: Date
}

export interface SocialProfile {
  id: string
  userId: string
  platform: string
  profileId: string
  username: string
  verified: boolean
}

export interface AuthSession {
  userId: string
  email: string
  walletAddress: string
  isAuthenticated: boolean
  createdAt: Date
}

export interface OnboardingData {
  walletName: string
  email: string
  selectedPlatforms: string[]
}
