import { Button } from '@components/ui';
import { Hand } from 'lucide-react';

import { EVENT } from '../interpreter/lib/constants';
import { i18n } from './lib/constants';

interface A11yInterpreterProps {
  isVisible: boolean;
  updateVisibility: (value: boolean) => void;
}

export const A11yInterpreter: React.FC<A11yInterpreterProps> = ({ isVisible, updateVisibility }) => {
  const toggleInterpreter = () => {
    const newState = !isVisible;

    updateVisibility(!isVisible);
    // Dispatch custom event to toggle interpreter visibility
    const event = new CustomEvent(EVENT.VISIBILITY, {
      detail: { hidden: !newState },
      bubbles: true,
      cancelable: true
    });
    document.dispatchEvent(event);
  };

  return (
    <Button
      variant={isVisible ? 'default' : 'outline'}
      onClick={toggleInterpreter}
      size="lg"
      className="w-full flex items-center justify-between p-3 rounded-lg border transition-all"
      aria-pressed={isVisible}>
      <span className="flex items-center gap-2">
        <Hand size={20} />
        <span className="font-medium">{i18n.interpreter}</span>
      </span>
      {isVisible && <span className="text-current">✓</span>}
    </Button>
  );
};
