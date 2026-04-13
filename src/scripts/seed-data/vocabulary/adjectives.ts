import { pickAdjectiveDetails, pickAdjectiveNominalForms, type VocabWithTags } from "../../seed-pipeline";
import { enrichAdjective, type AdjectiveSeedInput } from "./adjective-seed-enrichment";

const COLORS_RAW: AdjectiveSeedInput[] = [
	{ lemma: "άσπρο", english: "white" },
	{ lemma: "μαύρο", english: "black" },
	{ lemma: "κόκκινο", english: "red" },
	{ lemma: "μπλε", english: "blue" },
	{ lemma: "γαλάζιο", english: "light blue/sky blue" },
	{ lemma: "πράσινο", english: "green" },
	{ lemma: "κίτρινο", english: "yellow" },
	{ lemma: "πορτοκαλί", english: "orange" },
	{ lemma: "μωβ", english: "purple" },
	{ lemma: "ροζ", english: "pink" },
	{ lemma: "γκρι", english: "grey" },
	{ lemma: "καφέ", english: "brown" },
	{ lemma: "μπεζ", english: "beige" },
	{ lemma: "χρυσό", english: "gold/golden" },
	{ lemma: "ασημί", english: "silver" },
];

const ADJECTIVES_RAW: AdjectiveSeedInput[] = [
	{ lemma: "φρέσκος", english: "fresh" },
	{ lemma: "ίδιος", english: "same/identical" },
	{ lemma: "δυνατός", english: "strong/loud" },
	{ lemma: "ενθουσιασμένος", english: "enthusiastic" },
	{ lemma: "μεγάλος", english: "big/large" },
	{ lemma: "μικρός", english: "small" },
	{ lemma: "καλός", english: "good" },
	{ lemma: "κακός", english: "bad" },
	{ lemma: "ζεστός", english: "hot/warm" },
	{ lemma: "κρύος", english: "cold" },
	{ lemma: "πολύς", english: "much/many" },
	{ lemma: "λίγος", english: "few/little" },
	{ lemma: "οργανωμένος", english: "organized" },
	{ lemma: "απλός", english: "simple" },
];

export const COLORS = COLORS_RAW.map(enrichAdjective);
export const ADJECTIVES = ADJECTIVES_RAW.map(enrichAdjective);

export const COLOR_ITEMS: VocabWithTags[] = COLORS.map((color) => ({
	vocab: {
		greekText: color.lemma,
		englishTranslation: color.english,
		wordType: "adjective" as const,
	},
	tags: ["color"],
	...pickAdjectiveNominalForms(color),
	...pickAdjectiveDetails(color),
}));

export const ADJECTIVE_ITEMS: VocabWithTags[] = ADJECTIVES.map((adj) => ({
	vocab: {
		greekText: adj.lemma,
		englishTranslation: adj.english,
		wordType: "adjective" as const,
	},
	tags: [],
	...pickAdjectiveNominalForms(adj),
	...pickAdjectiveDetails(adj),
}));
