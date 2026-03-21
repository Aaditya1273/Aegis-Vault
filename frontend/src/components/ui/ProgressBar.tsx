import React from "react";

interface ProgressBarProps {
    value: number; // 0 to 100
    label?: string;
    subLabel?: string;
    className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    value,
    label,
    subLabel,
    className = "",
}) => {
    return (
        <div className={`space-y-4 ${className}`}>
            {(label || subLabel) && (
                <div className="flex justify-between items-end text-sm">
                    {label && <span className="font-semibold headline-font">{label}</span>}
                    {subLabel && <span className="text-outline text-xs">{subLabel}</span>}
                </div>
            )}
            <div className="h-3 w-full bg-surface-container-lowest rounded-full overflow-hidden p-0.5 border border-outline-variant/10">
                <div
                    className="h-full bg-gradient-to-r from-primary-container to-secondary-container rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
