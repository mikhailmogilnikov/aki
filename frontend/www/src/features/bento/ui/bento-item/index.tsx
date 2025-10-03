import { useMemo, useRef, useState, type CSSProperties } from "react";
import {
  BentoItemType,
  type BentoItem,
  type BentoSize,
} from "../../model/bento.type";
import { getResponsiveStyle, useRefresh } from "muuri-react";
import { BentoSizes, BentoTransitionSizes } from "../../view-model/bento-sizes";
import { clsx } from "clsx";

import { BentoColors } from "../../view-model/bento-colors";
import { PortalOverlay } from "~/shared/ui/kit/overlays/portal-overlay";
import { BentoItemOptions } from "./options";

import { Move } from "lucide-react";

import { AnimatePresence, motion, type Transition } from "motion/react";
import { useBentoItems } from "../../model/use-bento-items";
import { useProfile } from "~/services/edit-profile/model/profile-provider";

const springTransition: Transition = {
  type: "spring",
  stiffness: 450,
  damping: 35,
};

export interface BentoItemProps extends BentoItem<BentoItemType> {
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
  const { profile } = useProfile();

  const [isFocused, setIsFocused] = useState(false);
  const [itemSize, setItemSize] = useState<BentoSize>(size);
  const [isRestrictedToClose, setIsRestrictedToClose] = useState(false);

  const isAnimatingRef = useRef(false);

  const { renderBentoItem } = useBentoItems();

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
    // isAnimatingRef.current = true;
  };

  const closePanel = () => {
    const panel = document.getElementById(`bento-item-${id}-panel`);
    if (panel) panel.dataset.state = "closed";
  };

  const closeOverlay = () => {
    const overlays = document.querySelectorAll(`#portal-overlay`);
    if (overlays)
      overlays.forEach(
        (overlay) => ((overlay as HTMLElement).dataset.state = "closed")
      );
  };

  const handleUnfocus = () => {
    if (isAnimatingRef.current) return;

    closePanel();
    closeOverlay();

    const handle = document.getElementById(`bento-item-${id}-handle`);

    if (handle) {
      handle.style.opacity = "1";
      handle.style.transition = "opacity 0.2s";
    }

    setIsFocused(false);
  };

  const handleDelete = () => {
    if (isAnimatingRef.current) return;

    const wrapper = document.getElementById(`bento-item-${id}-wrapper`);

    if (wrapper) {
      wrapper.style.opacity = "0";
      wrapper.style.scale = "0.5";
      wrapper.style.transition = "opacity 0.2s, scale 0.2s";
    }

    closePanel();
    closeOverlay();
  };

  const bentoItem = useMemo(
    () => profile.bento.find((item) => item.id === id),
    [profile.bento, id]
  );

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
        <motion.div
          className={clsx(
            "relative size-full transition-[width,height] will-change-[width,height] duration-300"
          )}
          style={transitionStyle}
          layoutId={`bento-item-${id}`}
          transition={springTransition}
          animate={isFocused ? { opacity: 0.3 } : { opacity: 1 }}
        >
          <button
            className={clsx("size-full", BentoColors[style])}
            onClick={handleFocus}
          >
            {renderBentoItem(bentoItem!, false)}
          </button>
          <div
            id={`bento-item-${id}-handle`}
            className="size-8 cursor-grab bg-background/70 outline outline-outline handle absolute -bottom-2 -right-2 rounded-full flex items-center justify-center active:scale-120 transition-transform"
          >
            <Move className="size-5 text-foreground" />
          </div>
        </motion.div>
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
            <AnimatePresence key={`bento-item-${id}-wrapper`}>
              {isFocused && (
                <motion.div
                  style={transitionStyle}
                  className={clsx(
                    "transition-[width,height] will-change-[width,height] duration-300",
                    BentoColors[style]
                  )}
                  id={`bento-item-${id}-wrapper`}
                  layoutId={`bento-item-${id}`}
                  onClick={(e) => e.stopPropagation()}
                  transition={springTransition}
                >
                  {renderBentoItem(bentoItem!, true)}
                </motion.div>
              )}
            </AnimatePresence>
            <BentoItemOptions
              id={id}
              onSizeChange={handleChangeSize}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </PortalOverlay>
    </>
  );
};
