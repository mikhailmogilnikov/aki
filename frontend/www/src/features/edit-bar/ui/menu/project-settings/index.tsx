import {
  AdaptiveModal,
  AdaptiveModalContent,
  AdaptiveModalFooter,
  AdaptiveModalHeader,
} from "~/shared/ui/kit/overlays/adaptive-modal";

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
        <div className="w-1 h-300 bg-default" />
      </AdaptiveModalContent>
      <AdaptiveModalFooter
        modalProps={{ cancelButton: true }}
        drawerProps={{ cancelButton: true }}
      ></AdaptiveModalFooter>
    </AdaptiveModal>
  );
}
