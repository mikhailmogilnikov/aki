import { useProfile } from "~/services/edit-profile/model/profile-provider";
import type { BentoItemOptionsProps } from "../../../options";
import { BentoItemSize } from "../../../options/size";
import { BentoItemDelete } from "../../../options/delete";

export function BentoItemTitleOptions({
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
        sizes={["4x1", "4x2"]}
        activeSize={size}
        onSelect={onSizeChange}
      />
      <hr className="border-outline" />
      <BentoItemDelete id={id} onDelete={onDelete} />
    </>
  );
}
