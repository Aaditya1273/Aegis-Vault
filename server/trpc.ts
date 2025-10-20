import { initTRPC } from "@trpc/server"
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch"

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  return {
    req: opts.req,
  }
}

type Context = Awaited<ReturnType<typeof createTRPCContext>>

export const t = initTRPC.context<Context>().create()
export const router = t.router
export const publicProcedure = t.procedure
