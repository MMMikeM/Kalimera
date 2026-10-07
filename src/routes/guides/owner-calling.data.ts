import { cellWith, mark, markedCell } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

export const OWNER_CALLING_GUIDE: Guide = {
	slug: "owner-calling",
	tone: "navy",
	title: "The Owner and calling forms",
	greek: "Γενική και κλητική",
	description: "The Owner in every family, and the form for calling someone",
	idea: "Besides its Doer and Target forms, a noun has two more: the Owner, for whose something is, and the calling form, for speaking to someone.",
	sections: [
		{
			id: "owner",
			title: "The Owner in every family",
			rule: [
				"The Owner is the form a noun takes when it is who something belongs to, like _of_ or _'s_ in English. Its ending depends on the noun's gender and ending:",
				[
					"Masculines in -ος and most neuters end in -ου.",
					"Masculines in -ας and -ης drop the -ς.",
					"Feminines add -ς.",
					"In the plural, every noun that changes ends in -ων.",
				],
				"The first column is the plain form (the Doer form), the one in the dictionary.",
			],
			table: {
				columns: [
					{ label: "Plain form", greek: true },
					{ label: "Owner, one", greek: true },
					{ label: "Owner, more than one", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[
						markedCell("ο φίλος", "nominative", "masculine", false),
						markedCell("του φίλου", "genitive", "masculine"),
						markedCell("των φίλων", "genitive", "masculine", true),
						"friend",
					],
					[
						markedCell("ο πατέρας", "nominative", "masculine", false),
						markedCell("του πατέρα", "genitive", "masculine"),
						markedCell("των πατέρων", "genitive", "masculine", true),
						"father",
					],
					[
						markedCell("η γυναίκα", "nominative", "feminine", false),
						markedCell("της γυναίκας", "genitive", "feminine"),
						markedCell("των γυναικών", "genitive", "feminine", true),
						"woman",
					],
					[
						markedCell("η πόλη", "nominative", "feminine", false),
						markedCell("της πόλης", "genitive", "feminine"),
						markedCell("των πόλεων", "genitive", "feminine", true),
						"city",
					],
					[
						markedCell("το παιδί", "nominative", "neuter", false),
						markedCell("του παιδιού", "genitive", "neuter"),
						markedCell("των παιδιών", "genitive", "neuter", true),
						"child",
					],
					[
						markedCell("το όνομα", "nominative", "neuter", false),
						markedCell("του ονόματος", "genitive", "neuter", false, 0),
						markedCell("των ονομάτων", "genitive", "neuter", true),
						"name",
					],
					[
						markedCell("το λάθος", "nominative", "neuter", false),
						markedCell("του λάθους", "genitive", "neuter", false, 1),
						markedCell("των λαθών", "genitive", "neuter", true),
						"mistake",
					],
				],
				notes: ["Neuters in -μα add -τ- and take -ος.", "Neuters in -ος take -ους."],
			},
			examples: [
				{
					greek: "Ξέρεις το όνομα της γυναίκας;",
					english: "Do you know the woman's name? (γυναίκα adds -ς)",
					marks: [mark("το όνομα", "accusative", "neuter"), mark("της γυναίκας", "genitive", "feminine")],
				},
				{
					greek: "Το αυτοκίνητο του πατέρα μου είναι παλιό.",
					english: "My father's car is old. (πατέρας drops its -ς)",
					marks: [
						mark("Το αυτοκίνητο", "nominative", "neuter"),
						mark("του πατέρα", "genitive", "masculine"),
						mark("μου", "genitive"),
					],
				},
				{
					greek: "Τα παιχνίδια των παιδιών είναι παντού.",
					english: "The children's toys are everywhere. (-ων for more than one)",
					marks: [mark("Τα παιχνίδια", "nominative", "neuter", true), mark("των παιδιών", "genitive", "neuter", true)],
				},
			],
			details: [
				{
					label: "When the stress moves",
					text: "When a noun in -ος or -ο is stressed three syllables from the end, the stress usually moves one syllable towards the end: ο οδοντίατρος, του οδοντιάτρου.",
				},
			],
			confuse: {
				text: "Who does what sets the Owner beside the Doer and Target forms, and shows where it goes in the sentence.",
				section: "roles/owner",
			},
			drills: ["nominal-noun-owner", "nominal-all-nouns"],
		},
		{
			id: "owner-label",
			title: "The Owner as a label",
			rule: [
				"On forms, signs and job titles, a noun in the Owner form often has no article. It then works like the first noun in an English pair such as _eye colour_, but it comes second: χρώμα ματιών, colour of eyes.",
			],
			table: {
				columns: [
					{ label: "Label", greek: true },
					{ label: "Word for word" },
					{ label: "Meaning" },
				],
				rows: [
					[cellWith("βοηθός οδοντιάτρου", mark("οδοντιάτρου", "genitive")), "assistant of dentist", "dental assistant"],
					[cellWith("τόπος κατοικίας", mark("κατοικίας", "genitive")), "place of living", "place of residence"],
					[cellWith("ημερομηνία γέννησης", mark("γέννησης", "genitive")), "date of birth", "date of birth"],
					[cellWith("χρώμα ματιών", mark("ματιών", "genitive", undefined, true)), "colour of eyes", "eye colour"],
					[cellWith("καταστήματα ρούχων", mark("ρούχων", "genitive", undefined, true)), "shops of clothes", "clothes shops"],
				],
			},
			examples: [
				{
					greek: "Δουλεύω ως βοηθός οδοντιάτρου.",
					english: "I work as a dental assistant.",
					marks: [mark("οδοντιάτρου", "genitive")],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "nouns-owner-label",
					title: "The Owner as a label",
					greek: "τόπος κατοικίας · χρώμα ματιών · καταστήματα ρούχων",
					tests: "A card shows a label with its second noun in the dictionary form, and the Owner form with no article counts as right.",
				},
			],
		},
		{
			id: "calling",
			title: "Calling someone",
			rule: [
				"To call someone by name or title, drop the article.",
				[
					"For one person, most nouns use the Target form, the one for who or what the action is done to: τον Γιάννη gives Γιάννη.",
					"For more than one, use the plain form (the Doer form), the one in the dictionary.",
				],
			],
			table: {
				columns: [
					{ label: "Plain form", greek: true },
					{ label: "Calling form", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("ο Γιάννης", "nominative", "masculine"), markedCell("Γιάννη!", "vocative", "masculine"), "Yannis"],
					[markedCell("ο πατέρας", "nominative", "masculine"), markedCell("πατέρα!", "vocative", "masculine"), "father"],
					[markedCell("ο φίλος", "nominative", "masculine"), markedCell("φίλε!", "vocative", "masculine", false, 0), "friend"],
					[markedCell("ο κύριος", "nominative", "masculine"), markedCell("κύριε!", "vocative", "masculine", false, 0), "sir"],
					[markedCell("οι φίλοι", "nominative", "masculine", true), markedCell("φίλοι!", "vocative", "masculine", true), "friends"],
					[markedCell("τα παιδιά", "nominative", "neuter", true), markedCell("παιδιά!", "vocative", "neuter", true), "children"],
				],
				notes: ["Masculines in -ος usually end in -ε, not the Target's -ο."],
			},
			examples: [
				{
					greek: "Γεια σου, Γιάννη!",
					english: "Hi, Yannis!",
					marks: [mark("Γιάννη", "vocative", "masculine")],
				},
				{
					greek: "Τι κάνεις, φίλε;",
					english: "How are you doing, mate? (not φίλο)",
					marks: [mark("φίλε", "vocative", "masculine")],
				},
				{
					greek: "Παιδιά, ελάτε να φάμε!",
					english: "Kids, come and eat!",
					marks: [mark("Παιδιά", "vocative", "neuter", true)],
				},
			],
			details: [
				{
					label: "Short names in -ος",
					text: "Short first names in -ος keep the Target's -ο: Γιώργο, Νίκο.",
					examples: [
						{
							greek: "Έλα, Νίκο!",
							english: "Come on, Nikos!",
							marks: [mark("Νίκο", "vocative", "masculine")],
						},
					],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "nouns-calling",
					title: "Calling someone",
					greek: "Γιάννη! · πατέρα! · φίλε!",
					tests: "A card shows a noun in its plain form with its article, and the calling form with no article counts as right.",
				},
			],
		},
	],
	reference: [
		{ label: "Every noun pattern", href: "/reference/nouns" },
	],
};
