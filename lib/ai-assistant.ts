// AI Assistant service for generating insights and recommendations

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
  // Generate portfolio insights
  generatePortfolioInsights(
    totalValue: number,
    assets: Array<{ symbol: string; allocation: number; change: number }>,
  ): WalletInsight[] {
    const insights: WalletInsight[] = []

    // Check for concentration risk
    const topAsset = assets[0]
    if (topAsset.allocation > 50) {
      insights.push({
        type: "alert",
        title: "High Concentration Risk",
        description: `${topAsset.symbol} represents ${topAsset.allocation}% of your portfolio`,
        recommendation: "Consider diversifying to reduce risk",
        priority: "high",
      })
    }

    // Check for positive trends
    const positiveAssets = assets.filter((a) => a.change > 10)
    if (positiveAssets.length > 0) {
      insights.push({
        type: "opportunity",
        title: "Strong Performers",
        description: `${positiveAssets.map((a) => a.symbol).join(", ")} showing strong growth`,
        recommendation: "Consider taking profits on strong performers",
        priority: "medium",
      })
    }

    // Check for underperformers
    const underperformers = assets.filter((a) => a.change < -5)
    if (underperformers.length > 0) {
      insights.push({
        type: "alert",
        title: "Underperforming Assets",
        description: `${underperformers.map((a) => a.symbol).join(", ")} showing negative returns`,
        recommendation: "Review your position in these assets",
        priority: "medium",
      })
    }

    return insights
  }

  // Generate risk insights
  generateRiskInsights(trustScore: number, recentTransactions: number): WalletInsight[] {
    const insights: WalletInsight[] = []

    if (trustScore < 60) {
      insights.push({
        type: "alert",
        title: "Low Trust Score",
        description: `Your trust score is ${trustScore}/100`,
        recommendation: "Verify your identity and maintain good security practices",
        priority: "high",
      })
    }

    if (recentTransactions > 20) {
      insights.push({
        type: "alert",
        title: "High Transaction Volume",
        description: `${recentTransactions} transactions in the last 7 days`,
        recommendation: "Monitor for unusual activity patterns",
        priority: "medium",
      })
    }

    return insights
  }

  // Generate optimization recommendations
  generateOptimizations(
    gasSpent: number,
    portfolioValue: number,
    chainDistribution: Record<string, number>,
  ): WalletInsight[] {
    const insights: WalletInsight[] = []

    const gasPercentage = (gasSpent / portfolioValue) * 100
    if (gasPercentage > 1) {
      insights.push({
        type: "opportunity",
        title: "High Gas Spending",
        description: `You've spent ${gasPercentage.toFixed(2)}% on gas fees`,
        recommendation: "Consider batching transactions or using Layer 2 solutions",
        priority: "high",
      })
    }

    const chains = Object.keys(chainDistribution)
    if (chains.length > 3) {
      insights.push({
        type: "opportunity",
        title: "Multi-Chain Consolidation",
        description: `Your assets are spread across ${chains.length} chains`,
        recommendation: "Consider consolidating to reduce complexity and gas costs",
        priority: "medium",
      })
    }

    return insights
  }

  // Generate response to user query
  generateResponse(query: string, context: any): AssistantResponse {
    const lowerQuery = query.toLowerCase()
    let message = ""
    const insights: WalletInsight[] = []
    let suggestions: string[] = []

    if (lowerQuery.includes("portfolio")) {
      message =
        "Your portfolio shows good diversification with a total value of $24,582.50. Your largest position is ETH at 37.6%, which provides good exposure to the largest blockchain. Consider your risk tolerance when evaluating concentration."
      suggestions = ["Rebalance portfolio", "View asset breakdown", "Analyze performance"]
    } else if (lowerQuery.includes("risk")) {
      message =
        "Your current risk level is LOW. Your transactions show normal patterns with mostly known counterparties. The only recent alert was a transaction to a new address, which is normal for active traders."
      suggestions = ["View risk factors", "Check transaction history", "Update security settings"]
    } else if (lowerQuery.includes("optimize")) {
      message =
        "To optimize your portfolio: 1) Consolidate small positions to save on gas, 2) Use limit orders for large trades, 3) Consider Layer 2 solutions for frequent trading, 4) Rebalance quarterly to maintain target allocation."
      suggestions = ["Calculate gas savings", "View Layer 2 options", "Set up rebalancing alerts"]
    } else {
      message =
        "I can help you with portfolio analysis, risk assessment, transaction recommendations, and optimization strategies. What would you like to explore?"
      suggestions = ["Analyze portfolio", "Check risks", "Get recommendations", "View insights"]
    }

    return {
      message,
      insights,
      suggestions,
    }
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
