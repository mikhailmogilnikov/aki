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
import { BentoItemOptions } from "./options";
import { BentoItemGallery } from "./variants/gallery";
import { Move } from "lucide-react";
import { GalleryBadge } from "./variants/gallery/gallery-badge";
import { useBlendy } from "~/shared/lib/hooks/useBlendy";

export interface BentoItemProps extends BentoItem {
  gridSize: number;
  onSizeChange?: (id: string, size: BentoSize) => void;
}

export const BentoItemComponent = ({
  id,
  size,
  gridSize,
  onSizeChange,
  style,
}: BentoItemProps) => {
  const { blendy } = useBlendy();

  const [isFocused, setIsFocused] = useState(false);
  const [itemSize, setItemSize] = useState<BentoSize>(size);
  const [isRestrictedToClose, setIsRestrictedToClose] = useState(false);

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
    const overlays = document.querySelectorAll(`#portal-overlay`);
    const handle = document.getElementById(`bento-item-${id}-handle`);

    if (overlays)
      overlays.forEach(
        (overlay) => ((overlay as HTMLElement).dataset.state = "closed")
      );
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
          >
            <img
              className="size-full object-cover"
              draggable={false}
              src={
                "https://i.scdn.co/image/ab67616d0000b27398d711627751989d1ae8b0fb"
              }
              alt="bento"
            />
            <GalleryBadge currentIndex={1} total={2} />
          </button>
          <div
            id={`bento-item-${id}-handle`}
            className="size-8 cursor-grab bg-background/70 outline outline-outline handle absolute -bottom-2 -right-2 rounded-full flex items-center justify-center active:scale-120 transition-transform"
          >
            <Move className="size-5 text-foreground" />
          </div>
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
              {/* <img
                className="size-full object-cover"
                draggable={false}
                src={
                  "https://i.scdn.co/image/ab67616d0000b27398d711627751989d1ae8b0fb"
                }
                alt="bento"
              /> */}
              <BentoItemGallery
                onBlock={() => {
                  console.log("block");
                  setIsRestrictedToClose(true);
                }}
                onUnblock={() => {
                  console.log("unblock");
                  setIsRestrictedToClose(false);
                }}
              />
              {/* <div className="size-full p-4 flex items-center"> */}
              {/* <div
                  contentEditable
                  className="w-full min-h-6 max-h-full h-fit outline-none text-center overflow-y-auto"
                /> */}
              {/* <textarea
                  className="size-full outline-none text-left text-lg resize-none"
                  placeholder="Enter your text"
                /> */}
              {/* </div> */}
            </div>
            <BentoItemOptions
              id={id}
              onSizeChange={handleChangeSize}
              onDelete={() => {
                handleUnfocus();
                blendy.current?.update();
              }}
            />
          </div>
        </div>
      </PortalOverlay>
    </>
  );
};
