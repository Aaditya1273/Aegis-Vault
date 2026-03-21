"use client";

import React from "react";
import { motion } from "framer-motion";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: "low" | "high" | "highest" | "lowest";
    glass?: boolean;
    animate?: boolean;
}

const Card: React.FC<CardProps> = ({
    children,
    className = "",
    variant = "high",
    glass = false,
    animate = true
}) => {
    const bgClasses = {
        lowest: "bg-surface-container-lowest",
        low: "bg-surface-container-low",
        high: "bg-surface-container-high",
        highest: "bg-surface-container-highest",
    };

    const Component = animate ? motion.div : "div";

    return (
        <Component
            initial={animate ? { opacity: 0, y: 20 } : undefined}
            whileInView={animate ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={`
        rounded-2xl border border-white/5 relative overflow-hidden
        ${bgClasses[variant]}
        ${glass ? "glass-panel" : ""}
        ${className}
      `}
        >
            {/* Subtle Gradient Glow */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
            <div className="relative z-10">{children}</div>
        </Component>
    );
};

export default Card;
