import type { FullVerbSeed, Phrase } from "../../../types/seed";
import type { VocabWithTags } from "../../seed-pipeline";

export const VERBS: FullVerbSeed[] = [
	// -ω family (regular)
	{ lemma: "κάνω", english: "I do/make", cefrLevel: "A1", conjugationFamily: "-ω" },
	{ lemma: "έχω", english: "I have", cefrLevel: "A1", conjugationFamily: "-ω" },
	{ lemma: "υπάρχω", english: "I exist/there is", cefrLevel: "A1", conjugationFamily: "-ω" },
	{ lemma: "δίνω", english: "I give", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "παίρνω", english: "I take", cefrLevel: "A1", conjugationFamily: "-ω" },
	{ lemma: "φεύγω", english: "I leave", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "αγοράζω", english: "I buy", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "νευριάζω", english: "I get nervous", cefrLevel: "B1", conjugationFamily: "-ω" },
	{ lemma: "σταματάω", english: "I stop", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "ζητάω", english: "I ask for", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "ξεχνάω", english: "I forget", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "χαλαρώνω", english: "I relax", cefrLevel: "B1", conjugationFamily: "-ω" },
	{ lemma: "μένω", english: "I live/stay", cefrLevel: "A1", conjugationFamily: "-ω" },
	{ lemma: "δουλεύω", english: "I work", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "θέλω", english: "I want", cefrLevel: "A1", conjugationFamily: "-ω" },
	{ lemma: "βλέπω", english: "I see", cefrLevel: "A1", conjugationFamily: "-ω" },
	{ lemma: "σχεδιάζω", english: "I plan/design", cefrLevel: "B1", conjugationFamily: "-ω" },
	{ lemma: "περιμένω", english: "I wait", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "πιστεύω", english: "I believe", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "συμβαίνω", english: "it happens", cefrLevel: "B1", conjugationFamily: "-ω" },
	{ lemma: "σημαίνω", english: "I mean/signify", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "αφήνω", english: "I let/leave behind", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "ελπίζω", english: "I hope", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "πειράζω", english: "it bothers/matters", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "τρέχω", english: "I run", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "προσέχω", english: "I pay attention/be careful", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "φαίνομαι", english: "I seem/appear", cefrLevel: "A2", conjugationFamily: "-ομαι" },

	// -άω/-ώ family
	{ lemma: "μιλάω", english: "I speak", cefrLevel: "A1", conjugationFamily: "-άω/-ώ" },
	{ lemma: "προτιμώ", english: "I prefer", cefrLevel: "A2", conjugationFamily: "-άω/-ώ" },
	{
		lemma: "φταίω",
		english: "I'm guilty/at fault",
		cefrLevel: "B1",
		conjugationFamily: "-άω/-ώ",
	},
	{ lemma: "φοράω", english: "I wear", cefrLevel: "A2", conjugationFamily: "-άω/-ώ" },
	{ lemma: "αγαπάω", english: "I love", cefrLevel: "A2", conjugationFamily: "-άω/-ώ" },
	{ lemma: "κοιτάω", english: "I look at/watch", cefrLevel: "A2", conjugationFamily: "-άω/-ώ" },
	{ lemma: "βοηθάω", english: "I help", cefrLevel: "A2", conjugationFamily: "-άω/-ώ" },
	{ lemma: "εννοώ", english: "I mean/intend", cefrLevel: "A2", conjugationFamily: "-άω/-ώ" },
	{ lemma: "ανησυχώ", english: "I worry", cefrLevel: "B1", conjugationFamily: "-άω/-ώ" },

	// -ομαι family (deponent/passive)
	{ lemma: "έρχομαι", english: "I come", cefrLevel: "A1", conjugationFamily: "-ομαι" },

	// -άμαι family
	{ lemma: "θυμάμαι", english: "I remember", cefrLevel: "A2", conjugationFamily: "-άμαι" },
	{ lemma: "κοιμάμαι", english: "I sleep", cefrLevel: "A2", conjugationFamily: "-άμαι" },

	{ lemma: "βρίσκω", english: "I find", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "γράφω", english: "I write", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "διαβάζω", english: "I read", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "μαθαίνω", english: "I learn", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "ακούω", english: "I hear/listen", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "νιώθω", english: "I feel", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "πίνω", english: "I drink", cefrLevel: "A2", conjugationFamily: "-ω" },
	{ lemma: "πεθαίνω", english: "I die", cefrLevel: "B1", conjugationFamily: "-ω" },

	// Irregular / impersonal
	{ lemma: "είμαι", english: "I am", cefrLevel: "A1", conjugationFamily: "irregular" },
	{ lemma: "πρέπει", english: "must/should (it is necessary)", cefrLevel: "A1", conjugationFamily: "irregular" },
	{ lemma: "πάω", english: "I go", cefrLevel: "A1", conjugationFamily: "irregular" },
	{ lemma: "λέω", english: "I say", cefrLevel: "A1", conjugationFamily: "irregular" },
	{ lemma: "τρώω", english: "I eat", cefrLevel: "A1", conjugationFamily: "irregular" },

	// High-frequency core (top-110 freq corpus, previously unseeded)
	{ lemma: "ξέρω", english: "I know", cefrLevel: "A1", conjugationFamily: "-ω" },
	{ lemma: "μπορώ", english: "I can", cefrLevel: "A1", conjugationFamily: "-άω/-ώ" },
	{ lemma: "ευχαριστώ", english: "I thank", cefrLevel: "A1", conjugationFamily: "-άω/-ώ" },
	{ lemma: "παρακαλώ", english: "I ask / please", cefrLevel: "A1", conjugationFamily: "-άω/-ώ" },
	{ lemma: "νομίζω", english: "I think (opinion)", cefrLevel: "A1", conjugationFamily: "-ω" },

	// High-frequency deponents (-μαι family)
	{ lemma: "λυπάμαι", english: "I'm sorry", cefrLevel: "A1", conjugationFamily: "-άμαι" },
	{ lemma: "χρειάζομαι", english: "I need", cefrLevel: "A2", conjugationFamily: "-ομαι" },
	{ lemma: "χαίρομαι", english: "I'm glad", cefrLevel: "A2", conjugationFamily: "-ομαι" },
	{ lemma: "φοβάμαι", english: "I'm afraid", cefrLevel: "A2", conjugationFamily: "-άμαι" },
	{ lemma: "σκέφτομαι", english: "I think", cefrLevel: "A2", conjugationFamily: "-ομαι" },
	{ lemma: "υπόσχομαι", english: "I promise", cefrLevel: "B1", conjugationFamily: "-ομαι" },
];

