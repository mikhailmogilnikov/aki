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
import { CogIcon } from "~/shared/ui/icons/settings";
import { Pulse } from "~/shared/ui/kit/pulse";
import { ArrowUpRight } from "lucide-react";
import { useProfile } from "~/services/edit-profile/model/profile-provider";
import { UserIcon } from "~/shared/ui/icons/user";
import { ProjectSettingsModal } from "./project-settings";
import { ProfileModal } from "./profile";
import { ActivityIcon } from "~/shared/ui/icons/activity";
import { ChartSplineIcon } from "~/shared/ui/icons/chart-spline";

type MenuItemConfig = {
  id: string;
  label: string;
  Icon:
    | typeof CogIcon
    | typeof ActivityIcon
    | typeof UserIcon
    | typeof ChartSplineIcon;
};

const menuItems: MenuItemConfig[] = [
  { id: "settings", label: "Project settings", Icon: CogIcon },
  // { id: "activity", label: "Social media links", Icon: ActivityIcon },
  { id: "profile", label: "Profile", Icon: UserIcon },
  { id: "analytics", label: "Analytics", Icon: ChartSplineIcon },
];

export const EditBarMenu = () => {
  const { profile } = useProfile();

  const [openModals, setOpenModals] = useState<Record<string, boolean>>({
    settings: false,
    activity: false,
    profile: false,
    analytics: false,
  });

  const menuIconRef = useRef<MenuIconHandle>(null);
  const itemIconRefs = useRef<Record<string, any>>({});

  const handleToggleModal = (id: string, value: boolean) => {
    setOpenModals((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <>
      <DropdownMenu
        onOpenChange={(isOpen) => {
          if (isOpen) {
            menuIconRef.current?.startAnimation();

            queueMicrotask(() => {
              Object.values(itemIconRefs.current).forEach((ref) =>
                ref?.startAnimation()
              );

              setTimeout(() => {
                itemIconRefs.current["settings"]?.stopAnimation();
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

          {menuItems.map(({ id, label, Icon }) => (
            <DropdownMenuItem
              key={id}
              onMouseEnter={() => itemIconRefs.current[id]?.startAnimation()}
              onMouseLeave={() => itemIconRefs.current[id]?.stopAnimation()}
              onClick={() => handleToggleModal(id, true)}
            >
              <Icon
                ref={(el: any) => (itemIconRefs.current[id] = el)}
                size={20}
                className="opacity-50"
              />
              {label}
            </DropdownMenuItem>
          ))}

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
        open={openModals.settings ?? false}
        onOpenChange={() => handleToggleModal("settings", false)}
      />
      <ProfileModal
        open={openModals.profile ?? false}
        onOpenChange={() => handleToggleModal("profile", false)}
      />
    </>
  );
};
