import React from 'react';
import { Link } from 'react-router-dom';
import HealthGauge from './HealthGauge';

const AssetCard = ({ asset }) => {
    const isHealthy = asset.health >= 80;
    const isWarning = asset.health < 80 && asset.health >= 50;

    const typeIcon = {
        locomotive: '🚂',
        signal: '🚦',
        bridge: '🌉',
        level_crossing: '🛤️'
    };

    return (
        <Link
            to={`/asset/${asset.id}`}
            className="block industrial-glass p-5 rounded-3xl border border-white/5 hover:border-rail-orange/40 transition-all active:scale-[0.98] group relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-1 h-full bg-rail-orange scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>

            <div className="flex justify-between items-start relative z-10">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform border border-white/5 group-hover:border-rail-orange/20">
                        {typeIcon[asset.type] || '📦'}
                    </div>
                    <div>
                        <h4 className="font-headline text-2xl font-black text-white leading-none tracking-tight group-hover:text-rail-orange transition-colors">{asset.id}</h4>
                        <p className="text-[10px] text-rail-gray uppercase font-black tracking-widest mt-1">{asset.type}</p>
                    </div>
                </div>
                <div className="glow-orange">
                    <HealthGauge value={asset.health} size={52} strokeWidth={5} />
                </div>
            </div>

            <div className="mt-8 flex items-center justify-between relative z-10 border-t border-white/5 pt-4">
                <div className="flex flex-col">
                    <span className="text-[9px] text-rail-gray/40 uppercase font-black tracking-[0.2em]">Deployment Zone</span>
                    <span className="text-xs text-white font-bold uppercase tracking-wider">{asset.zone}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[9px] text-rail-gray/40 uppercase font-black tracking-[0.2em]">Operational Status</span>
                    <div className="flex items-center space-x-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${isHealthy ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : isWarning ? 'bg-rail-orange shadow-[0_0_8px_#FF6A00]' : 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'} animate-pulse`}></span>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isHealthy ? 'text-emerald-400' : isWarning ? 'text-rail-orange' : 'text-rose-400'}`}>
                            {isHealthy ? 'Nominal' : isWarning ? 'Degraded' : 'Critical'}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default AssetCard;
