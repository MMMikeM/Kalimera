import { cellWith, mark, markedCell } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

export const SCALES_GUIDE: Guide = {
	slug: "scales",
	tone: "stone",
	title: "How often, how many, how much",
	greek: "Πόσο",
	description: "How often, how many and how much, in order",
	idea: "Several sets of Greek words line up from nothing to everything. Learn each set as a ladder, and choosing a word means finding its rung.",
	sections: [
		{
			id: "frequency",
			title: "How often, from ποτέ to πάντα",
			rule: [
				"Frequency words say how often something happens. The table lists them as a ladder, from never to always.",
				"Pick the rung you mean. It usually sits just before the verb.",
			],
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["ποτέ", "never"],
					["σχεδόν ποτέ", "almost never"],
					["σπάνια", "rarely"],
					["πότε πότε", "now and then"],
					["μερικές φορές · καμιά φορά", "sometimes"],
					["συχνά", "often"],
					["πολλές φορές", "many times"],
					["συνήθως", "usually"],
					["σχεδόν πάντα", "almost always"],
					["πάντα", "always"],
				],
			},
			examples: [
				{
					greek: "Το πρωί συνήθως πάω στο Lidl για ψώνια.",
					english: "In the morning I usually go shopping at Lidl.",
				},
				{ greek: "Πότε πότε τρώμε έξω.", english: "Now and then we eat out." },
			],
			details: [
				{
					label: "ποτέ needs δεν",
					text: "ποτέ and σχεδόν ποτέ also need δεν, not, before the verb, as Saying not twice with δεν sets out.",
				},
				{
					label: "καμιά φορά",
					text: "καμιά φορά means sometimes, even though καμιά looks like καμία, no or not a single.",
				},
			],
			confuse: {
				text: [
					"Watch where the stress falls.",
					[
						"ποτέ, stressed on the end, means never.",
						"πότε, stressed on the start, asks when.",
						"Doubled, πότε πότε means now and then.",
					],
				],
				section: "joining/when-why",
			},
			drills: [],
			plannedDrills: [
				{
					id: "scales-frequency",
					title: "How often",
					greek: "ποτέ · σχεδόν ποτέ · πότε πότε · συχνά · πάντα",
					tests: "Shows a frequency word in English; the answer is the Greek rung, such as συνήθως for usually.",
				},
			],
		},
		{
			id: "quantity",
			title: "How many, from none to many",
			rule: [
				"Quantity words say how many of something there are. The table runs from none to many, each in a there is or there are sentence: υπάρχει for one thing, υπάρχουν for more than one.",
				"Every quantity word but καθόλου changes its ending to match the noun's gender and number, as an adjective does.",
			],
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[cellWith("δεν υπάρχει κανένα πάρκο", mark("κανένα πάρκο", "nominative", "neuter")), "there isn't a single park"],
					[cellWith("δεν υπάρχει καμία τράπεζα", mark("καμία τράπεζα", "nominative", "feminine")), "there isn't a single bank"],
					[cellWith("δεν υπάρχουν καθόλου τράπεζες", mark("τράπεζες", "nominative", "feminine", true)), "there aren't any banks"],
					[cellWith("υπάρχει ένα βιβλιοπωλείο", mark("ένα βιβλιοπωλείο", "nominative", "neuter")), "there is a bookshop"],
					[cellWith("υπάρχουν λίγα πάρκα", mark("λίγα πάρκα", "nominative", "neuter", true)), "there are a few parks"],
					[cellWith("υπάρχουν μερικά καταστήματα", mark("μερικά καταστήματα", "nominative", "neuter", true)), "there are some shops"],
					[cellWith("υπάρχουν πολλά εστιατόρια", mark("πολλά εστιατόρια", "nominative", "neuter", true)), "there are many restaurants"],
				],
			},
			examples: [
				{
					greek: "Δεν υπάρχει κανένα πάρκο εδώ κοντά, αλλά υπάρχουν πολλά εστιατόρια.",
					english: "There isn't a single park near here, but there are lots of restaurants.",
					marks: [mark("κανένα πάρκο", "nominative", "neuter"), mark("πολλά εστιατόρια", "nominative", "neuter", true)],
				},
			],
			details: [
				{
					label: "The none-words need δεν",
					text: "κανένα, not a single, and καθόλου, not any, need δεν, not, before the verb, as Saying not twice with δεν sets out.",
				},
				{
					label: "λίγος and λίγο",
					text: [
						"Before a singular noun, λίγος means a little rather than a few.",
						"On its own, λίγο means a bit: σε λίγο, in a bit.",
					],
					examples: [
						{
							greek: "Κάνω λίγη εξάσκηση κάθε μέρα.",
							english: "I do a little practice every day.",
							marks: [mark("λίγη εξάσκηση", "accusative", "feminine")],
						},
					],
				},
			],
			confuse: {
				text: "After υπάρχει the noun keeps its plain form, the Doer form, because nothing is done to it: υπάρχουν πολλοί τουρίστες.",
				section: "no-doer/there-is",
			},
			drills: [],
			plannedDrills: [
				{
					id: "scales-quantity",
					title: "There is none, some, many",
					greek: "κανένα πάρκο · λίγα πάρκα · μερικά καταστήματα · πολλά εστιατόρια",
					tests: "Shows a there is or there are sentence in English; the answer is the Greek with the quantity word matching the noun, such as δεν υπάρχει κανένα πάρκο.",
				},
			],
		},
		{
			id: "poly-polla",
			title: "πολύ or πολλά?",
			rule: [
				"πολύ works two ways, depending on what it sits beside.",
				[
					"Beside an adjective or a verb, πολύ means very or a lot, and it never changes.",
					"Before a noun, it is a different word, the adjective πολύς, a lot of or many. It matches the noun's gender and number, singular included.",
				],
				"The adjective's forms are πολύς, πολλή, πολύ, and in the plural πολλοί, πολλές, πολλά.",
			],
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["πολύ καλός", "very good"],
					["δουλεύω πολύ", "I work a lot"],
					[markedCell("πολύ κόσμο", "accusative", "masculine"), "a lot of people"],
					[markedCell("πολλή δουλειά", "accusative", "feminine"), "a lot of work"],
					[markedCell("πολλοί άνθρωποι", "nominative", "masculine", true), "many people"],
					[markedCell("πολλές φορές", "accusative", "feminine", true), "many times"],
					[markedCell("πολλά δέντρα", "nominative", "neuter", true), "many trees"],
				],
			},
			examples: [
				{
					greek: "Η Αθήνα είναι πολύ ωραία, αλλά έχει πολλή κίνηση.",
					english: "Athens is very nice, but it has a lot of traffic. (πολύ before an adjective; πολλή matches κίνηση)",
					marks: [mark("πολλή κίνηση", "accusative", "feminine")],
				},
				{
					greek: "Πολλοί άνθρωποι δουλεύουν πολύ.",
					english: "Many people work a lot. (πολλοί matches άνθρωποι; πολύ after a verb never changes)",
					marks: [mark("Πολλοί άνθρωποι", "nominative", "masculine", true)],
				},
			],
			details: [
				{
					label: "Forms spelt πολύ",
					text: [
						"Two forms of the adjective are spelt πολύ, just like the word that never changes:",
						["the neuter", "the masculine Target form"],
					],
					examples: [
						{
							greek: "Πίνω πολύ νερό το καλοκαίρι.",
							english: "I drink a lot of water in the summer.",
							marks: [mark("πολύ νερό", "accusative", "neuter")],
						},
						{
							greek: "Σήμερα έχει πολύ κόσμο στην παραλία.",
							english: "There are a lot of people on the beach today.",
							marks: [mark("πολύ κόσμο", "accusative", "masculine")],
						},
					],
				},
				{
					label: "In casual speech",
					text: "You will also hear πολύ δουλειά; πολλή is the standard form.",
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
			title: "Saying not twice with δεν",
			rule: [
				"δεν means not. It goes before the verb, and before any θα or short word in front of it, as The little words μου, σου, του sets out.",
				"Greek says not twice. With a nothing-word, the verb still takes δεν:",
				[
					"τίποτα, nothing",
					"πουθενά, nowhere",
					"κανένας, no one",
					"ποτέ, never",
					"καθόλου, not at all",
				],
				"So δεν πήγα πουθενά is literally I didn't go nowhere, and it is correct. The nothing-word can also come first, and δεν stays.",
			],
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
				{ greek: "Δεν θέλω τίποτα, ευχαριστώ.", english: "I don't want anything, thanks. (word for word, I don't want nothing)" },
				{ greek: "Ποτέ δεν θα το ξεχάσω.", english: "I'll never forget it. (ποτέ first; δεν still goes before θα and το)" },
			],
			details: [
				{
					label: "In questions",
					text: "In a question without δεν, the nothing-word means any.",
					examples: [
						{ greek: "Θέλεις τίποτα;", english: "Do you want anything?" },
						{
							greek: "Είδες καθόλου τηλεόραση χθες;",
							english: "Did you watch any TV at all yesterday?",
						},
					],
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
			id: "not-words",
			title: "δεν, όχι or μην",
			rule: [
				"Greek has three words for not, and each has its own place:",
				[
					"δεν before a verb: δεν ξέρω",
					"όχι before a word that isn't a verb, and for no on its own: όχι σήμερα, όχι",
					"μην after να and ας, and for don't: ας μην πάμε",
				],
				"For να μην and for don't, see The short form: future, να and commands.",
			],
			table: {
				columns: [
					{ label: "Word" },
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["δεν", "δεν το ξέρω", "I don't know it"],
					["όχι", "όχι πολύ καλά", "not very well"],
					["όχι", "όχι, ευχαριστώ", "no, thank you"],
					["μην", "ας μην πάμε σήμερα", "let's not go today"],
				],
			},
			examples: [
				{
					greek: "Δεν πεινάω. Όχι τώρα.",
					english: "I'm not hungry. Not now. (δεν before the verb, όχι before τώρα)",
				},
			],
			details: [
				{
					label: "δε or δεν",
					text: "δεν and μην drop their -ν before some sounds, as την does: δε θέλω. The rule is set out in Who does what, under the article.",
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "scales-ochi-den",
					title: "όχι or δεν?",
					greek: "δεν το ξέρω · όχι πολύ καλά · όχι σήμερα",
					tests: "Shows an English phrase with not; the answer is the Greek with δεν before the verb and its θα or object word, and όχι before an adverb, adjective or noun.",
				},
			],
		},
		{
			id: "comparing",
			title: "Comparing with πιο … από",
			rule: [
				"To compare, put πιο, more, before the adjective and από, than, before what you compare it with.",
				"The adjective still matches its noun's gender and number: πιο μεγάλος, πιο μεγάλη, πιο μεγάλο.",
			],
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["πιο μεγάλος", "bigger, older"],
					["πιο ήσυχος από", "quieter than"],
				],
			},
			examples: [
				{ greek: "Είναι πιο ψηλός από εμένα.", english: "He is taller than me." },
				{
					greek: "Η κουζίνα είναι πιο μεγάλη από το μπάνιο.",
					english: "The kitchen is bigger than the bathroom. (μεγάλη matches η κουζίνα)",
				},
			],
			details: [
				{
					label: "One-word forms in -τερος",
					text: "Some adjectives also have a one-word form ending in -τερος. It means the same as the form with πιο, and both are heard.",
					table: {
						columns: [
							{ label: "With πιο", greek: true },
							{ label: "One word", greek: true },
							{ label: "Meaning" },
						],
						rows: [
							["πιο ψηλός", "ψηλότερος", "taller"],
							["πιο παλιός", "παλιότερος", "older, of things"],
							["πιο καλός", "καλύτερος", "better"],
							["πιο κακός", { text: "χειρότερος", note: 0 }, "worse"],
						],
						notes: ["χειρότερος doesn't come from κακός, bad: it is a word of its own."],
					},
				},
				{
					label: "The most",
					text: "For the most, put the article in front of the πιο form or the one-word form. With περισσότερος, more, the same pattern means most people.",
					table: {
						columns: [
							{ label: "Greek", greek: true },
							{ label: "Meaning" },
						],
						rows: [
							[markedCell("ο πιο όμορφος", "nominative", "masculine"), "the most beautiful"],
							[markedCell("ο καλύτερος", "nominative", "masculine"), "the best"],
							[markedCell("οι περισσότεροι", "nominative", "masculine", true), "most people"],
						],
					},
					examples: [
						{
							greek: "Το καλοκαίρι είναι για πολλούς η πιο όμορφη εποχή του χρόνου.",
							english: "For many, summer is the most beautiful season of the year.",
							marks: [mark("Το καλοκαίρι", "nominative", "neuter"), mark("η πιο όμορφη εποχή", "nominative", "feminine")],
						},
						{
							greek: "Οι περισσότεροι άνθρωποι επιστρέφουν στις δουλειές τους.",
							english: "Most people go back to their jobs.",
							marks: [mark("Οι περισσότεροι άνθρωποι", "nominative", "masculine", true), mark("στις δουλειές", "accusative", "feminine", true), mark("τους", "genitive", undefined, true)],
						},
					],
				},
			],
			confuse: {
				text: "For like rather than more than, use σαν: σαν τον λύκο, like the wolf.",
				section: "place/without-until",
			},
			drills: [],
			plannedDrills: [
				{
					id: "scales-comparing",
					title: "Comparing with πιο … από",
					greek: "πιο μεγάλος · πιο ήσυχος από · καλύτερος · ο πιο όμορφος",
					tests: "Shows an English comparison such as quieter than or the most beautiful; the answer is the Greek with πιο before the adjective, από after it, and the article for the most, the adjective matching its noun.",
				},
			],
		},
		{
			id: "some-every",
			title: "Some, none, every",
			rule: [
				"Greek lines up its words for things, people, places and times in sets of three:",
				[
					"A some-word: something, someone.",
					"A none-word: nothing, no one.",
					"An every-word: everything, everyone.",
				],
				"The table has one row per set. Most some-words start κάπ-.",
			],
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
				{ greek: "Έχασα κάπου τα κλειδιά μου.", english: "I've lost my keys somewhere." },
				{ greek: "Δεν βρήκα τίποτα.", english: "I didn't find anything." },
				{ greek: "Σε ψάχνω παντού!", english: "I've been looking for you everywhere!" },
			],
			details: [
				{
					label: "κάποιος and κανένας",
					text: [
						"κάποιος and κανένας change like adjectives: κάποια, κάποιο; καμία, κανένα.",
						"Only the masculine changes for the Target form, the form for someone the action is done to: κάποιον, κανέναν.",
					],
					examples: [
						{
							greek: "Περιμένω κάποιον.",
							english: "I'm waiting for someone.",
							marks: [mark("κάποιον", "accusative", "masculine")],
						},
						{
							greek: "Δεν είδα κανέναν πουθενά.",
							english: "I didn't see anyone anywhere.",
							marks: [mark("κανέναν", "accusative", "masculine")],
						},
					],
				},
				{
					label: "κάθε",
					text: "κάθε, each or every, never changes, whatever the noun's gender: κάθε μέρα, κάθε μήνα, κάθε πρωί.",
				},
				{
					label: "Whatever, whoever, wherever",
					text: [
						"Greek has a word for each:",
						[
							"ό,τι, whatever",
							"όποιος, whoever",
							"όπου, wherever",
						],
					],
				},
			],
			confuse: {
				text: "In a statement the none-words need δεν before the verb: κανένας δεν ήρθε.",
				section: "negatives",
			},
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
		{
			id: "all-whole",
			title: "όλος for all and the whole",
			rule: [
				"όλος means all or the whole. It goes before the article, and the article stays.",
				"It matches its noun like an adjective: όλος, όλη, όλο, and in the plural όλοι, όλες, όλα.",
			],
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("όλος ο κόσμος", "nominative", "masculine"), "everyone, the whole world"],
					[markedCell("όλη τη μέρα", "accusative", "feminine"), "all day"],
					[markedCell("όλο το σπίτι", "accusative", "neuter"), "the whole house"],
					[markedCell("όλοι οι φίλοι", "nominative", "masculine", true), "all the friends"],
					[markedCell("όλα τα παιδιά", "nominative", "neuter", true), "all the children"],
				],
			},
			examples: [
				{
					greek: "Πολλοί τουρίστες από όλο τον κόσμο έρχονται στην Ελλάδα.",
					english: "Many tourists from all over the world come to Greece. (όλο matches τον κόσμο)",
					marks: [mark("όλο τον κόσμο", "accusative", "masculine")],
				},
			],
			details: [
				{
					label: "On its own",
					text: "Without a noun, όλοι is everyone and όλα everything, the every-words in Some, none, every.",
					examples: [{ greek: "Όλοι μαζί.", english: "All together." }],
				},
			],
			confuse: {
				text: "όλη τη μέρα is all day; κάθε μέρα, with no article, is every day.",
				section: "some-every",
			},
			drills: [],
			plannedDrills: [
				{
					id: "scales-all-whole",
					title: "όλος for all and the whole",
					greek: "όλη τη μέρα · όλο το σπίτι · όλοι οι φίλοι",
					tests: "Shows an English phrase with all or the whole; the answer is the Greek with όλος matching the noun, before its article.",
				},
			],
		},
	],
	reference: [{ label: "Adjectives", href: "/reference/adjectives" }],
};
