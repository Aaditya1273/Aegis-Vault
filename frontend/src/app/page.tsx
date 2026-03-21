"use client";

import React from "react";
import Link from "next/link";
import { useStacksWallet } from "@/hooks/useStacksWallet";
import Button from "@/components/ui/Button";
import ScribbleUnderline from "@/components/ui/ScribbleUnderline";

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
                        <a className="text-[#00F5FF] font-semibold font-headline tracking-tight hover:text-[#00F5FF] transition-colors duration-300" href="#solutions">Solutions</a>
                        <a className="text-slate-400 font-medium font-headline tracking-tight hover:text-[#00F5FF] transition-colors duration-300" href="#institutional">Institutional</a>
                        <a className="text-slate-400 font-medium font-headline tracking-tight hover:text-[#00F5FF] transition-colors duration-300" href="#security">Security</a>
                        <a className="text-slate-400 font-medium font-headline tracking-tight hover:text-[#00F5FF] transition-colors duration-300" href="#governance">Governance</a>
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
                            <h1 className="text-6xl md:text-7xl font-black font-headline leading-[1.1] mb-8 tracking-tighter text-white">
                                Bitcoin That <ScribbleUnderline className="text-primary-container">Pays Your Loans Back</ScribbleUnderline>
                            </h1>
                            <p className="text-xl text-on-surface-variant leading-relaxed mb-10 max-w-xl">
                                Mint aeUSD against your BTC — and let your loan repay itself automatically using Bitcoin-native yield. No liquidations. No monthly payments. No tax events.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" variant="primary" onClick={isSignedIn ? () => window.location.href = '/dashboard' : connectWallet}>
                                    {isSignedIn ? "Open Dashboard" : "Start Vault"}
                                </Button>
                                <Button size="lg" variant="outline">Institutional Demo</Button>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="glass-panel p-8 rounded-lg shadow-2xl relative z-10 border border-white/5 transition-transform group-hover:scale-[1.02] duration-500">
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
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-lowest animate-pulse">
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
                            <div className="absolute -bottom-6 -right-6 w-full h-full border border-white/5 rounded-lg -z-10 transition-transform group-hover:translate-x-3 group-hover:translate-y-3 duration-500"></div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Problem */}
                <section id="institutional" className="py-40 bg-surface-container-low relative">
                    <div className="max-w-screen-2xl mx-auto px-8">
                        <div className="max-w-4xl">
                            <h2 className="text-5xl md:text-6xl font-black font-headline mb-10 text-white italic tracking-tighter">
                                Bitcoin is absolute power.<br /><span className="opacity-30">But it has remained idle.</span>
                            </h2>
                            <p className="text-2xl text-on-surface-variant leading-relaxed font-medium">
                                Over $2 trillion in Bitcoin sits stagnant in cold storage. To access liquidity, holders are forced to sell, triggering taxes and losing their position, or trust centralized entities with their private keys.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-12 mt-24">
                            <div className="p-10 rounded-2xl bg-surface-container-high border border-white/5 hover:border-primary-container/30 transition-all group">
                                <span className="material-symbols-outlined text-primary-container mb-6 text-4xl group-hover:scale-110 transition-transform">money_off</span>
                                <h4 className="text-2xl font-bold font-headline mb-4 text-white">Idle Capital</h4>
                                <p className="text-on-surface-variant leading-relaxed">Traditional BTC lacks the native yield mechanisms found in modern DeFi ecosystems. Aegis changes the rules.</p>
                            </div>
                            <div className="p-10 rounded-2xl bg-surface-container-high border border-white/5 hover:border-primary-container/30 transition-all group">
                                <span className="material-symbols-outlined text-primary-container mb-6 text-4xl group-hover:scale-110 transition-transform">lock_open</span>
                                <h4 className="text-2xl font-bold font-headline mb-4 text-white">Custodial Risk</h4>
                                <p className="text-on-surface-variant leading-relaxed">Centralized lenders own your keys, creating a massive single point of failure. Aegis is non-custodial by design.</p>
                            </div>
                            <div className="p-10 rounded-2xl bg-surface-container-high border border-white/5 hover:border-primary-container/30 transition-all group">
                                <span className="material-symbols-outlined text-primary-container mb-6 text-4xl group-hover:scale-110 transition-transform">receipt_long</span>
                                <h4 className="text-2xl font-bold font-headline mb-4 text-white">Tax Events</h4>
                                <p className="text-on-surface-variant leading-relaxed">Selling BTC for liquidity triggers high capital gains. Aegis allows you to borrow liquidity, tax-free.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Solution */}
                <section id="solutions" className="py-40 max-w-screen-2xl mx-auto px-8">
                    <div className="text-center mb-32 space-y-4">
                        <div className="text-primary-container font-black uppercase tracking-[0.4em] text-xs">The Aegis Standard</div>
                        <h2 className="text-6xl font-black font-headline text-white tracking-tighter">Institutional Primitive</h2>
                        <p className="text-on-surface-variant max-w-2xl mx-auto text-xl font-medium">Three surgical steps to financial sovereignty.</p>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-10">
                        {/* Step 1 */}
                        <div className="glass-panel p-12 rounded-3xl h-full border border-white/5 flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary-container to-secondary-container flex items-center justify-center text-on-primary font-black text-2xl mb-10 shadow-lg shadow-primary-container/30 italic">01</div>
                            <h3 className="text-3xl font-bold font-headline mb-6 text-white">Deposit BTC</h3>
                            <p className="text-on-surface-variant mb-12 text-lg">Lock your Bitcoin into a transparent smart contract secured by the Stacks blockchain.</p>
                            <div className="w-full bg-surface-container-lowest p-8 rounded-2xl border border-white/5">
                                <div className="flex justify-between items-center text-xs font-black text-slate-500 uppercase tracking-widest mb-4 italic">
                                    <span>Vault Assets</span>
                                    <span className="text-white">0.45 BTC</span>
                                </div>
                                <div className="h-1.5 w-full bg-surface-container rounded-full">
                                    <div className="h-full bg-primary-container w-full shadow-[0_0_8px_#00F5FF]"></div>
                                </div>
                            </div>
                        </div>
                        {/* Step 2 */}
                        <div className="glass-panel p-12 rounded-3xl h-full border border-white/5 flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary-container to-secondary-container flex items-center justify-center text-on-primary font-black text-2xl mb-10 shadow-lg shadow-primary-container/30 italic">02</div>
                            <h3 className="text-3xl font-bold font-headline mb-6 text-white">Mint aeUSD</h3>
                            <p className="text-on-surface-variant mb-12 text-lg">Borrow liquid aeUSD stablecoins at up to 50% LTV, ready for immediate use across DeFi.</p>
                            <div className="w-full bg-surface-container-lowest p-8 rounded-2xl border border-white/5">
                                <div className="flex justify-between items-center text-xs font-black text-slate-500 uppercase tracking-widest mb-4 italic">
                                    <span>Liquidity Minted</span>
                                    <span className="text-white">15,000 aeUSD</span>
                                </div>
                                <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                                    <div className="h-full bg-secondary-container w-1/2 shadow-[0_0_8px_#571bc1]"></div>
                                </div>
                            </div>
                        </div>
                        {/* Step 3 */}
                        <div className="glass-panel p-12 rounded-3xl h-full border border-white/5 flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary-container to-secondary-container flex items-center justify-center text-on-primary font-black text-2xl mb-10 shadow-lg shadow-primary-container/30 italic">03</div>
                            <h3 className="text-3xl font-bold font-headline mb-6 text-white">Auto-Repay</h3>
                            <p className="text-on-surface-variant mb-12 text-lg">Native Bitcoin yield from PoX pays down your debt principal automatically every hour.</p>
                            <div className="w-full bg-surface-container-lowest p-8 rounded-2xl border border-white/5">
                                <div className="flex justify-between items-center text-xs font-black text-slate-500 uppercase tracking-widest mb-4 italic">
                                    <span>Debt Status</span>
                                    <span className="text-tertiary-fixed-dim">repaying...</span>
                                </div>
                                <div className="flex gap-2 h-1.5 w-full">
                                    <div className="h-full bg-tertiary-fixed-dim flex-1 rounded-full animate-pulse shadow-[0_0_8px_#4edea3]"></div>
                                    <div className="h-full bg-tertiary-fixed-dim flex-1 rounded-full animate-pulse delay-75 shadow-[0_0_8px_#4edea3]"></div>
                                    <div className="h-full bg-surface-container flex-1 rounded-full"></div>
                                    <div className="h-full bg-surface-container flex-1 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Security */}
                <section id="security" className="py-40 bg-gradient-to-b from-surface to-surface-container-lowest relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-container/5 blur-[200px] rounded-full -z-10"></div>
                    <div className="max-w-screen-2xl mx-auto px-8 text-center">
                        <h2 className="text-5xl md:text-7xl font-black font-headline mb-16 text-white tracking-tighter">
                            Secured by Bitcoin.<br />Validated by <span className="text-primary-container italic">Clarity.</span>
                        </h2>
                        <div className="grid md:grid-cols-4 gap-12 max-w-5xl mx-auto">
                            <div className="space-y-2">
                                <p className="text-5xl font-black text-white">$1.2B+</p>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-outline font-bold">Protocol TVL</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-5xl font-black text-white">0%</p>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-outline font-bold">Liquidations</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-5xl font-black text-white">SOC2</p>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-outline font-bold">Compliance</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-5xl font-black text-white">24/7</p>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-outline font-bold">On-chain Audit</p>
                            </div>
                        </div>
                        <div className="mt-32 p-1 border border-white/5 rounded-[4rem] inline-block bg-surface-container-low/50 backdrop-blur-xl">
                            <div className="px-12 py-8 rounded-[3.5rem] bg-gradient-to-b from-surface-container-high to-surface-container flex flex-col md:flex-row items-center gap-12">
                                <p className="text-2xl font-bold font-headline text-white max-w-md text-left leading-tight italic">
                                    Ready to unleash your Bitcoin's productivity?
                                </p>
                                <div className="flex gap-4">
                                    <Button size="xl" variant="primary" onClick={connectWallet}>Open your Vault</Button>
                                    <Button size="xl" variant="outline">Institutional Support</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="w-full border-t border-white/5 pt-32 pb-24 bg-[#131314]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 px-12 max-w-screen-2xl mx-auto">
                    <div className="space-y-8">
                        <div className="text-3xl font-black text-white font-headline italic">AEGIS VAULT</div>
                        <p className="text-slate-500 font-medium leading-relaxed text-lg">
                            Institutional Grade Digital Asset Custody. The future of Bitcoin-native finance, built for the sovereign individual.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h5 className="text-[#00F5FF] font-headline text-sm uppercase tracking-[0.3em] font-black italic">Solutions</h5>
                        <ul className="space-y-4">
                            <li><a className="text-slate-500 hover:text-[#00F5FF] transition-all text-base font-medium" href="#">Bitcoin Liquidity</a></li>
                            <li><a className="text-slate-500 hover:text-[#00F5FF] transition-all text-base font-medium" href="#">Yield Strategy</a></li>
                            <li><a className="text-slate-500 hover:text-[#00F5FF] transition-all text-base font-medium" href="#">Governance</a></li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h5 className="text-[#00F5FF] font-headline text-sm uppercase tracking-[0.3em] font-black italic">Company</h5>
                        <ul className="space-y-4">
                            <li><a className="text-slate-500 hover:text-[#00F5FF] transition-all text-base font-medium" href="#">Institutional Support</a></li>
                            <li><a className="text-slate-500 hover:text-[#00F5FF] transition-all text-base font-medium" href="#">Privacy Framework</a></li>
                            <li><a className="text-slate-500 hover:text-[#00F5FF] transition-all text-base font-medium" href="#">Terms & Compliance</a></li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h5 className="text-[#00F5FF] font-headline text-sm uppercase tracking-[0.3em] font-black italic">Connect</h5>
                        <ul className="space-y-4">
                            <li><a className="text-slate-500 hover:text-[#00F5FF] transition-all text-base font-medium" href="#">X / Twitter</a></li>
                            <li><a className="text-slate-500 hover:text-[#00F5FF] transition-all text-base font-medium" href="#">Institutional Discord</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-screen-2xl mx-auto px-12 mt-32 pt-12 border-t border-white/5 flex justify-between items-center">
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-500 font-black italic">© 2024 Aegis Vault. The Digital Sovereign.</p>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-surface-container-high border border-white/5 flex items-center justify-center opacity-50">
                            <span className="material-symbols-outlined text-xs">shield</span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-surface-container-high border border-white/5 flex items-center justify-center opacity-50">
                            <span className="material-symbols-outlined text-xs">verified_user</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
