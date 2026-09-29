import { cellWith, mark, markedCell } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

export const AGREEMENT_GUIDE: Guide = {
	slug: "agreement",
	tone: "olive",
	title: "Words that agree",
	greek: "Συμφωνία",
	description: "Gender, and the words that copy it",
	idea: "Every noun is masculine, feminine or neuter, and the words around it copy that: the article, the adjective, even some numbers. Learn each noun with its article and the rest follows.",
	sections: [
		{
			id: "adjectives",
			title: "Adjectives copy the noun",
			rule: "Most adjectives end in -ος, -η, -ο to match a masculine, feminine or neuter noun, and in -οι, -ες, -α in the plural. A few end in -ης, -ης, -ες instead, with one form for masculine and feminine.",
			table: {
				columns: [
					{ label: "Masculine", greek: true },
					{ label: "Feminine", greek: true },
					{ label: "Neuter", greek: true },
					{ label: "Number" },
				],
				rows: [
					[
						markedCell("ελληνικός καφές", "nominative", "masculine", false, "anchor"),
						markedCell("ελληνική λεμονάδα", "nominative", "feminine"),
						markedCell("ελληνικό φαγητό", "nominative", "neuter"),
						"one",
					],
					[
						markedCell("ελληνικοί καφέδες", "nominative", "masculine", true),
						markedCell("ελληνικές λεμονάδες", "nominative", "feminine", true),
						markedCell("ελληνικά φαγητά", "nominative", "neuter", true),
						"more than one",
					],
					[
						markedCell("θορυβώδης", "nominative", "masculine"),
						markedCell("θορυβώδης", "nominative", "feminine", false, "deviate"),
						markedCell("θορυβώδες", "nominative", "neuter"),
						"one, -ης type",
					],
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
			drills: ["adjectives-agreement", "adjectives-agreement-target", "nominal-all-adjectives"],
		},
		{
			id: "numbers",
			title: "Numbers that agree",
			rule: "Up to a hundred, only one, three and four change with gender, along with ordinals such as έβδομος, which work like adjectives. From two hundred, the hundreds change too, and so does χίλιοι.",
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
			],
			drills: ["blocks-numbers"],
		},
		{
			id: "gender-families",
			title: "Guessing gender from the word",
			rule: "Some families of words share a gender, which saves learning each one. Many jobs have a masculine and a feminine form; some keep one form and change only the article.",
			table: {
				columns: [
					{ label: "Examples", greek: true },
					{ label: "Family" },
					{ label: "Gender" },
				],
				rows: [
					[markedCell("η Ελλάδα", "nominative", "feminine"), "countries", "mostly feminine; ο Καναδάς is one exception"],
					[markedCell("τα ελληνικά", "nominative", "neuter", true), "languages", "neuter plural"],
					[markedCell("το ανθοπωλείο", "nominative", "neuter"), "shops in -πωλείο", "neuter"],
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
						"no pattern: learn each",
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
		},
	],
	reference: [
		{ label: "Adjectives", href: "/reference/adjectives" },
		{ label: "Nouns", href: "/reference/nouns" },
	],
};
