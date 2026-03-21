"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type OrbState = 'idle' | 'listening' | 'success';

export default function FloatingOrb() {
    const [state, setState] = useState<OrbState>('idle');

    useEffect(() => {
        const timer = setInterval(() => {
            setState(prev => prev === 'idle' ? 'listening' : prev === 'listening' ? 'success' : 'idle');
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const variants = {
        idle: {
            scale: 1,
            backgroundColor: 'rgba(249, 115, 22, 0.2)',
            boxShadow: '0 0 20px rgba(249, 115, 22, 0.2)',
        },
        listening: {
            scale: [1, 1.2, 1],
            backgroundColor: 'rgba(139, 92, 246, 0.4)',
            boxShadow: '0 0 40px rgba(139, 92, 246, 0.4)',
            transition: {
                scale: { repeat: Infinity, duration: 2 },
                duration: 0.5
            }
        },
        success: {
            scale: 1.1,
            backgroundColor: 'rgba(34, 197, 94, 0.4)',
            boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)',
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <motion.div
                variants={variants}
                animate={state}
                className="w-16 h-16 rounded-full glass flex items-center justify-center border border-white/10 cursor-pointer backdrop-blur-3xl"
            >
                <div className="w-4 h-4 rounded-full bg-white/80" />

                <div className="absolute -top-12 right-0 glass px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border-white/10">
                    Aegis Assistant
                </div>
            </motion.div>
        </div>
    );
}
