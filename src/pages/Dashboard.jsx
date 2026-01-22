import React, { useState, useEffect, useMemo } from 'react';
import { useMockSocket } from '../components/MockSocket';
import StatBlock from '../components/StatBlock';
import AssetCard from '../components/AssetCard';
import zonesData from '../data/zones.json';

const Dashboard = () => {
    const { getAllAssets, subscribe, unsubscribe } = useMockSocket();
    const [assets, setAssets] = useState(getAllAssets());
    const [filterType, setFilterType] = useState('all');
    const [filterZone, setFilterZone] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [lastUpdatedId, setLastUpdatedId] = useState(null);

    // Update assets when socket emits data
    useEffect(() => {
        const subId = subscribe((update) => {
            setLastUpdatedId(update.id);
            setAssets(prev => prev.map(asset =>
                asset.id === update.id ? { ...asset, ...update } : asset
            ));
            // Reset flash after animation
            setTimeout(() => setLastUpdatedId(null), 1000);
        });
        return () => unsubscribe(subId);
    }, [subscribe, unsubscribe]);

    // Derived stats
    const activeAssets = assets.length;
    const avgHealth = Math.round(assets.reduce((acc, a) => acc + a.health, 0) / assets.length);
    const alerts24h = assets.filter(a => a.health < 50).length;
    const simulatedARR = (assets.length * 12500).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

    // Filtering logic
    const filteredAssets = useMemo(() => {
        return assets.filter(asset => {
            const matchesType = filterType === 'all' || asset.type === filterType;
            const matchesZone = filterZone === 'all' || asset.zone === filterZone;
            const matchesSearch = asset.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                asset.model.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesType && matchesZone && matchesSearch;
        });
    }, [assets, filterType, filterZone, searchQuery]);

    return (
        <div className="bg-[#0B0B0B] min-h-screen p-4 md:p-6 lg:p-12">
            <div className="container mx-auto">
                {/* Header & KPIs */}
                <div className="mb-8 md:mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
                        <div>
                            <div className="inline-block px-3 py-1 rounded-sm bg-rail-orange text-black text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] mb-3 md:mb-4">
                                LIVE FLOW : DETERMINISTIC
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black text-white tracking-tighter leading-none">NETWORK COMMAND</h1>
                            <p className="text-rail-gray font-bold uppercase tracking-widest text-[10px] md:text-xs mt-2 opacity-80">Real-time telemetry stream across 42,000 KM</p>
                        </div>
                        <div className="flex items-center space-x-3 bg-rail-orange/10 text-rail-orange px-5 py-2.5 rounded-full border border-rail-orange/20 glow-orange self-start md:self-auto">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rail-orange opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-rail-orange"></span>
                            </span>
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">Live Stream Active</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        <StatBlock label="Active Nodes" value={activeAssets} icon="🛠️" />
                        <StatBlock label="Operational Health" value={`${avgHealth}%`} icon="❤️" trend="+1.2%" />
                        <StatBlock label="Critical Alerts" value={alerts24h} icon="⚠️" trend={alerts24h > 10 ? '+5%' : '-2%'} />
                        <StatBlock label="Projected Yield" value={simulatedARR} icon="💰" subtext="Calculated Real-Time" />
                    </div>
                </div>

                {/* Filters & Content */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-72 space-y-6 md:space-y-8">
                        <div className="industrial-glass p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/5">
                            <h3 className="font-black text-white mb-6 md:mb-8 uppercase text-[9px] md:text-[10px] tracking-[0.3em] border-b border-white/5 pb-4">Protocol Filters</h3>

                            <div className="space-y-6 md:space-y-8">
                                <div>
                                    <label className="block text-[8px] md:text-[9px] font-black text-rail-gray/60 uppercase mb-3 tracking-widest">Asset Search</label>
                                    <input
                                        type="text"
                                        placeholder="ID / MODEL NO..."
                                        className="w-full px-4 md:px-5 py-2.5 md:py-3 bg-white/5 border border-white/5 rounded-xl text-xs text-white placeholder:text-rail-gray/30 focus:border-rail-orange/50 outline-none transition-all font-bold uppercase tracking-widest"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[8px] md:text-[9px] font-black text-rail-gray/60 uppercase mb-3 tracking-widest">Deployment Type</label>
                                    <select
                                        className="w-full px-4 md:px-5 py-2.5 md:py-3 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:border-rail-orange/50 outline-none font-bold uppercase tracking-widest appearance-none cursor-pointer"
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                    >
                                        <option value="all" className="bg-[#1A1A1A]">Full Catalog</option>
                                        <option value="locomotive" className="bg-[#1A1A1A]">Locomotives</option>
                                        <option value="signal" className="bg-[#1A1A1A]">Signals</option>
                                        <option value="bridge" className="bg-[#1A1A1A]">Bridges</option>
                                        <option value="level_crossing" className="bg-[#1A1A1A]">Level Crossings</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[8px] md:text-[9px] font-black text-rail-gray/60 uppercase mb-3 tracking-widest">Operation Zone</label>
                                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                                        {['all', ...zonesData].map(zone => (
                                            <button
                                                key={zone}
                                                onClick={() => setFilterZone(zone)}
                                                className={`text-left px-4 md:px-5 py-2.5 md:py-3 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all border ${filterZone === zone ? 'bg-rail-orange text-black border-rail-orange shadow-[0_0_15px_rgba(255,106,0,0.3)]' : 'text-rail-gray border-transparent hover:bg-white/5 hover:border-white/10'
                                                    }`}
                                            >
                                                {zone}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-rail-orange p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] text-black shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16 blur-3xl group-hover:scale-150 transition-transform pointer-events-none"></div>
                            <h4 className="font-headline text-2xl font-black mb-2 leading-none uppercase">ANALYTIC<br />ACCESS</h4>
                            <p className="text-[9px] font-bold uppercase tracking-wider mb-6 opacity-70">Deep neural scoring and risk telemetry available.</p>
                            <button className="w-full py-3 bg-black text-white font-black rounded-xl text-[9px] md:text-[10px] uppercase tracking-widest hover:scale-105 transition-all">Go to Intelligence</button>
                        </div>
                    </aside>

                    {/* Asset Grid */}
                    <div className="flex-grow">
                        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-rail-gray font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em]">
                            <span className="opacity-60">Displaying {filteredAssets.length} of {activeAssets} nodes</span>
                            <div className="flex items-center space-x-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                <span className="w-1.5 h-1.5 rounded-full bg-rail-orange animate-pulse"></span>
                                <span>Sorted by Priority Index</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                            {filteredAssets.map(asset => (
                                <div key={asset.id} className={lastUpdatedId === asset.id ? 'flash-orange rounded-3xl' : ''}>
                                    <AssetCard asset={asset} />
                                </div>
                            ))}
                            {filteredAssets.length === 0 && (
                                <div className="col-span-full py-20 md:py-32 text-center industrial-glass rounded-[2rem] md:rounded-[3rem] border-2 border-dashed border-white/5">
                                    <p className="text-rail-gray font-black uppercase tracking-[0.3em] text-xs md:text-sm px-6">Zero assets match current protocol filters.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
