
import React from 'react';

const Header: React.FC = () => {
  const navLinks = [
    { href: '#hero', label: 'Início' },
    { href: '#combos', label: 'Nossos Combos' },
    { href: '#sobre', label: 'Sobre Nós' },
    { href: '#contato', label: 'Contato' },
  ];

  return (
    <header className="bg-combo-red shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#hero" className="text-3xl font-extrabold text-combo-yellow">
          Língua<span className="text-white">combo</span>
        </a>
        <nav className="space-x-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white hover:text-combo-yellow transition-colors duration-300 font-semibold"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
    