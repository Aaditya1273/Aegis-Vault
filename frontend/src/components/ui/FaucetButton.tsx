"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, Zap, Loader2, CheckCircle2, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { claimTestnetBTC, toggleSimulationMode } from "@/lib/stacks";

export default function FaucetButton() {
    const [status, setStatus] = useState<"idle" | "claiming" | "success">("idle");
    const [syncing, setSyncing] = useState(false);

    const handleSync = async () => {
        setSyncing(true);
        try {
            await toggleSimulationMode(true);
            alert("Protocol synced to BTC Testnet Simulation!");
        } catch (e) {
            console.error("Sync failed:", e);
        } finally {
            setSyncing(false);
        }
    };

    const handleClaim = async () => {
        setStatus("claiming");
        try {
            await claimTestnetBTC();
            setStatus("success");
            setTimeout(() => setStatus("idle"), 5000);
        } catch (e) {
            console.error("Faucet claim failed:", e);
            setStatus("idle");
        }
    };

    return (
        <div className="fixed bottom-10 right-10 z-50">
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
            >
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-container to-secondary-container rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />

                <button
                    onClick={handleClaim}
                    disabled={status === "claiming"}
                    className={cn(
                        "relative flex items-center gap-3 px-8 py-5 rounded-[2rem] border border-white/10 backdrop-blur-2xl transition-all duration-500",
                        status === "success"
                            ? "bg-green-500/10 border-green-500/20 text-green-400"
                            : "bg-black/60 hover:bg-black/80 text-white"
                    )}
                >
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {status === "claiming" ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0, rotate: -180 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 180 }}
                                >
                                    <Loader2 className="w-5 h-5 animate-spin text-primary-container" />
                                </motion.div>
                            ) : status === "success" ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.5 }}
                                >
                                    <CheckCircle2 className="w-5 h-5" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="idle"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <Coins className="w-5 h-5 text-primary-container" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex flex-col items-start">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 leading-none mb-1">
                            Demo Faucet
                        </span>
                        <span className="text-sm font-black tracking-tight leading-none">
                            {status === "claiming" ? "Claiming..." : status === "success" ? "BTC Received!" : "Get Testnet BTC"}
                        </span>
                    </div>

                    {status === "idle" && (
                        <Zap className="w-4 h-4 ml-2 text-primary-container animate-pulse" />
                    )}
                </button>

                {/* Sync Protocol Control - Made visible if status is idle */}
                <div className="absolute -top-16 left-0 right-0 flex justify-center opacity-100 transition-opacity duration-300">
                    <button
                        onClick={handleSync}
                        disabled={syncing}
                        className={cn(
                            "bg-primary-container text-black border border-primary-container/20 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-[0_10px_30px_-5px_rgba(255,157,0,0.4)] hover:brightness-110 transition-all flex items-center gap-2",
                            syncing && "opacity-50"
                        )}
                    >
                        {syncing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Activity className="w-3 h-3 text-black/40" />}
                        {syncing ? "Syncing..." : "Step 1: Sync Protocol to Simulation"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
