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

export default function BorrowPage() {
    const [amount, setAmount] = useState("");
    const { stats } = useVaultData();
    const { sbtcBalance } = useBalances();
    const { btcPrice } = useBtcPrice();

    const collateralBtc = stats ? stats.collateral / 1e8 : 0;
    const collateralValue = collateralBtc * btcPrice;
    const currentDebt = stats ? stats.debt / 1e6 : 0;
    const maxMintable = collateralValue * 0.7; // 70% LTV
    const mintAmount = parseFloat(amount.replace(/,/g, "")) || 0;
    const newDebt = currentDebt + mintAmount;
    const newLtv = collateralValue > 0 ? (newDebt / collateralValue) * 100 : 0;
    const collateralRatio = newDebt > 0 ? (collateralValue / newDebt) * 100 : 0;
    const liquidationPrice = collateralBtc > 0 && newDebt > 0
        ? newDebt / (collateralBtc * 0.8) : 0;
    // Days to repay at 5% APY yield
    const dailyYield = collateralValue * 0.05 / 365;
    const daysToRepay = dailyYield > 0 && newDebt > 0 ? newDebt / dailyYield : 0;

    return (
        <AuthGuard>
            <div className="flex bg-surface min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <Navbar />
                    <main className="p-8 mt-16 overflow-y-auto w-full">
                        <div className="max-w-7xl mx-auto space-y-8">
                            {/* ... Header Content ... */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div>
                                    <h1 className="text-4xl font-extrabold plus-jakarta-sans tracking-tight text-on-surface">
                                        Borrow & Mint aeUSD
                                    </h1>
                                    <p className="text-on-surface-variant mt-2 text-lg">
                                        Leverage your collateral with institutional-grade risk parameters.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/10 text-center min-w-32">
                                        <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Max Mintable</p>
                                        <p className="text-2xl font-bold text-[#FF9D00] tabular-nums tracking-tighter">
                                            {maxMintable > 0 ? `$${maxMintable.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "—"}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/10 text-center min-w-32">
                                        <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Current Debt</p>
                                        <p className="text-2xl font-bold text-white tabular-nums tracking-tighter">
                                            {currentDebt > 0 ? `$${currentDebt.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : "$0"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                <div className="lg:col-span-7 space-y-6">
                                    <Card variant="high" glass className="p-8 shadow-2xl">
                                        <div className="flex justify-between items-center mb-6">
                                            <label className="text-sm font-bold uppercase tracking-widest text-outline">Mint Amount</label>
                                            <span className="text-xs text-on-surface-variant font-medium">
                                                Max: {maxMintable > 0 ? `$${maxMintable.toLocaleString(undefined, { maximumFractionDigits: 0 })} aeUSD` : "Deposit collateral first"}
                                            </span>
                                        </div>
                                        <div className="relative group">
                                            <input
                                                className="w-full bg-surface-container-lowest border-none rounded-2xl py-8 px-8 text-5xl font-extrabold plus-jakarta-sans tabular-nums text-on-surface focus:ring-2 focus:ring-primary-container/30 transition-all outline-none"
                                                placeholder="0.00"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                            />
                                            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-3">
                                                <span className="text-2xl font-bold text-primary-container">aeUSD</span>
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-container to-secondary-container shadow-[0_0_12px_#00f5ff55]" />
                                            </div>
                                        </div>

                                        <div className="mt-8 space-y-4">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-on-surface-variant">Collateral Asset</span>
                                                <span className="font-bold">Institutional sBTC Vault</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-on-surface-variant">Collateral Value</span>
                                                <span className="font-bold tabular-nums">
                                                    {collateralValue > 0 ? `$${collateralValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : "—"}
                                                </span>
                                            </div>
                                            <div className="h-[1px] bg-outline-variant/10 w-full" />
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-bold text-primary">New Debt Balance</span>
                                                <span className="text-xl font-black tabular-nums text-primary-container">
                                                    ${newDebt.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                                </span>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-8" variant="low">
                                        <div className="flex justify-between items-end mb-8">
                                            <div>
                                                <h3 className="text-sm font-bold uppercase tracking-widest text-outline mb-1">Risk Visualizer</h3>
                                                <p className={`text-2xl font-extrabold headline-font ${newLtv > 70 ? "text-red-400" : newLtv > 50 ? "text-[#FF9D00]" : "text-[#ded34e]"}`}>
                                                    {newDebt > 0 ? (newLtv > 70 ? "Danger Zone" : newLtv > 50 ? "Caution" : "Safe") : "No Debt"}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Collateral Ratio</p>
                                                <p className="text-3xl font-black text-on-surface tabular-nums">
                                                    {collateralRatio > 0 ? `${collateralRatio.toFixed(1)}%` : "∞"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="relative h-4 bg-surface-container-highest rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-300 ${newLtv > 70 ? "bg-red-400" : newLtv > 50 ? "bg-[#FF9D00]" : "bg-[#ded34e]"}`}
                                                style={{ width: `${Math.min((newLtv / 80) * 100, 100)}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between mt-3 text-[10px] font-bold uppercase tracking-tighter text-outline-variant">
                                            <span>Liquidation 80%</span>
                                            <span>Warning 60%</span>
                                            <span className="text-[#FF9D00]">Max 70%</span>
                                        </div>
                                    </Card>
                                </div>

                                <div className="lg:col-span-5 space-y-6">
                                    <Card className="p-8" variant="high">
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-outline mb-6">Position Analytics</h3>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-error">trending_down</span>
                                                    <span className="text-on-surface-variant text-sm font-medium">Liquidation Price (BTC)</span>
                                                </div>
                                                <span className="text-lg font-bold tabular-nums text-on-surface">
                                                    {liquidationPrice > 0 ? `$${liquidationPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "—"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary-container">auto_awesome</span>
                                                    <span className="text-on-surface-variant text-sm font-medium">Auto-Repayment Est.</span>
                                                </div>
                                                <span className="text-lg font-bold tabular-nums text-on-surface">
                                                    {daysToRepay > 0 ? `${daysToRepay.toFixed(0)} Days` : "—"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-secondary-fixed">account_balance_wallet</span>
                                                    <span className="text-on-surface-variant text-sm font-medium">Wallet Balance</span>
                                                </div>
                                                <span className="text-lg font-bold tabular-nums text-on-surface">{sbtcBalance.toFixed(4)} sBTC</span>
                                            </div>
                                        </div>
                                        <div className="mt-10 p-4 bg-secondary-container/5 rounded-xl border border-secondary-container/20">
                                            <div className="flex gap-3">
                                                <span className="material-symbols-outlined text-secondary-fixed shrink-0 text-sm">info</span>
                                                <p className="text-[11px] font-medium leading-relaxed text-on-secondary-container">
                                                    The Aegis Auto-Repayment feature uses 15% of your yield generated in the Vault to gradually pay down your aeUSD debt.
                                                </p>
                                            </div>
                                        </div>
                                    </Card>

                                    <Button
                                        size="xl"
                                        className="w-full"
                                        onClick={() => mintaeUSD(parseFloat(amount.replace(/,/g, '')))}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                                        Mint aeUSD
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </AuthGuard>
    );
}
