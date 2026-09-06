import { genderScheme } from "@/constants/grammar-palette";
import type { Gender } from "@/server/db/enums";

export const persons = ["first", "second", "third"] as const;
export const numbers = ["singular", "plural"] as const;
type Person = (typeof persons)[number];

/** A gender chip claims a gender, so it takes the reserved gender tokens. */
const genderSelector = (g: Gender) => ({
	selectorBg: genderScheme(g).bg,
	selectorText: genderScheme(g).text,
});

export const GENDER_STYLE: Record<Gender, { selectorBg: string; selectorText: string }> = {
	masculine: genderSelector("masculine"),
	feminine: genderSelector("feminine"),
	neuter: genderSelector("neuter"),
};

/** Shared CATEGORIES list for drills covering singular (by gender) + plural. */
export const GENDER_PLURAL_CATEGORIES = [
	{ id: "masculine", label: "Masculine (sg)" },
	{ id: "feminine", label: "Feminine (sg)" },
	{ id: "neuter", label: "Neuter (sg)" },
	{ id: "plural", label: "Plural" },
];

/** Shared DIMENSION_OPTIONS for reverse-mode gender selectors. */
export const GENDER_DIMENSION_OPTIONS = [
	{ id: "masculine", label: "Masculine", ...GENDER_STYLE.masculine },
	{ id: "feminine", label: "Feminine", ...GENDER_STYLE.feminine },
	{ id: "neuter", label: "Neuter", ...GENDER_STYLE.neuter },
];

export const PERSON_LABELS: Record<Person, string> = {
	first: "1st",
	second: "2nd",
	third: "3rd",
};

/** Page-local axes, so their selectors claim no role colour. */
const NEUTRAL = { selectorBg: "bg-stone-100", selectorText: "text-stone-800" };

/** Shared DIMENSION_OPTIONS for reverse-mode tense selectors, anchored to time words. */
export const TENSE_DIMENSION_OPTIONS = [
	{ id: "past", label: "χθες · past", ...NEUTRAL },
	{ id: "present", label: "σήμερα · present", ...NEUTRAL },
	{ id: "future", label: "αύριο · future", ...NEUTRAL },
];

/** Shared DIMENSION_OPTIONS for reverse-mode person selectors (sg/pl × 1/2/3). */
export const PERSON_DIMENSION_OPTIONS = [
	{ id: "sg1", label: "I", ...NEUTRAL },
	{ id: "sg2", label: "you", ...NEUTRAL },
	{ id: "sg3", label: "he / she", ...NEUTRAL },
	{ id: "pl1", label: "we", ...NEUTRAL },
	{ id: "pl2", label: "you all", ...NEUTRAL },
	{ id: "pl3", label: "they", ...NEUTRAL },
];
