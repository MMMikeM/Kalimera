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
				"A Greek noun shows its job by changing its form: its article and often its ending. Each form is named after its main job, and the marks under the Greek show the form. Because the form is on the word, you can find the job whatever the word order. Where the form doesn't show, ask the table's question.",
				"The Doer form is also the noun's plain form, the one you find in a dictionary.",
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
			],
			drills: ["articles-paradigm", "nominal-phrase-doer", "nominal-all-phrases"],
		},
		{
			id: "articles",
			title: "The article ο, η, το",
			rule: [
				"The article is the word for “the”: ο, η, το. In the singular it shows the noun's gender (masculine, feminine or neuter) and, except in the neuter, its job.",
				"From the Doer form to the Target form, how much changes depends on the gender:",
				[
					"masculine: the article and the ending, which drops its -ς: ο φίλος, τον φίλο",
					"feminine: only the article: η μητέρα, τη μητέρα",
					"neuter: nothing: το παιδί, το παιδί",
				],
				"So a masculine noun shows its job most clearly. Where nothing changes, or there is no article, ask the question instead: the man wants what?",
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
						markedCell("τον φίλο", "accusative", "masculine", false),
						markedCell("τη μητέρα", "accusative", "feminine", false),
						markedCell("το παιδί", "accusative", "neuter"),
					],
				],
			},
			examples: [
				{
					greek: "Ο Νίκος περιμένει τον φίλο του.",
					english: "Nikos is waiting for his friend. (no word for “for”: τον φίλο is the Target)",
					marks: [
						mark("Ο Νίκος", "nominative", "masculine"),
						mark("τον φίλο", "accusative", "masculine"),
						mark("του", "genitive", "masculine"),
					],
				},
				{
					greek: "Ο άντρας θέλει πορτοκαλάδα.",
					english: "The man wants orangeade. (no article, so nothing shows: the man wants what?)",
					marks: [mark("Ο άντρας", "nominative", "masculine"), mark("πορτοκαλάδα", "accusative", "feminine")],
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
						"Before any other consonant the standard form is τη, though you will often see την kept.",
						"τον always keeps its -ν, or it would look neuter: το.",
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
			id: "a-an",
			title: "The article ένας, μια, ένα",
			rule: [
				"The word for “a” or “an” is ένας, μια, ένα. It changes even less than “the”: for the Target only the masculine changes, ένας to έναν. Like τον, έναν always keeps its -ν.",
				"μια is the everyday “a”. μία, with a stress mark, is the number one, used when the number matters.",
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
						markedCell("ένας φίλος", "nominative", "masculine"),
						markedCell("μια μητέρα", "nominative", "feminine"),
						markedCell("ένα παιδί", "nominative", "neuter"),
					],
					[
						"Target",
						markedCell("έναν φίλο", "accusative", "masculine"),
						markedCell("μια μητέρα", "accusative", "feminine"),
						markedCell("ένα παιδί", "accusative", "neuter"),
					],
				],
			},
			examples: [
				{
					greek: "Ένας φίλος μου μένει στην Πάφο.",
					english: "A friend of mine lives in Paphos.",
					marks: [mark("Ένας φίλος", "nominative", "masculine")],
				},
				{
					greek: "Έχω έναν αδερφό και μια αδερφή.",
					english: "I have a brother and a sister.",
					marks: [mark("έναν αδερφό", "accusative", "masculine"), mark("μια αδερφή", "accusative", "feminine")],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "articles-indefinite",
					title: "ένας or έναν",
					greek: "ένας φίλος · έναν φίλο · μια μητέρα",
					tests: "A card shows a sentence with a gap before a noun, and the answer is ένας, έναν, μια or ένα, whichever the noun's gender and job need.",
				},
			],
		},
		{
			id: "target",
			title: "The Target form: objects, times, prepositions",
			rule: [
				"The Target is what the action is done to. For this job a noun leaves its plain form, the Doer form. How much changes depends on its gender, as the article section shows.",
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
			id: "linking",
			title: "Linking verbs: είμαι and γίνομαι",
			rule: [
				"είμαι (I am) and γίνομαι (I become) don't act on anything. They link a noun to what it is or becomes, like an equals sign: both sides are the same person or thing.",
				"So there is no Target, and the noun after them keeps its plain form, the Doer form. Compare βλέπω, I see. I see who? The doctor, who gets seen, so γιατρός takes the Target form. I am what? has an answer too, a doctor, but the doctor is me, not something I act on.",
				"You will meet them as είναι, is (from είμαι), and, after να, γίνει, become (from γίνομαι).",
			],
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
					{ label: "Form" },
				],
				rows: [
					[cellWith("βλέπω τον γιατρό", mark("τον γιατρό", "accusative", "masculine")), "I see the doctor", "Target"],
					[cellWith("είμαι γιατρός", mark("γιατρός", "nominative", "masculine")), "I am a doctor", "plain"],
					[cellWith("γίνομαι γιατρός", mark("γιατρός", "nominative", "masculine")), "I become a doctor", "plain"],
				],
			},
			examples: [
				{
					greek: "Η Χρυσάνθη είναι η μητέρα.",
					english: "Chrysanthi is the mother. (both sides in the plain form)",
					marks: [mark("Η Χρυσάνθη", "nominative", "feminine"), mark("η μητέρα", "nominative", "feminine")],
				},
				{
					greek: "Ο γιος μου θέλει να γίνει γιατρός.",
					english: "My son wants to become a doctor.",
					marks: [mark("Ο γιος", "nominative", "masculine"), mark("μου", "genitive"), mark("γιατρός", "nominative", "masculine")],
				},
			],
			confuse: {
				text: "A job after είμαι usually takes no article either: Ο Γιάννης είναι προγραμματιστής, Yannis is a programmer.",
				section: "when-article",
			},
			drills: [],
			plannedDrills: [
				{
					id: "roles-linking-plain",
					title: "Plain form or Target form",
					greek: "είμαι γιατρός · βλέπω τον γιατρό",
					tests: "A card shows βλέπω, είμαι or γίνομαι with a noun to fill in, and the answer is the noun in the Target form after βλέπω and in the plain form after είμαι or γίνομαι.",
				},
			],
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
