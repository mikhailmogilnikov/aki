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
      className="w-full h-10 bg-default squircle-shadow"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};
