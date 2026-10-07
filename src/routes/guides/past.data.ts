import type { Guide } from "@/types/guide";

export const PAST_GUIDE: Guide = {
	slug: "past",
	tone: "terracotta",
	title: "The past",
	greek: "Το παρελθόν",
	description: "The simple past's endings and stem, and the past continuous",
	idea: "The simple past is one finished event, and most verbs make it by adding σ to the stem. The past continuous is something that was going on or used to happen.",
	key: [
		{ label: "Present", tone: "olive" },
		{ label: "Simple past", tone: "terracotta" },
		{ label: "Past continuous", tone: "honey" },
	],
	sections: [
		{
			id: "past-endings",
			tone: "terracotta",
			title: "Simple past endings and stress",
			rule: [
				"The simple past is one finished event: δούλεψα, I worked. Almost every verb takes the same endings on its past stem:",
				["-α, -ες, -ε for I, you and he, she or it", "-αμε, -ατε, -αν for we, you all and they"],
				"The stress stays three syllables from the end. The we and you-all forms are a syllable longer, so their stress moves along with it.",
				"A regular past too short to put its stress there gains an έ- in front: γράφω, έγραψα. The few that don't are in the section on verbs with a past of their own.",
			],
			table: {
				columns: [
					{ label: "Who" },
					{ label: "δουλεύω", greek: true, tone: "terracotta" },
					{ label: "γράφω", greek: true, tone: "terracotta" },
				],
				rows: [
					["I", "δούλεψα", "έγραψα"],
					["you", "δούλεψες", "έγραψες"],
					["he / she / it", "δούλεψε", "έγραψε"],
					["we", "δουλέψαμε", { text: "γράψαμε", note: 0 }],
					["you all", "δουλέψατε", { text: "γράψατε", note: 0 }],
					["they", "δούλεψαν", "έγραψαν"],
				],
				notes: ["The έ- is only there to carry the stress, so it drops when the stress moves on."],
			},
			examples: [
				{
					greek: "Χθες δουλέψαμε ως αργά.",
					english: "Yesterday we worked until late. (δούλεψα, but δουλέψαμε)",
				},
				{ greek: "Έγραψες στη Μαρία;", english: "Did you write to Maria?" },
			],
			drills: ["verbs-aorist-conjugation"],
		},
		{
			id: "past-shapes",
			tone: "navy",
			title: "The simple past stem: add σ",
			rule: [
				"Most verbs make their simple past stem by adding σ. ψ and ξ are just σ joined to the sound before it: ψ is a p-sound plus σ, and ξ is a k-sound plus σ.",
				"So the end of the present stem decides the letter:",
				[
					"σ after a vowel, and in place of ζ",
					"ψ in place of π, β, φ, or the v sound of -εύω",
					"ξ in place of κ, γ or χ",
				],
				"Most -άω and -ώ verbs add -ησ-. -ώνω and -χνω verbs, and some other -νω verbs, drop the ν first.",
			],
			table: {
				columns: [
					{ label: "Present", greek: true, tone: "olive" },
					{ label: "Simple past", greek: true, tone: "terracotta" },
					{ label: "Why" },
				],
				rows: [
					["ακούω", "άκουσα", "vowel + σ"],
					["μιλάω", "μίλησα", "-άω: -ησ-"],
					["δοκιμάζω", "δοκίμασα", "ζ → σ"],
					["πληρώνω", "πλήρωσα", "ν drops: -ωσ-"],
					["δουλεύω", "δούλεψα", "v + σ → ψ"],
					["γράφω", "έγραψα", "φ + σ → ψ"],
					["κόβω", "έκοψα", "β + σ → ψ"],
					["τρέχω", "έτρεξα", "χ + σ → ξ"],
					["ανοίγω", "άνοιξα", "γ + σ → ξ"],
					["ψάχνω", "έψαξα", "ν drops, χ + σ → ξ"],
				],
			},
			examples: [
				{
					greek: "Έψαξα παντού τα κλειδιά μου.",
					english: "I looked everywhere for my keys. (ψάχνω: χ + σ → ξ)",
				},
				{
					greek: "Πλήρωσα τον λογαριασμό με κάρτα.",
					english: "I paid the bill by card. (πληρώνω: the ν drops, then σ)",
				},
			],
			details: [
				{
					label: "Verbs in -νω",
					text: "Only some -νω verbs add σ: κλείνω → έκλεισα, φτάνω → έφτασα, χάνω → έχασα. Many common ones have a past of their own instead, set out in the next section.",
				},
				{
					label: "Verbs that take a different letter",
					text: [
						"A few verbs take a different letter from their neighbours:",
						[
							"some -ζω verbs take ξ: παίζω → έπαιξα, αλλάζω → άλλαξα",
							"some -άω verbs take -ασ- or -εσ-: γελάω → γέλασα, ξεχνάω → ξέχασα, φοράω → φόρεσα",
							"a few -ώ verbs take -εσ-: μπορώ → μπόρεσα, καλώ → κάλεσα",
						],
					],
				},
			],
			drills: ["verbs-aorist-formation"],
		},
		{
			id: "past-own",
			tone: "sunset",
			title: "Verbs with a past of their own",
			rule: [
				"Some of the most common verbs don't add σ, so learn their past with the verb. Most fall into a few groups:",
				[
					"-αίνω verbs of going in, out, up and down take -ηκ-",
					"other -αίνω verbs shorten the stem",
					"some take no σ, keeping their stem or changing it",
					"a few are one of a kind",
				],
				"Unlike a regular past, some of these take no έ- even when short: μπήκα, πήρα.",
			],
			table: {
				columns: [
					{ label: "Present", greek: true, tone: "olive" },
					{ label: "Simple past", greek: true, tone: "terracotta" },
					{ label: "Group" },
				],
				rows: [
					["μπαίνω", "μπήκα", "in, out, up, down: -ηκ-"],
					["βγαίνω", "βγήκα", "in, out, up, down: -ηκ-"],
					["μαθαίνω", "έμαθα", "other -αίνω: shorter"],
					["κάνω", "έκανα", "no σ, same stem"],
					["έχω", "είχα", "no σ, new stem"],
					["παίρνω", "πήρα", "no σ, new stem"],
					["μένω", "έμεινα", "no σ, new stem"],
					["πάω", "πήγα", "one of a kind"],
					["λέω", "είπα", "one of a kind"],
					["βλέπω", "είδα", "one of a kind"],
					["τρώω", "έφαγα", "one of a kind"],
					["πίνω", "ήπια", "one of a kind"],
				],
			},
			examples: [
				{
					greek: "Μπήκα στο λεωφορείο και κατέβηκα στο κέντρο.",
					english: "I got on the bus and got off in the centre.",
				},
				{ greek: "Τι έφαγες χθες το βράδυ;", english: "What did you eat last night?" },
			],
			details: [
				{
					label: "More in each group",
					text: [
						"The groups hold more verbs than the table shows:",
						[
							"-ηκ-: ανεβαίνω → ανέβηκα, κατεβαίνω → κατέβηκα, and βρίσκω → βρήκα, though it is not an -αίνω verb",
							"shorter: καταλαβαίνω → κατάλαβα",
							"no σ: βάζω → έβαλα, φέρνω → έφερα; δίνω → έδωσα changes its stem but keeps the σ",
							"one of a kind: έρχομαι → ήρθα, φεύγω → έφυγα",
						],
					],
				},
			],
			drills: ["verbs-aorist-sg1", "verbs-aorist-stems"],
		},
		{
			id: "ongoing-past",
			tone: "honey",
			title: "Past continuous for was doing and used to do",
			rule: [
				"For something ongoing or habitual in the past, use the past continuous rather than the simple past. σπούδασα is I studied; σπούδαζα is I was studying, or I used to study.",
				"Build it from the present stem with the simple past's endings: σπουδάζω → σπούδαζα.",
			],
			table: {
				columns: [
					{ label: "Present", greek: true, tone: "olive" },
					{ label: "Past continuous", greek: true, tone: "honey" },
					{ label: "Simple past", greek: true, tone: "terracotta" },
					{ label: "Meaning" },
				],
				rows: [
					["σπουδάζω", "σπούδαζα", "σπούδασα", "study"],
					["παίζω", "έπαιζα", "έπαιξα", "play"],
					["μιλάω", { text: "μιλούσα", note: 0 }, "μίλησα", "speak"],
					["μπορώ", { text: "μπορούσα", note: 0 }, "μπόρεσα", "can"],
					["τρώω", { text: "έτρωγα", note: 1 }, "έφαγα", "eat"],
				],
				notes: [
					"Verbs in -άω and -ώ usually take -ούσα instead.",
					"τρώω adds a γ, as λέω and ακούω do: έλεγα, άκουγα.",
				],
			},
			examples: [
				{
					greek: "Σπούδαζα αρχιτεκτονική, αλλά απέτυχα.",
					english: "I was studying architecture, but I failed. (σπούδαζα went on; απέτυχα happened once)",
				},
				{
					greek: "Όταν ήμουν παιδί, έπαιζα ποδόσφαιρο.",
					english: "When I was a child, I used to play football.",
				},
			],
			details: [
				{
					label: "Stress and the added έ-",
					text: "As in the simple past, the stress sits three syllables from the end, and a short verb gains έ- to carry it: παίζω → έπαιζα.",
				},
			],
			drills: ["verbs-tense-recognition", "verbs-imperfect-stative"],
		},
	],
	reference: [
		{ label: "Present", href: "/reference/verbs/present" },
		{ label: "Past", href: "/reference/verbs/past" },
		{ label: "Past continuous", href: "/reference/verbs/past-continuous" },
		{ label: "Future", href: "/reference/verbs/future" },
	],
};
