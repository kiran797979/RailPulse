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
        <div className="bg-[#0B0B0B] min-h-screen p-6 lg:p-12">
            <div className="container mx-auto">
                {/* Header & KPIs */}
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                        <div>
                            <div className="inline-block px-3 py-1 rounded-sm bg-rail-orange text-black text-[9px] font-black uppercase tracking-[0.2em] mb-4">
                                LIVE FLOW : DETERMINISTIC
                            </div>
                            <h1 className="text-5xl md:text-6xl font-headline font-black text-white tracking-tighter">NETWORK COMMAND</h1>
                            <p className="text-rail-gray font-bold uppercase tracking-widest text-xs mt-2">Real-time telemetry stream from 42,000km of monitored rail</p>
                        </div>
                        <div className="flex items-center space-x-3 bg-rail-orange/10 text-rail-orange px-6 py-3 rounded-full border border-rail-orange/20 glow-orange">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rail-orange opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-rail-orange"></span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Stream Active</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatBlock label="Active Nodes" value={activeAssets} icon="🛠️" />
                        <StatBlock label="Operational Health" value={`${avgHealth}%`} icon="❤️" trend="+1.2%" />
                        <StatBlock label="Critical Alerts" value={alerts24h} icon="⚠️" trend={alerts24h > 10 ? '+5%' : '-2%'} />
                        <StatBlock label="Projected Yield" value={simulatedARR} icon="💰" subtext="Calculated Real-Time" />
                    </div>
                </div>

                {/* Filters & Content */}
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-72 space-y-8">
                        <div className="industrial-glass p-8 rounded-[2rem] border border-white/5">
                            <h3 className="font-black text-white mb-8 uppercase text-[10px] tracking-[0.3em] border-b border-white/5 pb-4">Protocol Filters</h3>

                            <div className="space-y-8">
                                <div>
                                    <label className="block text-[9px] font-black text-rail-gray/60 uppercase mb-3 tracking-widest">Asset Search</label>
                                    <input
                                        type="text"
                                        placeholder="ID / MODEL NO..."
                                        className="w-full px-5 py-3 bg-white/5 border border-white/5 rounded-xl text-xs text-white placeholder:text-rail-gray/30 focus:border-rail-orange/50 outline-none transition-all font-bold uppercase tracking-widest"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[9px] font-black text-rail-gray/60 uppercase mb-3 tracking-widest">Deployment Type</label>
                                    <select
                                        className="w-full px-5 py-3 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:border-rail-orange/50 outline-none font-bold uppercase tracking-widest appearance-none cursor-pointer"
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
                                    <label className="block text-[9px] font-black text-rail-gray/60 uppercase mb-3 tracking-widest">Operation Zone</label>
                                    <div className="space-y-2">
                                        {['all', ...zonesData].map(zone => (
                                            <button
                                                key={zone}
                                                onClick={() => setFilterZone(zone)}
                                                className={`w-full text-left px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${filterZone === zone ? 'bg-rail-orange text-black border-rail-orange shadow-[0_0_15px_rgba(255,106,0,0.3)]' : 'text-rail-gray border-transparent hover:bg-white/5 hover:border-white/10'
                                                    }`}
                                            >
                                                {zone}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-rail-orange p-8 rounded-[2rem] text-black shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16 blur-3xl group-hover:scale-150 transition-transform"></div>
                            <h4 className="font-headline text-2xl font-black mb-2 leading-none">ANALYTIC<br />ACCESS</h4>
                            <p className="text-[10px] font-bold uppercase tracking-wider mb-6 opacity-70">Deep neural scoring and risk telemetry available.</p>
                            <button className="w-full py-3 bg-black text-white font-black rounded-xl text-[10px] uppercase tracking-widest hover:scale-105 transition-all">Go to Intelligence</button>
                        </div>
                    </aside>

                    {/* Asset Grid */}
                    <div className="flex-grow">
                        <div className="mb-6 flex justify-between items-center text-rail-gray font-black text-[10px] uppercase tracking-[0.2em]">
                            <span className="opacity-60">Displaying {filteredAssets.length} of {activeAssets} active nodes</span>
                            <div className="flex items-center space-x-3">
                                <span className="w-2 h-2 rounded-full bg-rail-orange animate-pulse"></span>
                                <span>Sorted by Priority Index</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredAssets.map(asset => (
                                <div key={asset.id} className={lastUpdatedId === asset.id ? 'flash-orange rounded-3xl' : ''}>
                                    <AssetCard asset={asset} />
                                </div>
                            ))}
                            {filteredAssets.length === 0 && (
                                <div className="col-span-full py-32 text-center industrial-glass rounded-[3rem] border-2 border-dashed border-white/5">
                                    <p className="text-rail-gray font-black uppercase tracking-[0.3em] text-sm">Zero assets match current protocol filters.</p>
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
