import { PlusIcon } from "lucide-react";
import { EditSocialMediaModal } from "./modal";
import { useState } from "react";

export function EditSocialMedia() {
  const [openModal, setOpenModal] = useState(false);

  const handleChangeModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <button
        className="mt-2 border-2 hover:bg-default/50 active:bg-default/80 transition-colors border-dashed border-outline rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer select-none font-medium text-foreground/50 hover:text-foreground"
        onClick={handleChangeModal}
      >
        <PlusIcon className="size-4" />
        Add social media
      </button>
      <EditSocialMediaModal open={openModal} onOpenChange={handleChangeModal} />
    </>
  );
}
