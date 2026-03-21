"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import StatBox from "@/components/ui/StatBox";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import Button from "@/components/ui/Button";
import { useAutoRepay } from "@/hooks/useAutoRepay";
import Link from "next/link";

export default function DashboardPage() {
    const { formattedDebt, decimals } = useAutoRepay(4438.32);

    return (
        <div className="flex bg-surface min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar />
                <main className="p-8 mt-16 overflow-y-auto w-full">
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Page Header */}
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-outline headline-font mb-1">
                                    Institutional Dashboard
                                </p>
                                <h1 className="text-4xl font-extrabold headline-font tracking-tight text-on-surface">
                                    Portfolio Overview
                                </h1>
                            </div>
                            <div className="text-right hidden sm:block">
                                <p className="text-xs text-outline mb-1 font-bold">Connected Network</p>
                                <div className="flex items-center gap-2 text-sm font-semibold text-tertiary-fixed-dim">
                                    <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim shadow-[0_0_8px_currentColor]" />
                                    Mainnet Authority
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatBox
                                label="Total Portfolio Value"
                                value="$42,850.50"
                                trend={{ value: "+2.4%", isUp: true }}
                                assetLabel="BTC + aeUSD"
                            />
                            <StatBox
                                label="Collateral Locked"
                                value="0.6482 sBTC"
                                subValue="≈ $38,412.18 USD"
                            />
                            <StatBox
                                label="Active Loan"
                                value="4,438.32 aeUSD"
                                subValue="Interest Rate: 0.00% (PoX-backed)"
                            />
                        </div>

                        {/* Bento Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Repayment Area */}
                            <div className="lg:col-span-8">
                                <Card glass className="p-8 h-full">
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 text-primary-container text-[10px] font-bold uppercase tracking-widest mb-4">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
                                                Live Strategy
                                            </div>
                                            <h3 className="text-2xl font-bold headline-font mb-2">
                                                PoX Yield Auto-Repaying Debt
                                            </h3>
                                            <p className="text-on-surface-variant text-sm max-w-md">
                                                Your sBTC collateral is earning Proof-of-Transfer rewards, used to pay down debt.
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-outline mb-1 uppercase tracking-tighter font-bold">
                                                Current Debt
                                            </p>
                                            <div className="text-2xl md:text-3xl font-black headline-font tabular-nums text-primary-container">
                                                ${formattedDebt}<span className="text-primary-container/40">{decimals}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <ProgressBar
                                        value={12.4}
                                        label="Loan Repaid: 12.4%"
                                        subLabel="Repaying $0.14 / hour"
                                    />

                                    {/* Chart Placeholder */}
                                    <div className="mt-8 h-44 w-full relative">
                                        <svg className="w-full h-full" viewBox="0 0 800 200">
                                            <defs>
                                                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                                    <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.2" />
                                                    <stop offset="100%" stopColor="#00f5ff" stopOpacity="0" />
                                                </linearGradient>
                                            </defs>
                                            <path d="M0,150 Q100,140 200,160 T400,120 T600,80 T800,40 L800,200 L0,200 Z" fill="url(#chartGradient)" />
                                            <path d="M0,150 Q100,140 200,160 T400,120 T600,80 T800,40" fill="none" stroke="#00f5ff" strokeWidth="3" strokeLinecap="round" />
                                            <circle cx="800" cy="40" r="4" fill="#00f5ff" className="animate-pulse" />
                                        </svg>
                                    </div>
                                </Card>
                            </div>

                            {/* Health Factor Area */}
                            <div className="lg:col-span-4 space-y-6">
                                <Card className="p-8 flex flex-col items-center text-center">
                                    <p className="text-xs font-bold text-outline uppercase tracking-widest mb-6">
                                        Health Factor
                                    </p>
                                    <div className="relative w-40 h-40 flex items-center justify-center">
                                        <svg className="w-full h-full -rotate-90">
                                            <circle className="text-surface-container-lowest" cx="80" cy="80" r="65" fill="transparent" stroke="currentColor" strokeWidth="8" />
                                            <circle className="text-tertiary-fixed-dim" cx="80" cy="80" r="65" fill="transparent" stroke="currentColor" strokeDasharray="408" strokeDashoffset="102" strokeWidth="8" strokeLinecap="round" />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl font-black headline-font">1.85x</span>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary-fixed-dim">Safe</span>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-outline mt-6 font-medium leading-relaxed">
                                        Liquidation risk occurs at 1.10x. Your collateral position is robust.
                                    </p>
                                </Card>

                                <div className="grid grid-cols-1 gap-4">
                                    <Link href="/deposit">
                                        <Button variant="secondary" className="w-full">
                                            <span className="material-symbols-outlined text-primary-container">add_circle</span>
                                            Deposit BTC
                                        </Button>
                                    </Link>
                                    <Link href="/borrow">
                                        <Button variant="primary" className="w-full">
                                            <span className="material-symbols-outlined">payments</span>
                                            Mint aeUSD
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Performance History */}
                        <Card className="overflow-hidden">
                            <div className="px-8 py-6 border-b border-outline-variant/10 flex justify-between items-center">
                                <h4 className="font-bold headline-font">Yield Performance History</h4>
                                <button className="text-[11px] font-bold text-primary-container uppercase tracking-widest">View Full Report</button>
                            </div>
                            <div className="divide-y divide-outline-variant/5">
                                {[
                                    { name: "PoX Cycle #74 Distribution", date: "Mar 24, 2024", icon: "auto_graph", amount: "+$12.42", color: "text-tertiary-container" },
                                    { name: "Collateral Rebalancing", date: "Mar 22, 2024", icon: "database", amount: "0.00 sBTC", color: "text-on-surface" },
                                ].map((row) => (
                                    <div key={row.name} className="px-8 py-4 flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-primary-container text-xl">{row.icon}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">{row.name}</p>
                                                <p className="text-xs text-outline">{row.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-sm font-bold ${row.color}`}>{row.amount}</p>
                                            <p className="text-[10px] text-outline uppercase font-bold">Status: Fixed</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}
