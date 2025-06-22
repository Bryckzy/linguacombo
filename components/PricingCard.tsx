
import React from 'react';

interface PricingCardProps {
  language: string;
  description: string;
  icon: React.ReactNode;
}

const PricingCard: React.FC<PricingCardProps> = ({ language, description, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 m-4 flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border-4 border-combo-yellow">
      <div className="text-combo-red mb-4">{icon}</div>
      <h3 className="text-3xl font-bold text-combo-red mb-3">{language}</h3>
      <p className="text-gray-600 text-center mb-6">{description}</p>
      <div className="my-4">
        <span className="text-5xl font-extrabold text-gray-800">R$25</span>
        <span className="text-gray-500">/30 min</span>
      </div>
      <a
        href="#contato"
        className="bg-combo-red text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-red-700 transition-colors duration-300 w-full text-center"
      >
        Agendar Aula
      </a>
    </div>
  );
};

export default PricingCard;
    