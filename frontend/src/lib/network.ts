"use client";

import { STACKS_MAINNET, STACKS_TESTNET } from "@stacks/network";

const isMainnet = process.env.NEXT_PUBLIC_STACKS_NETWORK === "mainnet";
export { isMainnet };

/**
 * Total Protocol Synthesis: Official V7 Network Constants
 * V7 moved from Classes to POJO constants. 
 */
const HIRO_TESTNET = "https://stacks-node-api.testnet.stacks.co";
const HIRO_MAINNET = "https://stacks-node-api.mainnet.stacks.co";

const createNetwork = () => {
    const base = isMainnet ? STACKS_MAINNET : STACKS_TESTNET;
    return {
        ...base,
        client: {
            baseUrl: isMainnet ? HIRO_MAINNET : HIRO_TESTNET
        },
        // Modern Stacks.js looks for fetchFn
        get fetchFn() {
            return typeof window !== "undefined" ? fetch.bind(window) : undefined;
        }
    };
};

export const EFFECTIVE_NETWORK = createNetwork();

console.log("[Aegis] Official V7 Protocol Synthesis Enabled:", {
    network: isMainnet ? "Mainnet" : "Testnet",
    url: EFFECTIVE_NETWORK.client.baseUrl
});

export const CONTRACT_ADDRESS =
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "ST2NJZE3SPW0GCPC0YE4V805HTSAGNQJF1HXT6PKY";
export const VAULT_CONTRACT = process.env.NEXT_PUBLIC_VAULT_CONTRACT || "aegis-vault-v20";
export const AEUSD_CONTRACT = process.env.NEXT_PUBLIC_AEUSD_CONTRACT || "aegis-aeusd-v20";
export const LP_TOKEN_CONTRACT = "aegis-lp-token-v21";
export const POOL_CONTRACT = "aegis-pool-v21";
export const SBTC_CONTRACT = process.env.NEXT_PUBLIC_SBTC_CONTRACT || "mock-btc-v5";
export const BTC_TESTNET_CONTRACT = "mock-btc-v5";
