"use client";

import Navbar from "@/components/Navbar";
import VaultCard from "@/components/VaultCard";
import WalletGuard from "@/components/WalletGuard";

export default function VaultsPage() {
    return (
        <WalletGuard>
            <main className="min-h-screen bg-background">
                <Navbar />

                <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                    <div className="mb-12 flex justify-between items-end">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight">Your Aegis Vaults</h1>
                            <p className="text-foreground/60 mt-2 text-lg">Manage your collateral and mint aeUSD.</p>
                        </div>
                        <button className="btn-primary flex items-center gap-2">
                            <span>+</span> Create New Vault
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="glass p-8 rounded-3xl border-white/5">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold">Main Vault (sBTC-001)</h3>
                                    <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-bold">HEALTHY</span>
                                </div>

                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <div className="space-y-1">
                                        <span className="text-xs text-foreground/40 uppercase font-bold tracking-widest">Collateral</span>
                                        <div className="text-2xl font-bold">1.20 sBTC</div>
                                        <div className="text-sm text-foreground/30">≈ $102,000 USD</div>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <span className="text-xs text-foreground/40 uppercase font-bold tracking-widest">Debt</span>
                                        <div className="text-2xl font-bold">40,000 aeUSD</div>
                                        <div className="text-sm text-foreground/30">Target LTV: 40%</div>
                                    </div>
                                </div>

                                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sm font-medium">Auto-Repayment Progress</span>
                                        <span className="text-sm font-bold text-primary">12.5% Complete</span>
                                    </div>
                                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[12.5%]" />
                                    </div>
                                    <p className="text-xs text-foreground/40 mt-3 italic text-center">
                                        Next yield harvest expected in ~4 hours.
                                    </p>
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <button className="flex-1 glass py-3 rounded-lg font-bold hover:bg-white/5 transition-all">
                                        Add Collateral
                                    </button>
                                    <button className="flex-1 glass py-3 rounded-lg font-bold hover:bg-white/5 transition-all">
                                        Mint aeUSD
                                    </button>
                                    <button className="flex-1 btn-primary py-3 rounded-lg font-bold">
                                        Repay Debt
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <VaultCard
                                label="Available to Mint"
                                value="21,200 aeUSD"
                                subLabel="Based on 60% Max LTV"
                                icon="🏦"
                            />
                            <VaultCard
                                label="Liquidation Price"
                                value="$54,200"
                                subLabel="BTC Current: $85,000"
                                icon="📉"
                            />
                            <div className="glass p-6 rounded-2xl border-primary/20 bg-primary/5">
                                <h4 className="font-bold mb-2">Protocol Power-Up ⚡</h4>
                                <p className="text-xs text-foreground/70 leading-relaxed">
                                    Your vault is qualifies for **Boosted Yield**. Enrolling adds 15% to your auto-repayment rate.
                                </p>
                                <button className="mt-4 text-xs font-bold text-primary hover:underline">
                                    Enroll Now →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </WalletGuard>
    );
}
