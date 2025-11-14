
import React from 'react';
import { User } from '../../types';

interface ProfileProps {
  profile: User['profile'];
  email: string;
}

const ProfileField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-sm text-slate-500">{label}</p>
    <p className="text-lg font-semibold text-slate-800">{value}</p>
  </div>
);

const Profile: React.FC<ProfileProps> = ({ profile, email }) => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-brand-blue-900 mb-6">Mi Perfil</h1>
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <ProfileField label="Nombre Completo" value={profile.name} />
          <ProfileField label="DNI" value={profile.dni || 'N/A'} />
          <ProfileField label="Teléfono de Contacto" value={profile.phone || 'N/A'} />
          <ProfileField label="Correo Electrónico" value={email} />
          
          {profile.project && (
            <div className="md:col-span-2 mt-4 border-t pt-6">
              <h2 className="text-xl font-bold text-brand-blue-800 mb-4">Datos de la Propiedad</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <ProfileField label="Proyecto Inmobiliario" value={profile.project} />
                  <ProfileField label="Unidad" value={profile.unit || 'N/A'} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
