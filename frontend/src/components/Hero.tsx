"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Particles from "./ui/Particles";
import SoftAurora from "./ui/SoftAurora";
import SplitText from "./ui/SplitText";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 mt-16">
            {/* Background Layer: WebGL Effects */}
            <div className="absolute inset-0 z-0">
                <Particles
                    particleColors={["#ffffff", "#8b5cf6"]}
                    particleCount={300}
                    speed={0.15}
                    particleBaseSize={120}
                    moveParticlesOnHover
                />
                <SoftAurora
                    color1="#000000"
                    color2="#4c1d95"
                    brightness={0.8}
                    speed={0.4}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8 inline-block"
                >
                    <span className="glass px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em] text-primary border-primary/20 shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                        Powered by Stacks sBTC
                    </span>
                </motion.div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                    <SplitText
                        text="SELF-REPAYING"
                        className="block text-white"
                        delay={50}
                        duration={1}
                        ease="power4.out"
                    />
                    <span className="gradient-text bg-gradient-to-r from-primary via-purple-400 to-accent">
                        <SplitText
                            text="CREDIT PROTOCOL"
                            className="block"
                            delay={100}
                            duration={1.2}
                            ease="power4.out"
                        />
                    </span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    Mint <span className="text-white font-semibold">aeUSD</span> against your Bitcoin.
                    No monthly payments—your credit line repays itself automatically through native Stacks yield.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <Link href="/vaults" className="btn-primary text-lg px-10 py-4 shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] transition-all">
                        Open Your Vault
                    </Link>
                    <button className="glass px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all border-white/5">
                        View Protocol Docs
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12"
                >
                    <div className="flex flex-col">
                        <span className="text-3xl font-black text-white">150%</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/50">Min Collateral</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-black text-white">0%</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/50">Manual Debt</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-black text-white">$10M+</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/50">Protocol TVL</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-black text-white">PoX</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/50">Yield Native</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
