import React, { useState } from 'react';
import LeadCaptureModal, { LeadFormData } from './LeadCaptureModal'; // Import the modal

interface PricingCardProps {
  language: string;
  description: string;
  icon: React.ReactNode;
}

const PricingCard: React.FC<PricingCardProps> = ({ language, description, icon }) => {
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
      `Olá! Meu nome é ${formData.nome}. Tenho interesse em uma aula de ${formData.curso} no Línguacombo. Meu WhatsApp é ${formData.whatsapp}. ${formData.observacao ? `Observação: ${formData.observacao}` : ''} Aguardo seu contato!`
    );
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    setIsModalOpen(false); 
  };


  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl dark:shadow-xl dark:shadow-yellow-700/20 p-8 md:p-10 flex flex-col items-center transform hover:scale-105 transition-all duration-300 border-4 border-combo-yellow dark:border-yellow-500 w-full min-w-[270px] max-w-md hover:shadow-yellow-400/50 dark:hover:shadow-yellow-600/40">
        <div className="text-combo-red dark:text-red-500 mb-6 h-20 flex items-center justify-center">{icon}</div>
        <h3 className="text-3xl lg:text-4xl font-bold text-combo-red dark:text-red-500 mb-4 text-center tracking-tight">{language}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8 h-24 text-base md:text-lg leading-relaxed">{description}</p>
        <div className="my-6 text-center">
          <span className="text-6xl lg:text-7xl font-extrabold text-gray-800 dark:text-gray-100">R$25</span>
          <span className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 ml-1">/aula</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0 mb-6 text-center">Formas de Pagamento: Cartão ou PIX</p>
        <button
          onClick={handleOpenModal}
          className="bg-combo-red dark:bg-red-600 text-white dark:text-gray-100 font-bold py-4 px-10 rounded-full shadow-lg hover:bg-red-700 dark:hover:bg-red-500 transition-all duration-300 text-lg w-full text-center transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400 dark:focus:ring-red-500"
          aria-label={`Agendar aula de ${language}`}
        >
          Quero Aprender {language.split(' ')[0]}!
        </button>
      </div>

      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmitSuccess={handleFormSubmitSuccess}
        initialCursoValue={language}
        defaultPlano="Aula Avulsa"
        origem={`PricingCard - ${language}`}
      />
    </>
  );
};

export default PricingCard;