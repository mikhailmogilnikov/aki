export const enum BentoItemSize {
  TWO_BY_TWO = "2x2",
  TWO_BY_ONE = "2x1",
  FOUR_BY_ONE = "4x1",
  TWO_BY_FOUR = "2x4",
  FOUR_BY_TWO = "4x2",
  FOUR_BY_FOUR = "4x4",
}

export type BentoSize = `${BentoItemSize}`;

export interface BentoItem {
  id: string;
  size: BentoSize;
}
