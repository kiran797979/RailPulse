import React, { useEffect, useState } from 'react';

const HealthGauge = ({ value, size = 60, strokeWidth = 6 }) => {
    const [offset, setOffset] = useState(0);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    useEffect(() => {
        const progress = value / 100;
        setOffset(circumference - progress * circumference);
    }, [value, circumference]);

    const getColor = (val) => {
        if (val >= 80) return '#FF6A00'; // Industrial Orange
        if (val >= 50) return '#FF6A00'; // Keep orange as primary
        return '#ef4444'; // Critical Red
    };

    return (
        <div className="relative flex items-center justify-center transition-transform hover:scale-110" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90 drop-shadow-[0_0_8px_rgba(255,106,0,0.2)]">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={getColor(value)}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.5s ease' }}
                />
            </svg>
            <span className="absolute font-headline font-black text-white text-[10px] tracking-tighter">{Math.round(value)}%</span>
        </div>
    );
};

export default HealthGauge;
