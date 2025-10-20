"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft, ExternalLink } from "lucide-react"

const allTransactions = [
  {
    id: 1,
    type: "send",
    asset: "ETH",
    amount: "0.5",
    usdAmount: 1850,
    to: "0x742d35Cc6634C0532925a3b844Bc9e7595f8f2a",
    timestamp: "2024-02-12 14:32",
    status: "completed",
    txHash: "0x1234...5678",
  },
  {
    id: 2,
    type: "receive",
    asset: "USDC",
    amount: "1000",
    usdAmount: 1000,
    from: "0x1234567890123456789012345678901234567890",
    timestamp: "2024-02-12 10:15",
    status: "completed",
    txHash: "0xabcd...ef01",
  },
  {
    id: 3,
    type: "send",
    asset: "SOL",
    amount: "5",
    usdAmount: 1500,
    to: "0xabcdef0123456789abcdef0123456789abcdef01",
    timestamp: "2024-02-11 09:45",
    status: "completed",
    txHash: "0x5678...9abc",
  },
  {
    id: 4,
    type: "receive",
    asset: "MATIC",
    amount: "500",
    usdAmount: 500,
    from: "0x5678901234567890123456789012345678901234",
    timestamp: "2024-02-10 16:20",
    status: "completed",
    txHash: "0xdef0...1234",
  },
]

export default function TransactionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Transactions</h1>
        <p className="text-muted">View and manage all your transaction history</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-6 rounded-xl">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted" />
            <Input placeholder="Search transactions..." className="pl-10" />
          </div>
          <Button variant="outline" className="bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="space-y-3">
          {allTransactions.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors group"
            >
              <div className="flex items-center gap-4 flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === "send" ? "bg-red-500/20 text-red-500" : "bg-accent/20 text-accent"
                  }`}
                >
                  {tx.type === "send" ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    {tx.type === "send" ? "Sent" : "Received"} {tx.asset}
                  </p>
                  <p className="text-xs text-muted">
                    {tx.type === "send" ? "to" : "from"} {tx.type === "send" ? tx.to : tx.from}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="font-medium">{tx.amount}</p>
                  <p className="text-xs text-muted">${tx.usdAmount}</p>
                </div>
                <div className="text-right min-w-32">
                  <p className="text-sm text-muted">{tx.timestamp}</p>
                  <p className="text-xs font-medium text-accent">Completed</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
