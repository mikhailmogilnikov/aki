import { cn } from "~/shared/lib/utils/cn";
import { type BentoSize } from "../../../model/bento.type";
import { RectangleHorizontal, RectangleVertical, Square } from "lucide-react";

interface BentoItemSizeProps {
  sizes: BentoSize[];
  activeSize: BentoSize | undefined;
  onSelect: (size: BentoSize) => void;
}

export const BentoItemSize = ({
  sizes,
  activeSize,
  onSelect,
}: BentoItemSizeProps) => {
  const getIcon = (size: BentoSize) => {
    switch (size) {
      case "4x1":
        return <Square className="size-6" />;
      case "2x1":
        return <Square className="size-6" />;
      case "2x2":
        return <Square className="size-4" />;
      case "2x4":
        return <RectangleVertical className="size-6" />;
      case "4x2":
        return <RectangleHorizontal className="size-6" />;
      case "4x4":
        return <Square className="size-6" />;
    }
  };

  return (
    <div className="flex gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => onSelect(size)}
          className={cn(
            "w-full h-10 hover:bg-default/50 rounded-full flex items-center justify-center pressable transition-colors",
            activeSize === size && "bg-default hover:bg-default"
          )}
        >
          {getIcon(size)}
        </button>
      ))}
    </div>
  );
};
