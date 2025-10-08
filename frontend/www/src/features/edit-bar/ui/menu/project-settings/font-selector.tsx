import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/shared/ui/kit/overlays/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { useProfile } from "~/services/edit-profile/model/profile-provider";
import { cn } from "~/shared/lib/utils/cn";
import { Font } from "~/shared/domain/entities.type";

export function FontSelector() {
  const { profile, updateProfile } = useProfile();

  const currentFont = profile.theme.font;

  const handleFontChange = (font: Font) => {
    window.document.body.classList.remove(currentFont);
    window.document.body.classList.add(font);
    updateProfile({ ...profile, theme: { ...profile.theme, font } });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 bg-default rounded-full px-4 py-2">
        <ChevronDownIcon className="size-4 opacity-50" />
        <p
          className={cn(
            currentFont,
            "text-base font-medium first-letter:capitalize"
          )}
        >
          {currentFont}
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent isInsideDialog>
        <DropdownMenuLabel>Font</DropdownMenuLabel>
        {Object.values(Font).map((font) => (
          <DropdownMenuItem
            key={font}
            onSelect={() => handleFontChange(font)}
            className={cn(font === currentFont && "bg-foreground/10")}
          >
            <p
              className={cn(
                font,
                "text-base font-medium first-letter:capitalize"
              )}
            >
              {font}
            </p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
