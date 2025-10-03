import { useProfile } from "~/services/edit-profile/model/profile-provider";
import { Slider } from "~/shared/ui/kit/primitives/slider";

export function BorderSlider() {
  const { profile, updateProfile } = useProfile();
  const currentBorder = profile.theme.border_width;

  const handleRoundChange = (round: number[]) => {
    window.document.body.style.setProperty("--border-width", `${round[0]}px`);
    updateProfile({
      ...profile,
      theme: { ...profile.theme, border_width: round[0] ?? 0 },
    });
  };

  return (
    <div className="squircle-outline flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <p className="text-base font-medium">Border width</p>
        <p className="text-base font-medium opacity-50">{currentBorder}px</p>
      </div>
      <Slider
        min={1}
        max={6}
        step={1}
        value={[currentBorder]}
        onValueChange={handleRoundChange}
        className="mb-1"
      />
    </div>
  );
}
