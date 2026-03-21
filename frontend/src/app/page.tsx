"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useStacksWallet } from "@/hooks/useStacksWallet";
import Button from "@/components/ui/Button";
import ScribbleUnderline from "@/components/ui/ScribbleUnderline";
import LogoLoop from "@/components/ui/LogoLoop";
import { SiBitcoin, SiEthereum, SiSolana, SiPolygon, SiBinance, SiCoinbase } from "react-icons/si";
import { ShieldCheck, Lock, Globe, Users, TrendingUp, Zap } from "lucide-react";

const ecosystemLogos = [
    { node: <SiBitcoin className="text-4xl" />, title: "Bitcoin", href: "https://bitcoin.org" },
    { node: <SiPolygon className="text-4xl" />, title: "Polygon", href: "https://polygon.technology" },
    { node: <SiEthereum className="text-4xl" />, title: "Ethereum", href: "https://ethereum.org" },
    { node: <SiSolana className="text-4xl" />, title: "Solana", href: "https://solana.com" },
    { node: <SiBinance className="text-4xl" />, title: "Binance", href: "https://binance.com" },
    { node: <SiCoinbase className="text-4xl" />, title: "Coinbase", href: "https://coinbase.com" },
];

const AceternityLogo = () => {
    return (
        <svg
            width="66"
            height="65"
            viewBox="0 0 66 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-white"
        >
            <path
                d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
                stroke="currentColor"
                strokeWidth="15"
                strokeMiterlimit="3.86874"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default function LandingPage() {
    const { connectWallet, isSignedIn } = useStacksWallet();
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const heroY = useTransform(smoothProgress, [0, 0.2], [0, 100]);
    const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
    const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.95]);

    return (
        <div ref={containerRef} className="relative min-h-screen bg-surface text-on-surface selection:bg-[#FF9D00]/30 overflow-x-hidden">
            {/* Floating TopNavBar */}
            <div className="fixed top-8 inset-x-0 z-50 flex justify-center px-6 pointer-events-none">
                <nav className="flex items-center gap-10 px-10 py-5 bg-[#0b0b0b]/60 backdrop-blur-3xl border border-white/10 rounded-full shadow-[0_20px_80px_rgba(0,0,0,0.8)] pointer-events-auto group">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-black tracking-tighter text-white font-headline italic">AEGIS</span>
                    </div>

                    <div className="hidden lg:flex gap-10 items-center list-none border-l border-white/10 pl-10">
                        <li><a className="text-[11px] font-black text-slate-400 hover:text-white transition-all uppercase tracking-[0.4em]" href="#solutions">Solutions</a></li>
                        <li><a className="text-[11px] font-black text-slate-400 hover:text-white transition-all uppercase tracking-[0.4em]" href="#institutional">Institutional</a></li>
                        <li><a className="text-[11px] font-black text-slate-400 hover:text-white transition-all uppercase tracking-[0.4em]" href="#security">Security</a></li>
                        <li><a className="text-[11px] font-black text-slate-400 hover:text-white transition-all uppercase tracking-[0.4em]" href="#governance">Governance</a></li>
                    </div>

                    <div className="flex items-center gap-4 border-l border-white/10 pl-10 ml-auto lg:ml-0">
                        <button
                            onClick={isSignedIn ? () => window.location.href = '/dashboard' : connectWallet}
                            className="px-10 py-3 bg-[#FF9D00] text-black text-[11px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-black transition-all shadow-xl shadow-[#FF9D00]/20 active:scale-95"
                        >
                            {isSignedIn ? "Dashboard" : "Start Vault"}
                        </button>
                    </div>
                </nav>
            </div>

            <main className="pt-24">
                {/* Section 1: Hero */}
                <section id="hero" className="max-w-[1800px] mx-auto px-12 mb-48 relative min-h-[90vh] flex items-center">
                    <motion.div
                        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
                        className="grid lg:grid-cols-2 gap-24 items-center w-full"
                    >
                        <div className="z-10">

                            <motion.h1
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-7xl md:text-9xl font-black font-headline leading-[0.95] mb-12 tracking-tighter text-white uppercase"
                            >
                                Bitcoin That <br />
                                <ScribbleUnderline className="text-[#FF9D00]">Pays Your Loans Back</ScribbleUnderline>
                            </motion.h1>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="text-2xl text-slate-400 leading-relaxed mb-14 max-w-2xl font-medium"
                            >
Mint aeUSD from your BTC and let Bitcoin-native yield repay your loan automatically. No liquidations, no monthly payments, and no taxable events.                            </motion.p>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="flex flex-wrap gap-8 items-center"
                            >
                                <Button size="xl" variant="primary" className="px-12 py-6 text-lg" onClick={isSignedIn ? () => window.location.href = '/dashboard' : connectWallet}>
                                    <AceternityLogo />
                                    <span>{isSignedIn ? "Open Dashboard" : "Start Vault"}</span>
                                </Button>
                            </motion.div>
                        </div>

                        <div className="relative group z-10 -mt-24">
                            <motion.div
                                initial={{ x: 60, opacity: 0, scale: 0.95 }}
                                animate={{
                                    x: 0,
                                    opacity: 1,
                                    scale: 1,
                                    y: [0, -15, 0]
                                }}
                                transition={{
                                    x: { duration: 1.2, delay: 1 },
                                    opacity: { duration: 1.2, delay: 1 },
                                    scale: { duration: 1.2, delay: 1 },
                                    y: {
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                                className="relative overflow-visible"
                            >
                                <img
                                    src="/hero.png"
                                    alt="Aegis Vault Dashboard"
                                    className="w-full h-auto scale-90 lg:scale-[1.1] group-hover:scale-[1.15] transition-transform duration-1000 drop-shadow-[0_40px_100px_rgba(255,157,0,0.15)]"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface to-transparent pointer-events-none opacity-50"></div>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                {/* Section 2: Partners */}
                <section className="mb-12 border-y border-white/5 py-12 bg-[#131314]/50 backdrop-blur-sm">
                    <div className="max-w-[1800px] mx-auto px-12 mb-10">
                        <div className="flex items-center gap-12">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[1em] whitespace-nowrap">Eco-System Institutions</span>
                            <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent"></div>
                        </div>
                    </div>
                    <LogoLoop logos={ecosystemLogos} speed={40} direction="left" />
                </section>

                {/* Section 3: How it Works (Solutions) */}
                <section id="solutions" className="max-w-[1800px] mx-auto px-12 py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <div className="text-[#FF9D00] font-black uppercase tracking-[0.4em] text-xs">The Aegis Standard</div>
                        <h2 className="text-6xl md:text-8xl font-black font-headline text-white tracking-tighter uppercase italic">Institutional Primitive</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium mt-6">Three surgical steps to financial sovereignty.</p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-10">
                        {[
                            { step: "01", title: "Deposit BTC", desc: "Lock your Bitcoin into a transparent smart contract secured by the Stacks blockchain.", asset: "0.45 BTC", icon: <SiBitcoin /> },
                            { step: "02", title: "Mint aeUSD", desc: "Instantly mint up to 50% LTV in our native stablecoin without selling your core position.", asset: "$124,500 aeUSD", icon: <Zap className="text-[#FF9D00] w-6 h-6" /> },
                            { step: "03", title: "Auto-Repay", desc: "Sit back as Bitcoin-native yield generated by the sBTC layer automatically pays down your debt.", asset: "92% Progress", icon: <TrendingUp className="text-[#FF9D00] w-6 h-6" /> }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40, rotateX: -10 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: idx * 0.2 }}
                                className="glass-panel p-12 rounded-[3rem] h-full border border-white/5 flex flex-col items-center text-center group hover:border-[#FF9D00]/20 transition-all duration-500 hover:bg-[#FF9D00]/5"
                            >
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#FF9D00] to-[#FF5C00] flex items-center justify-center text-white font-black text-2xl mb-10 shadow-xl shadow-[#FF9D00]/20 italic group-hover:scale-110 transition-transform group-hover:rotate-3">
                                    {item.step}
                                </div>
                                <h3 className="text-3xl font-bold font-headline mb-6 text-white uppercase italic">{item.title}</h3>
                                <p className="text-slate-400 mb-12 text-lg leading-relaxed">{item.desc}</p>
                                <div className="w-full bg-black/40 p-8 rounded-[2rem] border border-white/5 group-hover:border-[#FF9D00]/10 transition-colors">
                                    <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 italic">
                                        <span className="flex items-center gap-2">Vault Active</span>
                                        <span className="text-white">{item.asset}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full relative overflow-hidden">
                                        <div className="h-full bg-[#FF9D00] w-full shadow-[0_0_12px_#FF9D00]"></div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Section 4: Institutional Trust (Institutional) */}
                <section id="institutional" className="max-w-[1800px] mx-auto px-12 py-48 border-t border-white/5">
                    <div className="grid lg:grid-cols-2 gap-32 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="text-[#FF9D00] font-black uppercase tracking-[0.4em] text-xs mb-6">Market Dominance</div>
                            <h2 className="text-6xl md:text-8xl font-black font-headline text-white tracking-tighter uppercase italic mb-10">Trusted Architecture</h2>
                            <p className="text-slate-400 text-xl font-medium leading-relaxed mb-12">
                                Aegis-Vault is the only decentralized protocol that treats Bitcoin as a Tier-1 financial instrument. Our architecture is designed for $1B+ liquidity deployments with zero slippage and absolute solvency.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                    <h4 className="text-4xl font-black text-white font-headline mb-2">$1.2B+</h4>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol TVL</p>
                                </div>
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                    <h4 className="text-4xl font-black text-white font-headline mb-2">0%</h4>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Liquidations to Date</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-[4rem] bg-gradient-to-tr from-[#FF9D00]/20 to-transparent border border-[#FF9D00]/10 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                                <SiBitcoin className="text-[15rem] text-[#FF9D00]/20 animate-pulse" />
                                <div className="absolute bottom-12 left-12 right-12 glass-panel p-8 rounded-3xl border border-white/10 backdrop-blur-3xl">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-2xl bg-[#FF9D00] flex items-center justify-center shadow-lg shadow-[#FF9D00]/30 transform -rotate-6">
                                            <Lock className="text-white w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-white font-black font-headline text-lg uppercase italic">Vault Security: Grade A+</p>
                                            <p className="text-slate-500 text-sm font-medium tracking-tight">Triple-audited logic since Genesis.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Section 5: Protocol Security (Security) */}
                <section id="security" className="bg-[#131314] py-48 relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                    <div className="max-w-[1800px] mx-auto px-12 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-32"
                        >
                            <div className="text-[#FF9D00] font-black uppercase tracking-[0.4em] text-xs mb-6">Risk Infrastructure</div>
                            <h2 className="text-6xl md:text-8xl font-black font-headline text-white tracking-tighter uppercase italic">Institutional Security</h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { title: "Formal Verification", desc: "Every line of Clarity code is mathematically proven to be solvent.", icon: <ShieldCheck className="w-8 h-8" /> },
                                { title: "Non-Custodial", desc: "You maintain full keys to your Bitcoin. Aegis never touches your seed.", icon: <Lock className="w-8 h-8" /> },
                                { title: "On-Chain Audit", desc: "Real-time auditing of sBTC reserves via Stacks layer consensus.", icon: <Globe className="w-8 h-8" /> },
                                { title: "SOC2 Compliance", desc: "Institutional-grade reporting and operational risk frameworks.", icon: <ShieldCheck className="w-8 h-8" /> }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-10 rounded-3xl bg-white/5 border border-white/5 hover:border-[#FF9D00]/30 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-[#FF9D00]/10 flex items-center justify-center text-[#FF9D00] mb-8">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-xl font-black font-headline text-white mb-4 uppercase italic">{item.title}</h4>
                                    <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 6: DAO Governance (Governance) */}
                <section id="governance" className="max-w-[1800px] mx-auto px-12 py-48">
                    <div className="glass-panel p-20 rounded-[4rem] border border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF9D00]/5 to-transparent transition-opacity group-hover:opacity-100 opacity-50"></div>
                        <div className="relative z-10 max-w-2xl mx-auto text-center">
                            <h2 className="text-5xl md:text-7xl font-black font-headline text-white tracking-tighter uppercase italic mb-8">Council of Aegis</h2>
                            <p className="text-slate-400 text-xl font-medium leading-relaxed mb-12">
                                Holders of $AEGIS govern protocol parameters, from LTV ratios to yield distribution. Join the sovereign elite and shape the future of Bitcoin-native finance.
                            </p>
                            <Button size="xl" variant="outline" className="px-12 py-6 text-lg border-white/20 hover:border-[#FF9D00] hover:text-[#FF9D00]">
                                <Users className="w-6 h-6" />
                                <span>Review DAO Constitution</span>
                            </Button>
                        </div>
                    </div>
                </section>

                <footer className="pt-64 pb-24 relative overflow-hidden bg-[#0b0b0b]">
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                    {/* Watermark Background */}
                    <div className="absolute -bottom-24 -right-12 select-none pointer-events-none transition-transform group-hover:scale-105 duration-1000">
                        <h2 className="text-[25vw] font-black font-headline text-white/[0.02] leading-none tracking-tighter uppercase italic">
                            AEGIS
                        </h2>
                    </div>

                    <div className="max-w-[1800px] mx-auto px-12 relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-20 mb-32">
                            <div className="col-span-2">
                                <div className="flex items-center gap-3 mb-10">
                                    <span className="text-3xl font-black tracking-tighter text-white font-headline italic">AEGIS VAULT</span>
                                </div>
                                <p className="text-slate-500 max-w-sm text-lg leading-relaxed font-medium mb-10">
                                    The world's first Bitcoin-native yield protocol. Institutional-grade vaults designed for the digital sovereign.
                                </p>
                                <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">
                                    © {new Date().getFullYear()} Aegis Protocol. All rights reserved.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <h5 className="text-[#FF9D00] font-headline text-[10px] uppercase tracking-[0.5em] font-black italic">Pages</h5>
                                <ul className="space-y-4">
                                    <li><a className="text-slate-500 hover:text-white transition-all text-sm font-bold tracking-tight" href="#solutions">Solutions</a></li>
                                    <li><a className="text-slate-500 hover:text-white transition-all text-sm font-bold tracking-tight" href="#institutional">Institutional</a></li>
                                    <li><a className="text-slate-500 hover:text-white transition-all text-sm font-bold tracking-tight" href="#security">Security</a></li>
                                    <li><a className="text-slate-500 hover:text-white transition-all text-sm font-bold tracking-tight" href="#governance">Governance</a></li>
                                </ul>
                            </div>

                            <div className="space-y-8">
                                <h5 className="text-[#FF9D00] font-headline text-[10px] uppercase tracking-[0.5em] font-black italic">Socials</h5>
                                <ul className="space-y-4">
                                    <li><a className="text-slate-500 hover:text-white transition-all text-sm font-bold tracking-tight" href="#">X / Twitter</a></li>
                                    <li><a className="text-slate-500 hover:text-white transition-all text-sm font-bold tracking-tight" href="#">Telegram</a></li>
                                    <li><a className="text-slate-500 hover:text-white transition-all text-sm font-bold tracking-tight" href="#">Discord</a></li>
                                    <li><a className="text-slate-500 hover:text-white transition-all text-sm font-bold tracking-tight" href="#">LinkedIn</a></li>
                                </ul>
                            </div>

                            <div className="space-y-8">
                                <h5 className="text-[#FF9D00] font-headline text-[10px] uppercase tracking-[0.5em] font-black italic">Legal</h5>
                                <ul className="space-y-4">
                                    <li><a className="text-slate-500 hover:text-white transition-all text-sm font-bold tracking-tight" href="#">Privacy Policy</a></li>
                                    <li><a className="text-slate-500 hover:text-white transition-all text-sm font-bold tracking-tight" href="#">Terms of Service</a></li>
                                    <li><a className="text-slate-500 hover:text-white transition-all text-sm font-bold tracking-tight" href="#">Cookie Policy</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex gap-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                                <SiBitcoin className="w-8 h-8 text-white" />
                                <SiEthereum className="w-8 h-8 text-white" />
                                <SiPolygon className="w-8 h-8 text-white" />
                                <SiBinance className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.6em] italic">
                                Built on Stacks Layer 2 • Secured by Bitcoin
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
