"use client";

interface VaultCardProps {
    label: string;
    value: string;
    change?: string;
    subLabel?: string;
    icon?: string;
}

export default function VaultCard({ label, value, change, subLabel, icon }: VaultCardProps) {
    return (
        <div className="glass p-6 rounded-2xl border-white/5 card-hover relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-all text-4xl">
                {icon}
            </div>

            <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-foreground/50 uppercase tracking-widest">{label}</span>
                <div className="flex items-baseline gap-3 mt-2">
                    <span className="text-3xl font-bold tracking-tight">{value}</span>
                    {change && (
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                            {change}
                        </span>
                    )}
                </div>
                {subLabel && (
                    <span className="text-xs text-foreground/40 mt-1">{subLabel}</span>
                )}
            </div>
        </div>
    );
}
