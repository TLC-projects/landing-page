import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Menú de oferta académica"
      >
        Oferta académica
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-2">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase" role="presentation">
              Programas
            </div>
            <a
              href="/programas/ingles-mundo"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors focus:outline-none focus:bg-blue-50 focus:text-blue-600"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              Inglés en el Mundo
            </a>
            <a
              href="/programas/frances"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors focus:outline-none focus:bg-blue-50 focus:text-blue-600"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              Francés
            </a>

            <div className="border-t border-gray-200 my-2" role="presentation"></div>
            
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase" role="presentation">
              Cursos
            </div>
            <a
              href="/programas/capacitacion-docente"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors focus:outline-none focus:bg-blue-50 focus:text-blue-600"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              Capacitación docente
            </a>
            <a
              href="/programas/fundamentos"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors focus:outline-none focus:bg-blue-50 focus:text-blue-600"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              Enseñanza del Inglés en Colombia
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
