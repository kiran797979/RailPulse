import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StatBlock from '../components/StatBlock';
import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const heroRef = useRef(null);
    const trainRef = useRef(null);
    const tracksRef = useRef(null);
    const revealsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Text Entrance
            gsap.from(".hero-text > *", {
                y: 80,
                opacity: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: "power4.out"
            });

            // Train Motion tied to Scroll
            gsap.to(trainRef.current, {
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
                xPercent: 120,
                ease: "none"
            });

            // Parallax Tracks
            gsap.to(tracksRef.current, {
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                },
                xPercent: -50,
                ease: "none"
            });

            // Section Reveals
            revealsRef.current.forEach((el) => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power3.out"
                });
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !revealsRef.current.includes(el)) {
            revealsRef.current.push(el);
        }
    };

    return (
        <div ref={heroRef} className="bg-[#0B0B0B] min-h-screen">
            {/* Cinematic Hero Section */}
            <section className="relative h-screen flex flex-col justify-center overflow-hidden border-b border-white/5">
                {/* Background Grid */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(rgba(255,106,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,0,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
                </div>

                <div className="container mx-auto px-6 lg:px-20 grid lg:grid-cols-2 items-center gap-12 relative z-20">
                    {/* Left Column: Content */}
                    <div className="hero-text space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rail-orange/10 border border-rail-orange/20 text-rail-orange text-[10px] font-black tracking-widest uppercase">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rail-orange opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-rail-orange"></span>
                            </span>
                            National Infrastructure Protocol
                        </div>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-headline font-black text-white leading-[0.9] tracking-tight">
                            RAIL<span className="text-rail-orange">PULSE</span><br />
                            <span className="text-[0.4em] tracking-[0.2em] font-light text-rail-gray block mt-4">INTELLIGENCE AT SCALE</span>
                        </h1>
                        <p className="max-w-xl text-lg md:text-xl text-rail-gray font-medium leading-relaxed uppercase tracking-wide">
                            Transforming 42,000 Kilometers of raw railway telemetry into cinematic safety insights and algorithmic revenue.
                        </p>
                        <div className="flex flex-wrap gap-6 pt-8">
                            <Link to="/dashboard" className="px-10 py-5 bg-rail-orange text-black font-black rounded-full shadow-2xl shadow-rail-orange/20 hover:bg-white hover:scale-105 transition-all text-sm uppercase tracking-widest glow-orange">
                                Access Demo Dashboard
                            </Link>
                            <Link to="/architecture" className="px-10 py-5 border-2 border-white/10 text-white font-black rounded-full hover:bg-white/5 transition-all text-sm uppercase tracking-widest text-center">
                                System Flow
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Spline 3D Visual */}
                    <div className="relative h-[400px] lg:h-[700px] w-full group">
                        <div className="absolute inset-0 bg-radial-gradient from-rail-orange/5 to-transparent rounded-full blur-3xl group-hover:from-rail-orange/10 transition-all duration-1000"></div>
                        <Suspense fallback={
                            <div className="flex items-center justify-center h-full w-full">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rail-orange"></div>
                            </div>
                        }>
                            <Spline
                                scene="https://prod.spline.design/emQlc4hJJKN71aQ7/scene.splinecode"
                                className="w-full h-full transform scale-110 lg:scale-125"
                            />
                        </Suspense>
                    </div>
                </div>

                {/* Parallax Tracks (Repositioned for background depth) */}
                <div ref={tracksRef} className="absolute bottom-20 left-0 w-[300%] h-1 opacity-20 z-0 bg-gradient-to-r from-transparent via-rail-orange to-transparent"></div>

                {/* Abstract Train Visual (Kept as a subtle kinetic background element) */}
                <div ref={trainRef} className="absolute bottom-16 -left-[20%] w-[350px] lg:w-[500px] z-10 pointer-events-none opacity-30">
                    <div className="relative">
                        <div className="h-10 lg:h-14 bg-gradient-to-r from-[#1A1A1A] to-rail-orange rounded-r-full shadow-[0_0_30px_rgba(255,106,0,0.4)]"></div>
                    </div>
                </div>
            </section>

            {/* Network Statistics Section */}
            <section className="py-32 relative bg-[#0E0E0E] overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-headline font-black text-white mb-4 tracking-tighter">NETWORK COVERAGE</h2>
                            <p className="text-rail-gray font-bold uppercase tracking-widest text-xs max-w-sm">Live monitoring across 5 national operational zones with zero latency.</p>
                        </div>
                        <div className="text-right">
                            <span className="text-6xl md:text-8xl font-headline font-black text-rail-orange block leading-none">99.8%</span>
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">System Uptime SLA</span>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div ref={addToRefs}>
                            <StatBlock
                                label="Monitored Assets"
                                value="212,408"
                                subtext="Active Telemetry Streams"
                                icon="📦"
                                trend="+1.2%"
                            />
                        </div>
                        <div ref={addToRefs}>
                            <StatBlock
                                label="Daily Fleet Velocity"
                                value="84.2 KM/H"
                                subtext="System Average"
                                icon="⚡"
                                trend="+0.4%"
                            />
                        </div>
                        <div ref={addToRefs}>
                            <StatBlock
                                label="Predictive Efficiency"
                                value="₹12.4 CR"
                                subtext="Savings Projected (MTD)"
                                icon="💰"
                                trend="+14.5%"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Pillars */}
            <section className="py-32 bg-[#0B0B0B]">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {[
                            { title: "Deterministic Safety", icon: "🛡️", desc: "Edge-computed vibration analysis prevents structural rail failures before they manifest physically." },
                            { title: "Digital Twins", icon: "💎", desc: "Every locomotive and signal point mirrored in a high-fidelity virtual environment for stress testing." },
                            { title: "Marketplace API", icon: "🔌", desc: "Authenticated third-party access to telemetry for OEMs, logistics, and insurance providers." }
                        ].map((pillar, i) => (
                            <div key={i} ref={addToRefs} className="group cursor-default">
                                <span className="text-4xl mb-6 block group-hover:scale-125 transition-transform origin-left">{pillar.icon}</span>
                                <h3 className="text-2xl font-headline font-black text-white mb-4 tracking-tight group-hover:text-rail-orange transition-colors">{pillar.title}</h3>
                                <p className="text-rail-gray font-medium text-sm leading-relaxed uppercase tracking-wide opacity-80">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-40 bg-rail-orange relative overflow-hidden group">
                <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center">
                    <span className="text-[20vw] font-headline font-black text-black whitespace-nowrap tracking-tighter group-hover:-translate-x-20 transition-transform duration-[2000ms]">RAILPULSE PROTOCOL</span>
                </div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-6xl md:text-8xl font-headline font-black text-black mb-10 tracking-tighter">JOIN THE INFRASTRUCTURE REVOLUTION</h2>
                    <Link to="/dashboard" className="inline-block px-12 py-6 bg-black text-white font-black rounded-full hover:bg-white hover:text-black transition-all text-sm uppercase tracking-widest shadow-2xl">
                        Enter Command Center
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
