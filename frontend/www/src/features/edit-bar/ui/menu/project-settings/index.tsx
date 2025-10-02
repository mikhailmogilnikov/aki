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
        <div className="flex flex-col gap-6">
          {Array.from({ length: 20 }).map((_, index) => (
            <p key={index} className="text-2xl font-bold">
              test
            </p>
          ))}
        </div>
      </AdaptiveModalContent>
      <AdaptiveModalFooter
        modalProps={{ cancelButton: true }}
        drawerProps={{ cancelButton: true }}
      ></AdaptiveModalFooter>
    </AdaptiveModal>
  );
}
