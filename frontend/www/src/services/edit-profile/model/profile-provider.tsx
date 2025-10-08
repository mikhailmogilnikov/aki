import { createContext, useContext, useState } from "react";
import type { BentoItemProperties } from "~/features/bento/model/bento-props.type";
import type {
  BentoItem,
  BentoItemType,
} from "~/features/bento/model/bento.type";

import { LocalStorageService } from "~/shared/lib/services/storage";

import type { SocialMedia } from "~/shared/domain/entities.type";
import type { Theme } from "~/shared/domain/entities.type";
import { Font } from "~/shared/domain/entities.type";
import { Themes } from "~/shared/domain/entities.type";

export interface Profile {
  id: string;
  name: string;
  description: string;
  bento: BentoItem<BentoItemType>[];
  social_media: SocialMedia[];
  theme: Theme;
}

const DEFAULT_PROFILE: Profile = {
  id: "1",
  name: "Mikhail Mogilnikov",
  description: "Software & Design Engineer",
  bento: [],
  social_media: [],
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
  updateBentoItem: (
    id: string,
    properties: BentoItemProperties<BentoItemType>
  ) => void;
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

  const updateBentoItem = (
    id: string,
    properties: BentoItemProperties<BentoItemType>
  ) => {
    setProfile({
      ...profile,
      bento: profile.bento.map((item) =>
        item.id === id ? { ...item, properties } : item
      ),
    });
  };

  return (
    <ProfileContext.Provider
      value={{ profile, updateProfile, updateBentoItem }}
    >
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
