// Case recognition — trigger-based teaching, no English grammar prerequisite.
// The learner recognises cases by article shape and trigger words, not by
// asking "what is the subject?" — because that question presumes metalanguage
// we can't assume they have.

export type CaseName = "Nominative" | "Accusative" | "Genitive";

export interface CaseRole {
	role: "Doer" | "Target" | "Owner";
	description: string;
	caseName: CaseName;
	example: string;
	translation: string;
	articles: string[];
}

export interface CaseTrigger {
	pattern: string;
	caseName: CaseName;
	meaning: string;
	examples: string[];
}

export const CASE_ROLES: CaseRole[] = [
	{
		role: "Doer",
		description: "who's doing the action",
		caseName: "Nominative",
		example: "ο καφές είναι ζεστός",
		translation: "the coffee is hot",
		articles: ["ο", "η", "το", "οι", "τα"],
	},
	{
		role: "Target",
		description: "what the action touches, or after a preposition",
		caseName: "Accusative",
		example: "θέλω τον καφέ",
		translation: "I want the coffee",
		articles: ["τον", "την", "το", "τους", "τις", "τα"],
	},
	{
		role: "Owner",
		description: "whose something is",
		caseName: "Genitive",
		example: "η μυρωδιά του καφέ",
		translation: "the smell of the coffee",
		articles: ["του", "της", "των"],
	},
];

export const CASE_TRIGGERS: CaseTrigger[] = [
	{
		pattern: "After στο / στη / στον / σε",
		caseName: "Accusative",
		meaning: "going to, at somewhere",
		examples: ["πηγαίνω στο σπίτι", "στη δουλειά"],
	},
	{
		pattern: "After με / από / για",
		caseName: "Accusative",
		meaning: "with, from, for",
		examples: ["με τον φίλο", "από το σπίτι"],
	},
	{
		pattern: "Time expressions",
		caseName: "Accusative",
		meaning: "when something happens",
		examples: ["τη Δευτέρα", "το πρωί"],
	},
	{
		pattern: "Before μου / σου / του / της",
		caseName: "Genitive",
		meaning: "my, your, his, her",
		examples: ["το σπίτι μου", "η αδερφή της"],
	},
	{
		pattern: "After του / της + name",
		caseName: "Genitive",
		meaning: "belongs to someone",
		examples: ["της Μαρίας", "του Νίκου"],
	},
];
