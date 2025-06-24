import { useMemo, useRef, useState, type RefObject } from "react";
import { type BentoItem, type BentoSize } from "../model/bento.type";
import { getResponsiveStyle, useRefresh } from "muuri-react";
import { BentoSizes, BentoTransitionSizes } from "../view-model/bento-sizes";
import { clsx } from "clsx";
import type { Blendy } from "blendy";
import { createPortal } from "react-dom";
import { BentoColors } from "../view-model/bento-colors";

export interface BentoItemProps extends BentoItem {
  gridSize: number;
  onSizeChange?: (id: string, size: BentoSize) => void;
  blendy: RefObject<Blendy | null>;
}

export const BentoItemComponent = ({
  id,
  size,
  gridSize,
  onSizeChange,
  style,
  blendy,
}: BentoItemProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [itemSize, setItemSize] = useState<BentoSize>(size);

  const isAnimatingRef = useRef(false);

  useRefresh([itemSize]);

  const handleChangeSize = () => {
    const newSize = Object.keys(BentoSizes(gridSize))[
      Math.floor(Math.random() * Object.keys(BentoSizes(gridSize)).length)
    ] as BentoSize;

    setItemSize(newSize);
    onSizeChange?.(id, newSize);
  };

  const handleFocus = () => {
    setIsFocused(true);
    isAnimatingRef.current = true;
    blendy.current?.toggle(`bento-item-${id}`, () => {
      isAnimatingRef.current = false;
    });
  };

  const handleUnfocus = () => {
    if (isAnimatingRef.current) return;

    blendy.current?.untoggle(`bento-item-${id}`, () => {
      setIsFocused(false);
    });
  };

  const responsiveStyle = useMemo(
    () =>
      getResponsiveStyle({
        ...BentoSizes(gridSize)[itemSize],
        margin: 8,
      }),
    [itemSize, gridSize]
  );

  const transitionStyle = useMemo(
    () => BentoTransitionSizes(gridSize)[itemSize],
    [itemSize, gridSize]
  );

  return (
    <>
      <div style={responsiveStyle}>
        <div
          className="relative size-full transition-[width,height] will-change-[width,height] duration-300"
          style={transitionStyle}
          data-blendy-from={`bento-item-${id}`}
        >
          <div
            className={clsx("size-full", BentoColors[style])}
            onClick={handleFocus}
          ></div>
          <div className="size-8 cursor-grab bg-foreground/50 handle absolute -bottom-2 -right-2 rounded-full"></div>
        </div>
      </div>

      {isFocused &&
        createPortal(
          <div className="fixed inset-0 z-50 fade-in animate-in duration-100">
            <div
              className="absolute inset-0 bg-background/50 backdrop-blur-lg z-1"
              onClick={handleUnfocus}
            />
            <div
              style={transitionStyle}
              className={clsx(
                "absolute transition-[width,height] will-change-[width,height] duration-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-2",
                BentoColors[style]
              )}
              data-blendy-to={`bento-item-${id}`}
              onDoubleClick={handleChangeSize}
            >
              <div className="size-full"></div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
