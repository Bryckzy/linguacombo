import React from 'react';

interface PricingCardProps {
  language: string;
  description: string;
  icon: React.ReactNode;
}

const PricingCard: React.FC<PricingCardProps> = ({ language, description, icon }) => {
  const whatsappNumber = "5511976740806";
  const message = encodeURIComponent(`Olá! Gostaria de agendar uma aula de ${language} no Línguacombo.`);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 md:p-10 flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border-4 border-combo-yellow w-full min-w-[280px] max-w-md">
      <div className="text-combo-red mb-4 h-20 flex items-center justify-center">{icon}</div>
      <h3 className="text-3xl lg:text-4xl font-bold text-combo-red mb-3 text-center">{language}</h3>
      <p className="text-gray-600 text-center mb-6 h-20">{description}</p>
      <div className="my-4 text-center">
        <span className="text-6xl font-extrabold text-gray-800">R$25</span>
        <span className="text-xl text-gray-500 ml-1">/30 min</span>
      </div>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-combo-red text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-red-700 transition-colors duration-300 w-full text-center text-lg"
      >
        Agendar Aula
      </a>
    </div>
  );
};

export default PricingCard;