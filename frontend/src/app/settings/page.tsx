"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import AuthGuard from "@/components/layout/AuthGuard";
import { useStacksWallet } from "@/hooks/useStacksWallet";
import { Settings, Bell, Shield, Wallet } from "lucide-react";

export default function SettingsPage() {
    const { stxAddress, disconnectWallet } = useStacksWallet();
    const [autoRepay, setAutoRepay] = useState(true);
    const [notifications, setNotifications] = useState(true);
    const [liquidationAlerts, setLiquidationAlerts] = useState(true);

    const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
        <button
            onClick={onChange}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${value ? "bg-[#FF9D00]" : "bg-surface-container-highest"}`}
        >
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${value ? "translate-x-7" : "translate-x-1"}`} />
        </button>
    );

    return (
        <AuthGuard>
            <div className="flex bg-surface min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <Navbar />
                    <main className="p-8 mt-16 overflow-y-auto w-full">
                        <div className="max-w-3xl mx-auto space-y-8">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Account</p>
                                <h1 className="text-4xl font-extrabold headline-font tracking-tight text-on-surface">Settings</h1>
                            </div>

                            {/* Wallet */}
                            <Card variant="high" className="p-8">
                                <div className="flex items-center gap-2 mb-6">
                                    <Wallet className="w-4 h-4 text-[#FF9D00]" />
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-outline">Connected Wallet</h3>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-outline mb-1">Address</p>
                                        <p className="font-mono text-sm text-white break-all">{stxAddress || "Not connected"}</p>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={disconnectWallet} className="shrink-0 ml-4">
                                        Disconnect
                                    </Button>
                                </div>
                            </Card>

                            {/* Protocol Settings */}
                            <Card variant="low" className="p-8">
                                <div className="flex items-center gap-2 mb-6">
                                    <Settings className="w-4 h-4 text-outline" />
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-outline">Protocol Settings</h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-bold text-white">Auto-Repayment</p>
                                            <p className="text-xs text-outline mt-0.5">Use 15% of yield to automatically repay aeUSD debt</p>
                                        </div>
                                        <Toggle value={autoRepay} onChange={() => setAutoRepay(v => !v)} />
                                    </div>
                                    <div className="h-px bg-white/5" />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-bold text-white">Liquidation Protection</p>
                                            <p className="text-xs text-outline mt-0.5">Auto-deposit collateral if LTV exceeds 80%</p>
                                        </div>
                                        <Toggle value={true} onChange={() => {}} />
                                    </div>
                                </div>
                            </Card>

                            {/* Notifications */}
                            <Card variant="low" className="p-8">
                                <div className="flex items-center gap-2 mb-6">
                                    <Bell className="w-4 h-4 text-outline" />
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-outline">Notifications</h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-bold text-white">Yield Payouts</p>
                                            <p className="text-xs text-outline mt-0.5">Notify on each yield distribution</p>
                                        </div>
                                        <Toggle value={notifications} onChange={() => setNotifications(v => !v)} />
                                    </div>
                                    <div className="h-px bg-white/5" />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-bold text-white">Liquidation Alerts</p>
                                            <p className="text-xs text-outline mt-0.5">Alert when health factor drops below 1.5</p>
                                        </div>
                                        <Toggle value={liquidationAlerts} onChange={() => setLiquidationAlerts(v => !v)} />
                                    </div>
                                </div>
                            </Card>

                            {/* Security */}
                            <Card variant="low" className="p-8">
                                <div className="flex items-center gap-2 mb-6">
                                    <Shield className="w-4 h-4 text-outline" />
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-outline">Security</h3>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { label: "Smart Contract Audits", value: "3 / 3 Passed" },
                                        { label: "Formal Verification", value: "Verified" },
                                        { label: "Network", value: "Stacks Testnet" },
                                        { label: "Protocol Version", value: "v2.0.0" },
                                    ].map((r) => (
                                        <div key={r.label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                                            <span className="text-sm text-outline">{r.label}</span>
                                            <span className="text-sm font-black text-white">{r.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </main>
                </div>
            </div>
        </AuthGuard>
    );
}
