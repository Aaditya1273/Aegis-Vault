// Alchemy API service for blockchain interactions
import { Alchemy, Network } from "alchemy-sdk"

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
}

const alchemy = new Alchemy(settings)

export interface WalletBalance {
  address: string
  balance: string
  usdValue: number
}

export interface TokenBalance {
  contractAddress: string
  tokenBalance: string
  decimals: number
  symbol: string
  name: string
  logo?: string
  balance: number
  usdValue: number
}

export interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  gasPrice: string
  gasUsed: string
  blockNumber: number
  timestamp: number
  status: "success" | "failed" | "pending"
}

// Get wallet balance
export async function getWalletBalance(address: string): Promise<WalletBalance> {
  try {
    const response = await alchemy.core.getBalance(address)
    const balanceInEth = Number.parseFloat(response.toString()) / 1e18
    const ethPrice = await getEthPrice()

    return {
      address,
      balance: balanceInEth.toFixed(4),
      usdValue: balanceInEth * ethPrice,
    }
  } catch (error) {
    console.error("[v0] Error fetching wallet balance:", error)
    throw error
  }
}

// Get token balances for wallet
export async function getTokenBalances(address: string): Promise<TokenBalance[]> {
  try {
    const response = await alchemy.core.getTokenBalances(address)
    const tokenBalances: TokenBalance[] = []

    for (const token of response.tokenBalances) {
      try {
        const metadata = await alchemy.core.getTokenMetadata(token.contractAddress)
        const balance = Number.parseInt(token.tokenBalance) / Math.pow(10, metadata.decimals || 18)
        const price = await getTokenPrice(metadata.symbol || "")

        tokenBalances.push({
          contractAddress: token.contractAddress,
          tokenBalance: token.tokenBalance,
          decimals: metadata.decimals || 18,
          symbol: metadata.symbol || "UNKNOWN",
          name: metadata.name || "Unknown Token",
          logo: metadata.logo,
          balance,
          usdValue: balance * price,
        })
      } catch (err) {
        console.error(`[v0] Error fetching token metadata for ${token.contractAddress}:`, err)
      }
    }

    return tokenBalances
  } catch (error) {
    console.error("[v0] Error fetching token balances:", error)
    throw error
  }
}

// Get transaction history
export async function getTransactionHistory(address: string, limit = 10): Promise<Transaction[]> {
  try {
    const response = await alchemy.core.getAssetTransfers({
      fromAddress: address,
      category: ["external", "internal", "erc20"],
      maxCount: limit,
    })

    return response.transfers.map((tx) => ({
      hash: tx.hash,
      from: tx.from,
      to: tx.to || "",
      value: tx.value?.toString() || "0",
      gasPrice: "0",
      gasUsed: "0",
      blockNumber: tx.blockNum ? Number.parseInt(tx.blockNum) : 0,
      timestamp: Date.now(),
      status: "success",
    }))
  } catch (error) {
    console.error("[v0] Error fetching transaction history:", error)
    throw error
  }
}

// Get ETH price from CoinGecko
export async function getEthPrice(): Promise<number> {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
    const data = await response.json()
    return data.ethereum.usd
  } catch (error) {
    console.error("[v0] Error fetching ETH price:", error)
    return 2500 // Fallback price
  }
}

// Get token price from CoinGecko
export async function getTokenPrice(symbol: string): Promise<number> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${symbol.toLowerCase()}&vs_currencies=usd`,
    )
    const data = await response.json()
    return data[symbol.toLowerCase()]?.usd || 0
  } catch (error) {
    console.error(`[v0] Error fetching price for ${symbol}:`, error)
    return 0
  }
}

// Estimate gas for transaction
export async function estimateGas(to: string, value: string): Promise<string> {
  try {
    const gasEstimate = await alchemy.core.estimateGas({
      to,
      value,
    })
    return gasEstimate.toString()
  } catch (error) {
    console.error("[v0] Error estimating gas:", error)
    return "21000" // Standard transfer gas
  }
}
