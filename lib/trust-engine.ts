// AI Trust Engine - TrustLens
// Calculates trust scores based on multiple factors

export interface TrustMetrics {
  transactionHistory: number
  accountAge: number
  socialVerification: number
  assetDiversity: number
  behaviorPattern: number
  securityPractices: number
}

export interface RiskAssessment {
  transactionRisk: number
  accountSecurity: number
  anomalyDetection: number
  overallRisk: "low" | "medium" | "high" | "critical"
}

export interface TransactionIntelligence {
  riskScore: number
  status: "safe" | "warning" | "alert"
  reason: string
  recommendations: string[]
}

// Calculate overall trust score from metrics
export function calculateTrustScore(metrics: TrustMetrics): number {
  const weights = {
    transactionHistory: 0.25,
    accountAge: 0.2,
    socialVerification: 0.2,
    assetDiversity: 0.15,
    behaviorPattern: 0.15,
    securityPractices: 0.05,
  }

  const score =
    metrics.transactionHistory * weights.transactionHistory +
    metrics.accountAge * weights.accountAge +
    metrics.socialVerification * weights.socialVerification +
    metrics.assetDiversity * weights.assetDiversity +
    metrics.behaviorPattern * weights.behaviorPattern +
    metrics.securityPractices * weights.securityPractices

  return Math.round(score)
}

// Assess transaction risk
export function assessTransactionRisk(
  amount: number,
  recipientHistory: number,
  isNewRecipient: boolean,
  userTrustScore: number,
): TransactionIntelligence {
  let riskScore = 0
  let status: "safe" | "warning" | "alert" = "safe"
  let reason = ""
  const recommendations: string[] = []

  // Factor 1: Recipient history
  if (isNewRecipient) {
    riskScore += 15
    reason = "New recipient address"
    recommendations.push("Verify recipient address before confirming")
  } else if (recipientHistory < 3) {
    riskScore += 8
    reason = "Infrequent recipient"
  } else {
    reason = "Known counterparty"
  }

  // Factor 2: Amount relative to user's typical transactions
  if (amount > 5000) {
    riskScore += 10
    recommendations.push("Large transaction detected")
  }

  // Factor 3: User's trust score
  if (userTrustScore < 60) {
    riskScore += 15
  } else if (userTrustScore < 75) {
    riskScore += 8
  }

  // Determine status
  if (riskScore > 20) {
    status = "alert"
  } else if (riskScore > 10) {
    status = "warning"
  }

  return {
    riskScore: Math.min(riskScore, 100),
    status,
    reason,
    recommendations,
  }
}

// Detect anomalies in transaction patterns
export function detectAnomalies(
  recentTransactions: Array<{ amount: number; timestamp: Date }>,
  userAverageTransaction: number,
): { anomalyScore: number; anomalies: string[] } {
  const anomalies: string[] = []
  let anomalyScore = 0

  if (recentTransactions.length === 0) {
    return { anomalyScore: 0, anomalies: [] }
  }

  // Check for unusual transaction amounts
  const amounts = recentTransactions.map((t) => t.amount)
  const avgAmount = amounts.reduce((a, b) => a + b, 0) / amounts.length
  const stdDev = Math.sqrt(amounts.reduce((sq, n) => sq + Math.pow(n - avgAmount, 2), 0) / amounts.length)

  amounts.forEach((amount) => {
    if (Math.abs(amount - avgAmount) > 2 * stdDev) {
      anomalies.push(`Unusual transaction amount: ${amount}`)
      anomalyScore += 15
    }
  })

  // Check for rapid transactions
  if (recentTransactions.length > 5) {
    const timeDiffs = []
    for (let i = 1; i < recentTransactions.length; i++) {
      const diff = recentTransactions[i].timestamp.getTime() - recentTransactions[i - 1].timestamp.getTime()
      timeDiffs.push(diff)
    }
    const avgTimeDiff = timeDiffs.reduce((a, b) => a + b, 0) / timeDiffs.length
    if (avgTimeDiff < 60000) {
      // Less than 1 minute between transactions
      anomalies.push("Rapid transaction pattern detected")
      anomalyScore += 20
    }
  }

  return {
    anomalyScore: Math.min(anomalyScore, 100),
    anomalies,
  }
}

// Generate trust score trend
export function generateTrustTrend(days = 30): Array<{ date: string; score: number }> {
  const trend = []
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  for (let i = 0; i < days; i += 7) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    const score = Math.min(100, 72 + Math.floor(Math.random() * 20) + i * 0.5)
    trend.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      score: Math.round(score),
    })
  }

  return trend
}
