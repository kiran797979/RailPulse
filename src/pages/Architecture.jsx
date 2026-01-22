import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Architecture = () => {
    const containerRef = useRef(null);

    const layers = [
        { title: "Asset Layer", desc: "Sensors on locomotives, signals, and bridges.", tech: "IoT Edge Hubs", icon: "📡" },
        { title: "Edge Processing", desc: "Local telemetry normalization and filtering.", tech: "NVIDIA Jetson", icon: "⚙️" },
        { title: "Normalization", desc: "Standardizing heterogeneous sensor data formats.", tech: "Kafka / Spark", icon: "🏗️" },
        { title: "Digital Twins", desc: "Virtual representation of every physical asset.", tech: "Three.js / React", icon: "💎" },
        { title: "Analytics Engine", desc: "Predictive AI for failure and risk scoring.", tech: "TensorFlow", icon: "🧠" },
        { title: "API Layer", desc: "Secure, authenticated data access for partners.", tech: "GraphQL / OAuth2", icon: "🔌" },
        { title: "Marketplace", desc: "Monetized insights for OEMs and Insurers.", tech: "Stripe Connect", icon: "💰" }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Layer animations
            gsap.utils.toArray(".arch-layer").forEach((layer, i) => {
                gsap.from(layer, {
                    scrollTrigger: {
                        trigger: layer,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: 100,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power3.out"
                });
            });

            // Connection line pulse
            gsap.to(".connection-line", {
                opacity: 0.2,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#0B0B0B] py-32 px-6 overflow-hidden">
            <div className="container mx-auto max-w-5xl arch-container">
                <div className="text-center mb-32 arch-intro">
                    <div className="inline-block px-4 py-1 rounded-full bg-rail-orange/10 border border-rail-orange/20 text-rail-orange text-[10px] font-black tracking-[0.3em] uppercase mb-8">
                        System Schematic v4.0.2
                    </div>
                    <h1 className="text-6xl md:text-8xl font-headline font-black text-white mb-8 tracking-tighter">DATA PIPELINE</h1>
                    <p className="text-lg text-rail-gray max-w-2xl mx-auto font-medium uppercase tracking-wider leading-relaxed">
                        A deterministic multi-layered stack transforming physical vibrations into national-scale safety intelligence.
                    </p>

                    <div className="mt-16 industrial-glass p-6 rounded-2xl border border-rail-orange/20 inline-flex items-center space-x-4 text-rail-orange text-[10px] font-black uppercase tracking-widest animate-pulse">
                        <span className="w-3 h-3 bg-rail-orange rounded-full shadow-[0_0_10px_#FF6A00]"></span>
                        <span>SECURITY PROTOCOL: Control systems remain air-gapped. This pipeline is read-only telemetry.</span>
                    </div>
                </div>

                <div className="relative">
                    {/* Central Pulsing Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-rail-orange/30 connection-line z-0 shadow-[0_0_15px_rgba(255,106,0,0.3)]"></div>

                    <div className="space-y-40 relative z-10">
                        {layers.map((layer, index) => (
                            <div key={index} className={`arch-layer flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                <div className={`w-1/2 p-4 flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`industrial-glass p-10 rounded-[2.5rem] border border-white/5 hover:border-rail-orange/40 transition-all group cursor-default max-w-md ${index % 2 === 0 ? 'mr-12 text-right' : 'ml-12 text-left'}`}>
                                        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform origin-center inline-block">{layer.icon}</div>
                                        <h3 className="text-3xl font-headline font-black text-white mb-3 tracking-tight group-hover:text-rail-orange transition-colors">{layer.title}</h3>
                                        <p className="text-rail-gray font-medium text-xs mb-6 leading-relaxed uppercase tracking-widest">{layer.desc}</p>
                                        <span className="px-4 py-2 bg-rail-orange/10 text-rail-orange text-[9px] font-black rounded-lg uppercase tracking-[0.2em] border border-rail-orange/20">{layer.tech}</span>
                                    </div>
                                </div>
                                {/* Tactical Node on the line */}
                                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full bg-[#0B0B0B] border-2 border-rail-orange shadow-[0_0_10px_#FF6A00] z-20"></div>
                                    <div className="absolute w-12 h-12 bg-rail-orange/20 rounded-full animate-ping opacity-20"></div>
                                </div>
                                <div className="w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-48 text-center">
                    <div className="inline-block p-10 industrial-glass border border-white/5 rounded-[3rem]">
                        <p className="text-rail-gray font-black text-xs uppercase tracking-[0.4em] mb-10 italic">Core Processing Latency: &lt; 140ms</p>
                        <button className="px-12 py-5 bg-rail-orange text-black font-black rounded-full hover:bg-white transition-all text-xs uppercase tracking-widest glow-orange">
                            Inspect Protocol Logic
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Architecture;
