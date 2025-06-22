import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-combo-yellow dark:bg-yellow-500 text-center py-24 md:py-32 px-6 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
              <circle id="pattern-circle" cx="20" cy="20" r="2" className="fill-combo-red/40 dark:fill-red-800/40"></circle>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>
      </div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 id="hero" className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-combo-red dark:text-red-700 mb-6 leading-tight">
          Desbloqueie Seu Potencial Bilíngue!
        </h1>
        <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-900 mb-10">
          Aprender Inglês e Francês é mais fácil, rápido e acessível do que você imagina. Aulas dinâmicas de 30 minutos por apenas <strong className="text-combo-red dark:text-red-700 font-bold">R$25</strong>.
        </p>
        <a
          href="#comparacao"
          className="bg-combo-red dark:bg-red-600 text-white dark:text-gray-100 text-lg font-bold py-4 px-12 rounded-full shadow-xl hover:bg-red-700 dark:hover:bg-red-500 transition-all duration-300 transform hover:scale-105 inline-block focus:outline-none focus:ring-4 focus:ring-red-400 dark:focus:ring-red-500"
          aria-label="Descubra como a Línguacombo pode transformar seu aprendizado de idiomas"
        >
          Descubra o Línguacombo!
        </a>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
    </section>
  );
};

export default Hero;