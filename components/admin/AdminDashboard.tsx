
import React from 'react';
import { AdminNotification } from '../../types';
import Icon from '../Icon';

interface AdminDashboardProps {
  usersCount: number;
  projectsCount: number;
  notifications: AdminNotification[];
}

const StatCard: React.FC<{ title: string; value: string | number; icon: string }> = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
    <div className="p-3 bg-brand-accent-500/10 rounded-full mr-4">
        <Icon name={icon} className="w-7 h-7 text-brand-accent-600"/>
    </div>
    <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-brand-blue-900">{value}</p>
    </div>
  </div>
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ usersCount, projectsCount, notifications }) => {
    
    const unreadNotifications = notifications.filter(n => !n.isRead).length;
    const recentNotifications = [...notifications]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 4);

    const getNotificationIcon = (type: AdminNotification['type']) => {
        switch(type) {
            case 'Nuevo Mensaje': return 'Menu';
            case 'Pago Recibido': return 'DollarSign';
            case 'Nuevo Usuario': return 'User';
            default: return 'Bell';
        }
    }

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-brand-blue-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total de Clientes" value={usersCount} icon="Users" />
        <StatCard title="Proyectos Activos" value={projectsCount} icon="Home" />
        <StatCard title="Notificaciones Pendientes" value={unreadNotifications} icon="Bell" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
         <h2 className="text-xl font-bold text-brand-blue-800 mb-4">Actividad Reciente</h2>
         <ul className="space-y-4">
            {recentNotifications.map(notification => (
                <li key={notification.id} className={`p-4 border-l-4 rounded-r-lg flex items-center ${notification.isRead ? 'border-slate-200 bg-slate-50' : 'border-brand-accent-500 bg-amber-50'}`}>
                   <Icon name={getNotificationIcon(notification.type)} className="w-6 h-6 text-brand-blue-700 mr-4 flex-shrink-0" />
                   <div className="flex-grow">
                        <p className="font-medium text-slate-800">{notification.content}</p>
                        <p className="text-sm text-slate-500">{new Date(notification.date).toLocaleString('es-ES')}</p>
                   </div>
                   {!notification.isRead && (
                       <div className="w-2.5 h-2.5 bg-brand-accent-500 rounded-full ml-4 flex-shrink-0" title="No leído"></div>
                   )}
                </li>
            ))}
         </ul>
      </div>

    </div>
  );
};

export default AdminDashboard;
