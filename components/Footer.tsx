import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-combo-red text-white py-10">
      <div className="container mx-auto px-6 text-center">
        <p className="text-2xl font-bold mb-2">
          Língua<span className="text-combo-yellow">combo</span>
        </p>
        <p className="mb-4">
          Seu combo de idiomas para um futuro bilíngue!
        </p>
        <div className="flex justify-center space-x-6 mb-4">
          {/* Placeholder for social media icons */}
          <a href="#" className="hover:text-combo-yellow transition-colors">Facebook</a>
          <a 
            href="https://www.instagram.com/linguacombo" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-combo-yellow transition-colors"
          >
            Instagram
          </a>
          <a href="#" className="hover:text-combo-yellow transition-colors">LinkedIn</a>
        </div>
        <p className="text-sm text-gray-300">
          &copy; {new Date().getFullYear()} Línguacombo. Todos os direitos reservados.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Preços e promoções sujeitos a alteração sem aviso prévio. Imagens meramente ilustrativas.
        </p>
      </div>
    </footer>
  );
};

export default Footer;