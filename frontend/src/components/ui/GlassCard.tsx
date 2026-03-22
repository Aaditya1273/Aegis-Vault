"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function GlassCard({
    children,
    className
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={cn(
            "relative group",
            "bg-white/[0.03] backdrop-blur-xl",
            "border border-white/10 rounded-[2.5rem]",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]",
            "transition-all duration-500",
            "hover:border-white/20 hover:bg-white/[0.05]",
            className
        )}>
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
            <div className="relative z-10 p-8 md:p-12">
                {children}
            </div>
        </div>
    );
}
