import React, { useState, useEffect, useRef, Children } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { CarouselProvider, useCarouselContext } from './carousel-context';
import { cn } from '@/lib/utils';

interface Props {
  children?: React.ReactNode;
  className?: string;
  autoPlay?: boolean;
}

interface CarouselComponent extends React.FC<Props> {
  Slides: React.FC<{ children: React.ReactNode, className?: string }>;
  PrevButton: React.FC<React.ComponentProps<'button'>>;
  NextButton: React.FC<React.ComponentProps<'button'>>;
  PlayPauseButton: React.FC<React.ComponentProps<'button'>>;
  Navigation: React.FC<{ className?: string }>;
}

const CarouselRoot: React.FC<Props> = ({ children, className, autoPlay = true }) => {
  const [slides, setSlides] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const announceRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides) % slides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSetSlidesNumber = (n: number) => {
    setSlides(n);
  };

  /**
   * Function to handle keyboard navigation for the carousel. It listens for arrow keys to navigate between slides,
   * as well as Home and End keys to jump to the first and last slides respectively.
   *
   * @param e - The keyboard event triggered when a key is pressed while the carousel is focused.
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(slides - 1);
    }
  };

  // Auto-play effect - only when playing and not hovered/focused
  useEffect(() => {
    if (!isPlaying || isHovered || isFocused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, isPlaying, isHovered, isFocused]);

  return (
    <CarouselProvider
      value={{
        setSlidesNumber: handleSetSlidesNumber,
        currentSlide,
        slides,
        nextSlide,
        prevSlide,
        goToSlide,
        togglePlayPause,
        isPlaying
      }}>
      <section
        ref={carouselRef}
        className={cn('relative h-125 md:h-150 w-full overflow-hidden', className)}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Carrusel de imágenes destacadas"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}>
        <div ref={announceRef} className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          Slide {currentSlide + 1} de {slides}
        </div>

        {children}
      </section>
    </CarouselProvider>
  );
};

// Internal component to render slides with proper accessibility
const Slides: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const { currentSlide, setSlidesNumber } = useCarouselContext();

  useEffect(() => {
    const count = Children.count(children);
    setSlidesNumber(count);
  }, [children, setSlidesNumber]);

  return Children.map(children, (child, index) => {
    const isActive = index === currentSlide;
    return (
      <div
        role="group"
        aria-roledescription="slide"
        aria-label={`${index + 1} de ${Children.count(children)}`}
        aria-hidden={!isActive}
        {...(!isActive && { inert: true })}
        className={cn(
          `absolute inset-0 transition-opacity duration-700 ${
            isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`,
          className
        )}>
        {child}
      </div>
    );
  });
};

// Previous button component
const PrevButton: React.FC<React.ComponentProps<'button'>> = ({ className, children, ...props }) => {
  const { prevSlide, currentSlide, slides } = useCarouselContext();

  return (
    <button
      onClick={prevSlide}
      className={cn(
        'absolute left-4 top-1/2 -translate-y-1/2 bg-secondary/10 hover:bg-secondary/20 backdrop-blur-sm text-white p-2 rounded-full transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent',
        className
      )}
      aria-label={`Ir al slide anterior (${currentSlide === 0 ? slides : currentSlide} de ${slides})`}
      {...props}>
      {children || <ChevronLeft size={32} aria-hidden="true" />}
    </button>
  );
};

// Next button component
const NextButton: React.FC<React.ComponentProps<'button'>> = ({ className, children, ...props }) => {
  const { nextSlide, currentSlide, slides } = useCarouselContext();

  return (
    <button
      onClick={nextSlide}
      className={cn(
        'absolute right-4 top-1/2 -translate-y-1/2 bg-secondary/10 hover:bg-secondary/20 backdrop-blur-sm text-white p-2 rounded-full transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent',
        className
      )}
      aria-label={`Ir al siguiente slide (${currentSlide + 2 > slides ? 1 : currentSlide + 2} de ${slides})`}
      {...props}>
      {children || <ChevronRight size={32} aria-hidden="true" />}
    </button>
  );
};

// Play/Pause button component
const PlayPauseButton: React.FC<React.ComponentProps<'button'>> = ({ className, ...props }) => {
  const { togglePlayPause, isPlaying } = useCarouselContext();

  return (
    <button
      onClick={togglePlayPause}
      className={cn(
        'absolute top-4 right-4 bg-secondary/10 hover:bg-secondary/20 backdrop-blur-sm text-white p-2 rounded-full transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent',
        className
      )}
      aria-label={isPlaying ? 'Pausar rotación automática' : 'Reproducir rotación automática'}
      {...props}>
      {isPlaying ? <Pause size={24} aria-hidden="true" /> : <Play size={24} aria-hidden="true" />}
    </button>
  );
};

// Navigation dots component
const Navigation: React.FC<{ className?: string }> = ({ className }) => {
  const { slides, currentSlide, goToSlide } = useCarouselContext();

  return (
    <div
      className={cn('absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10', className)}
      role="group"
      aria-label="Navegación de slides">
      {Array.from({ length: slides }).map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent ${
            index === currentSlide ? 'bg-white w-8' : 'bg-secondary/50 hover:bg-secondary/75'
          }`}
          aria-label={`Ir al slide ${index + 1}`}
          aria-current={index === currentSlide ? 'true' : 'false'}
        />
      ))}
    </div>
  );
};

export const Carousel = CarouselRoot as CarouselComponent;

Carousel.Slides = Slides;
Carousel.PrevButton = PrevButton;
Carousel.NextButton = NextButton;
Carousel.PlayPauseButton = PlayPauseButton;
Carousel.Navigation = Navigation;
