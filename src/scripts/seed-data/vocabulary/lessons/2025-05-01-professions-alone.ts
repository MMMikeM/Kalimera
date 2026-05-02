import { createLesson } from "@/types/lesson-builder";

export const LESSON_2025_05_01 = createLesson({
	meta: {
		date: "2025-05-01",
		topic: "Professions, μόνος/μόνη/μόνο + possessive (by oneself), επίσης",
		source: "Weekly lesson - job vocabulary, μόνος μου pattern, common-gender nouns",
	},

	nouns: [
		{
			lemma: "μπαρίστα",
			gender: "feminine",
			english: "barista (ο/η μπαρίστα — common gender)",
			cefrLevel: "A2",
		},
		{
			lemma: "υπεύθυνος",
			gender: "masculine",
			english: "manager/person in charge (η υπεύθυνη — feminine)",
			cefrLevel: "A2",
		},
		{
			lemma: "υπάλληλος",
			gender: "masculine",
			english: "employee (ο/η υπάλληλος — common gender)",
			cefrLevel: "A2",
		},
		{
			lemma: "καλλιτέχνης",
			gender: "masculine",
			english: "artist (ο/η καλλιτέχνης — common gender)",
			cefrLevel: "A2",
		},
		{ lemma: "τέχνη", gender: "feminine", english: "art", cefrLevel: "A2" },
		{
			lemma: "νοσηλευτής",
			gender: "masculine",
			english: "nurse — male (η νοσηλεύτρια — female)",
			cefrLevel: "A2",
		},
		{
			lemma: "νοσοκόμος",
			gender: "masculine",
			english: "nurse — male, informal (η νοσοκόμα — female)",
			cefrLevel: "A2",
		},
		{ lemma: "νοσοκομείο", gender: "neuter", english: "hospital", cefrLevel: "A1" },
		{
			lemma: "βοηθός",
			gender: "masculine",
			english: "assistant/helper (ο/η βοηθός — common gender)",
			cefrLevel: "A2",
		},
		{
			lemma: "οδοντίατρος",
			gender: "masculine",
			english: "dentist (ο/η οδοντίατρος — common gender)",
			cefrLevel: "A2",
		},
		{
			lemma: "φοιτητής",
			gender: "masculine",
			english: "university student — male (η φοιτήτρια — female)",
			cefrLevel: "A1",
		},
		{ lemma: "καφετέρια", gender: "feminine", english: "café/coffee shop", cefrLevel: "A1" },
	],

	adjectives: [{ lemma: "μόνος", english: "alone/by oneself", cefrLevel: "A1" }],

	adverbs: [{ lemma: "επίσης", english: "also/as well", cefrLevel: "A1" }],

	phrases: [
		// μόνος + possessive pattern
		{
			text: "Δουλεύω μόνος μου",
			english: "I work by myself (male speaker)",
			metadata: {
				pattern: "μόνος/μόνη + possessive pronoun",
				usage: "doing something alone — male",
			},
		},
		{
			text: "Δουλεύει μόνη της",
			english: "She works by herself",
			metadata: { pattern: "μόνη + της", usage: "doing something alone — female" },
		},
		{
			text: "Δεν δουλεύεις μόνη σου",
			english: "You don't work by yourself (female addressed)",
			metadata: { pattern: "μόνη + σου", usage: "doing something alone — female" },
		},
		{
			text: "Είμαι μόνος μου",
			english: "I am alone / I am by myself (male speaker)",
			metadata: { pattern: "είμαι + μόνος/μόνη + possessive", usage: "being alone" },
		},
		// Profession usage examples
		{
			text: "Η μπαρίστα δουλεύει στο καφέ",
			english: "The barista works in the café",
			metadata: { usage: "describing a profession's workplace" },
		},
		{
			text: "Ο νοσοκόμος δουλεύει με τον γιατρό",
			english: "The nurse works with the doctor",
			metadata: { usage: "professions working together" },
		},
		{
			text: "βοηθός οδοντίατρου",
			english: "dental assistant",
			metadata: { pattern: "βοηθός + genitive of profession", usage: "compound job title" },
		},
		{
			text: "φοιτητής πανεπιστημίου",
			english: "university student",
			metadata: { pattern: "φοιτητής + genitive of institution", usage: "describing student type" },
		},
	],

	grammarNotes: [
		{
			pattern: "μόνος/μόνη/μόνο + possessive = by oneself",
			examples: [
				"μόνος μου (by myself — male)",
				"μόνη μου (by myself — female)",
				"μόνος σου / μόνη σου (by yourself)",
				"μόνος του / μόνη της (by himself / by herself)",
				"μόνοι μας / μόνες μας (by ourselves)",
			],
			explanation:
				"The adjective μόνος/μόνη/μόνο agrees with the gender of the subject, then adds the possessive pronoun. It means both 'alone' and 'by oneself (without help)'.",
		},
		{
			pattern: "Common-gender professions (ο/η + same form)",
			examples: [
				"ο/η μπαρίστα — barista",
				"ο/η υπάλληλος — employee",
				"ο/η καλλιτέχνης — artist",
				"ο/η βοηθός — assistant",
				"ο/η οδοντίατρος — dentist",
			],
			explanation:
				"Many professional nouns use the same form for both genders — only the article changes (ο for male, η for female). Others have distinct male/female forms: νοσηλευτής/νοσηλεύτρια, φοιτητής/φοιτήτρια.",
		},
	],
});
