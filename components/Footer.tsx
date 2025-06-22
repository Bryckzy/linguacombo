import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-combo-red text-white pt-16 pb-12">
      <div className="container mx-auto px-6 text-center">
        <p className="text-3xl font-extrabold mb-3 tracking-tight">
          Língua<span className="text-combo-yellow">combo</span>
        </p>
        <p className="mb-6 text-gray-200 text-lg">
          Transformando seu aprendizado de idiomas. Um combo por vez.
        </p>
        <div className="flex justify-center space-x-6 mb-8">
          <a 
            href="https://www.facebook.com/profile.php?id=61577444376975" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-200 hover:text-combo-yellow transition-colors duration-300 text-sm hover:scale-110 transform"
            aria-label="Página da Línguacombo no Facebook"
          >
            Facebook
          </a>
          <a 
            href="https://www.instagram.com/linguacombo" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-200 hover:text-combo-yellow transition-colors duration-300 text-sm hover:scale-110 transform"
            aria-label="Perfil da Línguacombo no Instagram"
          >
            Instagram
          </a>
          <a 
            href="#" 
            className="text-gray-200 hover:text-combo-yellow transition-colors duration-300 text-sm hover:scale-110 transform"
            aria-label="Perfil da Línguacombo no LinkedIn (Link pendente)"
          >
            LinkedIn
          </a>
        </div>
        <p className="text-sm text-gray-300">
          &copy; {new Date().getFullYear()} Línguacombo. Todos os direitos reservados.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Preços, promoções e condições sujeitos a alteração sem aviso prévio. Imagens meramente ilustrativas.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Línguacombo é uma marca do grupo Quark IT.
        </p>
      </div>
    </footer>
  );
};

export default Footer;