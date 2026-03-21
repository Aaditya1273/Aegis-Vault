"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function DynamicMesh() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { damping: 50, stiffness: 200 });
    const springY = useSpring(y, { damping: 50, stiffness: 200 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y]);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <motion.div
                className="absolute w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]"
                style={{
                    left: springX,
                    top: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
            <div className="absolute inset-0 bg-transparent backdrop-blur-3xl" />
        </div>
    );
}
