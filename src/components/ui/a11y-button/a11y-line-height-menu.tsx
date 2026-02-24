import { i18n } from './lib/constants';
import type { BasicValuesType, ConfigA11y } from './types/types';

interface LineHeightMenuProps {
  config: ConfigA11y;
  setLineHeight: (value: BasicValuesType) => void;
  setActiveTab: (tab: 'main') => void;
}

export const LineHeightMenu = ({ config, setLineHeight, setActiveTab }: LineHeightMenuProps) => {
  return (
    <div className="space-y-3">
      <button
        onClick={() => setActiveTab('main')}
        className="text-accent-600 hover:text-accent-700 font-medium mb-2"
      >
        ← Volver
      </button>
      <h4 className="font-semibold text-secondary-900 mb-3">{i18n.lineHeight}</h4>
      <div className="space-y-2">
        {(['1', '2', '3'] as BasicValuesType[]).map((size) => (
          <button
            key={size}
            onClick={() => setLineHeight(size)}
            className={`w-full p-3 rounded-lg border transition-all ${
              config.lineHeight === size
                ? 'bg-accent-100 border-accent-600 text-accent-700 font-medium'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
            aria-pressed={config.lineHeight === size}
          >
            {i18n[`lineHeight${size === '1' ? 'Small' : size === '2' ? 'Mid' : 'Big'}` as keyof typeof i18n]}
          </button>
        ))}
      </div>
    </div>
  );
};
