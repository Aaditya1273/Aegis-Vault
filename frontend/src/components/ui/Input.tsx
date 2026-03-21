"use client";

import React from "react";
import { motion } from "framer-motion";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    symbol?: string;
    icon?: string;
    balance?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    symbol,
    icon,
    balance,
    ...props
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel p-8 rounded-2xl border border-white/5 group focus-within:border-primary-container/30 transition-all duration-500 shadow-2xl bg-surface/20"
        >
            <div className="flex justify-between items-center mb-6">
                <label className="text-[10px] font-black text-outline uppercase tracking-[0.3em] italic">
                    {label}
                </label>
                {balance && (
                    <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest italic">
                        Balance: {balance}
                    </span>
                )}
            </div>
            <div className="flex items-center gap-6">
                <input
                    className="bg-transparent border-none p-0 text-5xl md:text-6xl font-black headline-font text-white w-full focus:ring-0 placeholder:text-white/5 tabular-nums outline-none tracking-tighter"
                    {...props}
                />
                {symbol && (
                    <div className="flex items-center gap-3 bg-surface-container-highest/50 px-5 py-3 rounded-2xl border border-white/5 shadow-lg backdrop-blur-xl">
                        {icon && (
                            <span
                                className={`material-symbols-outlined text-2xl ${symbol === 'BTC' ? 'text-[#F7931A]' : 'text-primary-container'}`}
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                {icon}
                            </span>
                        )}
                        <span className="font-black text-sm tracking-[0.1em] uppercase italic text-white">{symbol}</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Input;
