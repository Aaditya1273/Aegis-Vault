"use client";

import { useState, useEffect } from "react";
import { userSession, login, logout } from "@/lib/stacks";

export const useStacksWallet = () => {
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        if (userSession.isUserSignedIn()) {
            setUserData(userSession.loadUserData());
        }
    }, []);

    const stxAddress = userData?.profile?.stxAddress?.testnet || userData?.profile?.stxAddress?.mainnet;

    return {
        userData,
        stxAddress,
        connectWallet: login,
        disconnectWallet: logout,
        isSignedIn: userSession.isUserSignedIn(),
    };
};
