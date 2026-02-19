import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useCleanup } from '@hooks/use-cleanup';

import css from './button.module.css';

const FADE_DURATION = 400;
const RIPPLE_DURATION = 300;
const RIPPLE_DELAY = 50;
const MAX_RIPPLE_AGE = FADE_DURATION + RIPPLE_DURATION + RIPPLE_DELAY;

interface Ripple {
  id: number;
  axisX: number;
  axisY: number;
  timestamp: number;
}

export const Button = ({ className, onClick, ...props }: React.ComponentProps<'button'>) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [interactionCount, setInteractionCount] = useState(0);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleIdRef = useRef(0);

  // Use cleanup hook to remove old ripples
  useCleanup<Ripple>(interactionCount, setRipples, MAX_RIPPLE_AGE);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    // Check for reduced motion preference
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      return;
    }

    const boundingBox = button.getBoundingClientRect();

    const cursorPoint = {
      x: event.clientX,
      y: event.clientY
    };

    const wrapperPoint = {
      x: boundingBox.left + boundingBox.width / 2,
      y: boundingBox.top + boundingBox.height / 2
    };

    const axisX = cursorPoint.x - wrapperPoint.x;
    const axisY = cursorPoint.y - wrapperPoint.y;

    // Create ripple object
    const particleId = ++rippleIdRef.current;
    const newRipple: Ripple = {
      id: particleId,
      axisX,
      axisY,
      timestamp: Date.now()
    };

    // Add ripple to state
    setRipples((prev) => [...prev, newRipple]);

    // Increment interaction count to trigger cleanup debounce
    setInteractionCount((prev) => prev + 1);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(event);
    onClick?.(event);
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        'px-6 py-2 relative overflow-hidden bg-accent-600 hover:bg-accent-700 text-white text-sm font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2',
        css.button,
        className
      )}
      onClick={handleClick}
      data-ripple
      {...props}>
      {props.children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={css.ripple}
          style={
            {
              '--axisX': `${ripple.axisX}px`,
              '--axisY': `${ripple.axisY}px`,
              '--pop-ripple-duration': `${RIPPLE_DURATION}ms`,
              '--fade-duration': `${FADE_DURATION}ms`,
              '--fade-delay': `${RIPPLE_DURATION + RIPPLE_DELAY}ms`
            } as React.CSSProperties
          }
        />
      ))}
    </button>
  );
};
