"use client";

import React from "react";
import Link from "next/link";
import { useStacksWallet } from "@/hooks/useStacksWallet";
import Button from "@/components/ui/Button";

export default function LandingPage() {
    const { connectWallet, isSignedIn } = useStacksWallet();

    return (
        <div className="bg-surface text-on-surface selection:bg-primary-container/30 min-h-screen">
            {/* TopNavBar */}
            <nav className="fixed top-0 w-full z-50 bg-[#131314]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
                    <div className="text-2xl font-bold tracking-tighter text-white font-headline italic">
                        AEGIS VAULT
                    </div>
                    <div className="hidden md:flex items-center gap-10">
                        <a className="text-[#00F5FF] font-semibold font-headline tracking-tight hover:text-[#00F5FF] transition-colors duration-300" href="#">Solutions</a>
                        <a className="text-slate-400 font-medium font-headline tracking-tight hover:text-[#00F5FF] transition-colors duration-300" href="#">Institutional</a>
                        <a className="text-slate-400 font-medium font-headline tracking-tight hover:text-[#00F5FF] transition-colors duration-300" href="#">Security</a>
                        <a className="text-slate-400 font-medium font-headline tracking-tight hover:text-[#00F5FF] transition-colors duration-300" href="#">Governance</a>
                    </div>
                    <Button variant="primary" onClick={isSignedIn ? () => window.location.href = '/dashboard' : connectWallet}>
                        {isSignedIn ? "Dashboard" : "Connect Wallet"}
                    </Button>
                </div>
            </nav>

            <main className="pt-32">
                {/* Section 1: Hero */}
                <section className="max-w-screen-2xl mx-auto px-8 mb-32 relative">
                    <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-container/10 blur-[120px] rounded-full"></div>
                    <div className="absolute top-20 -right-20 w-[500px] h-[500px] bg-secondary-container/10 blur-[150px] rounded-full"></div>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-white/5 mb-6">
                                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Bitcoin Native Yield Now Live</span>
                            </div>
                            <h1 className="text-6xl md:text-7xl font-extrabold font-headline leading-[1.1] mb-8 tracking-tighter text-white">
                                Bitcoin That <span className="bg-gradient-to-r from-white to-primary-container bg-clip-text text-transparent">Pays Your Loans Back</span>
                            </h1>
                            <p className="text-xl text-on-surface-variant leading-relaxed mb-10 max-w-xl">
                                Mint aeUSD against your BTC — and let your loan repay itself automatically using Bitcoin-native yield. No liquidations. No monthly payments.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/dashboard">
                                    <Button size="lg" variant="primary">Open Your Vault</Button>
                                </Link>
                                <Button size="lg" variant="outline">View Demo</Button>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="glass-panel p-8 rounded-lg shadow-2xl relative z-10 border border-white/5">
                                <div className="flex justify-between items-center mb-10">
                                    <div>
                                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Active Loan Balance</p>
                                        <h3 className="text-4xl font-headline font-bold tabular-nums text-white">$9,842.30</h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Total Yield Generated</p>
                                        <h3 className="text-2xl font-headline font-bold tabular-nums text-primary-container">+$157.70</h3>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-primary-container to-secondary-container w-[72%]"></div>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                                        <span>Origination: $10,000</span>
                                        <span>Goal: $0.00</span>
                                    </div>
                                </div>
                                <div className="mt-12 pt-8 border-t border-white/5">
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-lowest">
                                        <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary-container">trending_down</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">Automated Repayment Success</p>
                                            <p className="text-xs text-slate-500">Yield harvest from PoX successfully applied to principal.</p>
                                        </div>
                                        <div className="ml-auto text-xs font-bold text-tertiary-fixed-dim">Just now</div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-full h-full border border-white/5 rounded-lg -z-10"></div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Problem */}
                <section className="py-32 bg-surface-container-low relative">
                    <div className="max-w-screen-2xl mx-auto px-8">
                        <div className="max-w-3xl">
                            <h2 className="text-4xl md:text-5xl font-extrabold font-headline mb-8 text-white">
                                Bitcoin is powerful.<br /><span className="opacity-40">But it's not productive.</span>
                            </h2>
                            <p className="text-xl text-on-surface-variant leading-relaxed">
                                Over $2 trillion in Bitcoin sits idle in wallets globally. To access liquidity, holders are forced to sell and trigger taxes, or use predatory lending platforms that risk their private keys.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 mt-20">
                            <div className="p-8 rounded-lg bg-surface-container-high border border-white/5">
                                <span className="material-symbols-outlined text-primary-container mb-4 text-3xl">money_off</span>
                                <h4 className="text-xl font-bold font-headline mb-3 text-white">Idle Capital</h4>
                                <p className="text-on-surface-variant">Traditional BTC lacks native yield mechanisms found in other ecosystems.</p>
                            </div>
                            <div className="p-8 rounded-lg bg-surface-container-high border border-white/5">
                                <span className="material-symbols-outlined text-primary-container mb-4 text-3xl">lock_open</span>
                                <h4 className="text-xl font-bold font-headline mb-3 text-white">Custodial Risk</h4>
                                <p className="text-on-surface-variant">Centralized lenders own your keys, creating a massive single point of failure.</p>
                            </div>
                            <div className="p-8 rounded-lg bg-surface-container-high border border-white/5">
                                <span className="material-symbols-outlined text-primary-container mb-4 text-3xl">receipt_long</span>
                                <h4 className="text-xl font-bold font-headline mb-3 text-white">Tax Inefficiency</h4>
                                <p className="text-on-surface-variant">Selling BTC for liquidity triggers capital gains. Aegis allows you to borrow, not sell.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="w-full border-t border-white/5 pt-20 pb-12 bg-[#131314]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-8 max-w-screen-2xl mx-auto">
                    <div className="space-y-6">
                        <div className="text-lg font-black text-white font-headline italic">Aegis Vault</div>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Institutional Grade Digital Asset Custody. The future of Bitcoin-native finance.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h5 className="text-[#00F5FF] font-headline text-sm uppercase tracking-widest font-bold">Product</h5>
                        <ul className="space-y-3">
                            <li><a className="text-slate-500 hover:text-[#00F5FF] transition-all text-sm font-medium" href="#">Vaults</a></li>
                            <li><a className="text-slate-500 hover:text-[#00F5FF] transition-all text-sm font-medium" href="#">Lending</a></li>
                            <li><a className="text-slate-500 hover:text-[#00F5FF] transition-all text-sm font-medium" href="#">Governance</a></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h5 className="text-[#00F5FF] font-headline text-sm uppercase tracking-widest font-bold">Connect</h5>
                        <ul className="space-y-3">
                            <li><a className="text-slate-500 hover:text-[#00F5FF] transition-all text-sm font-medium" href="#">Twitter / X</a></li>
                            <li><a className="text-slate-500 hover:text-[#00F5FF] transition-all text-sm font-medium" href="#">Discord</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-screen-2xl mx-auto px-8 mt-20 pt-8 border-t border-white/5 text-center">
                    <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">© 2024 Aegis Vault. Institutional Grade Digital Asset Custody.</p>
                </div>
            </footer>
        </div>
    );
}
