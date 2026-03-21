"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SoftAurora from "./ui/SoftAurora";
import MeteorShower from "./ui/MeteorShower";
import LogoField from "./ui/LogoField";
import DynamicMesh from "./ui/DynamicMesh";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden">
            {/* Atmospheric Layer */}
            <div className="absolute inset-0 z-0 bg-[#020202]">
                <DynamicMesh />
                <MeteorShower />
                <LogoField />
                <SoftAurora
                    color1="#000000"
                    color2="#1e1b4b"
                    brightness={1.5}
                    speed={0.1}
                />
            </div>

            {/* Main Content Area - Perfectly Centered */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-6xl md:text-[8rem] font-black tracking-[-0.05em] mb-10 leading-[0.85] text-white">
                    <div className="overflow-hidden py-2">
                        {"SELF-REPAYING".split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, delay: i * 0.02, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-block"
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </div>
                    <div className="overflow-hidden py-2 -mt-2">
                        <span className="gradient-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600">
                            {"CREDIT SCALE".split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, delay: (13 + i) * 0.02, ease: [0.16, 1, 0.3, 1] }}
                                    className="inline-block"
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </span>
                    </div>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl md:text-2xl font-medium text-foreground/50 mb-16 max-w-3xl mx-auto leading-relaxed tracking-tight"
                >
                    Engineered for the Institutional Bitcoin era.
                    Zero manual repayments. 100% native PoX yield. Non-custodial at the core.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-8 justify-center items-center"
                >
                    <Link href="/vaults" className="btn-primary text-xl px-12 py-5 rounded-2xl shadow-[0_20px_50px_rgba(249,115,22,0.2)] hover:shadow-[0_30px_70px_rgba(249,115,22,0.4)] transition-all transform hover:-translate-y-1">
                        Get Started
                    </Link>
                    <button className="glass px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all border border-white/10 tracking-tight">
                        Protocol Whitepaper
                    </button>
                </motion.div>
            </div>

            {/* Stats Bottom Anchored */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/5 pt-12"
                >
                    {[
                        { val: "150%", label: "Collateral Floor" },
                        { val: "PoX", label: "Auto-Repayment" },
                        { val: "2s", label: "Subnet Speed" },
                        { val: "Formal", label: "Verified Code" }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center md:items-start">
                            <span className="text-4xl font-black text-white tracking-tighter mb-1">{item.val}</span>
                            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-foreground/40">{item.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
