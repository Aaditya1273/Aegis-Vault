import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    symbol?: string;
    icon?: string;
    balance?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    symbol,
    icon,
    balance,
    ...props
}) => {
    return (
        <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/10 group focus-within:border-primary-container/30 transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                    {label}
                </label>
                {balance && (
                    <span className="text-xs text-on-surface-variant font-medium">
                        Balance: {balance}
                    </span>
                )}
            </div>
            <div className="flex items-center gap-4">
                <input
                    className="bg-transparent border-none p-0 text-4xl md:text-5xl font-headline font-bold text-on-surface w-full focus:ring-0 placeholder:text-on-surface-variant/20 tabular-nums outline-none"
                    {...props}
                />
                {symbol && (
                    <div className="flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-full border border-outline-variant/10">
                        {icon && (
                            <span
                                className={`material-symbols-outlined ${symbol === 'BTC' ? 'text-[#F7931A]' : 'text-primary-container'}`}
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                {icon}
                            </span>
                        )}
                        <span className="font-bold text-sm tracking-tight">{symbol}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;
