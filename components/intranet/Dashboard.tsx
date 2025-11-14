
import React from 'react';
import { User, Payment } from '../../types';
import Icon from '../Icon';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {

  const getNextPayment = (): Payment | null => {
    if (!user.payments) return null;
    const upcoming = user.payments.filter(p => p.status === 'Próximo' || p.status === 'Pendiente');
    if (upcoming.length === 0) return null;
    // Sort by due date to find the soonest
    upcoming.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    return upcoming[0];
  };

  const nextPayment = getNextPayment();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-brand-blue-900 mb-2">¡Bienvenido, {user.profile.name.split(' ')[0]}!</h1>
      <p className="text-lg text-slate-600 mb-8">Este es el resumen de tu propiedad y tus actividades recientes.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Property Info */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-brand-blue-800 mb-4">Tu Propiedad</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <Icon name="Star" className="w-5 h-5 text-brand-accent-500 mr-3" />
              <div>
                <p className="text-sm text-slate-500">Proyecto</p>
                <p className="font-semibold">{user.profile.project}</p>
              </div>
            </div>
             <div className="flex items-center">
              <Icon name="Menu" className="w-5 h-5 text-brand-accent-500 mr-3" />
              <div>
                <p className="text-sm text-slate-500">Unidad</p>
                <p className="font-semibold">{user.profile.unit}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Payment */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-brand-blue-800 mb-4">Próximo Pago</h2>
          {nextPayment ? (
            <div className="space-y-3">
                <div className="flex items-center">
                  <Icon name="DollarSign" className="w-5 h-5 text-brand-accent-500 mr-3" />
                  <div>
                    <p className="text-sm text-slate-500">Concepto</p>
                    <p className="font-semibold">{nextPayment.concept}</p>
                  </div>
                </div>
                 <div className="flex items-center">
                  <Icon name="Check" className="w-5 h-5 text-brand-accent-500 mr-3" />
                  <div>
                    <p className="text-sm text-slate-500">Fecha de Vencimiento</p>
                    <p className="font-semibold">{formatDate(nextPayment.dueDate)}</p>
                  </div>
                </div>
                <div className="pt-2">
                    <p className="text-2xl font-bold text-brand-blue-900">S/ {nextPayment.amount.toLocaleString('es-PE')}</p>
                </div>
            </div>
          ) : (
             <p className="text-slate-600">¡Felicidades! No tienes pagos pendientes.</p>
          )}
        </div>
        
        {/* Quick Actions */}
         <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-brand-blue-800 mb-4">Accesos Rápidos</h2>
            <div className="space-y-3">
                 <a href="#" className="flex items-center text-brand-blue-700 hover:text-brand-accent-600 font-semibold">
                    <Icon name="ChevronRight" className="w-5 h-5 mr-2"/> Ver todos mis pagos
                 </a>
                 <a href="#" className="flex items-center text-brand-blue-700 hover:text-brand-accent-600 font-semibold">
                    <Icon name="ChevronRight" className="w-5 h-5 mr-2"/> Descargar mi contrato
                 </a>
                  <a href="#" className="flex items-center text-brand-blue-700 hover:text-brand-accent-600 font-semibold">
                    <Icon name="ChevronRight" className="w-5 h-5 mr-2"/> Contactar a post-venta
                 </a>
            </div>
         </div>

      </div>
    </div>
  );
};

export default Dashboard;
