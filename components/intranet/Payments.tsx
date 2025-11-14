import React from 'react';
import { Payment } from '../../types';

interface PaymentsProps {
  payments: Payment[];
}

const Payments: React.FC<PaymentsProps> = ({ payments }) => {
    
  const getStatusChip = (status: Payment['status']) => {
    switch (status) {
      case 'Pagado':
        return <span className="px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">{status}</span>;
      case 'Pendiente':
        return <span className="px-3 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">{status}</span>;
      case 'Próximo':
        return <span className="px-3 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">{status}</span>;
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-brand-blue-900 mb-6">Historial de Pagos</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3">Concepto</th>
                <th scope="col" className="px-6 py-3">Vencimiento</th>
                <th scope="col" className="px-6 py-3 text-right">Monto (S/)</th>
                <th scope="col" className="px-6 py-3 text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="bg-white border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{payment.concept}</td>
                  <td className="px-6 py-4">{formatDate(payment.dueDate)}</td>
                  <td className="px-6 py-4 text-right font-mono">{payment.amount.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4 text-center">{getStatusChip(payment.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;
