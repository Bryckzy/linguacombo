import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="md:w-1/2 flex justify-center md:order-last">
            <img 
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZGVudCUyMGxhcHRvcCUyMGhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D&w=1000&q=80" 
              alt="Estudante engajada em uma aula online da Línguacombo, demonstrando um ambiente de aprendizado moderno e focado." 
              className="w-full max-w-lg h-auto rounded-xl shadow-2xl dark:shadow-lg dark:shadow-black/30 object-cover aspect-square md:aspect-[4/3]" 
            />
          </div>
          <div className="md:w-1/2 md:order-first">
            <h2 id="sobre" className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-8 tracking-tight">
              Nossa Paixão: <span className="text-combo-red dark:text-red-500">Conectar Você ao Mundo</span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
              Na Línguacombo, acreditamos que aprender um novo idioma é abrir uma janela para o mundo – e deve ser tão <strong className="font-semibold text-gray-800 dark:text-gray-100">acessível, rápido e prazeroso</strong> quanto saborear seu combo preferido! Nossa missão é revolucionar o ensino de inglês e francês, com aulas de excelência que se encaixam perfeitamente na sua rotina e no seu orçamento.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
              Com uma metodologia <strong className="font-semibold text-gray-800 dark:text-gray-100">focada na conversação</strong> e em dinâmicas interativas, nossas sessões de 30 minutos são ideais para quem busca resultados práticos e confiança para se comunicar. Nossos educadores experientes e apaixonados estão aqui para transformar seu aprendizado em uma aventura cultural e linguística.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Faça parte da comunidade Línguacombo e descubra como o aprendizado de idiomas pode ser <strong className="font-semibold text-gray-800 dark:text-gray-100">leve, divertido e incrivelmente recompensador</strong>. Seu futuro bilíngue começa aqui!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;