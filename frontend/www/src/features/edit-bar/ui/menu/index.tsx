import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "~/shared/ui/kit/overlays/react-tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/shared/ui/kit/overlays/dropdown-menu";
import { MenuIcon, type MenuIconHandle } from "~/shared/ui/icons/menu";
import { useRef } from "react";

export const EditBarMenu = () => {
  const menuIconRef = useRef<MenuIconHandle>(null);
  return (
    <DropdownMenu
      onOpenChange={(isOpen) => {
        if (isOpen) {
          menuIconRef.current?.startAnimation();
        } else {
          menuIconRef.current?.stopAnimation();
        }
      }}
    >
      <DropdownMenuTrigger
        tabIndex={1}
        className="size-10 pressable cursor-pointer rounded-full bg-default/50 backdrop-blur-md"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="size-full flex items-center justify-center shadow shadow-shadow">
              <MenuIcon
                ref={menuIconRef}
                className="text-foreground"
                size={22}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Menu</p>
          </TooltipContent>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Project Settings</DropdownMenuItem>
        <DropdownMenuItem>Profile</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
