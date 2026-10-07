import type { Guide } from "@/types/guide";

export const FUTURE_COMMANDS_GUIDE: Guide = {
	slug: "future-commands",
	tone: "slate",
	title: "The short form: future, να and commands",
	greek: "Μέλλοντας, να και προστακτική",
	description: "θα, να and commands, with the short form or the present",
	idea: "θα and να take the short form for one action and the present for something ongoing. Commands make the same choice.",
	key: [
		{ label: "Present", tone: "olive" },
		{ label: "Short form", tone: "ocean" },
		{ label: "Future continuous", tone: "honey" },
	],
	sections: [
		{
			id: "future",
			tone: "ocean",
			title: "Simple future with θα and the short form",
			rule: [
				"For one action still to come, use the simple future: θα in front of the short form, as in θα διαβάσω, I'll read. How to find a verb's short form is set out in Verbs and the present, under Every verb has three forms.",
				"θα with the present is the future continuous instead: θα διαβάζω, I'll be reading.",
				"For won't, δεν goes in front of θα, as set out in How often, how many, how much, under Saying not twice with δεν.",
			],
			table: {
				columns: [
					{ label: "Simple future", greek: true, tone: "ocean" },
					{ label: "Future continuous", greek: true, tone: "honey" },
					{ label: "Meaning" },
				],
				rows: [
					["θα διαβάσω", "θα διαβάζω", "read"],
					["θα βάλω", "θα βάζω", "put"],
					["θα δώσω", "θα δίνω", "give"],
					["θα δω", "θα βλέπω", "see"],
				],
			},
			examples: [
				{
					greek: "Αύριο θα διαβάσω το βιβλίο.",
					english: "Tomorrow I'll read the book. (one action)",
				},
				{ greek: "Αύριο θα διαβάζω όλη μέρα.", english: "Tomorrow I'll be reading all day. (going on)" },
				{
					greek: "Αύριο θα βάλω το γάλα στο ψυγείο.",
					english: "Tomorrow I'll put the milk in the fridge.",
				},
			],
			drills: ["verbs-future-formation", "verbs-future-sg1", "verbs-future-conjugation"],
		},
		{
			id: "short-form",
			tone: "sunset",
			title: "The short form or the present after να",
			rule: [
				"After να, use the short form for one action: the same form θα takes, as in θα φάω, να φάω.",
				"For something ongoing or habitual, να takes the present instead.",
				"For not, μην goes after να, as set out in How often, how many, how much, under δεν, όχι or μην.",
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
				{ greek: "Θέλω να φάω.", english: "I want to eat. (now: one action)" },
				{ greek: "Μου αρέσει να τρώω.", english: "I like eating. (in general: ongoing)" },
				{ greek: "Μπορώ να βοηθήσω;", english: "Can I help? (βοηθάω becomes βοηθήσω)" },
			],
			details: [
				{
					label: "After όταν, αν and πριν",
					text: "όταν and αν take the short form too when they point to the future. πριν does too, as set out in Joining ideas with when, why and if, under πριν and μετά.",
					examples: [
						{ greek: "Όταν έρθεις, θα φάμε μαζί.", english: "When you come, we'll eat together. (έρθεις, not έρχεσαι)" },
					],
				},
				{
					label: "After seeing and hearing",
					text: "After a verb of seeing or hearing, να with the present describes an action in progress.",
					examples: [
						{
							greek: "Βλέπω τα παιδιά να παίζουν.",
							english: "I see the children playing.",
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
				"A few everyday verbs have no separate short form, so θα and να go straight in front of the present: θα έχω, να έχω. είμαι works the same way.",
				[
					"έχω, θέλω and ξέρω describe a state, which has no one-off version.",
					"κάνω and περιμένω have a short form identical to the present.",
				],
				"Their past is still a form of its own.",
			],
			table: {
				columns: [
					{ label: "Present", greek: true, tone: "olive" },
					{ label: "Past", greek: true },
					{ label: "Future", greek: true, tone: "olive" },
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
				"Most one-person commands are the short form, the one θα takes, with -ε in place of -ω, with the stress moving back: θα ακούσω → άκουσε. The several-people form ends in -τε.",
			],
			table: {
				columns: [
					{ label: "One person", greek: true },
					{ label: "Several, or polite", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["άκουσε", "ακούστε", "listen"],
					["δώσε", "δώστε", "give"],
					["φάε", "φάτε", "eat"],
					[{ text: "έλα", note: 0 }, { text: "ελάτε", note: 0 }, "come"],
					[{ text: "κάτσε", note: 1 }, "καθίστε", "sit"],
				],
				notes: [
					"έλα and ελάτε, from έρχομαι, don't come from its short form θα έρθω; learn them as they are.",
					"κάθομαι has two short forms, θα κάτσω and θα καθίσω. κάτσε comes from the first, καθίστε from the second.",
				],
			},
			examples: [
				{ greek: "Κλείσε την πόρτα, σε παρακαλώ.", english: "Close the door, please. (θα κλείσω → κλείσε)" },
				{ greek: "Καθίστε, παρακαλώ.", english: "Please sit down. (to several people, or politely)" },
			],
			details: [
				{
					label: "Don't",
					text: "For don't, put μην, or μη before some consonants, in front of the you form: the present, or the short form for one action. When the ν stays is set out in Who does what, under the article.",
					examples: [
						{ greek: "Μη φωνάζεις!", english: "Don't shout! (present: stop shouting)" },
						{ greek: "Μην ξεχάσεις τα κλειδιά σου!", english: "Don't forget your keys! (short form: this once)" },
					],
				},
				{
					label: "Let's",
					text: "For let's, put ας in front of the we form of the short form: ας μιλήσουμε.",
					examples: [{ greek: "Ας μιλήσουμε ελληνικά.", english: "Let's speak Greek. (μιλήσουμε, not μιλάμε)" }],
				},
			],
			drills: ["verbs-imperatives"],
		},
		{
			id: "command-aspect",
			tone: "honey",
			title: "One-off and ongoing commands",
			rule: [
				"A command built on the short form, such as φάε from θα φάω, is for one action.",
				"To tell someone to keep doing something, or to do it as a habit, build the command from the present instead. φάε is eat this now; τρώγε is keep eating, or eat as a rule.",
			],
			table: {
				columns: [
					{ label: "One-off", greek: true, tone: "ocean" },
					{ label: "Ongoing", greek: true, tone: "olive" },
					{ label: "Meaning" },
				],
				rows: [
					["φάε", { text: "τρώγε", note: 0 }, "eat"],
					["πιες", "πίνε", "drink"],
					["πες", { text: "λέγε", note: 0 }, "say"],
					["δες", "βλέπε", "see"],
					["βγες", "βγαίνε", "go out"],
					["δώσε", "δίνε", "give"],
				],
				notes: ["τρώω and λέω add a γ, as in the past continuous έτρωγα and έλεγα."],
			},
			examples: [
				{ greek: "Πες μου τι έγινε.", english: "Tell me what happened. (one action)" },
				{ greek: "Πίνε πολύ νερό.", english: "Drink plenty of water. (as a habit)" },
			],
			details: [
				{
					label: "One-syllable commands",
					text: [
						"A one-syllable short form gives a one-syllable command, ending in -ς instead of -ε:",
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
					text: "φέρε is the regular one-off command, from θα φέρω; its ongoing form is φέρνε. κοίτα, from κοιτάζω, you learn as it is.",
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
