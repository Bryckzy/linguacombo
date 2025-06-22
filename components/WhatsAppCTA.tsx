import React, { useState } from 'react';
import LeadCaptureModal, { LeadFormData } from './LeadCaptureModal';

const WhatsAppCTA: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const whatsappNumber = "5511976740806"; // Target WhatsApp number for the business

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmitSuccess = (formData: LeadFormData) => {
    // formData.whatsapp is now the full +55XXXXXXXXXXX number
    const message = encodeURIComponent(
      `Olá! Meu nome é ${formData.nome}. Gostaria de saber mais sobre as aulas do Línguacombo. Meu WhatsApp é ${formData.whatsapp}. Meu interesse principal é em ${formData.curso || 'aulas em geral'}. ${formData.observacao ? `Observação: ${formData.observacao}` : ''} Como posso começar?`
    );
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    setIsModalOpen(false);
  };

  return (
    <>
      <section id="contato" className="py-20 md:py-24 bg-combo-yellow">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-combo-red mb-6 leading-tight max-w-2xl mx-auto">
            Pronto para Transformar Seu Futuro com Novos Idiomas?
          </h2>
          <p className="text-xl md:text-2xl text-gray-800 mb-12 max-w-3xl mx-auto">
            Tem alguma dúvida ou já quer garantir sua vaga no Línguacombo? Clique no botão abaixo e fale diretamente conosco pelo WhatsApp! Nossa equipe está pronta para te atender e personalizar sua jornada de aprendizado.
          </p>
          <button
            onClick={handleOpenModal}
            className="bg-combo-red text-white text-lg md:text-xl font-bold py-5 px-14 rounded-full shadow-xl hover:bg-red-700 transition-all duration-300 transform hover:scale-105 inline-block focus:outline-none focus:ring-4 focus:ring-red-400"
            aria-label="Entrar em contato com a Línguacombo via WhatsApp"
          >
            Falar Conosco no WhatsApp
          </button>
        </div>
      </section>

      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmitSuccess={handleFormSubmitSuccess}
        initialCursoValue="Interesse Geral nas Aulas" // Changed from defaultInitialCurso
        // defaultPlano is not set here
        origem="WhatsAppCTA - Seção Principal"
      />
    </>
  );
};

export default WhatsAppCTA;