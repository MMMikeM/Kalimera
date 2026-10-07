import { mark, markedCell } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

export const NOUN_EXCEPTIONS_GUIDE: Guide = {
	slug: "noun-exceptions",
	tone: "honey",
	title: "Nouns that break the pattern",
	greek: "Ανώμαλα ουσιαστικά",
	description: "New plural endings, nouns that never change, and nouns used in the plural",
	idea: "A few nouns step outside their family: some take a new ending in the plural, some never change, and some are used only in the plural.",
	sections: [
		{
			id: "extra-syllable",
			title: "Plurals with a new ending, like καφέδες and πόλεις",
			rule: [
				"A few nouns make their plural, the form for more than one, with an ending you wouldn't guess from the form for one.",
				"Some add -δ- and a syllable: ο καφές, οι καφέδες. Most of these end in:",
				["-άς", "-ά", "-ές", "-ούς", "-τζής"],
				"The table shows the common ones. Feminines in -η that take -εις are below.",
			],
			table: {
				columns: [
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("ο καφές", "nominative", "masculine"), markedCell("οι καφέδες", "nominative", "masculine", true), "coffee"],
					[markedCell("η γιαγιά", "nominative", "feminine"), markedCell("οι γιαγιάδες", "nominative", "feminine", true), "grandmother"],
					[markedCell("ο μπαμπάς", "nominative", "masculine"), markedCell("οι μπαμπάδες", "nominative", "masculine", true), "dad"],
					[markedCell("ο παππούς", "nominative", "masculine"), markedCell("οι παππούδες", "nominative", "masculine", true), "grandfather"],
					[markedCell("ο ταξιτζής", "nominative", "masculine"), markedCell("οι ταξιτζήδες", "nominative", "masculine", true), "taxi driver"],
				],
			},
			examples: [
				{
					greek: "Θα πάρουμε δύο καφέδες, παρακαλώ.",
					english: "We'll have two coffees, please.",
					marks: [mark("δύο καφέδες", "accusative", "masculine", true)],
				},
				{
					greek: "Οι γιαγιάδες κάθονται στην πλατεία.",
					english: "The grandmothers are sitting in the square.",
					marks: [mark("Οι γιαγιάδες", "nominative", "feminine", true)],
				},
			],
			details: [
				{
					label: "Feminines in -η with a plural in -εις",
					text: [
						"Some feminines in -η take -εις in the plural instead of -ες: η πόλη, οι πόλεις.",
						"Most nouns in -ση, -ξη and -ψη do this. Others in -η, such as η αγάπη, take -ες, so learn the plural with the noun.",
					],
					table: {
						columns: [
							{ label: "One", greek: true },
							{ label: "More than one", greek: true },
							{ label: "Meaning" },
						],
						rows: [
							[markedCell("η πόλη", "nominative", "feminine"), markedCell("οι πόλεις", "nominative", "feminine", true), "city"],
							[markedCell("η θέση", "nominative", "feminine"), markedCell("οι θέσεις", "nominative", "feminine", true), "seat, place"],
							[markedCell("η λέξη", "nominative", "feminine"), markedCell("οι λέξεις", "nominative", "feminine", true), "word"],
						],
					},
					examples: [
						{
							greek: "Η Αθήνα και η Θεσσαλονίκη είναι μεγάλες πόλεις.",
							english: "Athens and Thessaloniki are big cities.",
							marks: [mark("μεγάλες πόλεις", "nominative", "feminine", true)],
						},
					],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "nouns-plural-extra-syllable",
					title: "Plurals with a new ending",
					greek: "καφέδες · γιαγιάδες · πόλεις",
					tests: "A card shows a noun with its article in the one form, and the plural in its plain form, with its article, counts as right.",
				},
			],
		},
		{
			id: "never-change",
			title: "Nouns that never change",
			rule: "Many words borrowed from other languages never change their ending. Only the article changes: το πάρτι, τα πάρτι, του πάρτι. Most are neuter.",
			table: {
				columns: [
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("το σινεμά", "nominative", "neuter"), markedCell("τα σινεμά", "nominative", "neuter", true), "cinema"],
					[markedCell("το πάρτι", "nominative", "neuter"), markedCell("τα πάρτι", "nominative", "neuter", true), "party"],
					[markedCell("το χόμπι", "nominative", "neuter"), markedCell("τα χόμπι", "nominative", "neuter", true), "hobby"],
					[markedCell("το ραντεβού", "nominative", "neuter"), markedCell("τα ραντεβού", "nominative", "neuter", true), "appointment"],
					[markedCell("το σπορ", "nominative", "neuter"), markedCell("τα σπορ", "nominative", "neuter", true), "sport"],
					[markedCell("το βίντεο", "nominative", "neuter"), markedCell("τα βίντεο", "nominative", "neuter", true), "video"],
				],
			},
			examples: [
				{
					greek: "Τα ραντεβού μου είναι αύριο.",
					english: "My appointments are tomorrow. (τα changes; ραντεβού doesn't)",
					marks: [mark("Τα ραντεβού", "nominative", "neuter", true), mark("μου", "genitive")],
				},
				{
					greek: "Η μουσική του πάρτι ήταν τέλεια.",
					english: "The music at the party was great. (του changes; πάρτι doesn't)",
					marks: [mark("του πάρτι", "genitive", "neuter")],
				},
			],
			confuse: {
				text: "Not every borrowed word stays the same: ο καφές becomes οι καφέδες.",
				section: "extra-syllable",
			},
			drills: [],
			plannedDrills: [
				{
					id: "nouns-unchanging",
					title: "Nouns that never change",
					greek: "τα πάρτι · του σινεμά · τα βίντεο",
					tests: "A card asks for a borrowed noun in a given form and number; right is the article changed and the noun left as it is.",
				},
			],
		},
		{
			id: "plural-only",
			title: "Nouns used in the plural",
			rule: "A few things English names as one, Greek names as more than one, so the article and any adjective go plural too: καλοκαιρινές διακοπές, a summer holiday.",
			table: {
				columns: [
					{ label: "Plain form", greek: true },
					{ label: "Target form", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("οι διακοπές", "nominative", "feminine", true), markedCell("τις διακοπές", "accusative", "feminine", true), "holidays"],
					[markedCell("τα ψώνια", "nominative", "neuter", true), markedCell("τα ψώνια", "accusative", "neuter", true), "the shopping"],
					[markedCell("τα μεσάνυχτα", "nominative", "neuter", true), markedCell("τα μεσάνυχτα", "accusative", "neuter", true), "midnight"],
				],
			},
			examples: [
				{
					greek: "Κάνω διακοπές.",
					english: "I'm on holiday. (διακοπές is plural)",
					marks: [mark("διακοπές", "accusative", "feminine", true)],
				},
				{
					greek: "Κάνω τα ψώνια στο σούπερ μάρκετ.",
					english: "I do the shopping at the supermarket. (τα ψώνια is plural)",
					marks: [mark("τα ψώνια", "accusative", "neuter", true)],
				},
			],
			details: [
				{
					label: "η διακοπή, the form for one",
					text: "η διακοπή does exist, but it means a break or an interruption.",
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "nouns-plural-only",
					title: "Nouns used in the plural",
					greek: "οι διακοπές · τα ψώνια · τα μεσάνυχτα",
					tests: "A card shows the English (holidays, midnight) and the Greek noun with its plural article counts as right.",
				},
			],
		},
	],
	reference: [
		{ label: "Every noun pattern", href: "/reference/nouns" },
	],
};
