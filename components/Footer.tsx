import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-combo-red dark:bg-red-800 text-white dark:text-gray-200 pt-16 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-6 text-center">
        <p className="text-3xl font-extrabold mb-3 tracking-tight">
          Língua<span className="text-combo-yellow dark:text-yellow-400">combo</span>
        </p>
        <p className="mb-6 text-gray-200 dark:text-gray-300 text-lg">
          Transformando seu aprendizado de idiomas. Um combo por vez.
        </p>
        <div className="flex justify-center space-x-6 mb-8">
          <a 
            href="https://www.facebook.com/profile.php?id=61577444376975" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-200 dark:text-gray-300 hover:text-combo-yellow dark:hover:text-yellow-400 transition-colors duration-300 text-sm hover:scale-110 transform"
            aria-label="Página da Línguacombo no Facebook"
          >
            Facebook
          </a>
          <a 
            href="https://www.instagram.com/linguacombo" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-200 dark:text-gray-300 hover:text-combo-yellow dark:hover:text-yellow-400 transition-colors duration-300 text-sm hover:scale-110 transform"
            aria-label="Perfil da Línguacombo no Instagram"
          >
            Instagram
          </a>
          <a 
            href="https://www.linkedin.com/in/leonardo-brykcy/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-200 dark:text-gray-300 hover:text-combo-yellow dark:hover:text-yellow-400 transition-colors duration-300 text-sm hover:scale-110 transform"
            aria-label="Perfil da Línguacombo no LinkedIn"
          >
            LinkedIn
          </a>
        </div>
        <p className="text-sm text-gray-300 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Línguacombo. Todos os direitos reservados.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          Preços, promoções e condições sujeitos a alteração sem aviso prévio. Imagens meramente ilustrativas.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Línguacombo é uma marca do grupo Quark IT.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          Formas de Pagamento: Aceitamos Cartão de Crédito e PIX.
        </p>
      </div>
    </footer>
  );
};

export default Footer;