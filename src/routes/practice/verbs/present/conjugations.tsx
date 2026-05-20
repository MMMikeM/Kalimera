import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";

// Context line carries tense + family; english is just the pronoun.
// Splits the three dimensions into a scannable visual hierarchy:
//   [title]
//   present · -ω verb          ← context (small)
//   we                          ← pronoun (big)
// `greeklish` matches greekToPhonetic output (αι → "e", ει → "i", ντ → "d").

const PRONOUNS = {
	sg1: { pronoun: "I", grammatical: "1st person singular" },
	sg2: { pronoun: "you", grammatical: "2nd person singular" },
	sg3: { pronoun: "he / she", grammatical: "3rd person singular" },
	pl1: { pronoun: "we", grammatical: "1st person plural" },
	pl2: { pronoun: "you all", grammatical: "2nd person plural" },
	pl3: { pronoun: "they", grammatical: "3rd person plural" },
} as const;

// Anchor verb in present-sg1 citation form + gloss + target tense.
const G1_PRES = "κάνω · present";
const G2A_PRES = "μιλάω · present";
const G2B_PRES = "μπορώ · present";
const DEP_PRES = "έρχομαι · present";
const AORIST = "κάνω · aorist";
const G1_IMP = "γράφω · imperfect";
const G2_IMP = "μιλάω · imperfect";

