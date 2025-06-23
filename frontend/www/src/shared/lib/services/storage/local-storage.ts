import TypedLocalStore from "typed-local-store";
import type { BentoItem } from "~/features/bento/model/bento.type";

export interface LocalStorageSchema {
  bento: BentoItem[];
}

export const LocalStorageService = new TypedLocalStore<LocalStorageSchema>({
  storage: "localStorage",
});
