// Token SDK Methods
import type { LuminautClient } from "./client"
import type { TokenPrice } from "./types"

export class TokenSDK {
  constructor(private client: LuminautClient) {}

  async getPrice(symbol: string): Promise<TokenPrice> {
    return this.client.request(`/token/price/${symbol}`)
  }

  async getPrices(symbols: string[]): Promise<TokenPrice[]> {
    return this.client.request(`/token/prices`, {
      method: "POST",
      body: JSON.stringify({ symbols }),
    })
  }

  async swap(
    fromToken: string,
    toToken: string,
    amount: string,
    chainId: number,
  ): Promise<{ outputAmount: string; route: string[] }> {
    return this.client.request(`/token/swap`, {
      method: "POST",
      body: JSON.stringify({ fromToken, toToken, amount, chainId }),
    })
  }

  async bridge(
    token: string,
    amount: string,
    fromChain: number,
    toChain: number,
  ): Promise<{ bridgeTxHash: string; estimatedTime: number }> {
    return this.client.request(`/token/bridge`, {
      method: "POST",
      body: JSON.stringify({ token, amount, fromChain, toChain }),
    })
  }
}
