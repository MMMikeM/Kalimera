import { drills as blockDrills } from "../blocks/index";
import { drills as caseDrills } from "../cases/index";
import { drills as pronounDrills } from "../pronouns/index";
import { drills as verbDrills } from "../verbs/index";
import type { Drill } from "./group-section";

export type { Drill };

export const DRILL_BY_ID: Record<string, Drill> = Object.fromEntries(
	[...caseDrills, ...pronounDrills, ...verbDrills, ...blockDrills].map((d) => [d.id, d]),
);
