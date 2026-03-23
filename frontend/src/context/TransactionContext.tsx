"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface Transaction {
    id: string;
    txId: string;
    status: "pending" | "success" | "error";
    timestamp: number;
}

interface TransactionContextType {
    transactions: Transaction[];
    addTransaction: (txId: string) => void;
    removeTransaction: (id: string) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const addTransaction = useCallback((txId: string) => {
        const id = Math.random().toString(36).substring(7);
        setTransactions((prev) => [
            { id, txId, status: "pending", timestamp: Date.now() },
            ...prev,
        ]);
    }, []);

    const removeTransaction = useCallback((id: string) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const updateTxStatus = useCallback((txId: string, status: "success" | "error") => {
        setTransactions((prev) =>
            prev.map((t) => (t.txId === txId ? { ...t, status } : t))
        );
    }, []);

    // Polling logic for pending transactions
    React.useEffect(() => {
        const pending = transactions.filter((t) => t.status === "pending");
        if (pending.length === 0) return;

        const interval = setInterval(async () => {
            for (const tx of pending) {
                try {
                    const res = await fetch(`https://api.testnet.hiro.so/extended/v1/tx/${tx.txId}`);
                    if (!res.ok) continue;
                    const data = await res.json();

                    if (data.tx_status === "success") {
                        updateTxStatus(tx.txId, "success");
                    } else if (data.tx_status === "abort_by_response" || data.tx_status === "abort_by_post_condition") {
                        updateTxStatus(tx.txId, "error");
                    }
                } catch (e) {
                    console.error("Polling error:", e);
                }
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [transactions, updateTxStatus]);

    // Listen for global transaction events
    React.useEffect(() => {
        const handleTx = (event: any) => {
            if (event.detail?.txId) {
                addTransaction(event.detail.txId);
            }
        };
        window.addEventListener("stacks-transaction", handleTx);
        return () => window.removeEventListener("stacks-transaction", handleTx);
    }, [addTransaction]);

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction, removeTransaction }}>
            {children}
        </TransactionContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionContext);
    if (context === undefined) {
        throw new Error("useTransactions must be used within a TransactionProvider");
    }
    return context;
}
