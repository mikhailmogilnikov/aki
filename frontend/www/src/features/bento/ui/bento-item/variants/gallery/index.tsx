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
  return isFullscreen ? (
    <BentoItemGalleryFull
      itemId={itemId}
      onBlock={onBlock}
      onUnblock={onUnblock}
    />
  ) : (
    <BentoItemGalleryPreview itemId={itemId} />
  );
};
