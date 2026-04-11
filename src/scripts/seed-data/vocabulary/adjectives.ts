import type { AdjectiveSeed } from "../../../types/seed";
import { pickAdjectiveNominalForms, type VocabWithTags } from "../../seed-pipeline";

export const COLORS: AdjectiveSeed[] = [
	// Neuter-only colors (ending in -ο/-ό)
	{ lemma: "άσπρο", english: "white", nominalForms: { nominative_singular_neuter: { form: "άσπρο", article: "το" } } },
	{ lemma: "μαύρο", english: "black", nominalForms: { nominative_singular_neuter: { form: "μαύρο", article: "το" } } },
	{ lemma: "κόκκινο", english: "red", nominalForms: { nominative_singular_neuter: { form: "κόκκινο", article: "το" } } },
	{ lemma: "γαλάζιο", english: "light blue/sky blue", nominalForms: { nominative_singular_neuter: { form: "γαλάζιο", article: "το" } } },
	{ lemma: "πράσινο", english: "green", nominalForms: { nominative_singular_neuter: { form: "πράσινο", article: "το" } } },
	{ lemma: "κίτρινο", english: "yellow", nominalForms: { nominative_singular_neuter: { form: "κίτρινο", article: "το" } } },
	{ lemma: "χρυσό", english: "gold/golden", nominalForms: { nominative_singular_neuter: { form: "χρυσό", article: "το" } } },

	// Indeclinable colors (same form across all genders/cases)
	{ lemma: "μπλε", english: "blue", nominalForms: { nominative_singular_neuter: { form: "μπλε" } } },
	{ lemma: "πορτοκαλί", english: "orange", nominalForms: { nominative_singular_neuter: { form: "πορτοκαλί" } } },
	{ lemma: "μωβ", english: "purple", nominalForms: { nominative_singular_neuter: { form: "μωβ" } } },
	{ lemma: "ροζ", english: "pink", nominalForms: { nominative_singular_neuter: { form: "ροζ" } } },
	{ lemma: "γκρι", english: "grey", nominalForms: { nominative_singular_neuter: { form: "γκρι" } } },
	{ lemma: "καφέ", english: "brown", nominalForms: { nominative_singular_neuter: { form: "καφέ" } } },
	{ lemma: "μπεζ", english: "beige", nominalForms: { nominative_singular_neuter: { form: "μπεζ" } } },
	{ lemma: "ασημί", english: "silver", nominalForms: { nominative_singular_neuter: { form: "ασημί" } } },
];

