import { useCallback } from "react";
import { BentoItemType, type BentoItem } from "./bento.type";
import { BentoItemGallery } from "../ui/bento-item/variants/gallery";
import { BentoItemText } from "../ui/bento-item/variants/text";
import { BentoItemTitle } from "../ui/bento-item/variants/title";

export const useBentoItems = () => {
  const renderBentoItem = useCallback(
    (item: BentoItem, isFullscreen: boolean) => {
      switch (item.type) {
        case BentoItemType.GALLERY:
          return <BentoItemGallery onBlock={() => {}} onUnblock={() => {}} isFullscreen={isFullscreen} />;
        case BentoItemType.TEXT:
          return <BentoItemText isFullscreen={isFullscreen} />;
        case BentoItemType.TITLE:
          return <BentoItemTitle isFullscreen={isFullscreen} />;
        default:
          return null;
      }
    },
    []
  );

  return {
    renderBentoItem,
  };
};
