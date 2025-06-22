import React from 'react';

const Header: React.FC = () => {
  const navLinks = [
    { href: '#hero', label: 'Início' },
    { href: '#comparacao', label: 'Compare & Escolha' },
    { href: '#idiomas', label: 'Idiomas' }, // Changed from Nossos Combos, href to #idiomas
    { href: '#pacotes', label: 'Pacotes Promocionais' }, // New link
    { href: '#sobre', label: 'Quem Somos' },
    { href: '#contato', label: 'Fale Conosco' },
  ];

  return (
    <header className="bg-combo-red shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#hero" className="text-3xl font-extrabold text-combo-yellow tracking-tight">
          Língua<span className="text-white">combo</span>
        </a>
        <nav className="hidden md:flex space-x-1 lg:space-x-2"> {/* Adjusted spacing for more links */}
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white hover:text-combo-yellow transition-colors duration-300 font-semibold px-2 py-1 text-sm lg:text-base rounded-md hover:bg-red-700/50"
            >
              {link.label}
            </a>
          ))}
        </nav>
        {/* Basic Mobile Menu (can be improved with a proper hamburger icon and dropdown) */}
        <div className="md:hidden">
            <select 
                onChange={(e) => window.location.href = e.target.value} 
                className="bg-combo-red text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-combo-yellow"
                aria-label="Navegação Principal"
            >
                {navLinks.map(link => (
                    <option key={link.href} value={link.href}>{link.label}</option>
                ))}
            </select>
        </div>
      </div>
    </header>
  );
};

export default Header;