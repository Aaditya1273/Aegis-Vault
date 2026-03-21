"use client";

import React from "react";
import { motion } from "framer-motion";
import Card from "./Card";

interface StatBoxProps {
    label: string;
    value: string;
    trend?: string | { value: string; isUp: boolean };
    asset?: string;
    subValue?: string;
    icon?: string;
}

const StatBox: React.FC<StatBoxProps> = ({ label, value, trend, asset, subValue, icon }) => {
    const isUp = typeof trend === "string" ? trend.includes("+") : trend?.isUp;
    const trendValue = typeof trend === "string" ? trend : trend?.value;

    return (
        <Card variant="low" className="p-8 relative overflow-hidden group">
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="flex justify-between items-start mb-6"
            >
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-outline mb-2 italic">
                        {label}
                    </p>
                    <h3 className="text-4xl font-black headline-font tracking-tighter text-on-surface tabular-nums">
                        {value}
                    </h3>
                    {subValue && <p className="text-xs text-on-surface-variant/60 font-medium mt-1">{subValue}</p>}
                </div>
                {icon && (
                    <div className="bg-surface-container-highest/50 p-3 rounded-2xl border border-white/5">
                        <span className="material-symbols-outlined text-primary-container text-2xl">{icon}</span>
                    </div>
                )}
            </motion.div>

            <div className="flex items-center gap-4">
                {asset && (
                    <span className="text-[10px] font-black px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant uppercase tracking-[0.2em] italic border border-white/5">
                        {asset}
                    </span>
                )}
                {trend && (
                    <div className={`flex items-center gap-1.5 ${isUp ? "text-tertiary-fixed-dim" : "text-error"}`}>
                        <span className="material-symbols-outlined text-base font-bold">
                            {isUp ? "trending_up" : "trending_down"}
                        </span>
                        <span className="text-xs font-black italic tracking-tight">{trendValue}</span>
                    </div>
                )}
            </div>

            {/* Decorative interactive glow */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-container/5 rounded-full blur-[40px] group-hover:bg-primary-container/10 transition-colors duration-700" />
        </Card>
    );
};

export default StatBox;
