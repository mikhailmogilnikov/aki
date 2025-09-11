import { Check } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/shared/ui/kit/overlays/react-tooltip";
import { EditBarMenu } from "./menu";
import { EditBarNewItem } from "./new-item";

export const EditBar = () => {
  return (
    <nav className="fixed sm:bottom-6 bottom-5 left-1/2 -translate-x-1/2 w-fit max-w-72 h-fit p-2 bg-default/50 backdrop-blur-md rounded-full overflow-clip z-2 flex items-center justify-between gap-1.5 border border-foreground/8">
      <EditBarMenu />
      <EditBarNewItem />

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="w-fit px-4 h-12 pressable rounded-full bg-success/50 backdrop-blur-md flex items-center justify-center gap-1 text-sm font-semibold border border-foreground/8">
            <Check className="size-5 text-foreground" />
            Synced
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Last sync at {new Date().toLocaleString()}</p>
        </TooltipContent>
      </Tooltip>
    </nav>
  );
};
