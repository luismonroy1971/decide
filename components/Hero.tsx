import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import Icon from './Icon';

interface HeroProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const Hero: React.FC<HeroProps> = ({ projects, onSelectProject }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? projects.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === projects.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (projects.length > 0) {
      const timer = setTimeout(goToNext, 5000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, projects.length]);
  
  if (projects.length === 0) {
    return (
        <section id="hero" className="relative h-screen flex items-center justify-center text-white bg-brand-blue-900">
             <div className="relative z-10 text-center p-4">
                <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-brand-accent-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
             </div>
        </section>
    );
  }

  const currentProject = projects[currentIndex];

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-white">
      {projects.map((project, index) => (
         <div
            key={project.id}
            className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${project.mainImage})` }}
        />
      ))}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
      
      <div className="relative z-10 text-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 drop-shadow-lg animate-fade-in-down">
          {currentProject.name}
        </h1>
        <p className="text-lg md:text-2xl mb-2 drop-shadow-md">{currentProject.location}</p>
        <p className="text-xl md:text-3xl font-semibold mb-8 text-brand-accent-500 drop-shadow-md">{currentProject.price}</p>
        <button
          onClick={() => onSelectProject(currentProject)}
          className="bg-brand-accent-500 text-white font-bold py-3 px-8 rounded-full hover:bg-brand-accent-600 transition-transform hover:scale-105 duration-300 text-lg"
        >
          Quiero saber más
        </button>
      </div>

      <button onClick={goToPrevious} className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 z-20 p-2 bg-white/20 rounded-full hover:bg-white/40 transition">
        <Icon name="ChevronLeft" className="w-8 h-8"/>
      </button>
      <button onClick={goToNext} className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 z-20 p-2 bg-white/20 rounded-full hover:bg-white/40 transition">
        <Icon name="ChevronRight" className="w-8 h-8"/>
      </button>
      
       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {projects.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentIndex ? 'bg-brand-accent-500' : 'bg-white/50'}`}
                />
            ))}
        </div>
    </section>
  );
};

export default Hero;
