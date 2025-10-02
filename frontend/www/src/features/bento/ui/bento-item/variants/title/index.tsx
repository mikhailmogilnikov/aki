import type {
  BentoItem,
  BentoItemType,
} from "~/features/bento/model/bento.type";
import { FullscreenTitle } from "./fullscreen-title";
import { useProfile } from "~/services/edit-profile/model/profile-provider";

interface BentoItemTitleProps {
  itemId: string;
  isFullscreen: boolean;
}

export const BentoItemTitle = ({
  itemId,
  isFullscreen,
}: BentoItemTitleProps) => {
  return (
    <div className="size-full relative flex items-end justify-start p-1">
      {isFullscreen ? (
        <FullscreenTitle itemId={itemId} />
      ) : (
        <PreviewTitle itemId={itemId} />
      )}
    </div>
  );
};

const PreviewTitle = ({ itemId }: { itemId: string }) => {
  const { profile } = useProfile();

  const bentoItem = profile.bento.find(
    (item) => item.id === itemId
  ) as BentoItem<BentoItemType.TITLE>;

  if (!bentoItem) return null;

  return (
    <h3 className="text-xl font-bold text-left">
      {bentoItem.properties.content ? (
        bentoItem.properties.content
      ) : (
        <span className="opacity-50">Title</span>
      )}
    </h3>
  );
};
