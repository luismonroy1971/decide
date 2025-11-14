
import React, { useState } from 'react';
import { User } from '../../types';
import Icon from '../Icon';
import Dashboard from './Dashboard';
import Payments from './Payments';
import Documents from './Documents';
import Profile from './Profile';

interface IntranetViewProps {
  user: User;
}

type IntranetPage = 'dashboard' | 'payments' | 'documents' | 'profile';

const IntranetView: React.FC<IntranetViewProps> = ({ user }) => {
  const [activePage, setActivePage] = useState<IntranetPage>('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'payments':
        return <Payments payments={user.payments || []} />;
      case 'documents':
        return <Documents documents={user.documents || []} />;
      case 'profile':
        // FIX: Pass the user's email to the Profile component as required.
        return <Profile profile={user.profile} email={user.email} />;
      default:
        return <Dashboard user={user} />;
    }
  };
  
  const NavItem: React.FC<{page: IntranetPage, label: string, icon: string}> = ({ page, label, icon }) => (
      <li>
        <button 
            onClick={() => setActivePage(page)}
            className={`w-full flex items-center px-4 py-3 text-left transition-colors duration-200 rounded-md ${activePage === page ? 'bg-brand-accent-500 text-white' : 'text-slate-300 hover:bg-brand-blue-700'}`}
        >
            <Icon name={icon} className="w-5 h-5 mr-4" />
            <span className="font-medium">{label}</span>
        </button>
    </li>
  );

  return (
    <div className="flex min-h-screen bg-slate-100">
       <div className="w-64 bg-brand-blue-800 text-white flex flex-col fixed top-0 left-0 h-full pt-20">
            <div className="p-4 border-b border-brand-blue-700/50">
                <h2 className="text-xl font-bold">Portal del Cliente</h2>
            </div>
            <nav className="flex-grow p-4">
                <ul className="space-y-2">
                   <NavItem page="dashboard" label="Dashboard" icon="Home" />
                   <NavItem page="payments" label="Mis Pagos" icon="DollarSign" />
                   <NavItem page="documents" label="Documentos" icon="Document" />
                   <NavItem page="profile" label="Mi Perfil" icon="User" />
                </ul>
            </nav>
        </div>
      <main className="flex-1 ml-64 p-6 sm:p-8 lg:p-10 mt-20">
        {renderPage()}
      </main>
    </div>
  );
};

export default IntranetView;