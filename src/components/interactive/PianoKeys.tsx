'use client';

import { useState, useRef } from 'react';

const PianoKey = ({ index, total }: { index: number; total: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Calculate hue based on position for a full rainbow spectrum
    const hue = Math.floor((index / total) * 360);
    const color = `hsl(${hue}, 70%, 60%)`;
    const glowColor = `hsl(${hue}, 70%, 45%)`;

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current); // cancel pending fade-out
        setIsHovered(true); // show instantly
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsHovered(false); // delayed hide
        }, 120); // tweak delay here
    };

    return (
        <div
            className="flex-1 relative group cursor-pointer h-full transition-all ease-out"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                borderRight: '1px solid rgba(255, 255, 255, 0.03)',
            }}
        >
            <div
                className="absolute inset-0 transition-opacity duration-200 ease-linear"
                style={{
                    backgroundColor: color,
                    boxShadow: isHovered ? `0 0 20px 2px ${glowColor}` : 'none',
                    opacity: isHovered ? 1 : 0,
                }}
            />

            <div className="absolute top-0 inset-x-0 h-[1px] bg-white/5 opacity-50" />
        </div>
    );
};


export default function PianoKeys() {
    // Generate enough keys to look like a smooth gradient strip
    const keyCount = 24;
    const keys = Array.from({ length: keyCount });

    return (
        <div className="w-full h-24 sm:h-32 md:h-48 relative overflow-hidden bg-black/20 border-b border-white/5 backdrop-blur-sm [mask-image:linear-gradient(to_bottom,transparent_0%,black_40%)]">
            <div className="flex w-full h-full">
                {keys.map((_, i) => (
                    <PianoKey key={i} index={i} total={keyCount} />
                ))}
            </div>
            {/* Overlay gradient for depth (optional, keeping it clean for now) */}
        </div>
    );
}
