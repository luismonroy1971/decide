import React from 'react';
import { Document } from '../../types';
import Icon from '../Icon';

interface DocumentsProps {
  documents: Document[];
}

const Documents: React.FC<DocumentsProps> = ({ documents }) => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-brand-blue-900 mb-6">Mis Documentos</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <ul className="space-y-4">
          {documents.map((doc) => (
            <li key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
              <div className="flex items-center">
                 <Icon name="Check" className="w-6 h-6 text-brand-accent-500 mr-4"/>
                 <span className="font-medium text-slate-800">{doc.name}</span>
              </div>
              <a 
                href={doc.url} 
                download 
                className="inline-flex items-center px-4 py-2 text-sm font-semibold text-brand-blue-800 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
              >
                Descargar
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Documents;
