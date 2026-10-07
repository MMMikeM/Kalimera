import { mark, markedCell } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

export const NOUNS_GUIDE: Guide = {
	slug: "nouns",
	tone: "ocean",
	title: "Noun families",
	greek: "Ουσιαστικά",
	description: "The forms each family takes, for one and more than one",
	idea: "A noun's ending usually tells you its family, and the family gives you its other forms: its Target and Owner forms, and its plural.",
	sections: [
		{
			id: "families",
			tone: "gender-masculine",
			title: "Masculine nouns: -ος, -ας, -ης",
			rule: [
				"Nouns fall into families by gender and ending. Each family changes the plain form, the one in the dictionary, in its own way. What the forms are for is set out in Who does what.",
				"Masculine nouns end in -ος, -ας or -ης:",
				[
					"-ος changes its ending in every form, and its plural Target form, τους φίλους, differs from its plural Doer form, οι φίλοι",
					"-ας and -ης just drop the -ς for the Target and the Owner of one, and most have a plural in -ες for the Doer and the Target alike",
				],
			],
			table: {
				columns: [
					{ label: "Form" },
					{ label: "-ος", greek: true },
					{ label: "-ας", greek: true },
					{ label: "-ης", greek: true },
				],
				rows: [
					["Doer", markedCell("ο φίλος", "nominative", "masculine", false), markedCell("ο πατέρας", "nominative", "masculine", false), markedCell("ο μαθητής", "nominative", "masculine", false)],
					["Target", markedCell("τον φίλο", "accusative", "masculine", false), markedCell("τον πατέρα", "accusative", "masculine", false), markedCell("τον μαθητή", "accusative", "masculine", false)],
					["Owner", markedCell("του φίλου", "genitive", "masculine", false), markedCell("του πατέρα", "genitive", "masculine", false), markedCell("του μαθητή", "genitive", "masculine", false)],
					["Doers", markedCell("οι φίλοι", "nominative", "masculine", true), markedCell("οι πατέρες", "nominative", "masculine", true), markedCell("οι μαθητές", "nominative", "masculine", true)],
					["Targets", markedCell("τους φίλους", "accusative", "masculine", true), markedCell("τους πατέρες", "accusative", "masculine", true), markedCell("τους μαθητές", "accusative", "masculine", true)],
					["Owners", markedCell("των φίλων", "genitive", "masculine", true), markedCell("των πατέρων", "genitive", "masculine", true), markedCell("των μαθητών", "genitive", "masculine", true)],
				],
			},
			examples: [
				{
					greek: "Περιμένω τους φίλους μου.",
					english: "I'm waiting for my friends. (οι φίλοι becomes τους φίλους)",
					marks: [mark("τους φίλους", "accusative", "masculine", true), mark("μου", "genitive")],
				},
				{
					greek: "Ο πατέρας του μαθητή περιμένει έξω.",
					english: "The pupil's father is waiting outside. (μαθητής drops its -ς for the Owner)",
					marks: [mark("Ο πατέρας", "nominative", "masculine"), mark("του μαθητή", "genitive", "masculine")],
				},
				{
					greek: "Οι πατέρες περιμένουν τους μαθητές.",
					english: "The fathers are waiting for the pupils. (-ες for the Doer and the Target alike)",
					marks: [mark("Οι πατέρες", "nominative", "masculine", true), mark("τους μαθητές", "accusative", "masculine", true)],
				},
			],
			confuse: {
				text: "ο μπαμπάς ends like ο πατέρας, but its plural is οι μπαμπάδες.",
				section: "noun-exceptions/extra-syllable",
			},
			drills: ["nominative-nouns", "nominal-all-nouns"],
		},
		{
			id: "families-a-i",
			tone: "gender-feminine",
			title: "Feminine nouns: -α, -η",
			rule: "A feminine noun in -α or -η changes only its article for the Target: η ζωή, τη ζωή. The Owner of one adds -ς. Most have a plural in -ες, for the Doer and the Target alike.",
			table: {
				columns: [
					{ label: "Form" },
					{ label: "-α", greek: true },
					{ label: "-η", greek: true },
				],
				rows: [
					["Doer", markedCell("η γυναίκα", "nominative", "feminine", false), markedCell("η ζωή", "nominative", "feminine", false)],
					["Target", markedCell("τη γυναίκα", "accusative", "feminine", false), markedCell("τη ζωή", "accusative", "feminine", false)],
					["Owner", markedCell("της γυναίκας", "genitive", "feminine", false), markedCell("της ζωής", "genitive", "feminine", false)],
					["Doers", markedCell("οι γυναίκες", "nominative", "feminine", true), markedCell("οι ζωές", "nominative", "feminine", true)],
					["Targets", markedCell("τις γυναίκες", "accusative", "feminine", true), markedCell("τις ζωές", "accusative", "feminine", true)],
					["Owners", markedCell("των γυναικών", "genitive", "feminine", true), markedCell("των ζωών", "genitive", "feminine", true)],
				],
			},
			examples: [
				{
					greek: "Η γυναίκα αγαπάει τη ζωή.",
					english: "The woman loves life. (η ζωή becomes τη ζωή: only the article changes)",
					marks: [mark("Η γυναίκα", "nominative", "feminine"), mark("τη ζωή", "accusative", "feminine")],
				},
				{
					greek: "Η ζωή της γυναίκας είναι δύσκολη.",
					english: "The woman's life is hard. (γυναίκα adds -ς)",
					marks: [mark("Η ζωή", "nominative", "feminine"), mark("της γυναίκας", "genitive", "feminine")],
				},
			],
			confuse: {
				text: "η πόλη ends like η ζωή, but its plural is οι πόλεις.",
				section: "noun-exceptions/extra-syllable",
			},
			drills: ["nominative-nouns", "nominal-all-nouns"],
		},
		{
			id: "families-o-i",
			tone: "gender-neuter",
			title: "Neuter nouns: -ο, -ι, -μα",
			rule: [
				"A neuter noun has the same Doer and Target form, for one and for more than one. For the plural and the Owner:",
				[
					"-ο swaps to -α in the plural",
					"most nouns in -ι add -α",
					"the Owner of one ends in -ου",
					"-μα adds -τ- before every ending except the Doer and Target of one: ονόματα, ονόματος",
				],
			],
			table: {
				columns: [
					{ label: "Form" },
					{ label: "-ο", greek: true },
					{ label: "-ι", greek: true },
					{ label: "-μα", greek: true },
				],
				rows: [
					["Doer", markedCell("το βιβλίο", "nominative", "neuter", false), markedCell("το παιδί", "nominative", "neuter", false), markedCell("το όνομα", "nominative", "neuter", false)],
					["Target", markedCell("το βιβλίο", "accusative", "neuter", false), markedCell("το παιδί", "accusative", "neuter", false), markedCell("το όνομα", "accusative", "neuter", false)],
					["Owner", markedCell("του βιβλίου", "genitive", "neuter", false), markedCell("του παιδιού", "genitive", "neuter", false), markedCell("του ονόματος", "genitive", "neuter", false)],
					["Doers", markedCell("τα βιβλία", "nominative", "neuter", true), markedCell("τα παιδιά", "nominative", "neuter", true), markedCell("τα ονόματα", "nominative", "neuter", true)],
					["Targets", markedCell("τα βιβλία", "accusative", "neuter", true), markedCell("τα παιδιά", "accusative", "neuter", true), markedCell("τα ονόματα", "accusative", "neuter", true)],
					["Owners", markedCell("των βιβλίων", "genitive", "neuter", true), markedCell("των παιδιών", "genitive", "neuter", true), markedCell("των ονομάτων", "genitive", "neuter", true)],
				],
			},
			examples: [
				{
					greek: "Τα παιδιά διαβάζουν βιβλία.",
					english: "The children read books. (the Doer and Target forms look the same, so ask: the children read what?)",
					marks: [mark("Τα παιδιά", "nominative", "neuter", true), mark("βιβλία", "accusative", "neuter", true)],
				},
				{
					greek: "Τα βιβλία του παιδιού είναι στο τραπέζι.",
					english: "The child's books are on the table. (παιδί takes -ού for the Owner)",
					marks: [mark("Τα βιβλία", "nominative", "neuter", true), mark("του παιδιού", "genitive", "neuter")],
				},
				{
					greek: "Δε θυμάμαι τα ονόματα.",
					english: "I can't remember the names. (-μα becomes -ματα)",
					marks: [mark("τα ονόματα", "accusative", "neuter", true)],
				},
			],
			details: [
				{
					label: "-μα: where the stress goes",
					text: "When the stress sits three syllables from the end, it moves one syllable towards the end. When it sits two from the end, it stays where it is.",
					examples: [
						{
							greek: "το όνομα → τα ονόματα",
							english: "the name → the names",
							marks: [mark("το όνομα", "nominative", "neuter"), mark("τα ονόματα", "nominative", "neuter", true)],
						},
						{
							greek: "το χρώμα → τα χρώματα",
							english: "the colour → the colours",
							marks: [mark("το χρώμα", "nominative", "neuter"), mark("τα χρώματα", "nominative", "neuter", true)],
						},
					],
				},
			],
			drills: ["nominative-nouns", "nominal-all-nouns"],
		},
	],
	reference: [
		{ label: "Every noun pattern", href: "/reference/nouns" },
		{ label: "Articles", href: "/reference/articles" },
	],
};
