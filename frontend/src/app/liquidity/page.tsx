"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import GlassCard from "@/components/ui/GlassCard";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import AuthGuard from "@/components/layout/AuthGuard";
import {
    Droplets,
    TrendingUp,
    Info,
    ArrowRightLeft
} from "lucide-react";
import { useStacks } from "@/components/providers/StacksProvider";
import { cn } from "@/lib/utils";
import {
    addLiquidity,
    removeLiquidity,
    getTokenBalance,
    getPoolReserves,
    getVaultSBTC,
    GET_SBTC_PRINCIPAL,
    AEUSD_CONTRACT,
    LP_TOKEN_CONTRACT
} from "@/lib/stacks";

export default function LiquidityPage() {
    const { stxAddress } = useStacks();
    const [aeusdAmount, setAeusdAmount] = useState("");
    const [sbtcAmount, setSbtcAmount] = useState("");
    const [lpAmount, setLpAmount] = useState("");

    const [activeTab, setActiveTab] = useState<"add" | "remove">("add");
    const [sbtcAddress, setSbtcAddress] = useState(GET_SBTC_PRINCIPAL());
    const [balances, setBalances] = useState({ aeusd: 0, sbtc: 0, lp: 0 });
    const [reserves, setReserves] = useState({ aeusd: 0, sbtc: 0 });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const init = async () => {
            const addr = await getVaultSBTC();
            setSbtcAddress(addr);
        };
        init();
    }, []);

    useEffect(() => {
        if (!stxAddress) return;

        const fetchData = async () => {
            const [aeBalance, lpBalance, poolData] = await Promise.all([
                getTokenBalance(stxAddress, AEUSD_CONTRACT),
                getTokenBalance(stxAddress, LP_TOKEN_CONTRACT),
                getPoolReserves()
            ]);

            const sbtcBalanceResult = await getTokenBalance(stxAddress, sbtcAddress);

            setBalances({
                aeusd: Number(aeBalance) / 1000000,
                sbtc: Number(sbtcBalanceResult) / 100000000,
                lp: Number(lpBalance) / 1000000
            });

            if (poolData && poolData.aeusd && poolData.sbtc) {
                setReserves({
                    aeusd: Number(poolData.aeusd.value || 0) / 1000000,
                    sbtc: Number(poolData.sbtc.value || 0) / 100000000
                });
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, [stxAddress, sbtcAddress]);

    const handleAddLiquidity = async () => {
        if (!aeusdAmount || !sbtcAmount) return;
        setIsLoading(true);
        try {
            await addLiquidity(
                Number(aeusdAmount),
                Number(sbtcAmount),
                sbtcAddress
            );
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveLiquidity = async () => {
        if (!lpAmount) return;
        setIsLoading(true);
        try {
            await removeLiquidity(Number(lpAmount), sbtcAddress);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

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
                                <GlassCard className="p-8 border-white/5">
                                    <div className="flex justify-between items-start mb-10 text-left">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <StatusBadge
                                                    label="Active Pool"
                                                    className="bg-emerald-400/10 text-emerald-400 border-transparent"
                                                />
                                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 text-nowrap">aeUSD / sBTC</span>
                                            </div>
                                            <h1 className="text-4xl font-black headline-font tracking-tight text-white leading-tight">
                                                {activeTab === "add" ? "Liquidity" : "Remove"} <span className="text-primary-container">{activeTab === "add" ? "Provision" : "Liquidity"}</span>
                                            </h1>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-3xl border border-white/10">
                                            <Droplets className="w-8 h-8 text-primary-container" />
                                        </div>
                                    </div>

                                    {/* Tab Navigation */}
                                    <div className="flex p-1.5 bg-white/5 rounded-2xl border border-white/10 mb-8 max-w-[240px]">
                                        <button
                                            onClick={() => setActiveTab("add")}
                                            className={cn(
                                                "flex-1 py-2 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                                                activeTab === "add" ? "bg-primary-container text-surface shadow-lg" : "text-white/40 hover:text-white"
                                            )}
                                        >
                                            Add
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("remove")}
                                            className={cn(
                                                "flex-1 py-2 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                                                activeTab === "remove" ? "bg-primary-container text-surface shadow-lg" : "text-white/40 hover:text-white"
                                            )}
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    {activeTab === "add" && (
                                        <div className="space-y-8">
                                            <Input
                                                label="Provide aeUSD"
                                                symbol="aeUSD"
                                                placeholder="0.00"
                                                balance={`${balances.aeusd.toFixed(2)} aeUSD`}
                                                value={aeusdAmount}
                                                onChange={(e) => setAeusdAmount(e.target.value)}
                                                type="number"
                                                className="bg-white/[0.02] border-white/10"
                                            />

                                            <div className="relative flex justify-center py-2">
                                                <div className="bg-[#111] p-3 rounded-2xl border border-white/10 shadow-2xl text-white/20">
                                                    +
                                                </div>
                                            </div>

                                            <Input
                                                label="Provide sBTC"
                                                symbol="sBTC"
                                                placeholder="0.00"
                                                balance={`${balances.sbtc.toFixed(4)} sBTC`}
                                                value={sbtcAmount}
                                                onChange={(e) => setSbtcAmount(e.target.value)}
                                                type="number"
                                                className="bg-white/[0.02] border-white/10"
                                            />

                                            <Button
                                                size="xl"
                                                className="w-full mt-6 rounded-[2rem] h-20 text-lg font-black uppercase tracking-[0.2em] shadow-[0_20px_50px_-10px_rgba(255,157,0,0.3)] group overflow-hidden relative"
                                                onClick={handleAddLiquidity}
                                                disabled={isLoading || !aeusdAmount || !sbtcAmount}
                                            >
                                                Confirm Provision
                                                <TrendingUp className="ml-3 w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </div>
                                    )}

                                    {activeTab === "remove" && (
                                        <div className="space-y-8">
                                            <Input
                                                label="Amount to Remove"
                                                symbol="LP Tokens"
                                                balance={`${balances.lp.toFixed(2)} aeLP`}
                                                placeholder="0.00"
                                                value={lpAmount}
                                                onChange={(e) => setLpAmount(e.target.value)}
                                                type="number"
                                                className="bg-white/[0.02] border-white/10"
                                            />

                                            <Button
                                                variant="secondary"
                                                size="xl"
                                                className="w-full mt-6 rounded-[2rem] h-20 text-lg font-black uppercase tracking-[0.2em] border-white/10 hover:bg-white/5 text-white"
                                                onClick={handleRemoveLiquidity}
                                                disabled={isLoading || !lpAmount}
                                            >
                                                Withdraw Liquidity
                                                <ArrowRightLeft className="ml-3 w-5 h-5" />
                                            </Button>
                                        </div>
                                    )}
                                </GlassCard>

                                <div className="p-8 flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.01]">
                                    <div className="w-8 h-8 rounded-xl bg-primary-container/10 flex items-center justify-center">
                                        <Info className="w-4 h-4 text-primary-container" />
                                    </div>
                                    <p className="text-[10px] text-white/40 leading-relaxed font-bold text-left">
                                        Aegis AMM ensures continuous liquidity and predictable pricing through constant product market making.
                                    </p>
                                </div>
                            </div>

                            {/* Sidebar Stats Area */}
                            <div className="lg:col-span-5 space-y-8">
                                <GlassCard className="p-8 border-white/5 bg-white/[0.02]">
                                    <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-white/30 mb-8 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-primary-container" />
                                        Pool Statistics
                                    </h3>

                                    <div className="space-y-8">
                                        <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 text-left text-nowrap">
                                            <span className="block text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">aeUSD Reserve</span>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-black text-white">{reserves.aeusd.toFixed(2)}</span>
                                                <span className="text-xs font-bold text-primary-container">aeUSD</span>
                                            </div>
                                        </div>

                                        <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 text-left text-nowrap">
                                            <span className="block text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">sBTC Reserve</span>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-black text-white">{reserves.sbtc.toFixed(6)}</span>
                                                <span className="text-xs font-bold text-primary-container">sBTC</span>
                                            </div>
                                        </div>

                                        <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-white/40">
                                                <Info className="w-3.5 h-3.5" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Protocol Fee</span>
                                            </div>
                                            <span className="text-xs font-black text-white">0.3%</span>
                                        </div>
                                    </div>
                                </GlassCard>

                                <div className="p-8 rounded-[2.5rem] bg-primary-container/[0.03] border border-primary-container/10 flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-2xl bg-primary-container/10 flex items-center justify-center shrink-0">
                                        <Droplets className="w-6 h-6 text-primary-container" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-white mb-2 tracking-tight">Earn Trading Fees</p>
                                        <p className="text-xs text-white/40 leading-relaxed font-medium">
                                            As a liquidity provider, you earn a proportional share of all protocol trading fees in real-time.
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
