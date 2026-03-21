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
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-container rounded-full shadow-[0_0_15px_#FF9D00]" />
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
    const [stars, setStars] = useState<any[]>([]);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring for smooth cursor movement
    const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

    // Drift icons away from cursor
    const driftX = useTransform(springX, (v) => v * -0.05);
    const driftY = useTransform(springY, (v) => v * -0.05);

    // Gradient follow
    const gradientX = useTransform(springX, (v) => v - 500);
    const gradientY = useTransform(springY, (v) => v - 500);

    // Additional variated drifts for different icons
    const driftX8 = useTransform(springX, v => v * -0.08);
    const driftY8 = useTransform(springY, v => v * -0.08);
    const driftX3 = useTransform(springX, v => v * -0.03);
    const driftY3 = useTransform(springY, v => v * -0.03);
    const driftX10 = useTransform(springX, v => v * -0.1);
    const driftY10 = useTransform(springY, v => v * -0.1);
    const driftX6 = useTransform(springX, v => v * -0.06);
    const driftY6 = useTransform(springY, v => v * -0.06);

    useEffect(() => {
        setMounted(true);

        // Generate stars only on client
        const newStars = [...Array(50)].map((_, i) => ({
            id: i,
            width: Math.random() * 2 + "px",
            height: Math.random() * 2 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5,
        }));
        setStars(newStars);

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
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className="absolute rounded-full bg-white/20"
                        style={{
                            width: star.width,
                            height: star.height,
                            top: star.top,
                            left: star.left,
                            opacity: star.opacity,
                        }}
                    />
                ))}
            </div>

            {/* 2. Depth Gradient Layer */}
            <motion.div
                className="absolute w-[1500px] h-[1500px] bg-primary-container/3 rounded-full blur-[200px] left-1/2 top-1/2"
                style={{
                    x: gradientX,
                    y: gradientY,
                }}
            />

            {/* 2. Meteor Layer */}
            <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                    <Meteor key={i} id={i} />
                ))}
            </div>

            {/* 3. Logo Field Layer */}
            <div className="absolute inset-0 flex flex-wrap gap-x-64 gap-y-48 p-24 justify-around opacity-30">
                <LogoIcon icon="currency_bitcoin" x={driftX} y={driftY} />
                <LogoIcon icon="shield_with_heart" x={driftX8} y={driftY8} />
                <LogoIcon icon="account_balance" x={driftX3} y={driftY3} />
                <LogoIcon icon="lock" x={driftX10} y={driftY10} />
                <LogoIcon icon="rocket_launch" x={driftX} y={driftY} />
                <LogoIcon icon="monetization_on" x={driftX6} y={driftY6} />
                <LogoIcon icon="security" x={driftX8} y={driftY3} />
                <LogoIcon icon="account_balance_wallet" x={driftX3} y={driftX10} />
                <LogoIcon icon="hub" x={driftX10} y={driftY6} />
            </div>

            {/* 4. Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
        </div>
    );
}
