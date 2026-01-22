import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMockSocket } from '../components/MockSocket';
import { generateHealthHistory, generateTelemetry } from '../utils/mockGenerator';
import HealthGauge from '../components/HealthGauge';
import ChartLine from '../components/ChartLine';

const Asset = () => {
    const { id } = useParams();
    const { getAllAssets, subscribe, unsubscribe } = useMockSocket();
    const initialAsset = useMemo(() => getAllAssets().find(a => a.id === id), [id, getAllAssets]);

    const [asset, setAsset] = useState(initialAsset);
    const [telemetry, setTelemetry] = useState(generateTelemetry(initialAsset));
    const [history] = useState(generateHealthHistory(initialAsset, 30));

    useEffect(() => {
        const subId = subscribe((update) => {
            if (update.id === id) {
                setAsset(prev => ({ ...prev, ...update }));
                setTelemetry(update.telemetry);
            }
        });
        return () => unsubscribe(subId);
    }, [id, subscribe, unsubscribe]);

    if (!asset) return <div className="p-40 text-center bg-[#0B0B0B] text-rail-orange font-headline text-2xl uppercase tracking-widest">Asset Protocol Not Found.</div>;

    const isLoco = asset.type === 'locomotive';

    return (
        <div className="bg-[#0B0B0B] min-h-screen pb-32">
            {/* Tactical Header */}
            <div className="bg-[#111111] border-b border-rail-orange/10 pt-16 pb-20 px-6 lg:px-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #FF6A00 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

                <div className="container mx-auto relative z-10">
                    <Link to="/dashboard" className="text-rail-gray hover:text-rail-orange transition-all text-[10px] font-black uppercase tracking-[0.3em] mb-12 inline-flex items-center group">
                        <svg className="w-3 h-3 mr-3 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Return to Command Center
                    </Link>

                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mt-8">
                        <div>
                            <div className="flex items-center space-x-4 mb-6">
                                <span className="px-4 py-1.5 bg-rail-orange text-black rounded-sm text-[10px] font-black uppercase tracking-[0.2em]">{asset.type}</span>
                                <span className="text-rail-gray font-black uppercase tracking-[0.3em] text-[10px]">PROTOCOL ID: {asset.id}</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-headline font-black text-white tracking-tighter leading-none">
                                {asset.model} <span className="text-rail-orange">DIGITAL TWIN</span>
                            </h1>
                            <p className="text-rail-gray font-bold uppercase tracking-widest text-xs mt-6 opacity-60">
                                Zone: {asset.zone} Sector • Deployment: {new Date(asset.installDate).toLocaleDateString()} • Status: Nominal
                            </p>
                        </div>

                        <div className="flex items-center space-x-10 industrial-glass p-8 rounded-[2.5rem] border border-rail-orange/20 shadow-2xl">
                            <div className="text-right">
                                <p className="text-rail-gray text-[9px] font-black uppercase tracking-[0.3em] mb-2 opacity-60">Aggregate health</p>
                                <p className={`text-5xl font-headline font-black leading-none ${asset.health >= 80 ? 'text-white' : asset.health >= 50 ? 'text-rail-orange' : 'text-rose-500'}`}>{Math.round(asset.health)}%</p>
                            </div>
                            <div className="glow-orange scale-125">
                                <HealthGauge value={asset.health} size={90} strokeWidth={8} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 lg:px-20 -mt-12 grid lg:grid-cols-3 gap-10">
                {/* Live Telemetry Panel */}
                <div className="industrial-glass p-10 rounded-[3rem] border border-white/5 flex flex-col shadow-2xl">
                    <h3 className="text-[10px] font-black text-white mb-10 uppercase tracking-[0.4em] flex items-center">
                        <span className="w-2.5 h-2.5 bg-rail-orange rounded-full mr-3 animate-pulse shadow-[0_0_8px_#FF6A00]"></span>
                        Telemetry stream v1.0
                    </h3>

                    <div className="space-y-6 flex-grow">
                        {[
                            { label: "Core Temperature", value: telemetry?.temperature, unit: "°C", critical: 75 },
                            { label: "Vibration Index", value: telemetry?.vibration, unit: "MM/S", critical: 12, precision: 2 },
                            ...(isLoco ? [{ label: "Velocity Delta", value: telemetry?.speed, unit: "KM/H" }] : [])
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-rail-orange/20 transition-all group">
                                <div className="flex justify-between items-center">
                                    <p className="text-[9px] font-black text-rail-gray uppercase tracking-widest">{item.label}</p>
                                    <div className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${item.value > item.critical ? 'bg-rose-500/10 text-rose-500' : 'bg-rail-orange/10 text-rail-orange'}`}>
                                        {item.value > item.critical ? 'ALERT' : 'NOMINAL'}
                                    </div>
                                </div>
                                <p className="text-4xl font-headline font-black text-white mt-2 tracking-tight group-hover:text-rail-orange transition-colors">
                                    {item.value?.toFixed(item.precision || 1)} <span className="text-xs font-bold text-rail-gray/40 ml-1">{item.unit}</span>
                                </p>
                            </div>
                        ))}

                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center transition-all hover:bg-white/10">
                            <div>
                                <p className="text-[9px] font-black text-rail-gray uppercase tracking-widest mb-1">GPS Coordinates</p>
                                <p className="text-xs font-black text-white uppercase tracking-widest">
                                    {asset.gps.lat.toFixed(4)} N / {asset.gps.lng.toFixed(4)} E
                                </p>
                            </div>
                            <button className="text-[9px] text-rail-orange font-black uppercase tracking-[0.2em] hover:text-white transition-colors border-b border-rail-orange/30">View Node Map</button>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5 text-center">
                        <p className="text-[9px] text-rail-gray/40 uppercase tracking-[0.5em] font-black">Encrypted via RailPulse Secure</p>
                    </div>
                </div>

                {/* Health Trend & Insights */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="industrial-glass p-10 rounded-[3rem] border border-white/5 shadow-2xl">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                            <div>
                                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Health Stability Index</h3>
                                <p className="text-[9px] text-rail-gray font-bold uppercase mt-1">Calculated from 30-day rolling telemetry averages</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-5 py-2 bg-rail-orange text-black text-[9px] font-black rounded-full uppercase tracking-widest">30D History</button>
                                <button className="px-5 py-2 bg-white/5 text-rail-gray text-[9px] font-black rounded-full uppercase tracking-widest hover:bg-white/10 transition-all">90D Archive</button>
                            </div>
                        </div>
                        <div className="h-72">
                            <ChartLine data={history} xKey="date" yKey="health" color="#FF6A00" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="industrial-glass p-10 rounded-[3rem] border border-white/5 flex flex-col justify-center">
                            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-8">Neural Failure Predictor</h3>
                            <div className="space-y-6">
                                <div className="flex items-end justify-between">
                                    <span className="text-[9px] text-rail-gray font-black uppercase tracking-widest">Probability Index</span>
                                    <span className="text-4xl font-headline font-black text-white tracking-tighter">0.024%</span>
                                </div>
                                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-rail-orange h-full w-[2.4%] shadow-[0_0_10px_#FF6A00]"></div>
                                </div>
                                <p className="text-[9px] text-rail-gray font-bold uppercase tracking-widest leading-relaxed opacity-60">
                                    Action Status: <span className="text-emerald-400">Zero Maintenance Required</span><br />
                                    Predicted Lifespan Extension: +14 Months based on current operating delta.
                                </p>
                            </div>
                        </div>

                        <div className="bg-rail-orange p-10 rounded-[3rem] shadow-2xl text-black relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full translate-x-10 -translate-y-10 blur-3xl"></div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4">Marketplace Insights</h3>
                            <p className="text-sm font-bold uppercase tracking-tight mb-8 group-hover:translate-y-1 transition-transform">Insurers and OEMs access this Twin for Real-Time Risk Calibration.</p>
                            <div className="bg-black/5 p-6 rounded-2xl border border-black/10">
                                <p className="text-[9px] font-black uppercase opacity-60 mb-4 tracking-tighter">Current Data Tier: High Fidelity</p>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                                        <span>OEM Connectivity</span>
                                        <span className="text-white bg-black px-2 py-0.5 rounded">Linked</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                                        <span>Risk Evaluation</span>
                                        <span className="text-white bg-black px-2 py-0.5 rounded">Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Asset;
