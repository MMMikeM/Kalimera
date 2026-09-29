import type { Guide } from "@/types/guide";

export const ROLES_GUIDE: Guide = {
	slug: "roles",
	title: "Who does what",
	greek: "Ποιος κάνει τι",
	description: "Doer, Target, Owner, and the article that shows them",
	idea: "A Greek noun changes its article and ending to show its job in the sentence: the Doer does it, the Target has it done to it, the Owner owns something. The ending, not the word order, tells you who did what.",
	sections: [
		{
			id: "overview",
			title: "Three jobs a noun can do",
			rule: "Every noun in a sentence is doing one of three jobs, and you can see which from the article in front of it.",
			table: {
				columns: [
					{ label: "Example", greek: true },
					{ label: "Job" },
					{ label: "Asks" },
				],
				rows: [
					["Ο Γιάννης τρώει.", "Doer", "who does it?"],
					["Βλέπω τον Γιάννη.", "Target", "who or what gets it?"],
					["Το σπίτι του Γιάννη.", "Owner", "whose is it?"],
				],
			},
			examples: [
				{ greek: "Ο άντρας θέλει πορτοκαλάδα.", english: "The man wants orange juice." },
				{ greek: "Το παιδί τρώει καρπούζι.", english: "The child is eating watermelon." },
			],
			drills: ["articles-paradigm"],
		},
		{
			id: "articles",
			title: "The article: ο, η, το",
			rule: "The article shows gender and job at once. For the Target only the masculine and feminine change: ο becomes τον, η becomes τη; το stays το. For a or an, use ένας, μία, ένα.",
			table: {
				columns: [
					{ label: "Masculine", greek: true },
					{ label: "Feminine", greek: true },
					{ label: "Neuter", greek: true },
					{ label: "Job" },
				],
				rows: [
					[{ text: "ο άντρας", weight: "anchor" }, { text: "η γυναίκα", weight: "anchor" }, { text: "το παιδί", weight: "anchor" }, "Doer"],
					[{ text: "τον άντρα", weight: "deviate" }, { text: "τη γυναίκα", weight: "deviate" }, "το παιδί", "Target"],
					["ένας άντρας", "μία γυναίκα", "ένα παιδί", "Doer, a / an"],
					[{ text: "έναν άντρα", weight: "deviate" }, "μία γυναίκα", "ένα παιδί", "Target, a / an"],
				],
			},
			examples: [
				{ greek: "Η Χρυσάνθη είναι η γυναίκα του.", english: "Chrysanthi is his wife." },
				{ greek: "Βλέπουν μια ταινία στο σινεμά.", english: "They're watching a film at the cinema." },
			],
			drills: ["articles-article-doer", "articles-article-target"],
		},
		{
			id: "target",
			title: "The Target: objects, names and times",
			rule: "Whatever the verb acts on takes the Target form, and so does a name used that way. Days and times of day take it too: τη Δευτέρα means on Monday.",
			table: {
				columns: [
					{ label: "Doer form", greek: true },
					{ label: "Target form", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["ο φίλος", { text: "τον φίλο", weight: "deviate" }, "the friend"],
					["οι φίλοι", { text: "τους φίλους", weight: "deviate" }, "the friends"],
					["η Δευτέρα", "τη Δευτέρα", "(on) Monday"],
					["το πρωί", "το πρωί", "(in) the morning"],
				],
			},
			examples: [
				{
					greek: "Έχουν δύο παιδιά, τον Αλέξανδρο και τη Λίζα.",
					english: "They have two children, Alexandros and Liza.",
				},
				{ greek: "Βλέπω τρεις ανθρώπους.", english: "I see three people." },
				{ greek: "Το βράδυ βγαίνουν έξω.", english: "In the evening they go out." },
			],
			drills: ["nominal-noun-target", "nominal-phrase-target"],
		},
		{
			id: "owner",
			title: "The Owner: whose",
			rule: "The Owner comes after the thing owned: το σπίτι του Γιάννη, the house of Yannis. Masculine nouns in -ος end in -ου. In the plural every noun ends in -ων, but the stress does not always move onto it: των γιατρών, yet των ανθρώπων.",
			table: {
				columns: [
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
					{ label: "Job" },
				],
				rows: [
					[{ text: "ο γιατρός", weight: "anchor" }, "οι γιατροί", "Doer"],
					["τον γιατρό", "τους γιατρούς", "Target"],
					[{ text: "του γιατρού", weight: "deviate" }, { text: "των γιατρών", weight: "deviate" }, "Owner"],
				],
			},
			examples: [
				{
					greek: "Το ποδήλατο του αδερφού μου είναι κόκκινο.",
					english: "My brother's bicycle is red.",
				},
				{ greek: "Πόσων χρονών είσαι;", english: "How old are you? (literally: of how many years)" },
				{ greek: "Ακούω το νερό του ποταμού.", english: "I hear the water of the river." },
			],
			drills: ["nominal-noun-owner", "articles-article-owner", "pronouns-possessive-vs-article"],
		},
	],
	reference: [
		{ label: "Cases", href: "/reference/cases" },
		{ label: "Articles", href: "/reference/articles" },
		{ label: "Nouns", href: "/reference/nouns" },
	],
};
