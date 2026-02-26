import { Button } from '@components/ui';

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
      <button onClick={() => setActiveTab('main')} className="text-accent-600 hover:text-accent-700 font-medium mb-2">
        ← Volver
      </button>
      <h4 className="font-semibold text-secondary-900 dark:text-secondary-500 mb-3">{i18n.contrastTitle}</h4>
      <div className="space-y-2 max-h-64 pr-2 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-secondary-600/20 [&::-webkit-scrollbar-thumb]:bg-secondary-700 [&::-webkit-scrollbar-thumb]:rounded-full">
        {Object.entries(CONTRAST).map(([key, value]) => {
          if (value === 'no-contrast') return null;
          const label = i18n[key as keyof typeof i18n] || key;
          return (
            <Button
              variant={config.contrast === value ? 'default' : 'outline'}
              key={value}
              onClick={() => setContrast(value as ContrastType)}
              className="w-full flex items-center justify-between p-3 rounded-lg border transition-all"
              aria-pressed={config.contrast === value}>
              {label}
              {config.contrast === value && <span className="text-current">✓</span>}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
