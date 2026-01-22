import React from 'react';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="bg-[#0B0B0B] text-rail-gray py-16 px-6 border-t border-rail-orange/10">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center bg-[#111111] p-10 rounded-[2rem] border border-rail-orange/5 shadow-2xl">
                    <div className="mb-8 md:mb-0">
                        <div className="flex items-center space-x-2 mb-6">
                            <Logo className="scale-90 origin-left" />
                        </div>
                        <p className="max-w-xs text-xs leading-relaxed font-medium uppercase tracking-wider text-rail-gray/60">
                            Advancing national infrastructure through massive-scale telemetry and predictive intelligence.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-12 text-xs">
                        <div>
                            <h4 className="text-rail-orange font-black uppercase tracking-widest mb-6">Platform</h4>
                            <ul className="space-y-3 font-bold uppercase tracking-widest">
                                <li><a href="#" className="hover:text-white transition-colors">Safety Hub</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Digital Twins</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Data Economy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-rail-orange font-black uppercase tracking-widest mb-6">Security</h4>
                            <ul className="space-y-3 font-bold uppercase tracking-widest">
                                <li><a href="#" className="hover:text-white transition-colors">Air-Gapped</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Auth 2.0</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Encryption</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-bold tracking-[0.2em] text-rail-gray/40">
                    <p>© 2026 RailPulse National IoT Platform. All telemetry encrypted.</p>
                    <div className="flex space-x-8 mt-6 md:mt-0">
                        <a href="#" className="hover:text-rail-orange transition-colors">Privacy</a>
                        <a href="#" className="hover:text-rail-orange transition-colors">Terms</a>
                        <a href="#" className="hover:text-rail-orange transition-colors">API Docs</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
