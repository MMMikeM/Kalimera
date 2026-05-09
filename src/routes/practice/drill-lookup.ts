import type { Drill } from "./group-section";
import { drills as caseDrills } from "./groups/cases";
import { drills as pronounDrills } from "./groups/pronouns";
import { drills as verbDrills } from "./groups/verbs";
import { drills as blockDrills } from "./groups/blocks";

export type { Drill };

export const DRILL_BY_ID: Record<string, Drill> = Object.fromEntries(
	[...caseDrills, ...pronounDrills, ...verbDrills, ...blockDrills].map((d) => [d.id, d]),
);
