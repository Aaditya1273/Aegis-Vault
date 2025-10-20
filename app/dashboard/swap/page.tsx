"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRightLeft, AlertCircle } from "lucide-react"

export default function SwapPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fromToken: "ETH",
    toToken: "USDC",
    fromAmount: "",
    toAmount: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")

    // Mock price calculation
    if (name === "fromAmount" && value) {
      const mockRate = 2500 // ETH to USDC rate
      setFormData((prev) => ({
        ...prev,
        toAmount: (Number.parseFloat(value) * mockRate).toFixed(2),
      }))
    }
  }

  const handleSwap = async () => {
    if (!formData.fromAmount) {
      setError("Please enter an amount")
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.push("/dashboard")
    } catch (err) {
      setError("Swap failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSwapTokens = () => {
    setFormData((prev) => ({
      ...prev,
      fromToken: prev.toToken,
      toToken: prev.fromToken,
      fromAmount: prev.toAmount,
      toAmount: prev.fromAmount,
    }))
  }

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
          <h1 className="text-3xl font-bold mb-2">Swap Tokens</h1>
          <p className="text-muted mb-8">Exchange one token for another</p>

          <div className="space-y-4">
            {/* From Token */}
            <div>
              <Label htmlFor="fromToken">From</Label>
              <div className="flex gap-2 mt-2">
                <select
                  id="fromToken"
                  name="fromToken"
                  value={formData.fromToken}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="USDC">USD Coin (USDC)</option>
                  <option value="USDT">Tether (USDT)</option>
                </select>
                <Input
                  name="fromAmount"
                  type="number"
                  placeholder="0.00"
                  value={formData.fromAmount}
                  onChange={handleInputChange}
                  step="0.0001"
                  className="flex-1"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button onClick={handleSwapTokens} variant="outline" size="icon" className="rounded-full bg-transparent">
                <ArrowRightLeft className="w-4 h-4" />
              </Button>
            </div>

            {/* To Token */}
            <div>
              <Label htmlFor="toToken">To</Label>
              <div className="flex gap-2 mt-2">
                <select
                  id="toToken"
                  name="toToken"
                  value={formData.toToken}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="USDC">USD Coin (USDC)</option>
                  <option value="USDT">Tether (USDT)</option>
                </select>
                <Input
                  name="toAmount"
                  type="number"
                  placeholder="0.00"
                  value={formData.toAmount}
                  disabled
                  className="flex-1"
                />
              </div>
            </div>

            {/* Swap Details */}
            <div className="bg-background/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <p className="text-muted">Exchange Rate</p>
                <p className="font-medium">1 ETH = 2,500 USDC</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p className="text-muted">Price Impact</p>
                <p className="font-medium text-accent">0.05%</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p className="text-muted">Slippage</p>
                <p className="font-medium">0.5%</p>
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
              <Button onClick={handleSwap} disabled={isLoading || !formData.fromAmount} className="flex-1 btn-primary">
                {isLoading ? "Swapping..." : "Swap"}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
