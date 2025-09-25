import { BentoItemGalleryFull } from "./gallery-full";
import { BentoItemGalleryPreview } from "./gallery-preview";

interface BentoItemGalleryProps {
  onBlock: () => void;
  onUnblock: () => void;
  isFullscreen: boolean;
}

export const BentoItemGallery = ({
  onBlock,
  onUnblock,
  isFullscreen,
}: BentoItemGalleryProps) => {
  return isFullscreen ? (
    <BentoItemGalleryFull onBlock={onBlock} onUnblock={onUnblock} />
  ) : (
    <BentoItemGalleryPreview />
  );
};
