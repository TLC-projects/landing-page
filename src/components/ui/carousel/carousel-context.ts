import { createContext } from '@/lib/createcontext';
import type { CarouselContextType } from './types';

export const [CarouselProvider, useCarouselContext] = createContext<CarouselContextType>({
  name: 'CarouselContext'
});
