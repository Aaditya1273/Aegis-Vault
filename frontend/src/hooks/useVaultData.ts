"use client";

import { useState, useEffect } from "react";
import { getVaultStats, userSession } from "@/lib/stacks";

export interface VaultStats {
    collateral: number;
    debt: number;
}

export const useVaultData = () => {
    const [stats, setStats] = useState<VaultStats | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        if (!userSession.isUserSignedIn()) return;
        const userData = userSession.loadUserData();
        const stxAddress = userData?.profile?.stxAddress?.testnet || userData?.profile?.stxAddress?.mainnet;
        if (!stxAddress) return;

        setLoading(true);
        const result = await getVaultStats(stxAddress);
        if (result) {
            setStats({
                collateral: Number(result.collateral?.value || 0),
                debt: Number(result.debt?.value || 0),
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchStats();
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, []);

    return { stats, loading, refresh: fetchStats };
};
