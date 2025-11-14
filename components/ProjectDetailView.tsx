import React, { useState } from 'react';
import { Project, Advisor } from '../types';
import Icon from './Icon';
import ContactSection from './ContactSection';

interface ProjectDetailViewProps {
  project: Project;
  onBack: () => void;
  advisors: Advisor[];
}

const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ project, onBack, advisors }) => {
  const [mainImage, setMainImage] = useState(project.gallery[0]);

  return (
    <div className="bg-white animate-fade-in pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={onBack} className="flex items-center text-brand-blue-800 font-semibold mb-8 hover:text-brand-accent-600 transition-colors">
            <Icon name="ChevronLeft" className="w-5 h-5 mr-2" />
            Volver a todos los proyectos
        </button>
        
        <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-blue-900">{project.name}</h1>
            <p className="text-xl text-slate-500 mt-2">{project.location}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Gallery */}
            <div className="lg:col-span-3">
                <div className="mb-4">
                    <img src={mainImage} alt="Main project view" className="w-full h-auto object-cover rounded-lg shadow-lg aspect-[4/3]"/>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {project.gallery.map((img, index) => (
                        <button key={index} onClick={() => setMainImage(img)}>
                            <img src={img} alt={`Thumbnail ${index + 1}`} className={`w-full h-auto object-cover rounded-md cursor-pointer aspect-square ${mainImage === img ? 'ring-4 ring-brand-accent-500' : 'opacity-70 hover:opacity-100'}`}/>
                        </button>
                    ))}
                </div>
            </div>

            {/* Project Info */}
            <div className="lg:col-span-2">
                <div className="bg-slate-50 p-8 rounded-lg">
                    <h2 className="text-2xl font-bold text-brand-blue-800 mb-4">Detalles del Proyecto</h2>
                    <p className="text-slate-600 mb-6">{project.longDescription}</p>

                    <div className="border-t border-slate-200 pt-6">
                        <h3 className="text-xl font-semibold text-brand-blue-800 mb-4">Beneficios Clave</h3>
                        <ul className="space-y-3">
                            {project.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start">
                                    <Icon name="Check" className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1"/>
                                    <span className="text-slate-700">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div className="mt-8">
                        <p className="text-3xl font-bold text-brand-blue-900">{project.price}</p>
                        <p className="text-slate-500">Consulta por nuestros planes de financiamiento.</p>
                     </div>
                </div>
            </div>
        </div>
      </div>
      <ContactSection advisors={advisors}/>
    </div>
  );
};

export default ProjectDetailView;
