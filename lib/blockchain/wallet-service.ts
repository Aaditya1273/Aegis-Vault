import { Alchemy, Network, AssetTransfersCategory } from "alchemy-sdk"
import { getEthPrice, getTokenPrice } from "./price-service"

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
  data?: string
  gasPrice?: string
  gasLimit?: string
  chainId: number
  timestamp: Date
  status: "pending" | "confirmed" | "failed"
}

// Initialize Alchemy clients for different networks
const alchemyClients: Record<number, Alchemy> = {
  1: new Alchemy({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  }),
  137: new Alchemy({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.MATIC_MAINNET,
  }),
  8453: new Alchemy({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.BASE_MAINNET,
  }),
}

export class WalletService {
  private walletAddress: string

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress
  }

  // Get native token balance for a specific chain
  async getBalance(chainId: number): Promise<WalletBalance> {
    try {
      const alchemy = alchemyClients[chainId]
      if (!alchemy) {
        throw new Error(`Unsupported chain: ${chainId}`)
      }

      const response = await alchemy.core.getBalance(this.walletAddress)
      const balanceInEth = Number.parseFloat(response.toString()) / 1e18
      const ethPrice = await getEthPrice()

      const chainNames: Record<number, string> = {
        1: "Ethereum",
        137: "Polygon",
        8453: "Base",
      }

      return {
        chainId,
        chainName: chainNames[chainId] || "Unknown",
        address: this.walletAddress,
        balance: balanceInEth.toFixed(4),
        usdValue: balanceInEth * ethPrice,
        lastUpdated: new Date(),
      }
    } catch (error) {
      console.error("[v0] Error fetching wallet balance:", error)
      throw error
    }
  }

  // Get all balances across supported chains
  async getAllBalances(): Promise<WalletBalance[]> {
    try {
      const balances = await Promise.all([this.getBalance(1), this.getBalance(137), this.getBalance(8453)])
      return balances.filter((b) => Number.parseFloat(b.balance) > 0)
    } catch (error) {
      console.error("[v0] Error fetching all balances:", error)
      return []
    }
  }

  // Get token balances for a specific chain
  async getTokenBalances(chainId: number): Promise<TokenBalance[]> {
    try {
      const alchemy = alchemyClients[chainId]
      if (!alchemy) {
        throw new Error(`Unsupported chain: ${chainId}`)
      }

      const response = await alchemy.core.getTokenBalances(this.walletAddress)
      const tokenBalances: TokenBalance[] = []

      const chainNames: Record<number, string> = {
        1: "Ethereum",
        137: "Polygon",
        8453: "Base",
      }

      for (const token of response.tokenBalances) {
        try {
          const metadata = await alchemy.core.getTokenMetadata(token.contractAddress)
          const balance = Number.parseInt(token.tokenBalance) / Math.pow(10, metadata.decimals || 18)
          const price = await getTokenPrice(metadata.symbol || "")

          tokenBalances.push({
            chainId,
            chainName: chainNames[chainId] || "Unknown",
            address: this.walletAddress,
            tokenAddress: token.contractAddress,
            tokenSymbol: metadata.symbol || "UNKNOWN",
            tokenName: metadata.name || "Unknown Token",
            decimals: metadata.decimals || 18,
            balance: balance.toFixed(6),
            usdValue: balance * price,
            lastUpdated: new Date(),
          })
        } catch (err) {
          console.error(`[v0] Error fetching token metadata:`, err)
        }
      }

      return tokenBalances
    } catch (error) {
      console.error("[v0] Error fetching token balances:", error)
      return []
    }
  }

  // Send transaction
  async sendTransaction(to: string, amount: string, chainId: number): Promise<Transaction> {
    try {
      const alchemy = alchemyClients[chainId]
      if (!alchemy) {
        throw new Error(`Unsupported chain: ${chainId}`)
      }

      // In production, use ethers.js or viem to sign and send
      const tx: Transaction = {
        hash: "0x" + Math.random().toString(16).slice(2),
        from: this.walletAddress,
        to,
        value: amount,
        chainId,
        timestamp: new Date(),
        status: "pending",
      }

      return tx
    } catch (error) {
      console.error("[v0] Error sending transaction:", error)
      throw error
    }
  }

  // Get transaction history
  async getTransactionHistory(chainId: number, limit = 10): Promise<Transaction[]> {
    try {
      const alchemy = alchemyClients[chainId]
      if (!alchemy) {
        throw new Error(`Unsupported chain: ${chainId}`)
      }

      const response = await alchemy.core.getAssetTransfers({
        fromAddress: this.walletAddress,
        category: [AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.INTERNAL, AssetTransfersCategory.ERC20],
        maxCount: limit,
      })

      return response.transfers.map((tx) => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to || "",
        value: tx.value?.toString() || "0",
        chainId,
        timestamp: new Date(tx.blockNum ? Number.parseInt(tx.blockNum) * 1000 : Date.now()),
        status: "confirmed",
      }))
    } catch (error) {
      console.error("[v0] Error fetching transaction history:", error)
      return []
    }
  }

  // Estimate gas for transaction
  async estimateGas(to: string, amount: string, chainId: number): Promise<string> {
    try {
      const alchemy = alchemyClients[chainId]
      if (!alchemy) {
        throw new Error(`Unsupported chain: ${chainId}`)
      }

      const gasEstimate = await alchemy.core.estimateGas({
        to,
        value: amount,
      })

      return gasEstimate.toString()
    } catch (error) {
      console.error("[v0] Error estimating gas:", error)
      return "21000"
    }
  }

  // Get transaction details
  async getTransactionDetails(txHash: string, chainId: number): Promise<Transaction | null> {
    try {
      const alchemy = alchemyClients[chainId]
      if (!alchemy) {
        throw new Error(`Unsupported chain: ${chainId}`)
      }

      const tx = await alchemy.core.getTransactionReceipt(txHash)
      if (!tx) return null

      return {
        hash: tx.transactionHash,
        from: tx.from,
        to: tx.to || "",
        value: "0",
        chainId,
        timestamp: new Date(),
        status: tx.status === 1 ? "confirmed" : "failed",
      }
    } catch (error) {
      console.error("[v0] Error fetching transaction details:", error)
      return null
    }
  }
}

// Singleton instance
let walletServiceInstance: WalletService | null = null

export function getWalletService(address: string): WalletService {
  if (!walletServiceInstance || walletServiceInstance["walletAddress"] !== address) {
    walletServiceInstance = new WalletService(address)
  }
  return walletServiceInstance
}
