"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

const Meteor = ({ id }: { id: number }) => {
    const [styles, setStyles] = useState<any>({});

    useEffect(() => {
        setStyles({
            top: `${Math.random() * -20}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${2 + Math.random() * 4}s`,
        });
    }, []);

    return (
        <div
            key={id}
            className="absolute w-[1px] h-[80px] bg-gradient-to-b from-primary-container/60 via-primary-container/20 to-transparent rotate-[215deg] blur-[1px] pointer-events-none animate-meteor"
            style={styles}
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-container rounded-full shadow-[0_0_15px_#00F5FF]" />
        </div>
    );
};

const LogoIcon = ({ icon, x, y }: { icon: string; x: any; y: any }) => (
    <motion.div
        style={{ x, y }}
        className="text-white/5 text-4xl select-none pointer-events-none"
    >
        <span className="material-symbols-outlined">{icon}</span>
    </motion.div>
);

export default function AtmosphericLayer() {
    const [mounted, setMounted] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring for smooth cursor movement
    const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

    // Drift icons away from cursor
    const driftX = useTransform(springX, (v) => v * -0.05);
    const driftY = useTransform(springY, (v) => v * -0.05);

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - window.innerWidth / 2);
            mouseY.set(e.clientY - window.innerHeight / 2);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0A0A0B] pointer-events-none select-none">
            {/* 1. Starfield Particle Layer */}
            <div className="absolute inset-0 z-0">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white/20"
                        style={{
                            width: Math.random() * 2 + "px",
                            height: Math.random() * 2 + "px",
                            top: Math.random() * 100 + "%",
                            left: Math.random() * 100 + "%",
                            opacity: Math.random() * 0.5,
                        }}
                    />
                ))}
            </div>

            {/* 2. Depth Gradient Layer */}
            <motion.div
                className="absolute w-[1000px] h-[1000px] bg-primary-container/5 rounded-full blur-[150px]"
                style={{
                    x: useTransform(springX, (v) => v - 500 + window.innerWidth / 2),
                    y: useTransform(springY, (v) => v - 500 + window.innerHeight / 2),
                }}
            />

            {/* 2. Meteor Layer */}
            <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                    <Meteor key={i} id={i} />
                ))}
            </div>

            {/* 3. Logo Field Layer */}
            <div className="absolute inset-0 flex flex-wrap gap-40 p-20 justify-around opacity-40">
                <LogoIcon icon="currency_bitcoin" x={driftX} y={driftY} />
                <LogoIcon icon="shield_with_heart" x={useTransform(springX, v => v * -0.08)} y={useTransform(springY, v => v * -0.08)} />
                <LogoIcon icon="account_balance" x={useTransform(springX, v => v * -0.03)} y={useTransform(springY, v => v * -0.03)} />
                <LogoIcon icon="lock" x={useTransform(springX, v => v * -0.1)} y={useTransform(springY, v => v * -0.1)} />
                <LogoIcon icon="rocket_launch" x={driftX} y={driftY} />
                <LogoIcon icon="monetization_on" x={useTransform(springX, v => v * -0.06)} y={useTransform(springY, v => v * -0.06)} />
            </div>

            {/* 4. Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
        </div>
    );
}
