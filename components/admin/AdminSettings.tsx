
import React from 'react';

const AdminSettings: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-brand-blue-900 mb-6">Ajustes Generales</h1>
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
            <h2 className="text-xl font-semibold text-brand-blue-800">Página en Construcción</h2>
            <p className="text-slate-600 mt-2">Esta sección estará disponible próximamente con opciones para configurar la aplicación.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
