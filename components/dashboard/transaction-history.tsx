"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, ExternalLink } from "lucide-react"
import { useWalletData } from "@/lib/hooks/use-wallet-data"
import { useEffect, useState } from "react"

export default function TransactionHistory() {
  const [walletAddress, setWalletAddress] = useState<string>("")
  const { transactions, isLoading } = useWalletData(walletAddress, 1)

  useEffect(() => {
    const address = localStorage.getItem("walletAddress") || ""
    setWalletAddress(address)
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Recent Transactions</h3>
        <Button variant="outline" size="sm" className="bg-transparent">
          View All
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-muted">Loading transactions...</div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-8 text-muted">No transactions found</div>
      ) : (
        <div className="space-y-3">
          {transactions.slice(0, 5).map((tx, i) => {
            const isSent = tx.from.toLowerCase() === walletAddress.toLowerCase()
            const amount = Number.parseFloat(tx.value) / 1e18 // Assuming 18 decimals

            return (
              <motion.div
                key={tx.hash}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors group"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isSent ? "bg-red-500/20 text-red-500" : "bg-accent/20 text-accent"
                    }`}
                  >
                    {isSent ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {isSent ? "Sent" : "Received"} {amount.toFixed(4)} ETH
                    </p>
                    <p className="text-xs text-muted truncate">
                      {isSent ? "to" : "from"} {isSent ? tx.to : tx.from}
                    </p>
                  </div>
                </div>

                <div className="text-right mr-2">
                  <p className="font-medium text-sm">{amount.toFixed(4)}</p>
                  <p className="text-xs text-muted">${(amount * 2500).toFixed(2)}</p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, "_blank")}
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </motion.div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
