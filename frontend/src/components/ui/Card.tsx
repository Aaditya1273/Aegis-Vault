import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: "low" | "high" | "highest" | "lowest";
    glass?: boolean;
}

const Card: React.FC<CardProps> = ({
    children,
    className = "",
    variant = "high",
    glass = false
}) => {
    const bgClasses = {
        lowest: "bg-surface-container-lowest",
        low: "bg-surface-container-low",
        high: "bg-surface-container-high",
        highest: "bg-surface-container-highest",
    };

    return (
        <div
            className={`
        rounded-md border border-outline-variant/10 relative overflow-hidden transition-all duration-300
        ${bgClasses[variant]}
        ${glass ? "glass-panel" : ""}
        ${className}
      `}
        >
            {/* Subtle Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/2 via-transparent to-secondary-container/2 pointer-events-none" />
            <div className="relative z-10">{children}</div>
        </div>
    );
};

export default Card;
