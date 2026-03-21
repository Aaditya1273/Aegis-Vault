"use client";

import { useState, useEffect } from "react";
import { fetchCallReadOnlyFunction, cvToJSON, Cl } from "@stacks/transactions";
import { userSession, EFFECTIVE_NETWORK, CONTRACT_ADDRESS, AEUSD_CONTRACT } from "@/lib/stacks";

const HIRO_API = "https://api.testnet.hiro.so";
// sBTC on testnet (SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token)
const SBTC_CONTRACT = "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token";

export const useBalances = () => {
    const [sbtcBalance, setSbtcBalance] = useState<number>(0);
    const [aeusdBalance, setAeusdBalance] = useState<number>(0);
    const [stxBalance, setStxBalance] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const fetchBalances = async () => {
        if (!userSession.isUserSignedIn()) return;
        const userData = userSession.loadUserData();
        const stxAddress = userData?.profile?.stxAddress?.testnet || userData?.profile?.stxAddress?.mainnet;
        if (!stxAddress) return;

        setLoading(true);
        try {
            // Fetch all balances from Hiro API in one call
            const res = await window.fetch(`${HIRO_API}/v1/address/${stxAddress}/balances`);
            const data = await res.json();

            // STX balance (in microSTX → STX)
            setStxBalance(Number(data?.stx?.balance ?? 0) / 1_000_000);

            // sBTC balance from fungible tokens
            const sbtcEntry = data?.fungible_tokens?.[SBTC_CONTRACT];
            setSbtcBalance(Number(sbtcEntry?.balance ?? 0) / 1_00_000_000);

            // aeUSD from on-chain read (our own contract)
            const aeusdResult = await fetchCallReadOnlyFunction({
                network: EFFECTIVE_NETWORK,
                contractAddress: CONTRACT_ADDRESS,
                contractName: AEUSD_CONTRACT,
                functionName: "get-balance",
                functionArgs: [Cl.standardPrincipal(stxAddress)],
                senderAddress: stxAddress,
            });
            setAeusdBalance(Number(cvToJSON(aeusdResult)?.value?.value ?? 0) / 1_000_000);
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

    return { sbtcBalance, aeusdBalance, stxBalance, loading, refresh: fetchBalances };
};
