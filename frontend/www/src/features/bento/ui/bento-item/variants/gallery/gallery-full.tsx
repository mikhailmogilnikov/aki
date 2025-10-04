import { useEffect, useRef, useState } from "react";
import useCarousel from "~/shared/lib/hooks/useCarousel";
import useFancybox from "~/shared/lib/hooks/useFancybox";
import { GalleryBadge } from "./gallery-badge";

interface BentoItemGalleryProps {
  itemId: string;
  onBlock: () => void;
  onUnblock: () => void;
}

export const BentoItemGalleryFull = ({
  itemId,
  onBlock,
  onUnblock,
}: BentoItemGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const pointerDownRef = useRef(false);

  const [fancyboxRef] = useFancybox({
    Carousel: {
      Arrows: {},
      Toolbar: {
        display: {
          left: [],
          right: ["close"],
        },
      },
    },
  });

  const [carouselRef, carouselInstance] = useCarousel({});

  // @ts-ignore
  useEffect(() => {
    if (carouselInstance) {
      const handleChange = () => {
        const index = carouselInstance.getPageIndex() + 1;
        setCurrentIndex(index);
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
        fancyboxRef?.(ref);
      }}
      onPointerDown={() => {
        pointerDownRef.current = true;
      }}
      onPointerUp={() => {
        console.log("pointer up");
        onUnblock();
        pointerDownRef.current = false;
      }}
      onPointerLeave={() => {
        if (pointerDownRef.current) {
          onBlock();
          pointerDownRef.current = false;
        }
      }}
      className="size-full relative"
      id={`bento-item-${itemId}-gallery-full`}
    >
      <GalleryBadge
        currentIndex={currentIndex}
        total={carouselInstance?.getSlides().length || 0}
      />
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
        href="https://cdn-images.dzcdn.net/images/cover/5f6b11f19edd3114d611cd0556d8eb83/1900x1900-000000-81-0-0.jpg"
      >
        <img
          className="size-full object-cover"
          src="https://cdn-images.dzcdn.net/images/cover/5f6b11f19edd3114d611cd0556d8eb83/1900x1900-000000-81-0-0.jpg"
          alt="Sample image #1"
        />
      </a>
      <a
        data-fancybox="gallery"
        className="f-carousel__slide h-full"
        href="https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/4f/4f/47/4f4f4733-7c38-a86c-d543-a74bc406ea09/198704489945_Cover.jpg/1200x630bb.jpg"
      >
        <img
          className="size-full object-cover"
          src="https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/4f/4f/47/4f4f4733-7c38-a86c-d543-a74bc406ea09/198704489945_Cover.jpg/1200x630bb.jpg"
          alt="Sample image #1"
        />
      </a>
    </div>
  );
};
