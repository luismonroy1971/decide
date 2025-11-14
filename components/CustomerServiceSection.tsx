import React, { useState } from 'react';

interface CustomerServiceSectionProps {
  onForgotPassword: () => void;
  onLogin: (email: string, pass: string) => void;
  error: string | null;
}

const CustomerServiceSection: React.FC<CustomerServiceSectionProps> = ({ onForgotPassword, onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };
  
  return (
    <section id="customer-service" className="py-20 bg-brand-blue-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Atención al Cliente y Post Venta</h2>
            <p className="text-lg text-slate-300 mb-6">
              Nuestra relación contigo no termina con la entrega de tu depa. Accede a tu intranet de cliente para realizar seguimiento de pagos, consultar preguntas frecuentes y disfrutar de beneficios exclusivos.
            </p>
            <ul className="space-y-2 text-slate-200">
                <li className="flex items-center"><span className="text-brand-accent-500 mr-2">✓</span> Seguimiento de pagos</li>
                <li className="flex items-center"><span className="text-brand-accent-500 mr-2">✓</span> Preguntas frecuentes</li>
                <li className="flex items-center"><span className="text-brand-accent-500 mr-2">✓</span> Insignias por pagos puntuales</li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-brand-blue-900">
            <h3 className="text-2xl font-bold mb-6 text-center">Acceso a Intranet</h3>
            <form onSubmit={handleSubmit}>
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-brand-accent-500 focus:outline-none" 
                      required
                    />
                </div>
                 <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
                    <input 
                      type="password" 
                      id="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-brand-accent-500 focus:outline-none" 
                      required
                    />
                </div>
                <button type="submit" className="w-full bg-brand-blue-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-blue-900 transition-colors">
                    Ingresar
                </button>
                 <p className="text-center text-sm text-slate-500 mt-4">
                    ¿Olvidaste tu contraseña? <a href="#" onClick={(e) => {e.preventDefault(); onForgotPassword();}} className="font-medium text-brand-accent-600 hover:underline">Recupérala aquí</a>.
                </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerServiceSection;
