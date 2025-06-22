import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

interface ThemeToggleButtonProps {
  onToggleCallback?: () => void;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ onToggleCallback }) => {
  const { theme, toggleTheme: contextToggleTheme } = useTheme();
  const isSiteCurrentlyDark = theme === 'dark';

  const handleToggle = () => {
    contextToggleTheme();
    if (onToggleCallback) {
      onToggleCallback();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        relative inline-flex items-center h-8 w-14 flex-shrink-0 rounded-full p-0.5
        transition-colors duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-combo-yellow focus:ring-offset-2
        ${
          isSiteCurrentlyDark // If the SITE THEME is dark
            ? 'bg-gray-700 dark:focus:ring-offset-red-700' // Dark gray track, focus offset for dark header
            : 'bg-red-300 focus:ring-offset-combo-red'     // Light red track, focus offset for light header
        }
      `}
      aria-label={isSiteCurrentlyDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      title={isSiteCurrentlyDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      <span className="sr-only">
        {isSiteCurrentlyDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      </span>
      {/* Thumb */}
      <span
        className={`
          inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0
          transition-transform duration-300 ease-in-out
          flex items-center justify-center
          ${isSiteCurrentlyDark ? 'translate-x-[1.5rem]' : 'translate-x-0'}
        `}
      >
        {/* Sun Icon: Visible when the site theme is LIGHT (isSiteCurrentlyDark is false) */}
        <SunIcon
          className={`
            h-5 w-5 text-yellow-500 /* Vibrant yellow for the sun */
            transition-all duration-300 ease-in-out
            ${isSiteCurrentlyDark ? 'opacity-0 scale-0 rotate-90' : 'opacity-100 scale-100 rotate-0'}
          `}
        />
        {/* Moon Icon: Visible when the site theme is DARK (isSiteCurrentlyDark is true) */}
        <MoonIcon
          className={`
            absolute h-5 w-5 text-yellow-400 /* Slightly softer yellow for the moon */
            transition-all duration-300 ease-in-out
            ${isSiteCurrentlyDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 -rotate-90'}
          `}
        />
      </span>
    </button>
  );
};

export default ThemeToggleButton;