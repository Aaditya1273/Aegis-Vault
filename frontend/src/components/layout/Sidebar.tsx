"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../ui/Button";

const Sidebar = () => {
    const pathname = usePathname();

    const navItems = [
        { name: "Overview", icon: "analytics", path: "/dashboard" },
        { name: "Yield Strategies", icon: "trending_up", path: "/yield" },
        { name: "Risk Analytics", icon: "security", path: "/risk" },
        { name: "Liquidity", icon: "water_drop", path: "/liquidity" },
        { name: "Settings", icon: "settings", path: "/settings" },
    ];

    return (
        <aside className="hidden lg:flex flex-col h-screen sticky top-0 left-0 bg-surface-container-low border-r border-white/5 w-64">
            <div className="p-8">
                <div className="text-2xl font-black italic text-primary-container plus-jakarta-sans">
                    AEGIS VAULT
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-outline mt-1 font-bold">
                    Institutional Grade
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`
                flex items-center gap-3 px-4 py-3 plus-jakarta-sans text-sm font-medium transition-all hover:translate-x-1 duration-200
                ${isActive
                                    ? "text-primary-container font-bold bg-white/5 rounded-r-full"
                                    : "text-outline hover:bg-white/10 hover:text-white"
                                }
              `}
                        >
                            <span
                                className={`material-symbols-outlined ${isActive ? 'fill-1' : ''}`}
                                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "" }}
                            >
                                {item.icon}
                            </span>
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6">
                <Link href="/borrow">
                    <Button variant="primary" className="w-full">
                        MINT aeUSD
                    </Button>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
