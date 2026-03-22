"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { depositCollateral, depositTestnetBTC } from "@/lib/stacks";
import { useBalances } from "@/hooks/useBalances";

import AuthGuard from "@/components/layout/AuthGuard";

import GlassCard from "@/components/ui/GlassCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { ArrowUpRight, Droplets, ShieldCheck, Zap, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import { getSbtcDepositAddress } from "@/lib/sbtc";
import { useStacks } from "@/components/providers/StacksProvider";
import QrPreview from "@/components/ui/QrPreview";

export default function DepositPage() {
    const [amount, setAmount] = useState("");
    const [activeTab, setActiveTab] = useState<"sbtc" | "btc">("sbtc");
    const [depositAddress, setDepositAddress] = useState<string | null>(null);
    const [generating, setGenerating] = useState(false);

    const { sbtcBalance, btcTestnetBalance, loading, refresh } = useBalances();
    const { stxAddress, btcPublicKey } = useStacks();

    const btcAmount = parseFloat(amount) || 0;
    const sbtcAmount = btcAmount.toFixed(4);

    // Generate Direct Deposit Address
    React.useEffect(() => {
        if (activeTab === "btc" && stxAddress && btcPublicKey && !depositAddress) {
            const generate = async () => {
                setGenerating(true);
                try {
                    const result = await getSbtcDepositAddress(stxAddress, btcPublicKey);
                    setDepositAddress(result.address);
                } catch (e) {
                    console.error("Failed to generate deposit address", e);
                } finally {
                    setGenerating(false);
                }
            };
            generate();
        }
    }, [activeTab, stxAddress, btcPublicKey, depositAddress]);

    // Auto-switch to BTC tab if user has Mock BTC but no sBTC
    React.useEffect(() => {
        if (btcTestnetBalance > 0 && sbtcBalance === 0) {
            setActiveTab("btc");
        }
    }, [btcTestnetBalance, sbtcBalance]);

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

                        <div className="w-full max-w-2xl relative z-10">
                            <GlassCard className="p-0 border-white/5">
                                <div className="flex justify-between items-start mb-12">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <StatusBadge label="Institutional" className="bg-primary-container/10 border-primary-container/20 text-primary-container" />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Direct Peg-In</span>
                                        </div>
                                        <h1 className="text-4xl md:text-5xl font-black headline-font tracking-tight text-white">
                                            Deposit <span className="text-primary-container">BTC</span>
                                        </h1>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-3xl border border-white/10 shadow-inner">
                                        <ShieldCheck className="w-8 h-8 text-primary-container" />
                                    </div>
                                </div>

                                <div className="flex gap-4 p-1 bg-white/5 rounded-2xl mb-10 border border-white/5">
                                    <button
                                        onClick={() => setActiveTab("sbtc")}
                                        className={cn(
                                            "flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all",
                                            activeTab === "sbtc" ? "bg-primary-container text-black shadow-lg" : "text-white/40 hover:text-white/60"
                                        )}
                                    >
                                        Institutional sBTC
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("btc")}
                                        className={cn(
                                            "flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all",
                                            activeTab === "btc" ? "bg-primary-container text-black shadow-lg" : "text-white/40 hover:text-white/60"
                                        )}
                                    >
                                        BTC Bridge
                                    </button>
                                </div>

                                {activeTab === "sbtc" ? (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        <Input
                                            label="Collateral Amount"
                                            symbol="BTC"
                                            icon="currency_bitcoin"
                                            balance={`${sbtcBalance.toFixed(4)} BTC`}
                                            placeholder="0.00"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            type="number"
                                            className="bg-white/[0.02] border-white/10 focus:border-primary-container/50 transition-colors"
                                        />

                                        {/* Conversion Preview */}
                                        <div className="relative py-2">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-white/5"></div>
                                            </div>
                                            <div className="relative flex justify-center">
                                                <div className="bg-[#111] p-3 rounded-2xl border border-white/10 shadow-2xl">
                                                    <Zap className="w-5 h-5 text-primary-container fill-primary-container" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white/[0.03] p-8 rounded-[2rem] border border-white/5 backdrop-blur-md relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                            <div className="flex justify-between items-center relative z-10">
                                                <div className="space-y-1">
                                                    <span className="text-xs font-bold uppercase tracking-widest text-white/40">Minting Receipt</span>
                                                    <p className="text-sm text-white/60">Institutional sBTC (SIP-010)</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-baseline gap-2 justify-end">
                                                        <span className="text-4xl font-black text-white tabular-nums tracking-tighter">
                                                            {sbtcAmount}
                                                        </span>
                                                        <span className="text-sm font-black text-primary-container uppercase">sBTC</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Metrics */}
                                        <div className="mt-12 grid grid-cols-2 gap-4">
                                            <div className="p-5 rounded-3xl border border-white/5 bg-white/[0.01]">
                                                <span className="block text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Network Fee</span>
                                                <span className="text-sm font-bold text-white tracking-wide">~0.00004 BTC</span>
                                            </div>
                                            <div className="p-5 rounded-3xl border border-white/5 bg-white/[0.01]">
                                                <span className="block text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Confirmation</span>
                                                <span className="text-sm font-bold text-white tracking-wide">10 - 20 Mins</span>
                                            </div>
                                        </div>

                                        <Button
                                            size="xl"
                                            className={cn(
                                                "w-full mt-10 rounded-[2rem] h-20 text-lg font-black uppercase tracking-[0.2em] group overflow-hidden relative",
                                                btcAmount > sbtcBalance ? "opacity-50 grayscale cursor-not-allowed" : "shadow-[0_20px_50px_-10px_rgba(255,157,0,0.3)]"
                                            )}
                                            onClick={() => btcAmount <= sbtcBalance && depositCollateral(btcAmount)}
                                            disabled={loading || btcAmount <= 0 || btcAmount > sbtcBalance}
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-3">
                                                {btcAmount > sbtcBalance ? "Insufficient sBTC" : "Confirm Deposit"}
                                                <Zap className={cn("w-5 h-5", btcAmount <= sbtcBalance && "group-hover:scale-125 transition-transform")} />
                                            </span>
                                            {btcAmount <= sbtcBalance && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                            )}
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        <div className="space-y-8">
                                            {/* Simulation Banner */}
                                            <div className="bg-primary-container/10 border border-primary-container/20 rounded-3xl p-6 flex items-start gap-4">
                                                <div className="p-2 bg-primary-container/20 rounded-xl">
                                                    <Zap className="w-5 h-5 text-primary-container fill-primary-container" />
                                                </div>
                                                <div className="text-left">
                                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary-container mb-1">Instant Bridge Active</h3>
                                                    <p className="text-[11px] text-white/50 leading-relaxed">
                                                        Using BTC Testnet (L1 Simulation) for the Buidl Battle hackathon. Your pegged-in assets will appear instantly.
                                                    </p>
                                                </div>
                                            </div>

                                            <Input
                                                label="Bridge Amount"
                                                symbol="BTC"
                                                icon="currency_bitcoin"
                                                balance={`${btcTestnetBalance.toFixed(4)} BTC`}
                                                placeholder="0.00"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                type="number"
                                                className="bg-white/[0.02] border-white/10 focus:border-primary-container/50 transition-colors"
                                            />

                                            {/* Instructions or QR Toggle */}
                                            <div className="bg-white/[0.03] p-6 rounded-3xl border border-white/5 space-y-4">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Protocol Status</span>
                                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                                                        <div className="w-1 h-1 rounded-full bg-emerald-400" />
                                                        <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400">Syncing L1</span>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-white/60 leading-relaxed text-left">
                                                    This peg-in is secured by the Aegis-Bridge protocol. Your BTC Testnet will be locked as collateral and sBTC will be minted to your vault.
                                                </p>
                                            </div>

                                            <Button
                                                size="xl"
                                                className={cn(
                                                    "w-full rounded-[2rem] h-20 text-lg font-black uppercase tracking-[0.2em] group overflow-hidden relative shadow-[0_20px_50px_-10px_rgba(255,157,0,0.3)]",
                                                    (btcAmount <= 0 || btcAmount > btcTestnetBalance) && "opacity-50 grayscale cursor-not-allowed"
                                                )}
                                                onClick={() => btcAmount > 0 && btcAmount <= btcTestnetBalance && depositTestnetBTC(btcAmount)}
                                                disabled={loading || btcAmount <= 0 || btcAmount > btcTestnetBalance}
                                            >
                                                <span className="relative z-10 flex items-center justify-center gap-3">
                                                    {btcAmount > btcTestnetBalance ? "Insufficient BTC" : "Initiate Instant Peg-In"}
                                                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </span>
                                            </Button>

                                            <div className="pt-4 flex justify-center">
                                                <button
                                                    onClick={() => setGenerating(!generating)}
                                                    className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white/40 transition-colors"
                                                >
                                                    {generating ? "Hide Advanced L1 Controls" : "View L1 Deposit Address (Advanced)"}
                                                </button>
                                            </div>

                                            {generating && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    className="pt-6 border-t border-white/5"
                                                >
                                                    <QrPreview
                                                        label={depositAddress || "Syncing..."}
                                                        caption="Institutional Node L1 Address"
                                                    />
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-6 flex justify-center">
                                    <a
                                        href="https://bridge.sbtc.rocks/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-primary-container hover:border-primary-container/30 transition-all group"
                                    >
                                        <span>No sBTC? Get it here</span>
                                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </a>
                                </div>

                                <p className="text-center mt-8 text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
                                    Secured by Bitcoin PoX Consensus
                                </p>
                            </GlassCard>

                            <div className="mt-8 grid grid-cols-2 gap-6">
                                <div className="flex items-start gap-4 p-2">
                                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <Info className="w-4 h-4 text-primary-container" />
                                    </div>
                                    <p className="text-[11px] leading-relaxed text-white/40">
                                        Your deposit is minted directly into your institutional custody wallet.
                                    </p>
                                </div>
                                <div className="flex items-start gap-4 p-2">
                                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <Droplets className="w-4 h-4 text-primary-container" />
                                    </div>
                                    <p className="text-[11px] leading-relaxed text-white/40">
                                        Liquidity provision is available immediately after confirmation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </AuthGuard>
    );
}
