import { Carousel, Link, Audio } from '@components/ui';

export type Slide = {
  title: string;
  description: string;
  image: string;
  url?: string;
};

interface HeroCarouselProps {
  slides: Slide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  return (
    <Carousel>
      <Audio a11y className="mx-auto mt-5" src="" />
      <Carousel.Slides>
        {slides.map((slide) => (
          <>
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
          </>
        ))}
      </Carousel.Slides>

      <Carousel.PrevButton />
      <Carousel.NextButton />
      <Carousel.PlayPauseButton />
      <Carousel.Navigation />
    </Carousel>
  );
}
