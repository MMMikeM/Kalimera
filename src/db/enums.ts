// Word types enum values
export const wordTypes = [
	"noun",
	"verb",
	"adjective",
	"adverb",
	"phrase",
	"preposition",
] as const;
export type WordType = (typeof wordTypes)[number];

// Gender enum values
export const genders = ["masculine", "feminine", "neuter"] as const;
export type Gender = (typeof genders)[number];

// Case types enum values
export const caseTypes = ["accusative", "genitive", "nominative", "vocative"] as const;
export type CaseType = (typeof caseTypes)[number];

// Session types enum values
export const sessionTypes = [
	"vocab_quiz",
	"case_drill",
	"conjugation_drill",
	"weak_area_focus",
] as const;
export type SessionType = (typeof sessionTypes)[number];

// Skill types enum values
export const skillTypes = ["recognition", "production"] as const;
export type SkillType = (typeof skillTypes)[number];

// Area types enum values
export const areaTypes = ["case", "gender", "verb_family"] as const;
export type AreaType = (typeof areaTypes)[number];

// Display sections for UI organization (tag_sections lookup table)
export const displaySections = ["nouns", "verbs", "phrases", "reference"] as const;
export type DisplaySection = (typeof displaySections)[number];
