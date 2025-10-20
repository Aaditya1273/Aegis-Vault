"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Download } from "lucide-react"

const allAssets = [
  {
    id: 1,
    symbol: "ETH",
    name: "Ethereum",
    balance: "2.5",
    usdValue: 9250.5,
    change: "+8.2%",
    chain: "Ethereum",
    icon: "Ξ",
    allocation: "37.6%",
  },
  {
    id: 2,
    symbol: "USDC",
    name: "USD Coin",
    balance: "5000",
    usdValue: 5000,
    change: "+0.1%",
    chain: "Polygon",
    icon: "U",
    allocation: "20.3%",
  },
  {
    id: 3,
    symbol: "SOL",
    name: "Solana",
    balance: "15.3",
    usdValue: 4590,
    change: "+15.3%",
    chain: "Solana",
    icon: "◎",
    allocation: "18.7%",
  },
  {
    id: 4,
    symbol: "MATIC",
    name: "Polygon",
    balance: "1200",
    usdValue: 1200,
    change: "-2.1%",
    chain: "Polygon",
    icon: "M",
    allocation: "4.9%",
  },
  {
    id: 5,
    symbol: "BASE",
    name: "Base",
    balance: "500",
    usdValue: 2500,
    change: "+25.0%",
    chain: "Base",
    icon: "B",
    allocation: "10.2%",
  },
  {
    id: 6,
    symbol: "USDT",
    name: "Tether",
    balance: "2041.5",
    usdValue: 2041.5,
    change: "+0.05%",
    chain: "Ethereum",
    icon: "₮",
    allocation: "8.3%",
  },
]

export default function AssetsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Assets</h1>
        <p className="text-muted">Manage and view all your crypto assets across chains</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-glass p-6 rounded-xl mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted" />
            <Input placeholder="Search assets..." className="pl-10" />
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

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted text-sm">Asset</th>
                <th className="text-left py-3 px-4 font-medium text-muted text-sm">Chain</th>
                <th className="text-right py-3 px-4 font-medium text-muted text-sm">Balance</th>
                <th className="text-right py-3 px-4 font-medium text-muted text-sm">Value</th>
                <th className="text-right py-3 px-4 font-medium text-muted text-sm">Change</th>
                <th className="text-right py-3 px-4 font-medium text-muted text-sm">Allocation</th>
              </tr>
            </thead>
            <tbody>
              {allAssets.map((asset, i) => (
                <motion.tr
                  key={asset.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border/50 hover:bg-background/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                        {asset.icon}
                      </div>
                      <div>
                        <p className="font-medium">{asset.symbol}</p>
                        <p className="text-xs text-muted">{asset.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm">{asset.chain}</td>
                  <td className="py-4 px-4 text-right text-sm font-medium">{asset.balance}</td>
                  <td className="py-4 px-4 text-right text-sm font-medium">${asset.usdValue.toLocaleString()}</td>
                  <td
                    className={`py-4 px-4 text-right text-sm font-medium ${asset.change.startsWith("+") ? "text-accent" : "text-red-500"}`}
                  >
                    {asset.change}
                  </td>
                  <td className="py-4 px-4 text-right text-sm font-medium">{asset.allocation}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
