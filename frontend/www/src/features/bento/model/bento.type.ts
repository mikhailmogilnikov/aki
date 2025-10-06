import type { BentoItemProperties } from "./bento-props.type";

export const enum BentoItemSize {
  TWO_BY_TWO = "2x2",
  TWO_BY_ONE = "2x1",
  FOUR_BY_ONE = "4x1",
  TWO_BY_FOUR = "2x4",
  FOUR_BY_TWO = "4x2",
  FOUR_BY_FOUR = "4x4",
  DYNAMIC = "dynamic",
}

export type BentoSize = `${BentoItemSize}`;

export type BentoStyle = "plain" | "shadow" | "outline" | "transparent";

export interface BentoItem<T extends BentoItemType> {
  id: string;
  size: BentoSize;
  order: number;
  style: BentoStyle;
  type: BentoItemType;
  properties: BentoItemProperties<T>;
}

export enum BentoItemType {
  GALLERY = "gallery",
  TEXT = "text",
  LINK = "link",
  TITLE = "title",
  DESCRIPTION = "description",
}

export const generateNewBentoItemDefaults = (
  order: number,
  type: BentoItemType
) => {
  const id = Math.random().toString(36).substring(2, 15);

  const defaults: Record<BentoItemType, BentoItem<BentoItemType>> = {
    [BentoItemType.GALLERY]: {
      id,
      size: "2x2",
      order: order,
      style: "plain",
      type: BentoItemType.GALLERY,
      properties: {
        media: [],
      },
    },
    [BentoItemType.TEXT]: {
      id,
      size: "2x2",
      order: order,
      style: "plain",
      type: BentoItemType.TEXT,
      properties: {
        content: "",
      },
    },
    [BentoItemType.LINK]: {
      id,
      size: "2x2",
      order: order,
      style: "outline",
      type: BentoItemType.LINK,
      properties: {
        url: "",
        title: "",
        url_valid: false,
      },
    },
    [BentoItemType.TITLE]: {
      id,
      size: "dynamic",
      order: order,
      style: "transparent",
      type: BentoItemType.TITLE,
      properties: {
        content: "",
      },
    },
    [BentoItemType.DESCRIPTION]: {
      id,
      size: "dynamic",
      order: order,
      style: "transparent",
      type: BentoItemType.DESCRIPTION,
      properties: {
        content: "",
        opacity: 0.5,
      },
    },
  };

  return defaults[type];
};
