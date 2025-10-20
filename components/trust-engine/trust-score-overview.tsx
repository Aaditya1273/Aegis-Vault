"use client"

import { motion } from "framer-motion"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react"

const trustHistory = [
  { date: "Jan 1", score: 72 },
  { date: "Jan 8", score: 75 },
  { date: "Jan 15", score: 78 },
  { date: "Jan 22", score: 82 },
  { date: "Jan 29", score: 85 },
  { date: "Feb 5", score: 86 },
  { date: "Feb 12", score: 87 },
]

export default function TrustScoreOverview() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-6 rounded-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Trust Score Trend</h2>
        <p className="text-muted text-sm">Your AI-calculated trust score over time</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-background/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-accent" />
            <p className="text-xs text-muted">Current Score</p>
          </div>
          <p className="text-2xl font-bold">87/100</p>
          <p className="text-xs text-accent mt-1">Excellent</p>
        </div>
        <div className="bg-background/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <p className="text-xs text-muted">30-Day Change</p>
          </div>
          <p className="text-2xl font-bold">+15</p>
          <p className="text-xs text-primary mt-1">Improving</p>
        </div>
        <div className="bg-background/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            <p className="text-xs text-muted">Risk Level</p>
          </div>
          <p className="text-2xl font-bold">Low</p>
          <p className="text-xs text-yellow-500 mt-1">Safe</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={trustHistory}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00d9ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
          <YAxis stroke="rgba(255,255,255,0.5)" domain={[60, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0,0,0,0.8)",
              border: "1px solid rgba(0,217,255,0.3)",
              borderRadius: "8px",
            }}
          />
          <Area type="monotone" dataKey="score" stroke="#00d9ff" fillOpacity={1} fill="url(#colorScore)" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
