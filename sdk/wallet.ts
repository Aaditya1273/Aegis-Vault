// Wallet SDK Methods
import type { LuminautClient } from "./client"
import type { WalletBalance, TokenBalance, Transaction } from "./types"

export class WalletSDK {
  constructor(private client: LuminautClient) {}

  async getBalance(address: string, chainId: number): Promise<WalletBalance> {
    return this.client.request(`/wallet/balance`, {
      method: "POST",
      body: JSON.stringify({ address, chainId }),
    })
  }

  async getAllBalances(address: string): Promise<WalletBalance[]> {
    return this.client.request(`/wallet/balances`, {
      method: "POST",
      body: JSON.stringify({ address }),
    })
  }

  async getTokenBalances(address: string, chainId: number): Promise<TokenBalance[]> {
    return this.client.request(`/wallet/tokens`, {
      method: "POST",
      body: JSON.stringify({ address, chainId }),
    })
  }

  async getTransactionHistory(address: string, chainId: number, limit = 10): Promise<Transaction[]> {
    return this.client.request(`/wallet/transactions`, {
      method: "POST",
      body: JSON.stringify({ address, chainId, limit }),
    })
  }

  async sendTransaction(to: string, amount: string, chainId: number): Promise<Transaction> {
    return this.client.request(`/wallet/send`, {
      method: "POST",
      body: JSON.stringify({ to, amount, chainId }),
    })
  }
}
