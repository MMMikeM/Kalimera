import type { Guide } from "@/types/guide";

export const VERBS_GUIDE: Guide = {
	slug: "verbs",
	tone: "stone",
	title: "Verbs: present, past, future",
	greek: "Ρήματα",
	description: "Every verb as present, simple past and simple future",
	idea: "Learn every verb as three forms: present, simple past and simple future. The simple past and the simple future share one shape, so knowing one gives you the other.",
	key: [
		{ label: "Present", tone: "olive" },
		{ label: "Simple past", tone: "terracotta" },
		{ label: "Simple future", tone: "ocean" },
		{ label: "Continuous, past or future", tone: "honey" },
	],
	sections: [
		{
			id: "ladder",
			tone: "navy",
			title: "Every verb has three forms",
			rule: "The present is the everyday form. The simple past is one finished event. The simple future is θα plus a short form, and that short form has the same shape as the simple past: know είδα and you can predict θα δω.",
			table: {
				columns: [
					{ label: "Present", greek: true, tone: "olive" },
					{ label: "Simple past", greek: true, tone: "terracotta" },
					{ label: "Simple future", greek: true, tone: "ocean" },
					{ label: "Meaning" },
				],
				rows: [
					[{ text: "βλέπω", weight: "anchor" }, "είδα", "θα δω", "see"],
					[{ text: "τρώω", weight: "anchor" }, "έφαγα", "θα φάω", "eat"],
					[{ text: "πίνω", weight: "anchor" }, "ήπια", "θα πιω", "drink"],
					[{ text: "λέω", weight: "anchor" }, "είπα", "θα πω", "say"],
				],
			},
			examples: [
				{
					greek: "Χθες είδα μια ταινία, αύριο θα δω άλλη.",
					english: "Yesterday I saw a film, tomorrow I'll see another.",
				},
			],
			drills: ["verbs-tense-ladder"],
		},
		{
			id: "eimai",
			tone: "sunset",
			title: "είμαι: am, was, will be",
			rule: "είμαι is the verb you will use most, and it follows no pattern. Every past form starts with ή-. The future is θα in front of the present form, because είμαι has no short form.",
			table: {
				columns: [
					{ label: "Who" },
					{ label: "Present", greek: true, tone: "olive" },
					{ label: "Past", greek: true, tone: "terracotta" },
					{ label: "Future", greek: true, tone: "ocean" },
				],
				rows: [
					[
						"I",
						{ text: "είμαι", weight: "anchor" },
						{ text: "ήμουν", weight: "anchor" },
						{ text: "θα είμαι", weight: "anchor" },
					],
					["you", "είσαι", "ήσουν", "θα είσαι"],
					["he / she / it", "είναι", "ήταν", "θα είναι"],
					["we", "είμαστε", "ήμασταν", "θα είμαστε"],
					["you all", "είστε", "ήσασταν", "θα είστε"],
					["they", "είναι", "ήταν", "θα είναι"],
				],
			},
			examples: [
				{ greek: "Ήμουν στην Ολλανδία πρόπερσι.", english: "I was in Holland two years ago." },
				{ greek: "Προχτές ήταν Τετάρτη.", english: "The day before yesterday was Wednesday." },
				{ greek: "Αύριο θα είναι Σάββατο.", english: "Tomorrow will be Saturday." },
			],
			confuse: {
				text: "ήταν (was) and όταν (when) sound almost the same. Ή- means was, like ήμουν and ήσουν; ό- means when, like πότε and τότε.",
				section: "joining/when-why",
			},
			drills: ["verbs-eimai-present", "verbs-eimai-past", "verbs-eimai-future"],
		},
		{
			id: "keep-shape",
			tone: "slate",
			title: "Verbs that keep their shape",
			rule: "A few everyday verbs have no separate short form, so θα goes straight in front of the everyday form. έχω, θέλω and ξέρω describe a state, which has no one-off version; κάνω and περιμένω simply have a short form identical to the present. Their past is still a form of its own.",
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
					english: "I waited a lot, but I'll wait some more.",
				},
			],
			drills: ["verbs-imperfect-stative"],
		},
		{
			id: "present",
			tone: "olive",
			title: "Present: the endings",
			rule: "Most verbs end in -ω and share one set of endings. Verbs in -άω share a second set. A few short verbs, like πάω and τρώω, follow neither: learn them whole.",
			table: {
				columns: [
					{ label: "Who" },
					{ label: "-ω", greek: true, tone: "olive" },
					{ label: "-άω", greek: true, tone: "olive" },
					{ label: "πάω", greek: true, tone: "olive" },
					{ label: "τρώω", greek: true, tone: "olive" },
				],
				rows: [
					[
						"I",
						{ text: "γράφω", weight: "anchor" },
						{ text: "μιλάω", weight: "anchor" },
						{ text: "πάω", weight: "anchor" },
						{ text: "τρώω", weight: "anchor" },
					],
					["you", "γράφεις", "μιλάς", "πας", "τρως"],
					["he / she / it", "γράφει", "μιλάει", "πάει", "τρώει"],
					["we", "γράφουμε", "μιλάμε", "πάμε", "τρώμε"],
					["you all", "γράφετε", "μιλάτε", "πάτε", "τρώτε"],
					["they", "γράφουν", "μιλάνε", "πάνε", "τρώνε"],
				],
			},
			examples: [
				{ greek: "Ακούω μουσική.", english: "I listen to music." },
				{ greek: "Πεινάω.", english: "I'm hungry." },
				{ greek: "Πάω σινεμά.", english: "I go to the cinema." },
			],
			drills: [
				"verbs-conjugation-endings",
				"verbs-present-irregular",
				"verbs-vocabulary-sg1",
				"verbs-present",
			],
		},
		{
			id: "past-shapes",
			tone: "terracotta",
			title: "Simple past, by family",
			rule: "The simple past endings are the same for every verb: -α, -ες, -ε, -αμε, -ατε, -αν. What changes is the stem, and stems come in families, so learn the family rather than the verb. A past too short to carry its stress gains an έ- in front: έβαλα, έδωσα.",
			table: {
				columns: [
					{ label: "Present", greek: true, tone: "olive" },
					{ label: "Simple past", greek: true, tone: "terracotta" },
					{ label: "Simple future", greek: true, tone: "ocean" },
					{ label: "Family" },
				],
				rows: [
					["δοκιμάζω", "δοκίμασα", "θα δοκιμάσω", "-ζω takes -σ-"],
					["μιλάω", "μίλησα", "θα μιλήσω", "-άω takes -ησ-"],
					["βγαίνω", "βγήκα", "θα βγω", "-αίνω takes -ηκ-"],
					["βάζω", "έβαλα", "θα βάλω", "ζ becomes λ"],
					["δίνω", "έδωσα", "θα δώσω", "new stem"],
					["παίρνω", "πήρα", "θα πάρω", "new stem"],
					["βλέπω", { text: "είδα", weight: "deviate" }, "θα δω", "one of a kind"],
					["τρώω", { text: "έφαγα", weight: "deviate" }, "θα φάω", "one of a kind"],
					["έρχομαι", { text: "ήρθα", weight: "deviate" }, "θα έρθω", "one of a kind"],
				],
			},
			examples: [
				{
					greek: "Χθες έβαλα τα κλειδιά στην τσάντα.",
					english: "Yesterday I put the keys in the bag.",
				},
				{
					greek: "Βγήκα έξω και μετά μπήκα στο σπίτι.",
					english: "I went out and then I went into the house.",
				},
				{ greek: "Τι έφαγες χθες το βράδυ;", english: "What did you eat last night?" },
			],
			drills: [
				"verbs-aorist-stems",
				"verbs-aorist-formation",
				"verbs-aorist-sg1",
				"verbs-aorist-conjugation",
			],
		},
		{
			id: "future",
			tone: "ocean",
			title: "Simple future: θα with the short form",
			rule: "For one action still to come, put θα in front of the short form, the one shaped like the simple past. θα with the present form is the future continuous instead: θα διαβάζω is I'll be reading.",
			table: {
				columns: [
					{ label: "Simple past", greek: true, tone: "terracotta" },
					{ label: "Simple future", greek: true, tone: "ocean" },
					{ label: "Future continuous", greek: true, tone: "honey" },
				],
				rows: [
					["έβαλα", { text: "θα βάλω", weight: "anchor" }, "θα βάζω"],
					["έδωσα", { text: "θα δώσω", weight: "anchor" }, "θα δίνω"],
					["είδα", { text: "θα δω", weight: "anchor" }, "θα βλέπω"],
					["διάβασα", { text: "θα διαβάσω", weight: "anchor" }, "θα διαβάζω"],
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
				{ greek: "Δεν θα υπάρχει κανένα αυτοκίνητο.", english: "There won't be a single car." },
			],
			drills: ["verbs-future-formation", "verbs-future-sg1", "verbs-future-conjugation"],
		},
		{
			id: "short-form",
			tone: "ocean",
			title: "The same short form after να, πριν and ίσως",
			rule: "The simple future's short form is not only for the future. After να, πριν and ίσως you use it too, so one form does four jobs.",
			table: {
				columns: [
					{ label: "Greek", greek: true, tone: "ocean" },
					{ label: "Meaning" },
				],
				rows: [
					[{ text: "θα βοηθήσω", weight: "anchor" }, "I'll help"],
					["μπορώ να βοηθήσω;", "can I help?"],
					["πρέπει να δουλέψω", "I have to work"],
					["πριν πάω για ύπνο", "before I go to sleep"],
					["ίσως πάω", "maybe I'll go"],
				],
			},
			examples: [
				{ greek: "Διαβάζω πριν πάω για ύπνο.", english: "I read before I go to sleep." },
			],
			drills: ["verbs-modal-constructions"],
		},
		{
			id: "mai-verbs",
			tone: "stone",
			title: "Verbs ending in -μαι",
			rule: "Some verbs end in -μαι yet have an ordinary meaning: έρχομαι (I come), κάθομαι (I sit), παντρεύομαι (I get married). They take their own endings. Many make the past with -θηκα or -τηκα; a few, like έρχομαι → ήρθα, are one of a kind.",
			table: {
				columns: [
					{ label: "Who" },
					{ label: "Present", greek: true, tone: "olive" },
					{ label: "Simple past", greek: true, tone: "terracotta" },
				],
				rows: [
					[
						"I",
						{ text: "παντρεύομαι", weight: "anchor" },
						{ text: "παντρεύτηκα", weight: "anchor" },
					],
					["you", "παντρεύεσαι", "παντρεύτηκες"],
					["he / she", "παντρεύεται", "παντρεύτηκε"],
					[
						"we",
						{ text: "παντρευόμαστε", weight: "deviate" },
						{ text: "παντρευτήκαμε", weight: "deviate" },
					],
					["you all", "παντρεύεστε", { text: "παντρευτήκατε", weight: "deviate" }],
					["they", "παντρεύονται", "παντρεύτηκαν"],
				],
			},
			examples: [
				{ greek: "Πού γεννήθηκες;", english: "Where were you born?" },
				{ greek: "Κουρεύτηκα.", english: "I got a haircut." },
			],
			drills: [],
		},
		{
			id: "ongoing-past",
			tone: "honey",
			title: "Past continuous: was doing, used to do",
			rule: "The simple past is for one finished event. For something ongoing or habitual in the past, use the past continuous: σπούδασα is I studied, σπούδαζα is I was studying or I used to study.",
			table: {
				columns: [
					{ label: "Simple past", greek: true, tone: "terracotta" },
					{ label: "Past continuous", greek: true, tone: "honey" },
					{ label: "Meaning" },
				],
				rows: [
					["σπούδασα", "σπούδαζα", "study"],
					["έπαιξα", "έπαιζα", "play"],
					["μίλησα", "μιλούσα", "speak"],
					["έφαγα", "έτρωγα", "eat"],
				],
			},
			examples: [
				{
					greek: "Σπούδαζα αρχιτεκτονική, αλλά απέτυχα.",
					english: "I was studying architecture, but I failed.",
				},
				{ greek: "Έπαιζα με τους φίλους μου.", english: "I used to play with my friends." },
			],
			drills: ["verbs-tense-recognition"],
		},
		{
			id: "commands",
			tone: "navy",
			title: "Commands",
			rule: "A command has its own short form. There is one form for one person and another for several people, which is also the polite form. To tell someone not to do something, use μην with the everyday form.",
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
				],
			},
			examples: [
				{ greek: "Μην φωνάζεις!", english: "Don't shout!" },
				{ greek: "Σήκω πάνω!", english: "Stand up!" },
			],
			drills: ["verbs-imperatives"],
		},
	],
	reference: [
		{ label: "Present", href: "/reference/verbs/present" },
		{ label: "Past", href: "/reference/verbs/past" },
		{ label: "Past continuous", href: "/reference/verbs/past-continuous" },
		{ label: "Future", href: "/reference/verbs/future" },
	],
};
