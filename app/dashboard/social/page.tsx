"use client"

import { motion } from "framer-motion"
import SocialProfiles from "@/components/social-identity/social-profiles"
import ReputationScore from "@/components/social-identity/reputation-score"
import VerificationStatus from "@/components/social-identity/verification-status"
import SocialActivity from "@/components/social-identity/social-activity"

export default function SocialPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Social Identity</h1>
        <p className="text-muted">Connect your Web3 social profiles and build your on-chain reputation</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <SocialProfiles />
        </div>
        <div>
          <ReputationScore />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <VerificationStatus />
        <SocialActivity />
      </div>
    </div>
  )
}
