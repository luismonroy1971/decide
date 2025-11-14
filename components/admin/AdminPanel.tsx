
import React, { useState } from 'react';
import { User, AdminUser, AdminNotification } from '../../types';
import Icon from '../Icon';
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import AdminNotifications from './AdminNotifications';
import AdminSettings from './AdminSettings';

interface AdminPanelProps {
  user: User;
  onLogout: () => void;
  onNavigateHome: () => void;
  users: AdminUser[];
  notifications: AdminNotification[];
  projectsCount: number;
}

type AdminPage = 'dashboard' | 'users' | 'notifications' | 'settings';

const AdminPanel: React.FC<AdminPanelProps> = (props) => {
  const [activePage, setActivePage] = useState<AdminPage>('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <AdminDashboard usersCount={props.users.length} projectsCount={props.projectsCount} notifications={props.notifications} />;
      case 'users':
        return <AdminUsers users={props.users} />;
      case 'notifications':
        return <AdminNotifications notifications={props.notifications} />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard usersCount={props.users.length} projectsCount={props.projectsCount} notifications={props.notifications} />;
    }
  };

  const NavItem: React.FC<{page: AdminPage, label: string, icon: string}> = ({ page, label, icon }) => (
      <li>
        <button 
            onClick={() => setActivePage(page)}
            className={`w-full flex items-center px-4 py-3 text-left transition-colors duration-200 rounded-lg ${activePage === page ? 'bg-brand-accent-500 text-white shadow-md' : 'text-slate-300 hover:bg-brand-blue-700/50'}`}
        >
            <Icon name={icon} className="w-5 h-5 mr-4" />
            <span className="font-semibold">{label}</span>
        </button>
    </li>
  );

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="w-64 bg-brand-blue-900 text-white flex flex-col fixed h-full shadow-lg">
        <div className="p-4 border-b border-brand-blue-700/50 flex items-center justify-center">
            <h2 className="text-2xl font-bold text-white tracking-wider">DECIDE</h2>
            <span className="ml-2 px-2 py-0.5 bg-brand-accent-500 text-white text-xs font-bold rounded">ADMIN</span>
        </div>
        <nav className="flex-grow p-4">
            <ul className="space-y-2">
               <NavItem page="dashboard" label="Dashboard" icon="Home" />
               <NavItem page="users" label="Usuarios" icon="Users" />
               <NavItem page="notifications" label="Notificaciones" icon="Bell" />
               <NavItem page="settings" label="Ajustes" icon="Cog" />
            </ul>
        </nav>
        <div className="p-4 border-t border-brand-blue-700/50">
             <button onClick={props.onNavigateHome} className="w-full flex items-center px-4 py-3 text-left text-slate-300 hover:bg-brand-blue-700/50 rounded-lg mb-2">
                <Icon name="Menu" className="w-5 h-5 mr-4" />
                <span className="font-semibold">Ver Página Principal</span>
            </button>
            <button onClick={props.onLogout} className="w-full flex items-center px-4 py-3 text-left text-slate-300 hover:bg-brand-blue-700/50 rounded-lg">
                <Icon name="SignOut" className="w-5 h-5 mr-4" />
                <span className="font-semibold">Cerrar Sesión</span>
            </button>
        </div>
      </aside>
      <div className="flex-1 ml-64 flex flex-col">
         <header className="bg-white shadow-sm p-4 flex justify-end items-center sticky top-0 z-40">
            <div className="flex items-center">
                <span className="text-slate-600 font-medium mr-3">Hola, {props.user.profile.name}</span>
                <div className="w-10 h-10 rounded-full bg-brand-blue-800 flex items-center justify-center text-white font-bold">
                    {props.user.profile.name.charAt(0)}
                </div>
            </div>
         </header>
         <main className="flex-1 p-6 sm:p-8 lg:p-10">
            {renderPage()}
         </main>
      </div>
    </div>
  );
};

export default AdminPanel;
