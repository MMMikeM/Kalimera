import { createLesson } from "@/types/lesson-builder";

export const LESSON_2025_03_17 = createLesson({
	meta: {
		date: "2025-03-17",
		topic: "Haircut, seasons, πρέπει/έπρεπε, flowers, hunger (πεινάω)",
		source: "Weekly lesson - κουρεύτηκα, seasons vocabulary, πρέπει, πεινάω conjugation",
	},

	verbs: [
		{ lemma: "κουρεύομαι", english: "I get a haircut", conjugationFamily: "-ομαι", cefrLevel: "A2" },
		{ lemma: "κόβω", english: "I cut", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "πεινάω", english: "I am hungry", conjugationFamily: "-άω/-ώ", cefrLevel: "A1" },
	],

	nouns: [
		{ lemma: "κομμωτής", gender: "masculine", english: "hairdresser (male)", cefrLevel: "A2" },
		{ lemma: "κομμώτρια", gender: "feminine", english: "hairdresser (female)", cefrLevel: "A2" },
		{ lemma: "μπαρμπέρης", gender: "masculine", english: "barber", cefrLevel: "A2" },
		{ lemma: "κουρέας", gender: "masculine", english: "barber", cefrLevel: "A2" },
		{ lemma: "διακοπές", gender: "feminine", english: "holidays (plural)", cefrLevel: "A1" },
		{ lemma: "χειμώνας", gender: "masculine", english: "winter", cefrLevel: "A1" },
		{ lemma: "άνοιξη", gender: "feminine", english: "spring", cefrLevel: "A1" },
		{ lemma: "καλοκαίρι", gender: "neuter", english: "summer", cefrLevel: "A1" },
		{ lemma: "φθινόπωρο", gender: "neuter", english: "autumn", cefrLevel: "A1" },
		{ lemma: "λουλούδι", gender: "neuter", english: "flower (λουλούδια = flowers)", cefrLevel: "A1" },
	],

	phrases: [
		// κουρεύτηκα paradigm
		{
			text: "κουρεύτηκα",
			english: "I got a haircut (past of κουρεύομαι)",
			metadata: { pattern: "deponent past -τηκα of κουρεύομαι", usage: "simple past" },
		},
		{
			text: "έκοψα τα μαλλιά μου",
			english: "I cut my hair",
			metadata: { pattern: "έκοψα (past of κόβω) + τα μαλλιά μου", usage: "haircut" },
		},
		// Holiday expression
		{
			text: "κάνω διακοπές",
			english: "I am on holiday",
			metadata: { pattern: "κάνω + διακοπές", usage: "being on holiday" },
		},
		// πρέπει
		{
			text: "πρέπει",
			english: "must/have to (impersonal)",
			metadata: { pattern: "πρέπει να + verb", usage: "obligation — present" },
		},
		{
			text: "έπρεπε",
			english: "had to (past of πρέπει)",
			metadata: { pattern: "έπρεπε να + verb", usage: "obligation — past" },
		},
		// Social expression
		{
			text: "σου κάνω το τραπέζι",
			english: "I'll treat you to dinner/lunch",
			metadata: {
				pattern: "indirect pronoun + κάνω το τραπέζι",
				usage: "offering to pay for a meal",
			},
		},
		{
			text: "τελευταία φορά",
			english: "last time",
			metadata: { usage: "referring to the most recent occasion" },
		},
	],

	grammarNotes: [
		{
			pattern: "κουρεύομαι → κουρεύτηκα (deponent past)",
			examples: [
				"κουρεύτηκα (I got a haircut)",
				"κουρεύτηκες (you got a haircut)",
				"κουρεύτηκε (he/she got a haircut)",
				"κουρευτήκαμε (we got a haircut)",
				"κουρευτήκατε (you pl. got a haircut)",
				"κουρεύτηκαν (they got a haircut)",
			],
			explanation:
				"κουρεύομαι is deponent — reflexive meaning (getting cut, not doing the cutting). Past uses -τηκα suffix. Compare: κόβω (active, I cut something) vs κουρεύομαι (I get myself cut).",
		},
		{
			pattern: "πεινάω — hunger conjugation",
			examples: [
				"πεινάω (I am hungry)",
				"πεινάς (you are hungry)",
				"πεινάει (he/she is hungry)",
				"πεινάμε (we are hungry)",
				"πεινάτε (you pl. are hungry)",
				"πεινάνε (they are hungry)",
			],
			explanation:
				"πεινάω follows the -άω/-ώ contracted pattern. It describes a state rather than an action — equivalent to 'I am hungry', not 'I hunger'.",
		},
		{
			pattern: "πρέπει / έπρεπε — impersonal obligation",
			examples: [
				"πρέπει να πάω (I must go / I have to go)",
				"πρέπει να φας (you must eat)",
				"έπρεπε να πάω (I had to go)",
				"έπρεπε να φύγεις (you had to leave)",
			],
			explanation:
				"πρέπει is impersonal — it doesn't change for person. Always followed by να + verb. Past form: έπρεπε (unchanged across all persons).",
		},
		{
			pattern: "Four seasons",
			examples: [
				"ο χειμώνας — winter (masc)",
				"η άνοιξη — spring (fem)",
				"το καλοκαίρι — summer (neut)",
				"το φθινόπωρο — autumn (neut)",
			],
			explanation:
				"Seasons have three different genders. χειμώνας and άνοιξη take the article in a different way — το καλοκαίρι/φθινόπωρο are neuter.",
		},
	],
});
