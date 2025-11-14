
import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img src="https://picsum.photos/seed/about-us/800/600" alt="Nuestro Equipo" className="rounded-lg shadow-2xl"/>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-900 mb-6">Quiénes Somos</h2>
            <p className="text-lg text-slate-600 mb-4">
              En Decide Inmobiliaria, no solo construimos propiedades, creamos hogares y comunidades. 
              Somos un equipo apasionado por el desarrollo urbano responsable y comprometido con la excelencia en cada detalle.
            </p>
            <p className="text-slate-600 mb-6">
              Nuestra misión es transmitir profesionalismo y confianza desde el primer contacto, 
              acompañándote paso a paso en una de las decisiones más importantes de tu vida.
            </p>
            <div className="mt-8">
                <h3 className="text-xl font-semibold text-brand-blue-800 mb-4">Nuestros Compromisos</h3>
                <ul className="space-y-3">
                    <li className="flex items-start">
                        <span className="text-brand-accent-500 font-bold mr-3">✓</span>
                        <span><strong>Calidad Certificada:</strong> Proyectos con los más altos estándares de construcción y seguridad.</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-brand-accent-500 font-bold mr-3">✓</span>
                        <span><strong>Sostenibilidad Ambiental:</strong> Implementamos prácticas eco-amigables para un futuro más verde.</span>
                    </li>
                    <li className="flex items-start">
                         <span className="text-brand-accent-500 font-bold mr-3">✓</span>
                        <span><strong>Compromiso Social:</strong> Generamos un impacto positivo en las comunidades donde operamos.</span>
                    </li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
