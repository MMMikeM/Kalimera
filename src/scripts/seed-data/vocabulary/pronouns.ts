import type { PronounSeed } from "../../../types/seed";
import type { VocabWithTags } from "../../seed-pipeline";

// Core indefinite pronouns (invariable - no gender)
export const INDEFINITE_PRONOUNS: PronounSeed[] = [
	// Thing pronouns (paired opposites)
	{ lemma: "κάτι", english: "something", cefrLevel: "A1" },
	{ lemma: "τίποτα", english: "nothing/anything", cefrLevel: "A1" },
	{ lemma: "όλα", english: "everything", cefrLevel: "A1" },
	{ lemma: "ό,τι", english: "whatever", cefrLevel: "B1" },
];

// Gendered indefinite pronouns (decline like adjectives)
// Stored as masculine citation form with all gender forms noted
export const GENDERED_PRONOUNS: PronounSeed[] = [
	// someone/some (κάποιος, κάποια, κάποιο)
	{
		lemma: "κάποιος",
		english: "someone/some (m: κάποιος, f: κάποια, n: κάποιο)",
		cefrLevel: "A2",
	},

	// no one/none (κανένας, καμία, κανένα)
	{
		lemma: "κανένας",
		english: "no one/none (m: κανένας, f: καμία, n: κανένα)",
		cefrLevel: "A2",
	},

	// whoever/whichever (όποιος, όποια, όποιο)
	{
		lemma: "όποιος",
		english: "whoever/whichever (m: όποιος, f: όποια, n: όποιο)",
		cefrLevel: "B1",
	},

	// all/everyone - plural forms (όλοι, όλες, όλα)
	{ lemma: "όλος", english: "all/everyone (m: όλοι, f: όλες, n: όλα)", cefrLevel: "A1" },

	// another/other (άλλος, άλλη, άλλο)
	{ lemma: "άλλος", english: "another/other (m: άλλος, f: άλλη, n: άλλο)", cefrLevel: "A1" },

	// some/several - typically plural (μερικοί, μερικές, μερικά)
	{
		lemma: "μερικοί",
		english: "some/several (m: μερικοί, f: μερικές, n: μερικά)",
		cefrLevel: "A2",
	},

	// each one (καθένας, καθεμία, καθένα)
	{ lemma: "καθένας", english: "each one (m: καθένας, f: καθεμία, n: καθένα)", cefrLevel: "B1" },

	// such (τέτοιος, τέτοια, τέτοιο)
	{ lemma: "τέτοιος", english: "such (m: τέτοιος, f: τέτοια, n: τέτοιο)", cefrLevel: "B1" },
];

export const INDEFINITE_PRONOUN_ITEMS: VocabWithTags[] = INDEFINITE_PRONOUNS.map((pronoun) => ({
	vocab: {
		greekText: pronoun.lemma,
		englishTranslation: pronoun.english,
		wordType: "pronoun" as const,
	},
	tags: [],
}));

export const GENDERED_PRONOUN_ITEMS: VocabWithTags[] = GENDERED_PRONOUNS.map((pronoun) => ({
	vocab: {
		greekText: pronoun.lemma,
		englishTranslation: pronoun.english,
		wordType: "pronoun" as const,
	},
	tags: [],
}));
