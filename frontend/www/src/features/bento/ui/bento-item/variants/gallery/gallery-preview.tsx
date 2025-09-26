import { useEffect, useState } from "react";
import useCarousel from "~/shared/lib/hooks/useCarousel";
import { GalleryBadge } from "./gallery-badge";

interface BentoItemGalleryProps {
  itemId: string;
  activeSlide: number;
  setActiveSlide: (slide: number) => void;
}

export const BentoItemGalleryPreview = ({
  itemId,
  activeSlide,
  setActiveSlide,
}: BentoItemGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(activeSlide + 1);

  const [carouselRef, carouselInstance] = useCarousel({});

  // @ts-ignore
  useEffect(() => {
    if (carouselInstance) {
      const handleChange = () => {
        const index = carouselInstance.getPageIndex() + 1;
        setCurrentIndex(index);
        setActiveSlide(carouselInstance.getPageIndex());
      };

      carouselInstance.on("change", handleChange);

      return () => {
        carouselInstance.off("change", handleChange);
      };
    }
  }, [carouselInstance]);

  return (
    <div
      ref={(ref) => {
        carouselRef(ref);
      }}
      className="size-full relative"
      id={`bento-item-${itemId}-gallery-preview`}
    >
      <GalleryBadge
        currentIndex={currentIndex}
        total={carouselInstance?.getSlides().length || 0}
      />
      <div data-fancybox="gallery" className="f-carousel__slide h-full">
        <img
          className="size-full object-cover"
          src="https://i.scdn.co/image/ab67616d0000b27398d711627751989d1ae8b0fb"
          alt="Sample image #1"
        />
      </div>
      <div data-fancybox="gallery" className="f-carousel__slide h-full">
        <img
          className="size-full object-cover"
          src="https://cdn-images.dzcdn.net/images/cover/5f6b11f19edd3114d611cd0556d8eb83/1900x1900-000000-81-0-0.jpg"
          alt="Sample image #1"
        />
      </div>
      <div data-fancybox="gallery" className="f-carousel__slide h-full">
        <img
          className="size-full object-cover"
          src="https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/4f/4f/47/4f4f4733-7c38-a86c-d543-a74bc406ea09/198704489945_Cover.jpg/1200x630bb.jpg"
          alt="Sample image #1"
        />
      </div>
    </div>
  );
};
