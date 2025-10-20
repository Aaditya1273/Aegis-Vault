import { router, publicProcedure } from "../trpc"
import { z } from "zod"
import { getWalletService } from "@/lib/blockchain/wallet-service"
import { getTokenService } from "@/lib/blockchain/token-service"
import { getAIAssistant } from "@/lib/ai/openai-service"

export const appRouter = router({
  wallet: router({
    getBalance: publicProcedure
      .input(z.object({ address: z.string(), chainId: z.number() }))
      .query(async ({ input }) => {
        const walletService = getWalletService(input.address)
        return walletService.getBalance(input.chainId)
      }),

    getAllBalances: publicProcedure.input(z.object({ address: z.string() })).query(async ({ input }) => {
      const walletService = getWalletService(input.address)
      return walletService.getAllBalances()
    }),

    getTokenBalances: publicProcedure
      .input(z.object({ address: z.string(), chainId: z.number() }))
      .query(async ({ input }) => {
        const walletService = getWalletService(input.address)
        return walletService.getTokenBalances(input.chainId)
      }),

    getTransactionHistory: publicProcedure
      .input(z.object({ address: z.string(), chainId: z.number(), limit: z.number().optional() }))
      .query(async ({ input }) => {
        const walletService = getWalletService(input.address)
        return walletService.getTransactionHistory(input.chainId, input.limit)
      }),
  }),

  token: router({
    getPrice: publicProcedure.input(z.object({ symbol: z.string() })).query(async ({ input }) => {
      const tokenService = getTokenService()
      return tokenService.getTokenPrice(input.symbol)
    }),

    getPrices: publicProcedure.input(z.object({ symbols: z.array(z.string()) })).query(async ({ input }) => {
      const tokenService = getTokenService()
      return tokenService.getTokenPrices(input.symbols)
    }),

    swap: publicProcedure
      .input(
        z.object({
          fromToken: z.string(),
          toToken: z.string(),
          amount: z.string(),
          chainId: z.number(),
        }),
      )
      .query(async ({ input }) => {
        const tokenService = getTokenService()
        return tokenService.swapTokens(input.fromToken, input.toToken, input.amount, input.chainId)
      }),
  }),

  ai: router({
    generateResponse: publicProcedure
      .input(z.object({ query: z.string(), context: z.any() }))
      .mutation(async ({ input }) => {
        const assistant = getAIAssistant()
        return assistant.generateResponse(input.query, input.context)
      }),
  }),
})

export type AppRouter = typeof appRouter
