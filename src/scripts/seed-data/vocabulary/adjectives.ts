import { pickAdjectiveDetails, pickAdjectiveNominalForms, type VocabWithTags } from "../../seed-pipeline";
import { enrichAdjective, type AdjectiveSeedInput } from "./adjective-seed-enrichment";

const COLORS_RAW: AdjectiveSeedInput[] = [
	{ lemma: "άσπρο", english: "white", cefrLevel: "A2" },
	{ lemma: "μαύρο", english: "black", cefrLevel: "A2" },
	{ lemma: "κόκκινο", english: "red", cefrLevel: "A2" },
	{ lemma: "μπλε", english: "blue", cefrLevel: "A2" },
	{ lemma: "γαλάζιο", english: "light blue/sky blue", cefrLevel: "A2" },
	{ lemma: "πράσινο", english: "green", cefrLevel: "A2" },
	{ lemma: "κίτρινο", english: "yellow", cefrLevel: "A2" },
	{ lemma: "πορτοκαλί", english: "orange", cefrLevel: "A2" },
	{ lemma: "μωβ", english: "purple", cefrLevel: "A2" },
	{ lemma: "ροζ", english: "pink", cefrLevel: "A2" },
	{ lemma: "γκρι", english: "grey", cefrLevel: "A2" },
	{ lemma: "καφέ", english: "brown", cefrLevel: "A2" },
	{ lemma: "μπεζ", english: "beige", cefrLevel: "B1" },
	{ lemma: "χρυσό", english: "gold/golden", cefrLevel: "B1" },
	{ lemma: "ασημί", english: "silver", cefrLevel: "B1" },
];

const ADJECTIVES_RAW: AdjectiveSeedInput[] = [
	{ lemma: "φρέσκος", english: "fresh", cefrLevel: "A2" },
	{ lemma: "ίδιος", english: "same/identical", cefrLevel: "A2" },
	{ lemma: "δυνατός", english: "strong/loud", cefrLevel: "A2" },
	{ lemma: "ενθουσιασμένος", english: "enthusiastic", cefrLevel: "B1" },
	{ lemma: "μεγάλος", english: "big/large", cefrLevel: "A1" },
	{ lemma: "μικρός", english: "small", cefrLevel: "A1" },
	{ lemma: "καλός", english: "good", cefrLevel: "A1" },
	{ lemma: "κακός", english: "bad", cefrLevel: "A1" },
	{ lemma: "ζεστός", english: "hot/warm", cefrLevel: "A2" },
	{ lemma: "κρύος", english: "cold", cefrLevel: "A2" },
	{ lemma: "πολύς", english: "much/many", cefrLevel: "A1" },
	{ lemma: "λίγος", english: "few/little", cefrLevel: "A1" },
	{ lemma: "οργανωμένος", english: "organized", cefrLevel: "B1" },
	{ lemma: "απλός", english: "simple", cefrLevel: "A2" },
	{ lemma: "δύσκολος", english: "difficult", cefrLevel: "A2" },
	{ lemma: "εύκολος", english: "easy", cefrLevel: "A2" },
	{ lemma: "ωραίος", english: "nice/beautiful", cefrLevel: "A2" },
	{ lemma: "σίγουρος", english: "sure/certain", cefrLevel: "A2" },
];

export const COLORS = COLORS_RAW.map(enrichAdjective);
export const ADJECTIVES = ADJECTIVES_RAW.map(enrichAdjective);

export const COLOR_ITEMS: VocabWithTags[] = COLORS.map((color) => ({
	vocab: {
		greekText: color.lemma,
		englishTranslation: color.english,
		wordType: "adjective" as const,
		cefrLevel: color.cefrLevel ?? null,
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
		cefrLevel: adj.cefrLevel ?? null,
	},
	tags: [],
	...pickAdjectiveNominalForms(adj),
	...pickAdjectiveDetails(adj),
}));
