import {
  AdaptiveModal,
  AdaptiveModalContent,
  AdaptiveModalHeader,
} from "~/shared/ui/kit/overlays/adaptive-modal";
import { ChangeSlug } from "./change-slug";
import { ChangeEmail } from "./change-email";
import { ChangePassword } from "./change-password";

interface ProjectSettingsProps {
  open: boolean;
  onOpenChange: () => void;
}

export function ProfileModal({ open, onOpenChange }: ProjectSettingsProps) {
  return (
    <AdaptiveModal open={open} onOpenChange={onOpenChange}>
      <AdaptiveModalHeader>Profile</AdaptiveModalHeader>
      <AdaptiveModalContent>
        <div className="flex flex-col gap-6 py-1">
          <ChangeSlug />
          <hr className="h-px border-outline" />
          <ChangeEmail />
          <ChangePassword />
        </div>
      </AdaptiveModalContent>
    </AdaptiveModal>
  );
}
