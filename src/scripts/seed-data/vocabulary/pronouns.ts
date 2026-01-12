import type { PronounSeed } from "../../../types/seed";

// Core indefinite pronouns (invariable - no gender)
export const INDEFINITE_PRONOUNS: PronounSeed[] = [
	// Thing pronouns (paired opposites)
	{ lemma: "κάτι", english: "something" },
	{ lemma: "τίποτα", english: "nothing/anything" },
	{ lemma: "όλα", english: "everything" },
	{ lemma: "ό,τι", english: "whatever" },
];

// Gendered indefinite pronouns (decline like adjectives)
// Stored as masculine citation form with all gender forms noted
export const GENDERED_PRONOUNS: PronounSeed[] = [
	// someone/some (κάποιος, κάποια, κάποιο)
	{ lemma: "κάποιος", english: "someone/some (m: κάποιος, f: κάποια, n: κάποιο)" },

	// no one/none (κανένας, καμία, κανένα)
	{ lemma: "κανένας", english: "no one/none (m: κανένας, f: καμία, n: κανένα)" },

	// whoever/whichever (όποιος, όποια, όποιο)
	{ lemma: "όποιος", english: "whoever/whichever (m: όποιος, f: όποια, n: όποιο)" },

	// all/everyone - plural forms (όλοι, όλες, όλα)
	{ lemma: "όλος", english: "all/everyone (m: όλοι, f: όλες, n: όλα)" },

	// another/other (άλλος, άλλη, άλλο)
	{ lemma: "άλλος", english: "another/other (m: άλλος, f: άλλη, n: άλλο)" },

	// some/several - typically plural (μερικοί, μερικές, μερικά)
	{ lemma: "μερικοί", english: "some/several (m: μερικοί, f: μερικές, n: μερικά)" },

	// each one (καθένας, καθεμία, καθένα)
	{ lemma: "καθένας", english: "each one (m: καθένας, f: καθεμία, n: καθένα)" },

	// such (τέτοιος, τέτοια, τέτοιο)
	{ lemma: "τέτοιος", english: "such (m: τέτοιος, f: τέτοια, n: τέτοιο)" },
];
