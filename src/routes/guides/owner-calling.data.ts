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
				"The Owner is the form a noun takes when it is who something belongs to, like _of_ or _'s_ in English. Its ending depends on the noun's gender and ending.",
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
					{ label: "Owner", greek: true },
					{ label: "Owners", greek: true },
				],
				rows: [
					[
						markedCell("ο φίλος", "nominative", "masculine", false),
						markedCell("του φίλου", "genitive", "masculine"),
						markedCell("των φίλων", "genitive", "masculine", true),
					],
					[
						markedCell("ο πατέρας", "nominative", "masculine", false),
						markedCell("του πατέρα", "genitive", "masculine"),
						markedCell("των πατέρων", "genitive", "masculine", true),
					],
					[
						markedCell("η γυναίκα", "nominative", "feminine", false),
						markedCell("της γυναίκας", "genitive", "feminine"),
						markedCell("των γυναικών", "genitive", "feminine", true),
					],
					[
						markedCell("η πόλη", "nominative", "feminine", false),
						markedCell("της πόλης", "genitive", "feminine"),
						markedCell("των πόλεων", "genitive", "feminine", true),
					],
					[
						markedCell("το παιδί", "nominative", "neuter", false),
						markedCell("του παιδιού", "genitive", "neuter"),
						markedCell("των παιδιών", "genitive", "neuter", true),
					],
					[
						markedCell("το όνομα", "nominative", "neuter", false),
						markedCell("του ονόματος", "genitive", "neuter", false),
						markedCell("των ονομάτων", "genitive", "neuter", true),
					],
					[
						markedCell("το λάθος", "nominative", "neuter", false),
						markedCell("του λάθους", "genitive", "neuter", false),
						markedCell("των λαθών", "genitive", "neuter", true),
					],
				],
			},
			examples: [
				{
					greek: "Η μητέρα της Μαρίας είναι δασκάλα.",
					english: "Maria's mother is a teacher.",
					marks: [mark("Η μητέρα", "nominative", "feminine"), mark("της Μαρίας", "genitive", "feminine")],
				},
				{
					greek: "Τα παιχνίδια των παιδιών είναι παντού.",
					english: "The children's toys are everywhere.",
					marks: [mark("Τα παιχνίδια", "nominative", "neuter", true), mark("των παιδιών", "genitive", "neuter", true)],
				},
			],
			details: [
				{
					label: "Neuters in -μα and -ος",
					text: "Neuters in -μα take -ματος, and neuters in -ος take -ους.",
				},
				{
					label: "When the stress moves",
					text: "In some nouns the stress moves one syllable towards the end: ο οδοντίατρος, του οδοντιάτρου.",
				},
			],
			confuse: {
				text: "The Owner goes after the thing it owns: το σπίτι του Γιάννη.",
				section: "roles/owner",
			},
			drills: ["nominal-noun-owner", "nominal-all-nouns"],
		},
		{
			id: "owner-label",
			title: "The Owner as a label",
			rule: [
				"The Owner is the form a noun takes when it is who something belongs to: του οδοντιάτρου, the dentist's.",
				"On forms, signs and job titles, the Owner often drops its article. It then works like an English noun used as a label.",
			],
			table: {
				columns: [
					{ label: "Label", greek: true },
					{ label: "Meaning" },
					{ label: "Word for word" },
				],
				rows: [
					[cellWith("βοηθός οδοντιάτρου", mark("οδοντιάτρου", "genitive")), "dental assistant", "assistant of dentist"],
					[cellWith("τόπος κατοικίας", mark("κατοικίας", "genitive", "feminine")), "place of residence", "place of living"],
					[cellWith("ημερομηνία γέννησης", mark("γέννησης", "genitive", "feminine")), "date of birth", "date of birth"],
					[cellWith("χρώμα ματιών", mark("ματιών", "genitive", "neuter", true)), "eye colour", "colour of eyes"],
					[cellWith("καταστήματα ρούχων", mark("ρούχων", "genitive", "neuter", true)), "clothes shops", "shops of clothes"],
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
					"For one person, use the Target form, the one for who or what the action is done to: τον Γιάννη gives Γιάννη.",
					"For more than one, use the plain form (the Doer form), the one in the dictionary.",
				],
				"Masculines in -ος mostly differ, as the table shows.",
			],
			table: {
				columns: [
					{ label: "Plain form", greek: true },
					{ label: "Calling", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("ο Γιάννης", "nominative", "masculine"), markedCell("Γιάννη!", "vocative", "masculine"), "Yannis"],
					[markedCell("ο πατέρας", "nominative", "masculine"), markedCell("πατέρα!", "vocative", "masculine"), "father"],
					[markedCell("ο φίλος", "nominative", "masculine"), markedCell("φίλε!", "vocative", "masculine", false), "friend"],
					[markedCell("ο κύριος", "nominative", "masculine"), markedCell("κύριε!", "vocative", "masculine", false), "sir"],
					[markedCell("οι φίλοι", "nominative", "masculine", true), markedCell("φίλοι!", "vocative", "masculine", true), "friends"],
					[markedCell("τα παιδιά", "nominative", "neuter", true), markedCell("παιδιά!", "vocative", "neuter", true), "children"],
				],
			},
			examples: [
				{
					greek: "Γεια σου, Γιάννη!",
					english: "Hi, Yannis!",
					marks: [mark("Γιάννη", "vocative", "masculine")],
				},
				{
					greek: "Παιδιά, ελάτε να φάμε!",
					english: "Kids, come and eat!",
					marks: [mark("Παιδιά", "vocative", "neuter", true)],
				},
			],
			details: [
				{
					label: "Masculines in -ος",
					text: "Masculines in -ος usually end in -ε instead of the Target's -ο. Short first names in -ος keep -ο: Γιώργο, Νίκο.",
					examples: [
						{
							greek: "Τι κάνεις, φίλε;",
							english: "How are you doing, mate?",
							marks: [mark("φίλε", "vocative", "masculine")],
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
