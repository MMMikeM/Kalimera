import type { Guide } from "@/types/guide";

export const AGREEMENT_GUIDE: Guide = {
	slug: "agreement",
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
						{ text: "ελληνικός καφές", weight: "anchor" },
						"ελληνική λεμονάδα",
						"ελληνικό φαγητό",
						"one",
					],
					["ελληνικοί καφέδες", "ελληνικές λεμονάδες", "ελληνικά φαγητά", "more than one"],
					["θορυβώδης", { text: "θορυβώδης", weight: "deviate" }, "θορυβώδες", "one, -ης type"],
				],
			},
			examples: [
				{ greek: "Οι καρέκλες είναι κόκκινες.", english: "The chairs are red." },
				{ greek: "καλοκαιρινές διακοπές", english: "summer holidays" },
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
					["ένας", "μία", "ένα", "one"],
					["τρεις", "τρεις", { text: "τρία", weight: "deviate" }, "three"],
					["τέσσερις", "τέσσερις", { text: "τέσσερα", weight: "deviate" }, "four"],
					["έβδομος", "έβδομη", "έβδομο", "seventh"],
				],
			},
			examples: [
				{ greek: "στις τρεις", english: "at three o'clock (hours are feminine)" },
				{ greek: "τρία παιδιά", english: "three children" },
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
					["η Ελλάδα", "countries", "mostly feminine; ο Καναδάς is one exception"],
					["τα ελληνικά", "languages", "neuter plural"],
					["το ανθοπωλείο", "shops in -πωλείο", "neuter"],
					["το πρωινό", "meals", "neuter"],
					["ο δάσκαλος · η δασκάλα", "most jobs", "a form for each"],
					["ο / η μπαρίστα", "some jobs", "one form, the article changes"],
					["ο χειμώνας · η άνοιξη", "seasons", "no pattern: learn each"],
				],
			},
			examples: [
				{ greek: "Μιλάω ελληνικά.", english: "I speak Greek. (no article after μιλάω)" },
				{ greek: "Η μπαρίστα δουλεύει στο καφέ.", english: "The barista works at the café." },
			],
			drills: [],
		},
	],
	reference: [
		{ label: "Adjectives", href: "/reference/adjectives" },
		{ label: "Nouns", href: "/reference/nouns" },
	],
};
