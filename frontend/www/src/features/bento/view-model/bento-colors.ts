import type { BentoItem } from "../model/bento.type";

export const BentoColors: Record<BentoItem["style"], string> = {
  shadow: "squircle-shadow",
  outline: "squircle-outline",
  plain: "squircle",
  transparent: "",
};
