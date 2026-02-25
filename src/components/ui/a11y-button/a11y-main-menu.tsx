import { Type, AlignLeft, LetterText, Moon, Eye, AudioLines } from 'lucide-react';
import { i18n } from './lib/constants';
import type { ConfigA11y } from './types/types';

import { A11yInterpreter } from './a11y-interpreter';
import { Button } from '@components/ui';

interface MainMenuProps {
  config: ConfigA11y;
  setConfig: (property: keyof ConfigA11y, value?: string | boolean) => void;
  setActiveTab: (tab: 'fontSize' | 'lineHeight' | 'letterSpacing' | 'contrast') => void;
}

export const MainMenu = ({ config, setConfig, setActiveTab }: MainMenuProps) => {
  const toggleInterpreter = (value: boolean) => {
    setConfig('interpreter', value);
  };

  return (
    <div className="space-y-3">
      {/* Toggle buttons */}
      <Button
        variant={config.darkMode ? 'default' : 'outline'}
        onClick={() => setConfig('darkMode')}
        size="lg"
        className="w-full flex items-center justify-between p-3 rounded-lg border transition-all"
        aria-pressed={config.darkMode}>
        <span className="flex items-center gap-2">
          <Moon size={20} />
          <span className="font-medium">{i18n.darkMode}</span>
        </span>
        {config.darkMode && <span className="text-current">✓</span>}
      </Button>
      <A11yInterpreter isVisible={config.interpreter} updateVisibility={toggleInterpreter} />
      <Button
        variant={config.audio ? 'default' : 'outline'}
        onClick={() => setConfig('audio')}
        size="lg"
        className="w-full flex items-center justify-between p-3 rounded-lg border transition-all"
        aria-pressed={config.audio}>
        <span className="flex items-center gap-2">
          <AudioLines size={20} />
          <span className="font-medium">{i18n.audio}</span>
        </span>
        {config.audio && <span className="text-current">✓</span>}
      </Button>

      {/* Navigation buttons */}
      <Button
        variant="outline"
        onClick={() => setActiveTab('fontSize')}
        size="lg"
        className="w-full flex items-center justify-between p-3 rounded-lg transition-all">
        <span className="flex items-center gap-2">
          <Type size={20} />
          <span className="font-medium">{i18n.fontSize}</span>
        </span>
        <span className="text-secondary-400">→</span>
      </Button>

      <Button
        variant="outline"
        onClick={() => setActiveTab('lineHeight')}
        size="lg"
        className="w-full flex items-center justify-between p-3 rounded-lg transition-all">
        <span className="flex items-center gap-2">
          <AlignLeft size={20} />
          <span className="font-medium">{i18n.lineHeight}</span>
        </span>
        <span className="text-secondary-400">→</span>
      </Button>

      <Button
        variant="outline"
        onClick={() => setActiveTab('letterSpacing')}
        size="lg"
        className="w-full flex items-center justify-between p-3 rounded-lg transition-all">
        <span className="flex items-center gap-2">
          <LetterText size={20} />
          <span className="font-medium">{i18n.letterSpacing}</span>
        </span>
        <span className="text-secondary-400">→</span>
      </Button>

      <Button
        variant="outline"
        onClick={() => setActiveTab('contrast')}
        size="lg"
        className="w-full flex items-center justify-between p-3 rounded-lg transition-all">
        <span className="flex items-center gap-2">
          <Eye size={20} />
          <span className="font-medium">{i18n.contrast}</span>
        </span>
        <span className="text-secondary-400">→</span>
      </Button>
    </div>
  );
};
