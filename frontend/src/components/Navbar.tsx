"use client";

import Link from "next/link";
import Image from "next/image";
import ConnectWallet from "./ConnectWallet";

export default function Navbar() {
    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <nav className="glass-pill px-8 py-3 flex items-center gap-12 pointer-events-auto border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-3">
                    <span className="text-xl font-black gradient-text tracking-[-0.05em]">
                        AEGIS
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-xs font-bold uppercase tracking-widest text-foreground/60 hover:text-primary transition-colors">
                        Protocol
                    </Link>
                    <Link href="/vaults" className="text-xs font-bold uppercase tracking-widest text-foreground/60 hover:text-primary transition-colors">
                        Vaults
                    </Link>
                    <Link href="https://docs.stacks.co" target="_blank" className="text-xs font-bold uppercase tracking-widest text-foreground/60 hover:text-primary transition-colors">
                        Docs
                    </Link>
                </div>

                <div className="flex items-center gap-4 border-l border-white/10 pl-8">
                    <ConnectWallet />
                </div>
            </nav>
        </div>
    );
}
