"use client"

import { motion } from "framer-motion"
import { AlertCircle, Shield, Zap } from "lucide-react"

const riskCategories = [
  {
    name: "Transaction Risk",
    level: "Low",
    score: 92,
    icon: Zap,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    name: "Account Security",
    level: "High",
    score: 88,
    icon: Shield,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    name: "Anomaly Detection",
    level: "Low",
    score: 85,
    icon: AlertCircle,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
]

export default function RiskAnalysis() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-6">Risk Analysis</h2>

      <div className="space-y-4">
        {riskCategories.map((category, i) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-lg ${category.bgColor}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <category.icon className={`w-5 h-5 ${category.color}`} />
                <div>
                  <p className="font-medium text-sm">{category.name}</p>
                  <p className={`text-xs ${category.color}`}>{category.level}</p>
                </div>
              </div>
              <p className="font-bold text-lg">{category.score}%</p>
            </div>
            <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r from-primary to-accent`}
                style={{ width: `${category.score}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
        <p className="text-xs text-muted">
          <span className="font-medium text-foreground">AI Insight:</span> Your account shows excellent security
          practices. Continue maintaining regular verification updates.
        </p>
      </div>
    </motion.div>
  )
}
