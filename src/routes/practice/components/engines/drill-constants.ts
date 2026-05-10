type Gender = "masculine" | "feminine" | "neuter";
type Person = "first" | "second" | "third";

export const GENDER_STYLE: Record<Gender, { selectorBg: string; selectorText: string }> = {
	masculine: { selectorBg: "bg-navy-100", selectorText: "text-navy-text" },
	feminine: { selectorBg: "bg-sunset-100", selectorText: "text-sunset-text" },
	neuter: { selectorBg: "bg-slate-100", selectorText: "text-slate-text" },
};

/** Shared CATEGORIES list for drills filtering by gender (no case suffix). */
export const GENDER_CATEGORIES = [
	{ id: "masculine", label: "Masculine" },
	{ id: "feminine", label: "Feminine" },
	{ id: "neuter", label: "Neuter" },
];

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

/** Shared DIMENSION_OPTIONS for reverse-mode person selectors (sg/pl × 1/2/3). */
export const PERSON_DIMENSION_OPTIONS = [
	{ id: "sg1", label: "I", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "sg2", label: "you", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "sg3", label: "he / she", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "pl1", label: "we", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "pl2", label: "you all", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "pl3", label: "they", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
];
