"use client"

import { motion } from "framer-motion"
import { TrendingUp, Award, Users, CheckCircle2 } from "lucide-react"

export default function ReputationScore() {
  const reputationFactors = [
    { label: "Profile Completeness", score: 95, icon: Award },
    { label: "Social Followers", score: 88, icon: Users },
    { label: "Verification Status", score: 100, icon: CheckCircle2 },
    { label: "Activity Level", score: 82, icon: TrendingUp },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-6">Reputation Score</h2>

      <div className="text-center mb-6">
        <div className="text-5xl font-bold text-accent mb-2">8.5/10</div>
        <p className="text-muted">Excellent Reputation</p>
      </div>

      <div className="space-y-3">
        {reputationFactors.map((factor, i) => (
          <motion.div
            key={factor.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <factor.icon className="w-4 h-4 text-muted" />
              <p className="text-sm text-muted">{factor.label}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${factor.score}%` }} />
              </div>
              <span className="text-xs font-medium w-8 text-right">{factor.score}%</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-xs text-muted">
          Your reputation is based on your social profiles, verification status, and on-chain activity.
        </p>
      </div>
    </motion.div>
  )
}
