type Gender = "masculine" | "feminine" | "neuter";
type Person = "first" | "second" | "third";

export const GENDER_STYLE: Record<Gender, { selectorBg: string; selectorText: string }> = {
	masculine: { selectorBg: "bg-navy-100", selectorText: "text-navy-text" },
	feminine: { selectorBg: "bg-sunset-100", selectorText: "text-sunset-text" },
	neuter: { selectorBg: "bg-slate-100", selectorText: "text-slate-text" },
};

export const PERSON_LABELS: Record<Person, string> = {
	first: "1st",
	second: "2nd",
	third: "3rd",
};
