import { Save } from "lucide-react";
import { useState } from "react";
import { SectionTitle } from "~/shared/ui/kit/primitives/section-title";

export function ChangeSlug() {
  const [username, setUsername] = useState("mikhailmogilnikov");

  return (
    <SectionTitle title="Username">
      <div className="flex items-center justify-between squircle-outline p-4">
        <p className="text-base font-medium">
          <span className="text-foreground/50">bioly.me/</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-base font-medium outline-none"
          />
        </p>
        <button
          disabled={username === "mikhailmogilnikov"}
          className="text-base font-medium bg-default p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-opacity pressable"
        >
          <Save className="size-5" />
        </button>
      </div>
      <p className="text-sm text-foreground/50 -mt-1">
        Can be changed only once in 7 days.
      </p>
    </SectionTitle>
  );
}
