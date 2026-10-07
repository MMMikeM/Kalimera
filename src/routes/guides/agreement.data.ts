import { mark, markedCell } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

export const AGREEMENT_GUIDE: Guide = {
	slug: "agreement",
	tone: "olive",
	title: "Words that agree",
	greek: "Συμφωνία",
	description: "Adjectives and numbers that change to match the noun",
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
					{ label: "Form" },
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
					[markedCell("ένας", "nominative", "masculine"), markedCell("μία", "nominative", "feminine"), markedCell("ένα", "nominative", "neuter"), "one"],
					[
						markedCell("τρεις", "nominative", "masculine", true),
						markedCell("τρεις", "nominative", "feminine", true),
						markedCell("τρία", "nominative", "neuter", true, 0),
						"three",
					],
					[
						markedCell("τέσσερις", "nominative", "masculine", true),
						markedCell("τέσσερις", "nominative", "feminine", true),
						markedCell("τέσσερα", "nominative", "neuter", true, 0),
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
				notes: [
					"Three and four share one form for masculine and feminine; only the neuter is different.",
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
	],
	reference: [
		{ label: "Adjectives", href: "/reference/adjectives" },
		{ label: "Nouns", href: "/reference/nouns" },
	],
};
