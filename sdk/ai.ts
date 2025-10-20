// AI SDK Methods
import type { LuminautClient } from "./client"
import type { AIResponse } from "./types"

export class AIISDK {
  constructor(private client: LuminautClient) {}

  async generateResponse(query: string, context: any): Promise<AIResponse> {
    return this.client.request(`/ai/response`, {
      method: "POST",
      body: JSON.stringify({ query, context }),
    })
  }

  async generatePortfolioInsights(totalValue: number, assets: any[]): Promise<AIResponse> {
    return this.client.request(`/ai/portfolio-insights`, {
      method: "POST",
      body: JSON.stringify({ totalValue, assets }),
    })
  }

  async generateRiskInsights(trustScore: number, recentTransactions: number): Promise<AIResponse> {
    return this.client.request(`/ai/risk-insights`, {
      method: "POST",
      body: JSON.stringify({ trustScore, recentTransactions }),
    })
  }
}
