import { Trash2 } from "lucide-react";
import { useProfile } from "~/services/edit-profile/model/profile-provider";

interface BentoItemDeleteProps {
  id: string;
  onDelete: () => void;
}

export const BentoItemDelete = ({ id, onDelete }: BentoItemDeleteProps) => {
  const { profile, updateProfile } = useProfile();

  const handleDelete = () => {
    updateProfile({
      ...profile,
      bento: profile.bento.filter((item) => item.id !== id),
    });

    onDelete();
  };

  return (
    <button
      type="button"
      className="w-full h-10 bg-default rounded-full font-medium flex items-center justify-center gap-1.5 text-danger"
      onClick={handleDelete}
    >
      <Trash2 className="size-4 mb-0.5" />
      Delete
    </button>
  );
};
