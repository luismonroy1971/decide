
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelectProject }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
      <img src={project.mainImage} alt={project.name} className="w-full h-56 object-cover"/>
      <div className="p-6">
        <h3 className="text-xl font-bold text-brand-blue-900 mb-2">{project.name}</h3>
        <p className="text-slate-500 mb-1">{project.location}</p>
        <p className="text-brand-accent-600 font-semibold mb-4">{project.price}</p>
        <p className="text-slate-600 text-sm mb-6 h-10">{project.description}</p>
        <button 
          onClick={() => onSelectProject(project)}
          className="w-full bg-brand-blue-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand-blue-900 transition-colors"
        >
          Ver Detalles
        </button>
      </div>
    </div>
  );
};


interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, onSelectProject }) => {
  return (
    <section id="projects" className="py-20 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-900">Nuestros Proyectos</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Descubre tu próximo hogar en las mejores ubicaciones de Lima.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} onSelectProject={onSelectProject} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
