import { createContext, useContext, useState } from "react";

type Font =
  | "inter"
  | "vollkorn"
  | "open-runde"
  | "montserrat"
  | "oswald"
  | "caveat"
  | "jetbrains-mono";

export interface ThemeColors {
  background: string;
  foreground: string;
  default: string;
  outline: string;
}

export interface Theme {
  font: Font;
  show_avatar_blur: boolean;
  border_radius: number;
  border_width: number;
  colors: ThemeColors;
}

export interface Profile {
  name: string;
  description: string;
  bento: {}[];
  theme: Theme;
}

const DEFAULT_PROFILE: Profile = {
  name: "Mikhail Mogilnikov",
  description: "Software & Design Engineer",
  bento: [],
  theme: {
    font: "open-runde",
    show_avatar_blur: true,
    border_radius: 24,
    border_width: 1,
    colors: {
      background: "#000",
      foreground: "#fff",
      default: "#000",
      outline: "#000",
    },
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
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);

  const updateProfile = (profile: Profile) => {
    setProfile(profile);
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
