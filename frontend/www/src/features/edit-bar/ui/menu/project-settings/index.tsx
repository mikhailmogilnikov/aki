import {
  AdaptiveModal,
  AdaptiveModalContent,
  AdaptiveModalHeader,
} from "~/shared/ui/kit/overlays/adaptive-modal";
import { ThemeSelector } from "./theme-selector";
import { FontSelector } from "./font-selector";
import { RoundSlider } from "./round-slider";
import { BorderSlider } from "./border-slider";

interface ProjectSettingsProps {
  open: boolean;
  onOpenChange: () => void;
}

export function ProjectSettingsModal({
  open,
  onOpenChange,
}: ProjectSettingsProps) {
  return (
    <AdaptiveModal open={open} onOpenChange={onOpenChange}>
      <AdaptiveModalHeader>Project settings</AdaptiveModalHeader>
      <AdaptiveModalContent>
        <div className="flex flex-col gap-6 py-1">
          <div className="flex justify-between items-center pr-1">
            <p className="text-base font-medium">Theme</p>
            <ThemeSelector />
          </div>
          <div className="flex justify-between items-center pr-1">
            <p className="text-base font-medium">Font</p>
            <FontSelector />
          </div>
          <RoundSlider />
          <BorderSlider />
        </div>
      </AdaptiveModalContent>
    </AdaptiveModal>
  );
}
