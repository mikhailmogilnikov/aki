export const enum BentoItemSize {
  TWO_BY_TWO = "2x2",
  TWO_BY_ONE = "2x1",
  FOUR_BY_ONE = "4x1",
  TWO_BY_FOUR = "2x4",
  FOUR_BY_TWO = "4x2",
  FOUR_BY_FOUR = "4x4",
}

export type BentoSize = `${BentoItemSize}`;

export type BentoStyle = "plain" | "shadow" | "outline" | "transparent";

export interface BentoItem {
  id: string;
  size: BentoSize;
  order: number;
  style: BentoStyle;
  type: BentoItemType;
}

export enum BentoItemType {
  GALLERY = "gallery",
  TEXT = "text",
  LINK = "link",
  TITLE = "title",
}

export const generateNewBentoItemDefaults = (
  order: number,
  type: BentoItemType
) => {
  const id = Math.random().toString(36).substring(2, 15);

  const defaults: Record<BentoItemType, BentoItem> = {
    [BentoItemType.GALLERY]: {
      id,
      size: "2x2",
      order: order,
      style: "plain",
      type: BentoItemType.GALLERY,
    },
    [BentoItemType.TEXT]: {
      id,
      size: "2x2",
      order: order,
      style: "plain",
      type: BentoItemType.TEXT,
    },
    [BentoItemType.LINK]: {
      id,
      size: "2x2",
      order: order,
      style: "plain",
      type: BentoItemType.LINK,
    },
    [BentoItemType.TITLE]: {
      id,
      size: "4x1",
      order: order,
      style: "transparent",
      type: BentoItemType.TITLE,
    },
  };

  return defaults[type];
};
