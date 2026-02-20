import { useRef, useState, useEffect, useImperativeHandle } from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { useCleanup } from '@hooks/use-cleanup';

import css from './button.module.css';

export const FADE_DURATION = 400;
export const RIPPLE_DURATION = 300;
export const RIPPLE_DELAY = 50;
export const MAX_RIPPLE_AGE = FADE_DURATION + RIPPLE_DURATION + RIPPLE_DELAY;

export interface Ripple {
  id: number;
  axisX: number;
  axisY: number;
  timestamp: number;
}

export const buttonVariants = cva(
  'relative overflow-hidden text-sm text-center font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-accent-600 hover:bg-accent-700 text-white focus:ring-accent-500',
        outline: 'bg-transparent border border-gray-300 hover:bg-secondary-100 text-gray-700 focus:ring-gray-500',
        ghost: 'bg-transparent hover:bg-accent-100/20 hover:text-accent-600 focus:ring-accent-500',
        secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white focus:ring-secondary-500'
      },
      size: {
        default: 'px-4 py-2',
        xs: 'px-2 py-1',
        sm: 'px-3 py-1.5',
        lg: 'px-8 py-3 text-md',
        icon: 'p-2'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export const Button = ({
  className,
  onClick,
  variant = 'default',
  size = 'default',
  ref,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [interactionCount, setInteractionCount] = useState(0);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleIdRef = useRef(0);

  // Expose the button element through ref
  useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement, []);

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
      className={cn(buttonVariants({ variant, size }), className)}
      onClick={handleClick}
      data-ripple
      data-variant={variant}
      {...props}>
      {props.children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={css.ripple}
           data-variant={variant}
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
