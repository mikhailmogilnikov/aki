import type { BentoItemOptionsProps } from "../../../options";
import { BentoItemSize } from "../../../options/size";
import { BentoItemDelete } from "../../../options/delete";
import { useProfile } from "~/services/edit-profile/model/profile-provider";

export function BentoItemGalleryOptions({
  id,
  onSizeChange,
  onDelete,
}: BentoItemOptionsProps) {
  const { profile } = useProfile();

  const bentoItem = profile.bento.find((item) => item.id === id);
  const size = bentoItem?.size;

  return (
    <>
      <BentoItemSize
        sizes={["2x2", "2x4", "4x2", "4x4"]}
        activeSize={size}
        onSelect={onSizeChange}
      />
      <hr className="border-outline" />
      <BentoItemDelete id={id} onDelete={onDelete} />
    </>
  );
}
