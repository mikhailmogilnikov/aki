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
import { MenuIcon, type MenuIconHandle } from "~/shared/ui/icons/menu";
import { useRef, useState } from "react";
import { CogIcon, type CogIconHandle } from "~/shared/ui/icons/settings";
import { Pulse } from "~/shared/ui/kit/pulse";
import { ArrowUpRight } from "lucide-react";
import { useProfile } from "~/services/edit-profile/model/profile-provider";
import { UserIcon, type UserIconHandle } from "~/shared/ui/icons/user";
import { ProjectSettingsModal } from "./project-settings";
import { ProfileModal } from "./profile";

export const EditBarMenu = () => {
  const { profile } = useProfile();

  const [openSettings, setOpenSettings] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const menuIconRef = useRef<MenuIconHandle>(null);

  const cogIconRef = useRef<CogIconHandle>(null);
  const userIconRef = useRef<UserIconHandle>(null);

  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  return (
    <>
      <DropdownMenu
        onOpenChange={(isOpen) => {
          if (isOpen) {
            menuIconRef.current?.startAnimation();

            queueMicrotask(() => {
              cogIconRef.current?.startAnimation();
              userIconRef.current?.startAnimation();

              setTimeout(() => {
                cogIconRef.current?.stopAnimation();
              }, 400);
            });
          } else {
            menuIconRef.current?.stopAnimation();
          }
        }}
      >
        <DropdownMenuTrigger className="size-12 pressable cursor-pointer rounded-full bg-default/50 backdrop-blur-md border border-foreground/8">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="size-full flex items-center justify-center ">
                <MenuIcon
                  ref={menuIconRef}
                  className="text-foreground"
                  size={24}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Menu</p>
            </TooltipContent>
          </Tooltip>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Menu</DropdownMenuLabel>

          <DropdownMenuItem
            onMouseEnter={() => cogIconRef.current?.startAnimation()}
            onMouseLeave={() => cogIconRef.current?.stopAnimation()}
            onClick={() => setOpenSettings(true)}
          >
            <CogIcon ref={cogIconRef} size={20} className="opacity-50" />
            Project settings
          </DropdownMenuItem>

          <DropdownMenuItem
            onMouseEnter={() => userIconRef.current?.startAnimation()}
            onMouseLeave={() => userIconRef.current?.stopAnimation()}
            onClick={() => setOpenProfile(true)}
          >
            <UserIcon ref={userIconRef} size={20} className="opacity-50" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild className="relative">
            <a
              target="_blank"
              aria-label="Go to live page"
              className="group"
              href={`https://aki-www.vercel.app/${profile.id}`}
            >
              <Pulse className="mx-1.5" />
              Go to live
              <ArrowUpRight className="absolute right-3 size-4 opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProjectSettingsModal
        open={openSettings}
        onOpenChange={handleCloseSettings}
      />
      <ProfileModal open={openProfile} onOpenChange={handleCloseProfile} />
    </>
  );
};
