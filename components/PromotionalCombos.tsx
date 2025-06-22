import React, { useRef } from 'react';
import ComboPackageCard from './ComboPackageCard';

const packagesData = [
  {
    name: "Passaporte Inicial",
    lessons: 5,
    originalPrice: 125,
    promoPrice: 119,
    savings: 6,
    pricePerLesson: 23.80,
    highlightColor: 'combo-yellow',
  },
  {
    name: "Imersão Inteligente",
    lessons: 10,
    originalPrice: 250,
    promoPrice: 225,
    savings: 25,
    pricePerLesson: 22.50,
    isPopular: true,
    highlightColor: 'combo-red',
  },
  {
    name: "Fluência Programada",
    lessons: 25,
    originalPrice: 625,
    promoPrice: 530,
    savings: 95,
    pricePerLesson: 21.20,
    highlightColor: 'combo-yellow',
  },
  {
    name: "Domínio Total",
    lessons: 50,
    originalPrice: 1250,
    promoPrice: 1000,
    savings: 250,
    pricePerLesson: 20.00,
    isBestValue: true,
    highlightColor: 'combo-red',
  },
];

const PromotionalCombos: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8; // Scroll by 80% of visible width
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="pacotes" className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-4">
          Turbine Seu Aprendizado com Nossos <span className="text-combo-red">Pacotes Campeões</span>!
        </h2>
        <p className="text-center text-gray-600 text-lg md:text-xl mb-16 max-w-3xl mx-auto">
          Invista no seu futuro com nossos pacotes de aulas. Mais aulas, mais economia, e a mesma qualidade Línguacombo que você confia!
        </p>
        
        <div className="relative">
          <div 
            ref={carouselRef} 
            className="flex overflow-x-auto snap-x snap-mandatory space-x-6 md:space-x-8 pb-8 scroll-smooth scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hides scrollbar for Firefox and IE/Edge
          >
            {packagesData.map((pkg, index) => (
              <div key={index} className="min-w-[300px] sm:min-w-[340px] md:min-w-[360px] snap-center">
                <ComboPackageCard {...pkg} />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 transform -translate-x-4 md:-translate-x-6 bg-combo-red text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label="Pacote Anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-4 md:translate-x-6 bg-combo-red text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label="Próximo Pacote"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <p className="text-center text-gray-500 text-sm mt-10">
            Todos os pacotes podem ser utilizados para aulas de Inglês ou Francês. Aulas de 30 minutos.
        </p>
      </div>
    </section>
  );
};

export default PromotionalCombos;