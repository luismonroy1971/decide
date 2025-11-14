
import React from 'react';
import Icon from './Icon';

interface LegalViewProps {
  title: string;
  content: string;
  onBack: () => void;
}

const LegalView: React.FC<LegalViewProps> = ({ title, content, onBack }) => {
  return (
    <div className="bg-white animate-fade-in pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center text-brand-blue-800 font-semibold mb-8 hover:text-brand-accent-600 transition-colors">
            <Icon name="ChevronLeft" className="w-5 h-5 mr-2" />
            Volver al inicio
        </button>
        
        <div className="max-w-4xl mx-auto bg-slate-50 p-8 rounded-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-blue-900 mb-8 border-b pb-4">{title}</h1>
            <div 
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>

      </div>
    </div>
  );
};

export default LegalView;
