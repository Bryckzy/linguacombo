import React, { useState } from 'react';
import LeadCaptureModal, { LeadFormData } from './LeadCaptureModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const whatsappNumber = "5511976740806"; 

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmitSuccess = (formData: LeadFormData) => {
    const message = encodeURIComponent(
      `Olá! Meu nome é ${formData.nome}. Gostaria de adquirir o pacote "${formData.plano || name}" (${lessons} aulas) para o idioma ${formData.curso} do Línguacombo. Meu WhatsApp é ${formData.whatsapp}. ${formData.observacao ? `Observação: ${formData.observacao}` : ''} Poderiam me passar mais informações sobre as formas de pagamento e como podemos iniciar o agendamento das aulas? Obrigado(a)!`
    );
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    setIsModalOpen(false);
  };

  const badgeClass = highlightColor === 'combo-red' 
    ? 'bg-combo-red text-white dark:bg-red-600 dark:text-gray-100' 
    : 'bg-combo-yellow text-combo-red dark:bg-yellow-400 dark:text-red-700';
  const borderClass = highlightColor === 'combo-red' 
    ? 'border-combo-red dark:border-red-600' 
    : 'border-combo-yellow dark:border-yellow-500';
  const shadowClass = highlightColor === 'combo-red' 
    ? 'hover:shadow-red-400/50 dark:hover:shadow-red-600/40' 
    : 'hover:shadow-yellow-400/50 dark:hover:shadow-yellow-600/40';

  return (
    <>
      <div className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl dark:shadow-xl p-6 md:p-8 flex flex-col items-center transform hover:scale-105 transition-all duration-300 border-4 ${borderClass} w-full ${shadowClass}`}>
        {(isPopular || isBestValue) && (
          <div className={`absolute -top-4 right-4 ${badgeClass} text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
            {isPopular ? 'MAIS POPULAR' : 'MELHOR VALOR'}
          </div>
        )}
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 text-center tracking-tight">{name}</h3>
        <p className="text-combo-red dark:text-red-500 text-lg font-semibold mb-4">{lessons} Aulas Flexíveis</p>
        
        <div className="my-4 text-center">
          <p className="text-gray-500 dark:text-gray-400 line-through text-lg">De R$ {originalPrice.toFixed(2)}</p>
          <p className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-gray-100">R$ {promoPrice.toFixed(2)}</p>
          <p className="text-green-600 dark:text-green-400 font-semibold mt-1">Economize R$ {savings.toFixed(2)}!</p>
        </div>

        <p className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-2 px-4 rounded-md mb-2 text-center text-sm md:text-base">
          Apenas <strong className="text-combo-red dark:text-red-500">R$ {pricePerLesson.toFixed(2)}</strong> por aula!
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4 text-center">Formas de Pagamento: Cartão de Crédito ou PIX</p>
        
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 mb-8 text-center w-full">
          <li className="flex items-center justify-center">
            <svg className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
            Use para Inglês ou Francês
          </li>
          <li className="flex items-center justify-center">
            <svg className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
            Flexibilidade total de horários
          </li>
        </ul>

        <button
          onClick={handleOpenModal}
          className={`bg-combo-red dark:bg-red-600 text-white dark:text-gray-100 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-red-700 dark:hover:bg-red-500 transition-all duration-300 text-md w-full text-center transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400 dark:focus:ring-red-500 mt-auto`}
          aria-label={`Adquirir o pacote ${name}`}
        >
          Quero Este Pacote!
        </button>
      </div>
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmitSuccess={handleFormSubmitSuccess}
        defaultPlano={name} 
        initialCursoValue="" 
        origem={`ComboPackageCard - ${name}`}
      />
    </>
  );
};

export default ComboPackageCard;