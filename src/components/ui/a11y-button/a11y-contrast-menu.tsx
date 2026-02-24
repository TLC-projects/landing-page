import { CONTRAST, i18n } from './lib/constants';
import type { ContrastType, ConfigA11y } from './types/types';

interface ContrastMenuProps {
  config: ConfigA11y;
  setContrast: (value: ContrastType) => void;
  setActiveTab: (tab: 'main') => void;
}

export const ContrastMenu = ({ config, setContrast, setActiveTab }: ContrastMenuProps) => {
  return (
    <div className="space-y-3">
      <button
        onClick={() => setActiveTab('main')}
        className="text-accent-600 hover:text-accent-700 font-medium mb-2"
      >
        ← Volver
      </button>
      <h4 className="font-semibold text-secondary-900 mb-3">{i18n.contrastTitle}</h4>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {Object.entries(CONTRAST).map(([key, value]) => {
          if (value === 'no-contrast') return null;
          const label = i18n[key as keyof typeof i18n] || key;
          return (
            <button
              key={value}
              onClick={() => setContrast(value as ContrastType)}
              className={`w-full p-3 rounded-lg border transition-all text-left ${
                config.contrast === value
                  ? 'bg-accent-100 border-accent-600 text-accent-700 font-medium'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
              aria-pressed={config.contrast === value}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
