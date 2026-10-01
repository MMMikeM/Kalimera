import { cellWith, mark, markedCell } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

export const ROLES_GUIDE: Guide = {
	slug: "roles",
	tone: "terracotta",
	title: "Who does what",
	greek: "Ποιος κάνει τι",
	description: "Doer, Target, Owner, and the article that shows them",
	idea: "A Greek noun changes its article and ending to show its job in the sentence. The Doer does it, the Target has it done to it, the Owner owns something. The ending tells you who did what, whatever the word order.",
	sections: [
		{
			id: "overview",
			title: "Three jobs a noun can do",
			rule: [
				"Every noun in a sentence does one of three jobs.",
				[
					"The Doer _does_ the action.",
					"The Target is who or what the action is done to.",
					"The Owner is who something belongs to.",
				],
				"A Greek noun shows its job by changing its article and often its ending. Because the job is marked on the word, it stays the same whatever the word order.",
				"The Doer form is also the noun's plain form, the one you find in a dictionary. A noun only changes when it takes another job, as a Target or an Owner. These jobs come with action verbs like βλέπω, I see. A few verbs, such as είμαι, I am, only link one noun to another, and the noun after them keeps its plain form: see Linking verbs, below.",
			],
			table: {
				columns: [
					{ label: "Example", greek: true },
					{ label: "Job" },
					{ label: "Asks" },
				],
				rows: [
					[cellWith("Ο Γιάννης τρώει.", mark("Ο Γιάννης", "nominative", "masculine")), "Doer", "who does it?"],
					[cellWith("Βλέπω τον Γιάννη.", mark("τον Γιάννη", "accusative", "masculine")), "Target", "who or what gets it?"],
					[cellWith("Το σπίτι του Γιάννη.", mark("του Γιάννη", "genitive", "masculine")), "Owner", "whose is it?"],
				],
			},
			examples: [
				{
					greek: "Ο άντρας θέλει πορτοκαλάδα.",
					english: "The man wants orangeade.",
					marks: [mark("Ο άντρας", "nominative", "masculine"), mark("πορτοκαλάδα", "accusative", "feminine")],
				},
				{
					greek: "Το παιδί τρώει καρπούζι.",
					english: "The child is eating watermelon.",
					marks: [mark("Το παιδί", "nominative", "neuter"), mark("καρπούζι", "accusative", "neuter")],
				},
			],
			details: [
				{
					label: "Linking verbs: είμαι and γίνομαι",
					text: [
						"είμαι (I am) and γίνομαι (I become) don't act on anything. They link a noun to what it is or becomes, like an equals sign: both sides are the same person or thing.",
						"Try the table's question, who or what gets it? With βλέπω, I see, the doctor gets seen, so γιατρός changes to its Target form. With είμαι nothing is received, so there is no Target. The noun after it is neither a Target nor an Owner, so it stays in the plain form.",
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
							english: "I am a doctor. (plain form: nothing is received)",
							marks: [mark("γιατρός", "nominative", "masculine")],
						},
						{
							greek: "Η Χρυσάνθη είναι η μητέρα.",
							english: "Chrysanthi is the mother. (είναι, from είμαι)",
							marks: [mark("Η Χρυσάνθη", "nominative", "feminine"), mark("η μητέρα", "nominative", "feminine")],
						},
						{
							greek: "Ο γιος μου θέλει να γίνει γιατρός.",
							english: "My son wants to become a doctor. (γίνει, from γίνομαι)",
							marks: [mark("Ο γιος", "nominative", "masculine"), mark("γιατρός", "nominative", "masculine")],
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
				"The article is the word for “the”. It shows two things at once: the noun's gender (masculine, feminine or neuter) and its job.",
				"A noun's plain form, the one in the dictionary, is also its Doer form: the form for the noun that does the action. When the noun is the Target, what the action is done to, only the masculine and feminine articles change; the neuter stays the same.",
				"The word for “a” or “an” works the same way, but only the masculine changes.",
			],
			table: {
				columns: [
					{ label: "Masculine", greek: true },
					{ label: "Feminine", greek: true },
					{ label: "Neuter", greek: true },
					{ label: "Job" },
				],
				rows: [
					[
						markedCell("ο φίλος", "nominative", "masculine", false, "anchor"),
						markedCell("η μητέρα", "nominative", "feminine", false, "anchor"),
						markedCell("το παιδί", "nominative", "neuter", false, "anchor"),
						"Doer",
					],
					[
						markedCell("τον φίλο", "accusative", "masculine", false, "deviate"),
						markedCell("τη μητέρα", "accusative", "feminine", false, "deviate"),
						markedCell("το παιδί", "accusative", "neuter"),
						"Target",
					],
					[
						markedCell("ένας φίλος", "nominative", "masculine"),
						markedCell("μία μητέρα", "nominative", "feminine"),
						markedCell("ένα παιδί", "nominative", "neuter"),
						"Doer, a / an",
					],
					[
						markedCell("έναν φίλο", "accusative", "masculine", false, "deviate"),
						markedCell("μία μητέρα", "accusative", "feminine"),
						markedCell("ένα παιδί", "accusative", "neuter"),
						"Target, a / an",
					],
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
					english: "They're watching a film at the cinema.",
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
			title: "The Target for objects, names and times",
			rule: [
				"The Target is what the action is done to. For this job a noun leaves its plain form, the one in the dictionary, which is also the Doer form. The article changes, except in the neuter, and masculine nouns often change their ending too.",
				"Three kinds of word take the Target form:",
				[
					"whatever the verb acts on",
					"names, which change like any other noun",
					"times, with no word for “on” or “in”",
				],
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
					greek: "Το βράδυ βγαίνουν έξω.",
					english: "In the evening they go out.",
					marks: [mark("Το βράδυ", "accusative", "neuter")],
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
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
					{ label: "Job" },
				],
				rows: [
					[markedCell("ο γιατρός", "nominative", "masculine", false), markedCell("οι γιατροί", "nominative", "masculine", true), "Doer"],
					[markedCell("τον γιατρό", "accusative", "masculine"), markedCell("τους γιατρούς", "accusative", "masculine", true), "Target"],
					[
						markedCell("του γιατρού", "genitive", "masculine", false),
						markedCell("των γιατρών", "genitive", "masculine", true),
						"Owner",
					],
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
