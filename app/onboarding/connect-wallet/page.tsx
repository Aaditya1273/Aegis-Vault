"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Wallet, Key, Shield } from "lucide-react"

export default function ConnectWallet() {
  const router = useRouter()
  const [step, setStep] = useState<"method" | "details">("method")
  const [walletMethod, setWalletMethod] = useState<"create" | "import" | null>(null)
  const [formData, setFormData] = useState({
    walletName: "",
    email: "",
  })

  const handleMethodSelect = (method: "create" | "import") => {
    setWalletMethod(method)
    setStep("details")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContinue = () => {
    if (formData.walletName && formData.email) {
      router.push("/onboarding/verify-identity")
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl">
      {step === "method" ? (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Connect Your Wallet</h1>
            <p className="text-muted">Choose how you'd like to set up your LUMINAUT wallet</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                id: "create",
                title: "Create New Wallet",
                description: "Generate a new secure wallet with passkeys",
                icon: Key,
                color: "from-primary to-accent",
              },
              {
                id: "import",
                title: "Import Existing",
                description: "Connect your existing Web3 wallet",
                icon: Wallet,
                color: "from-accent to-primary",
              },
            ].map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMethodSelect(option.id as "create" | "import")}
                className="card-glass p-6 rounded-xl text-left hover:border-primary/50 transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center mb-4`}
                >
                  <option.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold mb-2">{option.title}</h3>
                <p className="text-sm text-muted mb-4">{option.description}</p>
                <div className="flex items-center text-primary text-sm font-medium">
                  Select <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <div className="card-glass p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-bold">{walletMethod === "create" ? "Create New Wallet" : "Import Wallet"}</h2>
              <p className="text-sm text-muted">Step 1 of 3</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="walletName">Wallet Name</Label>
              <Input
                id="walletName"
                name="walletName"
                placeholder="My LUMINAUT Wallet"
                value={formData.walletName}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => {
                setStep("method")
                setWalletMethod(null)
              }}
              variant="outline"
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!formData.walletName || !formData.email}
              className="flex-1 btn-primary"
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  )
}
