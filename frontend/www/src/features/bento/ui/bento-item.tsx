import { useEffect, useMemo, useState } from "react";
import { type BentoItem, type BentoSize } from "../model/bento.type";
import { getResponsiveStyle, useRefresh } from "muuri-react";
import { BentoSizes } from "../view-model/bento-sizes";
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
  const refresh = useRefresh();
  const [itemSize, setItemSize] = useState<BentoSize>(size);

  const handleChangeSize = () => {
    const newSize = Object.keys(BentoSizes(gridSize))[
      Math.floor(Math.random() * Object.keys(BentoSizes(gridSize)).length)
    ] as BentoSize;

    setItemSize(newSize);
    onSizeChange?.(id, newSize);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      refresh();
    }, 300);

    return () => clearTimeout(timeout);
  }, [itemSize]);

  const responsiveStyle = useMemo(
    () =>
      getResponsiveStyle({
        ...BentoSizes(gridSize)[itemSize],
        margin: 8,
      }),
    [itemSize, gridSize]
  );

  return (
    <div
      className="transition-[width,height] duration-250"
      style={responsiveStyle}
      data-id={id}
      data-size={itemSize}
    >
      <div className="relative size-full" onDoubleClick={handleChangeSize}>
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
