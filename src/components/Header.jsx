import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Header = () => {
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Architecture', path: '/architecture' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Analytics', path: '/analytics' },
        { name: 'Monetization', path: '/monetization' },
        { name: 'Pilot', path: '/pilot' },
    ];

    return (
        <header className="sticky top-0 z-50 industrial-glass border-b border-rail-orange/20">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                    <Logo className="scale-75 origin-left" />
                </Link>
                <nav className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-xs font-bold uppercase tracking-widest transition-all hover:text-rail-orange ${location.pathname === link.path ? 'text-rail-orange' : 'text-rail-gray'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center space-x-4">
                    <Link
                        to="/dashboard"
                        className="bg-rail-orange text-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-lg active:scale-95 glow-orange"
                    >
                        Launch Demo
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
