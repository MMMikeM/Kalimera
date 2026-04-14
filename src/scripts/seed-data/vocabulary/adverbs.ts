import type { AdverbSeed } from "../../../types/seed";
import type { VocabWithTags } from "../../seed-pipeline";

export const FREQUENCY_ADVERBS: AdverbSeed[] = [
	{ lemma: "ποτέ", english: "never", cefrLevel: "A1" },
	{ lemma: "σχεδόν ποτέ", english: "almost never", cefrLevel: "A2" },
	{ lemma: "σπάνια", english: "rarely", cefrLevel: "A2" },
	{ lemma: "καμιά φορά", english: "sometimes", cefrLevel: "A2" },
	{ lemma: "κάπου κάπου", english: "from time to time", cefrLevel: "B1" },
	{ lemma: "πότε πότε", english: "occasionally", cefrLevel: "B1" },
	{ lemma: "μερικές φορές", english: "sometimes", cefrLevel: "A2" },
	{ lemma: "συχνά", english: "often", cefrLevel: "A2" },
	{ lemma: "πολλές φορές", english: "many times", cefrLevel: "A2" },
	{ lemma: "συνήθως", english: "usually", cefrLevel: "A2" },
	{ lemma: "σχεδόν πάντα", english: "almost always", cefrLevel: "A2" },
	{ lemma: "πάντα", english: "always", cefrLevel: "A1" },
];

export const POSITION_ADVERBS: AdverbSeed[] = [
	{ lemma: "έξω", english: "outside", cefrLevel: "A1" },
	{ lemma: "μέσα", english: "inside", cefrLevel: "A1" },
	{ lemma: "κάτω", english: "down/under", cefrLevel: "A1" },
	{ lemma: "πάνω", english: "up/over", cefrLevel: "A1" },
	{ lemma: "μπροστά", english: "in front", cefrLevel: "A2" },
	{ lemma: "πίσω", english: "behind", cefrLevel: "A2" },
	{ lemma: "δίπλα", english: "next to", cefrLevel: "A2" },
	{ lemma: "ανάμεσα", english: "between", cefrLevel: "B1" },
	{ lemma: "απέναντι", english: "across/opposite", cefrLevel: "B1" },
	{ lemma: "δεξιά", english: "right", cefrLevel: "A1" },
	{ lemma: "αριστερά", english: "left", cefrLevel: "A1" },
	{ lemma: "κοντά", english: "close/near", cefrLevel: "A2" },
	{ lemma: "μακριά", english: "far", cefrLevel: "A2" },
	{ lemma: "εδώ", english: "here", cefrLevel: "A1" },
	{ lemma: "εκεί", english: "there", cefrLevel: "A1" },
];

// Indefinite adverbs (somewhere, sometime, somehow, etc.)
export const INDEFINITE_ADVERBS: AdverbSeed[] = [
	// Place (paired opposites)
	{ lemma: "κάπου", english: "somewhere", cefrLevel: "A2" },
	{ lemma: "πουθενά", english: "nowhere/anywhere", cefrLevel: "A2" },
	{ lemma: "οπουδήποτε", english: "anywhere/wherever", cefrLevel: "B1" },
	{ lemma: "παντού", english: "everywhere", cefrLevel: "B1" },

	// Time (paired opposites)
	{ lemma: "κάποτε", english: "sometime/once", cefrLevel: "B1" },
	{ lemma: "οποτεδήποτε", english: "anytime/whenever", cefrLevel: "B1" },

	// Manner
	{ lemma: "κάπως", english: "somehow", cefrLevel: "B1" },
	{ lemma: "οπωσδήποτε", english: "by all means/definitely", cefrLevel: "B1" },
];

export const FREQUENCY_ITEMS: VocabWithTags[] = FREQUENCY_ADVERBS.map((adverb) => ({
	vocab: {
		greekText: adverb.lemma,
		englishTranslation: adverb.english,
		wordType: "adverb" as const,
		cefrLevel: adverb.cefrLevel ?? null,
	},
	tags: ["frequency"],
}));

export const POSITION_ITEMS: VocabWithTags[] = POSITION_ADVERBS.map((adverb) => ({
	vocab: {
		greekText: adverb.lemma,
		englishTranslation: adverb.english,
		wordType: "adverb" as const,
		cefrLevel: adverb.cefrLevel ?? null,
	},
	tags: ["position"],
}));

export const INDEFINITE_ADVERB_ITEMS: VocabWithTags[] = INDEFINITE_ADVERBS.map((adverb) => ({
	vocab: {
		greekText: adverb.lemma,
		englishTranslation: adverb.english,
		wordType: "adverb" as const,
		cefrLevel: adverb.cefrLevel ?? null,
	},
	tags: [],
}));
