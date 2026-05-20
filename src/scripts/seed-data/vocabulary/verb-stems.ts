import type { ConjugationFamily } from "@/lib/greek-grammar";
import type { CefrLevel } from "@/server/db/enums";

export interface VerbStem {
	lemma: string;
	aoristStem: string; // unaccented aorist/future consonant base passed to generateConjugations()
	family: ConjugationFamily;
	english: string;
	cefrLevel?: CefrLevel;
}

/**
 * Regular verb stems for auto-generated conjugations.
 *
 * Add any verb here (including lesson-file verbs) to have its full conjugation
 * set seeded automatically via generateConjugations(lemma, aoristStem, family).
 *
 * Irregular and -ομαι verbs stay in verb-conjugations.ts as hand-written entries.
 */
export const VERB_STEMS: VerbStem[] = [
	// ── Original core verbs ────────────────────────────────────────────────────
	{ lemma: "κάνω", aoristStem: "καν", family: "-ω", english: "I do/make" },
	{ lemma: "μπορώ", aoristStem: "μπορεσ", family: "-άω/-ώ", english: "I can" },
	{ lemma: "μιλάω", aoristStem: "μιλησ", family: "-άω/-ώ", english: "I speak" },
	{ lemma: "αγαπάω", aoristStem: "αγαπησ", family: "-άω/-ώ", english: "I love" },
	{ lemma: "δουλεύω", aoristStem: "δουλεψ", family: "-ω", english: "I work" },
	{ lemma: "γράφω", aoristStem: "γραψ", family: "-ω", english: "I write" },
	{ lemma: "διαβάζω", aoristStem: "διαβασ", family: "-ω", english: "I read" },
	{ lemma: "μένω", aoristStem: "μειν", family: "-ω", english: "I stay/live" },
	{ lemma: "ευχαριστώ", aoristStem: "ευχαριστησ", family: "-άω/-ώ", english: "I thank" },
	{ lemma: "παρακαλώ", aoristStem: "παρακαλεσ", family: "-άω/-ώ", english: "I ask / please" },
	{ lemma: "νομίζω", aoristStem: "νομισ", family: "-ω", english: "I think (opinion)" },
	{ lemma: "λυπάμαι", aoristStem: "λυπ", family: "-άμαι", english: "I'm sorry" },
	{ lemma: "φοβάμαι", aoristStem: "φοβ", family: "-άμαι", english: "I'm afraid" },
	{ lemma: "πεθαίνω", aoristStem: "πεθαν", family: "-ω", english: "I die" },

	// ── A1 verbs ───────────────────────────────────────────────────────────────
	{ lemma: "μισώ", aoristStem: "μισησ", family: "-άω/-ώ", english: "I hate", cefrLevel: "A1" },
	{ lemma: "πεινάω", aoristStem: "πεινασ", family: "-άω/-ώ", english: "I am hungry", cefrLevel: "A1" },
	{ lemma: "ρωτάω", aoristStem: "ρωτησ", family: "-άω/-ώ", english: "I ask", cefrLevel: "A1" },
	{ lemma: "περνάω", aoristStem: "περασ", family: "-άω/-ώ", english: "I pass/cross/have fun", cefrLevel: "A1" },
	{ lemma: "οδηγώ", aoristStem: "οδηγησ", family: "-άω/-ώ", english: "I drive", cefrLevel: "A1" },
	{ lemma: "τηλεφωνώ", aoristStem: "τηλεφωνησ", family: "-άω/-ώ", english: "I phone/call", cefrLevel: "A1" },
	{ lemma: "γελάω", aoristStem: "γελασ", family: "-άω/-ώ", english: "I laugh", cefrLevel: "A1" },
	{ lemma: "ξυπνάω", aoristStem: "ξυπνησ", family: "-άω/-ώ", english: "I wake up", cefrLevel: "A1" },
	{ lemma: "φιλάω", aoristStem: "φιλησ", family: "-άω/-ώ", english: "I kiss", cefrLevel: "A1" },
	{ lemma: "κολυμπάω", aoristStem: "κολυμπησ", family: "-άω/-ώ", english: "I swim", cefrLevel: "A1" },
	{ lemma: "κοιμάμαι", aoristStem: "κοιμ", family: "-άμαι", english: "I sleep", cefrLevel: "A1" },
	{ lemma: "παίζω", aoristStem: "παιξ", family: "-ω", english: "I play", cefrLevel: "A1" },
	{ lemma: "φέρνω", aoristStem: "φερ", family: "-ω", english: "I bring", cefrLevel: "A1" },
	{ lemma: "κλείνω", aoristStem: "κλεισ", family: "-ω", english: "I close/turn off/book", cefrLevel: "A1" },
	{ lemma: "ανοίγω", aoristStem: "ανοιξ", family: "-ω", english: "I open/turn on", cefrLevel: "A1" },
	{ lemma: "τελειώνω", aoristStem: "τελειωσ", family: "-ω", english: "I finish", cefrLevel: "A1" },
	{ lemma: "χορεύω", aoristStem: "χορεψ", family: "-ω", english: "I dance", cefrLevel: "A1" },
	{ lemma: "μαγειρεύω", aoristStem: "μαγειρεψ", family: "-ω", english: "I cook", cefrLevel: "A1" },
	{ lemma: "κόβω", aoristStem: "κοψ", family: "-ω", english: "I cut", cefrLevel: "A1" },
	{ lemma: "ψωνίζω", aoristStem: "ψωνισ", family: "-ω", english: "I shop", cefrLevel: "A1" },
	{ lemma: "αρέσω", aoristStem: "αρεσ", family: "-ω", english: "I please", cefrLevel: "A1" },

	// ── A2 verbs ───────────────────────────────────────────────────────────────
	{ lemma: "περιμένω", aoristStem: "περιμεν", family: "-ω", english: "I wait", cefrLevel: "A2" },
	{ lemma: "ψάχνω", aoristStem: "ψαξ", family: "-ω", english: "I search/look for", cefrLevel: "A2" },
	{ lemma: "αγοράζω", aoristStem: "αγορασ", family: "-ω", english: "I buy", cefrLevel: "A2" },
	{ lemma: "πληρώνω", aoristStem: "πληρωσ", family: "-ω", english: "I pay", cefrLevel: "A2" },
	{ lemma: "στέλνω", aoristStem: "στειλ", family: "-ω", english: "I send", cefrLevel: "A2" },
	{ lemma: "αρχίζω", aoristStem: "αρχισ", family: "-ω", english: "I start/begin", cefrLevel: "A2" },
	{ lemma: "συνεχίζω", aoristStem: "συνεχισ", family: "-ω", english: "I continue", cefrLevel: "A2" },
	{ lemma: "ετοιμάζω", aoristStem: "ετοιμασ", family: "-ω", english: "I prepare", cefrLevel: "A2" },
	{ lemma: "ταξιδεύω", aoristStem: "ταξιδεψ", family: "-ω", english: "I travel", cefrLevel: "A2" },
	{ lemma: "γνωρίζω", aoristStem: "γνωρισ", family: "-ω", english: "I know/meet", cefrLevel: "A2" },
	{ lemma: "αλλάζω", aoristStem: "αλλαξ", family: "-ω", english: "I change", cefrLevel: "A2" },
	{ lemma: "χάνω", aoristStem: "χασ", family: "-ω", english: "I lose", cefrLevel: "A2" },
	{ lemma: "αποφασίζω", aoristStem: "αποφασισ", family: "-ω", english: "I decide", cefrLevel: "A2" },
	{ lemma: "γυρίζω", aoristStem: "γυρισ", family: "-ω", english: "I return/turn", cefrLevel: "A2" },
	{ lemma: "λείπω", aoristStem: "λειψ", family: "-ω", english: "I am missing/away", cefrLevel: "A2" },
	{ lemma: "κλέβω", aoristStem: "κλεψ", family: "-ω", english: "I steal", cefrLevel: "A2" },
	{ lemma: "πιστεύω", aoristStem: "πιστεψ", family: "-ω", english: "I believe", cefrLevel: "A2" },
	{ lemma: "εννοώ", aoristStem: "εννοησ", family: "-άω/-ώ", english: "I mean/intend", cefrLevel: "A2" },
	{ lemma: "προσπαθώ", aoristStem: "προσπαθησ", family: "-άω/-ώ", english: "I try", cefrLevel: "A2" },
	{ lemma: "εξηγώ", aoristStem: "εξηγησ", family: "-άω/-ώ", english: "I explain", cefrLevel: "A2" },
	{ lemma: "καλώ", aoristStem: "καλεσ", family: "-άω/-ώ", english: "I call/invite", cefrLevel: "A2" },
	{ lemma: "βοηθάω", aoristStem: "βοηθησ", family: "-άω/-ώ", english: "I help", cefrLevel: "A2" },
	{ lemma: "χαλάω", aoristStem: "χαλασ", family: "-άω/-ώ", english: "I break/spoil", cefrLevel: "A2" },
	{ lemma: "τραγουδάω", aoristStem: "τραγουδησ", family: "-άω/-ώ", english: "I sing", cefrLevel: "A2" },
	{ lemma: "ξεχνάω", aoristStem: "ξεχασ", family: "-άω/-ώ", english: "I forget", cefrLevel: "A2" },
	{ lemma: "συναντάω", aoristStem: "συναντησ", family: "-άω/-ώ", english: "I meet", cefrLevel: "A2" },
	{ lemma: "ανησυχώ", aoristStem: "ανησυχησ", family: "-άω/-ώ", english: "I worry", cefrLevel: "A2" },
	{ lemma: "χαμογελάω", aoristStem: "χαμογελασ", family: "-άω/-ώ", english: "I smile", cefrLevel: "A2" },
	{ lemma: "κρατάω", aoristStem: "κρατησ", family: "-άω/-ώ", english: "I hold/keep", cefrLevel: "A2" },
	{ lemma: "απαντάω", aoristStem: "απαντησ", family: "-άω/-ώ", english: "I answer", cefrLevel: "A2" },
	{ lemma: "θυμάμαι", aoristStem: "θυμ", family: "-άμαι", english: "I remember", cefrLevel: "A2" },
];
