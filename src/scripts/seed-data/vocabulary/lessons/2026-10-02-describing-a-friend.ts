import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_10_02 = createLesson({
	meta: {
		date: "2026-10-02",
		topic: "Describing a friend: name, job, origin and home",
		source:
			"Weekly lesson with Konstantina - three ways to give a name (Doer, Owner, τον λένε), job with είναι / ως / κάνει τη δουλειά, από and σε; reviewed the Είμαστε relationships homework",
		homework:
			"Answer the four questions (name, job, where from, where they live) for two people, such as parents or a couple, to practise the plural",
	},

	verbs: [
		{
			lemma: "λέω",
			english: "I say; (με) λένε = they call (me)",
			conjugationFamily: "irregular",
			cefrLevel: "A1",
		},
		{ lemma: "δουλεύω", english: "I work", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "μένω", english: "I live/stay", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "μαθαίνω", english: "I learn", conjugationFamily: "-ω", cefrLevel: "A1" },
		{
			lemma: "περνάω",
			english: "I pass; I spend (time), as in περνάμε χρόνο μαζί",
			conjugationFamily: "-άω",
			cefrLevel: "A2",
		},
	],

	nouns: [
		{ lemma: "ηλεκτρολόγος", gender: "masculine", english: "electrician", cefrLevel: "B1" },
		{ lemma: "δουλειά", gender: "feminine", english: "work/job", cefrLevel: "A1" },
		{ lemma: "όνομα", gender: "neuter", english: "name", cefrLevel: "A1" },
		{ lemma: "διαμέρισμα", gender: "neuter", english: "flat, apartment", cefrLevel: "A1" },
		{ lemma: "Γερμανία", gender: "feminine", english: "Germany", cefrLevel: "A1" },
		{ lemma: "Σαββατοκύριακο", gender: "neuter", english: "weekend", cefrLevel: "A1" },
		{ lemma: "νταντά", gender: "feminine", english: "nanny", cefrLevel: "B1" },
	],

	adverbs: [
		{ lemma: "μαζί", english: "together", cefrLevel: "A1" },
		{ lemma: "καλά", english: "well", cefrLevel: "A1" },
		{ lemma: "τώρα", english: "now", cefrLevel: "A1" },
	],

	phrases: [
		// The homework questions about another person
		{ text: "Ποιο είναι το όνομά του;", english: "What's his name?" },
		{ text: "Τι δουλειά κάνει;", english: "What does he do for work?" },
		{ text: "Από πού είναι;", english: "Where is he from?" },
		{ text: "Πού μένει;", english: "Where does he live?" },
		// Three ways to give a name
		{
			text: "Ο φίλος μου είναι ο Καμ.",
			english: "My friend is Kam.",
			metadata: { pattern: "Doer + είναι + Doer", note: "names take the article: ο Καμ" },
		},
		{
			text: "Το όνομα του φίλου μου είναι Καμ.",
			english: "My friend's name is Kam.",
			metadata: { pattern: "Owner: του φίλου μου", note: "correct but the least natural of the three" },
		},
		{
			text: "Τον λένε Καμ.",
			english: "His name is Kam. (They call him Kam.)",
			metadata: { pattern: "Target pronoun + λένε", note: "με λένε, σε λένε, τον λένε, τη λένε" },
		},
		{
			text: "Τον φίλο μου τον λένε Καμ.",
			english: "My friend is called Kam.",
			metadata: { pattern: "Target noun first, repeated by τον" },
		},
		{
			text: "Μας λένε όμορφους.",
			english: "They call us beautiful.",
			metadata: { pattern: "λένε + Target pronoun + adjective in the Target form" },
		},
		// Job
		{
			text: "Ο Καμ είναι ηλεκτρολόγος.",
			english: "Kam is an electrician.",
			metadata: { pattern: "είναι + job, no article" },
		},
		{
			text: "Δουλεύει ως ηλεκτρολόγος.",
			english: "He works as an electrician.",
			metadata: { pattern: "ως = as" },
		},
		{
			text: "Η δουλειά του είναι ηλεκτρολόγος.",
			english: "His job is electrician.",
			metadata: { pattern: "both sides of είναι in the plain form" },
		},
		{
			text: "Κάνει καλά τη δουλειά του.",
			english: "He does his job well.",
			metadata: { pattern: "τη δουλειά is the Target of κάνει" },
		},
		// Origin and home
		{
			text: "Ο Καμ είναι από τη Νότια Αφρική.",
			english: "Kam is from South Africa.",
			metadata: { pattern: "από + Target form" },
		},
		{ text: "Μένει στη Γερμανία.", english: "He lives in Germany.", metadata: { pattern: "σε + τη → στη" } },
		{
			text: "Είμαι από τη Νότια Αφρική, αλλά τώρα μένω στην Κύπρο.",
			english: "I'm from South Africa, but now I live in Cyprus.",
			metadata: { note: "correction: not από στην Κύπρο; one preposition at a time" },
		},
		// Homework: relationships with Είμαστε
		{
			text: "Είμαστε ζευγάρι. Μένουμε μαζί σε ένα διαμέρισμα.",
			english: "We're a couple. We live together in a flat.",
		},
		{
			text: "Είμαστε φίλοι. Μας αρέσει να κάνουμε πράγματα μαζί.",
			english: "We're friends. We like doing things together.",
		},
		{ text: "Είμαστε συνάδελφοι. Δουλεύουμε μαζί.", english: "We're colleagues. We work together." },
		{
			text: "Είμαστε συμμαθητές. Στο σχολείο μαθαίνουμε μαζί.",
			english: "We're classmates. At school we learn together.",
		},
		{ text: "Είμαστε γονείς. Έχουμε ένα παιδί μαζί.", english: "We're parents. We have a child together." },
		{
			text: "Είμαστε αδέρφια. Περνάμε πολύ χρόνο μαζί.",
			english: "We're siblings. We spend a lot of time together.",
			metadata: { note: "correction: περνάμε χρόνο, not μένουμε χρόνο" },
		},
		{ text: "Αυτοί ήταν φίλοι.", english: "They were friends.", metadata: { pattern: "ήταν = they were" } },
		// Goodbyes
		{ text: "Τα λέμε την Τρίτη.", english: "See you on Tuesday." },
		{ text: "Καλό Σαββατοκύριακο!", english: "Have a good weekend!" },
	],

	grammarNotes: [
		{
			pattern: "Three ways to give someone's name",
			examples: [
				"Ο φίλος μου είναι ο Καμ. (Doer form)",
				"Το όνομα του φίλου μου είναι Καμ. (Owner form)",
				"Τον λένε Καμ. (Target form: they call him Kam)",
			],
			explanation:
				"The same fact in three cases. τον λένε is the most natural: λένε, they call, takes a Target, so it is με λένε, σε λένε, τον λένε, τη λένε. A name keeps its article: ο Καμ, τον Καμ.",
			section: "little-words/objects",
		},
		{
			pattern: "Target noun first, repeated by τον",
			examples: ["Τον φίλο μου τον λένε Καμ.", "Τη Μαρία τη λένε Μαρία."],
			explanation:
				"When the Target noun comes first, the short word τον, τη, το repeats it before the verb.",
			section: "little-words/where-it-goes",
		},
		{
			pattern: "Two sets of short pronouns",
			examples: [
				"Target: με, σε, τον, την, μας, σας, τους, τις",
				"Owner: μου, σου, του, της, μας, σας, τους",
			],
			explanation:
				"The Target set goes before a verb for me, you, him: τον λένε. The Owner set goes after a noun for my, your, his: η δουλειά του. μας, σας and τους appear in both.",
			section: "little-words/objects",
		},
		{
			pattern: "The job after είναι, the job as a Target",
			examples: [
				"Η δουλειά του είναι ηλεκτρολόγος. (plain form on both sides)",
				"Κάνει καλά τη δουλειά του. (τη δουλειά is the Target)",
			],
			explanation:
				"After είναι nothing is done to the noun, so it stays in the plain form. After κάνει the job is what he does, so it takes the Target form. The linking verbs section could take this pair as its contrast example.",
			section: "roles/linking",
		},
		{
			pattern: "λένε + adjective in the Target form",
			examples: ["Μας λένε όμορφους.", "Σας λένε ψηλούς."],
			explanation:
				"The adjective describes the Target pronoun, so it takes the Target form too: όμορφος → όμορφους.",
			section: "agreement/adjective-jobs",
		},
		{
			pattern: "από or σε, not both",
			examples: ["Είμαι από τη Νότια Αφρική.", "Μένω στην Κύπρο.", "not: από στην Κύπρο"],
			explanation:
				"από gives where from, σε where you are. Use one before a place, never both together. Both take the Target form.",
			section: "place/purpose",
		},
		{
			pattern: "ήταν: they were",
			examples: ["Αυτοί είναι φίλοι. → Αυτοί ήταν φίλοι.", "Αυτοί ήταν ζευγάρι."],
			explanation: "ήταν is both he/she was and they were.",
			section: "verbs/eimai",
		},
	],
});
