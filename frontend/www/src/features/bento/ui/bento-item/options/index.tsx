import type { BentoSize } from "~/features/bento/model/bento.type";
import { BentoItemDelete } from "./delete";
import { BentoItemSize } from "./size";
import { useProfile } from "~/services/edit-profile/model/profile-provider";

interface BentoItemOptionsProps {
  id: string;
  onSizeChange: (size: BentoSize) => void;
  onDelete: () => void;
}

export const BentoItemOptions = ({
  id,
  onSizeChange,
  onDelete,
}: BentoItemOptionsProps) => {
  const { profile } = useProfile();

  const bentoItem = profile.bento.find((item) => item.id === id);
  const size = bentoItem?.size;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      id={`bento-item-${id}-panel`}
      data-state="open"
      className="w-60 data-[state=closed]:motion-opacity-out-0 data-[state=open]:motion-opacity-in-0 data-[state=open]:motion-scale-in-0 motion-duration-300 data-[state=open]:motion-delay-200 origin-top-left squircle p-4 flex flex-col gap-4"
    >
      <BentoItemSize
        sizes={["2x2", "2x4", "4x2", "4x4"]}
        activeSize={size}
        onSelect={onSizeChange}
      />
      <hr className="border-outline" />
      <BentoItemDelete id={id} onDelete={onDelete} />
    </div>
  );
};
