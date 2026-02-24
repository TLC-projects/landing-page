import { Type, AlignLeft, LetterText, Moon, PauseCircle, Eye, AudioLines } from 'lucide-react';
import { i18n } from './lib/constants';
import type { ConfigA11y } from './types/types';

interface MainMenuProps {
  config: ConfigA11y;
  setConfig: (property: keyof ConfigA11y, value?: string | boolean) => void;
  setActiveTab: (tab: 'fontSize' | 'lineHeight' | 'letterSpacing' | 'contrast') => void;
}

export const MainMenu = ({ config, setConfig, setActiveTab }: MainMenuProps) => {
  return (
    <div className="space-y-3">
      {/* Toggle buttons */}
      <button
        onClick={() => setConfig('darkMode')}
        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
          config.darkMode
            ? 'bg-accent-100 border-accent-600 text-accent-700'
            : 'bg-secondary-50 border-secondary-200 hover:bg-secondary-100 dark:hover:bg-primary-600/20'
        }`}
        aria-pressed={config.darkMode}
      >
        <span className="flex items-center gap-2">
          <Moon size={20} />
          <span className="font-medium">{i18n.darkMode}</span>
        </span>
        {config.darkMode && <span className="text-accent-600">✓</span>}
      </button>

      <button
        onClick={() => setConfig('audio')}
        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
          config.audio
            ? 'bg-accent-100 border-accent-600 text-accent-700'
            : 'bg-secondary-50 border-secondary-200 hover:bg-secondary-100 dark:hover:bg-primary-600/20'
        }`}
        aria-pressed={config.audio}
      >
        <span className="flex items-center gap-2">
          <AudioLines size={20} />
          <span className="font-medium">{i18n.audio}</span>
        </span>
        {config.audio && <span className="text-accent-600">✓</span>}
      </button>

      {/* Navigation buttons */}
      <button
        onClick={() => setActiveTab('fontSize')}
        className="w-full flex items-center justify-between p-3 rounded-lg border border-secondary-200 bg-secondary-50 hover:bg-secondary-100 dark:hover:bg-primary-600/20 transition-all"
      >
        <span className="flex items-center gap-2">
          <Type size={20} />
          <span className="font-medium">{i18n.fontSize}</span>
        </span>
        <span className="text-secondary-400">→</span>
      </button>

      <button
        onClick={() => setActiveTab('lineHeight')}
        className="w-full flex items-center justify-between p-3 rounded-lg border border-secondary-200 bg-secondary-50 hover:bg-secondary-100 dark:hover:bg-primary-600/20 transition-all"
      >
        <span className="flex items-center gap-2">
          <AlignLeft size={20} />
          <span className="font-medium">{i18n.lineHeight}</span>
        </span>
        <span className="text-secondary-400">→</span>
      </button>

      <button
        onClick={() => setActiveTab('letterSpacing')}
        className="w-full flex items-center justify-between p-3 rounded-lg border border-secondary-200 bg-secondary-50 hover:bg-secondary-100 dark:hover:bg-primary-600/20 transition-all"
      >
        <span className="flex items-center gap-2">
          <LetterText size={20} />
          <span className="font-medium">{i18n.letterSpacing}</span>
        </span>
        <span className="text-secondary-400">→</span>
      </button>

      <button
        onClick={() => setActiveTab('contrast')}
        className="w-full flex items-center justify-between p-3 rounded-lg border border-secondary-200 bg-secondary-50 hover:bg-secondary-100 dark:hover:bg-primary-600/20 transition-all"
      >
        <span className="flex items-center gap-2">
          <Eye size={20} />
          <span className="font-medium">{i18n.contrast}</span>
        </span>
        <span className="text-secondary-400">→</span>
      </button>
    </div>
  );
};
