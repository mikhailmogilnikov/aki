import type { BentoItemOptionsProps } from "../../../options";

import { BentoItemDelete } from "../../../options/delete";

export function BentoItemTitleOptions({ id, onDelete }: BentoItemOptionsProps) {
  // const { profile } = useProfile();

  // const bentoItem = profile.bento.find((item) => item.id === id);

  return (
    <>
      <BentoItemDelete id={id} onDelete={onDelete} />
    </>
  );
}
