import { useProfile } from "~/services/edit-profile/model/profile-provider";
import { Slider } from "~/shared/ui/kit/primitives/slider";

export function RoundSlider() {
  const { profile, updateProfile } = useProfile();
  const currentRound = profile.theme.border_radius;

  console.log(currentRound);

  const handleRoundChange = (round: number[]) => {
    window.document.body.style.setProperty("--radius", `${round[0]}px`);
    updateProfile({
      ...profile,
      theme: { ...profile.theme, border_radius: round[0] ?? 0 },
    });
  };

  return (
    <div className="squircle-outline flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <p className="text-base font-medium">Corner radius</p>
        <p className="text-base font-medium opacity-50">{currentRound}px</p>
      </div>
      <Slider
        min={0}
        max={42}
        step={1}
        value={[currentRound]}
        onValueChange={handleRoundChange}
      />
    </div>
  );
}
