import { createLesson } from "@/types/lesson-builder";

export const LESSON_2025_01_06 = createLesson({
	meta: {
		date: "2025-01-06",
		topic: "Concerts, likes/dislikes (αρέσει), ordinal numbers 7th–10th",
		source: "Weekly lesson - μου αρέσει pattern, βγάζω/χορεύω, ordinals",
	},

	verbs: [
		{ lemma: "βγάζω", english: "I take (photos)/take out", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "χορεύω", english: "I dance", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "αρέσω", english: "to please (μου αρέσει = I like)", conjugationFamily: "-ω", cefrLevel: "A1" },
	],

	nouns: [
		{ lemma: "συναυλία", gender: "feminine", english: "concert", cefrLevel: "A2" },
		{ lemma: "μουσική", gender: "feminine", english: "music", cefrLevel: "A1" },
		{ lemma: "φίλος", gender: "masculine", english: "friend (male)", cefrLevel: "A1" },
		{ lemma: "φίλη", gender: "feminine", english: "friend (female)", cefrLevel: "A1" },
		{ lemma: "μπανιέρα", gender: "feminine", english: "bathtub", cefrLevel: "A2" },
		{ lemma: "λάσπη", gender: "feminine", english: "mud", cefrLevel: "A2" },
		{ lemma: "φωτογραφία", gender: "feminine", english: "photograph/photo", cefrLevel: "A1" },
		{ lemma: "βίντεο", gender: "neuter", english: "video", cefrLevel: "A1" },
		{ lemma: "κόσμος", gender: "masculine", english: "people/world", cefrLevel: "A1" },
	],

	adjectives: [
		{ lemma: "γεμάτος", english: "full/packed", cefrLevel: "A2" },
		{ lemma: "έβδομος", english: "seventh", cefrLevel: "A2" },
		{ lemma: "όγδοος", english: "eighth", cefrLevel: "A2" },
		{ lemma: "ένατος", english: "ninth", cefrLevel: "A2" },
		{ lemma: "δέκατος", english: "tenth", cefrLevel: "A2" },
	],

	adverbs: [
		{ lemma: "μπροστά", english: "in front/forward", cefrLevel: "A1" },
		{ lemma: "μέσα", english: "inside/in", cefrLevel: "A1" },
	],

	phrases: [
		{
			text: "μου αρέσει",
			english: "I like it",
			metadata: { pattern: "indirect pronoun + αρέσει", usage: "expressing likes (singular)" },
		},
		{
			text: "μου αρέσουν",
			english: "I like them",
			metadata: { pattern: "indirect pronoun + αρέσουν", usage: "expressing likes (plural)" },
		},
		{
			text: "δεν μου αρέσει",
			english: "I don't like it",
			metadata: { pattern: "δεν + μου αρέσει", usage: "negating likes" },
		},
		{
			text: "Σου αρέσουν οι συναυλίες;",
			english: "Do you like concerts?",
			metadata: { pattern: "σου αρέσουν + plural noun", usage: "asking about likes" },
		},
		{
			text: "Ναι μου αρέσουν, αλλά δεν μου αρέσουν όταν είναι γεμάτο κόσμο",
			english: "Yes I like them, but I don't like them when it's packed with people",
			metadata: { usage: "likes with condition" },
		},
		{
			text: "Με ποιον πηγαίνεις στις συναυλίες;",
			english: "Who do you go to concerts with?",
			metadata: { pattern: "Με ποιον + verb;", usage: "asking about companions" },
		},
		{
			text: "Πηγαίνω με τους φίλους μου",
			english: "I go with my friends",
			metadata: { pattern: "με τους/τις + noun + μου", usage: "stating companions" },
		},
		{
			text: "μπροστά μπροστά",
			english: "right at the front / front row",
			metadata: { usage: "emphatic position — reduplicated adverb" },
		},
		{
			text: "βγάζω φωτογραφίες και βίντεο",
			english: "I take photos and videos",
			metadata: { pattern: "βγάζω + object", usage: "taking photos" },
		},
		{
			text: "εγώ είμαι στη μπανιέρα",
			english: "I am in the bathtub",
			metadata: { usage: "location practice with bathtub" },
		},
		{
			text: "εσύ είσαι μέσα στη λάσπη",
			english: "you are in the mud",
			metadata: { usage: "location practice with mud" },
		},
	],

	grammarNotes: [
		{
			pattern: "μου αρέσει / μου αρέσουν",
			examples: [
				"Μου αρέσει η μουσική (I like music)",
				"Μου αρέσουν οι συναυλίες (I like concerts)",
				"Σου αρέσει; (Do you like it?)",
				"Δεν μου αρέσει όταν είναι γεμάτο κόσμο (I don't like it when it's packed)",
			],
			explanation:
				"Greek 'to like' is expressed with αρέσει/αρέσουν — literally 'it pleases me'. Use αρέσει for a singular thing, αρέσουν for plural. The person who likes uses the indirect pronoun (μου/σου/του/της...).",
		},
		{
			pattern: "Ordinal numbers 7th–10th",
			examples: [
				"έβδομος/η/ο — seventh (7ος)",
				"όγδοος/η/ο — eighth (8ος)",
				"ένατος/η/ο — ninth (9ος)",
				"δέκατος/η/ο — tenth (10ος)",
			],
			explanation:
				"Ordinals agree in gender with the noun they modify, following the -ος/-η/-ο pattern. Used for dates, floors, positions in sequence.",
		},
		{
			pattern: "Reduplicated adverb for emphasis",
			examples: ["μπροστά μπροστά (right at the front, front row)"],
			explanation:
				"Repeating an adverb intensifies it. μπροστά = in front; μπροστά μπροστά = right at the very front.",
		},
	],
});
