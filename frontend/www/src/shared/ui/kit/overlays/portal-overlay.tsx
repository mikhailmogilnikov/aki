import clsx from "clsx";
import { createPortal } from "react-dom";
import { RemoveScroll } from "react-remove-scroll";
import FocusLock from "react-focus-lock";

interface PortalOverlayProps {
  children: React.ReactNode;
  isOpen: boolean;
  overlayId?: string;
  onClose: () => void;
  onAnimationEnd?: () => void;
  className?: string;
}

export const PortalOverlay = ({
  children,
  isOpen,
  overlayId = "portal-overlay",
  onClose,
  className,
}: PortalOverlayProps) => {
  return (
    isOpen &&
    createPortal(
      <RemoveScroll>
        <FocusLock>
          <div
            role="dialog"
            aria-modal="true"
            className={clsx("fixed inset-0 z-50", className)}
          >
            <div
              id={overlayId}
              data-state={isOpen ? "open" : "closed"}
              className="absolute inset-0 data-[state=open]:motion-opacity-in-0 data-[state=closed]:motion-opacity-out-0 motion-duration-300 bg-background/50 backdrop-blur-lg z-1 fade-in animate-in duration-100"
              onClick={onClose}
            />
            {children}
          </div>
        </FocusLock>
      </RemoveScroll>,
      document.body
    )
  );
};
