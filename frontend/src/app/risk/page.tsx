"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Card from "@/components/ui/Card";
import AuthGuard from "@/components/layout/AuthGuard";
import { useVaultData } from "@/hooks/useVaultData";
import { useBtcPrice } from "@/hooks/useBtcPrice";
import { ShieldCheck, AlertTriangle, TrendingDown, Activity } from "lucide-react";

export default function RiskPage() {
    const { stats } = useVaultData();
    const { btcPrice } = useBtcPrice();

    const collateralBtc = stats ? stats.collateral / 1e8 : 0;
    const collateralUsd = collateralBtc * btcPrice;
    const debtUsd = stats ? stats.debt / 1e6 : 0;
    const ltv = collateralUsd > 0 ? (debtUsd / collateralUsd) * 100 : 0;
    const healthFactor = debtUsd > 0 ? collateralUsd / debtUsd : null;
    const collateralRatio = debtUsd > 0 ? (collateralUsd / debtUsd) * 100 : 0;
    const liquidationPrice = collateralBtc > 0 && debtUsd > 0 ? debtUsd / (collateralBtc * 0.8) : 0;

    const healthStatus = healthFactor === null ? "No Debt"
        : healthFactor >= 2 ? "Safe"
        : healthFactor >= 1.2 ? "Caution" : "At Risk";

    const metrics = [
        { label: "Health Factor", value: healthFactor !== null ? healthFactor.toFixed(2) : "∞", status: healthStatus, statusColor: healthFactor === null || healthFactor >= 2 ? "text-[#ded34e]" : healthFactor >= 1.2 ? "text-[#FF9D00]" : "text-red-400" },
        { label: "LTV Ratio", value: ltv > 0 ? `${ltv.toFixed(1)}%` : "0%", status: ltv < 50 ? "Low Risk" : ltv < 70 ? "Moderate" : "High", statusColor: ltv < 50 ? "text-[#ded34e]" : ltv < 70 ? "text-[#FF9D00]" : "text-red-400" },
        { label: "Liquidation Price", value: liquidationPrice > 0 ? `$${liquidationPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "—", status: liquidationPrice > 0 && btcPrice > 0 ? (btcPrice / liquidationPrice > 2 ? "Far" : "Near") : "—", statusColor: "text-[#ded34e]" },
        { label: "Collateral Ratio", value: collateralRatio > 0 ? `${collateralRatio.toFixed(0)}%` : "∞", status: collateralRatio > 200 || collateralRatio === 0 ? "Healthy" : "Monitor", statusColor: collateralRatio > 200 || collateralRatio === 0 ? "text-[#ded34e]" : "text-[#FF9D00]" },
    ];

    return (
        <AuthGuard>
            <div className="flex bg-surface min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <Navbar />
                    <main className="p-8 mt-16 overflow-y-auto w-full">
                        <div className="max-w-7xl mx-auto space-y-8">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Vault Safety</p>
                                <h1 className="text-4xl font-extrabold headline-font tracking-tight text-on-surface">Risk Analytics</h1>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {metrics.map((m) => (
                                    <Card key={m.label} variant="high" className="p-6">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">{m.label}</p>
                                        <p className="text-3xl font-black headline-font text-white">{m.value}</p>
                                        <p className={`text-xs font-bold uppercase tracking-widest mt-1 ${m.statusColor}`}>{m.status}</p>
                                    </Card>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Collateral Ratio Gauge */}
                                <Card variant="high" className="p-8">
                                    <div className="flex items-center gap-2 mb-6">
                                        <ShieldCheck className="w-4 h-4 text-[#FF9D00]" />
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-outline">Collateral Health</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-outline">Current LTV</span>
                                            <span className="font-black text-white">{ltv > 0 ? `${ltv.toFixed(1)}%` : "0%"}</span>
                                        </div>
                                        <div className="h-4 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-500 ${ltv > 70 ? "bg-red-400" : ltv > 50 ? "bg-[#FF9D00]" : "bg-[#ded34e]"}`}
                                                style={{ width: `${Math.min((ltv / 80) * 100, 100)}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-outline">
                                            <span>0%</span>
                                            <span>Liq. 80%</span>
                                            <span className="text-[#FF9D00]">Max 70%</span>
                                        </div>
                                    </div>
                                </Card>

                                {/* Risk Factors */}
                                <Card variant="low" className="p-8">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Activity className="w-4 h-4 text-outline" />
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-outline">Risk Factors</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { label: "BTC Price Volatility", level: "Low", icon: <TrendingDown className="w-4 h-4 text-[#ded34e]" /> },
                                            { label: "Smart Contract Risk", level: "Minimal", icon: <ShieldCheck className="w-4 h-4 text-[#ded34e]" /> },
                                            { label: "Liquidation Risk", level: "None", icon: <AlertTriangle className="w-4 h-4 text-[#ded34e]" /> },
                                            { label: "Oracle Deviation", level: "0.02%", icon: <Activity className="w-4 h-4 text-[#ded34e]" /> },
                                        ].map((f) => (
                                            <div key={f.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                                <div className="flex items-center gap-3">
                                                    {f.icon}
                                                    <span className="text-sm text-on-surface-variant">{f.label}</span>
                                                </div>
                                                <span className="text-sm font-black text-white">{f.level}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>

                            {/* Liquidation Scenario */}
                            <Card variant="low" className="p-8">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-outline mb-6">Liquidation Scenario Analysis</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { scenario: "BTC -10%", newLtv: collateralUsd > 0 ? (debtUsd / (collateralUsd * 0.9)) * 100 : 0 },
                                    { scenario: "BTC -30%", newLtv: collateralUsd > 0 ? (debtUsd / (collateralUsd * 0.7)) * 100 : 0 },
                                    { scenario: "BTC -50%", newLtv: collateralUsd > 0 ? (debtUsd / (collateralUsd * 0.5)) * 100 : 0 },
                                ].map((s) => {
                                    const status = s.newLtv === 0 ? "No Debt" : s.newLtv < 70 ? "Safe" : s.newLtv < 80 ? "Caution" : "Liquidation";
                                    const color = s.newLtv === 0 ? "text-outline" : s.newLtv < 70 ? "text-[#ded34e]" : s.newLtv < 80 ? "text-[#FF9D00]" : "text-red-400";
                                    return (
                                        <div key={s.scenario} className="p-4 rounded-2xl bg-surface-container-highest/50 border border-white/5">
                                            <p className="text-xs font-bold uppercase tracking-widest text-outline mb-2">{s.scenario}</p>
                                            <p className="text-2xl font-black headline-font text-white">{s.newLtv > 0 ? `${s.newLtv.toFixed(1)}%` : "—"}</p>
                                            <p className={`text-xs font-bold uppercase tracking-widest mt-1 ${color}`}>{status}</p>
                                        </div>
                                    );
                                })}
                                </div>
                            </Card>
                        </div>
                    </main>
                </div>
            </div>
        </AuthGuard>
    );
}
