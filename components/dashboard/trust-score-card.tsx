"use client"

import { motion } from "framer-motion"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { Shield, AlertCircle } from "lucide-react"

export default function TrustScoreCard() {
  const trustScore = 87
  const riskLevel = "Low"

  const factors = [
    { label: "Transaction History", score: 95 },
    { label: "Account Age", score: 78 },
    { label: "Social Verification", score: 85 },
    { label: "Asset Diversity", score: 82 },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-6 rounded-xl">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold">AI Trust Score</h3>
      </div>

      <div className="flex justify-center mb-6">
        <div className="w-32 h-32">
          <CircularProgressbar
            value={trustScore}
            text={`${trustScore}`}
            styles={buildStyles({
              rotation: 0,
              strokeLinecap: "round",
              textSize: "32px",
              pathTransitionDuration: 0.5,
              pathColor: "#00d9ff",
              textColor: "#ffffff",
              trailColor: "rgba(0,217,255,0.1)",
              backgroundColor: "#0066ff",
            })}
          />
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-muted text-sm mb-1">Risk Level</p>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <p className="font-medium text-accent">{riskLevel}</p>
        </div>
      </div>

      <div className="space-y-3 pt-6 border-t border-border">
        {factors.map((factor, i) => (
          <motion.div
            key={factor.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between"
          >
            <p className="text-sm text-muted">{factor.label}</p>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${factor.score}%` }} />
              </div>
              <span className="text-xs font-medium w-8 text-right">{factor.score}%</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 rounded-lg bg-accent/10 border border-accent/20 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
        <p className="text-xs text-muted">
          Your trust score is excellent. Continue verifying your identity to unlock premium features.
        </p>
      </div>
    </motion.div>
  )
}
