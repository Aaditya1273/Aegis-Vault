"use client";

import React from "react";
import { useTransactions } from "@/context/TransactionContext";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

export default function TransactionToast() {
    const { transactions, removeTransaction } = useTransactions();

    if (transactions.length === 0) return null;

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 max-w-md w-full animate-in slide-in-from-right duration-500">
            {transactions.map((tx) => (
                <Card
                    key={tx.id}
                    variant="low"
                    className={cn(
                        "p-0 overflow-hidden backdrop-blur-xl shadow-2xl transition-all duration-500",
                        tx.status === "pending" ? "border-amber-500/20 bg-surface/90" :
                            tx.status === "success" ? "border-emerald-500/20 bg-emerald-500/5 shadow-emerald-500/10" :
                                "border-rose-500/20 bg-rose-500/5 shadow-rose-500/10"
                    )}
                >
                    <div className="p-5 flex items-start gap-4">
                        <div className={cn(
                            "p-2 rounded-xl transition-all duration-500",
                            tx.status === "pending" ? "bg-amber-500/20 text-amber-500 animate-pulse" :
                                tx.status === "success" ? "bg-emerald-500/20 text-emerald-500 scale-110" :
                                    "bg-rose-500/20 text-rose-500 rotate-12"
                        )}>
                            <span className="material-symbols-outlined">
                                {tx.status === "pending" ? "rocket_launch" :
                                    tx.status === "success" ? "verified" : "error"}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h4 className="text-sm font-headline font-bold text-on-surface">
                                    {tx.status === "pending" ? "Transaction Broadcasted" :
                                        tx.status === "success" ? "Transaction Confirmed" : "Transaction Failed"}
                                </h4>
                                <StatusBadge label={tx.status === "pending" ? "Pending" : tx.status === "success" ? "Success" : "Failed"} />
                            </div>
                            <p className="text-xs text-on-surface-variant mt-1 truncate font-mono opacity-60">
                                {tx.txId}
                            </p>
                            <div className="mt-4 flex gap-3">
                                <a
                                    href={`https://explorer.hiro.so/txid/${tx.txId}?chain=testnet`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[11px] font-bold uppercase tracking-widest text-primary-container hover:underline flex items-center gap-1"
                                >
                                    View in Explorer
                                    <span className="material-symbols-outlined text-xs">open_in_new</span>
                                </a>
                                <button
                                    onClick={() => removeTransaction(tx.id)}
                                    className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Progress indicator */}
                    <div className={cn(
                        "h-1 transition-all duration-500",
                        tx.status === "pending" ? "bg-amber-500/20" :
                            tx.status === "success" ? "bg-emerald-500/20" :
                                "bg-rose-500/20"
                    )}>
                        {tx.status === "pending" && (
                            <div
                                className="h-full bg-amber-500 animate-progress"
                                style={{ animation: 'progress 30s linear infinite' }}
                            />
                        )}
                        {tx.status === "success" && <div className="h-full w-full bg-emerald-500" />}
                        {tx.status === "error" && <div className="h-full w-full bg-rose-500" />}
                    </div>
                </Card>
            ))}
            <style jsx>{`
                @keyframes progress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
                .animate-progress {
                    animation: progress 30s linear infinite;
                }
            `}</style>
        </div>
    );
}
