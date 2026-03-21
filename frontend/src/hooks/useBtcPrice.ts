"use client";

import { useState, useEffect } from "react";

export const useBtcPrice = () => {
    const [btcPrice, setBtcPrice] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await window.fetch(
                    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
                );
                const data = await res.json();
                setBtcPrice(data?.bitcoin?.usd ?? 0);
            } catch {
                // fallback — keep last known price
            } finally {
                setLoading(false);
            }
        };

        fetch();
        const interval = setInterval(fetch, 60000); // refresh every minute
        return () => clearInterval(interval);
    }, []);

    return { btcPrice, loading };
};
