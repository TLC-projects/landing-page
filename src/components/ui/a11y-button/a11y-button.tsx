import { useState, useRef, useEffect } from 'react';
import { Accessibility } from 'lucide-react';

import { Button } from '@components/ui';
import { useA11y } from './hooks/use-a11y';
import { i18n } from './lib/constants';
import type { BasicValuesType, ContrastType, TabType } from './types/types';
import { MainMenu } from './a11y-main-menu';
import { FontSizeMenu } from './a11y-font-size-menu';
import { LineHeightMenu } from './a11y-line-height-menu';
import { LetterSpacingMenu } from './a11y-letter-spacing-menu';
import { ContrastMenu } from './a11y-contrast-menu';

export const A11yButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('main');

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const { config, setConfig } = useA11y();

  const setFontSize = (value: BasicValuesType) => {
    setConfig('fontSize', value);
  };

  const setLineHeight = (value: BasicValuesType) => {
    setConfig('lineHeight', value);
  };

  const setLetterSpacing = (value: BasicValuesType) => {
    setConfig('letterSpacing', value);
  };

  const setContrast = (value: ContrastType) => {
    setConfig('contrast', value);
  };

  // Store the previously focused element before opening the dialog and restore focus when closing
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    } else if (previousActiveElement.current) {
      // Restaurar el foco al elemento previo al cerrar
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && buttonRef.current) {
        const target = event.target as Node;
        // Solo cerrar si el click es fuera del menú Y fuera del botón
        if (!menuRef.current.contains(target) && !buttonRef.current.contains(target)) {
          setIsOpen(false);
          setActiveTab('main');
        }
      }
    };

    /**
     * Function to handle Escape key press for closing the dialog or returning to main menu
     * @param event - KeyboardEvent triggered on keydown
     */
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        if (activeTab !== 'main') {
          setActiveTab('main');
        } else {
          setIsOpen(false);
          setActiveTab('main');
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, activeTab]);

  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const menuElement = menuRef.current.querySelector('#accessibility-menu');
    if (!menuElement) return;

    /**
     * Function to get all focusable elements within the dialog
     * @returns - Array of focusable HTMLElements
     */
    const getFocusableElements = () => {
      const focusableSelectors =
        'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])';
      return Array.from(menuElement.querySelectorAll(focusableSelectors)).filter((el) => {
        const htmlEl = el as HTMLElement;
        return htmlEl.offsetParent !== null; // Only visible elements
      }) as HTMLElement[];
    };

    /**
     * Function to handle Tab and Shift+Tab key presses for focus trapping within the dialog
     * @param event - KeyboardEvent triggered on keydown
     */
    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement;

      // Check if focus is outside the dialog - if so, move it to the first element
      if (!menuElement.contains(activeElement)) {
        event.preventDefault();
        firstElement.focus();
        return;
      }

      // Shift+Tab on the first element - move focus to the last element
      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
      // Tab on the last element - move focus to the first element
      else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    // Delay focus setting to ensure elements are rendered before trying to focus
    const timer = setTimeout(() => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        // Prioritize focusing the close button for better accessibility, fallback to first focusable element
        const closeBtn = closeButtonRef.current;
        if (closeBtn) {
          closeBtn.focus();
        } else {
          focusableElements[0].focus();
        }
      }
    }, 50);

    document.addEventListener('keydown', handleTabKey);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen, activeTab]);

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-50">
      <Button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="p-5 rounded-full"
        aria-label={isOpen ? 'Cerrar opciones de accesibilidad' : 'Abrir opciones de accesibilidad'}
        aria-expanded={isOpen}
        aria-controls="accessibility-menu"
        aria-haspopup="dialog">
        <Accessibility size={30} aria-hidden="true"/>
      </Button>

      {isOpen && (
        <div
          id="accessibility-menu"
          className="absolute bottom-full right-0 mb-4 bg-background rounded-lg shadow-xl p-5 w-80 max-h-128 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de accesibilidad"
          aria-describedby="a11y-instructions">
          <div className="flex items-center justify-between mb-4">
            <h3 id="a11y-dialog-title" className="font-bold text-secondary-900 text-lg">
              {i18n.title}
            </h3>
            <button
              ref={closeButtonRef}
              onClick={() => {
                setIsOpen(false);
                setActiveTab('main');
              }}
              className="text-secondary-400 hover:text-secondary-600 transition-colors p-2 min-w-11 min-h-11 flex items-center justify-center rounded hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
              aria-label="Cerrar menú de accesibilidad"
              type="button">
              <span aria-hidden="true" className="text-xl leading-none">
                ✕
              </span>
            </button>
          </div>

          {/* Instrucciones ocultas visualmente para lectores de pantalla */}
          <div id="a11y-instructions" className="sr-only">
            Menú de opciones de accesibilidad. Use las teclas Tab y Shift+Tab para navegar entre controles. Presione
            Escape para {activeTab !== 'main' ? 'volver al menú principal' : 'cerrar el menú'}.
          </div>

          <div className="relative">
            {activeTab === 'main' && <MainMenu config={config} setConfig={setConfig} setActiveTab={setActiveTab} />}
            {activeTab === 'fontSize' && (
              <FontSizeMenu config={config} setFontSize={setFontSize} setActiveTab={setActiveTab} />
            )}
            {activeTab === 'lineHeight' && (
              <LineHeightMenu config={config} setLineHeight={setLineHeight} setActiveTab={setActiveTab} />
            )}
            {activeTab === 'letterSpacing' && (
              <LetterSpacingMenu config={config} setLetterSpacing={setLetterSpacing} setActiveTab={setActiveTab} />
            )}
            {activeTab === 'contrast' && (
              <ContrastMenu config={config} setContrast={setContrast} setActiveTab={setActiveTab} />
            )}
          </div>

          {activeTab === 'main' && (
            <div className="pt-4 mt-4 border-t border-secondary-200" role="region" aria-label="Consejos de accesibilidad">
              <p className="text-xs text-secondary-600">
                <strong>Consejo:</strong> Usa Tab para navegar con teclado y Enter para activar elementos.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
