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
			rule: "Every noun in a sentence does one of three jobs. The Doer does the action. The Target is what the action is done to. The Owner is who something belongs to. A Greek noun shows its job by changing its article and often its ending: ο Γιάννης, τον Γιάννη, του Γιάννη. Because the job is marked on the word, it stays the same whatever the word order.",
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
					label: "After είμαι and γίνομαι",
					text: "είμαι (be) and γίνομαι (become) don't act on anything; they say what someone or something is. So the noun after them is not a Target, and both nouns take the Doer form.",
					examples: [
						{
							greek: "Η Χρυσάνθη είναι η μητέρα.",
							english: "Chrysanthi is the mother.",
							marks: [mark("Η Χρυσάνθη", "nominative", "feminine"), mark("η μητέρα", "nominative", "feminine")],
						},
						{
							greek: "Ο γιος μου θέλει να γίνει γιατρός.",
							english: "My son wants to be a doctor.",
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
			rule: "The article is the word for “the” that comes before a noun: ο, η, το. It shows two things at once: the noun's gender (masculine, feminine or neuter) and its job. For the Doer, whoever does the action, it is ο, η, το. For the Target, what the action is done to, only the masculine and feminine change: ο becomes τον and η becomes τη; το stays το. The word for “a” or “an” works the same way: ένας, μία, ένα, and only ένας changes, to έναν.",
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
			],
			details: [
				{
					label: "τη or την",
					text: "The Target article την keeps its -ν before a vowel, before κ, π, τ, ξ and ψ, and before μπ, ντ, γκ, τσ and τζ: την πόρτα, την μπάλα. Before any other consonant it usually drops: τη μητέρα. Keeping it anyway is widely accepted. τον keeps its -ν even before φ, since το φίλο would read as neuter.",
					examples: [
						{
							greek: "Κλείνω την πόρτα.",
							english: "I close the door.",
							marks: [mark("την πόρτα", "accusative", "feminine")],
						},
					],
				},
			],
			drills: ["articles-article-doer", "articles-article-target"],
		},
		{
			id: "target",
			title: "The Target for objects, names and times",
			rule: "The Target is what the action is done to, and it takes the Target form: the article changes (ο φίλος becomes τον φίλο, οι φίλοι becomes τους φίλους), and masculine nouns often change their ending too. Whatever the verb acts on takes this form, names included: τον Αλέξανδρο, τη Λίζα. So do times, with no word for on or in: τη Δευτέρα, on Monday; το πρωί, in the morning; την επόμενη εβδομάδα, next week. Months are masculine, so they take τον: τον Ιούλιο, in July.",
			table: {
				columns: [
					{ label: "Doer form", greek: true },
					{ label: "Target form", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("ο φίλος", "nominative", "masculine"), markedCell("τον φίλο", "accusative", "masculine", false, "deviate"), "the friend"],
					[markedCell("οι φίλοι", "nominative", "masculine", true), markedCell("τους φίλους", "accusative", "masculine", true, "deviate"), "the friends"],
					[markedCell("η Δευτέρα", "nominative", "feminine"), markedCell("τη Δευτέρα", "accusative", "feminine"), "(on) Monday"],
					[markedCell("το πρωί", "nominative", "neuter"), markedCell("το πρωί", "accusative", "neuter"), "(in) the morning"],
					[markedCell("ο Ιούλιος", "nominative", "masculine"), markedCell("τον Ιούλιο", "accusative", "masculine", false, "deviate"), "(in) July"],
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
			],
			details: [
				{
					label: "After κάθε",
					text: "After κάθε (every) there is no article: κάθε Τρίτη, every Tuesday.",
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
			rule: "The Owner is who or what something belongs to, like English 's or of. It comes after the thing owned: το σπίτι του Γιάννη, Yannis's house. Masculine nouns in -ος, shown in the table, take του and end in -ου: ο γιατρός, του γιατρού. In the plural the article is των and every noun ends in -ων: των γιατρών.",
			table: {
				columns: [
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
					{ label: "Job" },
				],
				rows: [
					[markedCell("ο γιατρός", "nominative", "masculine", false, "anchor"), markedCell("οι γιατροί", "nominative", "masculine", true), "Doer"],
					[markedCell("τον γιατρό", "accusative", "masculine"), markedCell("τους γιατρούς", "accusative", "masculine", true), "Target"],
					[
						markedCell("του γιατρού", "genitive", "masculine", false, "deviate"),
						markedCell("των γιατρών", "genitive", "masculine", true, "deviate"),
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
			rule: "The article is the word for “the”: ο, η, το and their other forms. Greek puts it where English leaves it out: before countries, people's names in speech, ideas such as love, a whole kind of thing, and days. It also leaves it out in a few set places, listed below the table.",
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
					[{ text: "είμαι προγραμματιστής", weight: "deviate", marks: [mark("προγραμματιστής", "nominative", "masculine")] }, "I'm a programmer", "a job, no article"],
					[{ text: "πίνω καφέ", weight: "deviate", marks: [mark("καφέ", "accusative", "masculine")] }, "I drink coffee", "an activity, no article"],
					[{ text: "πάω σινεμά", weight: "deviate", marks: [mark("σινεμά", "accusative", "neuter")] }, "I go to the cinema", "an activity, no article"],
					[{ text: "κάνω σπορ", weight: "deviate", marks: [mark("σπορ", "accusative", "neuter")] }, "I do sport", "an activity, no article"],
				],
			},
			details: [
				{
					label: "Jobs and set activities",
					text: "A job after είμαι takes no article: είμαι προγραμματιστής, I'm a programmer. Nor do set activities such as πίνω καφέ, πάω σινεμά and κάνω σπορ.",
				},
				{
					label: "After κάθε",
					text: "A day loses its article after κάθε (every): κάθε Τρίτη, every Tuesday.",
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
