import React from 'react';

const Logo = ({ className = "" }) => {
    return (
        <div className={`flex items-center gap-1.5 font-headline font-black tracking-tighter transition-all hover:scale-105 ${className}`}>
            <span className="text-2xl md:text-3xl lg:text-4xl text-white">RAIL</span>
            <span className="text-2xl md:text-3xl lg:text-4xl text-rail-orange relative">
                PULSE
                <span className="absolute -right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-rail-orange rounded-full animate-pulse shadow-[0_0_10px_#FF6A00]"></span>
            </span>
        </div>
    );
};

export default Logo;
