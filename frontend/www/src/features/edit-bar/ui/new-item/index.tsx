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
import {
  BentoItemType,
  generateNewBentoItemDefaults,
  type BentoItem,
} from "~/features/bento/model/bento.type";

import {
  AArrowUpIcon,
  type AArrowUpIconHandle,
} from "~/shared/ui/icons/a-arrow-up";
import { type BookTextIconHandle } from "~/shared/ui/icons/book-text";

export const EditBarNewItem = () => {
  const { profile, updateProfile } = useProfile();

  const plusIconRef = useRef<PlusIconHandle>(null);

  const galleryHorizontalEndIconRef =
    useRef<GalleryHorizontalEndIconHandle>(null);
  const scanTextIconRef = useRef<ScanTextIconHandle>(null);
  const linkIconRef = useRef<LinkIconHandle>(null);
  const aArrowUpIconRef = useRef<AArrowUpIconHandle>(null);
  const bookTextIconRef = useRef<BookTextIconHandle>(null);

  const handleAddItem = (type: BentoItemType) => {
    const newItem: BentoItem = generateNewBentoItemDefaults(
      profile.bento.length + 1,
      type
    );

    const newBento = [...profile.bento, newItem];

    updateProfile({
      ...profile,
      bento: newBento,
    });

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
            aArrowUpIconRef.current?.startAnimation();
            bookTextIconRef.current?.startAnimation();
          });
        } else {
          plusIconRef.current?.stopAnimation();
        }
      }}
    >
      <DropdownMenuTrigger className="size-12 pressable cursor-pointer rounded-full bg-default/50 backdrop-blur-md border border-foreground/8">
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
          onPointerEnter={() =>
            galleryHorizontalEndIconRef.current?.startAnimation()
          }
          onClick={() => handleAddItem(BentoItemType.GALLERY)}
          onPointerLeave={() =>
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
          onPointerEnter={() => scanTextIconRef.current?.startAnimation()}
          onPointerLeave={() => scanTextIconRef.current?.stopAnimation()}
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
          onPointerEnter={() => linkIconRef.current?.startAnimation()}
          onPointerLeave={() => linkIconRef.current?.stopAnimation()}
        >
          <LinkIcon ref={linkIconRef} size={20} className="opacity-50" />
          Link
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleAddItem(BentoItemType.TITLE)}
          onPointerEnter={() => aArrowUpIconRef.current?.startAnimation()}
          onPointerLeave={() => aArrowUpIconRef.current?.stopAnimation()}
        >
          <AArrowUpIcon
            ref={aArrowUpIconRef}
            size={20}
            className="opacity-50"
          />
          Title
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
