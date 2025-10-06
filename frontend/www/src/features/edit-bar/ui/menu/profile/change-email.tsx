import { Pencil } from "lucide-react";
import { SectionTitle } from "~/shared/ui/kit/primitives/section-title";

export function ChangeEmail() {
  return (
    <SectionTitle title="Email">
      <div className="squircle-outline p-4 flex items-center justify-between">
        <p className="text-base font-medium">mike@bioly.me</p>
        <button className="text-base font-medium bg-default p-2 rounded-full pressable">
          <Pencil className="size-5" />
        </button>
      </div>
    </SectionTitle>
  );
}
