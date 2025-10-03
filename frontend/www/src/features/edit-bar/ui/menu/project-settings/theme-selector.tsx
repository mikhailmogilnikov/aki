import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/shared/ui/kit/overlays/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import {
  Themes,
  ThemesNames,
  useProfile,
} from "~/services/edit-profile/model/profile-provider";
import { cn } from "~/shared/lib/utils/cn";

export function ThemeSelector() {
  const { profile, updateProfile } = useProfile();

  const currentTheme = profile.theme.theme;

  const handleThemeChange = (theme: Themes) => {
    window.document.body.classList.remove(currentTheme);
    window.document.body.classList.add(theme);
    updateProfile({ ...profile, theme: { ...profile.theme, theme } });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 bg-default rounded-full px-4 py-2">
        <ChevronDownIcon className="size-4 opacity-50" />
        <div
          className={cn(
            currentTheme,
            "size-6 rounded-full bg-gradient-to-bl from-background to-default border border-outline"
          )}
        />

        <p className="text-base font-medium">{ThemesNames[currentTheme]}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        {Object.values(Themes).map((theme) => (
          <DropdownMenuItem
            key={theme}
            onSelect={() => handleThemeChange(theme)}
            className={cn(theme === currentTheme && "bg-foreground/10")}
          >
            <div
              className={cn(
                theme,
                "size-6 rounded-full bg-gradient-to-bl from-background to-default border border-outline"
              )}
            ></div>
            <p className="text-base font-medium">{ThemesNames[theme]}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
