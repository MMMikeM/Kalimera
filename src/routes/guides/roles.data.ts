import { cellWith, mark, markedCell } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

export const ROLES_GUIDE: Guide = {
	slug: "roles",
	tone: "terracotta",
	title: "Who does what",
	greek: "Ποιος κάνει τι",
	description: "Doer, Target, Owner, and the article that shows them",
	idea: "A Greek noun changes its article and ending to show its job in the sentence. The Doer does it, the Target has it done to it, the Owner owns something. Where the ending shows, it tells you who did what, whatever the word order.",
	sections: [
		{
			id: "overview",
			title: "Three jobs a noun can do",
			rule: [
				"Most nouns in a sentence do one of three jobs.",
				[
					"The Doer _does_ the action.",
					"The Target is who or what the action is done to.",
					"The Owner is who something belongs to.",
				],
				"A Greek noun shows its job by changing its form: its article and often its ending. Each form is named after its main job, and the marks under the Greek show the form. Because the form is on the word, you can find the job whatever the word order. When the form doesn't show, ask the table's question.",
				"The Doer form is also the noun's plain form, the one you find in a dictionary. The noun after είμαι, I am, keeps it too: see Linking verbs, below.",
			],
			table: {
				columns: [
					{ label: "Example", greek: true },
					{ label: "Job" },
					{ label: "Asks" },
				],
				rows: [
					[cellWith("Ο Γιάννης τρώει.", mark("Ο Γιάννης", "nominative", "masculine")), "Doer", "who eats?"],
					[cellWith("Βλέπω τον Γιάννη.", mark("τον Γιάννη", "accusative", "masculine")), "Target", "I see who?"],
					[cellWith("Το σπίτι του Γιάννη.", mark("του Γιάννη", "genitive", "masculine")), "Owner", "whose house?"],
				],
			},
			examples: [
				{
					greek: "Ο άντρας θέλει έναν καφέ.",
					english: "The man wants a coffee.",
					marks: [mark("Ο άντρας", "nominative", "masculine"), mark("έναν καφέ", "accusative", "masculine")],
				},
				{
					greek: "Τον Γιάννη βλέπει η Μαρία.",
					english: "It's Yannis that Maria sees. (τον marks the Target, even first)",
					marks: [mark("Τον Γιάννη", "accusative", "masculine"), mark("η Μαρία", "nominative", "feminine")],
				},
			],
			details: [
				{
					label: "The Doer is often left out",
					text: "Greek usually leaves out the Doer when it is I, you, we or they, because the verb's ending already says who. Βλέπω τον Γιάννη has no Doer word: the -ω of βλέπω means I.",
					examples: [
						{
							greek: "Βλέπουν μια ταινία.",
							english: "They're watching a film. (-ουν means they)",
							marks: [mark("μια ταινία", "accusative", "feminine")],
						},
					],
				},
				{
					label: "When the form doesn't show",
					text: [
						"Not every noun shows its form:",
						[
							"neuter nouns look the same as Doer and Target: το παιδί, το παιδί",
							"feminine nouns change only the article, so with μια, or no article, nothing changes",
						],
						"Then ask the question instead. The man wants what? Orangeade, so πορτοκαλάδα is the Target.",
					],
					examples: [
						{
							greek: "Ο άντρας θέλει πορτοκαλάδα.",
							english: "The man wants orangeade. (πορτοκαλάδα looks like its plain form)",
							marks: [mark("Ο άντρας", "nominative", "masculine"), mark("πορτοκαλάδα", "accusative", "feminine")],
						},
						{
							greek: "Το παιδί τρώει καρπούζι.",
							english: "The child is eating watermelon. (both neuter, so ask: the child eats what?)",
							marks: [mark("Το παιδί", "nominative", "neuter"), mark("καρπούζι", "accusative", "neuter")],
						},
					],
				},
				{
					label: "Linking verbs: είμαι and γίνομαι",
					text: [
						"είμαι (I am) and γίνομαι (I become) don't act on anything. They link a noun to what it is or becomes, like an equals sign: both sides are the same person or thing.",
						"Compare βλέπω, I see. I see who? The doctor, who gets seen, so γιατρός takes the Target form. I am what? also has an answer, a doctor, but the doctor is me, not something I act on. So there is no Target, and γιατρός keeps the plain form. It is in the Doer form without being the Doer: the Doer is I, in the verb's ending.",
						"In sentences you will meet them as είναι, is (from είμαι), and, after να, γίνει, become (from γίνομαι).",
					],
					examples: [
						{
							greek: "Βλέπω τον γιατρό.",
							english: "I see the doctor. (changes: the doctor gets seen)",
							marks: [mark("τον γιατρό", "accusative", "masculine")],
						},
						{
							greek: "Είμαι γιατρός.",
							english: "I am a doctor. (plain form: the doctor is me)",
							marks: [mark("γιατρός", "nominative", "masculine")],
						},
						{
							greek: "Η Χρυσάνθη είναι η μητέρα.",
							english: "Chrysanthi is the mother. (είναι, from είμαι; both sides in the plain form)",
							marks: [mark("Η Χρυσάνθη", "nominative", "feminine"), mark("η μητέρα", "nominative", "feminine")],
						},
						{
							greek: "Ο γιος μου θέλει να γίνει γιατρός.",
							english: "My son wants to become a doctor. (γίνει, from γίνομαι)",
							marks: [mark("Ο γιος", "nominative", "masculine"), mark("μου", "genitive"), mark("γιατρός", "nominative", "masculine")],
						},
					],
				},
			],
			confuse: {
				text: "The Target form is also used where nothing is done to the noun: for times, την Κυριακή, on Sunday, and after a preposition, στην Αθήνα, to Athens. Neither is a Target.",
				section: "target",
			},
			drills: ["articles-paradigm", "nominal-phrase-doer", "nominal-all-phrases"],
		},
		{
			id: "articles",
			title: "The article ο, η, το",
			rule: [
				"The article is the word for “the”. It shows two things at once: the noun's gender (masculine, feminine or neuter) and its job.",
				"A noun's plain form, the one in the dictionary, is also its Doer form: the form for the noun that does the action. When the noun is the Target, what the action is done to, only the masculine and feminine articles change; the neuter stays the same.",
				"The word for “a” or “an” works the same way, but only the masculine changes.",
			],
			table: {
				columns: [
					{ label: "Form" },
					{ label: "Masculine", greek: true },
					{ label: "Feminine", greek: true },
					{ label: "Neuter", greek: true },
				],
				rows: [
					[
						"Doer",
						markedCell("ο φίλος", "nominative", "masculine", false),
						markedCell("η μητέρα", "nominative", "feminine", false),
						markedCell("το παιδί", "nominative", "neuter", false),
					],
					[
						"Target",
						markedCell("τον φίλο", "accusative", "masculine", false, 0),
						markedCell("τη μητέρα", "accusative", "feminine", false, 0),
						markedCell("το παιδί", "accusative", "neuter"),
					],
					[
						"Doer, “a”",
						markedCell("ένας φίλος", "nominative", "masculine"),
						markedCell("μία μητέρα", "nominative", "feminine"),
						markedCell("ένα παιδί", "nominative", "neuter"),
					],
					[
						"Target, “a”",
						markedCell("έναν φίλο", "accusative", "masculine", false, 1),
						markedCell("μία μητέρα", "accusative", "feminine"),
						markedCell("ένα παιδί", "accusative", "neuter"),
					],
				],
				notes: [
					"For the Target, only the masculine and feminine articles change.",
					"For “a” or “an”, only the masculine changes: ένας becomes έναν.",
				],
			},
			examples: [
				{
					greek: "Ο Νίκος περιμένει τον φίλο του.",
					english: "Nikos is waiting for his friend.",
					marks: [mark("Ο Νίκος", "nominative", "masculine"), mark("τον φίλο", "accusative", "masculine")],
				},
				{
					greek: "Βλέπουν μια ταινία στο σινεμά.",
					english: "They're watching a film at the cinema. (στο is σε + το; after σε, the Target form)",
					marks: [mark("μια ταινία", "accusative", "feminine"), mark("στο σινεμά", "accusative", "neuter")],
				},
				{
					greek: "Έχω έναν αδερφό και μία αδερφή.",
					english: "I have a brother and a sister.",
					marks: [mark("έναν αδερφό", "accusative", "masculine"), mark("μία αδερφή", "accusative", "feminine")],
				},
			],
			details: [
				{
					label: "τη or την",
					text: [
						"The Target article την keeps its -ν before:",
						[
							"a vowel",
							"κ, π, τ, ξ or ψ",
							"μπ, ντ, γκ, τσ or τζ, as in την μπάλα",
						],
						"Before any other consonant it usually drops to τη, though keeping it is widely accepted.",
						"τον keeps its -ν even before φ, since το φίλο would read as neuter.",
					],
					examples: [
						{
							greek: "Κλείνω την πόρτα.",
							english: "I close the door.",
							marks: [mark("την πόρτα", "accusative", "feminine")],
						},
						{
							greek: "Ξέρεις τη Μαρία και την Άννα;",
							english: "Do you know Maria and Anna?",
							marks: [mark("τη Μαρία", "accusative", "feminine"), mark("την Άννα", "accusative", "feminine")],
						},
					],
				},
			],
			drills: ["articles-article-doer", "articles-article-target"],
		},
		{
			id: "target",
			title: "The Target form: objects, times, prepositions",
			rule: [
				"The Target is what the action is done to. For this job a noun leaves its plain form, the one in the dictionary, which is also the Doer form. The article changes, except in the neuter, and masculine nouns often change their ending too.",
				"The Target form has three uses:",
				[
					"whatever the verb acts on, including names, which change like any other noun",
					"times, with no word for “on” or “in”",
					"after a preposition, such as σε, με, για or από",
				],
				"Only the first is a Target. A time, or a phrase after a preposition, answers when?, where? or how?, and nothing is done to it. They watch what? A film: the Target. They watch where? At the cinema: extra detail.",
				"Months are masculine, so they take τον.",
			],
			table: {
				columns: [
					{ label: "Plain form", greek: true },
					{ label: "Target form", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("ο φίλος", "nominative", "masculine", false), markedCell("τον φίλο", "accusative", "masculine", false), "the friend"],
					[markedCell("οι φίλοι", "nominative", "masculine", true), markedCell("τους φίλους", "accusative", "masculine", true), "the friends"],
					[markedCell("η Δευτέρα", "nominative", "feminine"), markedCell("τη Δευτέρα", "accusative", "feminine"), "(on) Monday"],
					[markedCell("το πρωί", "nominative", "neuter"), markedCell("το πρωί", "accusative", "neuter"), "(in) the morning"],
					[markedCell("ο Ιούλιος", "nominative", "masculine"), markedCell("τον Ιούλιο", "accusative", "masculine", false), "(in) July"],
				],
			},
			examples: [
				{
					greek: "Έχουν δύο παιδιά, τον Αλέξανδρο και τη Λίζα.",
					english: "They have two children, Alexandros and Liza.",
					marks: [
						mark("δύο παιδιά", "accusative", "neuter", true),
						mark("τον Αλέξανδρο", "accusative", "masculine"),
						mark("τη Λίζα", "accusative", "feminine"),
					],
				},
				{
					greek: "Το Σάββατο βλέπω τους φίλους μου.",
					english: "On Saturday I'm seeing my friends.",
					marks: [mark("Το Σάββατο", "accusative", "neuter"), mark("τους φίλους", "accusative", "masculine", true)],
				},
				{
					greek: "Πάω στην Αθήνα με τον φίλο μου.",
					english: "I'm going to Athens with my friend. (Target forms after σε and με, but no Target)",
					marks: [mark("στην Αθήνα", "accusative", "feminine"), mark("τον φίλο", "accusative", "masculine")],
				},
				{
					greek: "Την επόμενη εβδομάδα πάμε διακοπές.",
					english: "Next week we're going on holiday.",
					marks: [mark("Την επόμενη εβδομάδα", "accusative", "feminine")],
				},
			],
			details: [
				{
					label: "After κάθε",
					text: "After κάθε (every) there is no article.",
					examples: [
						{
							greek: "Κάθε εβδομάδα δουλεύω σαράντα ώρες.",
							english: "Every week I work forty hours.",
							marks: [mark("Κάθε εβδομάδα", "accusative", "feminine"), mark("σαράντα ώρες", "accusative", "feminine", true)],
						},
					],
				},
			],
			drills: ["nominal-noun-target", "nominal-phrase-target", "blocks-days-of-week"],
		},
		{
			id: "owner",
			title: "The Owner",
			rule: [
				"The Owner is who or what something belongs to, like English 's or “of”. It comes after the thing owned: το σπίτι του Γιάννη, Yannis's house.",
				"The table shows masculine nouns in -ος. With one owner they take του and end in -ου. In the plural every noun, whatever its family, takes των and ends in -ων.",
			],
			table: {
				columns: [
					{ label: "Form" },
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
				],
				rows: [
					["Doer", markedCell("ο γιατρός", "nominative", "masculine", false), markedCell("οι γιατροί", "nominative", "masculine", true)],
					["Target", markedCell("τον γιατρό", "accusative", "masculine"), markedCell("τους γιατρούς", "accusative", "masculine", true)],
					["Owner", markedCell("του γιατρού", "genitive", "masculine", false), markedCell("των γιατρών", "genitive", "masculine", true)],
				],
			},
			examples: [
				{
					greek: "Το ποδήλατο του αδερφού μου είναι κόκκινο.",
					english: "My brother's bicycle is red.",
					marks: [mark("Το ποδήλατο", "nominative", "neuter"), mark("του αδερφού", "genitive", "masculine")],
				},
				{
					greek: "Πόσων χρονών είσαι;",
					english: "How old are you? (literally: of how many years)",
					marks: [mark("Πόσων χρονών", "genitive", undefined, true)],
				},
				{
					greek: "Ξέρεις το όνομα του φίλου της;",
					english: "Do you know her friend's name?",
					marks: [mark("το όνομα", "accusative", "neuter"), mark("του φίλου", "genitive", "masculine")],
				},
			],
			details: [
				{
					label: "Stress in the plural",
					text: "The plural always ends in -ων, but the stress is not always on it: των γιατρών, yet των ανθρώπων.",
				},
			],
			confuse: {
				text: "This shows only masculines in -ος. How the other families make their Owner is in the nouns guide: της γυναίκας, του παιδιού, του ονόματος.",
				section: "nouns/owner",
			},
			drills: ["nominal-noun-owner", "articles-article-owner", "pronouns-possessive-vs-article", "nominal-phrase-owner"],
		},
		{
			id: "when-article",
			title: "When Greek uses the article",
			rule: [
				"The article is the word for “the”: ο, η, το and their other forms. Greek uses it in places where English leaves it out:",
				[
					"countries",
					"people's names, in speech",
					"ideas, such as love",
					"a whole kind of thing, such as cats in general",
					"days",
				],
				"It also leaves it out in a few set places, listed below the table.",
			],
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "English" },
					{ label: "Why" },
				],
				rows: [
					[markedCell("η Ελλάδα", "nominative", "feminine"), "Greece", "a country"],
					[markedCell("ο Γιάννης", "nominative", "masculine"), "Yannis", "a name"],
					[cellWith("η αγάπη είναι τυφλή", mark("η αγάπη", "nominative", "feminine")), "love is blind", "an idea"],
					[cellWith("μου αρέσουν οι γάτες", mark("οι γάτες", "nominative", "feminine", true)), "I like cats", "a whole kind"],
					[markedCell("το Σάββατο", "accusative", "neuter"), "on Saturday", "a day"],
					[{ text: "είμαι προγραμματιστής", marks: [mark("προγραμματιστής", "nominative", "masculine")] }, "I'm a programmer", "a job, no article"],
					[{ text: "πίνω καφέ", marks: [mark("καφέ", "accusative", "masculine")] }, "I drink coffee", "an activity, no article"],
					[{ text: "πάω σινεμά", marks: [mark("σινεμά", "accusative", "neuter")] }, "I go to the cinema", "an activity, no article"],
					[{ text: "κάνω σπορ", marks: [mark("σπορ", "accusative", "neuter")] }, "I do sport", "an activity, no article"],
					[{ text: "κάθε Σάββατο", marks: [mark("κάθε Σάββατο", "accusative", "neuter")] }, "every Saturday", "after κάθε, no article"],
				],
			},
			examples: [
				{
					greek: "Η Ελλάδα έχει πολλά νησιά.",
					english: "Greece has a lot of islands.",
					marks: [mark("Η Ελλάδα", "nominative", "feminine")],
				},
			],
			details: [
				{
					label: "Where Greek leaves it out",
					text: [
						"Greek leaves out the article in a few set places, shown at the foot of the table:",
						[
							"a job after είμαι (be)",
							"set activities, such as drinking coffee or going to the cinema",
							"a day after κάθε (every)",
						],
					],
					examples: [
						{
							greek: "Ο Γιάννης είναι προγραμματιστής.",
							english: "Yannis is a programmer.",
							marks: [mark("Ο Γιάννης", "nominative", "masculine"), mark("προγραμματιστής", "nominative", "masculine")],
						},
						{
							greek: "Κάθε Σάββατο πίνουμε καφέ.",
							english: "Every Saturday we have coffee.",
							marks: [mark("Κάθε Σάββατο", "accusative", "neuter"), mark("καφέ", "accusative", "masculine")],
						},
					],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "articles-with-or-without",
					title: "With or without the article",
					greek: "η Ελλάδα · είμαι γιατρός · πάω σινεμά",
					tests: "A card shows an English phrase, and the Greek counts as right only with the article where Greek uses one and without it where Greek drops it.",
				},
			],
		},
	],
	reference: [
		{ label: "Cases", href: "/reference/cases" },
		{ label: "Articles", href: "/reference/articles" },
		{ label: "Nouns", href: "/reference/nouns" },
	],
};
