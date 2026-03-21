"use client";

import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const icons = [
    "₿", "Ξ", "⚛", "◈", "⚙", "🛡️", "🔗"
];

export default function LogoField() {
    const [mounted, setMounted] = React.useState(false);
    const mouseX = useMotionValue<number>(0);
    const mouseY = useMotionValue<number>(0);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        mouseX.set(clientX);
        mouseY.set(clientY);
    };

    const logos = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        icon: icons[i % icons.length],
        scale: 0.5 + Math.random(),
        rotation: Math.random() * 360,
        duration: 5 + Math.random() * 5
    })), []);

    if (!mounted) return null;

    return (
        <div onMouseMove={handleMouseMove} className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
            {logos.map((logo) => (
                <LogoIcon key={logo.id} logo={logo} mouseX={mouseX} mouseY={mouseY} />
            ))}
        </div>
    );
}

function LogoIcon({ logo, mouseX, mouseY }: {
    logo: any,
    mouseX: any,
    mouseY: any
}) {
    const ref = useRef<HTMLDivElement>(null);

    // Spring physics for smooth movement
    const smoothX = useSpring(mouseX, { damping: 30, stiffness: 100 });
    const smoothY = useSpring(mouseY, { damping: 30, stiffness: 100 });

    const repelX = useTransform(smoothX, (val: number) => {
        if (!ref.current) return 0;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const dist = val - centerX;
        return dist > 0 ? -Math.max(0, 100 - Math.abs(dist)) : Math.max(0, 100 - Math.abs(dist));
    });

    const repelY = useTransform(smoothY, (val: number) => {
        if (!ref.current) return 0;
        const rect = ref.current.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const dist = val - centerY;
        return dist > 0 ? -Math.max(0, 100 - Math.abs(dist)) : Math.max(0, 100 - Math.abs(dist));
    });

    return (
        <motion.div
            ref={ref}
            className="absolute text-2xl filter blur-[1px] select-none"
            style={{
                left: `${logo.initialX}%`,
                top: `${logo.initialY}%`,
                scale: logo.scale,
                rotate: logo.rotation,
                x: repelX as any,
                y: repelY as any
            }}
            animate={{
                y: [0, -20, 0],
                rotate: [logo.rotation as number, (logo.rotation as number) + 10, logo.rotation as number]
            }}
            transition={{
                duration: logo.duration,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            {logo.icon}
        </motion.div>
    );
}
