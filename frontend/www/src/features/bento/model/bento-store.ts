import { map } from "nanostores";
import type { BentoItem } from "./bento.type";

export const bentoState = map<BentoItem[]>([]);
