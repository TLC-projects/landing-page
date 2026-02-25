import { Hand } from 'lucide-react';
import { EVENT } from '../interpreter/lib/constants';
import { i18n } from './lib/constants';
import { useEffect } from 'react';

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
    <button
      onClick={toggleInterpreter}
      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
        isVisible
          ? 'bg-accent-100 border-accent-600 text-accent-700'
          : 'bg-secondary-50 border-secondary-200 hover:bg-secondary-100 dark:hover:bg-primary-600/20'
      }`}
      aria-pressed={isVisible}>
      <span className="flex items-center gap-2">
        <Hand size={20} />
        <span className="font-medium">{i18n.interpreter}</span>
      </span>
      {isVisible && <span className="text-accent-600">✓</span>}
    </button>
  );
};
