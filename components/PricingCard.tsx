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
    <div className="bg-white rounded-xl shadow-2xl p-8 md:p-10 flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border-4 border-combo-yellow w-full min-w-[300px] max-w-md hover:shadow-yellow-400/50">
      <div className="text-combo-red mb-6 h-20 flex items-center justify-center">{icon}</div>
      <h3 className="text-3xl lg:text-4xl font-bold text-combo-red mb-4 text-center tracking-tight">{language}</h3>
      <p className="text-gray-600 text-center mb-8 h-24 text-base md:text-lg leading-relaxed">{description}</p>
      <div className="my-6 text-center">
        <span className="text-6xl lg:text-7xl font-extrabold text-gray-800">R$25</span>
        <span className="text-xl md:text-2xl text-gray-500 ml-1">/aula</span>
      </div>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-combo-red text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 text-lg w-full text-center transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400"
        aria-label={`Agendar aula de ${language}`}
      >
        Quero Aprender {language.split(' ')[0]}!
      </a>
    </div>
  );
};

export default PricingCard;