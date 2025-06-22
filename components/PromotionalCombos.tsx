
import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const trackStartTranslateXRef = useRef(0);
  const currentTranslateXRef = useRef(0);

  const applyTransform = useCallback((targetIndex: number, smooth: boolean = true) => {
    const track = carouselTrackRef.current;
    const viewport = track?.parentElement;

    if (!track || !viewport || !track.children || track.children.length === 0) return;

    const validTargetIndex = Math.max(0, Math.min(targetIndex, track.children.length - 1));
    const targetCardSlot = track.children[validTargetIndex] as HTMLElement;
    if (!targetCardSlot) return;

    const viewportWidth = viewport.clientWidth;
    const cardWidth = targetCardSlot.offsetWidth;
    const cardOffsetLeft = targetCardSlot.offsetLeft;

    let translateXValue = cardOffsetLeft - (viewportWidth / 2 - cardWidth / 2);

    const trackScrollWidth = track.scrollWidth;
    const maxTranslateX = 0;
    const trackPaddingLeft = parseFloat(window.getComputedStyle(track).paddingLeft) || 0;
    const trackPaddingRight = parseFloat(window.getComputedStyle(track).paddingRight) || 0;
    let minTranslateX = -(trackScrollWidth - viewportWidth + trackPaddingLeft + trackPaddingRight);

    if (trackScrollWidth <= viewportWidth) {
      minTranslateX = 0;
      translateXValue = 0; 
    } else {
      translateXValue = Math.max(minTranslateX, Math.min(maxTranslateX, translateXValue));
    }
    

    if (smooth) {
      track.style.transition = 'transform 0.5s ease-in-out';
    } else {
      track.style.transition = 'none';
    }
    track.style.transform = `translateX(-${translateXValue}px)`;
    currentTranslateXRef.current = -translateXValue;
  }, []);


  useEffect(() => {
    applyTransform(currentIndex, true);
  }, [currentIndex, applyTransform]);

  useEffect(() => {
    const track = carouselTrackRef.current;
    if (!track) return;

    const handleResize = () => {
      const currentTrack = carouselTrackRef.current;
      const currentViewport = currentTrack?.parentElement;

      if (currentTrack && currentViewport) {
        const trackScrollWidth = currentTrack.scrollWidth;
        const viewportWidth = currentViewport.clientWidth;
        
        const maxPositiveTranslate = 0;
        const trackPaddingLeft = parseFloat(window.getComputedStyle(currentTrack).paddingLeft) || 0;
        const trackPaddingRight = parseFloat(window.getComputedStyle(currentTrack).paddingRight) || 0;
        let minNegativeTranslate = -(trackScrollWidth - viewportWidth + trackPaddingLeft + trackPaddingRight);

        if (trackScrollWidth <= viewportWidth) {
            minNegativeTranslate = 0;
            currentTranslateXRef.current = 0;
        } else {
            currentTranslateXRef.current = Math.max(minNegativeTranslate, Math.min(maxPositiveTranslate, currentTranslateXRef.current));
        }
        
        currentTrack.style.transition = 'none'; 
        currentTrack.style.transform = `translateX(${currentTranslateXRef.current}px)`;
      }
    };

    window.addEventListener('resize', handleResize);
    applyTransform(currentIndex, false);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentIndex, applyTransform]); 


  const handleDragStart = (event: Event) => {
    if (!(event instanceof MouseEvent || event instanceof TouchEvent)) {
      return;
    }
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

    if (!(event instanceof MouseEvent || event instanceof TouchEvent)) {
      return;
    }
    const e = event;
    
    e.preventDefault();

    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = currentX - dragStartXRef.current;
    let newTranslateX = trackStartTranslateXRef.current + deltaX;

    const track = carouselTrackRef.current;
    const viewport = track.parentElement;
    if (viewport) {
        const trackScrollWidth = track.scrollWidth;
        const viewportWidth = viewport.clientWidth;
        const maxPositiveTranslate = 0;
        const trackPaddingLeft = parseFloat(window.getComputedStyle(track).paddingLeft) || 0;
        const trackPaddingRight = parseFloat(window.getComputedStyle(track).paddingRight) || 0;
        let minNegativeTranslate = -(trackScrollWidth - viewportWidth + trackPaddingLeft + trackPaddingRight);

        if (trackScrollWidth <= viewportWidth) {
            minNegativeTranslate = 0;
        }
        
        newTranslateX = Math.max(minNegativeTranslate, Math.min(maxPositiveTranslate, newTranslateX));
    }
    
    if (carouselTrackRef.current) {
        carouselTrackRef.current.style.transform = `translateX(${newTranslateX}px)`;
    }
    currentTranslateXRef.current = newTranslateX;
  };

  const handleDragEnd = (_event: Event) => {
    if (!isDraggingRef.current || !carouselTrackRef.current) return;
    isDraggingRef.current = false;
    if (carouselTrackRef.current) {
        carouselTrackRef.current.style.cursor = 'grab';
    }
    document.body.style.userSelect = '';
  };

  useEffect(() => {
    const track = carouselTrackRef.current;
    if (track) {
      track.addEventListener('mousedown', handleDragStart);
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('mouseleave', handleDragEnd);
      track.addEventListener('touchstart', handleDragStart, { passive: true });
      track.addEventListener('touchmove', handleDragMove, { passive: false });
      track.addEventListener('touchend', handleDragEnd);
      track.addEventListener('touchcancel', handleDragEnd);

      return () => {
        track.removeEventListener('mousedown', handleDragStart);
        window.removeEventListener('mousemove', handleDragMove);
        window.removeEventListener('mouseup', handleDragEnd);
        window.removeEventListener('mouseleave', handleDragEnd);
        track.removeEventListener('touchstart', handleDragStart);
        track.removeEventListener('touchmove', handleDragMove);
        track.removeEventListener('touchend', handleDragEnd);
        track.removeEventListener('touchcancel', handleDragEnd);
      };
    }
  }, []);


  return (
    <section id="pacotes" className="py-20 md:py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-4">
          Turbine Seu Aprendizado com Nossos <span className="text-combo-red dark:text-red-500">Pacotes Campeões</span>!
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-16 max-w-3xl mx-auto">
          Invista no seu futuro com nossos pacotes de aulas. Mais aulas, mais economia, e a mesma qualidade Línguacombo que você confia!
        </p>
      </div>
      
      <div className="container mx-auto px-0 sm:px-6 relative">
        <div className="overflow-hidden cursor-grab active:cursor-grabbing">
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