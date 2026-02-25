import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button, DropdownMobile, Link } from '@components/ui';

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // 🔒 Bloquear scroll + Escape + restaurar foco
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
      triggerRef.current?.focus(); // devolver foco
    };
  }, [open]);

  return (
    <>
      {/* Botón hamburguesa */}
      <Button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        className="md:hidden p-2"
        aria-label="Abrir menú"
        aria-expanded={open}
        aria-controls="mobile-menu"
        variant={'ghost'}>
        <Menu size={28} />
      </Button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-primary-900/40 z-40 md:hidden" onClick={() => setOpen(false)} aria-hidden="true" />
      )}

      {/* Panel */}
      <div
        ref={panelRef}
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-72 bg-background shadow-xl z-50 transform transition-transform duration-300 md:hidden
        ${open ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title">

        <div className="flex justify-between items-center py-2 pl-6 pr-2 border-b border-gray-200">
          <span id="mobile-menu-title" className="font-semibold">
            Menú
          </span>
          <Button onClick={() => setOpen(false)} aria-label="Cerrar menú" variant="ghost">
            <X size={20} />
          </Button>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col gap-2 px-4 py-2">
          <Link href="/" onClick={() => setOpen(false)} variant={'ghost'} className="text-left">
            Inicio
          </Link>

          <DropdownMobile onNavigate={() => setOpen(false)} />

          <Link href="/quienes-somos" onClick={() => setOpen(false)} variant={'ghost'} className="text-left">
            Quiénes somos
          </Link>

          <Link href="/#contacto" onClick={() => setOpen(false)} variant={'ghost'} className="text-left">
            Contáctanos
          </Link>

          <Link href="/campus-virtual" onClick={() => setOpen(false)} className="text-left">
            Campus virtual
          </Link>
        </nav>
      </div>
    </>
  );
};
