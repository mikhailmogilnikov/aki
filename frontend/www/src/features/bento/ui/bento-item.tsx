import { useState } from "react";
import { BentoItemSize } from "../model/bento.type";

const gridItemClassNames = {
  [BentoItemSize.TWO_BY_TWO]: "grid-item-2-2",
  [BentoItemSize.TWO_BY_ONE]: "grid-item-2-1",
  [BentoItemSize.TWO_BY_FOUR]: "grid-item-2-4",
  [BentoItemSize.FOUR_BY_TWO]: "grid-item-4-2",
  [BentoItemSize.FOUR_BY_FOUR]: "grid-item-4-4",
};

interface BentoItemProps {
  children?: React.ReactNode;
  size: `${BentoItemSize}`;
  onSizeChange?: (size: BentoItemSize) => void;
}

export const BentoItem = ({ children, size, onSizeChange }: BentoItemProps) => {
  const [bentoItemSize, setBentoItemSize] = useState<BentoItemSize>(
    size as BentoItemSize
  );

  const handleClick = () => {
    if (bentoItemSize === BentoItemSize.TWO_BY_TWO) {
      setBentoItemSize(BentoItemSize.FOUR_BY_TWO);
      onSizeChange?.(BentoItemSize.FOUR_BY_TWO);
    } else if (bentoItemSize === BentoItemSize.FOUR_BY_TWO) {
      setBentoItemSize(BentoItemSize.TWO_BY_FOUR);
      onSizeChange?.(BentoItemSize.TWO_BY_FOUR);
    } else if (bentoItemSize === BentoItemSize.TWO_BY_FOUR) {
      setBentoItemSize(BentoItemSize.FOUR_BY_FOUR);
      onSizeChange?.(BentoItemSize.FOUR_BY_FOUR);
    } else {
      setBentoItemSize(BentoItemSize.TWO_BY_TWO);
      onSizeChange?.(BentoItemSize.TWO_BY_TWO);
    }
  };

  return (
    <div
      onDoubleClick={handleClick}
      className={`grid-item ${gridItemClassNames[bentoItemSize]} `}
    >
      <div
        className={`size-full relative duration-300 will-change-[width,height] ${gridItemClassNames[bentoItemSize]}`}
      >
        <div className="size-full squircle-shadow">{children}</div>
        <div className="size-8 cursor-grab bg-foreground/50 handle absolute -bottom-2 -right-2 rounded-full"></div>
      </div>
    </div>
  );
};
