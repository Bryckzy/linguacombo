
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
            <div className="group flex flex-col items-center text-center md:w-[45%] lg:w-2/5 p-4 sm:p-6 rounded-lg bg-red-800 shadow-inner ring-1 ring-red-700/50">
              <img 
                src="https://wallpapers.com/images/high/fast-food-meal-combo-9ttyt2ht7usti3dy.png" 
                alt="Combo de fast food com hambúrguer, batatas fritas e refrigerante" 
                className="w-full max-w-[180px] md:max-w-[220px] h-auto object-cover aspect-[4/3] rounded-lg mx-auto mb-6 transform group-hover:scale-105 transition-transform duration-300 shadow-md"
              />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">COMBO TRADICIONAL</h3>
              <p className="text-3xl md:text-4xl font-extrabold text-combo-yellow mb-5">R$ 25</p>
              <ul className="space-y-3 text-left w-full max-w-sm">
                {traditionalPoints.map((point, index) => (
                  <li key={index} className="flex items-start p-2.5 rounded-md border border-white/20 shadow-sm">
                    <span className="mr-2.5 flex-shrink-0 mt-1"> {/* Adjusted mt for better alignment */}
                      {point.type === 'pro' ? (
                        <ListItemCheckIcon className="w-5 h-5 text-green-400" />
                      ) : (
                        <ListItemCrossIcon className="w-5 h-5 text-yellow-400" /> // Using combo-yellow for "cons" for thematic consistency
                      )}
                    </span>
                    <span className="text-sm md:text-base text-gray-100 font-medium">{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* VS Separator */}
            <div className="flex items-center justify-center my-4 md:my-0">
              <div className="inline text-combo-yellow text-5xl md:text-7xl font-black italic transform md:-rotate-6 opacity-90">X</div>
            </div>

            {/* Coluna 2: Linguacombo */}
            <div className="group flex flex-col items-center text-center md:w-[45%] lg:w-2/5 p-4 sm:p-6 rounded-lg bg-red-800 shadow-inner ring-1 ring-red-700/50">
              <img 
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80" 
                alt="Pilha de livros representando estudo de idiomas" 
                className="w-full max-w-[180px] md:max-w-[220px] h-auto object-cover aspect-[4/3] rounded-lg mx-auto mb-6 transform group-hover:scale-105 transition-transform duration-300 shadow-md"
              />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                <span className="text-combo-yellow">LÍNGUA</span>COMBO
              </h3>
               <p className="text-sm text-gray-300 mb-1">(O Inteligente!)</p>
              <p className="text-3xl md:text-4xl font-extrabold text-combo-yellow mb-5">R$ 25<span className="text-lg text-yellow-300">/30min</span></p>
              <ul className="space-y-3 text-left w-full max-w-sm">
                {linguacomboPoints.map((point, index) => (
                  <li key={index} className="flex items-start p-2.5 rounded-md border border-white/20 shadow-sm">
                     <span className="mr-2.5 flex-shrink-0 mt-1"> {/* Adjusted mt for better alignment */}
                       {/* All linguacombo points are "pro" but maintaining structure for consistency */}
                      {point.type === 'pro' ? (
                        <ListItemCheckIcon className="w-5 h-5 text-green-400" />
                      ) : (
                        // This case might not be hit if all points are 'pro'
                        <ListItemCrossIcon className="w-5 h-5 text-combo-red" /> 
                      )}
                    </span>
                    <span className="text-sm md:text-base text-gray-100 font-medium">{point.text}</span>
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
