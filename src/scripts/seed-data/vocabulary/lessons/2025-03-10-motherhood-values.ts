import { createLesson } from "@/types/lesson-builder";

export const LESSON_2025_03_10 = createLesson({
	meta: {
		date: "2025-03-10",
		topic: "Motherhood, values, responsibilities — abstract vocabulary",
		source: "Weekly lesson - μητρότητα, αξίες, ψυχραιμία, περιβάλλον",
	},

	verbs: [
		{ lemma: "υπερβάλλω", english: "I exaggerate", conjugationFamily: "-ω", cefrLevel: "B1" },
		{ lemma: "επιτρέπω", english: "I allow/permit", conjugationFamily: "-ω", cefrLevel: "B1" },
		{
			lemma: "ερευνώ",
			english: "I research/investigate",
			conjugationFamily: "-άω/-ώ",
			cefrLevel: "B1",
		},
		{ lemma: "λύνω", english: "I solve/resolve", conjugationFamily: "-ω", cefrLevel: "A2" },
	],

	nouns: [
		{ lemma: "μητρότητα", gender: "feminine", english: "motherhood", cefrLevel: "B1" },
		{ lemma: "επίπεδο", gender: "neuter", english: "level", cefrLevel: "A2" },
		{ lemma: "περίπτωση", gender: "feminine", english: "case/situation", cefrLevel: "B1" },
		{ lemma: "πορεία", gender: "feminine", english: "path/course/way", cefrLevel: "B1" },
		{
			lemma: "παιδικός σταθμός",
			gender: "masculine",
			english: "daycare/nursery",
			metadata: { note: "παιδικός (children's) + σταθμός (station)" },
		},
		{ lemma: "ψυχραιμία", gender: "feminine", english: "composure/calm", cefrLevel: "B1" },
		{ lemma: "σεβασμός", gender: "masculine", english: "respect", cefrLevel: "A2" },
		{ lemma: "εργατικότητα", gender: "feminine", english: "hard work/diligence", cefrLevel: "B1" },
		{ lemma: "έρευνα", gender: "feminine", english: "research", cefrLevel: "B1" },
		{ lemma: "ευθύνη", gender: "feminine", english: "responsibility", cefrLevel: "B1" },
		{ lemma: "περιβάλλον", gender: "neuter", english: "environment", cefrLevel: "A2" },
		{ lemma: "αξία", gender: "feminine", english: "value (αξίες = values)", cefrLevel: "B1" },
		{
			lemma: "εικοσιτετράωρο",
			gender: "neuter",
			english: "24-hour period / round the clock",
			cefrLevel: "B1",
		},
	],

	adjectives: [
		{ lemma: "διαμορφωμένος", english: "formed/shaped", cefrLevel: "B1" },
		{ lemma: "ευγνώμων", english: "grateful", cefrLevel: "B1" },
		{ lemma: "ψύχραιμος", english: "calm/composed", cefrLevel: "B1" },
	],

	phrases: [
		{
			text: "τίποτα απολύτως",
			english: "nothing at all / absolutely nothing",
			metadata: { usage: "emphatic negation" },
		},
		{
			text: "μείνε ψύχραιμος/η/ο",
			english: "stay calm / keep your composure",
			metadata: {
				pattern: "μείνε (imperative of μένω) + adjective",
				usage: "telling someone to stay calm",
			},
		},
	],
});
