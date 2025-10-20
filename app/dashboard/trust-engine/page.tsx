"use client"

import { motion } from "framer-motion"
import TrustScoreOverview from "@/components/trust-engine/trust-score-overview"
import RiskAnalysis from "@/components/trust-engine/risk-analysis"
import TransactionIntelligence from "@/components/trust-engine/transaction-intelligence"
import TrustFactors from "@/components/trust-engine/trust-factors"

export default function TrustEnginePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">TrustLens - AI Trust Engine</h1>
        <p className="text-muted">Real-time risk analysis and transaction intelligence powered by machine learning</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <TrustScoreOverview />
        </div>
        <div>
          <RiskAnalysis />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <TransactionIntelligence />
        <TrustFactors />
      </div>
    </div>
  )
}