export const ADJECTIVES: AdjectiveSeed[] = [
	// Standard -ος / -ή / -ό adjectives
	{
		lemma: "φρέσκος",
		english: "fresh",
		nominalForms: {
			nominative_singular_masculine: { form: "φρέσκος", article: "ο" },
			nominative_singular_feminine: { form: "φρέσκη", article: "η" },
			nominative_singular_neuter: { form: "φρέσκο", article: "το" },
		},
	},
	{
		lemma: "μεγάλος",
		english: "big/large",
		nominalForms: {
			nominative_singular_masculine: { form: "μεγάλος", article: "ο" },
			nominative_singular_feminine: { form: "μεγάλη", article: "η" },
			nominative_singular_neuter: { form: "μεγάλο", article: "το" },
		},
	},
	{
		lemma: "μικρός",
		english: "small",
		nominalForms: {
			nominative_singular_masculine: { form: "μικρός", article: "ο" },
			nominative_singular_feminine: { form: "μικρή", article: "η" },
			nominative_singular_neuter: { form: "μικρό", article: "το" },
		},
	},
	{
		lemma: "καλός",
		english: "good",
		nominalForms: {
			nominative_singular_masculine: { form: "καλός", article: "ο" },
			nominative_singular_feminine: { form: "καλή", article: "η" },
			nominative_singular_neuter: { form: "καλό", article: "το" },
		},
	},
	{
		lemma: "κακός",
		english: "bad",
		nominalForms: {
			nominative_singular_masculine: { form: "κακός", article: "ο" },
			nominative_singular_feminine: { form: "κακή", article: "η" },
			nominative_singular_neuter: { form: "κακό", article: "το" },
		},
	},
	{
		lemma: "ζεστός",
		english: "hot/warm",
		nominalForms: {
			nominative_singular_masculine: { form: "ζεστός", article: "ο" },
			nominative_singular_feminine: { form: "ζεστή", article: "η" },
			nominative_singular_neuter: { form: "ζεστό", article: "το" },
		},
	},
	{
		lemma: "λίγος",
		english: "few/little",
		nominalForms: {
			nominative_singular_masculine: { form: "λίγος", article: "ο" },
			nominative_singular_feminine: { form: "λίγη", article: "η" },
			nominative_singular_neuter: { form: "λίγο", article: "το" },
		},
	},
	{
		lemma: "απλός",
		english: "simple",
		nominalForms: {
			nominative_singular_masculine: { form: "απλός", article: "ο" },
			nominative_singular_feminine: { form: "απλή", article: "η" },
			nominative_singular_neuter: { form: "απλό", article: "το" },
		},
	},

	// Irregular adjectives
	{
		lemma: "ίδιος",
		english: "same/identical",
		nominalForms: {
			nominative_singular_masculine: { form: "ίδιος", article: "ο" },
			nominative_singular_feminine: { form: "ίδια", article: "η" },
			nominative_singular_neuter: { form: "ίδιο", article: "το" },
		},
	},
	{
		lemma: "δυνατός",
		english: "strong/loud",
		nominalForms: {
			nominative_singular_masculine: { form: "δυνατός", article: "ο" },
			nominative_singular_feminine: { form: "δυνατή", article: "η" },
			nominative_singular_neuter: { form: "δυνατό", article: "το" },
		},
	},
	{
		lemma: "ενθουσιασμένος",
		english: "enthusiastic",
		nominalForms: {
			nominative_singular_masculine: { form: "ενθουσιασμένος", article: "ο" },
			nominative_singular_feminine: { form: "ενθουσιασμένη", article: "η" },
			nominative_singular_neuter: { form: "ενθουσιασμένο", article: "το" },
		},
	},
	{
		lemma: "κρύος",
		english: "cold",
		nominalForms: {
			nominative_singular_masculine: { form: "κρύος", article: "ο" },
			nominative_singular_feminine: { form: "κρύα", article: "η" },
			nominative_singular_neuter: { form: "κρύο", article: "το" },
		},
	},
	{
		lemma: "πολύς",
		english: "much/many",
		nominalForms: {
			nominative_singular_masculine: { form: "πολύς", article: "ο" },
			nominative_singular_feminine: { form: "πολλή", article: "η" },
			nominative_singular_neuter: { form: "πολύ", article: "το" },
		},
	},
	{
		lemma: "οργανωμένος",
		english: "organized",
		nominalForms: {
			nominative_singular_masculine: { form: "οργανωμένος", article: "ο" },
			nominative_singular_feminine: { form: "οργανωμένη", article: "η" },
			nominative_singular_neuter: { form: "οργανωμένο", article: "το" },
		},
	},
];

export const COLOR_ITEMS: VocabWithTags[] = COLORS.map((color) => ({
	vocab: {
		greekText: color.lemma,
		englishTranslation: color.english,
		wordType: "adjective" as const,
	},
	tags: ["color"],
	...pickAdjectiveNominalForms(color),
}));

export const ADJECTIVE_ITEMS: VocabWithTags[] = ADJECTIVES.map((adj) => ({
	vocab: {
		greekText: adj.lemma,
		englishTranslation: adj.english,
		wordType: "adjective" as const,
	},
	tags: [],
	...pickAdjectiveNominalForms(adj),
}));
