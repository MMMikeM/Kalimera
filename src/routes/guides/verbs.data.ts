import type { Guide } from "@/types/guide";

export const VERBS_GUIDE: Guide = {
	slug: "verbs",
	tone: "stone",
	title: "Verbs and the present",
	greek: "Ρήματα",
	description: "Every verb's three forms, and the present endings",
	idea: "Learn every verb as three forms: present, simple past and simple future. Then learn the present's endings, which show who does it and come in a few sets.",
	key: [
		{ label: "Present", tone: "olive" },
		{ label: "Simple past", tone: "terracotta" },
		{ label: "Simple future", tone: "ocean" },
	],
	sections: [
		{
			id: "ladder",
			tone: "navy",
			title: "Every verb has three forms",
			rule: [
				"Learn every verb as three forms:",
				[
					"the present, the everyday form: γράφω, I write",
					"the simple past, for one finished event: έγραψα, I wrote",
					"the simple future, for one event still to come: θα γράψω, I'll write",
				],
				"The simple future is θα plus the verb's short form, here γράψω. For most verbs the short form is built on the simple past's stem, so the simple past tells you the simple future: έγραψα, θα γράψω.",
				"The commonest verbs change their stem from the present, so learn them as sets of three, as in the rest of the table. A few, such as έχω, have no separate short form; they are set out in The short form: future, να and commands, under Verbs with no separate short form.",
			],
			table: {
				columns: [
					{ label: "Present", greek: true, tone: "olive" },
					{ label: "Simple past", greek: true, tone: "terracotta" },
					{ label: "Simple future", greek: true, tone: "ocean" },
					{ label: "Meaning" },
				],
				rows: [
					["γράφω", "έγραψα", "θα γράψω", "write"],
					["βλέπω", "είδα", "θα δω", "see"],
					["τρώω", "έφαγα", "θα φάω", "eat"],
					["πίνω", "ήπια", "θα πιω", "drink"],
					["λέω", "είπα", "θα πω", "say"],
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
			title: "είμαι in the present, past and future",
			rule: [
				"είμαι is the verb you will use most, and it follows no pattern. Every past form starts with ή-.",
				"It has no short form, the form most verbs take after θα, so its future is θα in front of the present: θα είμαι. έχω works the same way.",
			],
			table: {
				columns: [
					{ label: "Who" },
					{ label: "Present", greek: true, tone: "olive" },
					{ label: "Past", greek: true, tone: "terracotta" },
					{ label: "Future", greek: true, tone: "ocean" },
				],
				rows: [
					["I", "είμαι", "ήμουν", "θα είμαι"],
					["you", "είσαι", "ήσουν", "θα είσαι"],
					["he / she / it", "είναι", "ήταν", "θα είναι"],
					["we", "είμαστε", "ήμασταν", "θα είμαστε"],
					["you all", "είστε", "ήσασταν", "θα είστε"],
					["they", "είναι", "ήταν", "θα είναι"],
				],
			},
			examples: [
				{ greek: "Ήμουν στην Ολλανδία πρόπερσι.", english: "I was in Holland the year before last." },
				{ greek: "Προχτές ήταν Τετάρτη.", english: "The day before yesterday was Wednesday." },
				{ greek: "Αύριο θα είναι Σάββατο.", english: "Tomorrow will be Saturday." },
			],
			confuse: {
				text: "ήταν (was) and όταν (when) rhyme. The ή- of was is the ή- of ήμουν and ήσουν; όταν belongs with πότε and τότε.",
				section: "joining/when-why",
			},
			drills: ["verbs-eimai-present", "verbs-eimai-past", "verbs-eimai-future"],
		},
		{
			id: "present",
			tone: "olive",
			title: "Present endings",
			rule: [
				"The present says what happens now or as a habit. Its ending shows who does it. Verbs in -ω take one of three sets of endings:",
				[
					"most share the set of γράφω",
					"verbs in -άω share the set of μιλάω",
					"a small family of short verbs shares a third, shown here by πάω and τρώω",
				],
				"Verbs in a stressed -ώ and verbs in -μαι have sets of their own, in the sections that follow.",
			],
			table: {
				columns: [
					{ label: "Who" },
					{ label: "-ω", greek: true, tone: "olive" },
					{ label: "-άω", greek: true, tone: "olive" },
					{ label: "πάω", greek: true, tone: "olive" },
					{ label: "τρώω", greek: true, tone: "olive" },
				],
				rows: [
					["I", "γράφω", "μιλάω", "πάω", "τρώω"],
					["you", "γράφεις", "μιλάς", "πας", "τρως"],
					["he / she / it", "γράφει", "μιλάει", "πάει", "τρώει"],
					["we", "γράφουμε", "μιλάμε", "πάμε", "τρώμε"],
					["you all", "γράφετε", "μιλάτε", "πάτε", "τρώτε"],
					["they", "γράφουν", "μιλάνε", "πάνε", "τρώνε"],
				],
			},
			examples: [
				{ greek: "Πεινάω.", english: "I'm hungry. (-άω, like μιλάω)" },
				{ greek: "Πάω σινεμά.", english: "I go to the cinema." },
			],
			details: [
				{
					label: "ακούω, λέω and κλαίω",
					text: "These belong to the family of πάω and τρώω, not to the -ω set: ακούς, ακούει and λες, λέει, not ακούεις.",
					examples: [{ greek: "Με ακούς;", english: "Can you hear me?" }],
				},
				{
					label: "πάω and πηγαίνω",
					text: "πάω has a longer form, πηγαίνω, which takes the -ω endings: πηγαίνεις, πηγαίνει. Both are everyday Greek.",
					examples: [{ greek: "Πηγαίνεις συχνά στη θάλασσα;", english: "Do you often go to the sea?" }],
				},
			],
			drills: [
				"verbs-conjugation-endings",
				"verbs-present-irregular",
				"verbs-vocabulary-sg1",
				"verbs-present",
			],
		},
		{
			id: "o-verbs",
			tone: "sunset",
			title: "Verbs in -ώ, like μπορώ",
			rule: "Some verbs end in a stressed -ώ and take their own endings, stressed on the ending throughout. τηλεφωνώ, προσπαθώ and συμφωνώ follow μπορώ and οδηγώ in the table.",
			table: {
				columns: [
					{ label: "Who" },
					{ label: "μπορώ", greek: true, tone: "olive" },
					{ label: "οδηγώ", greek: true, tone: "olive" },
				],
				rows: [
					["I", "μπορώ", "οδηγώ"],
					["you", "μπορείς", "οδηγείς"],
					["he / she / it", "μπορεί", "οδηγεί"],
					["we", "μπορούμε", "οδηγούμε"],
					["you all", "μπορείτε", "οδηγείτε"],
					["they", "μπορούν", "οδηγούν"],
				],
			},
			examples: [
				{ greek: "Μπορείς να μου πεις;", english: "Can you tell me?" },
				{ greek: "Ποιος οδηγεί σήμερα;", english: "Who's driving today? (οδηγεί, like μπορεί)" },
			],
			details: [
				{
					label: "μιλώ and μιλάω",
					text: "Not every -ώ belongs here: μιλώ is a shorter way of saying μιλάω, and keeps the -άω endings, μιλάς and μιλάει.",
				},
			],
			drills: ["verbs-conjugation-endings"],
		},
		{
			id: "mai-verbs",
			tone: "stone",
			title: "Verbs ending in -μαι",
			rule: [
				"Some everyday verbs end in -μαι and take their own endings. The table shows them on παντρεύομαι, I get married. Others are:",
				["έρχομαι, I come", "κάθομαι, I sit", "σκέφτομαι, I think"],
				"Most make the simple past in -ηκα, often -θηκα or -τηκα: παντρεύτηκα. Their simple future swaps -ηκα for -ώ: σκέφτηκα → θα σκεφτώ, χάρηκα → θα χαρώ.",
			],
			table: {
				columns: [
					{ label: "Who" },
					{ label: "Present", greek: true, tone: "olive" },
					{ label: "Simple past", greek: true, tone: "terracotta" },
				],
				rows: [
					["I", "παντρεύομαι", "παντρεύτηκα"],
					["you", "παντρεύεσαι", "παντρεύτηκες"],
					["he / she / it", "παντρεύεται", "παντρεύτηκε"],
					["we", "παντρευόμαστε", "παντρευτήκαμε"],
					["you all", "παντρεύεστε", "παντρευτήκατε"],
					["they", "παντρεύονται", "παντρεύτηκαν"],
				],
			},
			examples: [
				{ greek: "Πού γεννήθηκες;", english: "Where were you born? (γεννιέμαι: -θηκα)" },
				{ greek: "Κουρεύτηκα.", english: "I got a haircut. (κουρεύομαι: -τηκα)" },
				{ greek: "Θα το σκεφτώ.", english: "I'll think about it. (σκέφτηκα → θα σκεφτώ)" },
			],
			details: [
				{
					label: "Stress in the we and you-all forms",
					text: "As in the simple past, the stress cannot sit further back than three syllables from the end. So in the present's we form, and in the simple past's we and you-all forms, it moves one syllable towards the ending: παντρευόμαστε, παντρευτήκαμε, παντρευτήκατε.",
				},
				{
					label: "π becomes φ",
					text: "In the simple past and simple future, a π before τ turns into φ: επισκέπτομαι → επισκέφτηκα.",
				},
				{
					label: "έρχομαι and κάθομαι",
					text: "έρχομαι and κάθομαι don't take -ηκα: ήρθα → θα έρθω, κάθισα → θα καθίσω.",
				},
				{
					label: "The past continuous",
					text: "The past continuous, for was doing or used to do, ends in -όμουν: σκεφτόμουν, I was thinking.",
				},
			],
			drills: ["verbs-conjugation-endings"],
		},
		{
			id: "amai-verbs",
			tone: "slate",
			title: "Verbs in -άμαι, like θυμάμαι",
			rule: [
				"Most verbs whose I form ends in -μαι, like έρχομαι, are stressed before the ending. A few end in a stressed -άμαι instead:",
				["θυμάμαι, I remember", "κοιμάμαι, I sleep", "φοβάμαι, I'm afraid"],
				"Their simple past ends in -ήθηκα, so, like other -ηκα pasts, their simple future ends in -ηθώ: κοιμήθηκα, θα κοιμηθώ.",
			],
			table: {
				columns: [
					{ label: "Who" },
					{ label: "Present", greek: true, tone: "olive" },
					{ label: "Simple future", greek: true, tone: "ocean" },
				],
				rows: [
					["I", "θυμάμαι", "θα θυμηθώ"],
					["you", "θυμάσαι", "θα θυμηθείς"],
					["he / she / it", "θυμάται", "θα θυμηθεί"],
					["we", { text: "θυμόμαστε", note: 0 }, "θα θυμηθούμε"],
					["you all", "θυμάστε", "θα θυμηθείτε"],
					["they", { text: "θυμούνται", note: 0 }, "θα θυμηθούν"],
				],
				notes: [
					"The ending's vowel changes in the we and they forms: -όμαστε, -ούνται.",
				],
			},
			examples: [
				{ greek: "Δεν θυμάμαι.", english: "I don't remember." },
				{ greek: "Συνήθως κοιμάμαι τα μεσάνυχτα.", english: "I usually go to sleep at midnight." },
				{ greek: "Χθες το βράδυ κοιμήθηκα νωρίς.", english: "Last night I went to bed early." },
			],
			details: [
				{
					label: "-ιέμαι and -ούμαι",
					text: "Two smaller sets are stressed on the ending too: -ιέμαι, as in γεννιέμαι (I am born), and -ούμαι, as in ασχολούμαι (I deal with), whose you form is ασχολείσαι.",
					examples: [{ greek: "Με τι ασχολείσαι;", english: "What do you do?" }],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "verbs-amai-forms",
					title: "-άμαι verbs",
					greek: "θυμάμαι · θυμόμαστε · θα θυμηθώ",
					tests: "A card names an -άμαι verb, a person and the present or simple future; the matching form, such as θυμόμαστε or θα θυμηθούμε, counts as right.",
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
