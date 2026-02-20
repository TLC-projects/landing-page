import React from 'react';
import { cn } from '@/lib/utils';

import css from './message-card.module.css';

interface MessageCardProps {
  children?: React.ReactNode;
  side?: 'left' | 'right';
  className?: string;
}

export const MessageCard = ({ children, side = 'left', className }: MessageCardProps) => {
  return (
    <div data-side={side} className={cn(`relative bg-[#EFF7FB] rounded-2xl p-8 ${css['message-card']}`, className)}>
      {children}
    </div>
  );
};
