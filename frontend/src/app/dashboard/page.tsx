"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import StatBox from "@/components/ui/StatBox";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useAutoRepay } from "@/hooks/useAutoRepay";
import { useVaultData } from "@/hooks/useVaultData";
import { useBalances } from "@/hooks/useBalances";
import { useBtcPrice } from "@/hooks/useBtcPrice";
import Link from "next/link";

export default function DashboardPage() {
    const { stats, loading: vaultLoading } = useVaultData();
    const { sbtcBalance, aeusdBalance, loading: balLoading } = useBalances();
    const { btcPrice } = useBtcPrice();

    // All values derived from real on-chain data
    const collateralBtc = stats ? stats.collateral / 1e8 : 0;
    const collateralUsd = collateralBtc * btcPrice;
    const debtUsd = stats ? stats.debt / 1e6 : 0;

    // LTV = debt / collateral value * 100
    const ltv = collateralUsd > 0 ? (debtUsd / collateralUsd) * 100 : 0;

    // Health factor = collateral value / debt (>1 = safe, liquidation at 0.8)
    const healthFactor = debtUsd > 0 ? collateralUsd / debtUsd : null;

    // Liquidation price: price at which LTV hits 80% (liquidation threshold)
    // liquidation_price = debt / (collateral_btc * 0.8)
    const liquidationPrice = collateralBtc > 0 && debtUsd > 0
        ? debtUsd / (collateralBtc * 0.8)
        : null;

    // Repayment progress: how much debt has been auto-repaid
    // We track this as % of original debt repaid via yield
    // For now: (1 - current_debt / max_possible_debt) * 100
    const maxMintable = collateralUsd * 0.7; // 70% LTV
    const repaymentPct = maxMintable > 0 && debtUsd < maxMintable
        ? Math.max(0, ((maxMintable - debtUsd) / maxMintable) * 100)
        : 0;

    // Hourly yield estimate: sBTC PoX yield ~5% APY / 8760 hours
    const hourlyYield = collateralUsd * 0.05 / 8760;

    const { integerPart, decimalPart } = useAutoRepay(debtUsd);

    const loading = vaultLoading || balLoading;

    const healthStatus = healthFactor === null
        ? { label: "No Debt", color: "text-[#ded34e]" }
        : healthFactor >= 2
        ? { label: "Safe", color: "text-[#ded34e]" }
        : healthFactor >= 1.2
        ? { label: "Caution", color: "text-[#FF9D00]" }
        : { label: "At Risk", color: "text-red-400" };

    return (
        <div className="flex bg-surface min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar />
                <main className="p-8 mt-16 overflow-y-auto w-full">
                    <div className="max-w-7xl mx-auto space-y-8">

                        {/* Header */}
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Institutional Overview</p>
                                <h1 className="text-4xl font-extrabold headline-font tracking-tight text-on-surface">Vault Analytics</h1>
                            </div>
                            <div className="text-right hidden sm:block">
                                <p className="text-xs text-outline mb-1 font-bold uppercase tracking-widest">BTC Price</p>
                                <p className="text-lg font-black text-white headline-font">
                                    {btcPrice > 0 ? `$${btcPrice.toLocaleString()}` : "—"}
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatBox
                                label="Total Position Value"
                                value={collateralUsd > 0 ? `$${collateralUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : "$0"}
                                trend={btcPrice > 0 ? `BTC $${btcPrice.toLocaleString()}` : "Loading..."}
                                asset="Collateral"
                            />
                            <StatBox
                                label="sBTC Collateral"
                                value={collateralBtc > 0 ? collateralBtc.toFixed(6) : sbtcBalance.toFixed(6)}
                                asset="sBTC"
                                trend={collateralUsd > 0 ? `~$${collateralUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "No collateral"}
                            />
                            <StatBox
                                label="Active aeUSD Debt"
                                value={debtUsd > 0 ? `$${debtUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : "$0"}
                                trend={ltv > 0 ? `${ltv.toFixed(1)}% LTV` : "No debt"}
                                asset="aeUSD"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            <div className="lg:col-span-8 space-y-6">

                                {/* Auto-repay ticker */}
                                <Card variant="high" glass className="p-10 relative overflow-hidden min-h-[400px] flex flex-col justify-center">
                                    <div className="absolute top-0 right-0 p-8">
                                        <div className="w-20 h-20 rounded-full border border-primary-container/20 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                                            <span className="material-symbols-outlined text-primary-container/20 text-4xl">restart_alt</span>
                                        </div>
                                    </div>
                                    <div className="relative z-10 text-center space-y-8">
                                        <div>
                                            <p className="text-sm font-black text-primary-container uppercase tracking-[0.4em] mb-4">
                                                Real-Time Debt Reduction
                                            </p>
                                            <div className="text-6xl md:text-8xl font-black headline-font tracking-tighter tabular-nums text-white">
                                                ${integerPart}<span className="text-primary-container/40">{decimalPart}</span>
                                            </div>
                                            <p className="text-outline font-bold mt-4 uppercase tracking-widest text-xs">Self-Repaying Principal</p>
                                        </div>

                                        <div className="max-w-md mx-auto w-full space-y-3">
                                            <div className="flex justify-between items-end">
                                                <span className="text-xs font-bold text-outline uppercase tracking-widest">Repayment Progress</span>
                                                <span className="text-sm font-black text-primary-container">
                                                    {repaymentPct.toFixed(2)}%
                                                </span>
                                            </div>
                                            <div className="h-4 w-full bg-surface-container-highest rounded-full p-1 border border-white/5">
                                                <div
                                                    className="h-full bg-gradient-to-r from-[#FF9D00] to-[#FF5C00] rounded-full transition-all duration-1000"
                                                    style={{ width: `${Math.min(repaymentPct, 100)}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-center gap-8 pt-4">
                                            <div className="text-center">
                                                <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">Hourly Yield</p>
                                                <p className="text-xl font-bold text-white tabular-nums">
                                                    {hourlyYield > 0 ? `+$${hourlyYield.toFixed(4)}` : "—"}
                                                </p>
                                            </div>
                                            <div className="w-px h-10 bg-white/5" />
                                            <div className="text-center">
                                                <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">LTV Ratio</p>
                                                <p className="text-xl font-bold text-white tabular-nums">
                                                    {ltv > 0 ? `${ltv.toFixed(1)}%` : "—"}
                                                </p>
                                            </div>
                                            <div className="w-px h-10 bg-white/5" />
                                            <div className="text-center">
                                                <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">Liq. Price</p>
                                                <p className="text-xl font-bold text-white tabular-nums">
                                                    {liquidationPrice ? `$${liquidationPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "—"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="p-8" variant="low">
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-outline mb-6">Liquidation Guard</h3>
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <p className="text-xs text-on-surface-variant font-medium mb-1">Health Factor</p>
                                                <p className={`text-3xl font-black headline-font tracking-tighter ${healthStatus.color}`}>
                                                    {healthFactor !== null ? healthFactor.toFixed(2) : "∞"}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-outline">Status</p>
                                                <div className={`px-3 py-1 rounded-full border ${healthStatus.color} border-current/20 bg-current/5`}>
                                                    <span className={`text-xs font-black uppercase tracking-tighter ${healthStatus.color}`}>
                                                        {healthStatus.label}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="p-8" variant="low">
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-outline mb-6">Wallet Balances</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-outline">sBTC</span>
                                                <span className="font-black text-white tabular-nums">{sbtcBalance.toFixed(6)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-outline">aeUSD</span>
                                                <span className="font-black text-white tabular-nums">{aeusdBalance.toFixed(2)}</span>
                                            </div>
                                            <div className="h-px bg-white/5" />
                                            <div className="flex justify-between text-sm">
                                                <span className="text-outline">Max Mintable</span>
                                                <span className="font-black text-[#FF9D00] tabular-nums">
                                                    {maxMintable > 0 ? `$${maxMintable.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "—"}
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>

                            {/* Actions + Risk */}
                            <div className="lg:col-span-4 space-y-6">
                                <Card variant="high" className="p-8">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-outline mb-8">Institutional Actions</h3>
                                    <div className="space-y-4">
                                        <Link href="/deposit" className="block w-full">
                                            <Button variant="primary" className="w-full justify-between group h-14" size="lg">
                                                <span>Deposit BTC</span>
                                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                            </Button>
                                        </Link>
                                        <Link href="/borrow" className="block w-full">
                                            <Button variant="outline" className="w-full justify-between group h-14" size="lg">
                                                <span>Mint aeUSD</span>
                                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">bolt</span>
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>

                                <Card className="p-8" variant="low">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-outline mb-6">Risk Visualizer</h3>
                                    <div className="space-y-5">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">Safety Score</p>
                                                <p className={`text-4xl font-black headline-font tracking-tighter ${healthStatus.color}`}>
                                                    {healthFactor !== null ? healthFactor.toFixed(2) : "∞"}
                                                </p>
                                            </div>
                                            <div className={`w-12 h-12 rounded-full border-4 border-t-transparent animate-[spin_3s_linear_infinite] ${
                                                healthFactor === null || healthFactor >= 2 ? "border-[#ded34e]" :
                                                healthFactor >= 1.2 ? "border-[#FF9D00]" : "border-red-400"
                                            }`} />
                                        </div>

                                        {/* LTV bar */}
                                        <div>
                                            <div className="flex justify-between text-[10px] font-bold text-outline uppercase tracking-widest mb-2">
                                                <span>LTV</span>
                                                <span>{ltv > 0 ? `${ltv.toFixed(1)}%` : "0%"} / 70% max</span>
                                            </div>
                                            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${
                                                        ltv > 70 ? "bg-red-400" : ltv > 50 ? "bg-[#FF9D00]" : "bg-[#FF9D00]"
                                                    }`}
                                                    style={{ width: `${Math.min((ltv / 80) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-2 border-t border-white/5 space-y-3">
                                            <div className="flex justify-between text-[10px] font-bold text-outline uppercase tracking-[0.2em]">
                                                <span>aeUSD Balance</span>
                                                <span className="text-white">{aeusdBalance.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-[10px] font-bold text-outline uppercase tracking-[0.2em]">
                                                <span>Collateral</span>
                                                <span className="text-white">{collateralBtc > 0 ? collateralBtc.toFixed(6) : sbtcBalance.toFixed(6)} sBTC</span>
                                            </div>
                                            {liquidationPrice && (
                                                <div className="flex justify-between text-[10px] font-bold text-outline uppercase tracking-[0.2em]">
                                                    <span>Liq. Price</span>
                                                    <span className="text-red-400">${liquidationPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
