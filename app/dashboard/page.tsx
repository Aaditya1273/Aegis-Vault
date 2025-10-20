"use client"

import { motion } from "framer-motion"
import PortfolioOverview from "@/components/dashboard/portfolio-overview"
import AssetsList from "@/components/dashboard/assets-list"
import TransactionHistory from "@/components/dashboard/transaction-history"
import TrustScoreCard from "@/components/dashboard/trust-score-card"

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted">Welcome back! Here's your wallet overview.</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <PortfolioOverview />
        </div>
        <div>
          <TrustScoreCard />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AssetsList />
        </div>
        <div>
          <TransactionHistory />
        </div>
      </div>
    </div>
  )
}
