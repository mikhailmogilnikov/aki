import type { SocialMediaPlatforms } from "./social-media";

export enum Font {
  INTER = "inter",
  OPEN_RUNDE = "open-runde",
  GILROY = "gilroy",
  VOLKORN = "vollkorn",
  JETBRAINS_MONO = "jetbrains-mono",
  MONTSERRAT = "montserrat",
  OSWALD = "oswald",
  CAVEAT = "caveat",
}

export enum Themes {
  LIGHT = "light",
  DARK = "dark",

  GREEN = "green",
  PINK = "pink",
  BLUE = "blue",
  PURPLE = "purple",
  GOLDEN = "golden",

  DARK_BLUE = "dark-blue",
}

export const ThemesNames = {
  [Themes.LIGHT]: "Light",
  [Themes.DARK]: "Dark",
  [Themes.GREEN]: "Green",
  [Themes.PINK]: "Pink",
  [Themes.BLUE]: "Blue",
  [Themes.PURPLE]: "Purple",
  [Themes.GOLDEN]: "Golden",
  [Themes.DARK_BLUE]: "Dark Blue",
};

export interface Theme {
  font: Font;
  theme: Themes;
  show_avatar_blur: boolean;
  border_radius: number;
  border_width: number;
}

export interface SocialMedia {
  platform: SocialMediaPlatforms;
  slug: string;
}
