import {
  BentoItemType,
  type BentoSize,
} from "~/features/bento/model/bento.type";
import { useProfile } from "~/services/edit-profile/model/profile-provider";
import { BentoItemTitleOptions } from "../variants/title/options";
import { useCallback } from "react";
import { BentoItemGalleryOptions } from "../variants/gallery/options";
import { BentoItemLinkOptions } from "../variants/link/options";
import { BentoItemDescriptionOptions } from "../variants/description/options";

export interface BentoItemOptionsProps {
  id: string;
  onSizeChange: (size: BentoSize) => void;
  onDelete: () => void;
}

export const BentoItemOptions = ({
  id,
  onSizeChange,
  onDelete,
}: BentoItemOptionsProps) => {
  const { profile } = useProfile();

  const bentoItem = profile.bento.find((item) => item.id === id);

  const renderOptions = useCallback(() => {
    switch (bentoItem?.type) {
      case BentoItemType.GALLERY:
        return (
          <BentoItemGalleryOptions
            id={id}
            onSizeChange={onSizeChange}
            onDelete={onDelete}
          />
        );
      case BentoItemType.TITLE:
        return (
          <BentoItemTitleOptions
            id={id}
            onSizeChange={onSizeChange}
            onDelete={onDelete}
          />
        );
      case BentoItemType.LINK:
        return (
          <BentoItemLinkOptions
            id={id}
            onSizeChange={onSizeChange}
            onDelete={onDelete}
          />
        );
      case BentoItemType.DESCRIPTION:
        return (
          <BentoItemDescriptionOptions
            id={id}
            onSizeChange={onSizeChange}
            onDelete={onDelete}
          />
        );
      default:
        return null;
    }
  }, [bentoItem?.type, id, onSizeChange, onDelete]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      id={`bento-item-${id}-panel`}
      data-state="open"
      className="w-60 data-[state=closed]:motion-opacity-out-0 data-[state=open]:motion-opacity-in-0 data-[state=open]:motion-scale-in-0 motion-duration-300 data-[state=open]:motion-delay-200 origin-top-left bg-background rounded border border-outline p-4 flex flex-col gap-4"
    >
      {renderOptions()}
    </div>
  );
};
