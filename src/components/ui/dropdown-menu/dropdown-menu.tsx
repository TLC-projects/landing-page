import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@components/ui';

export const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    /**
     * Function to handle clicks outside the dropdown menu.
     * It checks if the click event target is outside the dropdown menu and, if so, it closes the menu by setting 'isOpen' to false.
     * @param event - The mouse event triggered when a click occurs anywhere in the document.
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    /**
     * Function to handle the 'Escape' key press.
     * It listens for the 'Escape' key and, if the dropdown menu is open, it closes the menu and returns focus to the button.
     * @param event - The keyboard event triggered when a key is pressed while the dropdown menu is open.
     */
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

  /**
   * Function to toggle the dropdown menu open and closed.
   * It updates the 'isOpen' state to show or hide the menu when the button is clicked.
   */
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Function to handle keyboard navigation for the dropdown button. It listens for 'Enter' and 'Space' keys to toggle the dropdown menu.
   * @param event - The keyboard event triggered when a key is pressed while the button is focused.
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        ref={buttonRef}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Menú de oferta académica"
        className=" flex items-center gap-1">
        Oferta académica
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </Button>

      {isOpen && (
        <div
          className="absolute left-0 mt-2 w-64 bg-popover rounded-md shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          role="menu"
          aria-orientation="vertical">
          <div className="py-2">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase" role="presentation">
              Programas
            </div>
            <a
              href="/programas/ingles-mundo"
              className="block px-4 py-2 text-sm hover:bg-accent-100/20 hover:text-accent-600 transition-colors focus:outline-none focus:bg-accent-100/20 focus:text-primary-600"
              role="menuitem"
              onClick={() => setIsOpen(false)}>
              Inglés en el Mundo
            </a>
            <a
              href="/programas/frances"
              className="block px-4 py-2 text-sm hover:bg-accent-100/20 hover:text-accent-600 transition-colors focus:outline-none focus:bg-accent-100/20 focus:text-primary-600"
              role="menuitem"
              onClick={() => setIsOpen(false)}>
              Francés
            </a>

            <div className="border-t border-gray-200 my-2" role="presentation"></div>

            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase" role="presentation">
              Cursos
            </div>
            <a
              href="/programas/capacitacion-docente"
              className="block px-4 py-2 text-sm hover:bg-accent-100/20 hover:text-accent-600 transition-colors focus:outline-none focus:bg-accent-100/20 focus:text-primary-600"
              role="menuitem"
              onClick={() => setIsOpen(false)}>
              Capacitación docente
            </a>
            <a
              href="/programas/fundamentos"
              className="block px-4 py-2 text-sm hover:bg-accent-100/20 hover:text-accent-600 transition-colors focus:outline-none focus:bg-accent-100/20 focus:text-primary-600"
              role="menuitem"
              onClick={() => setIsOpen(false)}>
              Enseñanza del Inglés en Colombia
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
