import TypedLocalStore from "typed-local-store";
import type { Profile } from "~/services/edit-profile/model/profile-provider";

export interface LocalStorageSchema {
  profileSnapshots: Record<string, Profile>;
  localProfile: Profile;
}

export const LocalStorageService = new TypedLocalStore<LocalStorageSchema>({
  storage: "localStorage",
});
