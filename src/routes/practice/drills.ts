type Group = "articles" | "pronouns" | "verbs" | "blocks";
type Mode = "type" | "paradigm" | "chunk";

interface Drill {
	id: string;
	href: string;
	title: string;
	greek: string;
	english: string;
	group: Group;
	mode: Mode;
	minutes: number;
}

export const DRILLS: Drill[] = [
	// Articles & noun forms
	{
		id: "articles-context",
		group: "articles",
		mode: "type",
		href: "/practice/articles/context",
		title: "Articles in context",
		greek: "ο φίλος · τον φίλο · του φίλου",
		english: "Type the right article + noun, by case",
		minutes: 2,
	},
	{
		id: "articles-paradigm",
		group: "articles",
		mode: "paradigm",
		href: "/practice/articles/paradigm",
		title: "Article paradigm",
		greek: "ο, η, το, τον, την, του, της…",
		english: "All 18 forms — recall the grid",
		minutes: 1,
	},
	{
		id: "articles-contractions",
		group: "articles",
		mode: "paradigm",
		href: "/practice/articles/contractions",
		title: "Contractions (σε)",
		greek: "στον · στην · στο · στους",
		english: "σε + article fusions",
		minutes: 1,
	},
	{
		id: "articles-noun-cases",
		group: "articles",
		mode: "type",
		href: "/practice/articles/noun-cases",
		title: "Noun cases",
		greek: "λόγος → λόγο, λόγου",
		english: "Accusative & genitive endings",
		minutes: 2,
	},
	{
		id: "articles-noun-genders",
		group: "articles",
		mode: "paradigm",
		href: "/practice/articles/noun-genders",
		title: "Noun genders",
		greek: "ο φίλος · η θάλασσα · το σπίτι",
		english: "Assign gender to common nouns",
		minutes: 1,
	},

	// Pronouns
	{
		id: "pronouns-object",
		group: "pronouns",
		mode: "paradigm",
		href: "/practice/pronouns/object",
		title: "Object pronouns",
		greek: "με, σε, τον, την, μας, σας…",
		english: "Direct-object clitics",
		minutes: 1,
	},
	{
		id: "pronouns-possessives",
		group: "pronouns",
		mode: "paradigm",
		href: "/practice/pronouns/possessives",
		title: "Possessives",
		greek: "μου, σου, του, της, μας…",
		english: "Possession enclitics",
		minutes: 1,
	},

	// Verbs
	{
		id: "verbs-present",
		group: "verbs",
		mode: "type",
		href: "/practice/verbs/present",
		title: "Present-tense verbs",
		greek: "λύω · θέλω · μπορώ",
		english: "Conjugate everyday verbs",
		minutes: 2,
	},
	{
		id: "verbs-conjugation-endings",
		group: "verbs",
		mode: "paradigm",
		href: "/practice/verbs/conjugation-endings",
		title: "Conjugation endings",
		greek: "-ω · -εις · -ει · -ουμε · -ετε · -ουν",
		english: "Person endings across 6 paradigms",
		minutes: 1,
	},
	{
		id: "verbs-aorist-stems",
		group: "verbs",
		mode: "paradigm",
		href: "/practice/verbs/aorist-stems",
		title: "Aorist stems",
		greek: "τρώω → έφαγα · πίνω → ήπια",
		english: "Irregular past-tense roots",
		minutes: 1,
	},
	{
		id: "verbs-aorist-conjugation",
		group: "verbs",
		mode: "type",
		href: "/practice/verbs/aorist-conjugation",
		title: "Aorist conjugation",
		greek: "έκανα · έκανες · έκανε · κάναμε",
		english: "All 6 persons — past tense",
		minutes: 2,
	},
	{
		id: "verbs-aorist-deponent",
		group: "verbs",
		mode: "paradigm",
		href: "/practice/verbs/aorist-deponent",
		title: "Aorist: -μαι verbs",
		greek: "θυμήθηκα · έγινα · ήρθα",
		english: "-θηκα, active-style, and suppletive",
		minutes: 1,
	},
	{
		id: "verbs-aorist-consonants",
		group: "verbs",
		mode: "paradigm",
		href: "/practice/verbs/aorist-consonants",
		title: "Aorist: consonant rules",
		greek: "γράφω → έγραψα · ψάχνω → έψαξα",
		english: "φ→ψ · χ→ξ · ζ→σ — predict the suffix",
		minutes: 1,
	},
	{
		id: "verbs-aorist-augment",
		group: "verbs",
		mode: "paradigm",
		href: "/practice/verbs/aorist-augment",
		title: "Aorist: the augment",
		greek: "γράφω → έγραψα · δουλεύω → δούλεψα",
		english: "When does ε- appear?",
		minutes: 1,
	},
	{
		id: "verbs-imperatives",
		group: "verbs",
		mode: "paradigm",
		href: "/practice/verbs/imperatives",
		title: "Imperatives",
		greek: "Έλα! · Πες! · Δώσε! · Φέρε!",
		english: "Common command forms",
		minutes: 1,
	},

	// Building blocks
	{
		id: "blocks-chunks",
		group: "blocks",
		mode: "chunk",
		href: "/practice/blocks/chunks",
		title: "Survival phrases",
		greek: "Γεια σου · Ευχαριστώ · Θα ήθελα",
		english: "Whole phrases, no decomposition",
		minutes: 1,
	},
	{
		id: "blocks-numbers",
		group: "blocks",
		mode: "paradigm",
		href: "/practice/blocks/numbers",
		title: "Numbers",
		greek: "ένα, δύο, δέκα, είκοσι, τριάντα…",
		english: "1–100",
		minutes: 1,
	},
	{
		id: "blocks-days-of-week",
		group: "blocks",
		mode: "paradigm",
		href: "/practice/blocks/days-of-week",
		title: "Days & time",
		greek: "Δευτέρα · Τρίτη · χτες · αύριο",
		english: "Days, yesterday, tomorrow",
		minutes: 1,
	},
];

export const DRILL_BY_ID: Record<string, Drill> = Object.fromEntries(
	DRILLS.map((d) => [d.id, d]),
);

export const GROUP_META: Record<Group, { label: string }> = {
	articles: { label: "Articles & noun forms" },
	pronouns: { label: "Pronouns" },
	verbs: { label: "Verbs" },
	blocks: { label: "Building blocks" },
};

export const GROUP_ORDER: Group[] = ["articles", "pronouns", "verbs", "blocks"];

export const MODE_META: Record<Mode, { label: string; tone: string }> = {
	type: { label: "Type", tone: "border-terracotta-200 bg-terracotta-50 text-terracotta-text" },
	paradigm: { label: "Paradigm", tone: "border-olive-200 bg-olive-50 text-olive-text" },
	chunk: { label: "Chunk", tone: "border-honey-200 bg-honey-50 text-honey-text" },
};
