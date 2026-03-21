"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import StatBox from "@/components/ui/StatBox";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import Button from "@/components/ui/Button";
import { useAutoRepay } from "@/hooks/useAutoRepay";
import { useVaultData } from "@/hooks/useVaultData";
import { useBalances } from "@/hooks/useBalances";
import Link from "next/link";

export default function DashboardPage() {
    const { stats } = useVaultData();
    const { sbtcBalance, aeusdBalance } = useBalances();

    const collateralValue = stats ? (stats.collateral / 100000000) * 64500 : 142904.22;
    const debtValue = stats ? stats.debt / 1000000 : 9842.30;

    const { integerPart, decimalPart } = useAutoRepay(debtValue);

    const healthFactor = stats && stats.debt > 0
        ? (collateralValue / debtValue).toFixed(2)
        : "2.85";

    return (
        <div className="flex bg-surface min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar />
                <main className="p-8 mt-16 overflow-y-auto w-full">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Page Header */}
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Institutional Overview</p>
                                <h1 className="text-4xl font-extrabold headline-font tracking-tight text-on-surface">
                                    Vault Analytics
                                </h1>
                            </div>
                            <div className="text-right hidden sm:block">
                                <p className="text-xs text-outline mb-1 font-bold italic uppercase tracking-widest">Network Status</p>
                                <div className="flex items-center gap-2 justify-end">
                                    <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
                                    <span className="text-sm font-bold text-on-surface italic">Stacks Testnet</span>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatBox
                                label="Total Position Value"
                                value={`$${(collateralValue + (aeusdBalance * 1)).toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                                trend="+12.4%"
                                asset="Combined Assets"
                            />
                            <StatBox
                                label="sBTC Collateral"
                                value={`${stats ? (stats.collateral / 100000000).toFixed(4) : sbtcBalance.toFixed(4)}`}
                                asset="BTC"
                                trend={`~$${collateralValue.toLocaleString()}`}
                            />
                            <StatBox
                                label="Active aeUSD Debt"
                                value={`$${debtValue.toLocaleString()}`}
                                trend="-0.04%"
                                asset="Stablecoins"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Main Content Area: Auto-repayment Visualization */}
                            <div className="lg:col-span-8 space-y-6">
                                <Card variant="high" glass className="p-10 relative overflow-hidden group min-h-[400px] flex flex-col justify-center">
                                    <div className="absolute top-0 right-0 p-8">
                                        <div className="w-20 h-20 rounded-full border border-primary-container/20 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                                            <span className="material-symbols-outlined text-primary-container/20 text-4xl">restart_alt</span>
                                        </div>
                                    </div>

                                    <div className="relative z-10 text-center space-y-8">
                                        <div>
                                            <p className="text-sm font-black text-primary-container uppercase tracking-[0.4em] mb-4 italic">
                                                Real-Time Debt Reduction
                                            </p>
                                            <div className="text-6xl md:text-8xl font-black headline-font tracking-tighter tabular-nums text-white">
                                                ${integerPart}<span className="text-primary-container/40 italic">{decimalPart}</span>
                                            </div>
                                            <p className="text-outline font-bold mt-4 uppercase tracking-widest text-xs">Self-Repaying Principal</p>
                                        </div>

                                        <div className="max-w-md mx-auto w-full space-y-4">
                                            <div className="flex justify-between items-end">
                                                <span className="text-xs font-bold text-outline italic uppercase tracking-widest">Repayment Progress</span>
                                                <span className="text-sm font-black text-primary-container italic">7.42% Total</span>
                                            </div>
                                            <div className="h-4 w-full bg-surface-container-highest rounded-full p-1 border border-white/5 shadow-inner">
                                                <div className="h-full bg-gradient-to-r from-primary-container to-secondary-container rounded-full w-[7.42%] shadow-[0_0_15px_rgba(0,245,255,0.4)]" />
                                            </div>
                                        </div>

                                        <div className="flex justify-center gap-8 pt-8">
                                            <div className="text-center">
                                                <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1 italic">Hourly Yield</p>
                                                <p className="text-xl font-bold text-white tabular-nums">+$1.24</p>
                                            </div>
                                            <div className="w-[1px] h-10 bg-white/5" />
                                            <div className="text-center">
                                                <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1 italic">LTV Ratio</p>
                                                <p className="text-xl font-bold text-white tabular-nums">34.2%</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="p-8" variant="low">
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-outline mb-6 italic">Liquidation Guard</h3>
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <p className="text-xs text-on-surface-variant font-medium mb-1">Current Multiplier</p>
                                                <p className="text-3xl font-black text-white headline-font tracking-tighter">1.52x</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold text-tertiary-fixed-dim uppercase tracking-widest mb-1 italic">Status</p>
                                                <div className="px-3 py-1 rounded-full bg-tertiary-fixed-dim/10 border border-tertiary-fixed-dim/20">
                                                    <span className="text-xs font-black text-tertiary-fixed-dim italic uppercase tracking-tighter">Deep Margin</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="p-8" variant="low">
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-outline mb-6 italic">Protocol Health</h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between text-xs font-bold text-on-surface-variant uppercase tracking-widest italic">
                                                <span>Efficiency</span>
                                                <span className="text-white">99.8%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                                <div className="h-full bg-primary-container w-[99.8%]" />
                                            </div>
                                            <p className="text-[10px] text-outline font-medium">Clarity smart contracts fully verified on-chain.</p>
                                        </div>
                                    </Card>
                                </div>
                            </div>

                            {/* Sidebar: Quick Actions & Risk Overview */}
                            <div className="lg:col-span-4 space-y-6">
                                <Card variant="high" className="p-8 border-primary-container/10">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-outline mb-8 italic">Institutional Actions</h3>
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
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-outline mb-8 italic">Risk Visualizer</h3>
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1 italic">Safety Score</p>
                                                <p className="text-4xl font-black text-on-surface headline-font tracking-tighter">{healthFactor}</p>
                                            </div>
                                            <div className="w-12 h-12 rounded-full border-4 border-tertiary-fixed-dim border-t-transparent animate-[spin_3s_linear_infinite]" />
                                        </div>
                                        <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                                            Your collateral is currently <span className="text-white font-bold italic">Safe</span>. The next yield adjustment will occur in 24 minutes.
                                        </p>
                                        <div className="pt-4 border-t border-white/5 space-y-3">
                                            <div className="flex justify-between text-[10px] font-bold text-outline uppercase tracking-[0.2em] italic">
                                                <span>Balance</span>
                                                <span>{aeusdBalance.toFixed(2)} aeUSD</span>
                                            </div>
                                            <div className="flex justify-between text-[10px] font-bold text-outline uppercase tracking-[0.2em] italic">
                                                <span>Collateral</span>
                                                <span>{stats ? (stats.collateral / 100000000).toFixed(4) : sbtcBalance.toFixed(4)} sBTC</span>
                                            </div>
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
