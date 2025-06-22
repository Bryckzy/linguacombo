import React from 'react';
import PricingCard from './PricingCard';

// SVG component for the US flag (Corrected ID and star rendering)
const USFlagIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 570 300" // Standard US flag aspect ratio is 1.9, using integers for easier math
    className={className}
    aria-hidden="true"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      {/* Star path corrected id and simplified for clarity if needed */}
      <path id="us-star" d="M0,-4.7 L1.3826,-1.4485 L4.4721,-1.4485 L1.8041,0.5515 L2.618,3.9485 L0,2.2 L-2.618,3.9485 L-1.8041,0.5515 L-4.4721,-1.4485 L-1.3826,-1.4485 Z" fill="#FFFFFF" transform="scale(2.5)"/>
    </defs>
    {/* Stripes */}
    <rect width="570" height="300" fill="#BF0A30"/> {/* Old Glory Red */}
    <g fill="#FFFFFF">
       <rect y={(300/13) * 1} width="570" height={300/13} />
       <rect y={(300/13) * 3} width="570" height={300/13} />
       <rect y={(300/13) * 5} width="570" height={300/13} />
       <rect y={(300/13) * 7} width="570" height={300/13} />
       <rect y={(300/13) * 9} width="570" height={300/13} />
       <rect y={(300/13) * 11} width="570" height={300/13} />
    </g>
    {/* Canton (Blue Rectangle) */}
    <rect width={570 * (2/5)} height={300 * (7/13)} fill="#002868"/> {/* Old Glory Blue */}
    {/* Stars - 50 stars: 5 rows of 6, 4 rows of 5 */}
    {Array.from({ length: 9 }).map((_, rowIndex) => (
      Array.from({ length: rowIndex % 2 === 0 ? 6 : 5 }).map((_, colIndex) => {
        const cantonWidth = 570 * (2/5);
        const cantonHeight = 300 * (7/13);
        const xOffset = cantonWidth / 12;
        const yOffset = cantonHeight / 10;
        const x = xOffset + (colIndex * 2 * xOffset) + (rowIndex % 2 === 1 ? xOffset : 0);
        const y = yOffset + (rowIndex * yOffset);
        return <use key={`star_${rowIndex}_${colIndex}`} href="#us-star" transform={`translate(${x}, ${y})`}/>;
      })
    ))}
  </svg>
);

// SVG component for the French flag
const FrenchFlagIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 900 600" // Aspect ratio 3:2
    className={className}
    aria-hidden="true"
    preserveAspectRatio="xMidYMid meet"
  >
    <rect width="300" height="600" fill="#002654" /> {/* Blue */}
    <rect x="300" width="300" height="600" fill="#FFFFFF" /> {/* White */}
    <rect x="600" width="300" height="600" fill="#ED2939" /> {/* Red */}
  </svg>
);

const PricingSection: React.FC = () => {
  return (
    <section id="combos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-2">
          Nossos Combos <span className="text-combo-red">Imbatíveis</span>!
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Escolha seu idioma e comece a aprender hoje mesmo.
        </p>
        <div className="flex flex-wrap justify-center items-stretch gap-x-8 gap-y-12">
          <PricingCard
            language="Inglês Divertido"
            description="Aulas dinâmicas para você destravar a fala e ganhar confiança no inglês."
            icon={<USFlagIcon className="w-16 h-16 md:w-20 md:h-20" />}
          />
          <PricingCard
            language="Francês Charmant"
            description="Descubra a beleza da língua francesa com aulas focadas na conversação e cultura."
            icon={<FrenchFlagIcon className="w-16 h-16 md:w-20 md:h-20" />}
          />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;