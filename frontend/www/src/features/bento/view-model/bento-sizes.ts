import type { BentoSize } from "../model/bento.type";

const getCommonHeight = (gridSize: number) => gridSize / 2 - 8;
const getMinHeight = (gridSize: number) => gridSize / 4 - 12;
const getMaxHeight = (gridSize: number) => gridSize;

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
    height: getMaxHeight(gridSize),
  },
  "4x2": {
    columns: 1,
    height: getCommonHeight(gridSize),
  },
  "4x4": {
    columns: 1,
    height: getMaxHeight(gridSize),
  },
});

export const BentoTransitionSizes = (
  gridSize: number
): Record<
  BentoSize,
  {
    width: number;
    height: number;
  }
> => ({
  "4x1": {
    width: getMaxHeight(gridSize),
    height: getMinHeight(gridSize),
  },
  "2x1": {
    width: getCommonHeight(gridSize),
    height: getMinHeight(gridSize),
  },
  "2x2": {
    width: getCommonHeight(gridSize),
    height: getCommonHeight(gridSize),
  },
  "2x4": {
    width: getCommonHeight(gridSize),
    height: getMaxHeight(gridSize),
  },
  "4x2": {
    width: getMaxHeight(gridSize),
    height: getCommonHeight(gridSize),
  },
  "4x4": {
    width: getMaxHeight(gridSize),
    height: getMaxHeight(gridSize),
  },
});