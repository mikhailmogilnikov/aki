import type {
  BentoItem,
  BentoItemType,
} from "~/features/bento/model/bento.type";
import { useProfile } from "~/services/edit-profile/model/profile-provider";

export function FullscreenTitle({ itemId }: { itemId: string }) {
  const { profile, updateProfile } = useProfile();

  const bentoItem = profile.bento.find(
    (item) => item.id === itemId
  ) as BentoItem<BentoItemType.TITLE>;

  if (!bentoItem) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 50) return;

    const newBentoItem = {
      ...bentoItem,
      properties: { ...bentoItem.properties, content: e.target.value },
    };

    const newBento = profile.bento.map((item) =>
      item.id === itemId ? newBentoItem : item
    );

    updateProfile({ ...profile, bento: newBento });
  };

  return (
    <input
      type="text"
      className="text-xl font-bold w-full outline-none"
      placeholder="Title"
      autoFocus
      value={bentoItem.properties.content}
      onChange={handleChange}
    />
  );
}
