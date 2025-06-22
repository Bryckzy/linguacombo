import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navLinks = [
    { href: '#hero', label: 'Início' },
    { href: '#comparacao', label: 'Compare & Escolha' },
    { href: '#idiomas', label: 'Idiomas' },
    { href: '#pacotes', label: 'Pacotes Promocionais' },
    { href: '#sobre', label: 'Quem Somos' },
    { href: '#professores', label: 'Professor' },
    { href: '#contato', label: 'Fale Conosco' },
  ];

  return (
    <header className="bg-combo-red dark:bg-red-700 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#hero" className="text-3xl font-extrabold text-combo-yellow dark:text-yellow-400 tracking-tight">
          Língua<span className="text-white dark:text-gray-200">combo</span>
        </a>
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white dark:text-gray-200 hover:text-combo-yellow dark:hover:text-yellow-400 transition-colors duration-300 font-semibold px-2 py-1 text-sm lg:text-base rounded-md hover:bg-red-600 dark:hover:bg-red-800"
            >
              {link.label}
            </a>
          ))}
           <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full text-combo-yellow dark:text-yellow-400 hover:bg-red-600 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-combo-yellow dark:focus:ring-yellow-500 transition-all duration-300"
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
        </nav>
        {/* Basic Mobile Menu (can be improved with a proper hamburger icon and dropdown) */}
        <div className="md:hidden flex items-center">
            <select 
                onChange={(e) => window.location.href = e.target.value} 
                className="bg-combo-red dark:bg-red-700 text-white dark:text-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-combo-yellow dark:focus:ring-yellow-500"
                aria-label="Navegação Principal"
            >
                {navLinks.map(link => (
                    <option key={link.href} value={link.href}>{link.label}</option>
                ))}
            </select>
            <button
              onClick={toggleTheme}
              className="ml-3 p-2 rounded-full text-combo-yellow dark:text-yellow-400 hover:bg-red-600 dark:hover:bg-red-800 focus:outline-none focus:ring-1 focus:ring-combo-yellow dark:focus:ring-yellow-500 transition-all duration-300"
              aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
