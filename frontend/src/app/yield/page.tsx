"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Card from "@/components/ui/Card";
import AuthGuard from "@/components/layout/AuthGuard";
import { TrendingUp, Zap, Clock, BarChart3 } from "lucide-react";
import { useVaultData } from "@/hooks/useVaultData";
import { useBtcPrice } from "@/hooks/useBtcPrice";

const strategies = [
    {
        name: "sBTC PoX Yield",
        apy: "5.24%",
        risk: "Low",
        riskColor: "text-[#ded34e]",
        desc: "Native Bitcoin yield from Proof-of-Transfer consensus. Auto-compounds into vault.",
        icon: <TrendingUp className="w-5 h-5" />,
        active: true,
    },
    {
        name: "aeUSD Stability Pool",
        apy: "8.10%",
        risk: "Medium",
        riskColor: "text-[#FF9D00]",
        desc: "Provide aeUSD liquidity to the stability pool and earn protocol fees.",
        icon: <Zap className="w-5 h-5" />,
        active: false,
    },
    {
        name: "BTC Lending Vault",
        apy: "3.80%",
        risk: "Low",
        riskColor: "text-[#ded34e]",
        desc: "Lend sBTC to institutional borrowers with over-collateralized positions.",
        icon: <BarChart3 className="w-5 h-5" />,
        active: false,
    },
];

export default function YieldPage() {
    const { stats } = useVaultData();
    const { btcPrice } = useBtcPrice();

    const collateralUsd = stats ? (stats.collateral / 1e8) * btcPrice : 0;
    const annualYield = collateralUsd * 0.05; // 5% APY PoX
    const hourlyYield = annualYield / 8760;
    const dailyYield = annualYield / 365;
    return (
        <AuthGuard>
            <div className="flex bg-surface min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <Navbar />
                    <main className="p-8 mt-16 overflow-y-auto w-full">
                        <div className="max-w-7xl mx-auto space-y-8">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Protocol Yield</p>
                                <h1 className="text-4xl font-extrabold headline-font tracking-tight text-on-surface">Yield Strategies</h1>
                            </div>

                            {/* Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { label: "Total Earned", value: "$1,284.40", sub: "All time" },
                                    { label: "Active APY", value: "5.24%", sub: "PoX yield" },
                                    { label: "Next Payout", value: "~24 min", sub: "Auto-compound" },
                                ].map((s) => (
                                    <Card key={s.label} variant="high" className="p-6">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">{s.label}</p>
                                        <p className="text-3xl font-black headline-font text-white">{s.value}</p>
                                        <p className="text-xs text-outline mt-1">{s.sub}</p>
                                    </Card>
                                ))}
                            </div>

                            {/* Strategies */}
                            <div className="space-y-4">
                                {strategies.map((s) => (
                                    <Card key={s.name} variant={s.active ? "high" : "low"} className={`p-6 ${s.active ? "border border-[#FF9D00]/20" : ""}`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-[#FF9D00]/10 flex items-center justify-center text-[#FF9D00]">
                                                    {s.icon}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-black text-white headline-font">{s.name}</p>
                                                        {s.active && (
                                                            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#FF9D00]/10 text-[#FF9D00]">Active</span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-outline mt-0.5">{s.desc}</p>
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0 ml-6">
                                                <p className="text-2xl font-black headline-font text-white">{s.apy}</p>
                                                <p className={`text-xs font-bold uppercase tracking-widest ${s.riskColor}`}>{s.risk} Risk</p>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {/* Yield History */}
                            <Card variant="low" className="p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <Clock className="w-4 h-4 text-outline" />
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-outline">Recent Yield Events</h3>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { time: "2 hours ago", amount: "+$1.24", type: "PoX Yield" },
                                        { time: "4 hours ago", amount: "+$1.24", type: "PoX Yield" },
                                        { time: "6 hours ago", amount: "+$1.19", type: "PoX Yield" },
                                        { time: "8 hours ago", amount: "+$1.31", type: "PoX Yield" },
                                    ].map((e, i) => (
                                        <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                                            <div>
                                                <p className="text-sm font-bold text-white">{e.type}</p>
                                                <p className="text-xs text-outline">{e.time}</p>
                                            </div>
                                            <p className="text-sm font-black text-[#ded34e]">{e.amount}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </main>
                </div>
            </div>
        </AuthGuard>
    );
}
