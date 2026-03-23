"use client";

import { useState, useEffect } from "react";
import { fetchCallReadOnlyFunction, cvToJSON, Cl } from "@stacks/transactions";
import { userSession, EFFECTIVE_NETWORK, CONTRACT_ADDRESS, AEUSD_CONTRACT, BTC_TESTNET_CONTRACT } from "@/lib/stacks";

const HIRO_API = EFFECTIVE_NETWORK.client.baseUrl;
// sBTC on testnet (SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token)
const SBTC_CONTRACT = "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token";

export const useBalances = () => {
    const [sbtcBalance, setSbtcBalance] = useState<number>(0);
    const [aeusdBalance, setAeusdBalance] = useState<number>(0);
    const [btcTestnetBalance, setBtcTestnetBalance] = useState<number>(0);
    const [stxBalance, setStxBalance] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const fetchBalances = async () => {
        if (!userSession.isUserSignedIn()) return;
        const userData = userSession.loadUserData();
        const stxAddress = userData?.profile?.stxAddress?.testnet || userData?.profile?.stxAddress?.mainnet;
        if (!stxAddress) return;

        setLoading(true);
        try {
            // Step 1: Broad balance check (STX, official sBTC)
            try {
                const res = await window.fetch(`${HIRO_API}/extended/v1/address/${stxAddress}/balances`);
                if (res.ok) {
                    const data = await res.json();
                    setStxBalance(Number(data?.stx?.balance ?? 0) / 1_000_000);
                    const sbtcEntry = data?.fungible_tokens?.[SBTC_CONTRACT];
                    if (sbtcEntry) setSbtcBalance(Number(sbtcEntry.balance || 0) / 1e8);
                }
            } catch (e) {
                console.warn("[Aegis:Balances] Hiro Indexer Fetch Failed:", e);
            }

            // Step 2: Contract-Direct aeUSD
            try {
                const aeusdResult = await fetchCallReadOnlyFunction({
                    network: EFFECTIVE_NETWORK as any,
                    contractAddress: CONTRACT_ADDRESS,
                    contractName: AEUSD_CONTRACT,
                    functionName: "get-balance",
                    functionArgs: [Cl.standardPrincipal(stxAddress)],
                    senderAddress: stxAddress,
                });
                setAeusdBalance(Number(cvToJSON(aeusdResult)?.value?.value ?? 0) / 1e6);
            } catch (e) {
                console.warn("[Aegis:Balances] aeUSD fetch failed:", e);
            }

            // Step 3: Mock BTC Simulation Balance
            try {
                const btcResult = await fetchCallReadOnlyFunction({
                    network: EFFECTIVE_NETWORK as any,
                    contractAddress: CONTRACT_ADDRESS,
                    contractName: BTC_TESTNET_CONTRACT,
                    functionName: "get-balance",
                    functionArgs: [Cl.standardPrincipal(stxAddress)],
                    senderAddress: stxAddress,
                });
                setBtcTestnetBalance(Number(cvToJSON(btcResult)?.value?.value ?? 0) / 1e8);
            } catch (e) {
                console.warn("[Aegis:Balances] Mock BTC fetch failed:", e);
            }
        } catch (e) {
            console.error("[Aegis:Balances] Loop Error:", e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBalances();
        const interval = setInterval(fetchBalances, 30000);
        return () => clearInterval(interval);
    }, []);

    return { sbtcBalance, aeusdBalance, btcTestnetBalance, stxBalance, loading, refresh: fetchBalances };
};
