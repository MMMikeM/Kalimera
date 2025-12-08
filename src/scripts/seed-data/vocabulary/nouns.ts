import type { NounSeed } from "../../../types/seed";

export const NOUNS = {
	summer: [
		{ lemma: "καλοκαίρι", gender: "neuter", english: "summer" },
		{ lemma: "θάλασσα", gender: "feminine", english: "sea" },
		{ lemma: "παραλία", gender: "feminine", english: "beach" },
		{ lemma: "ήλιος", gender: "masculine", english: "sun" },
		{ lemma: "ζέστη", gender: "feminine", english: "warmth" },
		{ lemma: "μαγιό", gender: "neuter", english: "swimming costume" },
		{ lemma: "καπέλο", gender: "neuter", english: "hat" },
		{ lemma: "ξαπλώστρα", gender: "feminine", english: "sunbed" },
		{ lemma: "παγωτό", gender: "neuter", english: "ice cream" },
		{ lemma: "καρπούζι", gender: "neuter", english: "watermelon" },
	],

	transport: [
		{ lemma: "τρένο", gender: "neuter", english: "train" },
		{ lemma: "ταξί", gender: "neuter", english: "taxi" },
		{ lemma: "ταξιτζής", gender: "masculine", english: "taxi driver" },
		{ lemma: "αεροπλάνο", gender: "neuter", english: "airplane" },
		{ lemma: "τρόλεϊ", gender: "neuter", english: "trolley" },
	],

	timeOfDay: [
		{
			lemma: "πρωί",
			gender: "neuter",
			english: "morning",
			metadata: { timeRange: "(5:00-12:00)" },
		},
		{
			lemma: "μεσημέρι",
			gender: "neuter",
			english: "midday",
			metadata: { timeRange: "(12:00-15:00)" },
		},
		{
			lemma: "απόγευμα",
			gender: "neuter",
			english: "afternoon",
			metadata: { timeRange: "(15:00-19:00)" },
		},
		{
			lemma: "βράδυ",
			gender: "neuter",
			english: "evening",
			metadata: { timeRange: "(19:00-24:00)" },
		},
		{
			lemma: "νύχτα",
			gender: "feminine",
			english: "night",
			metadata: { timeRange: "(24:00-5:00)" },
		},
	],

	timeExpressions: [
		{ lemma: "λεπτό", gender: "neuter", english: "minute" },
		{ lemma: "ώρα", gender: "feminine", english: "hour" },
		{ lemma: "μέρα", gender: "feminine", english: "day" },
		{ lemma: "εβδομάδα", gender: "feminine", english: "week" },
		{ lemma: "μήνας", gender: "masculine", english: "month" },
		{ lemma: "χρόνος", gender: "masculine", english: "year" },
		{ lemma: "μεσημέρι", gender: "neuter", english: "midday" },
		{ lemma: "απόγευμα", gender: "neuter", english: "afternoon" },
		{ lemma: "βράδυ", gender: "neuter", english: "evening" },
		{ lemma: "νύχτα", gender: "feminine", english: "night" },
		{ lemma: "διακοπές", gender: "feminine", english: "holidays" },
		{ lemma: "ταξίδι", gender: "neuter", english: "journey/trip" },
	],

	shopping: [
		{ lemma: "χυμός", gender: "masculine", english: "juice" },
		{ lemma: "ντομάτα", gender: "feminine", english: "tomato" },
		{ lemma: "αγγούρι", gender: "neuter", english: "cucumber" },
		{ lemma: "αντηλιακό", gender: "neuter", english: "sunscreen" },
		{ lemma: "μπουκάλι", gender: "neuter", english: "bottle" },
		{ lemma: "απόδειξη", gender: "feminine", english: "receipt" },
		{ lemma: "πορτοκάλι", gender: "neuter", english: "orange" },
		{ lemma: "ψωμί", gender: "neuter", english: "bread" },
		{ lemma: "ψώνια", gender: "neuter", english: "shopping/groceries" },
	],

	clothing: [
		{ lemma: "ντουλάπα", gender: "feminine", english: "wardrobe/closet" },
		{ lemma: "ρούχα", gender: "neuter", english: "clothes" },
		{ lemma: "παντελόνι", gender: "neuter", english: "pants/trousers" },
		{ lemma: "μπλουζάκι", gender: "neuter", english: "t-shirt" },
	],

	household: [
		{ lemma: "σπίτι", gender: "neuter", english: "house/home" },
		{ lemma: "γραφείο", gender: "neuter", english: "office/desk" },
		{ lemma: "αυτοκίνητο", gender: "neuter", english: "car" },
		{ lemma: "κλειδί", gender: "neuter", english: "key" },
		{ lemma: "πόρτα", gender: "feminine", english: "door" },
		{ lemma: "κήπος", gender: "masculine", english: "garden" },
		{ lemma: "ποδήλατο", gender: "neuter", english: "bicycle" },
	],

	people: [
		{ lemma: "γυναίκα", gender: "feminine", english: "woman/wife" },
		{ lemma: "άντρας", gender: "masculine", english: "man/husband" },
		{ lemma: "παιδί", gender: "neuter", english: "child" },
		{ lemma: "σκύλος", gender: "masculine", english: "dog" },
		{ lemma: "φίλος", gender: "masculine", english: "friend (male)" },
		{ lemma: "φίλη", gender: "feminine", english: "friend (female)" },
		{ lemma: "αδελφός", gender: "masculine", english: "brother" },
		{ lemma: "αδελφή", gender: "feminine", english: "sister" },
		{ lemma: "μητέρα", gender: "feminine", english: "mother" },
		{ lemma: "πατέρας", gender: "masculine", english: "father" },
		{ lemma: "πεθερά", gender: "feminine", english: "mother-in-law" },
		{ lemma: "σύζυγος", gender: "masculine", english: "spouse" },
		{ lemma: "γιατρός", gender: "masculine", english: "doctor" },
		{ lemma: "κηπουρός", gender: "masculine", english: "gardener" },
		{ lemma: "αρχηγός", gender: "masculine", english: "leader" },
		{ lemma: "άνθρωπος", gender: "masculine", english: "human/person" },
		{ lemma: "κυνηγός", gender: "masculine", english: "hunter" },
		{ lemma: "γεωργός", gender: "masculine", english: "farmer" },
		{ lemma: "οδηγός", gender: "masculine", english: "driver" },
		{ lemma: "βοσκός", gender: "masculine", english: "shepherd" },
		{ lemma: "ηθοποιός", gender: "masculine", english: "actor" },
		{ lemma: "δάσκαλος", gender: "masculine", english: "teacher" },
		{ lemma: "νάνος", gender: "masculine", english: "dwarf" },
	],

	abstract: [
		{ lemma: "ελευθερία", gender: "feminine", english: "freedom" },
		{ lemma: "δουλειά", gender: "feminine", english: "work/job" },
	],

	nature: [
		{ lemma: "κύμα", gender: "neuter", english: "wave" },
		{ lemma: "λουλούδι", gender: "neuter", english: "flower" },
		{ lemma: "ποταμός", gender: "masculine", english: "river" },
		{ lemma: "ουρανός", gender: "masculine", english: "sky" },
		{ lemma: "βράχος", gender: "masculine", english: "rock" },
		{ lemma: "νερό", gender: "neuter", english: "water" },
		{ lemma: "κεραυνός", gender: "masculine", english: "lightning/thunderbolt" },
	],

	animals: [
		{ lemma: "λαγός", gender: "masculine", english: "rabbit" },
		{ lemma: "βάτραχος", gender: "masculine", english: "frog" },
		{ lemma: "λύκος", gender: "masculine", english: "wolf" },
		{ lemma: "ποντικός", gender: "masculine", english: "mouse" },
		{ lemma: "ταύρος", gender: "masculine", english: "bull" },
		{ lemma: "γερανός", gender: "masculine", english: "crane (bird)" },
		{ lemma: "αετός", gender: "masculine", english: "eagle" },
		{ lemma: "δράκος", gender: "masculine", english: "dragon" },
	],

	places: [
		{ lemma: "δρόμος", gender: "masculine", english: "road/street" },
		{ lemma: "τοίχος", gender: "masculine", english: "wall" },
		{ lemma: "κάμπος", gender: "masculine", english: "plain/field" },
	],

	body: [{ lemma: "λαιμός", gender: "masculine", english: "neck" }],

	objects: [{ lemma: "πίνακας", gender: "masculine", english: "board/painting" }],
} as const satisfies Record<string, NounSeed[]>;
