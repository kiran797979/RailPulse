import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useMockSocket } from '../components/MockSocket';
import ChartBar from '../components/ChartBar';
import ChartLine from '../components/ChartLine';
import ChartPie from '../components/ChartPie';
import StatBlock from '../components/StatBlock';
import zonesData from '../data/zones.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Analytics = () => {
    const { getAllAssets } = useMockSocket();
    const [selectedZone, setSelectedZone] = useState('all');
    const assets = getAllAssets();
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray(".reveal-section").forEach((section) => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    y: 60,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power3.out"
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const filteredAssets = useMemo(() => {
        return selectedZone === 'all'
            ? assets
            : assets.filter(a => a.zone === selectedZone);
    }, [assets, selectedZone]);

    // Data Aggregations
    const zoneHealthData = useMemo(() => {
        return zonesData.map(zone => {
            const zoneAssets = assets.filter(a => a.zone === zone);
            const avg = zoneAssets.length > 0
                ? Math.round(zoneAssets.reduce((acc, a) => acc + a.health, 0) / zoneAssets.length)
                : 0;
            return { name: zone.toUpperCase(), health: avg };
        });
    }, [assets]);

    const assetDistribution = useMemo(() => {
        const types = ['locomotive', 'signal', 'bridge', 'level_crossing'];
        return types.map(type => {
            const count = filteredAssets.filter(a => a.type === type).length;
            return { name: type.charAt(0).toUpperCase() + type.slice(1), value: count };
        });
    }, [filteredAssets]);

    const failureTrend = useMemo(() => {
        return Array.from({ length: 7 }, (_, i) => ({
            day: `T-${7 - i}D`,
            probability: (Math.random() * 5 + 1).toFixed(1)
        }));
    }, []);

    return (
        <div ref={containerRef} className="bg-[#0B0B0B] min-h-screen p-4 md:p-10 lg:p-20">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-10 mb-12 md:mb-20 reveal-section">
                    <div>
                        <div className="inline-block px-3 py-1 bg-rail-orange text-black rounded-sm text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] mb-3 md:mb-4">
                            FLEET INTELLIGENCE v4.0
                        </div>
                        <h1 className="text-4xl md:text-7xl font-headline font-black text-white tracking-tighter leading-none uppercase">NETWORK ANALYTICS</h1>
                        <p className="text-rail-gray font-bold uppercase tracking-widest text-[10px] md:text-xs mt-3 opacity-80">Predictive failure modeling and global fleet architecture</p>
                    </div>
                    <div className="flex items-center space-x-3 md:space-x-4 industrial-glass p-3 rounded-2xl border border-white/5 w-full md:w-auto">
                        <span className="text-[8px] md:text-[9px] font-black text-rail-gray/60 uppercase ml-2 mr-1 md:ml-3 md:mr-2 tracking-widest whitespace-nowrap">Zone Calibration</span>
                        <select
                            className="bg-white/5 px-4 md:px-6 py-2 rounded-xl text-xs font-black text-rail-orange outline-none border border-white/5 focus:border-rail-orange/30 appearance-none uppercase tracking-widest cursor-pointer w-full md:w-auto"
                            value={selectedZone}
                            onChange={(e) => setSelectedZone(e.target.value)}
                        >
                            <option value="all" className="bg-[#1A1A1A]">Unified Grid</option>
                            {zonesData.map(z => <option key={z} value={z} className="bg-[#1A1A1A]">{z.toUpperCase()}</option>)}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10 mb-6 md:mb-10 reveal-section">
                    {/* Main Network Health */}
                    <div className="lg:col-span-2 industrial-glass p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-2xl">
                        <h3 className="text-[9px] md:text-[10px] font-black text-white mb-8 md:mb-10 uppercase tracking-[0.4em]">Health Score by zone</h3>
                        <div className="h-60 md:h-80">
                            <ChartBar
                                data={zoneHealthData}
                                xKey="name"
                                yKey="health"
                                colors={["#FF6A00", "#FF8533", "#CC5500", "#FF4400", "#333333"]}
                            />
                        </div>
                    </div>

                    <div className="industrial-glass p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-2xl flex flex-col justify-between">
                        <h3 className="text-[9px] md:text-[10px] font-black text-white mb-8 md:mb-10 uppercase tracking-[0.4em]">Asset Protocol</h3>
                        <div className="h-60 md:h-full">
                            <ChartPie data={assetDistribution} nameKey="name" valueKey="value" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10 reveal-section">
                    <div className="industrial-glass p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-2xl bg-gradient-to-br from-[#1A1A1A] to-transparent">
                        <h3 className="text-[9px] md:text-[10px] font-black text-white mb-8 md:mb-10 uppercase tracking-[0.4em] border-b border-white/5 pb-4">Aggregate Metadata</h3>
                        <ul className="space-y-6 md:space-y-8">
                            {[
                                { label: "Fleet MTBF", value: "14,200 Hrs" },
                                { label: "Prediction Delta", value: "94.8%" },
                                { label: "Stream Integrity", value: "99.99%" },
                                { label: "Cloud Ingest", value: "842 TB/D" }
                            ].map((insight, i) => (
                                <li key={i} className="flex justify-between items-end border-b border-white/5 pb-4">
                                    <span className="text-[8px] md:text-[9px] font-black text-rail-gray uppercase tracking-widest">{insight.label}</span>
                                    <span className="text-lg md:text-xl font-headline font-black text-white tracking-tighter">{insight.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2 industrial-glass p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-6 md:p-8">
                            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8_#f43f5e]"></div>
                        </div>
                        <h3 className="text-[9px] md:text-[10px] font-black text-white mb-8 md:mb-10 uppercase tracking-[0.4em]">Neural Failure (7-Day Projection)</h3>
                        <div className="h-60 md:h-72">
                            <ChartLine data={failureTrend} xKey="day" yKey="probability" color="#FF6A00" />
                        </div>
                        <p className="mt-6 md:mt-8 text-[8px] md:text-[9px] text-rail-gray/40 font-black uppercase tracking-widest leading-relaxed"> Historical baseline + vibration correlations for weighted forecasting.</p>
                    </div>
                </div>

                <div className="mt-12 md:mt-16 industrial-glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border border-white/5 shadow-2xl text-center reveal-section">
                    <h4 className="text-white font-black mb-10 md:mb-12 uppercase text-[9px] md:text-[10px] tracking-[0.5em]">Performance Confidence</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mt-4 md:mt-8">
                        {[
                            { label: "LOCOMOTIVE", val: "98.2%" },
                            { label: "BRIDGE STRESS", val: "94.1%" },
                            { label: "SIGNAL LATENCY", val: "99.9%" }
                        ].map((metric, i) => (
                            <div key={i} className="text-center group">
                                <p className="text-5xl md:text-6xl font-headline font-black text-white tracking-tighter group-hover:text-rail-orange transition-colors">{metric.val}</p>
                                <p className="text-[8px] md:text-[9px] font-black text-rail-gray uppercase tracking-[0.2em] mt-3">{metric.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
