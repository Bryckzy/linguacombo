import React from 'react';

// Icon for CheckMark
const CheckMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

// Icon for CrossMark
const CrossMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const ComboComparison: React.FC = () => {
  const traditionalPoints = [
    { text: "Delícia imediata? Com certeza!", type: "pro" as const },
    { text: "Pesa um pouco na balança.", type: "con" as const },
    { text: "Culpa pós-refeição? Talvez.", type: "con" as const },
    { text: "Energia que some rapidinho.", type: "con" as const },
  ];

  const linguacomboPoints = [
    { text: "Turbina seu cérebro e memória.", type: "pro" as const },
    { text: "Abre novas portas e amizades.", type: "pro" as const },
    { text: "Investimento que rende no futuro.", type: "pro" as const },
    { text: "Zero culpa, 100% evolução!", type: "pro" as const },
  ];

  return (
    <section id="comparacao" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-10 md:mb-12">
          Qual <span className="text-combo-red">Escolha</span> Você Faz Hoje?
        </h2>

        <div className="bg-combo-red rounded-xl shadow-2xl p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-stretch justify-around gap-6 md:gap-8">
            {/* Coluna 1: Combo Tradicional */}
            <div className="flex flex-col items-center text-center md:w-[45%] lg:w-2/5 p-4 sm:p-6 rounded-lg bg-red-700/80 shadow-inner ring-1 ring-red-600/50">
              {/* FastFoodIcon removed */}
              <div className="h-28 w-28 md:h-32 md:w-32 mb-5"></div> {/* Placeholder for spacing */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">COMBO TRADICIONAL</h3>
              <p className="text-3xl md:text-4xl font-extrabold text-combo-yellow mb-5">R$ 25</p>
              <ul className="space-y-3 text-left w-full max-w-sm">
                {traditionalPoints.map((point, index) => (
                  <li key={index} className={`flex items-start p-2.5 rounded-md shadow-sm ${point.type === 'pro' ? 'bg-yellow-400/30 ring-1 ring-yellow-500/50' : 'bg-red-400/30 ring-1 ring-red-500/50'}`}>
                    {point.type === 'pro' ? (
                      <CheckMarkIcon className="h-5 w-5 text-combo-yellow mr-2.5 mt-0.5 flex-shrink-0" />
                    ) : (
                      <CrossMarkIcon className="h-5 w-5 text-red-300 mr-2.5 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`text-sm md:text-base ${point.type === 'pro' ? 'text-gray-100 font-medium' : 'text-gray-200'}`}>{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* VS Separator */}
            <div className="flex items-center justify-center my-4 md:my-0">
              <div className="inline text-combo-yellow text-5xl md:text-7xl font-black italic transform md:-rotate-6 opacity-90">X</div>
            </div>

            {/* Coluna 2: Linguacombo */}
            <div className="flex flex-col items-center text-center md:w-[45%] lg:w-2/5 p-4 sm:p-6 rounded-lg bg-red-700/80 shadow-inner ring-1 ring-red-600/50">
              {/* BookIcon removed */}
              <div className="h-28 w-28 md:h-32 md:w-32 mb-5"></div> {/* Placeholder for spacing */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                <span className="text-combo-yellow">LÍNGUA</span>COMBO
              </h3>
               <p className="text-sm text-gray-300 mb-1">(O Inteligente!)</p>
              <p className="text-3xl md:text-4xl font-extrabold text-combo-yellow mb-5">R$ 25<span className="text-lg text-yellow-300">/30min</span></p>
              <ul className="space-y-3 text-left w-full max-w-sm">
                {linguacomboPoints.map((point, index) => (
                  <li key={index} className={`flex items-start p-2.5 rounded-md shadow-sm ${point.type === 'pro' ? 'bg-green-400/30 ring-1 ring-green-500/50' : 'bg-red-400/30 ring-1 ring-red-500/50'}`}>
                    <CheckMarkIcon className="h-5 w-5 text-green-300 mr-2.5 mt-0.5 flex-shrink-0" />
                    <span className={`text-sm md:text-base ${point.type === 'pro' ? 'text-gray-100 font-medium' : 'text-gray-200'}`}>{point.text}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#combos"
                className="mt-8 bg-combo-yellow text-combo-red text-base md:text-lg font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-300 transition-colors duration-300 transform hover:scale-105"
              >
                ESCOLHA O FUTURO!
              </a>
            </div>
          </div>
          <p className="text-center text-gray-200 mt-10 md:mt-12 text-sm md:text-base max-w-2xl mx-auto">
            Ambos custam o mesmo que um lanche, mas só um deles alimenta sua mente e seu futuro. <br className="hidden sm:inline"/>A escolha inteligente é <strong className="text-combo-yellow font-bold">Línguacombo</strong>!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComboComparison;