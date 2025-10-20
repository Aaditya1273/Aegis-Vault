"use client"

import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const trustFactors = [
  { name: "Transaction History", value: 95, weight: "25%" },
  { name: "Account Age", value: 78, weight: "20%" },
  { name: "Social Verification", value: 85, weight: "20%" },
  { name: "Asset Diversity", value: 82, weight: "15%" },
  { name: "Behavior Pattern", value: 88, weight: "15%" },
  { name: "Security Practices", value: 92, weight: "5%" },
]

export default function TrustFactors() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-6">Trust Score Factors</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={trustFactors}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" angle={-45} textAnchor="end" height={80} />
          <YAxis stroke="rgba(255,255,255,0.5)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0,0,0,0.8)",
              border: "1px solid rgba(0,217,255,0.3)",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="value" fill="#00d9ff" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 space-y-2">
        {trustFactors.map((factor, i) => (
          <motion.div
            key={factor.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-muted">{factor.name}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted">{factor.weight}</span>
              <span className="font-medium">{factor.value}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
