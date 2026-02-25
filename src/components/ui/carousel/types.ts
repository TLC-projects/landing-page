

export interface CarouselContextType {
    setSlidesNumber: (n: number) => void;
    currentSlide: number;
    slides: number;
    nextSlide: () => void;
    prevSlide: () => void;
    goToSlide: (index: number) => void;
    togglePlayPause: () => void;
    isPlaying: boolean;
}
