
import React from 'react';
import { Benefit } from '../types';
import Icon from './Icon';

interface BenefitsSectionProps {
  benefits: Benefit[];
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ benefits }) => {
  return (
    <section id="benefits" className="py-20 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-900">Beneficios de ser parte de Decide</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Más que una inmobiliaria, somos tu aliado para alcanzar tus sueños.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map(benefit => (
            <div key={benefit.id} className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300">
              <div className="inline-block p-4 bg-brand-accent-500/10 rounded-full mb-4">
                <Icon name={benefit.icon} className="w-8 h-8 text-brand-accent-600"/>
              </div>
              <h3 className="text-xl font-bold text-brand-blue-800 mb-2">{benefit.title}</h3>
              <p className="text-slate-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
