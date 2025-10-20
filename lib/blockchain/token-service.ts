import { getSwapQuote, getTokenPrices } from "./price-service"

export interface Token {
  address: string
  symbol: string
  name: string
  decimals: number
  chainId: number
  logoUrl?: string
  price?: number
}

export interface TokenPrice {
  symbol: string
  price: number
  change24h: number
  marketCap?: number
  volume24h?: number
}

export class TokenService {
  private tokens: Map<string, Token> = new Map()

  // Get token by address
  getToken(address: string, chainId: number): Token | undefined {
    const key = `${chainId}:${address}`
    return this.tokens.get(key)
  }

  // Get token price
  async getTokenPrice(symbol: string): Promise<TokenPrice> {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${symbol.toLowerCase()}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`,
      )
      const data = await response.json()
      const tokenData = data[symbol.toLowerCase()]

      return {
        symbol,
        price: tokenData?.usd || 0,
        change24h: tokenData?.usd_24h_change || 0,
        marketCap: tokenData?.usd_market_cap,
        volume24h: tokenData?.usd_24h_vol,
      }
    } catch (error) {
      console.error(`[v0] Error fetching price for ${symbol}:`, error)
      return { symbol, price: 0, change24h: 0 }
    }
  }

  // Get multiple token prices
  async getTokenPrices(symbols: string[]): Promise<TokenPrice[]> {
    return getTokenPrices(symbols)
  }

  // Swap tokens using 1Inch API
  async swapTokens(
    fromToken: string,
    toToken: string,
    amount: string,
    chainId: number,
  ): Promise<{ outputAmount: string; route: string[] }> {
    try {
      return await getSwapQuote(fromToken, toToken, amount, chainId)
    } catch (error) {
      console.error("[v0] Error swapping tokens:", error)
      throw error
    }
  }

  // Bridge tokens between chains using Stargate
  async bridgeTokens(
    token: string,
    amount: string,
    fromChain: number,
    toChain: number,
  ): Promise<{ bridgeTxHash: string; estimatedTime: number }> {
    try {
      // In production, integrate with Stargate or LayerZero
      console.log(`[v0] Bridging ${amount} ${token} from chain ${fromChain} to ${toChain}`)

      return {
        bridgeTxHash: "0x" + Math.random().toString(16).slice(2),
        estimatedTime: 300, // 5 minutes
      }
    } catch (error) {
      console.error("[v0] Error bridging tokens:", error)
      throw error
    }
  }
}

// Singleton instance
let tokenServiceInstance: TokenService | null = null

export function getTokenService(): TokenService {
  if (!tokenServiceInstance) {
    tokenServiceInstance = new TokenService()
  }
  return tokenServiceInstance
}
