import type { Guide } from "@/types/guide";

export const FUTURE_COMMANDS_GUIDE: Guide = {
	slug: "future-commands",
	tone: "slate",
	title: "The short form: future, να and commands",
	greek: "Μέλλοντας, να και προστακτική",
	description: "θα, να and commands, with the short form or the present",
	idea: "The short form, built on the simple past's stem, follows θα and να for one action, and the present follows them for something ongoing. Commands make the same choice.",
	key: [
		{ label: "Present", tone: "olive" },
		{ label: "Simple past", tone: "terracotta" },
		{ label: "Simple future", tone: "ocean" },
		{ label: "Continuous, past or future", tone: "honey" },
	],
	sections: [
		{
			id: "future",
			tone: "ocean",
			title: "Simple future with θα and the short form",
			rule: [
				"For one action still to come, use the simple future: put θα in front of the short form, the one built on the simple past's stem.",
				"θα with the present form is the future continuous instead: θα διαβάζω is I'll be reading.",
			],
			table: {
				columns: [
					{ label: "Simple past", greek: true, tone: "terracotta" },
					{ label: "Simple future", greek: true, tone: "ocean" },
					{ label: "Future continuous", greek: true, tone: "honey" },
				],
				rows: [
					["έβαλα", "θα βάλω", "θα βάζω"],
					["έδωσα", "θα δώσω", "θα δίνω"],
					["είδα", "θα δω", "θα βλέπω"],
					["διάβασα", "θα διαβάσω", "θα διαβάζω"],
				],
			},
			examples: [
				{
					greek: "Αύριο θα βάλω το γάλα στο ψυγείο.",
					english: "Tomorrow I'll put the milk in the fridge.",
				},
				{
					greek: "Αύριο θα πάρω τηλέφωνο τον φίλο μου.",
					english: "Tomorrow I'll phone my friend.",
				},
				{ greek: "Αύριο θα διαβάζω όλη μέρα.", english: "Tomorrow I'll be reading all day." },
			],
			details: [
				{
					label: "Saying not",
					text: "To say not, put δεν before θα.",
					examples: [{ greek: "Δεν θα αργήσω.", english: "I won't be late." }],
				},
			],
			drills: ["verbs-future-formation", "verbs-future-sg1", "verbs-future-conjugation"],
		},
		{
			id: "short-form",
			tone: "ocean",
			title: "The short form or the present after να",
			rule: [
				"After να, the short form names one action. The short form is the one built on the simple past's stem: έφαγα, θα φάω.",
				"For something ongoing or habitual, να takes the present instead.",
			],
			table: {
				columns: [
					{ label: "One action", greek: true, tone: "ocean" },
					{ label: "Ongoing", greek: true, tone: "olive" },
					{ label: "Meaning" },
				],
				rows: [
					["να φάω", "να τρώω", "eat"],
					["να πιω", "να πίνω", "drink"],
					["να δουλέψω", "να δουλεύω", "work"],
					["να βοηθήσω", "να βοηθάω", "help"],
				],
			},
			examples: [
				{ greek: "Θέλω να φάω.", english: "I want to eat." },
				{ greek: "Μου αρέσει να τρώω.", english: "I like eating." },
				{ greek: "Το χόμπι μου είναι να μαγειρεύω.", english: "My hobby is cooking." },
				{ greek: "Μπορώ να βοηθήσω;", english: "Can I help?" },
			],
			details: [
				{
					label: "After πριν, όταν and αν",
					text: "πριν takes the short form for one action too. So do όταν and αν when they point to the future.",
					examples: [
						{ greek: "Διαβάζω πριν πάω για ύπνο.", english: "I read before I go to sleep." },
						{ greek: "Όταν έρθεις, θα φάμε μαζί.", english: "When you come, we'll eat together." },
					],
				},
				{
					label: "Saying not",
					text: "To say not, put μην after να.",
					examples: [{ greek: "Μπορείς να μην το πεις;", english: "Can you not say it?" }],
				},
				{
					label: "After seeing and hearing",
					text: "After a verb of seeing or hearing, να with the present describes an action in progress.",
					examples: [
						{
							greek: "Ακούω τον σκύλο να τραγουδάει σαν τον λύκο.",
							english: "I hear the dog singing like the wolf.",
						},
					],
				},
			],
			drills: ["verbs-modal-constructions"],
		},
		{
			id: "keep-shape",
			tone: "slate",
			title: "Verbs with no separate short form",
			rule: [
				"Most verbs make the simple future from θα and a short form, the form built on the simple past's stem: είδα, θα δω. A few everyday verbs have no separate short form, so θα goes straight in front of the present.",
				[
					"έχω, θέλω and ξέρω describe a state, which has no one-off version.",
					"κάνω and περιμένω have a short form identical to the present.",
				],
				"Their past is still a form of its own.",
			],
			table: {
				columns: [
					{ label: "Present", greek: true, tone: "olive" },
					{ label: "Past", greek: true, tone: "terracotta" },
					{ label: "Future", greek: true, tone: "ocean" },
					{ label: "Meaning" },
				],
				rows: [
					["έχω", "είχα", "θα έχω", "have"],
					["θέλω", "ήθελα", "θα θέλω", "want"],
					["ξέρω", "ήξερα", "θα ξέρω", "know"],
					["κάνω", "έκανα", "θα κάνω", "do, make"],
					["περιμένω", "περίμενα", "θα περιμένω", "wait"],
				],
			},
			examples: [
				{
					greek: "Περίμενα πολύ, αλλά θα περιμένω κι άλλο.",
					english: "I've waited a long time, but I'll wait a bit longer.",
				},
				{ greek: "Αύριο θα έχω χρόνο.", english: "Tomorrow I'll have time." },
			],
			drills: ["verbs-imperfect-stative"],
		},
		{
			id: "commands",
			tone: "navy",
			title: "Commands",
			rule: [
				"A command has two forms: one for one person, and one for several people, which is also the polite form.",
				"Most one-person commands are the short form, the one built on the simple past's stem, plus -ε, with the stress moving back: θα ακούσω → άκουσε. The several-people form ends in -τε.",
			],
			table: {
				columns: [
					{ label: "One person", greek: true },
					{ label: "Several, or polite", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["έλα", "ελάτε", "come"],
					["κάτσε", "καθίστε", "sit"],
					["δώσε", "δώστε", "give"],
					["φάε", "φάτε", "eat"],
					["άκουσε", "ακούστε", "listen"],
				],
			},
			examples: [
				{ greek: "Κλείσε την πόρτα, σε παρακαλώ.", english: "Close the door, please." },
				{ greek: "Σήκω πάνω!", english: "Stand up!" },
				{ greek: "Καθίστε, παρακαλώ.", english: "Please sit down." },
			],
			details: [
				{
					label: "Don't",
					text: "For don't, put μην before the you form: the present, or the short form for one action.",
					examples: [
						{ greek: "Μην φωνάζεις!", english: "Don't shout!" },
						{ greek: "Μην ξεχάσεις τα κλειδιά σου!", english: "Don't forget your keys!" },
					],
				},
				{
					label: "When μην keeps its ν",
					text: "Like δεν, μην keeps its ν before a vowel and before κ, π, τ, ξ, ψ, μπ, ντ, γκ, τσ, τζ, and often drops it before other consonants, though keeping it is widely accepted.",
				},
				{
					label: "Let's",
					text: "For let's, put ας in front of the we form of the short form: ας μιλήσουμε.",
					examples: [{ greek: "Ας κάνουμε λίγη εξάσκηση μαζί.", english: "Let's do a little practice together." }],
				},
			],
			drills: ["verbs-imperatives"],
		},
		{
			id: "command-aspect",
			tone: "honey",
			title: "One-off and ongoing commands",
			rule: [
				"Most commands are for one action and come from the short form, the one built on the simple past's stem: θα φάω → φάε.",
				"To tell someone to keep doing something, or to do it as a habit, build the command from the present instead. φάε is eat this now; τρώγε is keep eating, or eat as a rule.",
			],
			table: {
				columns: [
					{ label: "One-off", greek: true, tone: "ocean" },
					{ label: "Ongoing", greek: true, tone: "olive" },
					{ label: "Meaning" },
				],
				rows: [
					["φάε", "τρώγε", "eat"],
					["πιες", "πίνε", "drink"],
					["πες", "λέγε", "say"],
					["δες", "βλέπε", "see"],
					["βγες", "βγαίνε", "go out"],
					["δώσε", "δίνε", "give"],
				],
			},
			examples: [
				{ greek: "Πες μου τι έγινε.", english: "Tell me what happened." },
				{ greek: "Πίνε πολύ νερό.", english: "Drink plenty of water." },
			],
			details: [
				{
					label: "One-syllable commands",
					text: [
						"A one-syllable short form gives a one-syllable command:",
						[
							"θα πω → πες",
							"θα δω → δες",
							"θα βγω → βγες",
							"θα πιω → πιες",
						],
					],
				},
				{
					label: "φέρε and κοίτα",
					text: "φέρε is regular, from θα φέρω; κοίτα, from κοιτάζω, you learn as it is.",
				},
			],
			drills: ["verbs-imperatives"],
			plannedDrills: [
				{
					id: "verbs-imperative-aspect",
					title: "One-off or ongoing command",
					greek: "φάε · τρώγε · πες · λέγε",
					tests: "A card shows an English command marked as one action or as a habit; the one-off form (φάε) or the ongoing form (τρώγε) to match counts as right.",
				},
			],
		},
	],
	reference: [
		{ label: "Present", href: "/reference/verbs/present" },
		{ label: "Past", href: "/reference/verbs/past" },
		{ label: "Past continuous", href: "/reference/verbs/past-continuous" },
		{ label: "Future", href: "/reference/verbs/future" },
	],
};
