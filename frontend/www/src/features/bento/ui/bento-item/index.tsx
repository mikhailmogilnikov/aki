import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import { type BentoItem, type BentoSize } from "../../model/bento.type";
import { getResponsiveStyle, useRefresh } from "muuri-react";
import { BentoSizes, BentoTransitionSizes } from "../../view-model/bento-sizes";
import { clsx } from "clsx";
import type { Blendy } from "blendy";
import { BentoColors } from "../../view-model/bento-colors";
import { PortalOverlay } from "~/shared/ui/kit/overlays/portal-overlay";
import { BentoItemSize } from "./options/size";
import { BentoItemDelete } from "./options/delete";

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

  const handleChangeSize = (size: BentoSize) => {
    setItemSize(size);
    onSizeChange?.(id, size);
  };

  const handleFocus = () => {
    const handle = document.getElementById(`bento-item-${id}-handle`);

    if (handle) {
      handle.style.opacity = "0";
      handle.style.transition = "none";
    }

    setIsFocused(true);
    isAnimatingRef.current = true;
    blendy.current?.toggle(`bento-item-${id}`, () => {
      isAnimatingRef.current = false;
    });
  };

  const handleUnfocus = () => {
    if (isAnimatingRef.current) return;

    const panel = document.getElementById(`bento-item-${id}-panel`);
    const overlay = document.getElementById(`portal-overlay`);
    const handle = document.getElementById(`bento-item-${id}-handle`);

    if (overlay) overlay.dataset.state = "closed";

    if (panel) panel.dataset.state = "closed";

    blendy.current?.untoggle(`bento-item-${id}`, () => {
      setIsFocused(false);
      if (handle) {
        handle.style.opacity = "1";
        handle.style.transition = "opacity 0.1s";
      }
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
          <button
            className={clsx("size-full", BentoColors[style])}
            onClick={handleFocus}
          ></button>
          <div
            id={`bento-item-${id}-handle`}
            className="size-8 cursor-grab bg-foreground/50 handle absolute -bottom-2 -right-2 rounded-full"
          ></div>
        </div>
      </div>

      <PortalOverlay isOpen={isFocused} onClose={handleUnfocus}>
        <div
          className="absolute inset-0 overflow-y-auto"
          onClick={handleUnfocus}
        >
          <div
            style={{ "--max-width": `${gridSize}px` } as CSSProperties}
            className="mx-auto w-full max-w-[var(--max-width)] z-2 relative flex flex-col gap-8 mt-30 mb-20"
          >
            <div
              style={transitionStyle}
              className={clsx(
                "transition-[width,height] will-change-[width,height] duration-300 mx-auto",
                BentoColors[style]
              )}
              data-blendy-to={`bento-item-${id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="size-full p-4 flex items-center">
                {/* <div
                  contentEditable
                  className="w-full min-h-6 max-h-full h-fit outline-none text-center overflow-y-auto"
                /> */}
                {/* <textarea
                  className="size-full outline-none text-left text-lg resize-none"
                  placeholder="Enter your text"
                /> */}
              </div>
            </div>
            <div
              onClick={(e) => e.stopPropagation()}
              id={`bento-item-${id}-panel`}
              style={
                {
                  "--bg":
                    "color-mix(in oklab, var(--color-default) 50%, transparent)",
                } as CSSProperties
              }
              data-state="open"
              className="w-60  data-[state=closed]:motion-opacity-out-0 data-[state=open]:motion-opacity-in-0 data-[state=open]:motion-scale-in-0 motion-duration-300 data-[state=open]:motion-delay-200 origin-top-left bg-default/50 squircle p-4 flex flex-col gap-4"
            >
              <BentoItemSize
                sizes={["2x2", "2x4", "4x2", "4x4"]}
                onSelect={handleChangeSize}
              />
              <BentoItemDelete />
            </div>
          </div>
        </div>
      </PortalOverlay>
    </>
  );
};
