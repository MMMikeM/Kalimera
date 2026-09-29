import { cellWith, mark, markedCell } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

export const AGREEMENT_GUIDE: Guide = {
	slug: "agreement",
	tone: "olive",
	title: "Words that agree",
	greek: "Συμφωνία",
	description: "Gender and the words that change to match it",
	idea: "Every noun is masculine, feminine or neuter, and the words around it copy that: the article, the adjective, even some numbers. Learn each noun with its article and the rest follows.",
	sections: [
		{
			id: "adjectives",
			title: "Adjectives copy the noun",
			tone: "terracotta",
			rule: "Most adjectives end in -ος, -η, -ο to match a masculine, feminine or neuter noun, and in -οι, -ες, -α in the plural. They copy the noun's gender, not its ending: μεγάλες πόλεις. A few end in -ης, -ης, -ες instead, with one form for masculine and feminine.",
			table: {
				columns: [
					{ label: "Gender" },
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
				],
				rows: [
					["masculine", markedCell("καλός φίλος", "nominative", "masculine", false, "anchor"), markedCell("καλοί φίλοι", "nominative", "masculine", true)],
					["feminine", markedCell("μεγάλη πόλη", "nominative", "feminine"), markedCell("μεγάλες πόλεις", "nominative", "feminine", true)],
					["neuter", markedCell("καλό παιδί", "nominative", "neuter"), markedCell("καλά παιδιά", "nominative", "neuter", true)],
					["-ης masculine", markedCell("θορυβώδης", "nominative", "masculine", false, "anchor"), markedCell("θορυβώδεις", "nominative", "masculine", true)],
					["-ης feminine", markedCell("θορυβώδης", "nominative", "feminine", false, "deviate"), markedCell("θορυβώδεις", "nominative", "feminine", true)],
					["-ης neuter", markedCell("θορυβώδες", "nominative", "neuter"), markedCell("θορυβώδη", "nominative", "neuter", true)],
				],
			},
			examples: [
				{
					greek: "Οι καρέκλες είναι κόκκινες.",
					english: "The chairs are red.",
					marks: [mark("Οι καρέκλες", "nominative", "feminine", true), mark("κόκκινες", "nominative", "feminine", true)],
				},
				{
					greek: "καλοκαιρινές διακοπές",
					english: "summer holidays",
					marks: [mark("καλοκαιρινές διακοπές", "nominative", "feminine", true)],
				},
			],
			drills: ["adjectives-agreement", "nominal-all-adjectives"],
		},
		{
			id: "adjective-jobs",
			title: "Adjectives change with the job",
			tone: "honey",
			rule: "An adjective takes the noun's job as well as its gender. In the -ος, -η, -ο type its ending matches the article's: τον καλό, του καλού, της μεγάλης. It copies the noun it describes, not the nearest word.",
			table: {
				columns: [
					{ label: "Job" },
					{ label: "Phrase", greek: true },
				],
				rows: [
					["Doer", markedCell("ο καλός φίλος", "nominative", "masculine", false, "anchor")],
					["Target", markedCell("τον καλό φίλο", "accusative", "masculine", false, "deviate")],
					["Owner", markedCell("του καλού φίλου", "genitive", "masculine")],
					["Doer", markedCell("η μεγάλη πόλη", "nominative", "feminine", false, "anchor")],
					["Target", markedCell("τη μεγάλη πόλη", "accusative", "feminine")],
					["Owner", markedCell("της μεγάλης πόλης", "genitive", "feminine", false, "deviate")],
				],
			},
			examples: [
				{
					greek: "Έχω έναν καλό φίλο στην Αθήνα.",
					english: "I've got a good friend in Athens.",
					marks: [mark("έναν καλό φίλο", "accusative", "masculine")],
				},
				{
					greek: "το μεγάλο αυτοκίνητο του γιατρού",
					english: "the doctor's big car (μεγάλο goes with αυτοκίνητο)",
					marks: [mark("το μεγάλο αυτοκίνητο", "nominative", "neuter"), mark("του γιατρού", "genitive", "masculine")],
				},
			],
			drills: ["adjectives-agreement-target", "adjectives-agreement-owner"],
		},
		{
			id: "adjective-shapes",
			title: "Adjectives in -α and -ύς",
			tone: "stone",
			rule: "With a vowel before -ος, most adjectives take -α in the feminine instead of -η: ωραία, παλιά, νέα. A few keep -η, such as όγδοη. A small group ends in -ύς, -ιά, -ύ, such as βαρύς and μακρύς. Both change with the job as usual.",
			table: {
				columns: [
					{ label: "Masculine", greek: true },
					{ label: "Feminine", greek: true },
					{ label: "Neuter", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("ωραίος", "nominative", "masculine"), markedCell("ωραία", "nominative", "feminine", false, "deviate"), markedCell("ωραίο", "nominative", "neuter"), "nice"],
					[markedCell("παλιός", "nominative", "masculine"), markedCell("παλιά", "nominative", "feminine", false, "deviate"), markedCell("παλιό", "nominative", "neuter"), "old"],
					[markedCell("νέος", "nominative", "masculine"), markedCell("νέα", "nominative", "feminine", false, "deviate"), markedCell("νέο", "nominative", "neuter"), "new, young"],
					[markedCell("όγδοος", "nominative", "masculine"), markedCell("όγδοη", "nominative", "feminine"), markedCell("όγδοο", "nominative", "neuter"), "eighth: keeps -η"],
					[markedCell("βαρύς", "nominative", "masculine"), markedCell("βαριά", "nominative", "feminine", false, "deviate"), markedCell("βαρύ", "nominative", "neuter"), "heavy"],
					[markedCell("μακρύς", "nominative", "masculine"), markedCell("μακριά", "nominative", "feminine", false, "deviate"), markedCell("μακρύ", "nominative", "neuter"), "long; μακριά also means far"],
				],
			},
			examples: [
				{
					greek: "Βλέπουμε την ωραία θάλασσα από το μπαλκόνι.",
					english: "We can see the lovely sea from the balcony.",
					marks: [mark("την ωραία θάλασσα", "accusative", "feminine")],
				},
				{
					greek: "Μου αρέσουν τα παλιά τραγούδια.",
					english: "I like the old songs. (παλιά is also the neuter plural)",
					marks: [mark("τα παλιά τραγούδια", "nominative", "neuter", true)],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "adjectives-feminine-shapes",
					title: "Feminine -α and -ιά",
					greek: "ωραία · παλιά · βαριά",
					tests: "Shows a masculine adjective such as ωραίος or βαρύς beside a feminine noun; the answer is its feminine form, ωραία or βαριά.",
				},
			],
		},
		{
			id: "colours",
			title: "Colours that never change",
			tone: "ocean",
			rule: "Colours in -ος change like any adjective: η κόκκινη τσάντα. A handful keep one form for every gender, job and number: μπλε, ροζ, γκρι and καφέ.",
			table: {
				columns: [
					{ label: "Masculine", greek: true },
					{ label: "Feminine", greek: true },
					{ label: "Neuter", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("κόκκινος", "nominative", "masculine", false, "anchor"), markedCell("κόκκινη", "nominative", "feminine"), markedCell("κόκκινο", "nominative", "neuter"), "red"],
					[markedCell("μπλε", "nominative", "masculine", false, "deviate"), markedCell("μπλε", "nominative", "feminine", false, "deviate"), markedCell("μπλε", "nominative", "neuter", false, "deviate"), "blue"],
					[markedCell("ροζ", "nominative", "masculine"), markedCell("ροζ", "nominative", "feminine"), markedCell("ροζ", "nominative", "neuter"), "pink"],
					[markedCell("γκρι", "nominative", "masculine"), markedCell("γκρι", "nominative", "feminine"), markedCell("γκρι", "nominative", "neuter"), "grey"],
					[markedCell("καφέ", "nominative", "masculine"), markedCell("καφέ", "nominative", "feminine"), markedCell("καφέ", "nominative", "neuter"), "brown"],
				],
			},
			examples: [
				{
					greek: "η κόκκινη τσάντα",
					english: "the red bag",
					marks: [mark("η κόκκινη τσάντα", "nominative", "feminine")],
				},
				{
					greek: "το μπλε αυτοκίνητο",
					english: "the blue car",
					marks: [mark("το μπλε αυτοκίνητο", "nominative", "neuter")],
				},
				{
					greek: "οι μπλε τσάντες",
					english: "the blue bags",
					marks: [mark("οι μπλε τσάντες", "nominative", "feminine", true)],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "adjectives-colours",
					title: "Colours with a noun",
					greek: "κόκκινες τσάντες · μπλε τσάντες",
					tests: "Shows a colour and a noun, such as κόκκινος with τσάντες; the answer is the colour in the noun's form, which for μπλε, ροζ, γκρι and καφέ is the colour unchanged.",
				},
			],
		},
		{
			id: "adjective-alone",
			title: "An adjective without its noun",
			tone: "olive",
			rule: "Leave the noun out and the article and adjective stand for it, as English says the red one. They keep the gender and job of the thing you mean: το κόκκινο for a dress, την κόκκινη for a bag.",
			examples: [
				{
					greek: "Θέλω το κόκκινο.",
					english: "I want the red one.",
					marks: [mark("το κόκκινο", "accusative", "neuter")],
				},
				{
					greek: "Θέλω την κόκκινη.",
					english: "I want the red one. (a bag, η τσάντα)",
					marks: [mark("την κόκκινη", "accusative", "feminine")],
				},
				{
					greek: "Θέλω το σκούρο μπλε.",
					english: "I want the dark blue one.",
					marks: [mark("το σκούρο μπλε", "accusative", "neuter")],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "adjectives-standing-alone",
					title: "The red one",
					greek: "το κόκκινο · την κόκκινη",
					tests: "Shows a noun such as η τσάντα and an adjective such as κόκκινος after θέλω; the answer is the article and adjective without the noun, as a Target: την κόκκινη.",
				},
			],
		},
		{
			id: "describing-yourself",
			title: "Describing yourself with -μένος",
			tone: "terracotta",
			rule: "Words in -μένος, such as κουρασμένος, describe a state and change like καλός. After είμαι they match whoever is described: κουρασμένος for a man, κουρασμένη for a woman, κουρασμένοι for men or a mixed group, κουρασμένες for women.",
			table: {
				columns: [
					{ label: "A man", greek: true },
					{ label: "A woman", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("κουρασμένος", "nominative", "masculine"), markedCell("κουρασμένη", "nominative", "feminine", false, "deviate"), "tired"],
					[markedCell("κρυωμένος", "nominative", "masculine"), markedCell("κρυωμένη", "nominative", "feminine", false, "deviate"), "having a cold"],
					[markedCell("παντρεμένος", "nominative", "masculine"), markedCell("παντρεμένη", "nominative", "feminine", false, "deviate"), "married"],
					[markedCell("απασχολημένος", "nominative", "masculine"), markedCell("απασχολημένη", "nominative", "feminine", false, "deviate"), "busy"],
				],
			},
			examples: [
				{
					greek: "Είμαι κρυωμένος.",
					english: "I've got a cold. (a man speaking)",
					marks: [mark("κρυωμένος", "nominative", "masculine")],
				},
				{
					greek: "Είναι παντρεμένη.",
					english: "She's married.",
					marks: [mark("παντρεμένη", "nominative", "feminine")],
				},
				{
					greek: "Είμαστε κουρασμένοι.",
					english: "We're tired. (a mixed group takes the masculine)",
					marks: [mark("κουρασμένοι", "nominative", "masculine", true)],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "adjectives-describing-yourself",
					title: "Describing yourself",
					greek: "κουρασμένος · κουρασμένη · κουρασμένοι",
					tests: "Shows a state and who is speaking (a man, a woman, a group); the answer is the -μένος word in that gender and number, such as κουρασμένη.",
				},
			],
		},
		{
			id: "numbers",
			title: "Numbers that agree",
			tone: "olive",
			rule: "Up to a hundred, only one, three and four change with gender. From two hundred the hundreds change too, and so does χίλιοι. Words for order, such as έβδομος, change like any adjective. From two thousand, a thousand is χιλιάδες, a feminine word, so three and four go feminine before it whatever the noun: τέσσερις χιλιάδες ευρώ. A year is read as a whole number, with neuter χίλια and εννιακόσια.",
			table: {
				columns: [
					{ label: "Masculine", greek: true },
					{ label: "Feminine", greek: true },
					{ label: "Neuter", greek: true },
					{ label: "Number" },
				],
				rows: [
					[markedCell("ένας", "nominative", "masculine"), markedCell("μία", "nominative", "feminine"), markedCell("ένα", "nominative", "neuter"), "one"],
					[
						markedCell("τρεις", "nominative", "masculine", true),
						markedCell("τρεις", "nominative", "feminine", true),
						markedCell("τρία", "nominative", "neuter", true, "deviate"),
						"three",
					],
					[
						markedCell("τέσσερις", "nominative", "masculine", true),
						markedCell("τέσσερις", "nominative", "feminine", true),
						markedCell("τέσσερα", "nominative", "neuter", true, "deviate"),
						"four",
					],
					[
						markedCell("έβδομος", "nominative", "masculine"),
						markedCell("έβδομη", "nominative", "feminine"),
						markedCell("έβδομο", "nominative", "neuter"),
						"seventh",
					],
					[
						markedCell("χίλιοι", "nominative", "masculine", true),
						markedCell("χίλιες", "nominative", "feminine", true),
						markedCell("χίλια", "nominative", "neuter", true),
						"a thousand",
					],
				],
			},
			examples: [
				{
					greek: "στις τρεις",
					english: "at three o'clock (hours are feminine)",
					marks: [mark("στις τρεις", "accusative", "feminine", true)],
				},
				{
					greek: "τρία παιδιά",
					english: "three children",
					marks: [mark("τρία παιδιά", "nominative", "neuter", true)],
				},
				{
					greek: "τέσσερις χιλιάδες ευρώ",
					english: "four thousand euros (τέσσερις goes with χιλιάδες)",
					marks: [mark("τέσσερις χιλιάδες", "nominative", "feminine", true)],
				},
				{
					greek: "χίλια εννιακόσια ενενήντα",
					english: "1990",
				},
				{
					greek: "δύο χιλιάδες είκοσι έξι",
					english: "2026",
				},
			],
			drills: ["blocks-numbers"],
		},
		{
			id: "gender-endings",
			title: "Gender from the ending",
			tone: "honey",
			rule: "Most nouns give their gender away in their ending: -ος and the other endings in -ς are mostly masculine, -α and -η mostly feminine, and -ο, -ι and -μα neuter, apart from women's names in -ώ such as η Κλειώ. The exceptions are everyday words, so learn each noun with its article. ο καφές is coffee; το καφέ is the café.",
			table: {
				columns: [
					{ label: "Ending" },
					{ label: "Examples", greek: true },
					{ label: "Gender" },
				],
				rows: [
					["-ος", cellWith("ο φίλος · ο δρόμος", mark("ο φίλος", "nominative", "masculine"), mark("ο δρόμος", "nominative", "masculine")), "mostly masculine"],
					[
						"-ας, -ης, -ές",
						cellWith(
							"ο πατέρας · ο μαθητής · ο καφές",
							mark("ο πατέρας", "nominative", "masculine"),
							mark("ο μαθητής", "nominative", "masculine"),
							mark("ο καφές", "nominative", "masculine"),
						),
						"mostly masculine",
					],
					["-α, -η", cellWith("η μητέρα · η πόλη", mark("η μητέρα", "nominative", "feminine"), mark("η πόλη", "nominative", "feminine")), "mostly feminine"],
					["-ο, -ι", cellWith("το βιβλίο · το παιδί", mark("το βιβλίο", "nominative", "neuter"), mark("το παιδί", "nominative", "neuter")), "neuter"],
					["-μα", cellWith("το όνομα · το χρώμα", mark("το όνομα", "nominative", "neuter"), mark("το χρώμα", "nominative", "neuter")), "neuter"],
					[
						{ text: "-ος, but feminine", weight: "deviate" },
						cellWith("η Κύπρος · η Αίγυπτος", mark("η Κύπρος", "nominative", "feminine"), mark("η Αίγυπτος", "nominative", "feminine")),
						"learn each",
					],
					[
						{ text: "-ος, -ας, -α, but neuter", weight: "deviate" },
						cellWith(
							"το λάθος · το κρέας · το γάλα",
							mark("το λάθος", "nominative", "neuter"),
							mark("το κρέας", "nominative", "neuter"),
							mark("το γάλα", "nominative", "neuter"),
						),
						"learn each",
					],
				],
			},
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
			id: "gender-families",
			title: "Guessing gender from the word",
			tone: "ocean",
			rule: "Some families of words share a gender. Endings such as -ση and -ότητα make a noun feminine, and -είο makes it neuter. Many jobs have a masculine and a feminine form; some keep one form and change only the article.",
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
				{
					greek: "Η μπαρίστα δουλεύει στο καφέ.",
					english: "The barista works at the café.",
					marks: [mark("Η μπαρίστα", "nominative", "feminine"), mark("στο καφέ", "accusative", "neuter")],
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
			rule: "Many words for people come in a masculine and feminine pair. The feminine ending varies, so learn both: -ος becomes -α, and -ας becomes -ισσα or -ίδα.",
			table: {
				columns: [
					{ label: "Masculine", greek: true },
					{ label: "Feminine", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("ο θείος", "nominative", "masculine"), markedCell("η θεία", "nominative", "feminine"), "uncle, aunt"],
					[markedCell("ο γείτονας", "nominative", "masculine"), markedCell("η γειτόνισσα", "nominative", "feminine", false, "deviate"), "neighbour"],
					[markedCell("ο Έλληνας", "nominative", "masculine"), markedCell("η Ελληνίδα", "nominative", "feminine", false, "deviate"), "a Greek"],
					[markedCell("ο Κύπριος", "nominative", "masculine"), markedCell("η Κύπρια", "nominative", "feminine"), "a Cypriot"],
				],
			},
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
			rule: "-άκι makes something small and makes it neuter, whatever it was before: ο ελέφαντας, το ελεφαντάκι. -άκος makes it small but keeps a masculine noun masculine. -άρα makes it big, or more so, and feminine. Not every word with these endings is a small or big form: η κιθάρα and ο δράκος are ordinary words.",
			table: {
				columns: [
					{ label: "Word", greek: true },
					{ label: "Small or big", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("ο ελέφαντας", "nominative", "masculine"), markedCell("το ελεφαντάκι", "nominative", "neuter", false, "deviate"), "a little elephant"],
					[markedCell("το κρεβάτι", "nominative", "neuter"), markedCell("το κρεβατάκι", "nominative", "neuter"), "a cot"],
					[markedCell("ο ύπνος", "nominative", "masculine"), markedCell("ο υπνάκος", "nominative", "masculine"), "a nap"],
					[markedCell("η φωνή", "nominative", "feminine"), markedCell("η φωνάρα", "nominative", "feminine"), "a big, loud voice"],
					[markedCell("το ψώνιο", "nominative", "neuter"), markedCell("η ψωνάρα", "nominative", "feminine", false, "deviate"), "a real show-off (slang)"],
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
		{ label: "Adjectives", href: "/reference/adjectives" },
		{ label: "Nouns", href: "/reference/nouns" },
	],
};
