import { Button } from '@components/ui';

import { i18n } from './lib/constants';
import type { BasicValuesType, ConfigA11y } from './types/types';

interface LetterSpacingMenuProps {
  config: ConfigA11y;
  setLetterSpacing: (value: BasicValuesType) => void;
  setActiveTab: (tab: 'main') => void;
}

export const LetterSpacingMenu = ({ config, setLetterSpacing, setActiveTab }: LetterSpacingMenuProps) => {
  return (
    <div className="space-y-3">
      <button onClick={() => setActiveTab('main')} className="text-accent-600 hover:text-accent-700 font-medium mb-2">
        ← Volver
      </button>
      <h4 className="font-semibold text-secondary-900 dark:text-secondary-500 mb-3">{i18n.letterSpacing}</h4>
      <div className="space-y-2">
        {(['1', '2', '3'] as BasicValuesType[]).map((size) => (
          <Button
            variant={config.letterSpacing === size ? 'default' : 'outline'}
            key={size}
            onClick={() => setLetterSpacing(size)}
            className="w-full flex items-center justify-between p-3 rounded-lg border transition-all"
            aria-pressed={config.letterSpacing === size}>
            {i18n[`letterSpacing${size === '1' ? 'Small' : size === '2' ? 'Mid' : 'Big'}` as keyof typeof i18n]}
            {config.letterSpacing === size && <span className="text-current">✓</span>}
          </Button>
        ))}
      </div>
    </div>
  );
};
