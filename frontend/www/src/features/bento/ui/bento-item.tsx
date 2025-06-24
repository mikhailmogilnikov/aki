import { useEffect, useMemo, useState } from "react";
import { type BentoItem, type BentoSize } from "../model/bento.type";
import { getResponsiveStyle, useRefresh } from "muuri-react";
import { BentoSizes, BentoTransitionSizes } from "../view-model/bento-sizes";
import { clsx } from "clsx";

export interface BentoItemProps extends BentoItem {
  gridSize: number;
  onSizeChange?: (id: string, size: BentoSize) => void;
}

export const Item = ({
  id,
  size,
  gridSize,
  onSizeChange,
  style,
}: BentoItemProps) => {
  const [itemSize, setItemSize] = useState<BentoSize>(size);
  useRefresh([itemSize]);

  const handleChangeSize = () => {
    const newSize = Object.keys(BentoSizes(gridSize))[
      Math.floor(Math.random() * Object.keys(BentoSizes(gridSize)).length)
    ] as BentoSize;

    setItemSize(newSize);
    onSizeChange?.(id, newSize);
  };

  const responsiveStyle = useMemo(
    () =>
      getResponsiveStyle({
        ...BentoSizes(gridSize)[itemSize],
        margin: 8,
      }),
    [itemSize, gridSize]
  );

  return (
    <div style={responsiveStyle}>
      <div
        className="relative size-full transition-[width,height] will-change-[width,height] duration-300"
        onDoubleClick={handleChangeSize}
        style={BentoTransitionSizes(gridSize)[itemSize]}
      >
        <div
          className={clsx("size-full", {
            "squircle-shadow": style === "shadow",
            "squircle-outline": style === "outline",
            squircle: style === "plain",
          })}
        ></div>
        <div className="size-8 cursor-grab bg-foreground/50 handle absolute -bottom-2 -right-2 rounded-full"></div>
      </div>
    </div>
  );
};
