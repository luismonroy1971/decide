
import React, { useState } from 'react';
import { Advisor } from '../types';
import { generatePersonalizedMessage } from '../services/geminiService';
import Icon from './Icon';

interface ContactSectionProps {
  advisors: Advisor[];
}

const ContactSection: React.FC<ContactSectionProps> = ({ advisors }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [project, setProject] = useState('');
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleGenerateMessage = async () => {
    if (!name || !project) {
        alert('Por favor, ingresa tu nombre y el proyecto de interés para generar un mensaje.');
        return;
    }
    setIsGenerating(true);
    const interest = "los precios, planos y disponibilidad"; // Default interest
    const generatedMsg = await generatePersonalizedMessage(project, name, interest);
    setMessage(generatedMsg);
    setIsGenerating(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
        setFormStatus('success');
    }, 1500);
  }

  return (
    <section id="contact" className="py-20 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-900">Contáctanos</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">"Si tienes dudas, te ayudamos". Nuestro equipo de expertos está listo para asesorarte.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-brand-blue-800 mb-6">Nuestros Asesores</h3>
            <div className="space-y-6">
              {advisors.map(advisor => (
                <div key={advisor.id} className="flex items-center bg-white p-4 rounded-lg shadow">
                  <img src={advisor.imageUrl} alt={advisor.name} className="w-16 h-16 rounded-full object-cover mr-4"/>
                  <div>
                    <h4 className="font-bold text-lg text-brand-blue-900">{advisor.name}</h4>
                    <p className="text-slate-500">{advisor.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            {formStatus === 'success' ? (
                <div className="text-center py-10">
                    <Icon name="Check" className="w-16 h-16 text-green-500 mx-auto mb-4"/>
                    <h3 className="text-2xl font-bold text-brand-blue-900">¡Mensaje enviado!</h3>
                    <p className="text-slate-600 mt-2">Gracias por contactarnos. Un asesor se comunicará contigo a la brevedad.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h3 className="text-2xl font-bold text-brand-blue-800 mb-6">Pide una cotización</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input type="text" placeholder="Nombre Completo" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-brand-accent-500 focus:outline-none" required/>
                        <input type="email" placeholder="Correo Electrónico" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-brand-accent-500 focus:outline-none" required/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input type="tel" placeholder="Teléfono" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-brand-accent-500 focus:outline-none" required/>
                        <input type="text" placeholder="Proyecto de Interés" value={project} onChange={e => setProject(e.target.value)} className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-brand-accent-500 focus:outline-none"/>
                    </div>
                    <div className="mb-4">
                        <textarea placeholder="Mensaje" rows={4} value={message} onChange={e => setMessage(e.target.value)} className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-brand-accent-500 focus:outline-none" required></textarea>
                    </div>
                    <div className="mb-4">
                        <button type="button" onClick={handleGenerateMessage} disabled={isGenerating} className="w-full flex justify-center items-center gap-2 p-3 border-2 border-brand-accent-500 text-brand-accent-600 font-semibold rounded-md hover:bg-brand-accent-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                             <Icon name="Sparkles" className="w-5 h-5"/>
                            {isGenerating ? 'Generando...' : 'Generar mensaje con IA'}
                        </button>
                    </div>
                    <button type="submit" disabled={formStatus === 'submitting'} className="w-full bg-brand-blue-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-blue-900 transition-colors disabled:bg-slate-400">
                      {formStatus === 'submitting' ? 'Enviando...' : 'Enviar y Cotizar'}
                    </button>
                </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
