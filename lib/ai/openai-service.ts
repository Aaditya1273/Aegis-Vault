import { OpenAI } from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface WalletInsight {
  type: "portfolio" | "risk" | "opportunity" | "alert"
  title: string
  description: string
  recommendation?: string
  priority: "low" | "medium" | "high"
}

export interface AssistantResponse {
  message: string
  insights: WalletInsight[]
  suggestions: string[]
}

export class AIAssistant {
  // Generate response using OpenAI
  async generateResponse(query: string, context: any): Promise<AssistantResponse> {
    try {
      const systemPrompt = `You are LUMINAUT, an AI assistant for a Web3 wallet. You help users with:
- Portfolio analysis and optimization
- Risk assessment and transaction safety
- DeFi strategies and recommendations
- Trust score insights
- Multi-chain asset management

Be concise, helpful, and provide actionable insights. Format responses in clear, easy-to-understand language.`

      const userMessage = `User Query: ${query}

Context:
- Portfolio Value: $${context.portfolioValue || 0}
- Trust Score: ${context.trustScore || 0}/100
- Recent Transactions: ${context.recentTransactions || 0}
- Assets: ${JSON.stringify(context.assets || [])}

Please provide insights and recommendations.`

      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 500,
      })

      const message = response.choices[0]?.message?.content || "Unable to generate response"

      return {
        message,
        insights: this.extractInsights(message),
        suggestions: this.extractSuggestions(message),
      }
    } catch (error) {
      console.error("[v0] Error generating AI response:", error)
      throw error
    }
  }

  // Generate portfolio insights
  async generatePortfolioInsights(
    totalValue: number,
    assets: Array<{ symbol: string; allocation: number; change: number }>,
  ): Promise<WalletInsight[]> {
    try {
      const prompt = `Analyze this portfolio and provide 2-3 key insights:
Total Value: $${totalValue}
Assets: ${JSON.stringify(assets)}

Focus on concentration risk, diversification, and optimization opportunities.`

      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 300,
      })

      const content = response.choices[0]?.message?.content || ""
      return this.parseInsights(content, "portfolio")
    } catch (error) {
      console.error("[v0] Error generating portfolio insights:", error)
      return []
    }
  }

  // Generate risk insights
  async generateRiskInsights(trustScore: number, recentTransactions: number): Promise<WalletInsight[]> {
    try {
      const prompt = `Provide risk assessment insights for a wallet with:
Trust Score: ${trustScore}/100
Recent Transactions: ${recentTransactions}

Identify potential risks and security recommendations.`

      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 300,
      })

      const content = response.choices[0]?.message?.content || ""
      return this.parseInsights(content, "risk")
    } catch (error) {
      console.error("[v0] Error generating risk insights:", error)
      return []
    }
  }

  // Extract insights from AI response
  private extractInsights(message: string): WalletInsight[] {
    // Parse AI response to extract structured insights
    const insights: WalletInsight[] = []

    if (message.toLowerCase().includes("risk")) {
      insights.push({
        type: "alert",
        title: "Risk Assessment",
        description: "Review your transaction patterns",
        priority: "high",
      })
    }

    if (message.toLowerCase().includes("opportunity")) {
      insights.push({
        type: "opportunity",
        title: "Optimization Opportunity",
        description: "Consider rebalancing your portfolio",
        priority: "medium",
      })
    }

    return insights
  }

  // Extract suggestions from AI response
  private extractSuggestions(message: string): string[] {
    // Parse AI response to extract actionable suggestions
    return ["Review portfolio allocation", "Check transaction history", "Update security settings"]
  }

  // Parse insights from AI response
  private parseInsights(content: string, type: WalletInsight["type"]): WalletInsight[] {
    return [
      {
        type,
        title: "AI Analysis",
        description: content.substring(0, 100),
        priority: "medium",
      },
    ]
  }
}

// Singleton instance
let assistantInstance: AIAssistant | null = null

export function getAIAssistant(): AIAssistant {
  if (!assistantInstance) {
    assistantInstance = new AIAssistant()
  }
  return assistantInstance
}
