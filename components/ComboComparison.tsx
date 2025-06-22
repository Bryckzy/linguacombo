
import React from 'react';

// New SVG for "Pro" list items
const ListItemCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// New SVG for "Con" list items
const ListItemCrossIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


const ComboComparison: React.FC = () => {
  const traditionalPoints = [
    { text: "Sabor instantâneo, prazer momentâneo.", type: "pro" as const },
    { text: "Impacto negativo na saúde e bem-estar.", type: "con" as const },
    { text: "Energia passageira, seguida de cansaço.", type: "con" as const },
    { text: "Não agrega valor ao seu desenvolvimento pessoal.", type: "con" as const },
  ];

  const linguacomboPoints = [
    { text: "Expande sua mente e turbina sua memória.", type: "pro" as const },
    { text: "Abre portas para novas culturas e oportunidades.", type: "pro" as const },
    { text: "Investimento duradouro em seu futuro.", type: "pro" as const },
    { text: "Evolução contínua, sem arrependimentos!", type: "pro" as const },
  ];

  return (
    <section id="comparacao" className="py-20 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-12 md:mb-16">
          Sua Escolha Inteligente: <span className="text-combo-red">O Que Alimenta Seu Futuro?</span>
        </h2>

        <div className="bg-combo-red rounded-xl shadow-2xl p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-stretch justify-around gap-6 md:gap-8">
            {/* Coluna 1: Combo Tradicional */}
            <div className="group flex flex-col items-center text-center md:w-[45%] lg:w-2/5 p-5 sm:p-8 rounded-lg bg-red-800 shadow-xl ring-1 ring-red-700/50 transform transition-all duration-300 hover:shadow-red-900/50 hover:-translate-y-1">
              <img 
                src="https://wallpapers.com/images/high/fast-food-meal-combo-9ttyt2ht7usti3dy.png" 
                alt="Combo de fast food com hambúrguer, batatas fritas e refrigerante representando uma escolha de curto prazo" 
                className="w-full max-w-[200px] md:max-w-[240px] h-auto object-contain aspect-[4/3] rounded-lg mx-auto mb-6 transform group-hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">COMBO TRADICIONAL</h3>
              <p className="text-3xl md:text-4xl font-extrabold text-combo-yellow mb-6">R$ 25</p>
              <ul className="space-y-3 text-left w-full max-w-xs sm:max-w-sm mx-auto">
                {traditionalPoints.map((point, index) => (
                  <li key={index} className="flex items-start p-3 rounded-md bg-red-700/60 border border-white/20 shadow-sm">
                    <span className="mr-3 flex-shrink-0 mt-0.5">
                      {point.type === 'pro' ? (
                        <ListItemCheckIcon className="w-5 h-5 text-green-300" />
                      ) : (
                        <ListItemCrossIcon className="w-5 h-5 text-yellow-300" />
                      )}
                    </span>
                    <span className="text-sm md:text-base text-gray-100 font-medium">{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* VS Separator */}
            <div className="flex items-center justify-center my-4 md:my-0">
              <div className="inline text-combo-yellow text-6xl md:text-8xl font-black italic transform md:-rotate-12 opacity-90 shadow-text-red">X</div>
            </div>

            {/* Coluna 2: Linguacombo */}
            <div className="group flex flex-col items-center text-center md:w-[45%] lg:w-2/5 p-5 sm:p-8 rounded-lg bg-red-800 shadow-xl ring-1 ring-red-700/50 transform transition-all duration-300 hover:shadow-red-900/50 hover:-translate-y-1">
              <img 
                src="https://i.imgur.com/jjV5oVX.png" 
                alt="Gráfico VS representando a escolha inteligente pelo Línguacombo, que supera as opções tradicionais." 
                className="w-full max-w-[200px] md:max-w-[240px] h-auto object-contain aspect-[4/3] rounded-lg mx-auto mb-6 transform group-hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 tracking-tight">
                <span className="text-combo-yellow">LÍNGUA</span>COMBO
              </h3>
               <p className="text-sm text-gray-200 mb-2 font-semibold">(O Combo Inteligente!)</p>
              <p className="text-3xl md:text-4xl font-extrabold text-combo-yellow mb-6">R$ 25<span className="text-xl text-yellow-200">/aula</span></p>
              <ul className="space-y-3 text-left w-full max-w-xs sm:max-w-sm mx-auto">
                {linguacomboPoints.map((point, index) => (
                  <li key={index} className="flex items-start p-3 rounded-md bg-red-700/60 border border-white/20 shadow-sm">
                     <span className="mr-3 flex-shrink-0 mt-0.5">
                      {point.type === 'pro' ? (
                        <ListItemCheckIcon className="w-5 h-5 text-green-300" />
                      ) : (
                        <ListItemCrossIcon className="w-5 h-5 text-combo-red" /> 
                      )}
                    </span>
                    <span className="text-sm md:text-base text-gray-100 font-medium">{point.text}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#idiomas" // Changed from #combos to #idiomas
                className="mt-8 bg-combo-yellow text-combo-red text-base md:text-lg font-bold py-3.5 px-10 rounded-full shadow-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-400"
                aria-label="Escolher o Línguacombo para aprendizado de idiomas"
              >
                ESCOLHA O FUTURO!
              </a>
            </div>
          </div>
          <p className="text-center text-gray-100 mt-12 md:mt-16 text-md md:text-lg max-w-3xl mx-auto leading-relaxed">
            Ambos têm o mesmo preço de um lanche, mas apenas <strong className="text-combo-yellow font-bold">Línguacombo</strong> nutre sua mente, expande seus horizontes e constrói um futuro mais brilhante. <br className="hidden sm:inline"/>A decisão inteligente está em suas mãos!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComboComparison;