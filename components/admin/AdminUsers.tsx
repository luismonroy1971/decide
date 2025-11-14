
import React, { useState, useMemo } from 'react';
import { AdminUser } from '../../types';

interface AdminUsersProps {
  users: AdminUser[];
}

const AdminUsers: React.FC<AdminUsersProps> = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.project.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const getStatusChip = (status: AdminUser['status']) => {
    switch (status) {
      case 'Activo':
        return <span className="px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">{status}</span>;
      case 'Inactivo':
        return <span className="px-3 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">{status}</span>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-brand-blue-900 mb-6">Gestión de Usuarios</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
            <input 
                type="text"
                placeholder="Buscar por nombre, email o proyecto..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full md:w-1/3 p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-brand-accent-500 focus:outline-none"
            />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3">Nombre</th>
                <th scope="col" className="px-6 py-3">Proyecto</th>
                <th scope="col" className="px-6 py-3">Fecha de Registro</th>
                <th scope="col" className="px-6 py-3 text-center">Estado</th>
                <th scope="col" className="px-6 py-3"><span className="sr-only">Acciones</span></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="bg-white border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    <div>{user.name}</div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">{user.project}</td>
                  <td className="px-6 py-4">{formatDate(user.registrationDate)}</td>
                  <td className="px-6 py-4 text-center">{getStatusChip(user.status)}</td>
                  <td className="px-6 py-4 text-right">
                      <button className="font-medium text-brand-accent-600 hover:underline">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
