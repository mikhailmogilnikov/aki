import { BentoItemType, type BentoItem } from "../model/bento.type";

export const BentoItems: BentoItem<BentoItemType>[] = [
  {
    id: "1",
    size: "2x2",
    order: 0,
    style: "plain",
    type: BentoItemType.GALLERY,
    properties: {
      media: [],
    },
  },
  {
    id: "2",
    size: "2x2",
    order: 1,
    style: "plain",
    type: BentoItemType.TEXT,
    properties: {
      content: "Welcome to my profile!",
    },
  },
  {
    id: "3",
    size: "2x2",
    order: 2,
    style: "outline",
    type: BentoItemType.LINK,
    properties: {
      url: "https://github.com",
      title: "GitHub",
      url_valid: true,
    },
  },
];

