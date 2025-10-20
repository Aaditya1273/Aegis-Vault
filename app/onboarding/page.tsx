"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function OnboardingWelcome() {
  const router = useRouter()

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <div className="card-glass p-8 rounded-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">L</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">Welcome to LUMINAUT</h1>
        <p className="text-muted text-center mb-8">Your AI-powered Web3 wallet for intelligent asset management</p>

        <div className="space-y-3 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary text-sm">✓</span>
            </div>
            <div>
              <p className="font-medium">Multi-chain support</p>
              <p className="text-sm text-muted">Manage assets across all major blockchains</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary text-sm">✓</span>
            </div>
            <div>
              <p className="font-medium">AI Trust Engine</p>
              <p className="text-sm text-muted">Real-time risk analysis and insights</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary text-sm">✓</span>
            </div>
            <div>
              <p className="font-medium">Non-custodial</p>
              <p className="text-sm text-muted">You control your keys and assets</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button onClick={() => router.push("/onboarding/connect-wallet")} className="w-full btn-primary">
            Create New Wallet
          </Button>
          <Button onClick={() => router.push("/auth/login")} variant="outline" className="w-full">
            Sign In
          </Button>
        </div>

        <p className="text-xs text-muted text-center mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </motion.div>
  )
}
