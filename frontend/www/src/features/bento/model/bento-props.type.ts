import type { BentoItemType } from "./bento.type";

export type BentoItemProperties<T> = T extends BentoItemType.TITLE
  ? BentoItemPropertiesTitle
  : T extends BentoItemType.GALLERY
    ? BentoItemPropertiesGallery
    : T extends BentoItemType.TEXT
      ? BentoItemPropertiesText
      : T extends BentoItemType.LINK
        ? BentoItemPropertiesLink
        : never;

export interface BentoItemPropertiesTitle {
  content: string;
}

export interface BentoItemPropertiesGallery {
  media: string[];
}

export interface BentoItemPropertiesText {
  content: string;
}

export interface BentoItemPropertiesLink {
  url: string | null;
}
