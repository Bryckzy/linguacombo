import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10 flex justify-center">
            {/* 
              IMPORTANTE: Substitua o URL abaixo pelo URL real da imagem que você deseja usar.
              Este é um placeholder do Unsplash que se assemelha à imagem fornecida.
            */}
            <img 
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZGVudCUyMGxhcHRvcCUyMGhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D&w=1000&q=80" 
              alt="Jovem mulher focada estudando online com fones de ouvido e laptop, representando o aprendizado moderno na Línguacombo." 
              className="w-full max-w-md h-auto rounded-xl shadow-2xl object-cover aspect-[4/3]" 
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
              Sobre a <span className="text-combo-red">Língua</span><span className="text-combo-yellow">combo</span>
            </h2>
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              Na Línguacombo, acreditamos que aprender um novo idioma deve ser tão acessível, rápido e prazeroso quanto pedir seu combo favorito! 
              Nossa missão é descomplicar o aprendizado de inglês e francês, oferecendo aulas de alta qualidade que cabem no seu bolso e na sua rotina.
            </p>
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              Com foco na conversação e em métodos dinâmicos, nossas sessões de 30 minutos são perfeitas para quem busca resultados práticos sem perder tempo. 
              Nossos professores experientes estão prontos para guiar você em uma jornada de descobertas culturais e linguísticas.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Junte-se à comunidade Línguacombo e descubra como pode ser fácil e divertido expandir seus horizontes!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;