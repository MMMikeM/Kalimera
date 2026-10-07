import { mark, markedCell } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

const JOB_DEFINITIONS = [
	"The Doer _does_ the action. Its form is the plain one you find in the dictionary.",
	"The Target is who or what the action is done to.",
	"The Owner is who something belongs to.",
];

export const NOUNS_GUIDE: Guide = {
	slug: "nouns",
	tone: "ocean",
	title: "Noun families",
	greek: "Ουσιαστικά",
	description: "The forms each family takes, for one and more than one",
	idea: "A noun's ending usually tells you its family, and the family gives you its other forms: its Target, its Owner and its plural.",
	sections: [
		{
			id: "families",
			title: "Masculine nouns in -ος",
			rule: [
				"Nouns fall into families by gender and ending. Each family has its own way of changing the plain form for the Target, the Owner and more than one.",
				"Masculines in -ος are the biggest family, and the one whose plural Target differs from its plural Doer.",
				"The table shows ο φίλος (friend) in each job:",
				JOB_DEFINITIONS,
			],
			table: {
				columns: [
					{ label: "Form" },
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
				],
				rows: [
					["Doer", markedCell("ο φίλος", "nominative", "masculine", false), markedCell("οι φίλοι", "nominative", "masculine", true)],
					["Target", markedCell("τον φίλο", "accusative", "masculine"), markedCell("τους φίλους", "accusative", "masculine", true)],
					["Owner", markedCell("του φίλου", "genitive", "masculine"), markedCell("των φίλων", "genitive", "masculine", true)],
				],
			},
			examples: [
				{
					greek: "Οι φίλοι μου έρχονται απόψε.",
					english: "My friends are coming tonight.",
					marks: [mark("Οι φίλοι", "nominative", "masculine", true)],
				},
				{
					greek: "Περιμένω τους φίλους μου.",
					english: "I'm waiting for my friends.",
					marks: [mark("τους φίλους", "accusative", "masculine", true)],
				},
			],
			drills: ["nominative-nouns", "nominal-all-nouns"],
		},
		{
			id: "families-as-is",
			title: "Masculine nouns in -ας and -ης",
			rule: [
				"A masculine noun in -ας or -ης drops its -ς for the Target and the Owner of one. Its plural ends in -ες for the Doer and the Target alike.",
				"The table shows ο πατέρας (father) and ο μαθητής (pupil) in each job:",
				JOB_DEFINITIONS,
			],
			table: {
				columns: [
					{ label: "Form" },
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
				],
				rows: [
					["Doer", markedCell("ο πατέρας", "nominative", "masculine", false), markedCell("οι πατέρες", "nominative", "masculine", true)],
					["Target", markedCell("τον πατέρα", "accusative", "masculine", false), markedCell("τους πατέρες", "accusative", "masculine", true)],
					["Owner", markedCell("του πατέρα", "genitive", "masculine", false), markedCell("των πατέρων", "genitive", "masculine", true)],
					["Doer", markedCell("ο μαθητής", "nominative", "masculine", false), markedCell("οι μαθητές", "nominative", "masculine", true)],
					["Target", markedCell("τον μαθητή", "accusative", "masculine", false), markedCell("τους μαθητές", "accusative", "masculine", true)],
					["Owner", markedCell("του μαθητή", "genitive", "masculine", false), markedCell("των μαθητών", "genitive", "masculine", true)],
				],
			},
			examples: [
				{
					greek: "Περιμένω τον πατέρα μου.",
					english: "I'm waiting for my father.",
					marks: [mark("τον πατέρα", "accusative", "masculine")],
				},
				{
					greek: "Ο δάσκαλος βοηθάει τους μαθητές.",
					english: "The teacher helps the pupils.",
					marks: [mark("Ο δάσκαλος", "nominative", "masculine"), mark("τους μαθητές", "accusative", "masculine", true)],
				},
			],
			drills: ["nominative-nouns", "nominal-all-nouns"],
		},
		{
			id: "families-a-i",
			title: "Feminine nouns in -α and -η",
			rule: [
				"A feminine noun in -α or -η changes its article for the Target and the Owner, but its ending only sometimes. For one, the Doer and the Target share a form, and the Owner adds -ς. The plural ends in -ες for the Doer and the Target alike.",
				"The table shows η γυναίκα (woman) and η ζωή (life) in each job:",
				JOB_DEFINITIONS,
			],
			table: {
				columns: [
					{ label: "Form" },
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
				],
				rows: [
					["Doer", markedCell("η γυναίκα", "nominative", "feminine", false), markedCell("οι γυναίκες", "nominative", "feminine", true)],
					["Target", markedCell("τη γυναίκα", "accusative", "feminine"), markedCell("τις γυναίκες", "accusative", "feminine", true)],
					["Owner", markedCell("της γυναίκας", "genitive", "feminine", false), markedCell("των γυναικών", "genitive", "feminine", true)],
					["Doer", markedCell("η ζωή", "nominative", "feminine", false), markedCell("οι ζωές", "nominative", "feminine", true)],
					["Target", markedCell("τη ζωή", "accusative", "feminine"), markedCell("τις ζωές", "accusative", "feminine", true)],
					["Owner", markedCell("της ζωής", "genitive", "feminine", false), markedCell("των ζωών", "genitive", "feminine", true)],
				],
			},
			examples: [
				{
					greek: "Η ζωή είναι ωραία.",
					english: "Life is beautiful.",
					marks: [mark("Η ζωή", "nominative", "feminine")],
				},
				{
					greek: "Αγαπάω τη ζωή.",
					english: "I love life.",
					marks: [mark("τη ζωή", "accusative", "feminine")],
				},
			],
			details: [
				{
					label: "Plurals in -εις",
					text: "A few feminines in -η take -εις in the plural instead of -ες.",
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
			title: "Neuter nouns in -ο and -ι",
			rule: [
				"A neuter noun in -ο or -ι uses one form for the Doer and the Target, one and more than one alike.",
				[
					"Nouns in -ο swap it for -α in the plural.",
					"Most nouns in -ι add -α.",
					"The Owner of one ends in -ου.",
				],
				"The table shows το βιβλίο (book) and το παιδί (child) in each job:",
				JOB_DEFINITIONS,
			],
			table: {
				columns: [
					{ label: "Form" },
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
				],
				rows: [
					["Doer", markedCell("το βιβλίο", "nominative", "neuter", false), markedCell("τα βιβλία", "nominative", "neuter", true)],
					["Target", markedCell("το βιβλίο", "accusative", "neuter"), markedCell("τα βιβλία", "accusative", "neuter", true)],
					["Owner", markedCell("του βιβλίου", "genitive", "neuter", false), markedCell("των βιβλίων", "genitive", "neuter", true)],
					["Doer", markedCell("το παιδί", "nominative", "neuter", false), markedCell("τα παιδιά", "nominative", "neuter", true)],
					["Target", markedCell("το παιδί", "accusative", "neuter"), markedCell("τα παιδιά", "accusative", "neuter", true)],
					["Owner", markedCell("του παιδιού", "genitive", "neuter", false), markedCell("των παιδιών", "genitive", "neuter", true)],
				],
			},
			examples: [
				{
					greek: "Το παιδί διαβάζει ένα βιβλίο.",
					english: "The child is reading a book.",
					marks: [mark("Το παιδί", "nominative", "neuter"), mark("ένα βιβλίο", "accusative", "neuter")],
				},
				{
					greek: "Αγοράζω βιβλία για τα παιδιά.",
					english: "I'm buying books for the children.",
					marks: [mark("βιβλία", "accusative", "neuter", true), mark("τα παιδιά", "accusative", "neuter", true)],
				},
			],
			drills: ["nominative-nouns", "nominal-all-nouns"],
		},
		{
			id: "families-ma",
			title: "Neuter nouns in -μα",
			rule: [
				"A neuter noun in -μα keeps the -μα only for the Doer and the Target of one. Every other form adds -τ- before its ending.",
				"The table shows το όνομα (name) in each job:",
				JOB_DEFINITIONS,
			],
			table: {
				columns: [
					{ label: "Form" },
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
				],
				rows: [
					["Doer", markedCell("το όνομα", "nominative", "neuter", false), markedCell("τα ονόματα", "nominative", "neuter", true)],
					["Target", markedCell("το όνομα", "accusative", "neuter"), markedCell("τα ονόματα", "accusative", "neuter", true)],
					["Owner", markedCell("του ονόματος", "genitive", "neuter", false), markedCell("των ονομάτων", "genitive", "neuter", true)],
				],
			},
			examples: [
				{
					greek: "Τα μαθήματα αρχίζουν τον Σεπτέμβριο.",
					english: "Lessons start in September.",
					marks: [mark("Τα μαθήματα", "nominative", "neuter", true)],
				},
				{
					greek: "Δεν θυμάμαι ονόματα.",
					english: "I can't remember names.",
					marks: [mark("ονόματα", "accusative", "neuter", true)],
				},
			],
			details: [
				{
					label: "Where the stress goes",
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
