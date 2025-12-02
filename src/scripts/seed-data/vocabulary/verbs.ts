import type { Phrase, VerbSeed } from "../../../types/seed";

export const VERBS: VerbSeed[] = [
	// -ω family (regular)
	{ lemma: "κάνω", english: "I do/make", conjugationFamily: "-ω" },
	{ lemma: "έχω", english: "I have", conjugationFamily: "-ω" },
	{ lemma: "υπάρχω", english: "I exist/there is", conjugationFamily: "-ω" },
	{ lemma: "δίνω", english: "I give", conjugationFamily: "-ω" },
	{ lemma: "παίρνω", english: "I take", conjugationFamily: "-ω" },
	{ lemma: "φεύγω", english: "I leave", conjugationFamily: "-ω" },
	{ lemma: "αγοράζω", english: "I buy", conjugationFamily: "-ω" },
	{ lemma: "νευριάζω", english: "I get nervous", conjugationFamily: "-ω" },
	{ lemma: "σταματάω", english: "I stop", conjugationFamily: "-ω" },
	{ lemma: "ζητάω", english: "I ask for", conjugationFamily: "-ω" },
	{ lemma: "ξεχνάω", english: "I forget", conjugationFamily: "-ω" },
	{ lemma: "χαλαρώνω", english: "I relax", conjugationFamily: "-ω" },
	{ lemma: "μένω", english: "I live/stay", conjugationFamily: "-ω" },
	{ lemma: "δουλεύω", english: "I work", conjugationFamily: "-ω" },
	{ lemma: "θέλω", english: "I want", conjugationFamily: "-ω" },
	{ lemma: "βλέπω", english: "I see", conjugationFamily: "-ω" },
	{ lemma: "σχεδιάζω", english: "I plan/design", conjugationFamily: "-ω" },

	// -άω/-ώ family
	{ lemma: "μιλάω", english: "I speak", conjugationFamily: "-άω/-ώ" },
	{ lemma: "προτιμώ", english: "I prefer", conjugationFamily: "-άω/-ώ" },
	{ lemma: "φταίω", english: "I'm guilty/at fault", conjugationFamily: "-άω/-ώ" },
	{ lemma: "φοράω", english: "I wear", conjugationFamily: "-άω/-ώ" },

	// -ομαι family (deponent/passive)
	{ lemma: "έρχομαι", english: "I come", conjugationFamily: "-ομαι" },

	// -άμαι family
	{ lemma: "θυμάμαι", english: "I remember", conjugationFamily: "-άμαι" },
	{ lemma: "κοιμάμαι", english: "I sleep", conjugationFamily: "-άμαι" },

	// Irregular
	{ lemma: "είμαι", english: "I am", conjugationFamily: "irregular" },
	{ lemma: "πάω", english: "I go", conjugationFamily: "irregular" },
	{ lemma: "λέω", english: "I say", conjugationFamily: "irregular" },
	{ lemma: "τρώω", english: "I eat", conjugationFamily: "irregular" },
];

// Transport-related verbs (third person forms for describing schedules)
export const TRANSPORT_VERBS: Phrase[] = [
	{ text: "ξεκινάει", english: "departs/starts" },
	{ text: "φεύγει", english: "leaves" },
	{ text: "περιμένει", english: "waits" },
	{ text: "παίρνω", english: "I take" },
	{ text: "δουλεύει", english: "works" },
];
