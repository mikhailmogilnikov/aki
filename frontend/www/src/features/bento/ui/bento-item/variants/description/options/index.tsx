import { useProfile } from "~/services/edit-profile/model/profile-provider";
import type { BentoItemOptionsProps } from "../../../options";

import { BentoItemDelete } from "../../../options/delete";
import { SectionTitle } from "~/shared/ui/kit/primitives/section-title";
import { Slider } from "~/shared/ui/kit/primitives/slider";
import type {
  BentoItem,
  BentoItemType,
} from "~/features/bento/model/bento.type";

export function BentoItemDescriptionOptions({
  id,
  onDelete,
}: BentoItemOptionsProps) {
  const { profile, updateBentoItem } = useProfile();

  const bentoItem = profile.bento.find(
    (item) => item.id === id
  ) as BentoItem<BentoItemType.DESCRIPTION>;

  if (!bentoItem) return null;

  const handleOpacityChange = (value: number[]) => {
    if (!value[0]) return;
    if (value[0] < 0 || value[0] > 100) return;
    updateBentoItem(id, { ...bentoItem?.properties, opacity: value[0] });
  };

  return (
    <>
      <SectionTitle
        title="Opacity"
        className="gap-4"
        sideContent={
          <p
            style={{ opacity: bentoItem.properties.opacity }}
            className="text-base font-medium opacity-50"
          >
            {bentoItem.properties.opacity}
          </p>
        }
      >
        <Slider
          min={0.1}
          max={1}
          step={0.1}
          value={[bentoItem.properties.opacity]}
          onValueChange={(value) => handleOpacityChange(value)}
        />
      </SectionTitle>
      <hr className="border-outline" />
      <BentoItemDelete id={id} onDelete={onDelete} />
    </>
  );
}
