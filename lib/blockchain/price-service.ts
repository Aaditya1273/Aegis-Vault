import NodeCache from "node-cache"

// Cache prices for 5 minutes
const priceCache = new NodeCache({ stdTTL: 300 })

export interface TokenPrice {
  symbol: string
  price: number
  change24h: number
  marketCap?: number
  volume24h?: number
}

// Get ETH price from CoinGecko
export async function getEthPrice(): Promise<number> {
  try {
    const cached = priceCache.get<number>("eth-price")
    if (cached) return cached

    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true",
    )
    const data = await response.json()
    const price = data.ethereum.usd

    priceCache.set("eth-price", price)
    return price
  } catch (error) {
    console.error("[v0] Error fetching ETH price:", error)
    return 2500 // Fallback
  }
}

// Get token price from CoinGecko
export async function getTokenPrice(symbol: string): Promise<number> {
  try {
    const cacheKey = `token-price-${symbol}`
    const cached = priceCache.get<number>(cacheKey)
    if (cached) return cached

    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${symbol.toLowerCase()}&vs_currencies=usd`,
    )
    const data = await response.json()
    const price = data[symbol.toLowerCase()]?.usd || 0

    priceCache.set(cacheKey, price)
    return price
  } catch (error) {
    console.error(`[v0] Error fetching price for ${symbol}:`, error)
    return 0
  }
}

// Get multiple token prices
export async function getTokenPrices(symbols: string[]): Promise<TokenPrice[]> {
  try {
    const ids = symbols.map((s) => s.toLowerCase()).join(",")
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`,
    )
    const data = await response.json()

    return symbols.map((symbol) => ({
      symbol,
      price: data[symbol.toLowerCase()]?.usd || 0,
      change24h: data[symbol.toLowerCase()]?.usd_24h_change || 0,
      marketCap: data[symbol.toLowerCase()]?.usd_market_cap,
      volume24h: data[symbol.toLowerCase()]?.usd_24h_vol,
    }))
  } catch (error) {
    console.error("[v0] Error fetching token prices:", error)
    return []
  }
}

// Get swap quote from 1Inch
export async function getSwapQuote(
  fromToken: string,
  toToken: string,
  amount: string,
  chainId: number,
): Promise<{ outputAmount: string; route: string[] }> {
  try {
    const response = await fetch(
      `https://api.1inch.io/v5.0/${chainId}/quote?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${amount}`,
    )
    const data = await response.json()

    return {
      outputAmount: data.toTokenAmount,
      route: [fromToken, toToken],
    }
  } catch (error) {
    console.error("[v0] Error getting swap quote:", error)
    // Fallback calculation
    const fromPrice = await getTokenPrice(fromToken)
    const toPrice = await getTokenPrice(toToken)
    const outputAmount = ((Number.parseFloat(amount) * fromPrice) / toPrice).toFixed(6)

    return {
      outputAmount,
      route: [fromToken, toToken],
    }
  }
}
