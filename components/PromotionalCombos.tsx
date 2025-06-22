
import React, { useState, useRef, useEffect, useCallback } from 'react';
import ComboPackageCard from './ComboPackageCard';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const trackStartTranslateXRef = useRef(0);
  const currentTranslateXRef = useRef(0);

  const numItems = packagesData.length;

  const applyTransformToCenterCard = useCallback((targetCardIndex: number, smooth: boolean = true) => {
    const track = carouselTrackRef.current;
    const viewport = track?.parentElement; // The div with overflow-hidden

    if (!track || !viewport || !track.children || track.children.length === 0) return;

    const validTargetIndex = Math.max(0, Math.min(targetCardIndex, numItems - 1));
    const targetCardSlot = track.children[validTargetIndex] as HTMLElement;
    if (!targetCardSlot) return;

    const viewportWidth = viewport.clientWidth;
    const cardWidth = targetCardSlot.offsetWidth;
    const cardOffsetLeft = targetCardSlot.offsetLeft;

    let desiredTranslateXToCenter = -(cardOffsetLeft - (viewportWidth / 2 - cardWidth / 2));

    const trackScrollWidth = track.scrollWidth;
    let finalTranslateX: number;

    if (trackScrollWidth <= viewportWidth) {
      // Content is smaller than or fits viewport. Center the whole track.
      finalTranslateX = (viewportWidth - trackScrollWidth) / 2;
    } else {
      // Content is larger, apply scrolling with boundaries
      const minNegativeScroll = -(trackScrollWidth - viewportWidth); // Max scroll left
      finalTranslateX = Math.max(minNegativeScroll, Math.min(0, desiredTranslateXToCenter)); // Clamp between 0 and max scroll left
    }
    
    if (smooth) {
      track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    } else {
      track.style.transition = 'none';
    }
    track.style.transform = `translateX(${finalTranslateX}px)`;
    currentTranslateXRef.current = finalTranslateX;
  }, [numItems]);


  useEffect(() => {
    applyTransformToCenterCard(currentIndex, true);
  }, [currentIndex, applyTransformToCenterCard]);

  useEffect(() => {
    const track = carouselTrackRef.current;
    if (!track) return;

    const handleResize = () => {
        applyTransformToCenterCard(currentIndex, false); 
    };

    window.addEventListener('resize', handleResize);
    // Initial call after component mounts and refs are set
    const timeoutId = setTimeout(() => applyTransformToCenterCard(currentIndex, false), 0);


    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentIndex, applyTransformToCenterCard]); 


  const handleDragStart = (event: Event) => {
    if (!(event instanceof MouseEvent || event instanceof TouchEvent)) return;
    const e = event;

    if (!carouselTrackRef.current) return;
    isDraggingRef.current = true;
    dragStartXRef.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
    trackStartTranslateXRef.current = currentTranslateXRef.current;
    if (carouselTrackRef.current) {
        carouselTrackRef.current.style.transition = 'none';
        carouselTrackRef.current.style.cursor = 'grabbing';
    }
    document.body.style.userSelect = 'none'; // Prevent text selection during drag
  };

  const handleDragMove = (event: Event) => {
    if (!isDraggingRef.current || !carouselTrackRef.current) return;

    if (!(event instanceof MouseEvent || event instanceof TouchEvent)) return;
    const e = event;
    
    // Prevent page scroll on touch devices when dragging horizontally
    if (e instanceof TouchEvent && e.cancelable) {
        e.preventDefault();
    }


    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = currentX - dragStartXRef.current;
    let newTranslateX = trackStartTranslateXRef.current + deltaX;

    const track = carouselTrackRef.current;
    const viewport = track.parentElement; // The overflow-hidden div
    if (track && viewport) {
        const trackScrollWidth = track.scrollWidth;
        const viewportWidth = viewport.clientWidth;
        
        const maxPositiveTranslate = 0; 
        let minNegativeTranslate = -(trackScrollWidth - viewportWidth);

        if (trackScrollWidth <= viewportWidth) {
             const centeredPosition = (viewportWidth - trackScrollWidth) / 2;
             // Allow slight drag around center for smaller content
             newTranslateX = Math.max(centeredPosition - 30, Math.min(centeredPosition + 30, newTranslateX)); 
        } else {
            // Allow slight overscroll (rubber band effect)
            newTranslateX = Math.max(minNegativeTranslate - 50, Math.min(maxPositiveTranslate + 50, newTranslateX));
        }
        track.style.transform = `translateX(${newTranslateX}px)`;
        currentTranslateXRef.current = newTranslateX;
    }
  };

  const handleDragEnd = (_event: Event) => {
    if (!isDraggingRef.current || !carouselTrackRef.current) return;
    isDraggingRef.current = false;
    if (carouselTrackRef.current) {
        carouselTrackRef.current.style.cursor = 'grab';
    }
    document.body.style.userSelect = '';

    const track = carouselTrackRef.current;
    const viewport = track.parentElement;
    let finalTranslateX = currentTranslateXRef.current;

    if (track && viewport) {
        const trackScrollWidth = track.scrollWidth;
        const viewportWidth = viewport.clientWidth;
        const maxPositiveTranslate = 0;
        let minNegativeTranslate = -(trackScrollWidth - viewportWidth);
        
        if (trackScrollWidth <= viewportWidth) {
            finalTranslateX = (viewportWidth - trackScrollWidth) / 2; // Snap to center
        } else {
            // Snap to bounds if overscrolled
            finalTranslateX = Math.max(minNegativeTranslate, Math.min(maxPositiveTranslate, finalTranslateX));
        }

        track.style.transition = 'transform 0.3s ease-out';
        track.style.transform = `translateX(${finalTranslateX}px)`;
        currentTranslateXRef.current = finalTranslateX;
    }
  };

  useEffect(() => {
    const track = carouselTrackRef.current;
    if (track) {
      // Use non-passive for touchmove to allow preventDefault
      const touchMoveOptions: AddEventListenerOptions = { passive: false };

      track.addEventListener('mousedown', handleDragStart);
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('mouseleave', handleDragEnd); // End drag if mouse leaves window

      track.addEventListener('touchstart', handleDragStart, { passive: true });
      track.addEventListener('touchmove', handleDragMove, touchMoveOptions);
      track.addEventListener('touchend', handleDragEnd);
      track.addEventListener('touchcancel', handleDragEnd);

      return () => {
        track.removeEventListener('mousedown', handleDragStart);
        window.removeEventListener('mousemove', handleDragMove);
        window.removeEventListener('mouseup',handleDragEnd);
        window.removeEventListener('mouseleave', handleDragEnd);

        track.removeEventListener('touchstart', handleDragStart, { passive: true });
        track.removeEventListener('touchmove', handleDragMove, touchMoveOptions);
        track.removeEventListener('touchend', handleDragEnd);
        track.removeEventListener('touchcancel', handleDragEnd);
      };
    }
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount


  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(numItems - 1, prev + 1));
  };


  return (
    <section className="py-20 md:py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <h2 id="pacotes" className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-4">
          Turbine Seu Aprendizado com Nossos <span className="text-combo-red dark:text-red-500">Pacotes Campeões</span>!
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-16 max-w-3xl mx-auto">
          Invista no seu futuro com nossos pacotes de aulas. Mais aulas, mais economia, e a mesma qualidade Línguacombo que você confia!
        </p>
      </div>
      
      <div className="container mx-auto px-0 sm:px-6 relative group"> {/* Added group for button visibility on hover */}
        <div 
          className="overflow-hidden cursor-grab active:cursor-grabbing relative"
        > 
          {/* Left Fade */}
          <div className="absolute inset-y-0 left-0 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" aria-hidden="true"></div>
          {/* Right Fade */}
          <div className="absolute inset-y-0 right-0 w-12 sm:w-16 md:w-20 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" aria-hidden="true"></div>

          <div
            ref={carouselTrackRef}
            className="flex gap-6 md:gap-8 py-8 px-3 sm:px-0" // px-3 ensures cards near edges are not cut off by fade initially
            style={{ touchAction: 'pan-y' }} // Allows vertical scroll while capturing horizontal pan
          >
            {packagesData.map((pkg, index) => (
              <div
                key={index}
                className="min-w-[280px] w-[calc(80%-1.5rem)] sm:min-w-[300px] sm:w-[330px] md:w-[360px] lg:w-[380px] flex-shrink-0 flex"
                role="group"
                aria-roledescription="slide"
                aria-label={`Pacote ${index + 1} de ${packagesData.length}: ${pkg.name}`}
                style={{ userSelect: 'none', WebkitUserDrag: 'none' } as React.CSSProperties & { WebkitUserDrag: string }}
              >
                <ComboPackageCard {...pkg} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons - visible on group hover or focus */}
        {numItems > 1 && (
        <>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute left-1 sm:left-2 md:left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-combo-red/80 dark:bg-red-700/80 hover:bg-combo-red/100 dark:hover:bg-red-700/100 text-combo-yellow dark:text-yellow-300 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus-within:opacity-100 focus:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Pacote anterior"
          >
            <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === numItems - 1}
            className="absolute right-1 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-combo-red/80 dark:bg-red-700/80 hover:bg-combo-red/100 dark:hover:bg-red-700/100 text-combo-yellow dark:text-yellow-300 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus-within:opacity-100 focus:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Próximo pacote"
          >
            <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
        )}
      </div>
      
      <div className="container mx-auto px-6">
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-10">
            Todos os pacotes podem ser utilizados para aulas de Inglês ou Francês. Aulas de 30 minutos.
        </p>
      </div>
    </section>
  );
};

export default PromotionalCombos;
