import type { BentoItem, BentoItemType } from "../model/bento.type";

export const BentoColors: Record<BentoItem<BentoItemType>["style"], string> = {
  shadow: "squircle-shadow",
  outline: "squircle-outline",
  plain: "squircle",
  transparent: "",
};