// Transport-related verbs (third person forms for describing schedules)
export const TRANSPORT_VERBS: Phrase[] = [
	{ text: "ξεκινάει", english: "departs/starts", cefrLevel: "A2" },
	{ text: "φεύγει", english: "leaves", cefrLevel: "A2" },
	{ text: "περιμένει", english: "waits", cefrLevel: "A2" },
	{ text: "παίρνω", english: "I take", cefrLevel: "A1" },
	{ text: "δουλεύει", english: "works", cefrLevel: "A2" },
];

export const VERB_ITEMS: VocabWithTags[] = VERBS.map((verb) => ({
	vocab: {
		greekText: verb.lemma,
		englishTranslation: verb.english,
		wordType: "verb" as const,
		cefrLevel: verb.cefrLevel ?? null,
	},
	tags: [],
	verbDetail: {
		conjugationFamily: verb.conjugationFamily,
	},
}));

export const TRANSPORT_ACTION_ITEMS: VocabWithTags[] = TRANSPORT_VERBS.map((action) => {
	const wordType = action.english.startsWith("I ") ? "verb" : "phrase";
	return {
		vocab: {
			greekText: action.text,
			englishTranslation: action.english,
			wordType: wordType as "verb" | "phrase",
			cefrLevel: action.cefrLevel ?? null,
		},
		tags: ["transport-action"],
	};
});
