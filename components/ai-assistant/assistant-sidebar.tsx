"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Lightbulb, TrendingUp, AlertCircle, Zap } from "lucide-react"

const insights = [
  {
    icon: TrendingUp,
    title: "Portfolio Trend",
    description: "Up 12.5% this month",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: AlertCircle,
    title: "Risk Alert",
    description: "1 new recipient detected",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Zap,
    title: "Optimization",
    description: "Save 15% on gas fees",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Lightbulb,
    title: "Opportunity",
    description: "Rebalance your portfolio",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
]

export default function AssistantSidebar() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-6 rounded-xl">
      <h3 className="text-lg font-bold mb-4">Quick Insights</h3>

      <div className="space-y-3">
        {insights.map((insight, i) => (
          <motion.button
            key={insight.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`w-full p-3 rounded-lg ${insight.bgColor} hover:opacity-80 transition-opacity text-left`}
          >
            <div className="flex items-start gap-3">
              <insight.icon className={`w-5 h-5 ${insight.color} flex-shrink-0 mt-0.5`} />
              <div className="min-w-0">
                <p className={`font-medium text-sm ${insight.color}`}>{insight.title}</p>
                <p className="text-xs text-muted truncate">{insight.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-bold mb-3">Common Questions</h4>
        <div className="space-y-2">
          {[
            "How to improve trust score?",
            "Best time to swap tokens?",
            "Portfolio rebalancing tips",
            "Gas fee optimization",
          ].map((question, i) => (
            <Button
              key={i}
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs bg-transparent h-auto py-2 px-3"
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
