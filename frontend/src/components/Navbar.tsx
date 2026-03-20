"use client";

import Link from "next/link";
import Image from "next/image";
import ConnectWallet from "./ConnectWallet";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10">
                            <Image
                                src="/aegis_vault_logo_1774016007592.png"
                                alt="Aegis-Vault Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-2xl font-bold gradient-text tracking-tight">
                            Aegis-Vault
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                            Protocol
                        </Link>
                        <Link href="/vaults" className="text-sm font-medium hover:text-primary transition-colors">
                            Dashboard
                        </Link>
                        <Link href="https://docs.stacks.co" target="_blank" className="text-sm font-medium hover:text-primary transition-colors">
                            Docs
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <ConnectWallet />
                    </div>
                </div>
            </div>
        </nav>
    );
}
