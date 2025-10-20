"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, MoreVertical } from "lucide-react"
import { useWalletData } from "@/lib/hooks/use-wallet-data"
import { useEffect, useState } from "react"

export default function AssetsList() {
  const [walletAddress, setWalletAddress] = useState<string>("")
  const { tokenBalances, isLoading } = useWalletData(walletAddress, 1)

  useEffect(() => {
    const address = localStorage.getItem("walletAddress") || ""
    setWalletAddress(address)
  }, [])

  const totalValue = tokenBalances.reduce((sum, token) => sum + token.usdValue, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Your Assets</h3>
        <Button variant="outline" size="sm" className="bg-transparent">
          Add Asset
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-muted">Loading assets...</div>
      ) : tokenBalances.length === 0 ? (
        <div className="text-center py-8 text-muted">No assets found</div>
      ) : (
        <div className="space-y-3">
          {tokenBalances.map((asset, i) => {
            const allocation = totalValue > 0 ? (asset.usdValue / totalValue) * 100 : 0
            const change = Math.random() * 20 - 10 // Mock change for demo

            return (
              <motion.div
                key={asset.tokenAddress}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                    {asset.tokenSymbol.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{asset.tokenSymbol}</p>
                    <p className="text-xs text-muted">{asset.chainName}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-8 flex-1">
                  <div className="text-right">
                    <p className="font-medium">{Number.parseFloat(asset.balance).toFixed(4)}</p>
                    <p className="text-xs text-muted">
                      ${asset.usdValue.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div
                    className={`text-sm font-medium flex items-center gap-1 ${change > 0 ? "text-accent" : "text-red-500"}`}
                  >
                    {change > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                    {Math.abs(change).toFixed(1)}%
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
