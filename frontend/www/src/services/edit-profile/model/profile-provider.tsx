import { createContext, useContext, useState } from "react";
import type {
  BentoItem,
  BentoItemType,
} from "~/features/bento/model/bento.type";

import { LocalStorageService } from "~/shared/lib/services/storage";

export enum Font {
  INTER = "inter",
  VOLKORN = "vollkorn",
  OPEN_RUNDE = "open-runde",
  MONTSERRAT = "montserrat",
  OSWALD = "oswald",
  CAVEAT = "caveat",
  JETBRAINS_MONO = "jetbrains-mono",
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

export interface Profile {
  id: string;
  name: string;
  description: string;
  bento: BentoItem<BentoItemType>[];
  theme: Theme;
}

const DEFAULT_PROFILE: Profile = {
  id: "1",
  name: "Mikhail Mogilnikov",
  description: "Software & Design Engineer",
  bento: [],
  theme: {
    font: Font.OPEN_RUNDE,
    theme: Themes.DARK,
    show_avatar_blur: true,
    border_radius: 24,
    border_width: 1,
  },
};

export const ProfileContext = createContext<{
  profile: Profile;
  updateProfile: (profile: Profile) => void;
} | null>(null);

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profile, setProfile] = useState<Profile>(() => {
    const localProfile = LocalStorageService.getItem("localProfile", "safe");
    return localProfile ?? DEFAULT_PROFILE;
  });

  const updateProfile = (profile: Profile) => {
    setProfile(profile);
    LocalStorageService.setItem("localProfile", profile);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const profile = useContext(ProfileContext);

  if (!profile) {
    throw new Error("Profile not found");
  }

  return profile;
};
