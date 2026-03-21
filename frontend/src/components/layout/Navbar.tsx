"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();

    const links = [
        { name: "Portfolio", path: "/dashboard" },
        { name: "Governance", path: "/governance" },
        { name: "Docs", path: "/docs" },
    ];

    return (
        <header className="fixed top-0 left-0 lg:left-64 right-0 z-50 bg-surface/60 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-8 py-4">
                <div className="flex items-center gap-8">
                    <div className="lg:hidden text-xl font-black text-primary-container tracking-tighter headline-font">
                        AEGIS VAULT
                    </div>
                    <nav className="hidden md:flex gap-6">
                        {links.map((link) => {
                            const isActive = pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    className={`
                    plus-jakarta-sans font-bold tracking-tight transition-colors
                    ${isActive
                                            ? "text-primary-container border-b-2 border-primary-container pb-1"
                                            : "text-outline hover:text-white"
                                        }
                  `}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex flex-col items-end mr-2">
                        <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.1em]">
                            Institutional Balance
                        </span>
                        <span className="text-primary-container headline-font font-bold text-sm">
                            $42,850.50 aeUSD
                        </span>
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/20 flex items-center gap-3">
                        <span className="text-xs font-mono text-on-surface-variant">0x71C...4e21</span>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary-container to-secondary-container" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
