import React from "react";

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
    const baseStyles = "headline-font font-bold rounded-full transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer";

    const variantStyles = {
        primary: "bg-gradient-to-br from-primary-container to-secondary-container text-on-primary-fixed aegis-glow hover:brightness-110",
        secondary: "bg-surface-container-highest border border-outline-variant/20 text-on-surface hover:bg-surface-variant",
        outline: "border border-primary-container/30 text-primary-container hover:bg-primary-container/10",
        ghost: "text-on-surface-variant hover:text-white hover:bg-white/5",
    };

    const sizeStyles = {
        sm: "px-4 py-1.5 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base",
        xl: "px-10 py-5 text-lg font-black uppercase tracking-widest",
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
