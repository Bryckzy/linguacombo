import React from 'react';

const TeacherSection: React.FC = () => {
  const teacherName = "Leonardo Brykcy";
  const teacherPhotoUrl = "https://avatars.githubusercontent.com/u/69459277?v=4";
  const cambridgeLogoUrl = "https://download.logo.wine/logo/University_of_Cambridge/University_of_Cambridge-Logo.wine.png";
  const biography = "Com experiência prática no ensino de idiomas, incluindo um ano em uma edtech de inglês onde observei de perto o que realmente acelera o aprendizado, minha paixão é ajudar você a destravar o idioma. Utilizo métodos diretos e personalizados, com a solidez da minha certificação de proficiência pela Cambridge, para que você ganhe confiança e fluência de forma acessível.";

  return (
    <section id="professores" className="bg-gray-50 dark:bg-slate-900 py-20 md:py-24 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-12 md:mb-16">
          Conheça Seu <span className="text-combo-red dark:text-red-500">Professor</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-12 max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 md:p-10 rounded-xl shadow-xl dark:shadow-lg dark:shadow-black/30 border border-gray-200 dark:border-gray-700">
          {/* Image Column */}
          <div className="md:w-1/3 flex-shrink-0 text-center">
            <img 
              src={teacherPhotoUrl} 
              alt={`Professor ${teacherName}, especialista em idiomas na Línguacombo`}
              className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-lg mx-auto border-4 border-combo-yellow dark:border-yellow-500 transition-transform duration-300 hover:scale-105" 
            />
          </div>
          {/* Text Column */}
          <div className="md:w-2/3 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-combo-red dark:text-red-500 mb-3 tracking-tight">{teacherName}</h3>
            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
              {biography}
            </p>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 md:gap-6">
              {/* Cambridge logo is a PNG with a white background, so it should look fine on dark. If it were transparent, we might need a container with a light bg. */}
              <img 
                src={cambridgeLogoUrl} 
                alt="Logo da Universidade de Cambridge" 
                className="h-10 md:h-12 object-contain bg-white p-1 rounded" // Added bg-white and padding for better display on dark if needed
              />
              <div>
                <p className="text-gray-700 dark:text-gray-200 font-semibold text-sm md:text-base">
                  Certificação de Proficiência em Inglês
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  University of Cambridge
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherSection;