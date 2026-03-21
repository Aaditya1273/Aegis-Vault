"use client";

import React, { useMemo } from 'react';

export default function MeteorShower() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const meteors = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 10}s`,
        duration: `${5 + Math.random() * 5}s`,
    })), []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {meteors.map((meteor) => (
                <div
                    key={meteor.id}
                    className="absolute h-0.5 w-0.5 rotate-[215deg] animate-meteor"
                    style={{
                        top: meteor.top,
                        left: meteor.left,
                        animationDelay: meteor.delay,
                        animationDuration: meteor.duration,
                    }}
                >
                    <div className="absolute top-1/2 -translate-y-1/2 w-[50px] h-[2px] bg-gradient-to-r from-orange-500/50 to-transparent" />
                </div>
            ))}
            <style jsx>{`
                @keyframes meteor {
                    0% {
                        transform: rotate(215deg) translateX(0);
                        opacity: 0;
                    }
                    30% {
                        opacity: 1;
                    }
                    100% {
                        transform: rotate(215deg) translateX(-500px);
                        opacity: 0;
                    }
                }
                .animate-meteor {
                    animation: meteor linear infinite;
                }
            `}</style>
        </div>
    );
}
