import type { Item } from "./types";

/* -------------------------------------------
   Import individual hymnals
------------------------------------------- */
import { methodistHymnbook } from "./methodist";
import { ancientAndModern } from "./ancient-modern";
import { catholicHymnal } from "./catholic";
import { presbyHymnbook } from "./presby";
import { seventhDayAdventist } from "./sda";
import { unitedMethodistChurchHymnal } from "./umc";
import { chantsCanticlesPsalms } from "./chants";

/* -------------------------------------------
   Hymnal dropdown options (alphabetical)
------------------------------------------- */
export const HYMNAL_OPTIONS = [
  "Ancient & Modern",
  "Catholic Hymnal",
  "Methodist Hymnbook",
  "Presby Hymnbook",
  "Seventh Day Adventist",
  "United Methodist Church Hymnal",
  "ChantsCanticlesPsalms",
] as const;

export type HymnalName = (typeof HYMNAL_OPTIONS)[number];

/* -------------------------------------------
   Hymnal registry (single source of truth)
------------------------------------------- */
export const HYMNAL_DATA: Record<HymnalName, Item[]> = {
  "Ancient & Modern": ancientAndModern,
  "Catholic Hymnal": catholicHymnal,
  "Methodist Hymnbook": methodistHymnbook,
  "Presby Hymnbook": presbyHymnbook,
  "Seventh Day Adventist": seventhDayAdventist,
  "United Methodist Church Hymnal": unitedMethodistChurchHymnal,
  "ChantsCanticlesPsalms": chantsCanticlesPsalms,
};
