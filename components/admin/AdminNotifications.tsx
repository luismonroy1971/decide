
import React from 'react';
import { AdminNotification } from '../../types';
import Icon from '../Icon';

interface AdminNotificationsProps {
  notifications: AdminNotification[];
}

const AdminNotifications: React.FC<AdminNotificationsProps> = ({ notifications }) => {

    const sortedNotifications = [...notifications]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
      <h1 className="text-3xl md:text-4xl font-bold text-brand-blue-900 mb-6">Centro de Notificaciones</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <ul className="space-y-4">
            {sortedNotifications.map(notification => (
                <li key={notification.id} className={`p-4 border-l-4 rounded-r-lg flex items-center ${notification.isRead ? 'border-slate-200 bg-slate-50' : 'border-brand-accent-500 bg-amber-50'}`}>
                   <Icon name={getNotificationIcon(notification.type)} className="w-6 h-6 text-brand-blue-700 mr-4 flex-shrink-0" />
                   <div className="flex-grow">
                        <p className="font-medium text-slate-800">{notification.content}</p>
                        <p className="text-sm text-slate-500">{new Date(notification.date).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })}</p>
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

export default AdminNotifications;