const ENDINGS: SimpleListItem[] = [
	// ── group1 present — γράφω ──
	{
		id: "g1p-sg1",
		greek: "ω",
		greeklish: "o",
		english: PRONOUNS.sg1.pronoun,
		detail: PRONOUNS.sg1.grammatical,
		context: G1_PRES,
		label: "κάνω",
		category: "present",
	},
	{
		id: "g1p-sg2",
		greek: "εις",
		greeklish: "is",
		english: PRONOUNS.sg2.pronoun,
		detail: PRONOUNS.sg2.grammatical,
		context: G1_PRES,
		label: "κάνεις",
		category: "present",
	},
	{
		id: "g1p-sg3",
		greek: "ει",
		greeklish: "i",
		english: PRONOUNS.sg3.pronoun,
		detail: PRONOUNS.sg3.grammatical,
		context: G1_PRES,
		label: "κάνει",
		category: "present",
	},
	{
		id: "g1p-pl1",
		greek: "ουμε",
		greeklish: "oume",
		english: PRONOUNS.pl1.pronoun,
		detail: PRONOUNS.pl1.grammatical,
		context: G1_PRES,
		label: "κάνουμε",
		category: "present",
	},
	{
		id: "g1p-pl2",
		greek: "ετε",
		greeklish: "ete",
		english: PRONOUNS.pl2.pronoun,
		detail: PRONOUNS.pl2.grammatical,
		context: G1_PRES,
		label: "κάνετε",
		category: "present",
	},
	{
		id: "g1p-pl3",
		greek: "ουν",
		greeklish: "oun",
		english: PRONOUNS.pl3.pronoun,
		detail: PRONOUNS.pl3.grammatical,
		context: G1_PRES,
		label: "κάνουν",
		category: "present",
	},

	// ── group2a present — μιλάω ──
	{
		id: "g2ap-sg1",
		greek: "άω",
		greeklish: "ao",
		english: PRONOUNS.sg1.pronoun,
		detail: PRONOUNS.sg1.grammatical,
		context: G2A_PRES,
		label: "μιλάω",
		category: "present",
	},
	{
		id: "g2ap-sg2",
		greek: "άς",
		greeklish: "as",
		english: PRONOUNS.sg2.pronoun,
		detail: PRONOUNS.sg2.grammatical,
		context: G2A_PRES,
		label: "μιλάς",
		category: "present",
	},
	{
		id: "g2ap-sg3",
		greek: "άει",
		greeklish: "ae",
		english: PRONOUNS.sg3.pronoun,
		detail: PRONOUNS.sg3.grammatical,
		context: G2A_PRES,
		label: "μιλάει",
		category: "present",
	},
	{
		id: "g2ap-pl1",
		greek: "άμε",
		greeklish: "ame",
		english: PRONOUNS.pl1.pronoun,
		detail: PRONOUNS.pl1.grammatical,
		context: G2A_PRES,
		label: "μιλάμε",
		category: "present",
	},
	{
		id: "g2ap-pl2",
		greek: "άτε",
		greeklish: "ate",
		english: PRONOUNS.pl2.pronoun,
		detail: PRONOUNS.pl2.grammatical,
		context: G2A_PRES,
		label: "μιλάτε",
		category: "present",
	},
	{
		id: "g2ap-pl3",
		greek: "άνε",
		greeklish: "ane",
		english: PRONOUNS.pl3.pronoun,
		detail: PRONOUNS.pl3.grammatical,
		context: G2A_PRES,
		label: "μιλάνε",
		category: "present",
	},

	// ── group2b present — μπορώ ──
	{
		id: "g2bp-sg1",
		greek: "ώ",
		greeklish: "o",
		english: PRONOUNS.sg1.pronoun,
		detail: PRONOUNS.sg1.grammatical,
		context: G2B_PRES,
		label: "μπορώ",
		category: "present",
	},
	{
		id: "g2bp-sg2",
		greek: "είς",
		greeklish: "is",
		english: PRONOUNS.sg2.pronoun,
		detail: PRONOUNS.sg2.grammatical,
		context: G2B_PRES,
		label: "μπορείς",
		category: "present",
	},
	{
		id: "g2bp-sg3",
		greek: "εί",
		greeklish: "i",
		english: PRONOUNS.sg3.pronoun,
		detail: PRONOUNS.sg3.grammatical,
		context: G2B_PRES,
		label: "μπορεί",
		category: "present",
	},
	{
		id: "g2bp-pl1",
		greek: "ούμε",
		greeklish: "oume",
		english: PRONOUNS.pl1.pronoun,
		detail: PRONOUNS.pl1.grammatical,
		context: G2B_PRES,
		label: "μπορούμε",
		category: "present",
	},
	{
		id: "g2bp-pl2",
		greek: "είτε",
		greeklish: "ite",
		english: PRONOUNS.pl2.pronoun,
		detail: PRONOUNS.pl2.grammatical,
		context: G2B_PRES,
		label: "μπορείτε",
		category: "present",
	},
	{
		id: "g2bp-pl3",
		greek: "ούν",
		greeklish: "oun",
		english: PRONOUNS.pl3.pronoun,
		detail: PRONOUNS.pl3.grammatical,
		context: G2B_PRES,
		label: "μπορούν",
		category: "present",
	},

	// ── deponent present — έρχομαι ──
	{
		id: "depp-sg1",
		greek: "ομαι",
		greeklish: "ome",
		english: PRONOUNS.sg1.pronoun,
		detail: PRONOUNS.sg1.grammatical,
		context: DEP_PRES,
		label: "έρχομαι",
		category: "present",
	},
	{
		id: "depp-sg2",
		greek: "εσαι",
		greeklish: "ese",
		english: PRONOUNS.sg2.pronoun,
		detail: PRONOUNS.sg2.grammatical,
		context: DEP_PRES,
		label: "έρχεσαι",
		category: "present",
	},
	{
		id: "depp-sg3",
		greek: "εται",
		greeklish: "ete",
		english: PRONOUNS.sg3.pronoun,
		detail: PRONOUNS.sg3.grammatical,
		context: DEP_PRES,
		label: "έρχεται",
		category: "present",
	},
	{
		id: "depp-pl1",
		greek: "όμαστε",
		greeklish: "omaste",
		english: PRONOUNS.pl1.pronoun,
		detail: PRONOUNS.pl1.grammatical,
		context: DEP_PRES,
		label: "ερχόμαστε",
		category: "present",
	},
	{
		id: "depp-pl2",
		greek: "όσαστε",
		greeklish: "osaste",
		english: PRONOUNS.pl2.pronoun,
		detail: PRONOUNS.pl2.grammatical,
		context: DEP_PRES,
		label: "ερχόσαστε",
		category: "present",
	},
	{
		id: "depp-pl3",
		greek: "ονται",
		greeklish: "ode",
		english: PRONOUNS.pl3.pronoun,
		detail: PRONOUNS.pl3.grammatical,
		context: DEP_PRES,
		label: "έρχονται",
		category: "present",
	},

	// ── aorist (simple past) — έκανα ──
	{
		id: "aor-sg1",
		greek: "α",
		greeklish: "a",
		english: PRONOUNS.sg1.pronoun,
		detail: PRONOUNS.sg1.grammatical,
		context: AORIST,
		label: "έκανα",
		category: "past",
	},
	{
		id: "aor-sg2",
		greek: "ες",
		greeklish: "es",
		english: PRONOUNS.sg2.pronoun,
		detail: PRONOUNS.sg2.grammatical,
		context: AORIST,
		label: "έκανες",
		category: "past",
	},
	{
		id: "aor-sg3",
		greek: "ε",
		greeklish: "e",
		english: PRONOUNS.sg3.pronoun,
		detail: PRONOUNS.sg3.grammatical,
		context: AORIST,
		label: "έκανε",
		category: "past",
	},
	{
		id: "aor-pl1",
		greek: "αμε",
		greeklish: "ame",
		english: PRONOUNS.pl1.pronoun,
		detail: PRONOUNS.pl1.grammatical,
		context: AORIST,
		label: "κάναμε",
		category: "past",
	},
	{
		id: "aor-pl2",
		greek: "ατε",
		greeklish: "ate",
		english: PRONOUNS.pl2.pronoun,
		detail: PRONOUNS.pl2.grammatical,
		context: AORIST,
		label: "κάνατε",
		category: "past",
	},
	{
		id: "aor-pl3",
		greek: "αν",
		greeklish: "an",
		english: PRONOUNS.pl3.pronoun,
		detail: PRONOUNS.pl3.grammatical,
		context: AORIST,
		label: "έκαναν",
		category: "past",
	},

	// ── group1 imperfect (ongoing past) — έγραφα ──
	{
		id: "g1i-sg1",
		greek: "α",
		greeklish: "a",
		english: PRONOUNS.sg1.pronoun,
		detail: PRONOUNS.sg1.grammatical,
		context: G1_IMP,
		label: "έγραφα",
		category: "past",
	},
	{
		id: "g1i-sg2",
		greek: "ες",
		greeklish: "es",
		english: PRONOUNS.sg2.pronoun,
		detail: PRONOUNS.sg2.grammatical,
		context: G1_IMP,
		label: "έγραφες",
		category: "past",
	},
	{
		id: "g1i-sg3",
		greek: "ε",
		greeklish: "e",
		english: PRONOUNS.sg3.pronoun,
		detail: PRONOUNS.sg3.grammatical,
		context: G1_IMP,
		label: "έγραφε",
		category: "past",
	},
	{
		id: "g1i-pl1",
		greek: "αμε",
		greeklish: "ame",
		english: PRONOUNS.pl1.pronoun,
		detail: PRONOUNS.pl1.grammatical,
		context: G1_IMP,
		label: "γράφαμε",
		category: "past",
	},
	{
		id: "g1i-pl2",
		greek: "ατε",
		greeklish: "ate",
		english: PRONOUNS.pl2.pronoun,
		detail: PRONOUNS.pl2.grammatical,
		context: G1_IMP,
		label: "γράφατε",
		category: "past",
	},
	{
		id: "g1i-pl3",
		greek: "αν",
		greeklish: "an",
		english: PRONOUNS.pl3.pronoun,
		detail: PRONOUNS.pl3.grammatical,
		context: G1_IMP,
		label: "έγραφαν",
		category: "past",
	},

	// ── group2 imperfect — μιλούσα ──
	{
		id: "g2i-sg1",
		greek: "ούσα",
		greeklish: "ousa",
		english: PRONOUNS.sg1.pronoun,
		detail: PRONOUNS.sg1.grammatical,
		context: G2_IMP,
		label: "μιλούσα",
		category: "past",
	},
	{
		id: "g2i-sg2",
		greek: "ούσες",
		greeklish: "ouses",
		english: PRONOUNS.sg2.pronoun,
		detail: PRONOUNS.sg2.grammatical,
		context: G2_IMP,
		label: "μιλούσες",
		category: "past",
	},
	{
		id: "g2i-sg3",
		greek: "ούσε",
		greeklish: "ouse",
		english: PRONOUNS.sg3.pronoun,
		detail: PRONOUNS.sg3.grammatical,
		context: G2_IMP,
		label: "μιλούσε",
		category: "past",
	},
	{
		id: "g2i-pl1",
		greek: "ούσαμε",
		greeklish: "ousame",
		english: PRONOUNS.pl1.pronoun,
		detail: PRONOUNS.pl1.grammatical,
		context: G2_IMP,
		label: "μιλούσαμε",
		category: "past",
	},
	{
		id: "g2i-pl2",
		greek: "ούσατε",
		greeklish: "ousate",
		english: PRONOUNS.pl2.pronoun,
		detail: PRONOUNS.pl2.grammatical,
		context: G2_IMP,
		label: "μιλούσατε",
		category: "past",
	},
	{
		id: "g2i-pl3",
		greek: "ούσαν",
		greeklish: "ousan",
		english: PRONOUNS.pl3.pronoun,
		detail: PRONOUNS.pl3.grammatical,
		context: G2_IMP,
		label: "μιλούσαν",
		category: "past",
	},
].map<SimpleListItem>((item) => ({ ...item, acceptAlso: item.label }));

const CATEGORIES = [
	{ id: "present", label: "Present" },
	{ id: "past", label: "Past" },
];

export const Route = createFileRoute("/practice/verbs/present/conjugations")({
	component: ConjugationEndingsDrill,
});

function ConjugationEndingsDrill() {
	return (
		<Drill
			drillId="verbs-conjugation-endings"
			items={ENDINGS}
			backTo="/practice/verbs"
			title="Conjugation endings"
			subtitle="42 forms / timed"
			colorTheme="olive"
			forwardDesc="Pronoun + paradigm → ending"
			reverseDesc="Ending → pronoun (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
