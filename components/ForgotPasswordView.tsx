
import React, { useState } from 'react';
import Icon from './Icon';

interface ForgotPasswordViewProps {
  onBack: () => void;
}

const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center animate-fade-in pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-brand-blue-900">
          {isSubmitted ? (
            <div className="text-center">
              <Icon name="Check" className="w-16 h-16 text-green-500 mx-auto mb-4"/>
              <h2 className="text-2xl font-bold mb-2">Correo Enviado</h2>
              <p className="text-slate-600 mb-6">Si existe una cuenta asociada a <strong>{email}</strong>, recibirás un correo con las instrucciones para recuperar tu contraseña.</p>
              <button onClick={onBack} className="w-full bg-brand-blue-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-blue-900 transition-colors">
                Volver al Inicio
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2 text-center">Recuperar Contraseña</h2>
              <p className="text-center text-slate-600 mb-6">Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>
              <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                      <label htmlFor="email-forgot" className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
                      <input 
                        type="email" 
                        id="email-forgot" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-brand-accent-500 focus:outline-none" 
                        required
                      />
                  </div>
                  <button type="submit" className="w-full bg-brand-blue-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-blue-900 transition-colors">
                      Enviar Enlace de Recuperación
                  </button>
                  <p className="text-center text-sm text-slate-500 mt-4">
                      <a href="#" onClick={(e) => {e.preventDefault(); onBack();}} className="font-medium text-brand-accent-600 hover:underline">Volver al inicio</a>
                  </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordView;
