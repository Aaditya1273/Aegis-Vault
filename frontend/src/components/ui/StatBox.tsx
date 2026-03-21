import React from "react";
import Card from "./Card";

interface StatBoxProps {
    label: string;
    value: string;
    subValue?: string;
    trend?: {
        value: string;
        isUp: boolean;
    };
    assetLabel?: string;
    className?: string;
}

const StatBox: React.FC<StatBoxProps> = ({
    label,
    value,
    subValue,
    trend,
    assetLabel,
    className = "",
}) => {
    return (
        <Card className={`p-8 group ${className}`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-full -mr-16 -mt-16 blur-3xl transition-all group-hover:bg-primary-container/10" />
            <p className="text-xs font-bold text-outline headline-font uppercase tracking-widest mb-4">
                {label}
            </p>
            <h2 className="text-3xl font-bold headline-font tabular-nums mb-2">
                {value}
            </h2>
            <div className="flex flex-col gap-1">
                {subValue && (
                    <p className="text-xs text-outline font-medium">{subValue}</p>
                )}
                {(trend || assetLabel) && (
                    <div className="flex gap-4 text-xs font-medium">
                        {trend && (
                            <span className={`${trend.isUp ? "text-tertiary-fixed-dim" : "text-error"} flex items-center gap-1`}>
                                <span className="material-symbols-outlined text-sm">
                                    {trend.isUp ? "trending_up" : "trending_down"}
                                </span>
                                {trend.value}
                            </span>
                        )}
                        {assetLabel && (
                            <span className="text-outline uppercase tracking-wider">{assetLabel}</span>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default StatBox;
