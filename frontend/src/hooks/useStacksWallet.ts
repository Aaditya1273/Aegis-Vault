"use client";

import { useStacks } from "@/components/providers/StacksProvider";

export const useStacksWallet = () => {
    const { isSignedIn, stxAddress, connectWallet, disconnectWallet } = useStacks();

    return {
        stxAddress,
        connectWallet,
        disconnectWallet,
        isSignedIn,
    };
};
