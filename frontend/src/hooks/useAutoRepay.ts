"use client";

import { useState, useEffect } from "react";

export const useAutoRepay = (initialDebt: number) => {
    const [debt, setDebt] = useState(initialDebt);

    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate real-time auto-repayment (e.g. $0.14 per hour -> $0.0000388 per second)
            setDebt((prev) => Math.max(0, prev - 0.0000388));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formattedDebt = debt.toFixed(2);
    const decimals = (debt % 1).toFixed(4).split(".")[1];

    return {
        debt,
        formattedDebt,
        decimals,
    };
};
