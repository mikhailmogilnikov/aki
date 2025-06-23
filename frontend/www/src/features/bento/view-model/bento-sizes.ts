import type { BentoSize } from "../model/bento.type";

const getCommonHeight = (gridSize: number) => gridSize / 2 - 8;
const getMinHeight = (gridSize: number) => gridSize / 4 - 12;
const getBigHeight = (gridSize: number) => gridSize;

export const BentoSizes = (
  gridSize: number
): Record<
  BentoSize,
  {
    columns: number;
    height: number;
  }
> => ({
  "4x1": {
    columns: 1,
    height: getMinHeight(gridSize),
  },
  "2x1": {
    columns: 1 / 2,
    height: getMinHeight(gridSize),
  },
  "2x2": {
    columns: 1 / 2,
    height: getCommonHeight(gridSize),
  },
  "2x4": {
    columns: 1 / 2,
    height: getBigHeight(gridSize),
  },
  "4x2": {
    columns: 1,
    height: getCommonHeight(gridSize),
  },
  "4x4": {
    columns: 1,
    height: getBigHeight(gridSize),
  },
});
