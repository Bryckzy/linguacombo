
import React, { useState, useRef, useEffect } from 'react';
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

const PrevIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
const NextIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const PromotionalCombos: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(packagesData.length - 1, prev + 1));
  };

  const applyTransform = () => {
    const track = carouselTrackRef.current;
    if (!track || !track.children || track.children.length === 0) return;

    const targetCardSlot = track.children[currentIndex] as HTMLElement;
    if (targetCardSlot) {
      const offset = targetCardSlot.offsetLeft;
      // Center the card slot. Calculate offset to the center of the viewport.
      // Viewport width - card width / 2 - card.offsetLeft
      // For simplicity, we are aligning to the start of the viewport, minus any initial padding of the container.
      // The px-6 on the container might affect this if not accounted for.
      // However, the current logic aligns the card's left edge to the track's left edge.
      track.style.transform = `translateX(-${offset}px)`;
    }
  };

  useEffect(() => {
    applyTransform();
  }, [currentIndex]);

  useEffect(() => {
    const recalculateOnResize = () => {
      const track = carouselTrackRef.current;
      if (!track) return;
      
      const originalTransition = track.style.transition;
      track.style.transition = 'none'; // Disable transition during resize adjustment
      
      applyTransform(); // Re-apply transform based on new dimensions
      
      // Restore transition after the browser has had a chance to apply the new transform
      requestAnimationFrame(() => {
        if (track) {
          // Use the computed style to get the full transition property defined by classes
          const computedStyle = window.getComputedStyle(track);
          const computedTransition = computedStyle.transition;

          // If computedTransition is 'all 0s ease 0s' (or similar, meaning no specific transition on transform), 
          // or if originalTransition was specifically set via JS and needs to be restored.
          // Fallback to a default if nothing sensible is found.
          if (computedTransition && computedTransition.includes('transform')) {
            track.style.transition = computedTransition;
          } else {
             track.style.transition = originalTransition || 'transform 0.7s ease-in-out';
          }
        }
      });
    };

    window.addEventListener('resize', recalculateOnResize);
    recalculateOnResize(); // Initial calculation on mount

    return () => window.removeEventListener('resize', recalculateOnResize);
  }, [currentIndex]); // Rerun if currentIndex changes for initial render with correct index

  return (
    <section id="pacotes" className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-4">
          Turbine Seu Aprendizado com Nossos <span className="text-combo-red">Pacotes Campeões</span>!
        </h2>
        <p className="text-center text-gray-600 text-lg md:text-xl mb-16 max-w-3xl mx-auto">
          Invista no seu futuro com nossos pacotes de aulas. Mais aulas, mais economia, e a mesma qualidade Línguacombo que você confia!
        </p>
      </div>
      
      <div className="container mx-auto px-6 relative"> {/* Wrapper for viewport and buttons */}
        <div className="overflow-hidden"> {/* Viewport */}
          <div
            ref={carouselTrackRef}
            className="flex gap-6 md:gap-8 transition-transform duration-700 ease-in-out py-8" // Increased duration
            // py-8 for vertical spacing around cards
          >
            {packagesData.map((pkg, index) => (
              <div
                key={index}
                className="w-[300px] sm:w-[330px] md:w-[360px] lg:w-[380px] flex-shrink-0 flex" // Card slot
                role="group"
                aria-roledescription="slide"
                aria-label={`Pacote ${index + 1} de ${packagesData.length}: ${pkg.name}`}
              >
                <ComboPackageCard {...pkg} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 
                     bg-combo-red text-white p-2.5 md:p-3 rounded-full shadow-lg 
                     hover:bg-red-700 transition-all z-20 
                     focus:outline-none focus:ring-2 focus:ring-red-400 
                     disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Pacote Anterior"
        >
          <PrevIcon />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === packagesData.length - 1}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 
                     bg-combo-red text-white p-2.5 md:p-3 rounded-full shadow-lg 
                     hover:bg-red-700 transition-all z-20 
                     focus:outline-none focus:ring-2 focus:ring-red-400 
                     disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Próximo Pacote"
        >
          <NextIcon />
        </button>
      </div>
      
      <div className="container mx-auto px-6">
        <p className="text-center text-gray-500 text-sm mt-10">
            Todos os pacotes podem ser utilizados para aulas de Inglês ou Francês. Aulas de 30 minutos.
        </p>
      </div>
    </section>
  );
};

export default PromotionalCombos;
