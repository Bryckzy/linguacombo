import React from 'react';

interface ComboPackageCardProps {
  name: string;
  lessons: number;
  originalPrice: number;
  promoPrice: number;
  savings: number;
  pricePerLesson: number;
  isPopular?: boolean;
  isBestValue?: boolean;
  highlightColor?: string; // e.g., 'combo-yellow' or 'combo-red'
}

const ComboPackageCard: React.FC<ComboPackageCardProps> = ({
  name,
  lessons,
  originalPrice,
  promoPrice,
  savings,
  pricePerLesson,
  isPopular,
  isBestValue,
  highlightColor = 'combo-yellow',
}) => {
  const whatsappNumber = "5511976740806";
  const message = encodeURIComponent(`Olá! Tenho interesse no pacote "${name}" (${lessons} aulas) do Línguacombo.`);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  const badgeClass = highlightColor === 'combo-red' ? 'bg-combo-red text-white' : 'bg-combo-yellow text-combo-red';
  const borderClass = highlightColor === 'combo-red' ? 'border-combo-red' : 'border-combo-yellow';
  const shadowClass = highlightColor === 'combo-red' ? 'hover:shadow-red-400/50' : 'hover:shadow-yellow-400/50';

  return (
    <div className={`relative bg-white rounded-xl shadow-2xl p-6 md:p-8 flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border-4 ${borderClass} w-full min-w-[300px] max-w-sm ${shadowClass} snap-center flex-shrink-0`}>
      {(isPopular || isBestValue) && (
        <div className={`absolute -top-4 right-4 ${badgeClass} text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
          {isPopular ? 'MAIS POPULAR' : 'MELHOR VALOR'}
        </div>
      )}
      <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 text-center tracking-tight">{name}</h3>
      <p className="text-combo-red text-lg font-semibold mb-4">{lessons} Aulas Flexíveis</p>
      
      <div className="my-4 text-center">
        <p className="text-gray-500 line-through text-lg">De R$ {originalPrice.toFixed(2)}</p>
        <p className="text-5xl lg:text-6xl font-extrabold text-gray-800">R$ {promoPrice.toFixed(2)}</p>
        <p className="text-green-600 font-semibold mt-1">Economize R$ {savings.toFixed(2)}!</p>
      </div>

      <p className="bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-md mb-6 text-center text-sm md:text-base">
        Apenas <strong className="text-combo-red">R$ {pricePerLesson.toFixed(2)}</strong> por aula!
      </p>
      
      <ul className="text-sm text-gray-600 space-y-2 mb-8 text-center w-full">
        <li className="flex items-center justify-center">
          <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
          Use para Inglês ou Francês
        </li>
        <li className="flex items-center justify-center">
          <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
          Flexibilidade total de horários
        </li>
         <li className="flex items-center justify-center">
          <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
          Material didático incluso
        </li>
      </ul>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`bg-combo-red text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 text-md w-full text-center transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400`}
        aria-label={`Adquirir o pacote ${name}`}
      >
        Quero Este Pacote!
      </a>
    </div>
  );
};

export default ComboPackageCard;