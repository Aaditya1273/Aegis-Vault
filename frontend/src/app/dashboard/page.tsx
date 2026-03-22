"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";
import { useAutoRepay } from "@/hooks/useAutoRepay";
import { useVaultData } from "@/hooks/useVaultData";
import { useBalances } from "@/hooks/useBalances";
import { useBtcPrice } from "@/hooks/useBtcPrice";
import Link from "next/link";
import AuthGuard from "@/components/layout/AuthGuard";
import { cn } from "@/lib/utils";
import FaucetButton from "@/components/ui/FaucetButton";
import GlassCard from "@/components/ui/GlassCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { TrendingUp, ShieldCheck, Zap, Activity, Info, ArrowUpRight, Lock } from "lucide-react";

export default function DashboardPage() {
    const { stats, loading: vaultLoading } = useVaultData();
    const { sbtcBalance, aeusdBalance, btcTestnetBalance, loading: balLoading } = useBalances();
    const { btcPrice } = useBtcPrice();

    const collateralBtc = stats ? stats.collateral / 1e8 : 0;
    const collateralUsd = collateralBtc * btcPrice;
    const debtUsd = stats ? stats.debt / 1e6 : 0;
    const ltv = collateralUsd > 0 ? (debtUsd / collateralUsd) * 100 : 0;
    const healthFactor = debtUsd > 0 ? collateralUsd / debtUsd : null;
    const liquidationPrice = collateralBtc > 0 && debtUsd > 0 ? debtUsd / (collateralBtc * 0.8) : null;
    const maxMintable = collateralUsd * 0.7;
    const repaymentPct = maxMintable > 0 && debtUsd < maxMintable ? Math.max(0, ((maxMintable - debtUsd) / maxMintable) * 100) : 0;
    const hourlyYield = collateralUsd * 0.05 / 8760;

    const { integerPart, decimalPart } = useAutoRepay(debtUsd);
    const loading = vaultLoading || balLoading;

    const healthStatus = healthFactor === null
        ? { label: "Idle", color: "text-white/40", badge: "border-white/10 bg-white/5" }
        : healthFactor >= 2
            ? { label: "Optimal", color: "text-emerald-400", badge: "border-emerald-400/20 bg-emerald-400/10" }
            : healthFactor >= 1.2
                ? { label: "Caution", color: "text-amber-400", badge: "border-amber-400/20 bg-amber-400/10" }
                : { label: "At Risk", color: "text-rose-400", badge: "border-rose-400/20 bg-rose-400/10" };

    return (
        <AuthGuard>
            <div className="flex bg-surface min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <Navbar />
                    <main className="min-h-screen pt-32 pb-24 px-6 overflow-hidden">
                        {/* Background Ambiance */}
                        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary-container/10 rounded-full blur-[140px] pointer-events-none" />
                        <div className="absolute bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-secondary-container/5 rounded-full blur-[140px] pointer-events-none" />

                        <div className="max-w-7xl mx-auto space-y-12 relative z-10">

                            {/* Header Section */}
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="flex items-center gap-3 mb-3 text-left">
                                        <StatusBadge label="Institutional Terminal" className="bg-primary-container/10 border-primary-container/20 text-primary-container" />
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Live Node</span>
                                        </div>
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-black headline-font tracking-tight text-white text-left">
                                        Protocol <span className="text-primary-container">Dashboard</span>
                                    </h1>
                                </div>
                                <div className="hidden lg:flex items-center gap-8 bg-white/5 border border-white/10 px-8 py-4 rounded-[2rem] backdrop-blur-md">
                                    <div className="text-left">
                                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Index Price</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-black text-white tabular-nums">${btcPrice ? btcPrice.toLocaleString() : "—"}</span>
                                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                                        </div>
                                    </div>
                                    <div className="w-px h-10 bg-white/10" />
                                    <div className="text-left">
                                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">24h Volume</p>
                                        <span className="text-xl font-black text-white">$14.2M</span>
                                    </div>
                                </div>
                            </div>

                            {/* Main High-Performance Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                                {/* Left Side: Real-Time Ticker & Analytics */}
                                <div className="lg:col-span-8 space-y-8">
                                    <GlassCard className="p-0 border-white/5 overflow-hidden">
                                        <div className="relative p-12 flex flex-col items-center justify-center min-h-[440px]">
                                            {/* Advanced Background Gradients */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/10 via-transparent to-transparent opacity-50" />

                                            <div className="relative z-10 text-center space-y-12 w-full">
                                                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                                                    <Zap className="w-4 h-4 text-primary-container fill-primary-container shadow-[0_0_15px_rgba(255,157,0,0.5)]" />
                                                    <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Self-Repaying Principal</span>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="text-7xl md:text-9xl font-black headline-font tracking-tighter tabular-nums text-white inline-flex items-baseline">
                                                        <span className="text-primary-container opacity-50 mr-2">$</span>
                                                        {integerPart}<span className="text-white/20">{decimalPart}</span>
                                                    </div>
                                                    <p className="text-white/40 font-bold uppercase tracking-[0.5em] text-xs">Active Asset Protection</p>
                                                </div>

                                                <div className="max-w-md mx-auto w-full group">
                                                    <div className="flex justify-between items-end mb-4 pr-1">
                                                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Repayment Progress</span>
                                                        <span className="text-sm font-black text-primary-container tracking-wide">{repaymentPct.toFixed(2)}%</span>
                                                    </div>
                                                    <div className="h-4 w-full bg-white/[0.03] rounded-full p-1 border border-white/10 overflow-hidden shadow-inner">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-primary-container to-orange-400 rounded-full transition-all duration-[2000ms] relative group-hover:brightness-125"
                                                            style={{ width: `${Math.min(repaymentPct, 100)}%` }}
                                                        >
                                                            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-[shimmer_2s_infinite]" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Micro HUD elements */}
                                            <div className="absolute bottom-8 left-8 flex items-center gap-2 text-white/20">
                                                <Activity className="w-3 h-3" />
                                                <span className="text-[8px] font-black uppercase tracking-widest">Oracle Sync: 1.2s</span>
                                            </div>
                                        </div>
                                    </GlassCard>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <GlassCard className="p-8 border-white/5 bg-white/[0.01]">
                                            <div className="flex justify-between items-start mb-8 text-left">
                                                <div className="space-y-1">
                                                    <h3 className="text-xs font-black uppercase tracking-[0.25em] text-white/40">Vault Safety</h3>
                                                    <p className="text-sm font-bold text-white">Liquidation Monitoring</p>
                                                </div>
                                                <div className={cn("p-3 rounded-2xl border transition-colors", healthStatus.badge)}>
                                                    <ShieldCheck className={cn("w-5 h-5", healthStatus.color)} />
                                                </div>
                                            </div>
                                            <div className="flex items-end justify-between">
                                                <div className="text-left">
                                                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest block mb-1">Health Factor</span>
                                                    <p className={cn("text-4xl font-black headline-font tracking-tighter", healthStatus.color)}>
                                                        {healthFactor ? healthFactor.toFixed(2) : "∞"}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest block mb-1">Status</span>
                                                    <span className={cn("text-sm font-black uppercase tracking-tight", healthStatus.color)}>{healthStatus.label}</span>
                                                </div>
                                            </div>
                                        </GlassCard>

                                        <GlassCard className="p-8 border-white/5 bg-white/[0.01]">
                                            <div className="flex justify-between items-start mb-8 text-left">
                                                <div className="space-y-1">
                                                    <h3 className="text-xs font-black uppercase tracking-[0.25em] text-white/40">Collateral</h3>
                                                    <p className="text-sm font-bold text-white">sBTC Asset Management</p>
                                                </div>
                                                <div className="p-3 rounded-2xl border border-primary-container/20 bg-primary-container/5">
                                                    <Lock className="w-5 h-5 text-primary-container" />
                                                </div>
                                            </div>
                                            <div className="flex items-end justify-between">
                                                <div className="text-left">
                                                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest block mb-1">Locked Balance</span>
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-3xl font-black text-white">{collateralBtc.toFixed(6)}</span>
                                                        <span className="text-xs font-black text-primary-container tracking-widest">sBTC</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest block mb-1">Available (Testnet)</span>
                                                    <span className="text-sm font-black text-emerald-400 tracking-tight">{btcTestnetBalance.toFixed(2)} BTC</span>
                                                </div>
                                            </div>
                                        </GlassCard>
                                    </div>
                                </div>

                                {/* Right Side: Actions & Performance */}
                                <div className="lg:col-span-4 space-y-8">
                                    <GlassCard className="p-8 border-white/5 bg-primary-container/[0.03]">
                                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary-container mb-8 flex items-center gap-2">
                                            <Zap className="w-4 h-4 fill-primary-container" />
                                            Management Terminal
                                        </h3>
                                        <div className="space-y-4">
                                            <Link href="/deposit" className="block group">
                                                <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.05] border border-white/10 group-hover:bg-primary-container group-hover:border-primary-container transition-all duration-300">
                                                    <span className="text-sm font-bold text-white group-hover:text-surface uppercase tracking-widest">Adjust Collateral</span>
                                                    <ArrowUpRight className="w-5 h-5 text-primary-container group-hover:text-surface" />
                                                </div>
                                            </Link>
                                            <Link href="/borrow" className="block group">
                                                <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.05] border border-white/10 group-hover:bg-white/10 transition-all duration-300">
                                                    <span className="text-sm font-bold text-white uppercase tracking-widest">Mint Liquidity</span>
                                                    <div className="bg-primary-container/20 px-2 py-0.5 rounded-lg text-[10px] text-primary-container font-black">aeUSD</div>
                                                </div>
                                            </Link>
                                            <Link href="/liquidity" className="block group">
                                                <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.05] border border-white/10 group-hover:bg-white/10 transition-all duration-300">
                                                    <span className="text-sm font-bold text-white uppercase tracking-widest">Pool Provision</span>
                                                    <span className="material-symbols-outlined text-white/20 text-xl">water_drop</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </GlassCard>

                                    <GlassCard className="p-8 border-white/5 bg-white/[0.01]">
                                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-8 flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4" />
                                            Yield Performance
                                        </h3>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center text-left">
                                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Accrued Rewards</span>
                                                <span className="text-lg font-black text-emerald-400 tabular-nums">+$42.18</span>
                                            </div>
                                            <div className="flex justify-between items-center text-left">
                                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Hourly Velocity</span>
                                                <span className="text-sm font-bold text-white">+{hourlyYield.toFixed(4)} USD/h</span>
                                            </div>

                                            <div className="pt-6 border-t border-white/5 flex items-start gap-4">
                                                <div className="bg-white/5 p-2 rounded-xl">
                                                    <Info className="w-4 h-4 text-white/30" />
                                                </div>
                                                <p className="text-[11px] leading-relaxed text-white/30 font-medium text-left">
                                                    Your sBTC is currently participating in the PoX-4 consensus cycle.
                                                </p>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <style jsx global>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
            <FaucetButton />
        </AuthGuard>
    );
}
