import { cellWith, mark, markedCell } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

export const SCALES_GUIDE: Guide = {
	slug: "scales",
	tone: "stone",
	title: "Scales: how often, how many, how much",
	greek: "Πόσο",
	description: "Never to always, none to many",
	idea: "Several sets of Greek words line up from nothing to everything. Learn each set as a ladder, in order, and choosing the right word means finding the rung you need.",
	sections: [
		{
			id: "frequency",
			title: "How often: from ποτέ to πάντα",
			rule: "Frequency words usually sit before the verb. ποτέ also needs δεν: ποτέ δεν πίνω καφέ.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["ποτέ", "never"],
					["σπάνια", "rarely"],
					["μερικές φορές", "sometimes"],
					["συχνά", "often"],
					["συνήθως", "usually"],
					["πάντα", "always"],
				],
			},
			examples: [
				{ greek: "Ποτέ δεν πίνω καφέ.", english: "I never drink coffee." },
				{
					greek: "Το πρωί συνήθως πάω στο Lidl για ψώνια.",
					english: "In the morning I usually go to Lidl for shopping.",
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "scales-frequency",
					title: "How often",
					greek: "ποτέ · σπάνια · συχνά · πάντα",
					tests: "Shows a frequency word in English; the answer is the Greek rung, such as συνήθως for usually.",
				},
			],
		},
		{
			id: "quantity",
			title: "How many: none, some, many",
			rule: "With υπάρχει and υπάρχουν, pick the rung: ένα for one, κανένα for not a single one, μερικά for some, πολλά for many. With a plural, not any is καθόλου. All of them except καθόλου take the noun's gender.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[cellWith("δεν υπάρχει κανένα πάρκο", mark("κανένα πάρκο", "nominative", "neuter")), "there isn't a single park"],
					[cellWith("δεν υπάρχουν καθόλου τράπεζες", mark("τράπεζες", "nominative", "feminine", true)), "there aren't any banks"],
					[cellWith("υπάρχει ένα βιβλιοπωλείο", mark("ένα βιβλιοπωλείο", "nominative", "neuter")), "there is a bookshop"],
					[cellWith("υπάρχουν μερικά καταστήματα", mark("μερικά καταστήματα", "nominative", "neuter", true)), "there are some shops"],
					[cellWith("υπάρχουν πολλά εστιατόρια", mark("πολλά εστιατόρια", "nominative", "neuter", true)), "there are many restaurants"],
				],
			},
			examples: [
				{
					greek: "Στο μικρό μου χωριό δεν υπάρχουν καθόλου τράπεζες, αλλά έχουμε μερικά ΑΤΜ.",
					english: "In my small village there aren't any banks, but we have some ATMs.",
					marks: [mark("τράπεζες", "nominative", "feminine", true), mark("μερικά ΑΤΜ", "accusative", "neuter", true)],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "scales-quantity",
					title: "There is none, some, many",
					greek: "κανένα πάρκο · μερικά καταστήματα · πολλά εστιατόρια",
					tests: "Shows a there is or there are sentence in English; the answer is the Greek with the quantity word matching the noun, such as δεν υπάρχει κανένα πάρκο.",
				},
			],
		},
		{
			id: "poly-polla",
			title: "πολύ or πολλά?",
			rule: "πολύ meaning very or a lot never changes: it sits beside an adjective or a verb. Before a noun it is a different word, the adjective πολύς, πολλή, πολύ, and in the plural πολλοί, πολλές, πολλά. It matches the noun, singular included: πολύ κόσμο, πολλή δουλειά. In casual speech you will also hear πολύ δουλειά; πολλή is the standard form. Two of its forms look like the unchanging πολύ: the it-word, and the he-word as the Target.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[{ text: "πολύ καλός", weight: "anchor" }, "very good"],
					[{ text: "δουλεύω πολύ", weight: "anchor" }, "I work a lot"],
					[markedCell("πολύ κόσμο", "accusative", "masculine"), "a lot of people"],
					[markedCell("πολλή δουλειά", "accusative", "feminine", false, "deviate"), "a lot of work"],
					[markedCell("πολλοί άνθρωποι", "nominative", "masculine", true), "many people"],
					[markedCell("πολλές φορές", "accusative", "feminine", true), "many times"],
					[markedCell("πολλά δέντρα", "nominative", "neuter", true), "many trees"],
				],
			},
			examples: [
				{
					greek: "Υπάρχουν πολλά δέντρα.",
					english: "There are many trees.",
					marks: [mark("πολλά δέντρα", "nominative", "neuter", true)],
				},
				{
					greek: "Είμαι κουρασμένος επειδή έχω πολλή δουλειά αυτή την εβδομάδα.",
					english: "I am tired because I have a lot of work this week.",
					marks: [mark("πολλή δουλειά", "accusative", "feminine")],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "scales-poly-polla",
					title: "πολύ or πολλή, πολλά",
					greek: "πολύ καλός · πολλή δουλειά · πολλά δέντρα",
					tests: "Shows an English phrase such as a lot of work or very good; the answer is the Greek with πολύ unchanged before an adjective or verb and matching the noun before a noun.",
				},
			],
		},
		{
			id: "negatives",
			title: "Nothing, nowhere, never: saying not twice",
			rule: "Greek says not twice: δεν goes before the verb and the nothing-word comes after it. δεν πήγα πουθενά is literally I didn't go nowhere, and it is correct.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["δεν κάνω τίποτα", "I don't do anything"],
					["δεν πήγα πουθενά", "I didn't go anywhere"],
					["κανένας δεν ξέρει", "no one knows"],
					["ποτέ δεν πίνω καφέ", "I never drink coffee"],
					["δεν είδα καθόλου τηλεόραση", "I didn't watch any TV at all"],
				],
			},
			examples: [
				{
					greek: "Είδες καθόλου τηλεόραση χθες;",
					english: "Did you watch any TV at all yesterday?",
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "scales-double-negative",
					title: "Saying not twice",
					greek: "δεν … τίποτα · δεν … πουθενά · ποτέ δεν",
					tests: "Shows an English sentence with nothing, nowhere, no one or never; the answer is the Greek with δεν before the verb and the nothing-word, such as δεν πήγα πουθενά.",
				},
			],
		},
		{
			id: "comparing",
			title: "More than: πιο … από",
			rule: "To compare, put πιο before the adjective and από before what you compare it with. The adjective still matches its noun. Some adjectives also have a one-word form in -τερος.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["πιο μεγάλος", "bigger, older"],
					["πιο ήσυχος από", "quieter than"],
					["ψηλότερος", "taller"],
					["παλιότερος", "older"],
				],
			},
			examples: [
				{ greek: "Είναι πιο ψηλός από εμένα.", english: "He is taller than me." },
				{
					greek: "Η κουζίνα είναι πιο μεγάλη από το μπάνιο.",
					english: "The kitchen is bigger than the bathroom.",
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "scales-comparing",
					title: "More than: πιο … από",
					greek: "πιο μεγάλος · πιο ήσυχος από · ψηλότερος",
					tests: "Shows an English comparison such as quieter than; the answer is the Greek with πιο before the adjective and από after it, the adjective matching its noun.",
				},
			],
		},
		{
			id: "some-every",
			title: "Some, none, every",
			rule: "Each row is one kind of thing: a thing, a person, a place, a time. Read across and the some-word, the none-word and the every-word line up. Most some-words start κάπ-. In a statement the none-words need δεν before the verb, as in saying not twice. κάποιος and κανένας change like adjectives: κάποια, κάποιο; καμία, κανένα. κάθε, each, stays the same with every noun: κάθε μέρα, κάθε μήνας, κάθε έτος. For whatever, whoever and wherever, Greek has ό,τι, όποιος and όπου.",
			table: {
				columns: [
					{ label: "Some", greek: true },
					{ label: "None", greek: true },
					{ label: "Every", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["κάτι", "τίποτα", "όλα", "something · nothing · everything"],
					["κάποιος", "κανένας", "όλοι", "someone · no one · everyone"],
					["κάπου", "πουθενά", "παντού", "somewhere · nowhere · everywhere"],
					["κάποτε", "ποτέ", "πάντα", "at some time · never · always"],
				],
			},
			examples: [
				{ greek: "Έκανα κάτι.", english: "I did something." },
				{ greek: "Κανένας δεν ξέρει.", english: "No one knows." },
				{ greek: "Δεν είδα κανέναν πουθενά.", english: "I didn't see anyone anywhere." },
				{ greek: "Όλοι μαζί.", english: "All together." },
			],
			drills: [],
			plannedDrills: [
				{
					id: "scales-some-every",
					title: "Some, none, every",
					greek: "κάτι · τίποτα · όλα · κάπου · πουθενά · παντού",
					tests: "Shows an English word from the grid, such as nowhere or someone; the answer is the Greek word in that row and column.",
				},
			],
		},
	],
	reference: [{ label: "Adjectives", href: "/reference/adjectives" }],
};
