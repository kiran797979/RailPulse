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
        <div ref={containerRef} className="bg-[#0B0B0B] min-h-screen p-6 lg:p-20">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20 reveal-section">
                    <div>
                        <div className="inline-block px-3 py-1 bg-rail-orange text-black rounded-sm text-[9px] font-black uppercase tracking-[0.2em] mb-4">
                            FLEET INTELLIGENCE v4.0
                        </div>
                        <h1 className="text-5xl md:text-7xl font-headline font-black text-white tracking-tighter leading-none">NETWORK ANALYTICS</h1>
                        <p className="text-rail-gray font-bold uppercase tracking-widest text-xs mt-4">Predictive failure modeling and global fleet health architecture</p>
                    </div>
                    <div className="flex items-center space-x-4 industrial-glass p-3 rounded-2xl border border-white/5">
                        <span className="text-[9px] font-black text-rail-gray/60 uppercase ml-3 mr-2 tracking-widest">Zone Calibration</span>
                        <select
                            className="bg-white/5 px-6 py-2 rounded-xl text-xs font-black text-rail-orange outline-none border border-white/5 focus:border-rail-orange/30 appearance-none uppercase tracking-widest cursor-pointer"
                            value={selectedZone}
                            onChange={(e) => setSelectedZone(e.target.value)}
                        >
                            <option value="all" className="bg-[#1A1A1A]">Unified Grid</option>
                            {zonesData.map(z => <option key={z} value={z} className="bg-[#1A1A1A]">{z.toUpperCase()}</option>)}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10 reveal-section">
                    {/* Main Network Health */}
                    <div className="lg:col-span-2 industrial-glass p-10 rounded-[3rem] border border-white/5 shadow-2xl">
                        <h3 className="text-[10px] font-black text-white mb-10 uppercase tracking-[0.4em]">Rolling average Health Score by zone</h3>
                        <ChartBar
                            data={zoneHealthData}
                            xKey="name"
                            yKey="health"
                            colors={["#FF6A00", "#FF8533", "#CC5500", "#FF4400", "#333333"]}
                        />
                    </div>

                    <div className="industrial-glass p-10 rounded-[3rem] border border-white/5 shadow-2xl flex flex-col justify-between">
                        <h3 className="text-[10px] font-black text-white mb-10 uppercase tracking-[0.4em]">Asset Protocol Distribution</h3>
                        <ChartPie data={assetDistribution} nameKey="name" valueKey="value" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 reveal-section">
                    <div className="industrial-glass p-10 rounded-[3rem] border border-white/5 shadow-2xl bg-gradient-to-br from-[#1A1A1A] to-transparent">
                        <h3 className="text-[10px] font-black text-white mb-10 uppercase tracking-[0.4em] border-b border-white/5 pb-4">Aggregate Metadata</h3>
                        <ul className="space-y-8">
                            {[
                                { label: "Fleet MTBF", value: "14,200 Hrs" },
                                { label: "Prediction Delta", value: "94.8%" },
                                { label: "Stream Integrity", value: "99.99%" },
                                { label: "Cloud Ingest", value: "842 TB/D" }
                            ].map((insight, i) => (
                                <li key={i} className="flex justify-between items-end border-b border-white/5 pb-4">
                                    <span className="text-[9px] font-black text-rail-gray uppercase tracking-widest">{insight.label}</span>
                                    <span className="text-xl font-headline font-black text-white tracking-tighter">{insight.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2 industrial-glass p-10 rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8">
                            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8_#f43f5e]"></div>
                        </div>
                        <h3 className="text-[10px] font-black text-white mb-10 uppercase tracking-[0.4em]">Neural Failure Probability (7-Day Projection)</h3>
                        <div className="h-64">
                            <ChartLine data={failureTrend} xKey="day" yKey="probability" color="#FF6A00" />
                        </div>
                        <p className="mt-8 text-[9px] text-rail-gray/40 font-black uppercase tracking-widest leading-relaxed"> Historical baseline + live vibration correlations used for weighted forecasting.</p>
                    </div>
                </div>

                <div className="mt-16 industrial-glass p-12 rounded-[4rem] border border-white/5 shadow-2xl text-center reveal-section">
                    <h4 className="text-white font-black mb-12 uppercase text-[10px] tracking-[0.5em]">System Performance Confidence</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-8">
                        {[
                            { label: "LOCOMOTIVE ACCURACY", val: "98.2%" },
                            { label: "BRIDGE STRESS PREDICTION", val: "94.1%" },
                            { label: "SIGNAL LATENCY MIN", val: "99.9%" }
                        ].map((metric, i) => (
                            <div key={i} className="text-center group">
                                <p className="text-6xl font-headline font-black text-white tracking-tighter group-hover:text-rail-orange transition-colors">{metric.val}</p>
                                <p className="text-[9px] font-black text-rail-gray uppercase tracking-[0.2em] mt-3">{metric.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
