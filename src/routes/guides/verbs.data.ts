import type { Guide } from "@/types/guide";

export const VERBS_GUIDE: Guide = {
	slug: "verbs",
	tone: "stone",
	title: "Verbs in the present, past and future",
	greek: "Ρήματα",
	description: "Every verb as present, simple past and simple future",
	idea: "Learn every verb as three forms: present, simple past and simple future. The simple past and the simple future are built on the same stem, so knowing one gives you the other.",
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
			rule: "The present is the everyday form. The simple past is one finished event. The simple future is θα plus a short form, and that short form is built on the same stem as the simple past: know είδα and you can predict θα δω.",
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
			title: "είμαι in the present, past and future",
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
			id: "keep-shape",
			tone: "slate",
			title: "Verbs with no separate short form",
			rule: "A few everyday verbs have no separate short form, so θα goes straight in front of the present. έχω, θέλω and ξέρω describe a state, which has no one-off version; κάνω and περιμένω have a short form identical to the present. Their past is still a form of its own.",
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
			],
			drills: ["verbs-imperfect-stative"],
		},
		{
			id: "present",
			tone: "olive",
			title: "Present endings",
			rule: "Most verbs end in -ω and share one set of endings. Verbs in -άω share a second set. A small family of short verbs shares a third, shown here by πάω and τρώω. ακούω, λέω and κλαίω belong to it too, not to the -ω set: ακούς, ακούει and λες, λέει, not ακούεις. πάω has a longer form, πηγαίνω, which takes the -ω endings: πηγαίνεις, πηγαίνει. Both are everyday Greek.",
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
				{ greek: "Με ακούς;", english: "Can you hear me?" },
				{ greek: "Πεινάω.", english: "I'm hungry." },
				{ greek: "Πάω σινεμά.", english: "I go to the cinema." },
				{ greek: "Με ποιον πηγαίνεις στις συναυλίες;", english: "Who do you go to concerts with?" },
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
			rule: "Some verbs end in a stressed -ώ and take their own endings, stressed on the ending throughout: μπορώ, οδηγώ, τηλεφωνώ, προσπαθώ, συμφωνώ. Not every -ώ belongs here: μιλώ is a shorter way of saying μιλάω, and keeps the -άω endings, μιλάς and μιλάει.",
			table: {
				columns: [
					{ label: "Who" },
					{ label: "μπορώ", greek: true, tone: "olive" },
					{ label: "οδηγώ", greek: true, tone: "olive" },
				],
				rows: [
					["I", { text: "μπορώ", weight: "anchor" }, { text: "οδηγώ", weight: "anchor" }],
					["you", "μπορείς", "οδηγείς"],
					["he / she / it", "μπορεί", "οδηγεί"],
					["we", "μπορούμε", "οδηγούμε"],
					["you all", "μπορείτε", "οδηγείτε"],
					["they", "μπορούν", "οδηγούν"],
				],
			},
			examples: [
				{ greek: "Μπορείς να μου πεις;", english: "Can you tell me?" },
				{ greek: "Μπορείτε να με βοηθήσετε;", english: "Can you help me?" },
			],
			drills: ["verbs-conjugation-endings"],
		},
		{
			id: "past-shapes",
			tone: "terracotta",
			title: "Simple past, by family",
			rule: "The simple past endings are the same for almost every verb: -α, -ες, -ε, -αμε, -ατε, -αν. είμαι is the exception, with ήμουν. What changes is the stem, and stems come in families. Most -ζω verbs take -σ-, but some take -ξ-: άλλαξα, έπαιξα. Most -άω verbs take -ησ-, but some take -ασ- (γέλασα, ξέχασα, πείνασα) or -εσ- (φόρεσα). The -αίνω verbs of going in, out, up and down take -ηκ- (βγήκα, μπήκα, ανέβηκα); others shorten the stem: έμαθα, κατάλαβα. A past too short to carry its stress gains an έ- in front: έβαλα, έδωσα.",
			table: {
				columns: [
					{ label: "Present", greek: true, tone: "olive" },
					{ label: "Simple past", greek: true, tone: "terracotta" },
					{ label: "Simple future", greek: true, tone: "ocean" },
					{ label: "Family" },
				],
				rows: [
					["δοκιμάζω", "δοκίμασα", "θα δοκιμάσω", "most -ζω: -σ-"],
					["παίζω", { text: "έπαιξα", weight: "deviate" }, "θα παίξω", "some -ζω: -ξ-"],
					["μιλάω", "μίλησα", "θα μιλήσω", "most -άω: -ησ-"],
					["γελάω", { text: "γέλασα", weight: "deviate" }, "θα γελάσω", "some -άω: -ασ-"],
					["βγαίνω", "βγήκα", "θα βγω", "motion -αίνω: -ηκ-"],
					["μαθαίνω", { text: "έμαθα", weight: "deviate" }, "θα μάθω", "other -αίνω: short"],
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
					greek: "Μπήκα στο λεωφορείο και κατέβηκα στο κέντρο.",
					english: "I got on the bus and got off in the centre.",
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
			id: "past-families",
			tone: "terracotta",
			title: "Simple past families by consonant",
			rule: "For most other verbs, the sound before the ending decides the simple past, and the simple future follows it: δούλεψα, θα δουλέψω. Most verbs in -εύω, -φω, -πω and -βω take -ψ-: δούλεψα, έγραψα, έλειψα, έκοψα. Most with κ, γ or χ, and the -χνω verbs, take -ξ-: έτρεξα, άνοιξα, έψαξα. -ώνω verbs take -ωσ-: πλήρωσα. Some other -νω verbs take -σ- (έκλεισα, έφτασα), but many do not: πήγα (πάω or πηγαίνω), έμεινα (μένω), έφερα (φέρνω). Most -ώ verbs take -ησ-, as most -άω verbs do (οδήγησα); a few take -εσ-: μπόρεσα, κάλεσα. A few break their family: βλέπω → είδα, φεύγω → έφυγα, βρίσκω → βρήκα. The stress sits three syllables from the end, so it moves one syllable towards the ending in the we and you all forms (δοκίμασα, δοκιμάσαμε), and an added έ- drops away: έκανα, κάναμε.",
			table: {
				columns: [
					{ label: "Present", greek: true, tone: "olive" },
					{ label: "Simple past", greek: true, tone: "terracotta" },
					{ label: "Family" },
				],
				rows: [
					["δουλεύω", "δούλεψα", "-εύω: -ψ-"],
					["γράφω", "έγραψα", "-φω: -ψ-"],
					["λείπω", "έλειψα", "-πω: -ψ-"],
					["τρέχω", "έτρεξα", "κ, γ, χ: -ξ-"],
					["ψάχνω", "έψαξα", "-χνω: -ξ-"],
					["πληρώνω", "πλήρωσα", "-ώνω: -ωσ-"],
					["κλείνω", "έκλεισα", "some -νω: -σ-"],
					["μένω", { text: "έμεινα", weight: "deviate" }, "other -νω"],
					["καλώ", { text: "κάλεσα", weight: "deviate" }, "some -ώ: -εσ-"],
				],
			},
			examples: [
				{ greek: "Πλήρωσα τον λογαριασμό κι έφυγα.", english: "I paid the bill and left." },
				{ greek: "Έψαξα παντού τα κλειδιά μου.", english: "I looked everywhere for my keys." },
			],
			drills: ["verbs-aorist-formation", "verbs-future-formation"],
		},
		{
			id: "future",
			tone: "ocean",
			title: "Simple future with θα and the short form",
			rule: "For one action still to come, put θα in front of the short form, the one built on the simple past's stem. θα with the present form is the future continuous instead: θα διαβάζω is I'll be reading. To say not, δεν comes before θα: δεν θα φάω.",
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
				{ greek: "Δεν θα αργήσω.", english: "I won't be late." },
			],
			drills: ["verbs-future-formation", "verbs-future-sg1", "verbs-future-conjugation"],
		},
		{
			id: "short-form",
			tone: "ocean",
			title: "The short form or the present after να",
			rule: "After να the short form names one action: θέλω να φάω, I want to eat. For something ongoing or habitual, να takes the present instead: μου αρέσει να τρώω, I like eating. πριν takes the short form for one action too: πριν πάω για ύπνο. So do όταν and αν when they point to the future: Όταν έρθεις, when you come. To say not, put μην after να: να μην πεις. After a verb of seeing or hearing, να with the present describes an action in progress: ακούω τον σκύλο να τραγουδάει, I hear the dog singing.",
			table: {
				columns: [
					{ label: "One action", greek: true, tone: "ocean" },
					{ label: "Ongoing", greek: true, tone: "olive" },
					{ label: "Meaning" },
				],
				rows: [
					[{ text: "να φάω", weight: "anchor" }, { text: "να τρώω", weight: "anchor" }, "eat"],
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
				{ greek: "Διαβάζω πριν πάω για ύπνο.", english: "I read before I go to sleep." },
				{ greek: "Μπορείς να μην το πεις;", english: "Can you not say it?" },
				{
					greek: "Ακούω τον σκύλο να τραγουδάει σαν τον λύκο.",
					english: "I hear the dog singing like the wolf.",
				},
			],
			drills: ["verbs-modal-constructions"],
		},
		{
			id: "mai-verbs",
			tone: "stone",
			title: "Verbs ending in -μαι",
			rule: "Some everyday verbs end in -μαι and take their own endings: έρχομαι (I come), κάθομαι (I sit), παντρεύομαι (I get married). Many make the past with -θηκα or -τηκα, and most of those make the simple future by dropping -ηκα for -ώ: σκέφτηκα → θα σκεφτώ, χάρηκα → θα χαρώ. In the past and future a π before the τ turns into φ: επισκέπτομαι → επισκέφτηκα. έρχομαι and κάθομαι go their own way: ήρθα → θα έρθω, κάθισα → θα καθίσω. The past continuous ends in -όμουν: σκεφτόμουν, I was thinking.",
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
				{ greek: "Θα το σκεφτώ.", english: "I'll think about it." },
			],
			drills: ["verbs-conjugation-endings"],
		},
		{
			id: "amai-verbs",
			tone: "stone",
			title: "Verbs in -άμαι, like θυμάμαι",
			rule: "A few -μαι verbs end in a stressed -άμαι: θυμάμαι (I remember), κοιμάμαι (I sleep), φοβάμαι (I'm afraid). The ending's vowel changes in the we and they forms: θυμόμαστε, θυμούνται. Two smaller sets are stressed on the ending too: -ιέμαι, as in γεννιέμαι (I am born), and -ούμαι, as in ασχολούμαι (I deal with), whose you form is ασχολείσαι. The past takes -ήθηκα (θυμήθηκα, κοιμήθηκα), and the simple future drops -ηκα for -ώ, as most -μαι verbs do: θα θυμηθώ, θα κοιμηθώ.",
			table: {
				columns: [
					{ label: "Who" },
					{ label: "Present", greek: true, tone: "olive" },
					{ label: "Simple future", greek: true, tone: "ocean" },
				],
				rows: [
					["I", { text: "θυμάμαι", weight: "anchor" }, { text: "θα θυμηθώ", weight: "anchor" }],
					["you", "θυμάσαι", "θα θυμηθείς"],
					["he / she", "θυμάται", "θα θυμηθεί"],
					["we", { text: "θυμόμαστε", weight: "deviate" }, "θα θυμηθούμε"],
					["you all", "θυμάστε", "θα θυμηθείτε"],
					["they", { text: "θυμούνται", weight: "deviate" }, "θα θυμηθούν"],
				],
			},
			examples: [
				{ greek: "Δεν θυμάμαι.", english: "I don't remember." },
				{ greek: "Συνήθως κοιμάμαι τα μεσάνυχτα.", english: "I usually go to sleep at midnight." },
				{ greek: "Με τι ασχολείσαι;", english: "What do you do?" },
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
		{
			id: "ongoing-past",
			tone: "honey",
			title: "Past continuous for was doing and used to do",
			rule: "For something ongoing or habitual in the past, use the past continuous rather than the simple past: σπούδασα is I studied, σπούδαζα is I was studying or I used to study. Build it from the present stem with the simple past's endings: σπουδάζω → σπούδαζα, παίζω → έπαιζα. As in the simple past, the stress sits three syllables from the end, and a short verb gains έ- to carry it. τρώω, λέω and ακούω add a γ: έτρωγα, έλεγα, άκουγα. Verbs in -άω and -ώ usually take -ούσα instead: μιλάω → μιλούσα, μπορώ → μπορούσα.",
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
					["μπόρεσα", "μπορούσα", "can"],
				],
			},
			examples: [
				{
					greek: "Σπούδαζα αρχιτεκτονική, αλλά απέτυχα.",
					english: "I was studying architecture, but I failed.",
				},
				{
					greek: "Όταν ήμουν παιδί, έπαιζα ποδόσφαιρο.",
					english: "When I was a child, I used to play football.",
				},
			],
			drills: ["verbs-tense-recognition", "verbs-imperfect-stative"],
		},
		{
			id: "commands",
			tone: "navy",
			title: "Commands",
			rule: "A command has two forms: one for one person, and one for several people, which is also the polite form. Most one-person commands are the short form plus -ε, with the stress moving back: θα δώσω → δώσε, θα ακούσω → άκουσε. The other form ends in -τε: δώστε, ακούστε. For don't, put μην before the you form: the present (μην φωνάζεις) or, for one action, the short form (μην ξεχάσεις). Like δεν, μην keeps its ν before a vowel and before κ, π, τ, ξ, ψ, μπ, ντ, γκ, τσ, τζ, and often drops it before other consonants, though keeping it is widely accepted. For let's, put ας in front of the we form of the short form: ας κάνουμε, ας μιλήσουμε.",
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
				{ greek: "Μην φωνάζεις!", english: "Don't shout!" },
				{ greek: "Σήκω πάνω!", english: "Stand up!" },
				{ greek: "Ας κάνουμε λίγη εξάσκηση μαζί.", english: "Let's do a little practice together." },
			],
			drills: ["verbs-imperatives"],
		},
		{
			id: "command-aspect",
			tone: "honey",
			title: "One-off and ongoing commands",
			rule: "Most commands are for one action and come from the short form. A one-syllable short form gives a one-syllable command: θα πω → πες, θα δω → δες, θα βγω → βγες, θα πιω → πιες. φέρε is regular, from θα φέρω; κοίτα, from κοιτάζω, you learn as it is. To tell someone to keep doing something, or to do it as a habit, build the command from the present instead: φάε is eat this now, τρώγε is keep eating, or eat as a rule.",
			table: {
				columns: [
					{ label: "One-off", greek: true, tone: "ocean" },
					{ label: "Ongoing", greek: true, tone: "olive" },
					{ label: "Meaning" },
				],
				rows: [
					[{ text: "φάε", weight: "anchor" }, { text: "τρώγε", weight: "anchor" }, "eat"],
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
