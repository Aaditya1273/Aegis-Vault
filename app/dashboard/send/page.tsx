"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Send, AlertCircle } from "lucide-react"
import { SUPPORTED_CHAINS } from "@/lib/blockchain/chains"

export default function SendPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    recipient: "",
    amount: "",
    chain: 1,
    asset: "ETH",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSend = async () => {
    if (!formData.recipient || !formData.amount) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    try {
      // Simulate transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.push("/dashboard/transactions")
    } catch (err) {
      setError("Transaction failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const selectedChain = SUPPORTED_CHAINS[formData.chain as keyof typeof SUPPORTED_CHAINS]

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="card-glass p-8 rounded-xl">
          <h1 className="text-3xl font-bold mb-2">Send Crypto</h1>
          <p className="text-muted mb-8">Transfer assets to another wallet</p>

          <div className="space-y-6">
            {/* Chain Selection */}
            <div>
              <Label htmlFor="chain">Select Network</Label>
              <select
                id="chain"
                name="chain"
                value={formData.chain}
                onChange={handleInputChange}
                className="w-full mt-2 px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-primary"
              >
                {Object.values(SUPPORTED_CHAINS).map((chain) => (
                  <option key={chain.id} value={chain.id}>
                    {chain.name} ({chain.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Asset Selection */}
            <div>
              <Label htmlFor="asset">Asset</Label>
              <select
                id="asset"
                name="asset"
                value={formData.asset}
                onChange={handleInputChange}
                className="w-full mt-2 px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-primary"
              >
                <option value="ETH">Ethereum (ETH)</option>
                <option value="USDC">USD Coin (USDC)</option>
                <option value="USDT">Tether (USDT)</option>
              </select>
            </div>

            {/* Recipient Address */}
            <div>
              <Label htmlFor="recipient">Recipient Address</Label>
              <Input
                id="recipient"
                name="recipient"
                placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f8f2a"
                value={formData.recipient}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>

            {/* Amount */}
            <div>
              <Label htmlFor="amount">Amount</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={handleInputChange}
                  step="0.0001"
                />
                <Button variant="outline" className="bg-transparent">
                  Max
                </Button>
              </div>
            </div>

            {/* Gas Estimate */}
            <div className="bg-background/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted">Estimated Gas Fee</p>
                <p className="font-medium">~$2.50</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">Total Cost</p>
                <p className="font-bold">${(Number.parseFloat(formData.amount) * 2500 + 2.5).toFixed(2)}</p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button onClick={() => router.back()} variant="outline" className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button
                onClick={handleSend}
                disabled={isLoading || !formData.recipient || !formData.amount}
                className="flex-1 btn-primary"
              >
                <Send className="w-4 h-4 mr-2" />
                {isLoading ? "Sending..." : "Send"}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
