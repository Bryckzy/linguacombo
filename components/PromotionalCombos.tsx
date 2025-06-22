
import React, { useState, useRef, useEffect, useCallback } from 'react';
import ComboPackageCard from './ComboPackageCard';
// Chevron icons are no longer imported as buttons are removed.

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
  // currentIndex state is removed
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const trackStartTranslateXRef = useRef(0);
  const currentTranslateXRef = useRef(0);

  const numItems = packagesData.length;

  const applyTransformToCenterCard = useCallback((targetCardIndex: number, smooth: boolean = true) => {
    const track = carouselTrackRef.current;
    const viewport = track?.parentElement; 

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
      finalTranslateX = (viewportWidth - trackScrollWidth) / 2;
    } else {
      const minNegativeScroll = -(trackScrollWidth - viewportWidth); 
      finalTranslateX = Math.max(minNegativeScroll, Math.min(0, desiredTranslateXToCenter)); 
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
    const track = carouselTrackRef.current;
    if (!track) return;

    const setInitialPosition = () => {
        if (carouselTrackRef.current && carouselTrackRef.current.children.length > 0) {
            // Attempt to center the first card or position track at the start.
            applyTransformToCenterCard(0, false);
        } else if (carouselTrackRef.current) { 
            carouselTrackRef.current.style.transform = `translateX(0px)`;
            currentTranslateXRef.current = 0;
        }
    };

    const handleResize = () => {
        setInitialPosition();
    };

    window.addEventListener('resize', handleResize);
    const timeoutId = setTimeout(setInitialPosition, 0);


    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [applyTransformToCenterCard]); 


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
    document.body.style.userSelect = 'none'; 
  };

  const handleDragMove = (event: Event) => {
    if (!isDraggingRef.current || !carouselTrackRef.current) return;

    if (!(event instanceof MouseEvent || event instanceof TouchEvent)) return;
    const e = event;
    
    if (e instanceof TouchEvent && e.cancelable) {
        e.preventDefault();
    }

    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = currentX - dragStartXRef.current;
    let newTranslateX = trackStartTranslateXRef.current + deltaX;

    const track = carouselTrackRef.current;
    const viewport = track.parentElement; 
    if (track && viewport) {
        const trackScrollWidth = track.scrollWidth;
        const viewportWidth = viewport.clientWidth;
        
        const maxPositiveTranslate = 0; 
        let minNegativeTranslate = -(trackScrollWidth - viewportWidth);

        if (trackScrollWidth <= viewportWidth) {
             const centeredPosition = (viewportWidth - trackScrollWidth) / 2;
             newTranslateX = Math.max(centeredPosition - 30, Math.min(centeredPosition + 30, newTranslateX)); 
        } else {
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
            finalTranslateX = (viewportWidth - trackScrollWidth) / 2; 
        } else {
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
      const touchStartOptions: AddEventListenerOptions = { passive: true };
      const touchMoveOptions: AddEventListenerOptions = { passive: false };

      track.addEventListener('mousedown', handleDragStart);
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('mouseleave', handleDragEnd); 

      track.addEventListener('touchstart', handleDragStart, touchStartOptions);
      track.addEventListener('touchmove', handleDragMove, touchMoveOptions);
      track.addEventListener('touchend', handleDragEnd);
      track.addEventListener('touchcancel', handleDragEnd);

      return () => {
        track.removeEventListener('mousedown', handleDragStart);
        window.removeEventListener('mousemove', handleDragMove);
        window.removeEventListener('mouseup',handleDragEnd);
        window.removeEventListener('mouseleave', handleDragEnd);

        track.removeEventListener('touchstart', handleDragStart, touchStartOptions);
        track.removeEventListener('touchmove', handleDragMove, touchMoveOptions);
        track.removeEventListener('touchend', handleDragEnd);
        track.removeEventListener('touchcancel', handleDragEnd);
      };
    }
  }, []); 

  // handlePrev and handleNext functions are removed

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
      
      {/* Removed 'group' class as buttons are gone */}
      <div className="container mx-auto px-0 sm:px-6 relative"> 
        <div 
          className="overflow-hidden cursor-grab active:cursor-grabbing relative"
        > 
          <div className="absolute inset-y-0 left-0 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" aria-hidden="true"></div>
          <div className="absolute inset-y-0 right-0 w-12 sm:w-16 md:w-20 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" aria-hidden="true"></div>

          <div
            ref={carouselTrackRef}
            className="flex gap-6 md:gap-8 py-8 px-3 sm:px-0" 
            style={{ touchAction: 'pan-y' }} 
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
        
        {/* Navigation Buttons are removed */}

        {/* Textual hint for draggability */}
        <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-4 px-3 sm:px-0">
          <span className="inline-block mr-1" aria-hidden="true">↔️</span> Arraste para explorar os pacotes
        </p>
      </div>
      
      <div className="container mx-auto px-6">
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8"> {/* Adjusted mt if necessary, or keep as is */}
            Todos os pacotes podem ser utilizados para aulas de Inglês ou Francês. Aulas de 30 minutos.
        </p>
      </div>
    </section>
  );
};

export default PromotionalCombos;
