"use client";

import { useState, useEffect } from "react";

export const useAutoRepay = (initialDebt: number) => {
    const [debt, setDebt] = useState(initialDebt);

    useEffect(() => {
        setDebt(initialDebt);
        const interval = setInterval(() => {
            setDebt((prev) => Math.max(0, prev - 0.000001));
        }, 1000);
        return () => clearInterval(interval);
    }, [initialDebt]);

    const debtStr = debt.toLocaleString(undefined, {
        minimumFractionDigits: 6,
        maximumFractionDigits: 6,
    });

    const parts = debtStr.split(".");
    const integerPart = parts[0];
    const decimalPart = "." + (parts[1] || "000000");

    return { debt, integerPart, decimalPart };
};
