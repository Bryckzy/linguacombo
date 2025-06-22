import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggleButton from './ThemeToggleButton'; // Import the new toggle button

// Simple SVG Menu Icon (Hamburger)
const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

// Simple SVG Close Icon (X)
const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Header: React.FC = () => {
  const { theme } = useTheme(); // toggleTheme is now handled by ThemeToggleButton
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { href: '#hero', label: 'Início' },
    { href: '#comparacao', label: 'Compare & Escolha' },
    { href: '#idiomas', label: 'Idiomas' },
    { href: '#pacotes', label: 'Pacotes Promocionais' },
    { href: '#sobre', label: 'Quem Somos' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'; 
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false); 
  };

  const headerBaseClasses = "sticky top-0 z-50 transition-all duration-300";
  const headerDynamicClasses = isScrolled
    ? "bg-red-700 dark:bg-red-800 shadow-xl py-3"
    : "bg-combo-red dark:bg-red-700 shadow-lg py-4";

  return (
    <>
      <header className={`${headerBaseClasses} ${headerDynamicClasses}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#hero" className="text-3xl font-extrabold text-combo-yellow dark:text-yellow-400 tracking-tight" onClick={handleNavLinkClick}>
            Língua<span className="text-white dark:text-gray-200">combo</span>
          </a>

          {/* Desktop Navigation */}
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
            <div className="ml-4"> {/* Wrapper for positioning */}
              <ThemeToggleButton />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              ref={mobileMenuButtonRef}
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-combo-yellow dark:text-yellow-400 hover:bg-red-600 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-combo-yellow dark:focus:ring-yellow-500 transition-colors duration-300"
              aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu-drawer"
            >
              {isMenuOpen ? <CloseIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu-drawer"
        ref={mobileMenuRef}
        className={`md:hidden fixed top-0 right-0 h-full w-full max-w-xs bg-combo-red dark:bg-red-800 shadow-2xl p-6 pt-[${isScrolled ? '60px' : '68px'}] transform transition-transform duration-300 ease-in-out z-40 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className={`absolute top-0 left-0 w-full ${headerDynamicClasses} px-6 flex justify-between items-center h-[${isScrolled ? '60px' : '68px'}]`}>
             <h2 id="mobile-menu-title" className="text-xl font-bold text-combo-yellow dark:text-yellow-400 sr-only">Menu Principal</h2>
        </div>
        
        <nav className="flex flex-col space-y-5 mt-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white dark:text-gray-200 hover:text-combo-yellow dark:hover:text-yellow-400 transition-colors duration-300 font-semibold text-lg py-2 rounded-md text-center"
              onClick={handleNavLinkClick}
            >
              {link.label}
            </a>
          ))}
          {/* Theme Toggle Row in Mobile Menu */}
          <div className="mt-6 w-full flex items-center justify-between p-3 rounded-lg bg-red-600 dark:bg-red-900">
            <span className="font-semibold text-white dark:text-gray-200 select-none">
              {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
            </span>
            <ThemeToggleButton onToggleCallback={handleNavLinkClick} />
          </div>
        </nav>
      </div>
      {/* Overlay for background when menu is open */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 dark:bg-black/70 z-30 backdrop-blur-sm" 
          onClick={toggleMobileMenu}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default Header;
