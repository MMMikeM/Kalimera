import { SimpleListDrill, type SimpleListItem } from "../../engines/simple-list-drill";

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
// Grounds each ending in a concrete high-frequency verb the learner knows.
// sg1 items are effectively cued when tense is present (anchor ends in target
// ending) — that's fine; the other five persons per paradigm do the work.
const G1_PRES = "κάνω · present";
const G2A_PRES = "μιλάω · present";
const G2B_PRES = "μπορώ · present";
const DEP_PRES = "έρχομαι · present";
const PAST = "κάνω · past";
const G2_IMP = "μιλάω · imperfect";

const ENDINGS: SimpleListItem[] = [
	// ── group1 present — γράφω ──
	{ id: "g1p-sg1", greek: "ω",    greeklish: "o",    english: PRONOUNS.sg1.pronoun, detail: PRONOUNS.sg1.grammatical, context: G1_PRES, label: "κάνω",    category: "g1-present" },
	{ id: "g1p-sg2", greek: "εις",  greeklish: "is",   english: PRONOUNS.sg2.pronoun, detail: PRONOUNS.sg2.grammatical, context: G1_PRES, label: "κάνεις",  category: "g1-present" },
	{ id: "g1p-sg3", greek: "ει",   greeklish: "i",    english: PRONOUNS.sg3.pronoun, detail: PRONOUNS.sg3.grammatical, context: G1_PRES, label: "κάνει",   category: "g1-present" },
	{ id: "g1p-pl1", greek: "ουμε", greeklish: "oume", english: PRONOUNS.pl1.pronoun, detail: PRONOUNS.pl1.grammatical, context: G1_PRES, label: "κάνουμε", category: "g1-present" },
	{ id: "g1p-pl2", greek: "ετε",  greeklish: "ete",  english: PRONOUNS.pl2.pronoun, detail: PRONOUNS.pl2.grammatical, context: G1_PRES, label: "κάνετε",  category: "g1-present" },
	{ id: "g1p-pl3", greek: "ουν",  greeklish: "oun",  english: PRONOUNS.pl3.pronoun, detail: PRONOUNS.pl3.grammatical, context: G1_PRES, label: "κάνουν",  category: "g1-present" },

	// ── group2a present — μιλάω ──
	{ id: "g2ap-sg1", greek: "άω",  greeklish: "ao",  english: PRONOUNS.sg1.pronoun, detail: PRONOUNS.sg1.grammatical, context: G2A_PRES, label: "μιλάω",  category: "g2a-present" },
	{ id: "g2ap-sg2", greek: "άς",  greeklish: "as",  english: PRONOUNS.sg2.pronoun, detail: PRONOUNS.sg2.grammatical, context: G2A_PRES, label: "μιλάς",  category: "g2a-present" },
	{ id: "g2ap-sg3", greek: "άει", greeklish: "ae",  english: PRONOUNS.sg3.pronoun, detail: PRONOUNS.sg3.grammatical, context: G2A_PRES, label: "μιλάει", category: "g2a-present" },
	{ id: "g2ap-pl1", greek: "άμε", greeklish: "ame", english: PRONOUNS.pl1.pronoun, detail: PRONOUNS.pl1.grammatical, context: G2A_PRES, label: "μιλάμε", category: "g2a-present" },
	{ id: "g2ap-pl2", greek: "άτε", greeklish: "ate", english: PRONOUNS.pl2.pronoun, detail: PRONOUNS.pl2.grammatical, context: G2A_PRES, label: "μιλάτε", category: "g2a-present" },
	{ id: "g2ap-pl3", greek: "άνε", greeklish: "ane", english: PRONOUNS.pl3.pronoun, detail: PRONOUNS.pl3.grammatical, context: G2A_PRES, label: "μιλάνε", category: "g2a-present" },

	// ── group2b present — μπορώ ──
	{ id: "g2bp-sg1", greek: "ώ",    greeklish: "o",    english: PRONOUNS.sg1.pronoun, detail: PRONOUNS.sg1.grammatical, context: G2B_PRES, label: "μπορώ",    category: "g2b-present" },
	{ id: "g2bp-sg2", greek: "είς",  greeklish: "is",   english: PRONOUNS.sg2.pronoun, detail: PRONOUNS.sg2.grammatical, context: G2B_PRES, label: "μπορείς",  category: "g2b-present" },
	{ id: "g2bp-sg3", greek: "εί",   greeklish: "i",    english: PRONOUNS.sg3.pronoun, detail: PRONOUNS.sg3.grammatical, context: G2B_PRES, label: "μπορεί",   category: "g2b-present" },
	{ id: "g2bp-pl1", greek: "ούμε", greeklish: "oume", english: PRONOUNS.pl1.pronoun, detail: PRONOUNS.pl1.grammatical, context: G2B_PRES, label: "μπορούμε", category: "g2b-present" },
	{ id: "g2bp-pl2", greek: "είτε", greeklish: "ite",  english: PRONOUNS.pl2.pronoun, detail: PRONOUNS.pl2.grammatical, context: G2B_PRES, label: "μπορείτε", category: "g2b-present" },
	{ id: "g2bp-pl3", greek: "ούν",  greeklish: "oun",  english: PRONOUNS.pl3.pronoun, detail: PRONOUNS.pl3.grammatical, context: G2B_PRES, label: "μπορούν",  category: "g2b-present" },

	// ── deponent present — έρχομαι ──
	{ id: "depp-sg1", greek: "ομαι",   greeklish: "ome",    english: PRONOUNS.sg1.pronoun, detail: PRONOUNS.sg1.grammatical, context: DEP_PRES, label: "έρχομαι",   category: "deponent-present" },
	{ id: "depp-sg2", greek: "εσαι",   greeklish: "ese",    english: PRONOUNS.sg2.pronoun, detail: PRONOUNS.sg2.grammatical, context: DEP_PRES, label: "έρχεσαι",   category: "deponent-present" },
	{ id: "depp-sg3", greek: "εται",   greeklish: "ete",    english: PRONOUNS.sg3.pronoun, detail: PRONOUNS.sg3.grammatical, context: DEP_PRES, label: "έρχεται",   category: "deponent-present" },
	{ id: "depp-pl1", greek: "όμαστε", greeklish: "omaste", english: PRONOUNS.pl1.pronoun, detail: PRONOUNS.pl1.grammatical, context: DEP_PRES, label: "ερχόμαστε", category: "deponent-present" },
	{ id: "depp-pl2", greek: "όσαστε", greeklish: "osaste", english: PRONOUNS.pl2.pronoun, detail: PRONOUNS.pl2.grammatical, context: DEP_PRES, label: "ερχόσαστε", category: "deponent-present" },
	{ id: "depp-pl3", greek: "ονται",  greeklish: "ode",    english: PRONOUNS.pl3.pronoun, detail: PRONOUNS.pl3.grammatical, context: DEP_PRES, label: "έρχονται",  category: "deponent-present" },

	// ── past endings (aorist + group1 imperfect) — έγραψα ──
	{ id: "past-sg1", greek: "α",   greeklish: "a",   english: PRONOUNS.sg1.pronoun, detail: PRONOUNS.sg1.grammatical, context: PAST, label: "έκανα",  category: "past" },
	{ id: "past-sg2", greek: "ες",  greeklish: "es",  english: PRONOUNS.sg2.pronoun, detail: PRONOUNS.sg2.grammatical, context: PAST, label: "έκανες", category: "past" },
	{ id: "past-sg3", greek: "ε",   greeklish: "e",   english: PRONOUNS.sg3.pronoun, detail: PRONOUNS.sg3.grammatical, context: PAST, label: "έκανε",  category: "past" },
	{ id: "past-pl1", greek: "αμε", greeklish: "ame", english: PRONOUNS.pl1.pronoun, detail: PRONOUNS.pl1.grammatical, context: PAST, label: "κάναμε", category: "past" },
	{ id: "past-pl2", greek: "ατε", greeklish: "ate", english: PRONOUNS.pl2.pronoun, detail: PRONOUNS.pl2.grammatical, context: PAST, label: "κάνατε", category: "past" },
	{ id: "past-pl3", greek: "αν",  greeklish: "an",  english: PRONOUNS.pl3.pronoun, detail: PRONOUNS.pl3.grammatical, context: PAST, label: "έκαναν", category: "past" },

	// ── group2 imperfect — μιλούσα ──
	{ id: "g2i-sg1", greek: "ούσα",   greeklish: "ousa",   english: PRONOUNS.sg1.pronoun, detail: PRONOUNS.sg1.grammatical, context: G2_IMP, label: "μιλούσα",   category: "g2-imperfect" },
	{ id: "g2i-sg2", greek: "ούσες",  greeklish: "ouses",  english: PRONOUNS.sg2.pronoun, detail: PRONOUNS.sg2.grammatical, context: G2_IMP, label: "μιλούσες",  category: "g2-imperfect" },
	{ id: "g2i-sg3", greek: "ούσε",   greeklish: "ouse",   english: PRONOUNS.sg3.pronoun, detail: PRONOUNS.sg3.grammatical, context: G2_IMP, label: "μιλούσε",   category: "g2-imperfect" },
	{ id: "g2i-pl1", greek: "ούσαμε", greeklish: "ousame", english: PRONOUNS.pl1.pronoun, detail: PRONOUNS.pl1.grammatical, context: G2_IMP, label: "μιλούσαμε", category: "g2-imperfect" },
	{ id: "g2i-pl2", greek: "ούσατε", greeklish: "ousate", english: PRONOUNS.pl2.pronoun, detail: PRONOUNS.pl2.grammatical, context: G2_IMP, label: "μιλούσατε", category: "g2-imperfect" },
	{ id: "g2i-pl3", greek: "ούσαν",  greeklish: "ousan",  english: PRONOUNS.pl3.pronoun, detail: PRONOUNS.pl3.grammatical, context: G2_IMP, label: "μιλούσαν",  category: "g2-imperfect" },
].map<SimpleListItem>((item) => ({ ...item, acceptAlso: item.label }));

const SPEEDS = [
	{ id: "fast", label: "Fast · 3s", timeLimit: 3000 },
	{ id: "medium", label: "Medium · 5s", timeLimit: 5000 },
	{ id: "relaxed", label: "Relaxed · 8s", timeLimit: 8000 },
];

export default function ConjugationEndingsDrill() {
	return (
		<SimpleListDrill
			drillId="verbs-conjugation-endings"
			items={ENDINGS}
			title="Conjugation endings"
			subtitle="36 forms / timed"
			colorTheme="olive"
			forwardDesc="Pronoun + paradigm → ending"
			reverseDesc="Ending → pronoun (self-assess)"
			speeds={SPEEDS}
		/>
	);
}
