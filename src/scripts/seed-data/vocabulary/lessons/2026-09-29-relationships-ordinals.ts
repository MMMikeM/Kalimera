import { mark } from "@/lib/guide-marks";
import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_09_29 = createLesson({
	meta: {
		date: "2026-09-29",
		topic: "Relationships, ordinals and pointing at photos",
		source:
			"Weekly lesson - Ποιους βλέπετε; matching σχέσεις to photos, πρώτος–ένατος, στο νούμερο / στην πρώτη φωτογραφία",
	},

	nouns: [
		{
			lemma: "νούμερο",
			gender: "neuter",
			english: "number",
			cefrLevel: "A2",
			metadata: { note: "τα νούμερα = numbers" },
		},
		{ lemma: "φωτογραφία", gender: "feminine", english: "photo", cefrLevel: "A1" },
		{ lemma: "σχέση", gender: "feminine", english: "relationship", cefrLevel: "A2" },
		{ lemma: "γονέας", gender: "masculine", english: "parent (γονείς = parents)", cefrLevel: "A1" },
		{ lemma: "φίλος", gender: "masculine", english: "friend (male)", cefrLevel: "A1" },
		{ lemma: "φίλη", gender: "feminine", english: "friend (female)", cefrLevel: "A1" },
		{ lemma: "αδελφός", gender: "masculine", english: "brother", cefrLevel: "A1" },
		{ lemma: "αδελφή", gender: "feminine", english: "sister", cefrLevel: "A1" },
		{
			lemma: "αδέλφια",
			gender: "neuter",
			english: "siblings",
			cefrLevel: "A1",
			metadata: { note: "also spelled αδέρφια" },
		},
		{
			lemma: "συνάδελφος",
			gender: "masculine",
			english: "colleague",
			cefrLevel: "A2",
			metadata: { note: "ο/η συνάδελφος: one form, the article changes" },
		},
		{
			lemma: "συμμαθητής",
			gender: "masculine",
			english: "classmate",
			cefrLevel: "A2",
			metadata: { note: "η συμμαθήτρια = female classmate" },
		},
		{
			lemma: "ζευγάρι",
			gender: "neuter",
			english: "couple, pair",
			cefrLevel: "A2",
			metadata: { note: "τα ζευγάρια = couples" },
		},
	],

	adjectives: [
		{ lemma: "πρώτος", english: "first", cefrLevel: "A1" },
		{ lemma: "δεύτερος", english: "second", cefrLevel: "A1" },
		{ lemma: "τρίτος", english: "third", cefrLevel: "A1" },
		{ lemma: "τέταρτος", english: "fourth", cefrLevel: "A2" },
		{ lemma: "πέμπτος", english: "fifth", cefrLevel: "A2" },
		{ lemma: "έκτος", english: "sixth", cefrLevel: "A2" },
		{ lemma: "έβδομος", english: "seventh", cefrLevel: "A2" },
		{ lemma: "όγδοος", english: "eighth", cefrLevel: "A2" },
		{ lemma: "ένατος", english: "ninth", cefrLevel: "A2" },
	],

	adverbs: [
		{ lemma: "εδώ", english: "here", cefrLevel: "A1" },
		{ lemma: "εκεί", english: "there", cefrLevel: "A1" },
	],

	phrases: [
		{
			text: "Ποιους βλέπετε;",
			english: "Who do you see?",
			metadata: { pattern: "ποιους = who (Target, plural)" },
		},
		{
			text: "στο νούμερο ένα",
			english: "in number one",
			metadata: { pattern: "σε + το → στο" },
		},
		{
			text: "στην πρώτη φωτογραφία",
			english: "in the first photo",
			metadata: { pattern: "σε + την → στην before π", usage: "pointing at a photo" },
		},
		{
			text: "Αυτοί είναι φίλοι.",
			english: "These are friends.",
			metadata: { pattern: "Αυτοί είναι + plural noun" },
		},
		{
			text: "Αυτοί είναι γονείς.",
			english: "These are parents.",
			metadata: { pattern: "Αυτοί είναι + plural noun" },
		},
		{
			text: "Αυτοί είναι συνάδελφοι.",
			english: "These are colleagues.",
			metadata: { pattern: "Αυτοί είναι + plural noun" },
		},
		{
			text: "Αυτοί είναι αδέλφια.",
			english: "These are siblings.",
			metadata: { pattern: "Αυτοί είναι + plural noun", note: "a mixed group takes αυτοί" },
		},
		{
			text: "Αυτοί είναι ζευγάρι.",
			english: "They are a couple.",
			metadata: { note: "one couple: ζευγάρι; several: ζευγάρια" },
		},
		{
			text: "Αυτές είναι συμμαθήτριες.",
			english: "These are classmates (all women).",
			metadata: { pattern: "Αυτές είναι + feminine plural noun" },
		},
	],

	grammarNotes: [
		{
			pattern: "Ordinals agree like adjectives",
			examples: [
				{ greek: "ο πρώτος · η πρώτη · το πρώτο", english: "the first", marks: [mark("ο πρώτος", "nominative", "masculine"), mark("η πρώτη", "nominative", "feminine"), mark("το πρώτο", "nominative", "neuter")] },
				{ greek: "στην πρώτη φωτογραφία", english: "in the first photo", marks: [mark("στην πρώτη φωτογραφία", "accusative", "feminine")] },
				{ greek: "ο όγδοος · η όγδοη · το όγδοο", english: "the eighth", marks: [mark("ο όγδοος", "nominative", "masculine"), mark("η όγδοη", "nominative", "feminine"), mark("το όγδοο", "nominative", "neuter")] },
			],
			explanation:
				"πρώτος to ένατος take -ος/-η/-ο and match the noun they describe, just like καλός.",
			section: "agreement/numbers",
		},
		{
			pattern: "σε + article with a photo or a number",
			examples: [{ greek: "στο νούμερο ένα", english: "at number one", marks: [mark("στο νούμερο", "accusative", "neuter")] }, { greek: "στην πρώτη φωτογραφία", english: "in the first photo", marks: [mark("στην πρώτη φωτογραφία", "accusative", "feminine")] }, { greek: "στη δεύτερη φωτογραφία", english: "in the second photo", marks: [mark("στη δεύτερη φωτογραφία", "accusative", "feminine")] }],
			explanation:
				"σε joins the article: στο νούμερο, στη φωτογραφία. Feminine στη keeps its -ν before π, so it is στην πρώτη but στη δεύτερη.",
			section: "place/se-contractions",
		},
		{
			pattern: "Αυτοί or Αυτές?",
			examples: [
				{ greek: "Αυτοί είναι φίλοι.", english: "They are friends. (men, or a mixed group)", marks: [mark("Αυτοί", "nominative", "masculine", true)] },
				{ greek: "Αυτές είναι συμμαθήτριες.", english: "They are classmates. (women only)", marks: [mark("Αυτές", "nominative", "feminine", true)] },
				{ greek: "Αυτοί είναι αδέλφια.", english: "They are siblings. (αυτοί follows the people, not the neuter noun)", marks: [mark("Αυτοί", "nominative", "masculine", true), mark("αδέλφια", "nominative", "neuter", true)] },
			],
			explanation:
				"Αυτοί points at men or a mixed group, αυτές at women only. It follows the people you are pointing at, so αδέλφια takes αυτοί even though the noun is neuter.",
			section: "little-words/long-forms",
		},
	],
});
