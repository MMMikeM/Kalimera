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
			rule: [
				"An adjective is a describing word, such as καλός (good) or μεγάλος (big). Every noun is masculine, feminine or neuter, and its adjective changes its ending to match.",
				"Most adjectives end in -ος, -η, -ο for one, and -οι, -ες, -α for more than one.",
				"They copy the noun's gender, not its ending. A feminine noun in -εις still takes -ες, and a masculine noun in -ές still takes -ος.",
			],
			table: {
				columns: [
					{ label: "Gender" },
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
				],
				rows: [
					["masculine", markedCell("καλός φίλος", "nominative", "masculine", false), markedCell("καλοί φίλοι", "nominative", "masculine", true)],
					["feminine", markedCell("μεγάλη πόλη", "nominative", "feminine"), markedCell("μεγάλες πόλεις", "nominative", "feminine", true)],
					["neuter", markedCell("καλό παιδί", "nominative", "neuter"), markedCell("καλά παιδιά", "nominative", "neuter", true)],
					["-ης masculine", markedCell("θορυβώδης", "nominative", "masculine", false), markedCell("θορυβώδεις", "nominative", "masculine", true)],
					["-ης feminine", markedCell("θορυβώδης", "nominative", "feminine", false), markedCell("θορυβώδεις", "nominative", "feminine", true)],
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
					greek: "Ο καφές είναι ζεστός.",
					english: "The coffee is hot. (καφές ends in -ές; ζεστός still takes -ός)",
					marks: [mark("Ο καφές", "nominative", "masculine"), mark("ζεστός", "nominative", "masculine")],
				},
				{
					greek: "Οι καλοκαιρινές διακοπές τελειώνουν αύριο.",
					english: "The summer holidays end tomorrow.",
					marks: [mark("Οι καλοκαιρινές διακοπές", "nominative", "feminine", true)],
				},
			],
			details: [
				{
					label: "Adjectives in -ης",
					text: "A few adjectives, such as θορυβώδης (noisy), end in -ης, -ης, -ες instead, with one form for masculine and feminine. The last three rows of the table show them.",
				},
			],
			drills: ["adjectives-agreement", "nominal-all-adjectives"],
		},
		{
			id: "adjective-jobs",
			title: "Adjectives change with the job",
			tone: "honey",
			rule: [
				"An adjective takes its noun's job as well as its gender. A noun in a sentence does one of three jobs:",
				[
					"The Doer _does_ the action. Its form is the plain one you find in the dictionary.",
					"The Target is who or what the action is done to.",
					"The Owner is who something belongs to.",
				],
				"For the Target and the Owner, the article and the noun's ending change, and the adjective changes with them. In the -ος, -η, -ο type, the adjective's ending matches the article's.",
			],
			table: {
				columns: [
					{ label: "Job" },
					{ label: "Phrase", greek: true },
				],
				rows: [
					["Doer", markedCell("ο καλός φίλος", "nominative", "masculine", false)],
					["Target", markedCell("τον καλό φίλο", "accusative", "masculine", false)],
					["Owner", markedCell("του καλού φίλου", "genitive", "masculine")],
					["Doer", markedCell("η μεγάλη πόλη", "nominative", "feminine", false)],
					["Target", markedCell("τη μεγάλη πόλη", "accusative", "feminine")],
					["Owner", markedCell("της μεγάλης πόλης", "genitive", "feminine", false)],
				],
			},
			examples: [
				{
					greek: "Έχω έναν καλό φίλο στην Αθήνα.",
					english: "I've got a good friend in Athens.",
					marks: [mark("έναν καλό φίλο", "accusative", "masculine")],
				},
			],
			details: [
				{
					label: "The noun it describes, not the nearest",
					text: "An adjective copies the noun it describes, not the nearest word.",
					examples: [
						{
							greek: "Το αυτοκίνητο του γιατρού είναι μεγάλο.",
							english: "The doctor's car is big. (μεγάλο goes with αυτοκίνητο, not γιατρού)",
							marks: [mark("Το αυτοκίνητο", "nominative", "neuter"), mark("του γιατρού", "genitive", "masculine"), mark("μεγάλο", "nominative", "neuter")],
						},
					],
				},
			],
			drills: ["adjectives-agreement-target", "adjectives-agreement-owner"],
		},
		{
			id: "adjective-shapes",
			title: "Adjectives in -α and -ύς",
			tone: "stone",
			rule: [
				"Most adjectives end in -ος, -η, -ο for masculine, feminine and neuter: καλός, καλή, καλό. Two groups take -α in the feminine instead of -η:",
				[
					"With a vowel before -ος, most end in -ος, -α, -ο.",
					"A small group ends in -ύς, -ιά, -ύ.",
				],
				"Both groups change with the noun's job in the sentence, like any adjective. The example shows ωραία as the Target, what the action is done to.",
			],
			table: {
				columns: [
					{ label: "Masculine", greek: true },
					{ label: "Feminine", greek: true },
					{ label: "Neuter", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("ωραίος", "nominative", "masculine"), markedCell("ωραία", "nominative", "feminine", false), markedCell("ωραίο", "nominative", "neuter"), "nice"],
					[markedCell("παλιός", "nominative", "masculine"), markedCell("παλιά", "nominative", "feminine", false), markedCell("παλιό", "nominative", "neuter"), "old"],
					[markedCell("νέος", "nominative", "masculine"), markedCell("νέα", "nominative", "feminine", false), markedCell("νέο", "nominative", "neuter"), "new, young"],
					[markedCell("όγδοος", "nominative", "masculine"), markedCell("όγδοη", "nominative", "feminine"), markedCell("όγδοο", "nominative", "neuter"), "eighth: keeps -η"],
					[markedCell("βαρύς", "nominative", "masculine"), markedCell("βαριά", "nominative", "feminine", false), markedCell("βαρύ", "nominative", "neuter"), "heavy"],
					[markedCell("μακρύς", "nominative", "masculine"), markedCell("μακριά", "nominative", "feminine", false), markedCell("μακρύ", "nominative", "neuter"), "long; μακριά also means far"],
				],
			},
			examples: [
				{
					greek: "Βλέπουμε την ωραία θάλασσα από το μπαλκόνι.",
					english: "We can see the lovely sea from the balcony.",
					marks: [mark("την ωραία θάλασσα", "accusative", "feminine")],
				},
			],
			details: [
				{
					label: "Some keep -η",
					text: "A few adjectives with a vowel before -ος keep -η, such as όγδοη (eighth).",
				},
				{
					label: "The same as the neuter plural",
					text: "The feminine in -α looks the same as the neuter plural, which also ends in -α. The article and the noun show which it is.",
					examples: [
						{
							greek: "Μένουμε στην παλιά πόλη.",
							english: "We're staying in the old town. (feminine, one)",
							marks: [mark("στην παλιά πόλη", "accusative", "feminine")],
						},
						{
							greek: "Μου αρέσουν τα παλιά τραγούδια.",
							english: "I like the old songs. (neuter, more than one)",
							marks: [mark("τα παλιά τραγούδια", "nominative", "neuter", true)],
						},
					],
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
			rule: [
				"Colours in -ος change like any adjective to match their noun. A handful, the last four in the table, never change. They keep one form whatever the noun:",
				[
					"masculine, feminine or neuter",
					"one or more than one",
					"whatever its job in the sentence",
				],
			],
			table: {
				columns: [
					{ label: "Masculine", greek: true },
					{ label: "Feminine", greek: true },
					{ label: "Neuter", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("κόκκινος", "nominative", "masculine", false), markedCell("κόκκινη", "nominative", "feminine"), markedCell("κόκκινο", "nominative", "neuter"), "red"],
					[markedCell("μπλε", "nominative", "masculine", false), markedCell("μπλε", "nominative", "feminine", false), markedCell("μπλε", "nominative", "neuter", false), "blue"],
					[markedCell("ροζ", "nominative", "masculine"), markedCell("ροζ", "nominative", "feminine"), markedCell("ροζ", "nominative", "neuter"), "pink"],
					[markedCell("γκρι", "nominative", "masculine"), markedCell("γκρι", "nominative", "feminine"), markedCell("γκρι", "nominative", "neuter"), "grey"],
					[markedCell("καφέ", "nominative", "masculine"), markedCell("καφέ", "nominative", "feminine"), markedCell("καφέ", "nominative", "neuter"), "brown"],
				],
			},
			examples: [
				{
					greek: "Μου αρέσουν οι κόκκινες τσάντες.",
					english: "I like the red bags.",
					marks: [mark("οι κόκκινες τσάντες", "nominative", "feminine", true)],
				},
				{
					greek: "Μου αρέσουν οι μπλε τσάντες.",
					english: "I like the blue bags. (μπλε doesn't change)",
					marks: [mark("οι μπλε τσάντες", "nominative", "feminine", true)],
				},
				{
					greek: "Ψάχνω τον μπλε φάκελο.",
					english: "I'm looking for the blue folder.",
					marks: [mark("τον μπλε φάκελο", "accusative", "masculine")],
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
			rule: [
				"Leave the noun out and the article and adjective stand for it, as English says _the red one_. They keep the gender and job of the thing you mean.",
				"After θέλω (I want), the thing wanted is the Target, what the action is done to, so they take the Target form.",
			],
			examples: [
				{
					greek: "Θέλω το κόκκινο.",
					english: "I want the red one. (a dress, το φόρεμα)",
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
			rule: [
				"Words in -μένος describe a state, such as tired or married, and change like any adjective in -ος, -η, -ο. After είμαι (be) they match whoever is described:",
				[
					"-ος for a man",
					"-η for a woman",
					"-οι for men, or a mixed group",
					"-ες for women",
				],
			],
			table: {
				columns: [
					{ label: "A man", greek: true },
					{ label: "A woman", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("κουρασμένος", "nominative", "masculine"), markedCell("κουρασμένη", "nominative", "feminine", false), "tired"],
					[markedCell("κρυωμένος", "nominative", "masculine"), markedCell("κρυωμένη", "nominative", "feminine", false), "having a cold"],
					[markedCell("παντρεμένος", "nominative", "masculine"), markedCell("παντρεμένη", "nominative", "feminine", false), "married"],
					[markedCell("απασχολημένος", "nominative", "masculine"), markedCell("απασχολημένη", "nominative", "feminine", false), "busy"],
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
				{
					greek: "Είμαστε κουρασμένες.",
					english: "We're tired. (a group of women)",
					marks: [mark("κουρασμένες", "nominative", "feminine", true)],
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
			rule: [
				"Every noun is masculine, feminine or neuter, and a few numbers change to match it. Up to a hundred, only one, three and four change with gender; the rest keep one form.",
				[
					"One has a form for each gender.",
					"Three and four share one form for masculine and feminine, and have another for neuter.",
				],
			],
			table: {
				columns: [
					{ label: "Masculine", greek: true },
					{ label: "Feminine", greek: true },
					{ label: "Neuter", greek: true },
					{ label: "Number" },
				],
				rows: [
					[markedCell("ένας", "nominative", "masculine", undefined, "anchor"), markedCell("μία", "nominative", "feminine", undefined, "anchor"), markedCell("ένα", "nominative", "neuter", undefined, "anchor"), "one"],
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
						markedCell("διακόσιοι", "nominative", "masculine", true),
						markedCell("διακόσιες", "nominative", "feminine", true),
						markedCell("διακόσια", "nominative", "neuter", true),
						"two hundred",
					],
					[
						markedCell("χίλιοι", "nominative", "masculine", true),
						markedCell("χίλιες", "nominative", "feminine", true),
						markedCell("χίλια", "nominative", "neuter", true),
						"a thousand",
					],
					[
						markedCell("έβδομος", "nominative", "masculine"),
						markedCell("έβδομη", "nominative", "feminine"),
						markedCell("έβδομο", "nominative", "neuter"),
						"seventh",
					],
				],
			},
			examples: [
				{
					greek: "Το μάθημα αρχίζει στις τρεις.",
					english: "The lesson starts at three. (hours are feminine)",
					marks: [mark("στις τρεις", "accusative", "feminine", true)],
				},
				{
					greek: "Έχουν τρία παιδιά.",
					english: "They've got three children.",
					marks: [mark("τρία παιδιά", "accusative", "neuter", true)],
				},
			],
			details: [
				{
					label: "Hundreds and a thousand",
					text: "From two hundred the hundreds change with gender too, and so does a thousand. The table shows both.",
				},
				{
					label: "Words for order",
					text: "Words for order, such as seventh, change like any adjective in -ος, -η, -ο.",
				},
				{
					label: "From two thousand",
					text: "From two thousand, a thousand is χιλιάδες, a feminine word. So three and four take the feminine before it, whatever the noun.",
					examples: [
						{
							greek: "Το αυτοκίνητο κοστίζει τέσσερις χιλιάδες ευρώ.",
							english: "The car costs four thousand euros. (τέσσερις goes with χιλιάδες)",
							marks: [mark("τέσσερις χιλιάδες", "accusative", "feminine", true)],
						},
					],
				},
				{
					label: "Years",
					text: "A year is read as a whole number, with the neuter χίλια and εννιακόσια.",
					examples: [
						{
							greek: "Γεννήθηκα το χίλια εννιακόσια ενενήντα.",
							english: "I was born in 1990.",
						},
						{
							greek: "Ήρθα στην Ελλάδα το δύο χιλιάδες είκοσι έξι.",
							english: "I came to Greece in 2026.",
						},
					],
				},
			],
			drills: ["blocks-numbers"],
		},
		{
			id: "gender-endings",
			title: "Gender from the ending",
			tone: "honey",
			rule: [
				"Every Greek noun is masculine, feminine or neuter, and its article shows which: ο, η or το. Most nouns also give their gender away in their ending:",
				[
					"-ος and the other endings in -ς: mostly masculine",
					"-α and -η: mostly feminine",
					"-ο, -ι and -μα: neuter",
				],
				"The exceptions, in the last two rows, are everyday words, so learn each noun with its article.",
			],
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
						{ text: "-ος, but feminine" },
						cellWith("η Κύπρος · η Αίγυπτος", mark("η Κύπρος", "nominative", "feminine"), mark("η Αίγυπτος", "nominative", "feminine")),
						"learn each",
					],
					[
						{ text: "-ος, -ας, -α, but neuter" },
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
			examples: [
				{
					greek: "Το κρέας είναι νόστιμο.",
					english: "The meat is tasty. (κρέας ends in -ας, but it is neuter)",
					marks: [mark("Το κρέας", "nominative", "neuter"), mark("νόστιμο", "nominative", "neuter")],
				},
				{
					greek: "Η Κύπρος είναι πολύ όμορφη.",
					english: "Cyprus is very beautiful. (Κύπρος ends in -ος, but it is feminine)",
					marks: [mark("Η Κύπρος", "nominative", "feminine"), mark("όμορφη", "nominative", "feminine")],
				},
			],
			details: [
				{
					label: "Women's names in -ώ",
					text: "The -ο, -ι and -μα endings are neuter, apart from women's names in -ώ such as η Κλειώ, which are feminine.",
				},
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
		{ label: "Adjectives", href: "/reference/adjectives" },
		{ label: "Nouns", href: "/reference/nouns" },
	],
};
