"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { userSession, connectWallet as stacksConnect, logout as stacksLogout, getAccountAddress } from "@/lib/stacks";

type StacksContextType = {
    isRestoring: boolean;
    isSignedIn: boolean;
    stxAddress: string | null;
    btcAddress: string | null;
    btcPublicKey: string | null;
    connectWallet: () => void;
    disconnectWallet: () => void;
};

const StacksContext = createContext<StacksContextType>({
    isRestoring: true,
    isSignedIn: false,
    stxAddress: null,
    btcAddress: null,
    btcPublicKey: null,
    connectWallet: () => { },
    disconnectWallet: () => { },
});

export const useStacks = () => useContext(StacksContext);

export function StacksProvider({ children }: { children: React.ReactNode }) {
    const [isRestoring, setIsRestoring] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [stxAddress, setStxAddress] = useState<string | null>(null);
    const [btcAddress, setBtcAddress] = useState<string | null>(null);
    const [btcPublicKey, setBtcPublicKey] = useState<string | null>(null);

    const syncSession = useCallback(() => {
        try {
            const signedIn = userSession.isUserSignedIn();
            setIsSignedIn(signedIn);

            if (signedIn) {
                const userData = userSession.loadUserData();
                setStxAddress(getAccountAddress());

                // Fetch BTC data if available in profile
                const networkKey = process.env.NEXT_PUBLIC_STACKS_NETWORK === "mainnet" ? "mainnet" : "testnet";

                setBtcAddress(userData.profile?.btcAddress?.[networkKey] || null);
                setBtcPublicKey(userData.profile?.btcPublicKey?.[networkKey] || null);
            } else {
                setStxAddress(null);
                setBtcAddress(null);
                setBtcPublicKey(null);
            }
        } catch {
            setIsSignedIn(false);
            setStxAddress(null);
            setBtcAddress(null);
            setBtcPublicKey(null);
        }
    }, []);

    useEffect(() => {
        const init = async () => {
            // Pre-cache the protocol echo detection result to prevent @stacks/auth
            // from directly accessing window.localStorage (which throws in sandboxed
            // iframes and some Brave Shield configurations).
            try {
                (window as any)._blockstackDidCheckEchoReply = false;
            } catch { /* ignore */ }

            // Swap to LocalStorageStore now that we're in the browser.
            try {
                const { LocalStorageStore } = await import("@stacks/auth/dist/sessionStore");
                userSession.store = new LocalStorageStore();
            } catch {
                // localStorage blocked (sandboxed iframe) — stay with InstanceDataStore
            }

            // Handle redirect-based auth (fallback flow)
            try {
                if (userSession.isSignInPending()) {
                    await userSession.handlePendingSignIn();
                    const url = new URL(window.location.href);
                    url.searchParams.delete("authResponse");
                    window.history.replaceState({}, "", url.toString());
                }
            } catch {
                // not pending or localStorage blocked — safe to ignore
            }

            syncSession();
            setIsRestoring(false);
        };

        init();
    }, [syncSession]);

    const connectWallet = useCallback(() => {
        stacksConnect(() => syncSession());
    }, [syncSession]);

    const disconnectWallet = useCallback(() => {
        stacksLogout();
    }, []);

    return (
        <StacksContext.Provider value={{
            isRestoring,
            isSignedIn,
            stxAddress,
            btcAddress,
            btcPublicKey,
            connectWallet,
            disconnectWallet
        }}>
            {children}
        </StacksContext.Provider>
    );
}
