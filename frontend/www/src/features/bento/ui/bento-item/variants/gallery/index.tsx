import type { CarouselInstance } from "@fancyapps/ui";
import { BentoItemGalleryFull } from "./gallery-full";
import { BentoItemGalleryPreview } from "./gallery-preview";
import useCarousel from "~/shared/lib/hooks/useCarousel";
import { useEffect, useState } from "react";

interface BentoItemGalleryProps {
  itemId: string;
  onBlock: () => void;
  onUnblock: () => void;
  isFullscreen: boolean;
}

export const BentoItemGallery = ({
  itemId,
  onBlock,
  onUnblock,
  isFullscreen,
}: BentoItemGalleryProps) => {
  const [activeSlide, setActiveSlide] = useState(0);

  return isFullscreen ? (
    <BentoItemGalleryFull
      itemId={itemId}
      onBlock={onBlock}
      onUnblock={onUnblock}
      activeSlide={activeSlide}
      setActiveSlide={setActiveSlide}
    />
  ) : (
    <BentoItemGalleryPreview
      itemId={itemId}
      activeSlide={activeSlide}
      setActiveSlide={setActiveSlide}
    />
  );
};
