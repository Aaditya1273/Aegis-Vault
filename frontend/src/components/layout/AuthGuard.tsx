"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useStacksWallet } from "@/hooks/useStacksWallet";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isSignedIn } = useStacksWallet();
    const router = useRouter();
    const pathname = usePathname();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // If we're on a non-public route and not signed in, redirect
        const publicRoutes = ["/", "/landing"];
        if (!isSignedIn && !publicRoutes.includes(pathname)) {
            router.push("/");
        } else {
            setIsReady(true);
        }
    }, [isSignedIn, pathname, router]);

    if (!isReady) return null; // Or a loading spinner

    return <>{children}</>;
}
