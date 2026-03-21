"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { depositCollateral } from "@/lib/stacks";
import { useBalances } from "@/hooks/useBalances";

export default function DepositPage() {
    const [amount, setAmount] = useState("");
    const { sbtcBalance, loading } = useBalances();

    const btcAmount = parseFloat(amount) || 0;
    const sbtcAmount = btcAmount.toFixed(4);

    return (
        <div className="flex bg-surface min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar />
                <main className="min-h-screen pt-32 pb-24 px-6 flex justify-center items-start">
                    <div className="w-full max-w-xl">
                        {/* Breadcrumb / Back button */}
                        <div className="mb-8 flex items-center gap-2 group cursor-pointer w-fit text-on-surface-variant hover:text-white transition-colors">
                            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
                                arrow_back
                            </span>
                            <span className="text-sm font-medium">Back to Assets</span>
                        </div>

                        {/* Main Deposit Canvas */}
                        <Card variant="low" className="p-1 shadow-2xl">
                            <div className="relative p-8 md:p-12">
                                <div className="flex justify-between items-center mb-10">
                                    <div>
                                        <h1 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">
                                            Deposit BTC
                                        </h1>
                                        <p className="text-on-surface-variant text-sm mt-1">
                                            Direct institutional peg-in to sBTC
                                        </p>
                                    </div>
                                    <div className="bg-surface-container-highest p-3 rounded-2xl">
                                        <span
                                            className="material-symbols-outlined text-primary-container text-3xl"
                                            style={{ fontVariationSettings: "'FILL' 1" }}
                                        >
                                            lock
                                        </span>
                                    </div>
                                </div>

                                {/* Input Area */}
                                <div className="space-y-6">
                                    <Input
                                        label="Amount to Deposit"
                                        symbol="BTC"
                                        icon="currency_bitcoin"
                                        balance={`${sbtcBalance.toFixed(4)} BTC`}
                                        placeholder="0.00"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        type="number"
                                    />

                                    {/* Conversion Preview */}
                                    <div className="flex justify-center -my-3 relative z-10">
                                        <div className="bg-surface-container p-2 rounded-full border border-outline-variant/20 shadow-lg">
                                            <span className="material-symbols-outlined text-primary-container">
                                                arrow_downward
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-surface-container-highest/40 p-6 rounded-lg border border-outline-variant/5 backdrop-blur-sm">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-on-surface-variant">
                                                You will receive
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl font-headline font-bold text-primary-container tabular-nums">
                                                    {sbtcAmount}
                                                </span>
                                                <span className="text-sm font-bold opacity-60">sBTC</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="mt-8 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-on-surface-variant">Network Fee</span>
                                        <span className="text-on-surface font-medium tabular-nums">~0.00004 BTC</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-on-surface-variant">Estimated Confirmation</span>
                                        <span className="text-on-surface font-medium">10 - 20 Minutes</span>
                                    </div>
                                    <div className="pt-4 border-t border-outline-variant/10 flex justify-between text-sm font-bold">
                                        <span className="text-on-surface-variant">Protocol Exchange Rate</span>
                                        <span className="text-on-surface">1 BTC = 1 sBTC</span>
                                    </div>
                                </div>

                                {/* Primary CTA */}
                                <Button
                                    size="xl"
                                    className="w-full mt-10 shadow-lg shadow-primary-container/20 group"
                                    onClick={() => depositCollateral(btcAmount * 100000000)} // Convert to sats
                                >
                                    Confirm Deposit
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">chevron_right</span>
                                </Button>

                                {/* Trust Signals */}
                                <div className="mt-8 flex items-center justify-center gap-2 opacity-50">
                                    <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#e5e2e3]">Secured by Bitcoin PoX consensus</span>
                                </div>
                            </div>
                        </Card>

                        {/* Support Info */}
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <Card className="p-4 flex items-start gap-4" variant="low">
                                <div className="text-primary-container bg-primary-container/10 p-2 rounded-full">
                                    <span className="material-symbols-outlined text-sm">info</span>
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Direct Banking</p>
                                    <p className="text-xs text-on-surface-variant leading-relaxed">Your deposit is minted directly into your institutional custody wallet.</p>
                                </div>
                            </Card>
                            <Card className="p-4 flex items-start gap-4" variant="low">
                                <div className="text-secondary-container bg-secondary-container/10 p-2 rounded-full">
                                    <span className="material-symbols-outlined text-sm">support_agent</span>
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">24/7 Priority</p>
                                    <p className="text-xs text-on-surface-variant leading-relaxed">Institutional support is available for all peg-in operations.</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
