import { Trash2 } from "lucide-react";
import { useRef } from "react";
import { useProfile } from "~/services/edit-profile/model/profile-provider";
import { useBlendy } from "~/shared/lib/hooks/useBlendy";
import { DeleteIcon, type DeleteIconHandle } from "~/shared/ui/icons/delete";

interface BentoItemDeleteProps {
  id: string;
  onDelete: () => void;
}

export const BentoItemDelete = ({ id, onDelete }: BentoItemDeleteProps) => {
  const { profile, updateProfile } = useProfile();
  const { blendy } = useBlendy();
  const deleteIconRef = useRef<DeleteIconHandle>(null);

  const handleDelete = () => {
    onDelete();

    setTimeout(() => {
      updateProfile({
        ...profile,
        bento: profile.bento.filter((item) => item.id !== id),
      });
      blendy.current?.update();
    }, 300);
  };

  return (
    <button
      type="button"
      className="w-full h-10 bg-foreground/5 rounded-full font-medium flex items-center justify-center gap-1.5 text-danger"
      onPointerEnter={() => deleteIconRef.current?.startAnimation()}
      onPointerLeave={() => deleteIconRef.current?.stopAnimation()}
      onClick={handleDelete}
    >
      <DeleteIcon ref={deleteIconRef} size={16} className="mb-0.5" />
      Delete
    </button>
  );
};
