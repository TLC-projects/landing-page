import { Carousel, Link } from '@components/ui';

export type Slide = {
  title: string;
  description: string;
  image: string;
  url?: string;
};

interface CommunicationProps {
  slides: Slide[];
}

export default function Communication({ slides }: CommunicationProps) {
  return (
    <Carousel className="h-150 lg:h-115 overflow-visible" autoPlay={false}>
      <Carousel.Slides>
        {slides.map((slide) => (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="h-80 md:h-96 w-full mx-auto">
                <img src={slide.image} alt={slide.title} className="w-full h-full" />
              </div>
              <div className="space-y-5">
                <h3 className="text-3xl font-bold text-secondary-900">{slide.title}</h3>
                <div className="prose prose-lg text-secondary-700">
                  <p>{slide.description}</p>
                </div>
                {slide.url && ( <Link href={slide.url}>Conoce más</Link>)}
              </div>
            </div>
          </>
        ))}
      </Carousel.Slides>

      <Carousel.PrevButton className="md:-left-14 bg-accent-600 hover:bg-accent-700" />
      <Carousel.NextButton className="md:-right-14 bg-accent-600 hover:bg-accent-700" />
      <Carousel.Navigation className="bottom-0 [&>*[aria-current=true]]:bg-accent-600" />
    </Carousel>
  );
}
