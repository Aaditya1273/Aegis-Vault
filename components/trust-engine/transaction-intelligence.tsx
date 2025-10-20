"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react"

const transactions = [
  {
    id: 1,
    type: "send",
    asset: "ETH",
    amount: "0.5",
    to: "0x742d...8f2a",
    timestamp: "2 hours ago",
    riskScore: 5,
    status: "safe",
    reason: "Regular transaction pattern",
  },
  {
    id: 2,
    type: "receive",
    asset: "USDC",
    amount: "1000",
    from: "0x1234...5678",
    timestamp: "5 hours ago",
    riskScore: 8,
    status: "safe",
    reason: "Known counterparty",
  },
  {
    id: 3,
    type: "send",
    asset: "SOL",
    amount: "5",
    to: "0xabcd...ef01",
    timestamp: "1 day ago",
    riskScore: 12,
    status: "warning",
    reason: "New recipient address",
  },
  {
    id: 4,
    type: "receive",
    asset: "MATIC",
    amount: "500",
    from: "0x5678...9abc",
    timestamp: "2 days ago",
    riskScore: 3,
    status: "safe",
    reason: "Verified source",
  },
]

export default function TransactionIntelligence() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Transaction Intelligence</h2>
          <p className="text-sm text-muted">AI-powered risk assessment for each transaction</p>
        </div>
        <Button variant="outline" size="sm" className="bg-transparent">
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {transactions.map((tx, i) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    tx.status === "safe" ? "bg-accent/20 text-accent" : "bg-yellow-500/20 text-yellow-500"
                  }`}
                >
                  {tx.status === "safe" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {tx.type === "send" ? "Sent" : "Received"} {tx.amount} {tx.asset}
                  </p>
                  <p className="text-xs text-muted">
                    {tx.type === "send" ? "to" : "from"} {tx.type === "send" ? tx.to : tx.from}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted">{tx.timestamp}</p>
                <p className={`text-xs font-medium ${tx.status === "safe" ? "text-accent" : "text-yellow-500"}`}>
                  {tx.status === "safe" ? "Safe" : "Warning"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3 h-3 text-muted" />
                <p className="text-xs text-muted">{tx.reason}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">Risk:</span>
                <div className="w-12 h-1.5 bg-background rounded-full overflow-hidden">
                  <div
                    className={`h-full ${tx.riskScore > 10 ? "bg-yellow-500" : "bg-accent"}`}
                    style={{ width: `${tx.riskScore * 8}%` }}
                  />
                </div>
                <span className="text-xs font-medium w-6 text-right">{tx.riskScore}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
