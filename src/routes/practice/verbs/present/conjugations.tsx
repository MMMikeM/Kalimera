import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";

// Context line carries tense + family; the label is just the pronoun.
// Splits the three dimensions into a scannable visual hierarchy:
//   [title]
//   present · -ω verb          ← context (small)
//   we                          ← pronoun (big)
// The Latin gloss is derived at render by <Pronunciation>, never stored.

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
		detail: PRONOUNS.sg1.grammatical,
		context: G1_PRES,
		label: PRONOUNS.sg1.pronoun,
		category: "present",
	},
	{
		id: "g1p-sg2",
		greek: "εις",
		detail: PRONOUNS.sg2.grammatical,
		context: G1_PRES,
		label: PRONOUNS.sg2.pronoun,
		category: "present",
	},
	{
		id: "g1p-sg3",
		greek: "ει",
		detail: PRONOUNS.sg3.grammatical,
		context: G1_PRES,
		label: PRONOUNS.sg3.pronoun,
		category: "present",
	},
	{
		id: "g1p-pl1",
		greek: "ουμε",
		detail: PRONOUNS.pl1.grammatical,
		context: G1_PRES,
		label: PRONOUNS.pl1.pronoun,
		category: "present",
	},
	{
		id: "g1p-pl2",
		greek: "ετε",
		detail: PRONOUNS.pl2.grammatical,
		context: G1_PRES,
		label: PRONOUNS.pl2.pronoun,
		category: "present",
	},
	{
		id: "g1p-pl3",
		greek: "ουν",
		detail: PRONOUNS.pl3.grammatical,
		context: G1_PRES,
		label: PRONOUNS.pl3.pronoun,
		category: "present",
	},

	// ── group2a present — μιλάω ──
	{
		id: "g2ap-sg1",
		greek: "άω",
		detail: PRONOUNS.sg1.grammatical,
		context: G2A_PRES,
		label: PRONOUNS.sg1.pronoun,
		category: "present",
	},
	{
		id: "g2ap-sg2",
		greek: "άς",
		detail: PRONOUNS.sg2.grammatical,
		context: G2A_PRES,
		label: PRONOUNS.sg2.pronoun,
		category: "present",
	},
	{
		id: "g2ap-sg3",
		greek: "άει",
		detail: PRONOUNS.sg3.grammatical,
		context: G2A_PRES,
		label: PRONOUNS.sg3.pronoun,
		category: "present",
	},
	{
		id: "g2ap-pl1",
		greek: "άμε",
		detail: PRONOUNS.pl1.grammatical,
		context: G2A_PRES,
		label: PRONOUNS.pl1.pronoun,
		category: "present",
	},
	{
		id: "g2ap-pl2",
		greek: "άτε",
		detail: PRONOUNS.pl2.grammatical,
		context: G2A_PRES,
		label: PRONOUNS.pl2.pronoun,
		category: "present",
	},
	{
		id: "g2ap-pl3",
		greek: "άνε",
		detail: PRONOUNS.pl3.grammatical,
		context: G2A_PRES,
		label: PRONOUNS.pl3.pronoun,
		category: "present",
	},

	// ── group2b present — μπορώ ──
	{
		id: "g2bp-sg1",
		greek: "ώ",
		detail: PRONOUNS.sg1.grammatical,
		context: G2B_PRES,
		label: PRONOUNS.sg1.pronoun,
		category: "present",
	},
	{
		id: "g2bp-sg2",
		greek: "είς",
		detail: PRONOUNS.sg2.grammatical,
		context: G2B_PRES,
		label: PRONOUNS.sg2.pronoun,
		category: "present",
	},
	{
		id: "g2bp-sg3",
		greek: "εί",
		detail: PRONOUNS.sg3.grammatical,
		context: G2B_PRES,
		label: PRONOUNS.sg3.pronoun,
		category: "present",
	},
	{
		id: "g2bp-pl1",
		greek: "ούμε",
		detail: PRONOUNS.pl1.grammatical,
		context: G2B_PRES,
		label: PRONOUNS.pl1.pronoun,
		category: "present",
	},
	{
		id: "g2bp-pl2",
		greek: "είτε",
		detail: PRONOUNS.pl2.grammatical,
		context: G2B_PRES,
		label: PRONOUNS.pl2.pronoun,
		category: "present",
	},
	{
		id: "g2bp-pl3",
		greek: "ούν",
		detail: PRONOUNS.pl3.grammatical,
		context: G2B_PRES,
		label: PRONOUNS.pl3.pronoun,
		category: "present",
	},

	// ── deponent present — έρχομαι ──
	{
		id: "depp-sg1",
		greek: "ομαι",
		detail: PRONOUNS.sg1.grammatical,
		context: DEP_PRES,
		label: PRONOUNS.sg1.pronoun,
		category: "present",
	},
	{
		id: "depp-sg2",
		greek: "εσαι",
		detail: PRONOUNS.sg2.grammatical,
		context: DEP_PRES,
		label: PRONOUNS.sg2.pronoun,
		category: "present",
	},
	{
		id: "depp-sg3",
		greek: "εται",
		detail: PRONOUNS.sg3.grammatical,
		context: DEP_PRES,
		label: PRONOUNS.sg3.pronoun,
		category: "present",
	},
	{
		id: "depp-pl1",
		greek: "όμαστε",
		detail: PRONOUNS.pl1.grammatical,
		context: DEP_PRES,
		label: PRONOUNS.pl1.pronoun,
		category: "present",
	},
	{
		id: "depp-pl2",
		greek: "όσαστε",
		detail: PRONOUNS.pl2.grammatical,
		context: DEP_PRES,
		label: PRONOUNS.pl2.pronoun,
		category: "present",
	},
	{
		id: "depp-pl3",
		greek: "ονται",
		detail: PRONOUNS.pl3.grammatical,
		context: DEP_PRES,
		label: PRONOUNS.pl3.pronoun,
		category: "present",
	},

	// ── aorist (simple past) — έκανα ──
	{
		id: "aor-sg1",
		greek: "α",
		detail: PRONOUNS.sg1.grammatical,
		context: AORIST,
		label: PRONOUNS.sg1.pronoun,
		category: "past",
	},
	{
		id: "aor-sg2",
		greek: "ες",
		detail: PRONOUNS.sg2.grammatical,
		context: AORIST,
		label: PRONOUNS.sg2.pronoun,
		category: "past",
	},
	{
		id: "aor-sg3",
		greek: "ε",
		detail: PRONOUNS.sg3.grammatical,
		context: AORIST,
		label: PRONOUNS.sg3.pronoun,
		category: "past",
	},
	{
		id: "aor-pl1",
		greek: "αμε",
		detail: PRONOUNS.pl1.grammatical,
		context: AORIST,
		label: PRONOUNS.pl1.pronoun,
		category: "past",
	},
	{
		id: "aor-pl2",
		greek: "ατε",
		detail: PRONOUNS.pl2.grammatical,
		context: AORIST,
		label: PRONOUNS.pl2.pronoun,
		category: "past",
	},
	{
		id: "aor-pl3",
		greek: "αν",
		detail: PRONOUNS.pl3.grammatical,
		context: AORIST,
		label: PRONOUNS.pl3.pronoun,
		category: "past",
	},

	// ── group1 imperfect (ongoing past) — έγραφα ──
	{
		id: "g1i-sg1",
		greek: "α",
		detail: PRONOUNS.sg1.grammatical,
		context: G1_IMP,
		label: PRONOUNS.sg1.pronoun,
		category: "past",
	},
	{
		id: "g1i-sg2",
		greek: "ες",
		detail: PRONOUNS.sg2.grammatical,
		context: G1_IMP,
		label: PRONOUNS.sg2.pronoun,
		category: "past",
	},
	{
		id: "g1i-sg3",
		greek: "ε",
		detail: PRONOUNS.sg3.grammatical,
		context: G1_IMP,
		label: PRONOUNS.sg3.pronoun,
		category: "past",
	},
	{
		id: "g1i-pl1",
		greek: "αμε",
		detail: PRONOUNS.pl1.grammatical,
		context: G1_IMP,
		label: PRONOUNS.pl1.pronoun,
		category: "past",
	},
	{
		id: "g1i-pl2",
		greek: "ατε",
		detail: PRONOUNS.pl2.grammatical,
		context: G1_IMP,
		label: PRONOUNS.pl2.pronoun,
		category: "past",
	},
	{
		id: "g1i-pl3",
		greek: "αν",
		detail: PRONOUNS.pl3.grammatical,
		context: G1_IMP,
		label: PRONOUNS.pl3.pronoun,
		category: "past",
	},

	// ── group2 imperfect — μιλούσα ──
	{
		id: "g2i-sg1",
		greek: "ούσα",
		detail: PRONOUNS.sg1.grammatical,
		context: G2_IMP,
		label: PRONOUNS.sg1.pronoun,
		category: "past",
	},
	{
		id: "g2i-sg2",
		greek: "ούσες",
		detail: PRONOUNS.sg2.grammatical,
		context: G2_IMP,
		label: PRONOUNS.sg2.pronoun,
		category: "past",
	},
	{
		id: "g2i-sg3",
		greek: "ούσε",
		detail: PRONOUNS.sg3.grammatical,
		context: G2_IMP,
		label: PRONOUNS.sg3.pronoun,
		category: "past",
	},
	{
		id: "g2i-pl1",
		greek: "ούσαμε",
		detail: PRONOUNS.pl1.grammatical,
		context: G2_IMP,
		label: PRONOUNS.pl1.pronoun,
		category: "past",
	},
	{
		id: "g2i-pl2",
		greek: "ούσατε",
		detail: PRONOUNS.pl2.grammatical,
		context: G2_IMP,
		label: PRONOUNS.pl2.pronoun,
		category: "past",
	},
	{
		id: "g2i-pl3",
		greek: "ούσαν",
		detail: PRONOUNS.pl3.grammatical,
		context: G2_IMP,
		label: PRONOUNS.pl3.pronoun,
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
