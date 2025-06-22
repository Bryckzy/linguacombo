import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="bg-combo-yellow text-center py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {/* Decorative elements - can be expanded */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
              <circle id="pattern-circle" cx="20" cy="20" r="2" fill="rgba(218, 41, 28, 0.5)"></circle>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>
      </div>
      <div className="relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-combo-red mb-4 leading-tight">
          Seu Combo de Idiomas Chegou!
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Aprenda Inglês e Francês com aulas dinâmicas e divertidas de 30 minutos por apenas <strong className="text-combo-red">R$25</strong>.
        </p>
        <a
          href="#combos"
          className="bg-combo-red text-white text-lg font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300 transform hover:scale-105 inline-block"
        >
          Quero meu Combo de Idiomas!
        </a>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  );
};

export default Hero;