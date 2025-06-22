import React from 'react';
import PricingCard from './PricingCard';

// SVG component for the US flag (Corrected ID and star rendering)
const USFlagIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 570 300" 
    className={className}
    aria-hidden="true"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      <path id="us-star" d="M0,-4.7 L1.3826,-1.4485 L4.4721,-1.4485 L1.8041,0.5515 L2.618,3.9485 L0,2.2 L-2.618,3.9485 L-1.8041,0.5515 L-4.4721,-1.4485 L-1.3826,-1.4485 Z" fill="#FFFFFF" transform="scale(2.5)"/>
    </defs>
    {/* Stripes */}
    <rect width="570" height="300" className="fill-[#BF0A30] dark:fill-red-700"/> 
    <g fill="#FFFFFF" className="dark:fill-gray-300">
       <rect y={(300/13) * 1} width="570" height={300/13} />
       <rect y={(300/13) * 3} width="570" height={300/13} />
       <rect y={(300/13) * 5} width="570" height={300/13} />
       <rect y={(300/13) * 7} width="570" height={300/13} />
       <rect y={(300/13) * 9} width="570" height={300/13} />
       <rect y={(300/13) * 11} width="570" height={300/13} />
    </g>
    {/* Canton */}
    <rect width={570 * (2/5)} height={300 * (7/13)} className="fill-[#002868] dark:fill-blue-800"/> 
    {/* Stars */}
    {Array.from({ length: 9 }).map((_, rowIndex) => (
      Array.from({ length: rowIndex % 2 === 0 ? 6 : 5 }).map((_, colIndex) => {
        const cantonWidth = 570 * (2/5);
        const cantonHeight = 300 * (7/13);
        const xOffset = cantonWidth / 12;
        const yOffset = cantonHeight / 10;
        const x = xOffset + (colIndex * 2 * xOffset) + (rowIndex % 2 === 1 ? xOffset : 0);
        const y = yOffset + (rowIndex * yOffset);
        return <use key={`star_${rowIndex}_${colIndex}`} href="#us-star" transform={`translate(${x}, ${y})`} className="fill-white dark:fill-gray-300"/>;
      })
    ))}
  </svg>
);

// SVG component for the French flag
const FrenchFlagIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 900 600" 
    className={className}
    aria-hidden="true"
    preserveAspectRatio="xMidYMid meet"
  >
    <rect width="300" height="600" className="fill-[#002654] dark:fill-blue-800" /> 
    <rect x="300" width="300" height="600" className="fill-[#FFFFFF] dark:fill-gray-300" /> 
    <rect x="600" width="300" height="600" className="fill-[#ED2939] dark:fill-red-700" /> 
  </svg>
);

const PricingSection: React.FC = () => {
  return (
    <section id="idiomas" className="py-20 md:py-24 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-4">
          Nossos Idiomas <span className="text-combo-red dark:text-red-500">em Destaque</span>!
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-16 max-w-2xl mx-auto">
          Escolha o idioma que mais combina com você e inicie sua jornada de aprendizado com aulas personalizadas e eficazes, a um preço que cabe no seu bolso.
        </p>
        <div className="flex flex-wrap justify-center items-stretch gap-x-8 gap-y-12 lg:gap-x-12">
          <PricingCard
            language="Inglês Global"
            description="Domine o idioma universal! Aulas dinâmicas para destravar sua comunicação e abrir portas no mundo."
            icon={<USFlagIcon className="w-16 h-16 md:w-20 md:h-20" />}
          />
          <PricingCard
            language="Francês Magnifique"
            description="Apaixone-se pelo charme francês! Aulas focadas em conversação e imersão cultural."
            icon={<FrenchFlagIcon className="w-16 h-16 md:w-20 md:h-20" />}
          />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;