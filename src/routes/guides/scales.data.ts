import type { Guide } from "@/types/guide";

export const SCALES_GUIDE: Guide = {
	slug: "scales",
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
					["δεν υπάρχει κανένα πάρκο", "there isn't a single park"],
					["δεν υπάρχουν καθόλου τράπεζες", "there aren't any banks"],
					["υπάρχει ένα βιβλιοπωλείο", "there is a bookshop"],
					["υπάρχουν μερικά καταστήματα", "there are some shops"],
					["υπάρχουν πολλά εστιατόρια", "there are many restaurants"],
				],
			},
			examples: [
				{
					greek: "Στο μικρό μου χωριό δεν υπάρχουν καθόλου τράπεζες, αλλά έχουμε μερικά ΑΤΜ.",
					english: "In my small village there aren't any banks, but we have some ATMs.",
				},
			],
			drills: [],
		},
		{
			id: "poly-polla",
			title: "πολύ or πολλά?",
			rule: "πολύ never changes: it means very or a lot, beside an adjective or a verb. Before a plural noun you need πολλοί, πολλές or πολλά, matching the noun's gender.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[{ text: "πολύ καλός", weight: "anchor" }, "very good"],
					[{ text: "δουλεύω πολύ", weight: "anchor" }, "I work a lot"],
					["πολλοί άνθρωποι", "many people"],
					["πολλές φορές", "many times"],
					["πολλά δέντρα", "many trees"],
				],
			},
			examples: [{ greek: "Υπάρχουν πολλά δέντρα.", english: "There are many trees." }],
			drills: [],
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
		},
	],
	reference: [{ label: "Adjectives", href: "/reference/adjectives" }],
};
