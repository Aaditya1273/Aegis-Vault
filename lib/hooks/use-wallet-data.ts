"use client"

import { useEffect, useState } from "react"
import { trpc } from "@/lib/trpc-client"

export function useWalletData(address: string, chainId: number) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const balanceQuery = trpc.wallet.getBalance.useQuery({ address, chainId }, { enabled: !!address })

  const tokenBalancesQuery = trpc.wallet.getTokenBalances.useQuery({ address, chainId }, { enabled: !!address })

  const transactionHistoryQuery = trpc.wallet.getTransactionHistory.useQuery(
    { address, chainId, limit: 10 },
    { enabled: !!address },
  )

  useEffect(() => {
    if (balanceQuery.isLoading || tokenBalancesQuery.isLoading || transactionHistoryQuery.isLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }

    if (balanceQuery.error || tokenBalancesQuery.error || transactionHistoryQuery.error) {
      setError("Failed to fetch wallet data")
    } else {
      setError(null)
    }
  }, [balanceQuery.isLoading, tokenBalancesQuery.isLoading, transactionHistoryQuery.isLoading])

  return {
    balance: balanceQuery.data,
    tokenBalances: tokenBalancesQuery.data || [],
    transactions: transactionHistoryQuery.data || [],
    isLoading,
    error,
  }
}
