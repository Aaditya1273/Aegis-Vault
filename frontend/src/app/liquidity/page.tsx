"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import AuthGuard from "@/components/layout/AuthGuard";
import { Droplets, ArrowUpDown, Lock, Unlock } from "lucide-react";

export default function LiquidityPage() {
    return (
        <AuthGuard>
            <div className="flex bg-surface min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <Navbar />
                    <main className="p-8 mt-16 overflow-y-auto w-full">
                        <div className="max-w-7xl mx-auto space-y-8">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Protocol Liquidity</p>
                                <h1 className="text-4xl font-extrabold headline-font tracking-tight text-on-surface">Liquidity</h1>
                            </div>

                            {/* Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { label: "Your Liquidity", value: "$0.00", sub: "Not providing" },
                                    { label: "Pool TVL", value: "$48.2M", sub: "aeUSD/sBTC" },
                                    { label: "Pool APY", value: "6.80%", sub: "Fee rewards" },
                                ].map((s) => (
                                    <Card key={s.label} variant="high" className="p-6">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">{s.label}</p>
                                        <p className="text-3xl font-black headline-font text-white">{s.value}</p>
                                        <p className="text-xs text-outline mt-1">{s.sub}</p>
                                    </Card>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Add Liquidity */}
                                <Card variant="high" className="p-8">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Droplets className="w-4 h-4 text-[#FF9D00]" />
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-outline">Add Liquidity</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="p-4 rounded-2xl bg-surface-container-highest/50 border border-white/5">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs text-outline font-bold uppercase tracking-widest">aeUSD Amount</span>
                                                <span className="text-xs text-outline">Balance: 0.00</span>
                                            </div>
                                            <input
                                                className="w-full bg-transparent text-2xl font-black text-white outline-none placeholder:text-white/20"
                                                placeholder="0.00"
                                            />
                                        </div>
                                        <div className="flex justify-center">
                                            <div className="p-2 rounded-full bg-surface-container border border-white/10">
                                                <ArrowUpDown className="w-4 h-4 text-[#FF9D00]" />
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-surface-container-highest/50 border border-white/5">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs text-outline font-bold uppercase tracking-widest">sBTC Amount</span>
                                                <span className="text-xs text-outline">Balance: 0.0000</span>
                                            </div>
                                            <input
                                                className="w-full bg-transparent text-2xl font-black text-white outline-none placeholder:text-white/20"
                                                placeholder="0.0000"
                                            />
                                        </div>
                                        <Button variant="primary" size="lg" className="w-full mt-2">
                                            <Lock className="w-4 h-4" />
                                            Add Liquidity
                                        </Button>
                                    </div>
                                </Card>

                                {/* Pool Info */}
                                <Card variant="low" className="p-8">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Unlock className="w-4 h-4 text-outline" />
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-outline">Pool Details</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { label: "Pool Pair", value: "aeUSD / sBTC" },
                                            { label: "Fee Tier", value: "0.30%" },
                                            { label: "24h Volume", value: "$2.4M" },
                                            { label: "24h Fees", value: "$7,200" },
                                            { label: "Your Share", value: "0.00%" },
                                            { label: "Your Fees Earned", value: "$0.00" },
                                        ].map((r) => (
                                            <div key={r.label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                                                <span className="text-sm text-outline">{r.label}</span>
                                                <span className="text-sm font-black text-white">{r.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Button variant="outline" size="md" className="w-full mt-6">
                                        Remove Liquidity
                                    </Button>
                                </Card>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </AuthGuard>
    );
}
