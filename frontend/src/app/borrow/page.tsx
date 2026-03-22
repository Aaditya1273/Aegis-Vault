"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useBalances } from "@/hooks/useBalances";
import { useVaultData } from "@/hooks/useVaultData";
import { useBtcPrice } from "@/hooks/useBtcPrice";
import { mintaeUSD } from "@/lib/stacks";

import AuthGuard from "@/components/layout/AuthGuard";

import GlassCard from "@/components/ui/GlassCard";
import StatusBadge from "@/components/ui/StatusBadge";
import Input from "@/components/ui/Input";
import { Zap, ShieldAlert, Activity, TrendingUp, Info, ArrowRightCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BorrowPage() {
    const [amount, setAmount] = useState("");
    const { stats } = useVaultData();
    const { sbtcBalance } = useBalances();
    const { btcPrice } = useBtcPrice();

    const collateralBtc = stats ? stats.collateral / 1e8 : 0;
    const collateralValue = collateralBtc * btcPrice;
    const currentDebt = stats ? stats.debt / 1e6 : 0;
    const maxMintable = collateralValue * 0.7;
    const mintAmount = parseFloat(amount.replace(/,/g, "")) || 0;
    const newDebt = currentDebt + mintAmount;
    const newLtv = collateralValue > 0 ? (newDebt / collateralValue) * 100 : 0;
    const collateralRatio = newDebt > 0 ? (collateralValue / newDebt) * 100 : 0;
    const liquidationPrice = collateralBtc > 0 && newDebt > 0
        ? newDebt / (collateralBtc * 0.8) : 0;
    const dailyYield = collateralValue * 0.05 / 365;
    const daysToRepay = dailyYield > 0 && newDebt > 0 ? newDebt / dailyYield : 0;

    const riskLevel = newLtv > 70 ? "High" : newLtv > 50 ? "Moderate" : "Low";
    const riskColor = newLtv > 70 ? "text-rose-400" : newLtv > 50 ? "text-amber-400" : "text-emerald-400";

    return (
        <AuthGuard>
            <div className="flex bg-surface min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <Navbar />
                    <main className="min-h-screen pt-32 pb-24 px-6 flex justify-center items-start overflow-hidden">
                        {/* Background Ambiance */}
                        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-[120px] pointer-events-none" />
                        <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-secondary-container/5 rounded-full blur-[120px] pointer-events-none" />

                        <div className="w-full max-w-5xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">

                            {/* Main Interaction Area */}
                            <div className="lg:col-span-7 space-y-6">
                                <GlassCard className="p-0 border-white/5">
                                    <div className="flex justify-between items-start mb-10 text-left">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <StatusBadge label="Institutional Minting" className="bg-primary-container/10 border-primary-container/20 text-primary-container" />
                                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">aeUSD Stablecoin</span>
                                            </div>
                                            <h1 className="text-4xl font-black headline-font tracking-tight text-white">
                                                Borrow <span className="text-primary-container">Liquidity</span>
                                            </h1>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-3xl border border-white/10">
                                            <Zap className="w-8 h-8 text-primary-container" />
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <Input
                                            label="Amount to Mint"
                                            symbol="aeUSD"
                                            placeholder="0.00"
                                            balance={`Max: $${maxMintable.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            type="number"
                                            className="bg-white/[0.02] border-white/10"
                                        />

                                        <div className="p-6 rounded-[2rem] bg-white/[0.01] border border-white/5 space-y-4">
                                            <div className="flex justify-between items-center text-left">
                                                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Target Debt Balance</span>
                                                <span className="text-xl font-black text-white">${newDebt.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-left">
                                                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Collateral Value</span>
                                                <span className="text-sm font-bold text-white/60">${collateralValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                            </div>
                                        </div>

                                        <Button
                                            size="xl"
                                            className="w-full mt-6 rounded-[2rem] h-20 text-lg font-black uppercase tracking-[0.2em] shadow-[0_20px_50px_-10px_rgba(255,157,0,0.3)] group overflow-hidden relative"
                                            onClick={() => mintaeUSD(parseFloat(amount.replace(/,/g, '')))}
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-3">
                                                Mint aeUSD
                                                <ArrowRightCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                        </Button>
                                    </div>
                                </GlassCard>

                                <GlassCard className="p-8 border-white/5 bg-white/[0.01]">
                                    <div className="flex justify-between items-end mb-8 text-left">
                                        <div>
                                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-2">Risk visualizer</h3>
                                            <p className={cn("text-2xl font-black headline-font", riskColor)}>
                                                {newDebt > 0 ? `${riskLevel} Risk` : "Status: Active"}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest block mb-1">Ratio</span>
                                            <span className="text-2xl font-black text-white tabular-nums">{collateralRatio > 0 ? `${collateralRatio.toFixed(1)}%` : "∞"}</span>
                                        </div>
                                    </div>

                                    <div className="h-3 w-full bg-white/[0.03] rounded-full p-0.5 border border-white/10 overflow-hidden">
                                        <div
                                            className={cn("h-full rounded-full transition-all duration-700",
                                                newLtv > 70 ? "bg-rose-500" : newLtv > 50 ? "bg-amber-500" : "bg-emerald-500"
                                            )}
                                            style={{ width: `${Math.min((newLtv / 80) * 100, 100)}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between mt-3 text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
                                        <span>Optimal</span>
                                        <span className="text-amber-500/40">Warning 60%</span>
                                        <span className="text-rose-500/40">Liquidation 80%</span>
                                    </div>
                                </GlassCard>
                            </div>

                            {/* Sidebar Analytics Area */}
                            <div className="lg:col-span-5 space-y-8">
                                <GlassCard className="p-8 border-white/5 bg-white/[0.02]">
                                    <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-white/30 mb-8 flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-primary-container" />
                                        Position Analytics
                                    </h3>

                                    <div className="space-y-8">
                                        <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 text-left">
                                            <span className="block text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Liq. Price (BTC)</span>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-black text-white">${liquidationPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                                <ShieldAlert className="w-4 h-4 text-rose-400" />
                                            </div>
                                        </div>

                                        <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 text-left">
                                            <span className="block text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Auto-Repayment Est.</span>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-black text-white">{daysToRepay > 0 ? daysToRepay.toFixed(0) : "—"}</span>
                                                <span className="text-xs font-bold text-primary-container tracking-widest">DAYS</span>
                                            </div>
                                        </div>

                                        <div className="pt-8 border-t border-white/5 flex items-start gap-5">
                                            <div className="bg-white/5 p-2 rounded-xl">
                                                <Info className="w-4 h-4 text-white/30" />
                                            </div>
                                            <p className="text-[11px] leading-relaxed text-white/30 font-medium text-left">
                                                15% of Vault yield is automatically routed to principal reduction, decreasing your LTV over time.
                                            </p>
                                        </div>
                                    </div>
                                </GlassCard>

                                <div className="p-8 rounded-[2.5rem] bg-primary-container/[0.03] border border-primary-container/10 flex items-start gap-5 text-left">
                                    <div className="w-12 h-12 rounded-2xl bg-primary-container/10 flex items-center justify-center shrink-0">
                                        <TrendingUp className="w-6 h-6 text-primary-container" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white mb-2 tracking-tight">Institutional Leverage</p>
                                        <p className="text-xs text-white/40 leading-relaxed font-medium">
                                            Aegis-Vault uses decentralized oracles and isolated collateral pools to ensure maximum position stability.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </AuthGuard>
    );
}
