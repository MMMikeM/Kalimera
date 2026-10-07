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
				"They copy the noun's gender, not its ending. πόλεις ends in -εις, but μεγάλες still takes -ες. καφές ends in -ές, but ζεστός still takes -ος.",
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
				],
			},
			examples: [
				{
					greek: "Οι πόλεις εδώ είναι μεγάλες.",
					english: "The cities here are big. (πόλεις ends in -εις; μεγάλες still takes -ες)",
					marks: [mark("Οι πόλεις", "nominative", "feminine", true), mark("μεγάλες", "nominative", "feminine", true)],
				},
				{
					greek: "Ο καφές είναι ζεστός.",
					english: "The coffee is hot. (καφές ends in -ές; ζεστός still takes -ός)",
					marks: [mark("Ο καφές", "nominative", "masculine"), mark("ζεστός", "nominative", "masculine")],
				},
				{
					greek: "Οι φίλοι μου είναι καλοί.",
					english: "My friends are kind.",
					marks: [mark("Οι φίλοι", "nominative", "masculine", true), mark("μου", "genitive"), mark("καλοί", "nominative", "masculine", true)],
				},
			],
			details: [
				{
					label: "Adjectives in -ης",
					text: "A few adjectives, such as θορυβώδης (noisy), end in -ης, -ης, -ες instead, with one form for masculine and feminine.",
					table: {
						columns: [
							{ label: "Gender" },
							{ label: "One", greek: true },
							{ label: "More than one", greek: true },
						],
						rows: [
							["masculine", markedCell("θορυβώδης", "nominative", "masculine", false), markedCell("θορυβώδεις", "nominative", "masculine", true)],
							["feminine", markedCell("θορυβώδης", "nominative", "feminine", false), markedCell("θορυβώδεις", "nominative", "feminine", true)],
							["neuter", markedCell("θορυβώδες", "nominative", "neuter"), markedCell("θορυβώδη", "nominative", "neuter", true)],
						],
					},
					examples: [
						{
							greek: "Οι πόλεις είναι θορυβώδεις.",
							english: "The cities are noisy.",
							marks: [mark("Οι πόλεις", "nominative", "feminine", true), mark("θορυβώδεις", "nominative", "feminine", true)],
						},
					],
				},
			],
			drills: ["adjectives-agreement", "nominal-all-adjectives"],
		},
		{
			id: "adjective-jobs",
			title: "Adjectives change with the job",
			tone: "honey",
			rule: [
				"An adjective takes its noun's form as well as its gender: the Doer, Target or Owner form. Who does what sets out what each form is for.",
				"The adjective changes its ending along with the noun's: τον καλό φίλο, της μεγάλης πόλης. Where the noun keeps its ending, as in τη μεγάλη πόλη, the adjective does too.",
			],
			table: {
				columns: [
					{ label: "Form" },
					{ label: "Masculine", greek: true },
					{ label: "Feminine", greek: true },
					{ label: "Neuter", greek: true },
				],
				rows: [
					[
						"Doer",
						markedCell("ο καλός φίλος", "nominative", "masculine", false),
						markedCell("η μεγάλη πόλη", "nominative", "feminine", false),
						markedCell("το καλό παιδί", "nominative", "neuter", false),
					],
					[
						"Target",
						markedCell("τον καλό φίλο", "accusative", "masculine", false),
						markedCell("τη μεγάλη πόλη", "accusative", "feminine", false),
						markedCell("το καλό παιδί", "accusative", "neuter", false),
					],
					[
						"Owner",
						markedCell("του καλού φίλου", "genitive", "masculine", false),
						markedCell("της μεγάλης πόλης", "genitive", "feminine", false),
						markedCell("του καλού παιδιού", "genitive", "neuter", false),
					],
				],
			},
			examples: [
				{
					greek: "Έχω έναν καλό φίλο στην Αθήνα.",
					english: "I've got a good friend in Athens. (ένας καλός φίλος becomes έναν καλό φίλο)",
					marks: [mark("έναν καλό φίλο", "accusative", "masculine")],
				},
				{
					greek: "Μένω στο κέντρο της μεγάλης πόλης.",
					english: "I live in the centre of the big city. (μεγάλη becomes μεγάλης, like πόλη)",
					marks: [mark("της μεγάλης πόλης", "genitive", "feminine")],
				},
			],
			details: [
				{
					label: "The noun it describes, not the nearest",
					text: "An adjective copies the noun it describes, not the nearest word.",
					examples: [
						{
							greek: "Το σπίτι του φίλου μου είναι μεγάλο.",
							english: "My friend's house is big. (μεγάλο goes with σπίτι, not φίλου)",
							marks: [
								mark("Το σπίτι", "nominative", "neuter"),
								mark("του φίλου", "genitive", "masculine"),
								mark("μου", "genitive"),
								mark("μεγάλο", "nominative", "neuter"),
							],
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
				"Two groups of adjectives take -α in the feminine instead of -η:",
				[
					"Most with a vowel before -ος end in -ος, -α, -ο: ωραίος, ωραία, ωραίο.",
					"A small group ends in -ύς, -ιά, -ύ: βαρύς, βαριά, βαρύ.",
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
					[markedCell("ωραίος", "nominative", "masculine"), markedCell("ωραία", "nominative", "feminine", false), markedCell("ωραίο", "nominative", "neuter"), "nice"],
					[markedCell("παλιός", "nominative", "masculine"), markedCell("παλιά", "nominative", "feminine", false), markedCell("παλιό", "nominative", "neuter"), "old"],
					[markedCell("νέος", "nominative", "masculine"), markedCell("νέα", "nominative", "feminine", false), markedCell("νέο", "nominative", "neuter"), "new, young"],
					[markedCell("όγδοος", "nominative", "masculine"), markedCell("όγδοη", "nominative", "feminine", false, 0), markedCell("όγδοο", "nominative", "neuter"), "eighth"],
					[markedCell("βαρύς", "nominative", "masculine"), markedCell("βαριά", "nominative", "feminine", false), markedCell("βαρύ", "nominative", "neuter"), "heavy"],
					[markedCell("μακρύς", "nominative", "masculine"), markedCell("μακριά", "nominative", "feminine", false), markedCell("μακρύ", "nominative", "neuter"), "long (μακριά also means far)"],
				],
				notes: ["όγδοος keeps -η, though a vowel comes before its -ος."],
			},
			examples: [
				{
					greek: "Η παλιά πόλη είναι πολύ ωραία.",
					english: "The old town is very nice. (παλιά and ωραία, not -η)",
					marks: [mark("Η παλιά πόλη", "nominative", "feminine"), mark("ωραία", "nominative", "feminine")],
				},
				{
					greek: "Η τσάντα μου είναι βαριά.",
					english: "My bag is heavy. (βαρύς becomes βαριά)",
					marks: [mark("Η τσάντα", "nominative", "feminine"), mark("μου", "genitive"), mark("βαριά", "nominative", "feminine")],
				},
			],
			details: [
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
							marks: [mark("Μου", "genitive"), mark("τα παλιά τραγούδια", "nominative", "neuter", true)],
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
				"Most colours end in -ος and change like any adjective: κόκκινος, κόκκινη, κόκκινο. A handful of borrowed colours, such as μπλε, never change. They keep one form whatever the noun:",
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
					greek: "Ψάχνω τον κόκκινο φάκελο.",
					english: "I'm looking for the red folder. (κόκκινος becomes κόκκινο)",
					marks: [mark("τον κόκκινο φάκελο", "accusative", "masculine")],
				},
				{
					greek: "Ψάχνω τον μπλε φάκελο.",
					english: "I'm looking for the blue folder. (μπλε stays μπλε)",
					marks: [mark("τον μπλε φάκελο", "accusative", "masculine")],
				},
				{
					greek: "Οι μπλε φάκελοι είναι στο γραφείο.",
					english: "The blue folders are on the desk. (μπλε for more than one too)",
					marks: [mark("Οι μπλε φάκελοι", "nominative", "masculine", true)],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "adjectives-colours",
					title: "Colours with a noun",
					greek: "τον κόκκινο φάκελο · τον μπλε φάκελο",
					tests: "Shows a colour and a noun, such as κόκκινος with τον φάκελο; the answer is the colour in the noun's form, which for μπλε, ροζ, γκρι and καφέ is the colour unchanged.",
				},
			],
		},
		{
			id: "adjective-alone",
			title: "An adjective without its noun",
			tone: "olive",
			rule: [
				"Leave the noun out and the article and adjective stand for it, as English says _the red one_. They keep the gender and form of the thing you mean.",
				"After θέλω (I want), the thing wanted is the Target, so they take the Target form.",
			],
			examples: [
				{
					greek: "Θέλω τον κόκκινο.",
					english: "I want the red one. (a folder, ο φάκελος: ο κόκκινος becomes τον κόκκινο)",
					marks: [mark("τον κόκκινο", "accusative", "masculine")],
				},
				{
					greek: "Θέλω την κόκκινη.",
					english: "I want the red one. (a bag, η τσάντα)",
					marks: [mark("την κόκκινη", "accusative", "feminine")],
				},
				{
					greek: "Θέλω το κόκκινο.",
					english: "I want the red one. (a dress, το φόρεμα)",
					marks: [mark("το κόκκινο", "accusative", "neuter")],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "adjectives-standing-alone",
					title: "The red one",
					greek: "τον κόκκινο · την κόκκινη · το κόκκινο",
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
				"A few numbers change to match the noun's gender. Up to a hundred, these are one, three and four, and the numbers that end in them, such as είκοσι τρεις and είκοσι τρία. The rest keep one form.",
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
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("ένας", "nominative", "masculine"), markedCell("μία", "nominative", "feminine"), markedCell("ένα", "nominative", "neuter"), "one"],
					[
						markedCell("τρεις", "nominative", "masculine", true),
						markedCell("τρεις", "nominative", "feminine", true),
						markedCell("τρία", "nominative", "neuter", true),
						"three",
					],
					[
						markedCell("τέσσερις", "nominative", "masculine", true),
						markedCell("τέσσερις", "nominative", "feminine", true),
						markedCell("τέσσερα", "nominative", "neuter", true),
						"four",
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
					text: "From two hundred, the hundreds change with gender too, and so does a thousand. A hundred itself, εκατό, never changes.",
					table: {
						columns: [
							{ label: "Masculine", greek: true },
							{ label: "Feminine", greek: true },
							{ label: "Neuter", greek: true },
							{ label: "Meaning" },
						],
						rows: [
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
						],
					},
					examples: [
						{
							greek: "Το εισιτήριο κοστίζει διακόσια ευρώ.",
							english: "The ticket costs two hundred euros. (ευρώ is neuter)",
							marks: [mark("διακόσια ευρώ", "accusative", "neuter", true)],
						},
					],
				},
				{
					label: "Words for order",
					text: "Words for order, such as έβδομος (seventh), change like any adjective in -ος, -η, -ο.",
					examples: [
						{
							greek: "Μένω στον έβδομο όροφο.",
							english: "I live on the seventh floor.",
							marks: [mark("στον έβδομο όροφο", "accusative", "masculine")],
						},
					],
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
					text: "A year is read as one whole number, with το before it.",
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
