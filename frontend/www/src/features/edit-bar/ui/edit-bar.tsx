import { Check, ExternalLink } from "lucide-react";
import { useProfile } from "~/services/edit-profile/model/profile-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/shared/ui/kit/overlays/react-tooltip";
import { EditBarMenu } from "./menu";
import { EditBarNewItem } from "./new-item";

export const EditBar = () => {
  const { profile } = useProfile();

  return (
    <div className="fixed sm:bottom-6 bottom-5 left-1/2 -translate-x-1/2 w-fit max-w-72 h-14 bg-default/50 backdrop-blur-md shadow-md shadow-shadow rounded-full overflow-clip z-2 flex items-center justify-between px-2 gap-1.5">
      <EditBarMenu />
      <EditBarNewItem />

      <Tooltip>
        <TooltipTrigger asChild>
          <a
            target="_blank"
            tabIndex={1}
            aria-label="Go to live page"
            // TODO: Replace with actual live page
            href={`https://aki-www.vercel.app/${profile.id}`}
            className="w-10 h-10 pressable rounded-full bg-default/50 backdrop-blur-md flex items-center justify-center shadow shadow-shadow"
          >
            <ExternalLink className="size-6" />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Go to live page</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            tabIndex={1}
            className="w-fit px-3 h-10 pressable rounded-full bg-success/50 backdrop-blur-md flex items-center justify-center gap-1 text-sm font-semibold shadow shadow-shadow"
          >
            <Check className="size-5 text-foreground" />
            Synced
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Last sync at {new Date().toLocaleString()}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
