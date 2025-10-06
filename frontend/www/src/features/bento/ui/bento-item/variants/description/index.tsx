import type {
  BentoItem,
  BentoItemType,
} from "~/features/bento/model/bento.type";
import { FullscreenDescription } from "./fullscreen-title";
import { useProfile } from "~/services/edit-profile/model/profile-provider";

interface BentoItemTitleProps {
  itemId: string;
  isFullscreen: boolean;
}

export const BentoItemDescription = ({
  itemId,
  isFullscreen,
}: BentoItemTitleProps) => {
  return (
    <div className="size-full relative flex items-end justify-start px-1">
      {isFullscreen ? (
        <FullscreenDescription itemId={itemId} />
      ) : (
        <PreviewDescription itemId={itemId} />
      )}
    </div>
  );
};

const PreviewDescription = ({ itemId }: { itemId: string }) => {
  const { profile } = useProfile();

  const bentoItem = profile.bento.find(
    (item) => item.id === itemId
  ) as BentoItem<BentoItemType.DESCRIPTION>;

  if (!bentoItem) return null;

  return (
    <h3
      style={{ opacity: bentoItem.properties.opacity }}
      className="text-base text-left whitespace-pre-wrap"
    >
      {bentoItem.properties.content ? (
        bentoItem.properties.content
      ) : (
        <span>Enter description...</span>
      )}
    </h3>
  );
};
