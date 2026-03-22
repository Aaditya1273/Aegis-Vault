"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface QrPreviewProps {
    label?: string;
    caption?: string;
    className?: string;
}

export default function QrPreview({
    label = "bitcoin:bc1q...",
    caption = "sBTC Deposit Address",
    className,
}: QrPreviewProps) {
    return (
        <div className={cn(
            "rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,157,0,0.08),rgba(255,157,0,0.03)_55%,transparent)] p-8",
            className
        )}>
            <div className="mx-auto grid w-[240px] grid-cols-7 gap-2 rounded-[28px] border border-white/10 bg-[#0A0A0A] p-6 shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative overflow-hidden group">
                {/* Visual Flair */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-container/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                {Array.from({ length: 49 }).map((_, index) => {
                    const active = [
                        0, 1, 2, 7, 9, 14, 15, 16, 4, 5, 6, 11, 13, 18, 19, 20, 28, 29, 30,
                        35, 37, 42, 43, 44, 32, 33, 34, 39, 41, 46, 47, 48, 22, 24, 26, 31,
                        38, 40, 10, 17, 21, 23, 25, 27,
                    ].includes(index);

                    const corner =
                        index < 3 ||
                        (index > 6 && index < 10) ||
                        (index > 13 && index < 17) ||
                        (index > 3 && index < 7) ||
                        (index > 31 && index < 35) ||
                        (index > 38 && index < 42) ||
                        (index > 45 && index < 49);

                    return (
                        <div
                            key={index}
                            className={cn(
                                "aspect-square rounded-[4px] transition-all duration-700",
                                active ? "bg-white" : "bg-white/[0.04]",
                                corner && active ? "shadow-[0_0_15px_rgba(255,157,0,0.4)] bg-primary-container" : ""
                            )}
                        />
                    );
                })}
            </div>
            <div className="mt-8 text-center">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">
                    {caption}
                </div>
                <div className="font-mono text-[11px] text-white/60 bg-white/5 py-3 px-4 rounded-xl border border-white/5 break-all select-all">
                    {label}
                </div>
            </div>
        </div>
    );
}
