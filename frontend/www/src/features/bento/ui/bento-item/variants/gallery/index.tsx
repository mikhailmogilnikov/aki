import { useEffect, useState } from "react";
import useCarousel from "~/shared/lib/hooks/useCarousel";
import useFancybox from "~/shared/lib/hooks/useFancybox";

export const BentoItemGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const [fancyboxRef] = useFancybox({});

  const [carouselRef, carouselInstance] = useCarousel({});

  // @ts-ignore
  useEffect(() => {
    if (carouselInstance) {
      const handleChange = () => {
        const index = carouselInstance.getPageIndex() + 1;
        setCurrentIndex(index);
      };

      carouselInstance.on("change", handleChange);

      console.log(carouselInstance.getSlides());

      return () => {
        carouselInstance.off("change", handleChange);
      };
    }
  }, [carouselInstance]);

  return (
    <div
      ref={(ref) => {
        carouselRef(ref);
        fancyboxRef?.(ref);
      }}
      className="size-full relative"
    >
      <div className="absolute top-3 right-3 bg-foreground/40 backdrop-blur-lg text-background px-1.5 py-0.5 rounded-full">
        <p className="text-sm font-medium">
          {currentIndex}/{carouselInstance?.getSlides().length}
        </p>
      </div>
      <a
        data-fancybox="gallery"
        className="f-carousel__slide h-full"
        href="https://i.scdn.co/image/ab67616d0000b27398d711627751989d1ae8b0fb"
      >
        <img
          className="size-full object-cover"
          src="https://i.scdn.co/image/ab67616d0000b27398d711627751989d1ae8b0fb"
          alt="Sample image #1"
        />
      </a>
      <a
        data-fancybox="gallery"
        className="f-carousel__slide h-full"
        href="https://i.scdn.co/image/ab67616d0000b27398d711627751989d1ae8b0fb"
      >
        <img
          className="size-full object-cover"
          src="https://i.scdn.co/image/ab67616d0000b27398d711627751989d1ae8b0fb"
          alt="Sample image #1"
        />
      </a>
    </div>
  );
};
