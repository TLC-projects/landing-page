import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '../button';

interface DropdownMobileProps {
  onNavigate?: () => void; // callback para cerrar menú al navegar
}

export const DropdownMobile: React.FC<DropdownMobileProps> = ({ onNavigate }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Botón principal */}
      <Button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-2 text-left"
        aria-expanded={open}
        variant={'ghost'}>
        Oferta académica
        <ChevronDown size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </Button>

      {/* Submenu */}
      <div
        className={`flex flex-col overflow-hidden transition-all duration-300 ${open ? 'max-h-96 mt-2' : 'max-h-0'}`}
        role="menu">
        <span className="px-4 py-2 text-xs font-semibold text-secondary-500 uppercase" role="presentation">
          Programas
        </span>

        <a
          href="/programas/ingles-mundo"
          className="block px-4 py-2 text-sm hover:bg-accent-100/20 hover:text-accent-600 transition-colors focus:outline-none focus:bg-accent-100/20 focus:text-primary-600"
          role="menuitem"
          tabIndex={open ? 0 : -1}
          onClick={onNavigate}>
          Inglés en el Mundo
        </a>

        <a
          href="/programas/frances"
          className="block px-4 py-2 text-sm hover:bg-accent-100/20 hover:text-accent-600 transition-colors focus:outline-none focus:bg-accent-100/20 focus:text-primary-600"
          role="menuitem"
          tabIndex={open ? 0 : -1}
          onClick={onNavigate}>
          Francés
        </a>

        <div className="border-t border-gray-200 my-2" role="presentation"></div>

        <span className="px-4 py-2 text-xs font-semibold text-secondary-500 uppercase" role="presentation">
          Cursos
        </span>

        <a
          href="/programas/capacitacion-docente"
          className="block px-4 py-2 text-sm hover:bg-accent-100/20 hover:text-accent-600 transition-colors focus:outline-none focus:bg-accent-100/20 focus:text-primary-600"
          role="menuitem"
          tabIndex={open ? 0 : -1}
          onClick={onNavigate}>
          Capacitación docente
        </a>

        <a
          href="/programas/fundamentos"
          className="block px-4 py-2 text-sm hover:bg-accent-100/20 hover:text-accent-600 transition-colors focus:outline-none focus:bg-accent-100/20 focus:text-primary-600"
          role="menuitem"
          tabIndex={open ? 0 : -1}
          onClick={onNavigate}>
          Enseñanza del Inglés en Colombia
        </a>
      </div>
    </div>
  );
};
