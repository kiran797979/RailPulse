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
        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            // Pulse animation (Global)
            gsap.to(".connection-line", {
                opacity: 0.2,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            mm.add("(min-width: 768px)", () => {
                // Desktop: Alternating X-axis Reveals
                gsap.utils.toArray(".arch-layer").forEach((layer, i) => {
                    const isLeft = i % 2 === 0;
                    gsap.from(layer.querySelector(".arch-content"), {
                        scrollTrigger: {
                            trigger: layer,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        },
                        x: isLeft ? -100 : 100,
                        opacity: 0,
                        duration: 1,
                        ease: "power3.out"
                    });
                });
            });

            mm.add("(max-width: 767px)", () => {
                // Mobile: Simple Vertical Fade Up
                gsap.utils.toArray(".arch-layer").forEach((layer) => {
                    gsap.from(layer.querySelector(".arch-content"), {
                        scrollTrigger: {
                            trigger: layer,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        },
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out"
                    });
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#0B0B0B] py-20 md:py-32 px-4 md:px-6 overflow-hidden">
            <div className="container mx-auto max-w-5xl arch-container">
                <div className="text-center mb-20 md:mb-32 arch-intro">
                    <div className="inline-block px-4 py-1 rounded-full bg-rail-orange/10 border border-rail-orange/20 text-rail-orange text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase mb-6 md:mb-8">
                        System Schematic v4.0.2
                    </div>
                    <h1 className="text-5xl md:text-8xl font-headline font-black text-white mb-6 md:mb-8 tracking-tighter">DATA PIPELINE</h1>
                    <p className="text-base md:text-lg text-rail-gray max-w-2xl mx-auto font-medium uppercase tracking-wider leading-relaxed opacity-80 md:opacity-100">
                        A deterministic multi-layered stack transforming physical vibrations into national-scale safety intelligence.
                    </p>

                    <div className="mt-12 md:mt-16 industrial-glass p-4 md:p-6 rounded-2xl border border-rail-orange/20 inline-flex items-center space-x-4 text-rail-orange text-[9px] md:text-[10px] font-black uppercase tracking-widest animate-pulse">
                        <span className="w-2 md:w-3 h-2 md:h-3 bg-rail-orange rounded-full shadow-[0_0_10px_#FF6A00] shrink-0"></span>
                        <span className="text-left">SECURITY PROTOCOL: Control systems remain air-gapped. Pipeline is read-only.</span>
                    </div>
                </div>

                <div className="relative">
                    {/* Central Pulsing Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-rail-orange/30 connection-line z-0 shadow-[0_0_15px_rgba(255,106,0,0.3)]"></div>

                    <div className="space-y-24 md:space-y-40 relative z-10">
                        {layers.map((layer, index) => (
                            <div key={index} className={`arch-layer flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center relative`}>
                                <div className={`w-full md:w-1/2 p-2 md:p-4 flex md:justify-end justify-center`}>
                                    <div className={`arch-content industrial-glass p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 hover:border-rail-orange/40 transition-all group cursor-default max-w-sm md:max-w-md text-center ${index % 2 === 0 ? 'md:mr-12 md:text-right' : 'md:ml-12 md:text-left'}`}>
                                        <div className="text-4xl md:text-5xl mb-4 md:mb-6 group-hover:scale-110 transition-transform origin-center inline-block">{layer.icon}</div>
                                        <h3 className="text-2xl md:text-3xl font-headline font-black text-white mb-2 md:mb-3 tracking-tight group-hover:text-rail-orange transition-colors uppercase">{layer.title}</h3>
                                        <p className="text-rail-gray font-medium text-[10px] md:text-xs mb-4 md:mb-6 leading-relaxed uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">{layer.desc}</p>
                                        <span className="px-3 md:px-4 py-1.5 md:py-2 bg-rail-orange/10 text-rail-orange text-[8px] md:text-[9px] font-black rounded-lg uppercase tracking-[0.2em] border border-rail-orange/20">{layer.tech}</span>
                                    </div>
                                </div>
                                {/* Tactical Node on the line */}
                                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center top-1/2 -translate-y-1/2 md:translate-y-0 md:top-auto">
                                    <div className="w-3 md:w-4 h-3 md:h-4 rounded-full bg-[#0B0B0B] border-2 border-rail-orange shadow-[0_0_10px_#FF6A00] z-20"></div>
                                    <div className="absolute w-8 md:w-12 h-8 md:h-12 bg-rail-orange/20 rounded-full animate-ping opacity-20"></div>
                                </div>
                                <div className="hidden md:block md:w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-32 md:mt-48 text-center px-4">
                    <div className="inline-block p-8 md:p-10 industrial-glass border border-white/5 rounded-[2rem] md:rounded-[3rem] w-full md:w-auto">
                        <p className="text-rail-gray font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-8 md:mb-10 italic">Core Processing Latency: &lt; 140ms</p>
                        <button className="px-8 md:px-12 py-4 md:py-5 bg-rail-orange text-black font-black rounded-full hover:bg-white transition-all text-[10px] md:text-xs uppercase tracking-widest glow-orange w-full md:w-auto">
                            Inspect Protocol Logic
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Architecture;
