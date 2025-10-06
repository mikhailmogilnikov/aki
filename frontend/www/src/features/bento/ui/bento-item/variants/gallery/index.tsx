import { BentoItemGalleryFull } from "./gallery-full";
import { BentoItemGalleryPreview } from "./gallery-preview";

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
