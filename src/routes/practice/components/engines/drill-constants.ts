import { SCHEME } from "@/constants/grammar-palette";
import type { Gender } from "@/server/db/enums";

type Person = "first" | "second" | "third";

/** A gender chip claims a gender, so it takes the reserved gender tokens. */
export const GENDER_STYLE: Record<Gender, { selectorBg: string; selectorText: string }> = {
	masculine: { selectorBg: SCHEME["gender-masculine"].bg, selectorText: SCHEME["gender-masculine"].text },
	feminine: { selectorBg: SCHEME["gender-feminine"].bg, selectorText: SCHEME["gender-feminine"].text },
	neuter: { selectorBg: SCHEME["gender-neuter"].bg, selectorText: SCHEME["gender-neuter"].text },
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

/** Shared DIMENSION_OPTIONS for reverse-mode tense selectors, anchored to time words. */
export const TENSE_DIMENSION_OPTIONS = [
	{ id: "past", label: "χθες · past", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{
		id: "present",
		label: "σήμερα · present",
		selectorBg: "bg-stone-100",
		selectorText: "text-stone-800",
	},
	{
		id: "future",
		label: "αύριο · future",
		selectorBg: "bg-stone-100",
		selectorText: "text-stone-800",
	},
];

/** Shared DIMENSION_OPTIONS for reverse-mode person selectors (sg/pl × 1/2/3). */
export const PERSON_DIMENSION_OPTIONS = [
	{ id: "sg1", label: "I", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "sg2", label: "you", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "sg3", label: "he / she", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "pl1", label: "we", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "pl2", label: "you all", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "pl3", label: "they", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
];
