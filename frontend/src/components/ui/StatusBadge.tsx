"use client";

import React from "react";
import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
    "Broadcasted": "border-amber-400/30 bg-amber-400/10 text-amber-200",
    "Pending": "border-amber-400/30 bg-amber-400/10 text-amber-200",
    "Success": "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    "Confirmed": "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    "Failed": "border-rose-400/30 bg-rose-400/10 text-rose-200",
    "Error": "border-rose-400/30 bg-rose-400/10 text-rose-200",
};

export default function StatusBadge({
    label,
    className,
}: {
    label: string;
    className?: string;
}) {
    return (
        <span
            className={cn(
                "inline-flex rounded-full border px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em]",
                styles[label] ?? "border-white/10 bg-white/5 text-white/60",
                className
            )}
        >
            {label}
        </span>
    );
}
