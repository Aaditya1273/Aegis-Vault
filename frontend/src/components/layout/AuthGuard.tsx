"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStacks } from "@/components/providers/StacksProvider";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isRestoring, isSignedIn } = useStacks();

    useEffect(() => {
        if (!isRestoring && !isSignedIn) {
            router.replace("/");
        }
    }, [isRestoring, isSignedIn, router]);

    if (isRestoring) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#FF9D00] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isSignedIn) return null;

    return <>{children}</>;
}
