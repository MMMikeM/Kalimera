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
			tone: "honey",
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
			tone: "honey",
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
			tone: "honey",
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
				"Every noun is masculine, feminine or neuter, shown by its article: ο, η or το. Some families of words share a gender, so knowing the family tells you the article. A family can be:",
				[
					"an ending: -ση and -ότητα make a noun feminine, -είο makes it neuter",
					"a kind of word: countries are mostly feminine, languages are neuter plural, meals are neuter",
				],
				"The table lists the common families.",
			],
			table: {
				columns: [
					{ label: "Examples", greek: true },
					{ label: "Family" },
					{ label: "Gender" },
				],
				rows: [
					[markedCell("η Ελλάδα", "nominative", "feminine"), "countries", "mostly feminine; ο Καναδάς is one exception"],
					[markedCell("τα ελληνικά", "nominative", "neuter", true), "languages", "neuter plural"],
					[
						cellWith("το φαρμακείο · το ανθοπωλείο", mark("το φαρμακείο", "nominative", "neuter"), mark("το ανθοπωλείο", "nominative", "neuter")),
						"places in -είο, including shops in -πωλείο",
						"neuter; so is το ψυγείο, the fridge",
					],
					[
						cellWith(
							"η θέση · η απόδειξη · η άποψη",
							mark("η θέση", "nominative", "feminine"),
							mark("η απόδειξη", "nominative", "feminine"),
							mark("η άποψη", "nominative", "feminine"),
						),
						"-ση, -ξη, -ψη",
						"feminine",
					],
					[markedCell("η ταυτότητα", "nominative", "feminine"), "-ότητα", "feminine"],
					[markedCell("το πρωινό", "nominative", "neuter"), "meals", "neuter"],
					[
						cellWith("ο δάσκαλος · η δασκάλα", mark("ο δάσκαλος", "nominative", "masculine"), mark("η δασκάλα", "nominative", "feminine")),
						"most jobs",
						"a form for each",
					],
					["ο / η μπαρίστα", "some jobs", "one form, the article changes"],
					[
						cellWith("ο χειμώνας · η άνοιξη", mark("ο χειμώνας", "nominative", "masculine"), mark("η άνοιξη", "nominative", "feminine")),
						"seasons",
						"mixed, but each follows its ending",
					],
				],
			},
			examples: [
				{
					greek: "Μιλάω ελληνικά.",
					english: "I speak Greek. (no article after μιλάω)",
					marks: [mark("ελληνικά", "accusative", "neuter", true)],
				},
			],
			details: [
				{
					label: "Jobs",
					text: "Many jobs have a masculine and a feminine form. Some keep one form and change only the article.",
					examples: [
						{
							greek: "Η μπαρίστα δουλεύει στο καφέ.",
							english: "The barista works at the café.",
							marks: [mark("Η μπαρίστα", "nominative", "feminine"), mark("στο καφέ", "accusative", "neuter")],
						},
					],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "nouns-gender-from-ending",
					title: "Gender from the word family",
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
				"Many words for people come in a masculine and feminine pair. The feminine ending varies, so learn both:",
				[
					"-ος becomes -α.",
					"-ας becomes -ισσα or -ίδα.",
				],
			],
			table: {
				columns: [
					{ label: "Masculine", greek: true },
					{ label: "Feminine", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("ο θείος", "nominative", "masculine"), markedCell("η θεία", "nominative", "feminine"), "uncle, aunt"],
					[markedCell("ο γείτονας", "nominative", "masculine"), markedCell("η γειτόνισσα", "nominative", "feminine", false), "neighbour"],
					[markedCell("ο Έλληνας", "nominative", "masculine"), markedCell("η Ελληνίδα", "nominative", "feminine", false), "a Greek"],
					[markedCell("ο Κύπριος", "nominative", "masculine"), markedCell("η Κύπρια", "nominative", "feminine"), "a Cypriot"],
				],
			},
			examples: [
				{
					greek: "Ο Νίκος είναι Έλληνας και η Μαρία είναι Ελληνίδα.",
					english: "Nikos is Greek, and so is Maria.",
					marks: [mark("Έλληνας", "nominative", "masculine"), mark("Ελληνίδα", "nominative", "feminine")],
				},
				{
					greek: "Η θεία μου μένει στην Αθήνα.",
					english: "My aunt lives in Athens.",
					marks: [mark("Η θεία", "nominative", "feminine")],
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
					"-άρα makes it big, or more so, and feminine.",
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
					[markedCell("το ψώνιο", "nominative", "neuter"), markedCell("η ψωνάρα", "nominative", "feminine", false), "a real show-off (slang)"],
				],
			},
			examples: [
				{
					greek: "Θα πάρω έναν υπνάκο.",
					english: "I'm going to have a nap.",
					marks: [mark("έναν υπνάκο", "accusative", "masculine")],
				},
				{
					greek: "Είσαι ψωνάρα.",
					english: "You're a real show-off. (playful)",
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
