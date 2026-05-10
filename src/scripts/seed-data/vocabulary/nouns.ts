import { formatNounWithArticle } from "../../../lib/greek-grammar";
import { type VocabWithTags, nounDetailFromSeed, pickNounNominalForms } from "../../seed-pipeline";
import { type NounSeedInput, enrichNounsRecord } from "./noun-seed-enrichment";

const NOUNS_RAW = {
	summer: [
		{ lemma: "καλοκαίρι", gender: "neuter", english: "summer", cefrLevel: "A2" },
		{ lemma: "θάλασσα", gender: "feminine", english: "sea", cefrLevel: "A1" },
		{ lemma: "παραλία", gender: "feminine", english: "beach", cefrLevel: "A2" },
		{ lemma: "ήλιος", gender: "masculine", english: "sun", cefrLevel: "A1" },
		{ lemma: "ζέστη", gender: "feminine", english: "warmth", cefrLevel: "A2" },
		{ lemma: "μαγιό", gender: "neuter", english: "swimming costume", cefrLevel: "B1" },
		{ lemma: "καπέλο", gender: "neuter", english: "hat", cefrLevel: "A2" },
		{ lemma: "ξαπλώστρα", gender: "feminine", english: "sunbed", cefrLevel: "B1" },
		{ lemma: "παγωτό", gender: "neuter", english: "ice cream", cefrLevel: "A2" },
		{ lemma: "καρπούζι", gender: "neuter", english: "watermelon", cefrLevel: "A2" },
	],

	transport: [
		{ lemma: "τρένο", gender: "neuter", english: "train", cefrLevel: "A2" },
		{ lemma: "ταξί", gender: "neuter", english: "taxi", cefrLevel: "A2" },
		{ lemma: "ταξιτζής", gender: "masculine", english: "taxi driver", cefrLevel: "B1" },
		{ lemma: "αεροπλάνο", gender: "neuter", english: "airplane", cefrLevel: "A2" },
		{ lemma: "τρόλεϊ", gender: "neuter", english: "trolley", cefrLevel: "B1" },
	],

	timeOfDay: [
		{
			lemma: "πρωί",
			gender: "neuter",
			english: "morning",
			cefrLevel: "A1",
			metadata: { timeRange: "(5:00-12:00)" },
		},
		{
			lemma: "μεσημέρι",
			gender: "neuter",
			english: "midday",
			cefrLevel: "A1",
			metadata: { timeRange: "(12:00-15:00)" },
		},
		{
			lemma: "απόγευμα",
			gender: "neuter",
			english: "afternoon",
			cefrLevel: "A1",
			metadata: { timeRange: "(15:00-19:00)" },
		},
		{
			lemma: "βράδυ",
			gender: "neuter",
			english: "evening",
			cefrLevel: "A1",
			metadata: { timeRange: "(19:00-24:00)" },
		},
		{
			lemma: "νύχτα",
			gender: "feminine",
			english: "night",
			cefrLevel: "A1",
			metadata: { timeRange: "(24:00-5:00)" },
		},
	],

	timeExpressions: [
		{ lemma: "λεπτό", gender: "neuter", english: "minute", cefrLevel: "A1" },
		{ lemma: "ώρα", gender: "feminine", english: "hour", cefrLevel: "A1" },
		{ lemma: "μέρα", gender: "feminine", english: "day", cefrLevel: "A1" },
		{ lemma: "εβδομάδα", gender: "feminine", english: "week", cefrLevel: "A1" },
		{ lemma: "μήνας", gender: "masculine", english: "month", cefrLevel: "A1" },
		{ lemma: "χρόνος", gender: "masculine", english: "year", cefrLevel: "A1" },
		{ lemma: "μεσημέρι", gender: "neuter", english: "midday", cefrLevel: "A1" },
		{ lemma: "απόγευμα", gender: "neuter", english: "afternoon", cefrLevel: "A1" },
		{ lemma: "βράδυ", gender: "neuter", english: "evening", cefrLevel: "A1" },
		{ lemma: "νύχτα", gender: "feminine", english: "night", cefrLevel: "A1" },
		{ lemma: "διακοπές", gender: "feminine", english: "holidays", cefrLevel: "A2" },
		{ lemma: "ταξίδι", gender: "neuter", english: "journey/trip", cefrLevel: "A2" },
	],

	shopping: [
		{
			lemma: "καφές",
			gender: "masculine",
			english: "coffee",
			cefrLevel: "A1",
			declensionPattern: "masc-es",
		},
		{ lemma: "χυμός", gender: "masculine", english: "juice", cefrLevel: "A2" },
		{ lemma: "ντομάτα", gender: "feminine", english: "tomato", cefrLevel: "A2" },
		{ lemma: "αγγούρι", gender: "neuter", english: "cucumber", cefrLevel: "A2" },
		{ lemma: "αντηλιακό", gender: "neuter", english: "sunscreen", cefrLevel: "B1" },
		{ lemma: "μπουκάλι", gender: "neuter", english: "bottle", cefrLevel: "A2" },
		{ lemma: "απόδειξη", gender: "feminine", english: "receipt", cefrLevel: "B1" },
		{ lemma: "πορτοκάλι", gender: "neuter", english: "orange", cefrLevel: "A2" },
		{ lemma: "ψωμί", gender: "neuter", english: "bread", cefrLevel: "A1" },
		{ lemma: "ψώνια", gender: "neuter", english: "shopping/groceries", cefrLevel: "A2" },
	],

	clothing: [
		{ lemma: "ντουλάπα", gender: "feminine", english: "wardrobe/closet", cefrLevel: "B1" },
		{ lemma: "ρούχα", gender: "neuter", english: "clothes", cefrLevel: "A2" },
		{ lemma: "παντελόνι", gender: "neuter", english: "pants/trousers", cefrLevel: "A2" },
		{ lemma: "μπλούζα", gender: "feminine", english: "top/blouse", cefrLevel: "A2" },
	],

	household: [
		{ lemma: "σπίτι", gender: "neuter", english: "house/home", cefrLevel: "A1" },
		{ lemma: "βιβλίο", gender: "neuter", english: "book", cefrLevel: "A1" },
		{ lemma: "γραφείο", gender: "neuter", english: "office/desk", cefrLevel: "A2" },
		{ lemma: "αυτοκίνητο", gender: "neuter", english: "car", cefrLevel: "A1" },
		{ lemma: "κλειδί", gender: "neuter", english: "key", cefrLevel: "A2" },
		{ lemma: "πόρτα", gender: "feminine", english: "door", cefrLevel: "A1" },
		{ lemma: "κήπος", gender: "masculine", english: "garden", cefrLevel: "A2" },
		{ lemma: "ποδήλατο", gender: "neuter", english: "bicycle", cefrLevel: "A2" },
	],

	people: [
		{ lemma: "γυναίκα", gender: "feminine", english: "woman/wife", cefrLevel: "A1" },
		{ lemma: "άντρας", gender: "masculine", english: "man/husband", cefrLevel: "A1" },
		{ lemma: "παιδί", gender: "neuter", english: "child", cefrLevel: "A1" },
		{ lemma: "οικογένεια", gender: "feminine", english: "family", cefrLevel: "A1" },
		{ lemma: "σκύλος", gender: "masculine", english: "dog", cefrLevel: "A2" },
		{
			lemma: "φίλος",
			gender: "masculine",
			english: "friend (male)",
			cefrLevel: "A1",
			nominalForms: {
				accusative_singular: { form: "φίλο", article: "τον" },
			},
		},
		{ lemma: "φίλη", gender: "feminine", english: "friend (female)", cefrLevel: "A1" },
		{ lemma: "αδελφός", gender: "masculine", english: "brother", cefrLevel: "A1" },
		{ lemma: "αδελφή", gender: "feminine", english: "sister", cefrLevel: "A1" },
		{ lemma: "μητέρα", gender: "feminine", english: "mother", cefrLevel: "A1" },
		{ lemma: "πατέρας", gender: "masculine", english: "father", cefrLevel: "A1" },
		{ lemma: "πεθερά", gender: "feminine", english: "mother-in-law", cefrLevel: "B1" },
		{ lemma: "σύζυγος", gender: "masculine", english: "spouse", cefrLevel: "A2" },
		{ lemma: "γιατρός", gender: "masculine", english: "doctor", cefrLevel: "A2" },
		{ lemma: "κηπουρός", gender: "masculine", english: "gardener", cefrLevel: "B1" },
		{ lemma: "αρχηγός", gender: "masculine", english: "leader", cefrLevel: "B1" },
		{ lemma: "άνθρωπος", gender: "masculine", english: "human/person", cefrLevel: "A1" },
		{ lemma: "κυνηγός", gender: "masculine", english: "hunter", cefrLevel: "B2" },
		{ lemma: "γεωργός", gender: "masculine", english: "farmer", cefrLevel: "B1" },
		{ lemma: "οδηγός", gender: "masculine", english: "driver", cefrLevel: "A2" },
		{ lemma: "βοσκός", gender: "masculine", english: "shepherd", cefrLevel: "B2" },
		{ lemma: "ηθοποιός", gender: "masculine", english: "actor", cefrLevel: "B1" },
		{ lemma: "δάσκαλος", gender: "masculine", english: "teacher", cefrLevel: "A2" },
		{ lemma: "νάνος", gender: "masculine", english: "dwarf", cefrLevel: "B2" },
	],

	abstract: [
		{ lemma: "ελευθερία", gender: "feminine", english: "freedom", cefrLevel: "B1" },
		{ lemma: "δουλειά", gender: "feminine", english: "work/job", cefrLevel: "A1" },
	],

	nature: [
		{ lemma: "καιρός", gender: "masculine", english: "weather / time", cefrLevel: "A1" },
		{ lemma: "κύμα", gender: "neuter", english: "wave", cefrLevel: "B1" },
		{ lemma: "λουλούδι", gender: "neuter", english: "flower", cefrLevel: "A2" },
		{ lemma: "ποταμός", gender: "masculine", english: "river", cefrLevel: "A2" },
		{ lemma: "ουρανός", gender: "masculine", english: "sky", cefrLevel: "A1" },
		{ lemma: "βράχος", gender: "masculine", english: "rock", cefrLevel: "B1" },
		{ lemma: "νερό", gender: "neuter", english: "water", cefrLevel: "A1" },
		{
			lemma: "κεραυνός",
			gender: "masculine",
			english: "lightning/thunderbolt",
			cefrLevel: "B1",
		},
	],

	animals: [
		{ lemma: "λαγός", gender: "masculine", english: "rabbit", cefrLevel: "B1" },
		{ lemma: "βάτραχος", gender: "masculine", english: "frog", cefrLevel: "B1" },
		{ lemma: "λύκος", gender: "masculine", english: "wolf", cefrLevel: "B1" },
		{ lemma: "ποντικός", gender: "masculine", english: "mouse", cefrLevel: "B1" },
		{ lemma: "ταύρος", gender: "masculine", english: "bull", cefrLevel: "B1" },
		{ lemma: "γερανός", gender: "masculine", english: "crane (bird)", cefrLevel: "B2" },
		{ lemma: "αετός", gender: "masculine", english: "eagle", cefrLevel: "B1" },
		{ lemma: "δράκος", gender: "masculine", english: "dragon", cefrLevel: "B1" },
	],

	places: [
		{ lemma: "δρόμος", gender: "masculine", english: "road/street", cefrLevel: "A2" },
		{ lemma: "τοίχος", gender: "masculine", english: "wall", cefrLevel: "B1" },
		{ lemma: "κάμπος", gender: "masculine", english: "plain/field", cefrLevel: "B1" },
	],

	body: [{ lemma: "λαιμός", gender: "masculine", english: "neck", cefrLevel: "B1" }],

	objects: [{ lemma: "πίνακας", gender: "masculine", english: "board/painting", cefrLevel: "B1" }],

	essential: [
		// A1
		{ lemma: "ζωή", gender: "feminine", english: "life", cefrLevel: "A1" },
		{ lemma: "πράγμα", gender: "neuter", english: "thing", cefrLevel: "A1" },
		{ lemma: "όνομα", gender: "neuter", english: "name", cefrLevel: "A1" },
		{ lemma: "χέρι", gender: "neuter", english: "hand", cefrLevel: "A1" },
		{ lemma: "κεφάλι", gender: "neuter", english: "head", cefrLevel: "A1" },
		{ lemma: "κορίτσι", gender: "neuter", english: "girl", cefrLevel: "A1" },
		{ lemma: "τηλέφωνο", gender: "neuter", english: "phone", cefrLevel: "A1" },
		{ lemma: "φαγητό", gender: "neuter", english: "food", cefrLevel: "A1" },
		{
			lemma: "λεφτά",
			gender: "neuter",
			english: "money",
			cefrLevel: "A1",
			nominalForms: {
				nominative_plural: { form: "λεφτά", article: "τα" },
				genitive_plural: { form: "λεφτών", article: "των" },
				accusative_plural: { form: "λεφτά", article: "τα" },
			},
		},
		{ lemma: "πόλη", gender: "feminine", english: "city", cefrLevel: "A1" },
		{ lemma: "μωρό", gender: "neuter", english: "baby", cefrLevel: "A1" },
		// A2
		{ lemma: "φορά", gender: "feminine", english: "time/occasion", cefrLevel: "A2" },
		{ lemma: "στιγμή", gender: "feminine", english: "moment", cefrLevel: "A2" },
		{
			lemma: "μέρος",
			gender: "neuter",
			english: "place/part",
			cefrLevel: "A2",
			nominalForms: {
				nominative_singular: { form: "μέρος", article: "το" },
				genitive_singular: { form: "μέρους", article: "του" },
				accusative_singular: { form: "μέρος", article: "το" },
				nominative_plural: { form: "μέρη", article: "τα" },
				genitive_plural: { form: "μερών", article: "των" },
				accusative_plural: { form: "μέρη", article: "τα" },
			},
		},
		{ lemma: "ιδέα", gender: "feminine", english: "idea", cefrLevel: "A2" },
		{ lemma: "χαρά", gender: "feminine", english: "joy", cefrLevel: "A2" },
		{
			lemma: "τέλος",
			gender: "neuter",
			english: "end",
			cefrLevel: "A2",
			nominalForms: {
				nominative_singular: { form: "τέλος", article: "το" },
				genitive_singular: { form: "τέλους", article: "του" },
				accusative_singular: { form: "τέλος", article: "το" },
				nominative_plural: { form: "τέλη", article: "τα" },
				genitive_plural: { form: "τελών", article: "των" },
				accusative_plural: { form: "τέλη", article: "τα" },
			},
		},
		{ lemma: "βοήθεια", gender: "feminine", english: "help", cefrLevel: "A2" },
		{ lemma: "ιστορία", gender: "feminine", english: "story/history", cefrLevel: "A2" },
		{ lemma: "αγάπη", gender: "feminine", english: "love", cefrLevel: "A2" },
		{ lemma: "κόσμος", gender: "masculine", english: "world/people", cefrLevel: "A2" },
		{ lemma: "δωμάτιο", gender: "neuter", english: "room", cefrLevel: "A2" },
		{ lemma: "καρδιά", gender: "feminine", english: "heart", cefrLevel: "A2" },
		// B1
		{ lemma: "θέση", gender: "feminine", english: "seat/position", cefrLevel: "B1" },
		{ lemma: "τρόπος", gender: "masculine", english: "way/manner", cefrLevel: "B1" },
		{ lemma: "θέμα", gender: "neuter", english: "topic/issue", cefrLevel: "B1" },
		{ lemma: "ευκαιρία", gender: "feminine", english: "opportunity", cefrLevel: "B1" },
		{ lemma: "λόγος", gender: "masculine", english: "reason", cefrLevel: "B1" },
		{ lemma: "σχέση", gender: "feminine", english: "relationship", cefrLevel: "B1" },
		{ lemma: "αρχή", gender: "feminine", english: "beginning", cefrLevel: "B1" },
		{ lemma: "κατάσταση", gender: "feminine", english: "situation", cefrLevel: "B1" },
	],
} as const satisfies Record<string, readonly NounSeedInput[]>;

const themeTagMap: Record<string, string> = {
	summer: "summer",
	transport: "transport-vehicle",
	timeOfDay: "time-of-day",
	timeExpressions: "time-expression",
	shopping: "shopping",
	clothing: "clothing",
	household: "household",
	people: "people",
	nature: "nature",
	essential: "essential",
};

export const NOUN_ITEMS: VocabWithTags[] = [];
for (const [theme, nouns] of Object.entries(NOUNS)) {
	for (const noun of nouns) {
		const displayText = formatNounWithArticle(noun.lemma, noun.gender);
		const itemTags: string[] = [];
		if (themeTagMap[theme]) itemTags.push(themeTagMap[theme]);

		NOUN_ITEMS.push({
			vocab: {
				greekText: displayText,
				englishTranslation: noun.english,
				wordType: "noun",
				cefrLevel: noun.cefrLevel ?? null,
				metadata: "metadata" in noun ? noun.metadata : undefined,
			},
			tags: itemTags,
			nounDetail: nounDetailFromSeed(noun),
			...pickNounNominalForms(noun),
		});
	}
}

export const NOUNS = enrichNounsRecord(NOUNS_RAW);
