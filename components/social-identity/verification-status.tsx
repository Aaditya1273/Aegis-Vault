"use client"

import type React from "react"

import { motion } from "framer-motion"
import { CheckCircle2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VerificationItem {
  id: string
  name: string
  status: "verified" | "pending" | "failed"
  description: string
  icon: React.ReactNode
}

const verifications: VerificationItem[] = [
  {
    id: "1",
    name: "Email Verification",
    status: "verified",
    description: "Verified on Feb 12, 2024",
    icon: <CheckCircle2 className="w-5 h-5 text-accent" />,
  },
  {
    id: "2",
    name: "Phone Verification",
    status: "verified",
    description: "Verified on Feb 10, 2024",
    icon: <CheckCircle2 className="w-5 h-5 text-accent" />,
  },
  {
    id: "3",
    name: "Social Verification",
    status: "verified",
    description: "2 of 2 profiles verified",
    icon: <CheckCircle2 className="w-5 h-5 text-accent" />,
  },
  {
    id: "4",
    name: "KYC Verification",
    status: "pending",
    description: "Awaiting review",
    icon: <Clock className="w-5 h-5 text-yellow-500" />,
  },
]

export default function VerificationStatus() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-6">Verification Status</h2>

      <div className="space-y-3">
        {verifications.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start justify-between p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
          >
            <div className="flex items-start gap-3 flex-1">
              {item.icon}
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-muted">{item.description}</p>
              </div>
            </div>
            {item.status === "pending" && (
              <Button size="sm" variant="outline" className="bg-transparent">
                Complete
              </Button>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted">
            You've completed 3 of 4 verifications. Complete KYC to unlock premium features.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
