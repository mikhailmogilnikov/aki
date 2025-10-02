import {
  AdaptiveModal,
  AdaptiveModalContent,
  AdaptiveModalHeader,
} from "~/shared/ui/kit/overlays/adaptive-modal";
import { SectionTitle } from "~/shared/ui/kit/primitives/section-title";
import { ThemeSelector } from "./theme-selector";
import { FontSelector } from "./font-selector";

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
        <div className="flex flex-col gap-6 pb-1">
          <SectionTitle title="General">
            <div className="flex justify-between items-center pr-1">
              <p className="text-base font-medium">Theme</p>
              <ThemeSelector />
            </div>
            <div className="flex justify-between items-center pr-1">
              <p className="text-base font-medium">Font</p>
              <FontSelector />
            </div>
          </SectionTitle>
        </div>
      </AdaptiveModalContent>
    </AdaptiveModal>
  );
}
