// Case recognition — trigger-based teaching, no English grammar prerequisite.
// The learner recognises cases by article shape and trigger words, not by
// asking "what is the subject?" — because that question presumes metalanguage
// we can't assume they have.

export type CaseName = "Nominative" | "Accusative" | "Genitive";

/**
 * Case colour asserts the case of the Greek it covers, so an example names the
 * words that carry the case and only those take the colour. In θέλω τον καφέ
 * the verb is not a Target. Each marked span must occur verbatim in `greek`, in order.
 */
interface CaseExample {
	greek: string;
	marked: string | string[];
}

interface CaseRole {
	role: "Doer" | "Target" | "Owner";
	description: string;
	caseName: CaseName;
	example: CaseExample;
	translation: string;
	articles: string[];
}

interface CaseTrigger {
	pattern: string;
	caseName: CaseName;
	meaning: string;
	examples: CaseExample[];
}

export const CASE_ROLES: CaseRole[] = [
	{
		role: "Doer",
		description: "who's doing the action, or what's being named after είναι",
		caseName: "Nominative",
		example: { greek: "ο καφές είναι ζεστός", marked: ["ο καφές", "ζεστός"] },
		translation: "the coffee is hot",
		articles: ["ο", "η", "το", "οι", "τα"],
	},
	{
		role: "Target",
		description: "what the action touches, or after a preposition",
		caseName: "Accusative",
		example: { greek: "θέλω τον καφέ", marked: "τον καφέ" },
		translation: "I want the coffee",
		articles: ["τον", "την", "το", "τους", "τις", "τα"],
	},
	{
		role: "Owner",
		description: "whose something is",
		caseName: "Genitive",
		example: { greek: "η μυρωδιά του καφέ", marked: "του καφέ" },
		translation: "the smell of the coffee",
		articles: ["του", "της", "των"],
	},
];

export const CASE_TRIGGERS: CaseTrigger[] = [
	{
		pattern: "After στο / στη / στον / σε",
		caseName: "Accusative",
		meaning: "going to, at somewhere",
		examples: [
			{ greek: "πηγαίνω στο σπίτι", marked: "στο σπίτι" },
			{ greek: "στη δουλειά", marked: "στη δουλειά" },
		],
	},
	{
		pattern: "After με / από / για",
		caseName: "Accusative",
		meaning: "with, from, for",
		examples: [
			{ greek: "με τον φίλο", marked: "τον φίλο" },
			{ greek: "από το σπίτι", marked: "το σπίτι" },
		],
	},
	{
		pattern: "Time expressions",
		caseName: "Accusative",
		meaning: "when something happens",
		examples: [
			{ greek: "τη Δευτέρα", marked: "τη Δευτέρα" },
			{ greek: "το πρωί", marked: "το πρωί" },
		],
	},
	{
		pattern: "μου / σου / του / της after a noun",
		caseName: "Genitive",
		meaning: "my, your, his, her: these words are already Owner forms",
		examples: [
			{ greek: "το σπίτι μου", marked: "μου" },
			{ greek: "η αδερφή της", marked: "της" },
		],
	},
	{
		pattern: "After του / της + name",
		caseName: "Genitive",
		meaning: "belongs to someone",
		examples: [
			{ greek: "της Μαρίας", marked: "της Μαρίας" },
			{ greek: "του Νίκου", marked: "του Νίκου" },
		],
	},
];
