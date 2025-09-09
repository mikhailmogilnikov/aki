import {
  Check,
  ExternalLink,
  Link,
  Menu,
  PlusCircle,
  ScanEye,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/shared/ui/kit/overlays/react-tooltip";

export const EditBar = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-fit max-w-72 h-14 bg-default/50 backdrop-blur-md shadow-md shadow-shadow rounded-full overflow-clip z-2 flex items-center justify-between px-2 gap-1.5">
      <Tooltip>
        <TooltipTrigger>
          <button className="w-10 h-10 pressable rounded-full bg-default/50 backdrop-blur-md flex items-center justify-center shadow shadow-shadow">
            <Menu strokeWidth={2.5} className="size-5 text-foreground" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Menu</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <button className="w-10 h-10 pressable rounded-full bg-default/50 backdrop-blur-md flex items-center justify-center shadow shadow-shadow">
            <PlusCircle className="size-6 text-foreground" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add a new block</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <button className="w-10 h-10 pressable rounded-full bg-default/50 backdrop-blur-md flex items-center justify-center shadow shadow-shadow">
            <ExternalLink className="size-6 text-link" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Go to live page</p>
        </TooltipContent>
      </Tooltip>

      <button className="w-fit px-3 h-10 pressable rounded-full bg-success/50 backdrop-blur-md flex items-center justify-center gap-1 text-sm font-semibold shadow shadow-shadow">
        <Check className="size-5 text-foreground" />
        Synced
      </button>
    </div>
  );
};
