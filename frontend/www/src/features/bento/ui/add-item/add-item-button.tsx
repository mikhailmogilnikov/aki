import { useProfile } from "~/services/edit-profile/model/profile-provider";
import type { BentoItem } from "../../model/bento.type";

export const AddBentoItemButton = ({ onAdd }: { onAdd: () => void }) => {
  const { profile, updateProfile } = useProfile();

  const handleAddItem = () => {
    const newItem: BentoItem = {
      id: crypto.randomUUID(),
      size: "2x2",
      order: profile.bento.length + 1,
      style: "shadow",
    };

    const newBento = [...profile.bento, newItem];

    updateProfile({
      ...profile,
      bento: newBento,
    });

    onAdd();
  };

  return (
    <button
      className="p-4 bg-default mt-4 text-foreground"
      onClick={handleAddItem}
    >
      add item
    </button>
  );
};
