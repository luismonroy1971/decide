
import React from 'react';
import { View } from '../types';
import Icon from './Icon';

interface FooterProps {
    onNavigate: (view: View, anchor?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLegalNavClick = (e: React.MouseEvent<HTMLAnchorElement>, view: Extract<View, 'complaintsBook' | 'termsAndConditions' | 'privacyPolicy'>) => {
      e.preventDefault();
      onNavigate(view);
  };

  const handleSectionLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      onNavigate('home', href);
  };

  return (
    <footer className="bg-brand-blue-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DECIDE</h3>
            <p className="text-slate-300">Construimos hogares, creamos futuros. Confianza y profesionalismo en cada proyecto.</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li><a href="#projects" onClick={(e) => handleSectionLinkClick(e, '#projects')} className="text-slate-300 hover:text-brand-accent-500 transition-colors">Proyectos</a></li>
              <li><a href="#about" onClick={(e) => handleSectionLinkClick(e, '#about')} className="text-slate-300 hover:text-brand-accent-500 transition-colors">Quiénes Somos</a></li>
              <li><a href="#contact" onClick={(e) => handleSectionLinkClick(e, '#contact')} className="text-slate-300 hover:text-brand-accent-500 transition-colors">Contacto</a></li>
              <li><a href="#blog" onClick={(e) => handleSectionLinkClick(e, '#blog')} className="text-slate-300 hover:text-brand-accent-500 transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
                <li><a href="#" onClick={(e) => handleLegalNavClick(e, 'complaintsBook')} className="text-slate-300 hover:text-brand-accent-500 transition-colors">Libro de Reclamaciones</a></li>
                <li><a href="#" onClick={(e) => handleLegalNavClick(e, 'termsAndConditions')} className="text-slate-300 hover:text-brand-accent-500 transition-colors">Términos y Condiciones</a></li>
                <li><a href="#" onClick={(e) => handleLegalNavClick(e, 'privacyPolicy')} className="text-slate-300 hover:text-brand-accent-500 transition-colors">Política de Privacidad</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/decideinmobiliaria.pe" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-300 hover:text-brand-accent-500 transition-colors">
                <Icon name="Facebook" className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/decideinmobiliaria.pe/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-300 hover:text-brand-accent-500 transition-colors">
                <Icon name="Instagram" className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/decide-mkt-97837332a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-300 hover:text-brand-accent-500 transition-colors">
                <Icon name="LinkedIn" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-700 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Decide Inmobiliaria. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
