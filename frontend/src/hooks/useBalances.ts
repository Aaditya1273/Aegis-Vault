"use client";

import { useState, useEffect } from "react";
import { fetchCallReadOnlyFunction, cvToJSON, Cl } from "@stacks/transactions";
import { userSession, EFFECTIVE_NETWORK, CONTRACT_ADDRESS, AEUSD_CONTRACT, VAULT_CONTRACT } from "@/lib/stacks";

export const useBalances = () => {
    const [sbtcBalance, setSbtcBalance] = useState<number>(0);
    const [aeusdBalance, setAeusdBalance] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const fetchBalances = async () => {
        if (!userSession.isUserSignedIn()) return;

        const userData = userSession.loadUserData();
        const stxAddress = userData?.profile?.stxAddress?.testnet || userData?.profile?.stxAddress?.mainnet;

        if (!stxAddress) return;

        setLoading(true);
        try {
            // Fetch aeUSD Balance
            const aeusdResult = await fetchCallReadOnlyFunction({
                network: EFFECTIVE_NETWORK,
                contractAddress: CONTRACT_ADDRESS,
                contractName: AEUSD_CONTRACT,
                functionName: "get-balance",
                functionArgs: [Cl.standardPrincipal(stxAddress)],
                senderAddress: stxAddress,
            });
            setAeusdBalance(Number(cvToJSON(aeusdResult).value.value || 0) / 1000000);

            // Fetch sBTC Balance (Mocking for now as it's an external requirement, 
            // but in real app we'd fetch from the sBTC contract address)
            // For this hackathon, we'll assume sBTC is at the same contract address or similar.
            setSbtcBalance(2.405); // UI placeholder for now, or fetch from real sBTC contract if known

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

    return { sbtcBalance, aeusdBalance, loading, refresh: fetchBalances };
};
