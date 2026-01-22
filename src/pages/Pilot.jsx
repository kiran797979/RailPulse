import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import StatBlock from '../components/StatBlock';

const Pilot = () => {
    const [progress, setProgress] = useState(0);
    const [isSimulating, setIsSimulating] = useState(false);
    const progressBarRef = useRef(null);
    const cardsRef = useRef([]);

    const phases = [
        { title: "Phase 1: Foundation", period: "M1", focus: "IoT Hub Deployment", items: ["Northern Zone rollout", "1,000 core assets", "Cloud normalization sync"] },
        { title: "Phase 2: Scale-up", period: "M2", focus: "Digital Twin Sync", items: ["Eastern & Southern Zones", "10,000 assets", "Live OEM API trials"] },
        { title: "Phase 3: Optimization", period: "M3", focus: "Predictive Rollout", items: ["Total Network (200k+ assets)", "Insurtech marketplace launch", "Automated safety triggers"] }
    ];

    const simulateProgress = () => {
        if (isSimulating) return;
        setIsSimulating(true);

        const tl = gsap.timeline({
            onUpdate: () => setProgress(Math.floor(tl.progress() * 100)),
            onComplete: () => setIsSimulating(false)
        });

        tl.to(progressBarRef.current, {
            width: "100%",
            duration: 4,
            ease: "power2.inOut"
        });

        cardsRef.current.forEach((card, i) => {
            tl.to(card, {
                borderColor: "rgba(255, 106, 0, 0.4)",
                backgroundColor: "rgba(255, 106, 0, 0.05)",
                duration: 0.8,
                ease: "power2.out"
            }, (i + 1) * 1.2);
        });
    };

    return (
        <div className="bg-[#0B0B0B] min-h-screen p-6 lg:p-20 pb-40">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-20">
                    <div className="inline-block px-3 py-1 bg-rail-orange text-black rounded-sm text-[9px] font-black uppercase tracking-[0.2em] mb-6">
                        DEPLOYMENT PROTOCOL v9.0
                    </div>
                    <h1 className="text-6xl md:text-8xl font-headline font-black text-white mb-6 tracking-tighter">PILOT ROADMAP</h1>
                    <p className="text-lg text-rail-gray max-w-2xl mx-auto font-medium uppercase tracking-wider leading-relaxed">
                        A deterministic 90-day execution framework designed to prove national-scale infrastructure value.
                    </p>
                </div>

                {/* Progress Overview */}
                <div className="industrial-glass p-12 rounded-[3.5rem] border border-white/5 shadow-2xl mb-24 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-rail-orange/5 rounded-full blur-3xl -mr-40 -mt-40"></div>

                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 relative z-10">
                        <div>
                            <p className="text-[9px] font-black text-rail-gray uppercase tracking-[0.4em] mb-4">Implementation Index</p>
                            <h2 className="text-7xl md:text-8xl font-headline font-black text-white leading-none tracking-tighter">{progress}% <span className="text-rail-orange">SYNCED</span></h2>
                        </div>
                        <button
                            onClick={simulateProgress}
                            disabled={isSimulating}
                            className={`px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-2xl group active:scale-95 ${isSimulating ? 'bg-white/5 text-rail-gray/40 cursor-not-allowed' : 'bg-rail-orange text-black hover:bg-white glow-orange'
                                }`}
                        >
                            {isSimulating ? 'SIMULATION IN PROGRESS' : 'INITIATE DEPLOYMENT SIM'}
                        </button>
                    </div>

                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5 relative">
                        <div
                            ref={progressBarRef}
                            className="bg-rail-orange h-full w-[0%] shadow-[0_0_15px_#FF6A00]"
                        ></div>
                    </div>

                    <div className="grid grid-cols-3 gap-10 mt-12 relative z-10">
                        {['Q1 BASELINE', 'Q2 SCALE', 'Q3 PROTOCOL'].map((step, i) => (
                            <div key={i} className="text-center">
                                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${progress >= (i + 1) * 33 ? 'text-rail-orange' : 'text-rail-gray/30'}`}>{step}</p>
                                <div className={`w-3.5 h-3.5 rounded-full mx-auto relative ${progress >= (i + 1) * 33 ? 'bg-rail-orange shadow-[0_0_10px_#FF6A00]' : 'bg-white/5'}`}>
                                    {progress >= (i + 1) * 33 && <div className="absolute inset-0 bg-rail-orange rounded-full animate-ping opacity-20"></div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {phases.map((phase, i) => (
                        <div
                            key={i}
                            ref={el => cardsRef.current[i] = el}
                            className="industrial-glass p-10 rounded-[2.5rem] border border-white/5 shadow-2xl transition-all hover:border-rail-orange/30 group"
                        >
                            <div className="flex justify-between items-start mb-10">
                                <span className="text-[10px] font-black text-rail-orange uppercase tracking-[0.3em] bg-rail-orange/10 px-4 py-1.5 rounded-lg border border-rail-orange/20">{phase.period}</span>
                                <span className="text-4xl font-headline font-black text-white/5 group-hover:text-rail-orange/20 transition-colors">0{i + 1}</span>
                            </div>
                            <h3 className="text-2xl font-headline font-black text-white mb-3 tracking-tight group-hover:text-rail-orange transition-colors">{phase.title.toUpperCase()}</h3>
                            <p className="text-[9px] font-black text-rail-gray uppercase tracking-[0.3em] mb-10 opacity-60 leading-relaxed">{phase.focus}</p>
                            <ul className="space-y-5 border-t border-white/5 pt-8">
                                {phase.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start text-[10px] text-white font-black uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                                        <span className="text-rail-orange mr-3">»</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Pilot KPIs */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-10">
                    <StatBlock label="ASSETS ONBOARDED" value={progress === 100 ? "212,408" : "1,200"} icon="📦" />
                    <StatBlock label="ANOMALIES RESOLVED" value={progress === 100 ? "4,821" : "42"} icon="✅" />
                    <StatBlock label="OEM LOI INDEX" value={progress === 100 ? "14" : "2"} icon="📝" />
                </div>

                {progress === 100 && (
                    <div className="mt-32 bg-rail-orange p-20 rounded-[4rem] text-black text-center shadow-2xl animate-in fade-in zoom-in duration-700 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        <h3 className="text-6xl md:text-7xl font-headline font-black mb-6 tracking-tighter">PROTOCOL SUCCESS VERIFIED</h3>
                        <p className="text-sm font-black uppercase tracking-widest max-w-2xl mx-auto mb-12 opacity-80 leading-relaxed">
                            Deployment finalized ahead of schedule. National rollout readiness index: <span className="underlineDecoration">OPTIMAL</span>. Projected ARR adjusted to ₹120Cr+.
                        </p>
                        <button className="px-14 py-6 bg-black text-white font-black rounded-full hover:scale-105 transition-all text-sm uppercase tracking-[0.3em] shadow-2xl">
                            Download Deployment Report
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pilot;
