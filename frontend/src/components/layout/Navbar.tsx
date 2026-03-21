"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStacksWallet } from "@/hooks/useStacksWallet";
import Button from "../ui/Button";

const Navbar = () => {
    const router = useRouter();
    const { stxAddress, connectWallet, disconnectWallet, isSignedIn } = useStacksWallet();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const truncateAddress = (addr: string) =>
        `${addr.slice(0, 6)}...${addr.slice(-4)}`;

    // Close dropdown on outside click
    useEffect(() => {
        function handleOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, []);

    const handleConnect = () => {
        connectWallet();
    };

    const handleDisconnect = () => {
        disconnectWallet();
        setDropdownOpen(false);
        router.replace("/");
    };

    return (
        <header className="fixed top-0 left-0 lg:left-64 right-0 z-50 bg-surface/60 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-8 py-4">
                <div className="flex items-center gap-8">
                    <Link href="/" className="lg:hidden text-xl font-black text-primary-container tracking-tighter headline-font">
                        AEGIS VAULT
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {!isSignedIn ? (
                        <Button size="sm" onClick={handleConnect}>
                            Connect Wallet
                        </Button>
                    ) : (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen((v) => !v)}
                                className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/20 hover:border-[#FF9D00]/40 transition-all"
                            >
                                <span className="inline-flex w-2 h-2 rounded-full bg-[#FF9D00] shadow-[0_0_6px_#FF9D00]" />
                                <span className="text-xs font-mono text-on-surface-variant">
                                    {truncateAddress(stxAddress || "")}
                                </span>
                                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#FF9D00] to-[#FF5C00]" />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 top-[calc(100%+10px)] w-64 rounded-2xl border border-white/10 bg-[#0a0a0a]/95 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur z-50">
                                    <div className="rounded-xl bg-white/5 px-4 py-3 mb-3">
                                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Connected</p>
                                        <p className="font-mono text-xs text-white/80">{stxAddress}</p>
                                    </div>
                                    <div className="hidden lg:flex flex-col px-1 mb-3">
                                        <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.1em]">
                                            Institutional Account
                                        </span>
                                        <span className="text-[#FF9D00] headline-font font-bold text-sm">
                                            Verified
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleDisconnect}
                                        className="w-full rounded-xl bg-white/5 hover:bg-white/10 px-4 py-2.5 text-sm text-white/70 hover:text-white transition-all text-left"
                                    >
                                        Disconnect
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
