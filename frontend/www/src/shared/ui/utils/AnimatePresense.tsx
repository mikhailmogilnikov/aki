import { useEffect, useState } from "react";
import { clsx } from "clsx";

interface AnimatePresenceProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * CSS-class for the animation of appearance
   */
  inClass?: string;
  /**
   * CSS-class for the animation of disappearance
   */
  outClass?: string;
  /**
   * Show the element
   */
  show?: boolean;
}

export function AnimatePresence(props: AnimatePresenceProps) {
  const {
    children,
    inClass,
    outClass,
    show = true,
    className,
    ...rest
  } = props;

  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) setIsVisible(true);
  }, [show]);

  const handleAnimationEnd = () => {
    if (!show) setIsVisible(false);
  };

  const currentClassName = clsx(className, show ? inClass : outClass);

  return (
    <>
      {isVisible && (
        <div
          {...rest}
          className={currentClassName}
          onAnimationEnd={handleAnimationEnd}
        >
          {children}
        </div>
      )}
    </>
  );
}
