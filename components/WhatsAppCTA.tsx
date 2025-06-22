import React from 'react';

const WhatsAppCTA: React.FC = () => {
  const whatsappNumber = "5511976740806";
  const message = encodeURIComponent("Olá! Gostaria de saber mais sobre as aulas do Línguacombo e como posso começar.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <section id="contato" className="py-20 md:py-24 bg-combo-yellow">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-combo-red mb-6 leading-tight max-w-2xl mx-auto">
          Pronto para Transformar Seu Futuro com Novos Idiomas?
        </h2>
        <p className="text-xl md:text-2xl text-gray-800 mb-12 max-w-3xl mx-auto">
          Tem alguma dúvida ou já quer garantir sua vaga no Línguacombo? Clique no botão abaixo e fale diretamente conosco pelo WhatsApp! Nossa equipe está pronta para te atender e personalizar sua jornada de aprendizado.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-combo-red text-white text-lg md:text-xl font-bold py-5 px-14 rounded-full shadow-xl hover:bg-red-700 transition-all duration-300 transform hover:scale-105 inline-block focus:outline-none focus:ring-4 focus:ring-red-400"
          aria-label="Entrar em contato com a Línguacombo via WhatsApp"
        >
          Falar Conosco no WhatsApp
        </a>
      </div>
    </section>
  );
};

export default WhatsAppCTA;