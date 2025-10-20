// Supported blockchain networks configuration

export interface ChainConfig {
  id: number
  name: string
  symbol: string
  rpcUrl: string
  explorerUrl: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  icon: string
}

export const SUPPORTED_CHAINS: Record<number, ChainConfig> = {
  1: {
    id: 1,
    name: "Ethereum",
    symbol: "ETH",
    rpcUrl: "https://eth.llamarpc.com",
    explorerUrl: "https://etherscan.io",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    icon: "Ξ",
  },
  137: {
    id: 137,
    name: "Polygon",
    symbol: "MATIC",
    rpcUrl: "https://polygon-rpc.com",
    explorerUrl: "https://polygonscan.com",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    icon: "M",
  },
  8453: {
    id: 8453,
    name: "Base",
    symbol: "BASE",
    rpcUrl: "https://mainnet.base.org",
    explorerUrl: "https://basescan.org",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    icon: "B",
  },
  solana: {
    id: 0,
    name: "Solana",
    symbol: "SOL",
    rpcUrl: "https://api.mainnet-beta.solana.com",
    explorerUrl: "https://solscan.io",
    nativeCurrency: {
      name: "Solana",
      symbol: "SOL",
      decimals: 9,
    },
    icon: "◎",
  },
}

export function getChainConfig(chainId: number | string): ChainConfig | undefined {
  if (typeof chainId === "string") {
    return Object.values(SUPPORTED_CHAINS).find((chain) => chain.symbol === chainId)
  }
  return SUPPORTED_CHAINS[chainId]
}

export function getAllChains(): ChainConfig[] {
  return Object.values(SUPPORTED_CHAINS)
}
