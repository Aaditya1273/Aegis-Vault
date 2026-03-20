"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { userSession } from "@/lib/stacks";

export default function WalletGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            if (!userSession.isUserSignedIn() && pathname !== "/") {
                setShowPopup(true);
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            } else {
                setIsAuthorized(true);
            }
        };

        checkAuth();
    }, [pathname, router]);

    if (!isAuthorized && pathname !== "/") {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <div className="glass p-8 rounded-2xl border-primary/20 max-w-sm text-center animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-3xl">🔐</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
                    <p className="text-foreground/60 mb-6">Please connect your STX wallet to access this internal portal.</p>
                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
                        <span className="animate-pulse">Redirecting to landing page...</span>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
