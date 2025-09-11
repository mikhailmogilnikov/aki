import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "~/shared/ui/kit/overlays/react-tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/shared/ui/kit/overlays/dropdown-menu";
import {
  GalleryHorizontalEndIcon,
  type GalleryHorizontalEndIconHandle,
} from "~/shared/ui/icons/gallery";
import { useRef } from "react";
import {
  ScanTextIcon,
  type ScanTextIconHandle,
} from "~/shared/ui/icons/scan-text";
import { LinkIcon, type LinkIconHandle } from "~/shared/ui/icons/link";
import { PlusIcon, type PlusIconHandle } from "~/shared/ui/icons/plus";
import { useProfile } from "~/services/edit-profile/model/profile-provider";
import type { BentoItem } from "~/features/bento/model/bento.type";
import { useBlendy } from "~/shared/lib/hooks/useBlendy";

export const EditBarNewItem = () => {
  const { profile, updateProfile } = useProfile();
  const { blendy } = useBlendy();

  const plusIconRef = useRef<PlusIconHandle>(null);

  const galleryHorizontalEndIconRef =
    useRef<GalleryHorizontalEndIconHandle>(null);
  const scanTextIconRef = useRef<ScanTextIconHandle>(null);
  const linkIconRef = useRef<LinkIconHandle>(null);

  const handleAddItem = () => {
    const newItem: BentoItem = {
      id: crypto.randomUUID(),
      size: "2x2",
      order: profile.bento.length + 1,
      style: "plain",
    };

    const newBento = [...profile.bento, newItem];

    updateProfile({
      ...profile,
      bento: newBento,
    });

    blendy.current?.update();
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <DropdownMenu
      onOpenChange={(isOpen) => {
        if (isOpen) {
          plusIconRef.current?.startAnimation();

          queueMicrotask(() => {
            galleryHorizontalEndIconRef.current?.startAnimation();
            scanTextIconRef.current?.startAnimation();
            linkIconRef.current?.startAnimation();
          });
        } else {
          plusIconRef.current?.stopAnimation();
        }
      }}
    >
      <DropdownMenuTrigger
        tabIndex={1}
        className="size-12 pressable cursor-pointer rounded-full bg-default/50 backdrop-blur-md border border-foreground/8"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="size-full flex items-center justify-center ">
              <PlusIcon
                size={26}
                ref={plusIconRef}
                className="text-foreground"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add a new block</p>
          </TooltipContent>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>New block</DropdownMenuLabel>

        <DropdownMenuItem
          className="text-foreground"
          onMouseEnter={() =>
            galleryHorizontalEndIconRef.current?.startAnimation()
          }
          onClick={handleAddItem}
          onMouseLeave={() =>
            galleryHorizontalEndIconRef.current?.stopAnimation()
          }
        >
          <GalleryHorizontalEndIcon
            ref={galleryHorizontalEndIconRef}
            size={20}
            className="opacity-50"
          />
          Media gallery
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled
          onMouseEnter={() => scanTextIconRef.current?.startAnimation()}
          onMouseLeave={() => scanTextIconRef.current?.stopAnimation()}
        >
          <ScanTextIcon
            ref={scanTextIconRef}
            size={20}
            className="opacity-50"
          />
          Text
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled
          onMouseEnter={() => linkIconRef.current?.startAnimation()}
          onMouseLeave={() => linkIconRef.current?.stopAnimation()}
        >
          <LinkIcon ref={linkIconRef} size={20} className="opacity-50" />
          Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
