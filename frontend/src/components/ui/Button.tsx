"use client";

import React from "react";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    size = "md",
    className = "",
    ...props
}) => {
    const baseStyles = "headline-font font-black rounded-full transition-all flex items-center justify-center gap-3 cursor-pointer select-none";

    const variantStyles = {
        primary: "bg-surface text-white border border-white/10 hover:border-primary-container shadow-[0_0_20px_rgba(0,0,0,0.5)]",
        secondary: "bg-surface-container-highest border border-white/5 text-on-surface hover:bg-white/5",
        outline: "border border-white/20 text-white hover:border-primary-container hover:bg-primary-container/5",
        ghost: "text-on-surface-variant hover:text-white hover:bg-white/5",
    };

    const sizeStyles = {
        sm: "px-5 py-2 text-[10px] uppercase tracking-[0.2em]",
        md: "px-8 py-4 text-xs uppercase tracking-[0.3em]",
        lg: "px-10 py-5 text-sm uppercase tracking-[0.4em]",
        xl: "px-14 py-7 text-base uppercase tracking-[0.5em] font-black italic",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            {...(props as any)}
        >
            {children}
            {variant === "primary" && (
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
        </motion.button>
    );
};

export default Button;
