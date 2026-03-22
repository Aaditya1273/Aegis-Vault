"use client";

import { useState, useEffect } from "react";
import { fetchCallReadOnlyFunction, cvToJSON, Cl } from "@stacks/transactions";
import { userSession, EFFECTIVE_NETWORK, CONTRACT_ADDRESS, AEUSD_CONTRACT, BTC_TESTNET_CONTRACT } from "@/lib/stacks";

const HIRO_API = "https://api.testnet.hiro.so";
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
            // Fetch all balances from Hiro API
            const res = await window.fetch(`${HIRO_API}/v1/address/${stxAddress}/balances`);
            const data = await res.json();

            // STX balance
            setStxBalance(Number(data?.stx?.balance ?? 0) / 1_000_000);

            // sBTC balance
            const sbtcEntry = data?.fungible_tokens?.[SBTC_CONTRACT];
            setSbtcBalance(Number(sbtcEntry?.balance ?? 0) / 1_00_000_000);

            // aeUSD balance
            const aeusdResult = await fetchCallReadOnlyFunction({
                network: EFFECTIVE_NETWORK,
                contractAddress: CONTRACT_ADDRESS,
                contractName: AEUSD_CONTRACT,
                functionName: "get-balance",
                functionArgs: [Cl.standardPrincipal(stxAddress)],
                senderAddress: stxAddress,
            });
            setAeusdBalance(Number(cvToJSON(aeusdResult)?.value?.value ?? 0) / 1_000_000);

            // BTC Testnet balance (Mock)
            try {
                const btcResult = await fetchCallReadOnlyFunction({
                    network: EFFECTIVE_NETWORK,
                    contractAddress: CONTRACT_ADDRESS,
                    contractName: BTC_TESTNET_CONTRACT, // Dynamic target for simulation
                    functionName: "get-balance",
                    functionArgs: [Cl.standardPrincipal(stxAddress)],
                    senderAddress: stxAddress,
                });
                setBtcTestnetBalance(Number(cvToJSON(btcResult)?.value?.value ?? 0) / 1_00_000_000);
            } catch (e) {
                console.error("[Aegis:Balances] Mock BTC fetch failed:", e);
                setBtcTestnetBalance(0);
            }
        } catch (e) {
            console.error("Error fetching balances:", e);
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
