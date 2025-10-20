import NodeCache from "node-cache"

const cache = new NodeCache({ stdTTL: 300 }) // 5 minute cache

export interface CoinGeckoPrice {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  ath: number
  atl: number
  ath_change_percentage: number
  atl_change_percentage: number
  ath_date: string
  atl_date: string
  roi: any
  last_updated: string
}

export class CoinGeckoService {
  private baseUrl = "https://api.coingecko.com/api/v3"

  async getPrice(coinId: string, vsCurrency = "usd"): Promise<number> {
    try {
      const cacheKey = `price-${coinId}-${vsCurrency}`
      const cached = cache.get<number>(cacheKey)
      if (cached) return cached

      const response = await fetch(
        `${this.baseUrl}/simple/price?ids=${coinId}&vs_currencies=${vsCurrency}&include_24hr_change=true`,
      )
      const data = await response.json()
      const price = data[coinId]?.[vsCurrency] || 0

      cache.set(cacheKey, price)
      return price
    } catch (error) {
      console.error("[v0] Error fetching price from CoinGecko:", error)
      return 0
    }
  }

  async getPrices(coinIds: string[], vsCurrency = "usd"): Promise<Record<string, number>> {
    try {
      const ids = coinIds.join(",")
      const response = await fetch(
        `${this.baseUrl}/simple/price?ids=${ids}&vs_currencies=${vsCurrency}&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`,
      )
      const data = await response.json()

      const prices: Record<string, number> = {}
      for (const coinId of coinIds) {
        prices[coinId] = data[coinId]?.[vsCurrency] || 0
      }

      return prices
    } catch (error) {
      console.error("[v0] Error fetching prices from CoinGecko:", error)
      return {}
    }
  }

  async getCoinData(coinId: string): Promise<CoinGeckoPrice | null> {
    try {
      const cacheKey = `coin-${coinId}`
      const cached = cache.get<CoinGeckoPrice>(cacheKey)
      if (cached) return cached

      const response = await fetch(
        `${this.baseUrl}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
      )

      if (!response.ok) return null

      const data = await response.json()
      const coinData: CoinGeckoPrice = {
        id: data.id,
        symbol: data.symbol,
        name: data.name,
        image: data.image?.large,
        current_price: data.market_data?.current_price?.usd || 0,
        market_cap: data.market_data?.market_cap?.usd || 0,
        market_cap_rank: data.market_cap_rank,
        fully_diluted_valuation: data.market_data?.fully_diluted_valuation?.usd || 0,
        total_volume: data.market_data?.total_volume?.usd || 0,
        high_24h: data.market_data?.high_24h?.usd || 0,
        low_24h: data.market_data?.low_24h?.usd || 0,
        price_change_24h: data.market_data?.price_change_24h || 0,
        price_change_percentage_24h: data.market_data?.price_change_percentage_24h || 0,
        market_cap_change_24h: data.market_data?.market_cap_change_24h?.usd || 0,
        market_cap_change_percentage_24h: data.market_data?.market_cap_change_percentage_24h || 0,
        circulating_supply: data.market_data?.circulating_supply || 0,
        total_supply: data.market_data?.total_supply || 0,
        max_supply: data.market_data?.max_supply || 0,
        ath: data.market_data?.ath?.usd || 0,
        atl: data.market_data?.atl?.usd || 0,
        ath_change_percentage: data.market_data?.ath_change_percentage?.usd || 0,
        atl_change_percentage: data.market_data?.atl_change_percentage?.usd || 0,
        ath_date: data.market_data?.ath_date?.usd,
        atl_date: data.market_data?.atl_date?.usd,
        roi: data.roi,
        last_updated: data.last_updated,
      }

      cache.set(cacheKey, coinData)
      return coinData
    } catch (error) {
      console.error("[v0] Error fetching coin data from CoinGecko:", error)
      return null
    }
  }

  async getMarketChart(coinId: string, days = 30): Promise<Array<[number, number]>> {
    try {
      const response = await fetch(
        `${this.baseUrl}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
      )
      const data = await response.json()
      return data.prices || []
    } catch (error) {
      console.error("[v0] Error fetching market chart:", error)
      return []
    }
  }
}

export function getCoinGeckoService(): CoinGeckoService {
  return new CoinGeckoService()
}
