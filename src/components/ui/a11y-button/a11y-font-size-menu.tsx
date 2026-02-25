import { Button } from '@components/ui';

import { i18n } from './lib/constants';
import type { BasicValuesType, ConfigA11y } from './types/types';

interface FontSizeMenuProps {
  config: ConfigA11y;
  setFontSize: (value: BasicValuesType) => void;
  setActiveTab: (tab: 'main') => void;
}

export const FontSizeMenu = ({ config, setFontSize, setActiveTab }: FontSizeMenuProps) => {
  return (
    <div className="space-y-3">
      <button onClick={() => setActiveTab('main')} className="text-accent-600 hover:text-accent-700 font-medium mb-2">
        ← Volver
      </button>
      <h4 className="font-semibold text-secondary-900 dark:text-secondary-500 mb-3">{i18n.fontSize}</h4>
      <div className="space-y-2">
        {(['1', '2', '3'] as BasicValuesType[]).map((size) => (
          <Button
            variant={config.fontSize === size ? 'default' : 'outline'}
            key={size}
            onClick={() => setFontSize(size)}
            className="w-full flex items-center justify-between p-3 rounded-lg border transition-all"
            aria-pressed={config.fontSize === size}>
            {i18n[`fontSize${size === '1' ? 'Small' : size === '2' ? 'Mid' : 'Big'}` as keyof typeof i18n]}
            {config.fontSize === size && <span className="text-current">✓</span>}
          </Button>
        ))}
      </div>
    </div>
  );
};
