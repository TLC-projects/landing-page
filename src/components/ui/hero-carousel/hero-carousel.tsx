import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Link } from '@/components/ui';

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  url?: string;
}

interface Props {
  slides: Slide[];
}

export const HeroCarousel: React.FC<Props> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const announceRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
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
      goToSlide(slides.length - 1);
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
    <section
      ref={carouselRef}
      className="relative h-125 md:h-150 w-full overflow-hidden"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Carrusel de imágenes destacadas"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}>
      <div ref={announceRef} className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        Slide {currentSlide + 1} de {slides.length}: {slides[currentSlide].title}
      </div>

      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} de ${slides.length}`}
            aria-hidden={!isActive}
            {...(!isActive && { inert: true })}
            className={`absolute inset-0 transition-opacity duration-700 ${
              isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})`
              }}
            />
            <div className="relative h-full flex items-center">
              <div className="u-wrapper mx-auto px-4 w-full">
                <div className="max-w-2xl text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-lg md:text-xl mb-6 max-w-lg">{slide.description}</p>
                  {slide.url && <Link href={slide.url}>Conoce más</Link>}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-secondary/10 hover:bg-secondary/20 backdrop-blur-sm text-white p-2 rounded-full transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
        aria-label={`Ir al slide anterior (${currentSlide === 0 ? slides.length : currentSlide} de ${slides.length})`}>
        <ChevronLeft size={32} aria-hidden="true" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-secondary/10 hover:bg-secondary/20 backdrop-blur-sm text-white p-2 rounded-full transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
        aria-label={`Ir al siguiente slide (${currentSlide + 2 > slides.length ? 1 : currentSlide + 2} de ${slides.length})`}>
        <ChevronRight size={32} aria-hidden="true" />
      </button>

      <button
        onClick={togglePlayPause}
        className="absolute top-4 right-4 bg-secondary/10 hover:bg-secondary/20 backdrop-blur-sm text-white p-2 rounded-full transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
        aria-label={isPlaying ? 'Pausar rotación automática' : 'Reproducir rotación automática'}>
        {isPlaying ? <Pause size={24} aria-hidden="true" /> : <Play size={24} aria-hidden="true" />}
      </button>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10"
        role="group"
        aria-label="Navegación de slides">
        {slides.map((_, index) => (
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
    </section>
  );
};
