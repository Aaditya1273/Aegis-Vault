"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type OrbState = "idle" | "listening" | "success";

export default function OrbWidget() {
    const [state, setState] = useState<OrbState>("idle");

    useEffect(() => {
        // Demonstration toggle
        const interval = setInterval(() => {
            setState((prev) => {
                if (prev === "idle") return "listening";
                if (prev === "listening") return "success";
                return "idle";
            });
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <div className="glass-panel p-2 rounded-full border border-white/10 shadow-2xl backdrop-blur-3xl overflow-hidden flex items-center gap-4 pr-6 bg-surface/50">
                <div className="relative w-12 h-12 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {state === "idle" && (
                            <motion.div
                                key="idle"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-container/20 to-primary-container shadow-[0_0_20px_#00F5FF33]"
                            />
                        )}
                        {state === "listening" && (
                            <motion.div
                                key="listening"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="w-8 h-8 rounded-full bg-gradient-to-tr from-secondary-container to-secondary-container-high shadow-[0_0_20px_#571BC144]"
                            >
                                <div className="absolute inset-0 rounded-full border border-white/20 animate-ping" />
                            </motion.div>
                        )}
                        {state === "success" && (
                            <motion.div
                                key="success"
                                initial={{ scale: 0, opacity: 0, rotate: -90 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="w-8 h-8 rounded-full bg-gradient-to-tr from-tertiary-fixed-dim to-tertiary-fixed flex items-center justify-center shadow-[0_0_20px_#4EDEA344]"
                            >
                                <span className="material-symbols-outlined text-black text-sm font-black">done</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-outline leading-tight">Aegis AI</span>
                    <span className="text-xs font-bold text-white leading-tight">
                        {state === "idle" && "System Ready"}
                        {state === "listening" && "Syncing Stats..."}
                        {state === "success" && "On-chain Verified"}
                    </span>
                </div>
            </div>
        </div>
    );
}
