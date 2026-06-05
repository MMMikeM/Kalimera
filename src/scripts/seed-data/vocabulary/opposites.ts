/**
 * Opposite pairs for the Opposites drill.
 *
 * Rules:
 * - Both members must exist in vocabulary seed data (bare lemma = greekText)
 * - Each lemma appears at most once across all pairs (unique constraint on table)
 * - Seeder normalises wordAId < wordBId; order here doesn't matter
 */

export const OPPOSITE_PAIRS: { a: string; b: string }[] = [
	// ── Adjectives ──────────────────────────────────────────────────────────────
	{ a: "μεγάλος", b: "μικρός" },         // big / small
	{ a: "καλός", b: "κακός" },             // good / bad
	{ a: "ζεστός", b: "κρύος" },            // hot / cold
	{ a: "πολύς", b: "λίγος" },             // much / few
	{ a: "δύσκολος", b: "εύκολος" },        // difficult / easy
	{ a: "ακριβός", b: "φτηνός" },          // expensive / cheap
	{ a: "γρήγορος", b: "αργός" },          // fast / slow
	{ a: "ψηλός", b: "χαμηλός" },           // tall / low
	{ a: "χαρούμενος", b: "λυπημένος" },    // happy / sad
	{ a: "ωραίος", b: "άσχημος" },          // beautiful / ugly
	{ a: "ανοιχτός", b: "κλειστός" },       // open / closed
	{ a: "καινούργιος", b: "παλιός" },      // new / old
	{ a: "γεμάτος", b: "άδειος" },          // full / empty
	{ a: "νέος", b: "γέρος" },              // young / old (elderly)
	{ a: "μακρύς", b: "κοντός" },           // long / short
	{ a: "βαρύς", b: "ελαφρύς" },           // heavy / light
	{ a: "ίδιος", b: "διαφορετικός" },      // same / different
	{ a: "καθαρός", b: "βρόμικος" },        // clean / dirty
	{ a: "άσπρο", b: "μαύρο" },             // white / black

	// ── Adverbs ─────────────────────────────────────────────────────────────────
	{ a: "έξω", b: "μέσα" },                // outside / inside
	{ a: "κάτω", b: "πάνω" },               // down / up
	{ a: "μπροστά", b: "πίσω" },            // in front / behind
	{ a: "δεξιά", b: "αριστερά" },          // right / left
	{ a: "κοντά", b: "μακριά" },            // near / far
	{ a: "εδώ", b: "εκεί" },                // here / there
	{ a: "ποτέ", b: "πάντα" },              // never / always
	{ a: "σπάνια", b: "συχνά" },            // rarely / often
	{ a: "κάπου", b: "πουθενά" },           // somewhere / nowhere
	{ a: "νωρίς", b: "αργά" },              // early / late

	// ── Verbs ────────────────────────────────────────────────────────────────────
	{ a: "κατεβαίνω", b: "ανεβαίνω" },     // go down / go up
	{ a: "δίνω", b: "παίρνω" },             // give / take
	{ a: "θυμάμαι", b: "ξεχνάω" },         // remember / forget
	{ a: "έρχομαι", b: "φεύγω" },           // come / leave
	{ a: "αγοράζω", b: "πουλάω" },          // buy / sell
	{ a: "χάνω", b: "κερδίζω" },            // lose / win
	{ a: "αγαπάω", b: "μισώ" },             // love / hate
	{ a: "κοιμάμαι", b: "ξυπνάω" },        // sleep / wake up
	{ a: "ανοίγω", b: "κλείνω" },           // open / close
	{ a: "αρχίζω", b: "τελειώνω" },         // start / finish

	// ── Nouns (bare lemma, no article) ──────────────────────────────────────────
	{ a: "μέρα", b: "νύχτα" },              // day / night
	{ a: "αρχή", b: "τέλος" },              // beginning / end
	{ a: "άντρας", b: "γυναίκα" },          // man / woman
	{ a: "πατέρας", b: "μητέρα" },          // father / mother
	{ a: "αδελφός", b: "αδελφή" },          // brother / sister
	{ a: "αγόρι", b: "κορίτσι" },           // boy / girl
	{ a: "γιος", b: "κόρη" },               // son / daughter
	{ a: "πρωί", b: "βράδυ" },              // morning / evening
	{ a: "καλοκαίρι", b: "χειμώνας" },      // summer / winter
];
