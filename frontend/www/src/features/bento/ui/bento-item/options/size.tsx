import { clsx } from "clsx";
import { type BentoSize } from "../../../model/bento.type";

interface BentoItemSizeProps {
  sizes: BentoSize[];
  onSelect: (size: BentoSize) => void;
}

export const BentoItemSize = ({ sizes, onSelect }: BentoItemSizeProps) => {
  const length = sizes.length;

  return (
    <div
      className={clsx(
        "grid gap-2",
        length === 1 && "grid-cols-1",
        (length === 2 || length === 4) && "grid-cols-2",
        length === 3 && "grid-cols-3"
      )}
    >
      {sizes.map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => onSelect(size)}
          className="w-full h-10 squircle-shadow"
        >
          {size}
        </button>
      ))}
    </div>
  );
};
