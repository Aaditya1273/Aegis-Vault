"use client";

import { useEffect, useState } from "react";
import { userSession, login, logout } from "@/lib/stacks";

export default function ConnectWallet() {
    const [mounted, setMounted] = useState(false);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        setMounted(true);
        if (userSession.isUserSignedIn()) {
            setUserData(userSession.loadUserData());
        }
    }, []);

    if (!mounted) return null;

    if (userSession.isUserSignedIn()) {
        const address = userData?.profile?.stxAddress?.mainnet || userData?.profile?.stxAddress?.testnet;
        return (
            <div className="flex items-center gap-4">
                <div className="hidden lg:flex flex-col items-end">
                    <span className="text-xs text-foreground/40 font-bold uppercase tracking-widest">Connected</span>
                    <span className="text-sm font-mono truncate max-w-[120px]">
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                    </span>
                </div>
                <button
                    onClick={() => {
                        logout();
                        window.location.href = "/";
                    }}
                    className="glass px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-500/10 hover:text-red-400 transition-all"
                >
                    Sign Out
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={login}
            className="btn-primary"
        >
            Connect STX Wallet
        </button>
    );
}
