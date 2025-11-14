
import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import { View } from '../types';

interface HeaderProps {
    onNavigate: (view: View, anchor?: string) => void;
    isLoggedIn: boolean;
    onLogout: () => void;
    currentView: View;
    whatsappLink?: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, isLoggedIn, onLogout, currentView, whatsappLink }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Inicio', href: '#hero' },
        { name: 'Proyectos', href: '#projects' },
        { name: 'Quiénes Somos', href: '#about' },
        { name: 'Beneficios', href: '#benefits' },
        { name: 'Blog', href: '#blog' },
        { name: 'Contacto', href: '#contact' },
    ];

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        onNavigate('home', href);
    };


    const navClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isLoggedIn ? 'bg-white shadow-md' : 'bg-transparent'}`;
    const logoClass = `text-2xl font-bold ${isScrolled || isLoggedIn ? 'text-brand-blue-900' : 'text-white'}`;
    const linkClass = `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isScrolled || isLoggedIn ? 'text-brand-blue-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`;

    return (
        <header className={navClass}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className={logoClass}>
                            DECIDE
                        </a>
                    </div>
                    
                    {!isLoggedIn && (
                        <>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {navLinks.map(link => (
                                        <a key={link.name} href={link.href} onClick={(e) => handleLinkClick(e, link.href)} className={linkClass}>
                                            {link.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden md:flex items-center space-x-4">
                                <a href={whatsappLink || 'https://wa.me/51987654321'} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors">
                                    <Icon name="WhatsApp" className="w-5 h-5"/>
                                    <span>Escríbenos</span>
                                </a>
                            </div>
                        </>
                    )}

                    {isLoggedIn && (
                         <div className="hidden md:flex items-center space-x-4">
                            <button onClick={onLogout} className="bg-brand-accent-500 text-white font-bold py-2 px-6 rounded-full hover:bg-brand-accent-600 transition-colors">
                                Salir
                            </button>
                        </div>
                    )}

                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} type="button" className={`inline-flex items-center justify-center p-2 rounded-md ${isScrolled || isLoggedIn ? 'text-brand-blue-800' : 'text-white'} hover:text-white hover:bg-brand-blue-700/50 focus:outline-none`}>
                           <Icon name={isOpen ? 'X' : 'Menu'} className="h-6 w-6"/>
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    {isLoggedIn ? (
                        <div className="pt-4 pb-3 border-t border-slate-200">
                             <div className="flex items-center px-5">
                                <button onClick={onLogout} className="w-full bg-brand-accent-500 text-white font-bold py-2 px-4 rounded-full hover:bg-brand-accent-600 transition-colors">
                                    Salir
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navLinks.map(link => (
                                    <a key={link.name} href={link.href} onClick={(e) => { setIsOpen(false); handleLinkClick(e, link.href); }} className="text-brand-blue-700 hover:bg-slate-100 block px-3 py-2 rounded-md text-base font-medium">
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                            <div className="pt-4 pb-3 border-t border-slate-200">
                                <div className="flex items-center px-5">
                                    <a href={whatsappLink || 'https://wa.me/51987654321'} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors">
                                        <Icon name="WhatsApp" className="w-5 h-5"/>
                                        <span>Escríbenos al WhatsApp</span>
                                    </a>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
