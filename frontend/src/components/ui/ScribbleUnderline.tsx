"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ScribbleUnderline({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={`relative inline-block ${className}`}>
            {children}
            <svg
                className="absolute -bottom-2 left-0 w-full h-3 pointer-events-none"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
            >
                <motion.path
                    d="M0 10 Q 25 2, 50 10 T 100 10"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-primary-container/40"
                />
            </svg>
        </span>
    );
}
