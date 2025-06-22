import React from 'react';
import PricingCard from './PricingCard';

const LanguageIcon: React.FC<{ path: string }> = ({ path }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const EnglishIcon = () => <LanguageIcon path="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />;
const FrenchIcon = () => <LanguageIcon path="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />;

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
        <div className="flex flex-wrap justify-center items-stretch">
          <PricingCard
            language="Inglês Divertido"
            description="Aulas dinâmicas para você destravar a fala e ganhar confiança no inglês."
            icon={<EnglishIcon />}
          />
          <PricingCard
            language="Francês Charmant"
            description="Descubra a beleza da língua francesa com aulas focadas na conversação e cultura."
            icon={<FrenchIcon />}
          />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;