import React from 'react';

const StatBlock = ({ label, value, subtext, icon, trend }) => {
    return (
        <div className="industrial-glass p-6 rounded-3xl border border-white/5 hover:border-rail-orange/30 transition-all group">
            <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-rail-orange/10 rounded-xl text-rail-orange glow-orange group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                {trend && (
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter ${trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rail-orange/10 text-rail-orange'
                        }`}>
                        {trend}
                    </span>
                )}
            </div>
            <div className="space-y-1">
                <h3 className="text-xs font-bold text-rail-gray/60 uppercase tracking-widest">{label}</h3>
                <p className="text-4xl font-headline font-black text-white tracking-tight">{value}</p>
                {subtext && <p className="text-[10px] font-bold text-rail-gray/40 uppercase tracking-widest">{subtext}</p>}
            </div>
        </div>
    );
};

export default StatBlock;
