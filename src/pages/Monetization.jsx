import React, { useState, useEffect } from 'react';
import { useMockSocket } from '../components/MockSocket';
import pricingData from '../data/pricing.json';

const Monetization = () => {
    const { subscribe, unsubscribe } = useMockSocket();
    const [eventCount, setEventCount] = useState(0);
    const [simulatedRevenue, setSimulatedRevenue] = useState(0);

    useEffect(() => {
        const subId = subscribe(() => {
            setEventCount(prev => prev + 1);
            // Simulate ₹15 profit per event (representative of value generated)
            setSimulatedRevenue(prev => prev + 15.5);
        });
        return () => unsubscribe(subId);
    }, [subscribe, unsubscribe]);

    return (
        <div className="bg-[#0B0B0B] min-h-screen p-6 lg:p-20 pb-32">
            <div className="container mx-auto">
                <div className="text-center mb-24">
                    <div className="inline-block px-3 py-1 bg-rail-orange text-black rounded-sm text-[9px] font-black uppercase tracking-[0.2em] mb-6">
                        MARKET PROTOCOL v1.4
                    </div>
                    <h1 className="text-6xl md:text-8xl font-headline font-black text-white mb-6 tracking-tighter">DATA ECONOMY</h1>
                    <p className="text-lg text-rail-gray max-w-2xl mx-auto font-medium uppercase tracking-wider leading-relaxed">
                        Transforming 42,000 KM of safety telemetry into a high-yield algorithmic asset for the national infrastructure.
                    </p>
                </div>

                {/* Live Revenue Simulator */}
                <div className="industrial-glass p-12 rounded-[3.5rem] border border-rail-orange/20 shadow-2xl mb-24 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-rail-orange/10 rounded-full blur-3xl -mr-40 -mt-40 group-hover:scale-110 transition-transform"></div>
                    <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-16">
                        <div>
                            <div className="inline-flex items-center space-x-3 bg-rail-orange/10 border border-rail-orange/20 text-rail-orange px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 glow-orange">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rail-orange opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rail-orange"></span>
                                </span>
                                <span>Real-Time Yield Simulator</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-headline font-black text-white mb-6 tracking-tighter leading-none">REVENUE<br /><span className="text-rail-orange">NORMALIZATION</span></h2>
                            <p className="text-rail-gray font-bold uppercase tracking-widest text-xs max-w-sm leading-relaxed opacity-60">Estimation of cumulative value normalization across all authenticated API sessions.</p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-16 md:gap-24 w-full xl:w-auto">
                            <div className="space-y-4">
                                <p className="text-rail-gray/40 text-[9px] font-black uppercase tracking-[0.3em]">Network Events [SYNCED]</p>
                                <p className="text-6xl md:text-8xl font-headline font-black text-white tracking-tighter">{eventCount.toLocaleString()}</p>
                                <p className="text-[10px] text-rail-orange uppercase font-black tracking-widest">INGESTION_DELTA</p>
                            </div>
                            <div className="space-y-4">
                                <p className="text-rail-gray/40 text-[9px] font-black uppercase tracking-[0.3em]">Cumulative Yield [INR]</p>
                                <p className="text-6xl md:text-8xl font-headline font-black text-rail-orange tracking-tighter">₹{simulatedRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                                <p className="text-[10px] text-white uppercase font-black tracking-widest">REALIZED_VALUE_COEF</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Buyer Personas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {pricingData.map((item, index) => (
                        <div key={index} className="industrial-glass p-10 rounded-[2.5rem] border border-white/5 hover:border-rail-orange/40 transition-all group flex flex-col shadow-2xl hover:-translate-y-2">
                            <div className="mb-10">
                                <h3 className="text-2xl font-headline font-black text-white mb-3 tracking-tight group-hover:text-rail-orange transition-colors">{item.persona.toUpperCase()}</h3>
                                <p className="text-[10px] text-rail-gray font-bold uppercase tracking-widest leading-relaxed mb-10 h-12 overflow-hidden opacity-60">{item.description}</p>
                                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                    <p className="text-3xl font-headline font-black text-white tracking-tighter">{item.pricing}</p>
                                    <p className="text-[9px] text-rail-gray/40 font-black uppercase tracking-widest mt-2">Protocol Access Base</p>
                                </div>
                            </div>
                            <div className="mt-auto pt-8 border-t border-white/5">
                                <h4 className="text-[9px] font-black text-rail-gray uppercase tracking-[0.3em] mb-6 opacity-40">System Capabilities</h4>
                                <ul className="space-y-4">
                                    {item.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start text-[10px] text-white font-black uppercase tracking-widest">
                                            <span className="text-rail-orange mr-3 mt-0.5 opacity-80">»</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Closing Thought */}
                <div className="mt-32 text-center">
                    <div className="inline-block p-1 bg-white/5 rounded-2xl border border-white/5 mb-12">
                        <div className="flex bg-[#1A1A1A] rounded-xl overflow-hidden shadow-2xl">
                            <button className="px-8 py-4 bg-rail-orange text-black font-black text-[10px] uppercase tracking-[0.2em] shadow-lg">Subscription Mode</button>
                            <button className="px-8 py-4 text-rail-gray font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 transition-all">API Pay-per-node</button>
                        </div>
                    </div>
                    <p className="text-rail-gray font-bold text-xs max-w-lg mx-auto italic uppercase tracking-[0.2em] opacity-40 leading-relaxed">
                        "Sustainable infrastructure requires sovereign data ecosystems to fund the next 100 years of deterministic safety."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Monetization;
