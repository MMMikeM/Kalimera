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
			rule: "Frequency words say how often something happens. They form a ladder from ποτέ, never, to πάντα, always, and the table lists the rungs in order. Pick the rung you mean; it usually sits before the verb: συνήθως πάω, I usually go.",
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
					text: "ποτέ, never, also needs δεν, not, before the verb, and so does σχεδόν ποτέ: ποτέ δεν πίνω καφέ. Greek says not twice.",
					examples: [{ greek: "Ποτέ δεν πίνω καφέ.", english: "I never drink coffee." }],
				},
				{
					label: "καμιά φορά",
					text: "καμιά φορά means sometimes, even though καμιά looks like the none-word καμία, no or not a single.",
				},
			],
			confuse: {
				text: "ποτέ, stressed on the end, means never; πότε, stressed on the start, asks when. Doubled, πότε πότε means now and then.",
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
			rule: "To say how many of something there are, use υπάρχει, there is, for one thing and υπάρχουν, there are, for more than one. Then pick a quantity word from the ladder in the table, which runs from none to many. Every quantity word but καθόλου changes its ending to match the noun's gender and number, as an adjective does: κανένα πάρκο, but καμία τράπεζα.",
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
			details: [
				{
					label: "The none-words need δεν",
					text: "κανένα, not a single, and καθόλου, not any, both need δεν, not, before the verb, as the table shows. καθόλου is the one quantity word that never changes.",
					examples: [
						{
							greek: "Στο μικρό μου χωριό δεν υπάρχουν καθόλου τράπεζες, αλλά έχουμε μερικά ΑΤΜ.",
							english: "In my small village there aren't any banks, but we have some ATMs.",
							marks: [mark("τράπεζες", "nominative", "feminine", true), mark("μερικά ΑΤΜ", "accusative", "neuter", true)],
						},
					],
				},
				{
					label: "λίγος and λίγο",
					text: "Before a singular noun, λίγος means a little: λίγη εξάσκηση. On its own, λίγο means a bit: σε λίγο, in a bit.",
					examples: [
						{
							greek: "Ας κάνουμε λοιπόν λίγη εξάσκηση μαζί.",
							english: "So let's do a little practice together.",
							marks: [mark("λίγη εξάσκηση", "accusative", "feminine")],
						},
					],
				},
			],
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
			rule: "πολύ meaning very or a lot never changes, and sits beside an adjective or a verb. Before a noun it is a different word, the adjective πολύς, πολλή, πολύ, and in the plural πολλοί, πολλές, πολλά. It matches the noun's gender and number, singular included: πολλή δουλειά, πολλά δέντρα.",
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
					greek: "Η Αθήνα είναι πολύ ωραία, αλλά έχει πολλή κίνηση.",
					english: "Athens is very nice, but it has a lot of traffic.",
					marks: [mark("πολλή κίνηση", "accusative", "feminine")],
				},
				{
					greek: "Είμαι κουρασμένος επειδή έχω πολλή δουλειά αυτή την εβδομάδα.",
					english: "I am tired because I have a lot of work this week.",
					marks: [mark("πολλή δουλειά", "accusative", "feminine")],
				},
			],
			details: [
				{
					label: "Forms spelt πολύ",
					text: "Two forms of the adjective are spelt πολύ, just like the word that never changes: the neuter one, for it-words, and the masculine Target one, for a he-word that the action is done to, as in πολύ κόσμο, a lot of people.",
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
			rule: "δεν means not, and Greek says not twice. With a nothing-word, such as τίποτα (nothing), πουθενά (nowhere), κανένας (no one), ποτέ (never) or καθόλου (not at all), the verb still takes δεν: δεν πήγα πουθενά is literally I didn't go nowhere, and it is correct. δεν goes before the verb and anything attached to it, such as θα or a short object word: δεν θα έρθω, δεν το ξέρω.",
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
			details: [
				{
					label: "Nothing-word first",
					text: "The nothing-word can come after the verb or first, and δεν stays either way: κανένας δεν ξέρει.",
				},
				{
					label: "In questions",
					text: "In a question there is no δεν, and the nothing-word means any: θέλεις τίποτα;",
					examples: [
						{
							greek: "Είδες καθόλου τηλεόραση χθες;",
							english: "Did you watch any TV at all yesterday?",
						},
					],
				},
				{
					label: "όχι",
					text: "For not before an adverb, an adjective or a noun, or for no on its own, use όχι: όχι πολύ καλά, not very well.",
					examples: [{ greek: "Όχι πολύ καλά.", english: "Not very well." }],
				},
				{
					label: "μην",
					text: "After να and ας, and to forbid something, use μην: να μην πεις.",
				},
				{
					label: "δε or δεν, μη or μην",
					text: "δεν and μην keep their -ν before a vowel and before κ, π, τ, ξ, ψ, μπ, ντ, γκ, τσ and τζ, and often drop it before other consonants: δεν πάω, but δε θέλω. This is the same rule as the article τη or την. Keeping the -ν anyway is widely accepted, especially with δεν.",
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
			rule: "To compare, put πιο before the adjective and από before what you compare it with. The adjective still matches its noun's gender and number: πιο μεγάλος, πιο μεγάλη, πιο μεγάλο.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["πιο μεγάλος", "bigger, older"],
					["πιο ήσυχος από", "quieter than"],
					["ψηλότερος", "taller"],
					["παλιότερος", "older, of things"],
					[{ text: "καλύτερος", weight: "deviate" }, "better"],
					[{ text: "χειρότερος", weight: "deviate" }, "worse"],
					[markedCell("ο πιο όμορφος", "nominative", "masculine"), "the most beautiful"],
					[markedCell("ο καλύτερος", "nominative", "masculine"), "the best"],
					[markedCell("οι περισσότεροι", "nominative", "masculine", true), "most people"],
				],
			},
			examples: [
				{ greek: "Είναι πιο ψηλός από εμένα.", english: "He is taller than me." },
				{
					greek: "Η κουζίνα είναι πιο μεγάλη από το μπάνιο.",
					english: "The kitchen is bigger than the bathroom.",
				},
			],
			details: [
				{
					label: "One-word forms in -τερος",
					text: "Some adjectives also have a one-word form in -τερος: ψηλότερος, taller; παλιότερος, older.",
				},
				{
					label: "Better and worse",
					text: "Two common ones have a form of their own: καλός gives καλύτερος, better, and κακός gives χειρότερος, worse, though πιο καλός is heard too.",
				},
				{
					label: "The most",
					text: "Put the article in front for the most: ο πιο όμορφος, ο καλύτερος. οι περισσότεροι, most people, is the same pattern with περισσότερος, more.",
					examples: [
						{
							greek: "Το καλοκαίρι είναι για πολλούς η πιο όμορφη εποχή του χρόνου.",
							english: "For many, summer is the most beautiful season of the year.",
							marks: [mark("Το καλοκαίρι", "nominative", "neuter"), mark("η πιο όμορφη εποχή", "nominative", "feminine")],
						},
						{
							greek: "Οι περισσότεροι άνθρωποι επιστρέφουν στις δουλειές τους.",
							english: "Most people go back to their jobs.",
							marks: [mark("Οι περισσότεροι άνθρωποι", "nominative", "masculine", true), mark("στις δουλειές", "accusative", "feminine", true)],
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
			rule: "Greek lines up its words for things, people, places and times in sets of three: a some-word (something, someone), a none-word (nothing, no one) and an every-word (everything, everyone). The table has one row per set. Most some-words start κάπ-. In a statement the none-words need δεν, not, before the verb, because Greek says not twice: κανένας δεν ξέρει, no one knows.",
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
				{ greek: "Κανένας δεν ξέρει.", english: "No one knows." },
				{ greek: "Σε ψάχνω παντού!", english: "I've been looking for you everywhere!" },
			],
			details: [
				{
					label: "κάποιος and κανένας",
					text: "κάποιος and κανένας change like adjectives: κάποια, κάποιο; καμία, κανένα. As the Target, the form for someone the action is done to, they are κάποιον and κανέναν.",
					examples: [{ greek: "Δεν είδα κανέναν πουθενά.", english: "I didn't see anyone anywhere." }],
				},
				{
					label: "κάθε",
					text: "κάθε, each or every, never changes: κάθε μέρα, κάθε μήνα, κάθε πρωί.",
				},
				{
					label: "Whatever, whoever, wherever",
					text: "For whatever, whoever and wherever, Greek has ό,τι, όποιος and όπου.",
				},
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
		{
			id: "all-whole",
			title: "όλος for all and the whole",
			rule: "όλος means all or the whole. It goes before the article, which stays, and it matches the noun like an adjective: όλος, όλη, όλο; όλοι, όλες, όλα.",
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
					english: "Many tourists from all over the world come to Greece.",
					marks: [
						mark("Πολλοί τουρίστες", "nominative", "masculine", true),
						mark("όλο τον κόσμο", "accusative", "masculine"),
						mark("στην Ελλάδα", "accusative", "feminine"),
					],
				},
			],
			details: [
				{
					label: "On its own",
					text: "On its own, όλοι means everyone and όλα means everything.",
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
