import { cellWith, mark, markedCell } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

export const GENDER_GUIDE: Guide = {
	slug: "gender",
	tone: "sunset",
	title: "A noun's gender",
	greek: "Το γένος",
	description: "Telling masculine, feminine and neuter from the word",
	idea: "Every noun is masculine, feminine or neuter. The ending usually tells you which, and a few kinds of word follow their own rule.",
	sections: [
		{
			id: "masculine-endings",
			title: "Masculine: -ος, -ας, -ης, -ές",
			tone: "gender-masculine",
			rule: [
				"Every Greek noun is masculine, feminine or neuter, and its article shows which: ο, η or το. The ending usually gives it away too, but a few everyday words break the pattern, so learn each noun with its article.",
				"Nouns ending in -ς are mostly masculine, and take ο.",
			],
			table: {
				columns: [{ label: "Ending" }, { label: "Example", greek: true }],
				rows: [
					["-ος", markedCell("ο φίλος", "nominative", "masculine")],
					["-ας", markedCell("ο πατέρας", "nominative", "masculine")],
					["-ης", markedCell("ο μαθητής", "nominative", "masculine")],
					["-ές", markedCell("ο καφές", "nominative", "masculine")],
				],
			},
			examples: [
				{
					greek: "Ο καφές είναι ζεστός.",
					english: "The coffee is hot. (ζεστός: καφές is masculine)",
					marks: [mark("Ο καφές", "nominative", "masculine"), mark("ζεστός", "nominative", "masculine")],
				},
			],
			details: [
				{
					label: "ο καφές and το καφέ",
					text: "ο καφές is coffee; το καφέ is the café.",
				},
			],
			confuse: {
				text: "ο φίλος and ο πατέρας are both masculine, but they come from different families: τους φίλους, τους πατέρες.",
				section: "nouns/families",
			},
			drills: [],
			plannedDrills: [
				{
					id: "nouns-gender-exceptions",
					title: "Gender exceptions",
					greek: "Κύπρος · λάθος · κρέας · γάλα",
					tests: "Shows a noun without its article, mixing regular endings with exceptions such as Κύπρος and κρέας; the answer is ο, η or το.",
				},
			],
		},
		{
			id: "feminine-endings",
			title: "Feminine: -α, -η",
			tone: "gender-feminine",
			rule: "Nouns ending in -α or -η are mostly feminine, and take η.",
			table: {
				columns: [{ label: "Ending" }, { label: "Example", greek: true }],
				rows: [
					["-α", markedCell("η μητέρα", "nominative", "feminine")],
					["-η", markedCell("η πόλη", "nominative", "feminine")],
					["-ος", markedCell("η Κύπρος", "nominative", "feminine", false, 0)],
					["-ώ", markedCell("η Κλειώ", "nominative", "feminine", false, 1)],
				],
				notes: ["Some place names in -ος are feminine, like η Αίγυπτος.", "Women's names in -ώ are feminine."],
			},
			examples: [
				{
					greek: "Η Κύπρος είναι πολύ όμορφη.",
					english: "Cyprus is very beautiful. (όμορφη, not όμορφος: Κύπρος is feminine)",
					marks: [mark("Η Κύπρος", "nominative", "feminine"), mark("όμορφη", "nominative", "feminine")],
				},
			],
			drills: [],
		},
		{
			id: "neuter-endings",
			title: "Neuter: -ο, -ι, -μα",
			tone: "gender-neuter",
			rule: "Nouns ending in -ο, -ι or -μα are neuter, and take το.",
			table: {
				columns: [{ label: "Ending" }, { label: "Example", greek: true }],
				rows: [
					["-ο", markedCell("το βιβλίο", "nominative", "neuter")],
					["-ι", markedCell("το παιδί", "nominative", "neuter")],
					["-μα", markedCell("το όνομα", "nominative", "neuter")],
					["-ας", markedCell("το κρέας", "nominative", "neuter", false, 0)],
				],
				notes: ["A few words in -ας, -ος and -α are neuter too: το λάθος, το γάλα."],
			},
			examples: [
				{
					greek: "Το κρέας είναι νόστιμο.",
					english: "The meat is tasty. (νόστιμο, not νόστιμος: κρέας is neuter)",
					marks: [mark("Το κρέας", "nominative", "neuter"), mark("νόστιμο", "nominative", "neuter")],
				},
			],
			drills: [],
		},
		{
			id: "gender-families",
			title: "Guessing gender from the word",
			tone: "ocean",
			rule: [
				"Some groups of nouns share a gender, so knowing the group tells you the article. A group can be:",
				["an ending, such as -ση or -είο", "a kind of thing, such as countries or languages"],
				"The table lists the common groups.",
			],
			table: {
				columns: [
					{ label: "Group" },
					{ label: "Gender" },
					{ label: "Examples", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[
						"-ση, -ξη, -ψη",
						"feminine",
						cellWith(
							"η θέση · η απόδειξη · η άποψη",
							mark("η θέση", "nominative", "feminine"),
							mark("η απόδειξη", "nominative", "feminine"),
							mark("η άποψη", "nominative", "feminine"),
						),
						"place, receipt, opinion",
					],
					["-ότητα", "feminine", markedCell("η ταυτότητα", "nominative", "feminine"), "identity card"],
					[
						"-είο, often a place or shop",
						"neuter",
						cellWith("το φαρμακείο · το ανθοπωλείο", mark("το φαρμακείο", "nominative", "neuter"), mark("το ανθοπωλείο", "nominative", "neuter")),
						"chemist's, florist's",
					],
					["countries", { text: "mostly feminine", note: 0 }, markedCell("η Ελλάδα", "nominative", "feminine"), "Greece"],
					["languages", "neuter, and plural", markedCell("τα ελληνικά", "nominative", "neuter", true), "Greek"],
					[
						"meals",
						"neuter",
						cellWith("το πρωινό · το βραδινό", mark("το πρωινό", "nominative", "neuter"), mark("το βραδινό", "nominative", "neuter")),
						"breakfast, dinner",
					],
				],
				notes: ["A few are not, such as ο Καναδάς."],
			},
			examples: [
				{
					greek: "Τα ελληνικά είναι δύσκολα.",
					english: "Greek is hard. (δύσκολα: τα ελληνικά is neuter plural)",
					marks: [mark("Τα ελληνικά", "nominative", "neuter", true), mark("δύσκολα", "nominative", "neuter", true)],
				},
				{
					greek: "Το φαρμακείο είναι κλειστό.",
					english: "The chemist's is closed. (κλειστό: φαρμακείο is neuter)",
					marks: [mark("Το φαρμακείο", "nominative", "neuter"), mark("κλειστό", "nominative", "neuter")],
				},
			],
			details: [
				{
					label: "Seasons",
					text: [
						"The seasons don't share a gender. Each follows its own ending:",
						["ο χειμώνας, winter", "η άνοιξη, spring", "το καλοκαίρι, summer", "το φθινόπωρο, autumn"],
					],
				},
			],
			confuse: {
				text: "Words for people, jobs among them, often come in a masculine and feminine pair: ο δάσκαλος, η δασκάλα.",
				section: "gender-pairs",
			},
			drills: [],
			plannedDrills: [
				{
					id: "nouns-gender-from-ending",
					title: "Gender from the word's group",
					greek: "φαρμακείο · θέση · βιβλιοπωλείο",
					tests: "Shows a noun without its article; the answer is ο, η or το.",
				},
			],
		},
		{
			id: "gender-pairs",
			title: "Pairs of people",
			tone: "stone",
			rule: [
				"Many words for people, jobs among them, come in a masculine and feminine pair. The feminine ending varies, so learn both. Often:",
				["-ος becomes -α", "-ας becomes -ισσα or -ίδα", "-τής becomes -τρια"],
			],
			table: {
				columns: [
					{ label: "Masculine", greek: true },
					{ label: "Feminine", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("ο θείος", "nominative", "masculine"), markedCell("η θεία", "nominative", "feminine"), "uncle, aunt"],
					[markedCell("ο δάσκαλος", "nominative", "masculine"), markedCell("η δασκάλα", "nominative", "feminine"), "teacher"],
					[markedCell("ο γείτονας", "nominative", "masculine"), markedCell("η γειτόνισσα", "nominative", "feminine", false), "neighbour"],
					[markedCell("ο Έλληνας", "nominative", "masculine"), markedCell("η Ελληνίδα", "nominative", "feminine", false), "a Greek"],
					[markedCell("ο μαθητής", "nominative", "masculine"), markedCell("η μαθήτρια", "nominative", "feminine"), "pupil"],
				],
			},
			examples: [
				{
					greek: "Ο Νίκος είναι Έλληνας και η Μαρία είναι Ελληνίδα.",
					english: "Nikos is Greek, and so is Maria. (Ελληνίδα for a woman)",
					marks: [mark("Έλληνας", "nominative", "masculine"), mark("Ελληνίδα", "nominative", "feminine")],
				},
				{
					greek: "Η θεία μου μένει στην Αθήνα.",
					english: "My aunt lives in Athens. (θείος becomes θεία)",
					marks: [mark("Η θεία", "nominative", "feminine"), mark("μου", "genitive")],
				},
			],
			details: [
				{
					label: "One word for both",
					text: ["Some words for people have one form, and only the article changes:", ["ο μπαρίστα, η μπαρίστα", "ο βοηθός, η βοηθός"]],
					examples: [
						{
							greek: "Η μπαρίστα δουλεύει στο καφέ.",
							english: "The barista works at the café. (only η shows she's a woman)",
							marks: [mark("Η μπαρίστα", "nominative", "feminine")],
						},
					],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "nouns-gender-pairs",
					title: "Masculine and feminine pairs",
					greek: "θεία · γειτόνισσα · Ελληνίδα",
					tests: "Shows a masculine word for a person, such as ο γείτονας; the answer is the feminine with its article, η γειτόνισσα.",
				},
			],
		},
		{
			id: "small-big",
			title: "Endings that make small or big",
			tone: "terracotta",
			rule: [
				"Greek adds an ending to a noun to make it small or big, and the ending can change its gender.",
				[
					"-άκι makes it small, and neuter whatever it was before.",
					"-άκος makes it small, and keeps a masculine noun masculine.",
					"-άρα makes it big, or stronger, and feminine whatever it was before.",
				],
			],
			table: {
				columns: [
					{ label: "Word", greek: true },
					{ label: "Small or big", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("ο ελέφαντας", "nominative", "masculine"), markedCell("το ελεφαντάκι", "nominative", "neuter", false), "a little elephant"],
					[markedCell("το κρεβάτι", "nominative", "neuter"), markedCell("το κρεβατάκι", "nominative", "neuter"), "a cot"],
					[markedCell("ο ύπνος", "nominative", "masculine"), markedCell("ο υπνάκος", "nominative", "masculine"), "a nap"],
					[markedCell("η φωνή", "nominative", "feminine"), markedCell("η φωνάρα", "nominative", "feminine"), "a big, loud voice"],
					[markedCell("το ψώνιο", "nominative", "neuter"), markedCell("η ψωνάρα", "nominative", "feminine", false), "an egomaniac, full of themselves (slang)"],
				],
			},
			examples: [
				{
					greek: "Τι ωραίο ελεφαντάκι!",
					english: "What a lovely little elephant! (ωραίο: ελεφαντάκι is neuter, though ελέφαντας is masculine)",
					marks: [mark("ωραίο ελεφαντάκι", "nominative", "neuter")],
				},
				{
					greek: "Θα πάρω έναν υπνάκο.",
					english: "I'm going to have a nap. (έναν: υπνάκος stays masculine)",
					marks: [mark("έναν υπνάκο", "accusative", "masculine")],
				},
				{
					greek: "Είσαι ψωνάρα.",
					english: "You're so full of yourself. (playful)",
					marks: [mark("ψωνάρα", "nominative", "feminine")],
				},
			],
			details: [
				{
					label: "Words that only look small or big",
					text: "Not every word with these endings is a small or big form: η κιθάρα and ο δράκος are ordinary words.",
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "nouns-small-big",
					title: "Small and big forms",
					greek: "ελεφαντάκι · υπνάκος · φωνάρα",
					tests: "Shows a noun and whether to make it small or big; the answer is the -άκι, -άκος or -άρα form with its article, such as το κρεβατάκι.",
				},
			],
		},
	],
	reference: [
		{ label: "Every noun pattern", href: "/reference/nouns" },
	],
};
