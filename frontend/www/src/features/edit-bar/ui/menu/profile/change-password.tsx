import { KeyRound } from "lucide-react";

export function ChangePassword() {
  return (
    <button className="squircle bg-default pressable px-4 py-3  font-medium flex items-center gap-2 justify-center">
      <KeyRound className="size-4" />
      Change password
    </button>
  );
}
