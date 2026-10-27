import { mark } from "@/lib/guide-marks";
import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_10_23 = createLesson({
	meta: {
		date: "2026-10-23",
		topic: "Sharing family news: a role-play",
		source:
			"Weekly lesson - role-play from the textbook cards: two old friends meet after years and share their family news; παντρεμένος agreeing with who is married; εγγόνι, εγγονός, εγγονή; Θα γίνεις παππούς and είσαι ήδη παππούς; μεγάλος for old; Σου αρέσει; with σου first; ο γιος της κόρης μου and εκτός γάμου in the Owner form; να σας ζήσει, the wish for a new child",
		homework:
			"Treat the role cards as a prompt to improvise: prepare the words and questions you'll need (who is married, how old, boy or girl, where they live)",
	},

	verbs: [
		{ lemma: "συναντάω", english: "I meet", conjugationFamily: "-άω", cefrLevel: "A2" },
		{ lemma: "γίνομαι", english: "I become", conjugationFamily: "-ομαι", cefrLevel: "A1" },
		{
			lemma: "περιμένω",
			english: "I wait; περιμένω παιδί = I'm expecting a baby",
			conjugationFamily: "-ω",
			cefrLevel: "A2",
		},
	],

	nouns: [
		{ lemma: "οικογένεια", gender: "feminine", english: "family", cefrLevel: "A1" },
		{ lemma: "γιος", gender: "masculine", english: "son", cefrLevel: "A1" },
		{ lemma: "κόρη", gender: "feminine", english: "daughter", cefrLevel: "A1" },
		{ lemma: "παππούς", gender: "masculine", english: "grandfather", cefrLevel: "A1" },
		{ lemma: "εγγόνι", gender: "neuter", english: "grandchild", cefrLevel: "A2" },
		{ lemma: "εγγονός", gender: "masculine", english: "grandson", cefrLevel: "A2" },
		{ lemma: "εγγονή", gender: "feminine", english: "granddaughter", cefrLevel: "A2" },
		{ lemma: "αγόρι", gender: "neuter", english: "boy", cefrLevel: "A1" },
		{ lemma: "κορίτσι", gender: "neuter", english: "girl", cefrLevel: "A1" },
		{ lemma: "γάμος", gender: "masculine", english: "marriage; wedding", cefrLevel: "A2" },
	],

	adjectives: [
		{ lemma: "παντρεμένος", english: "married", cefrLevel: "A1" },
		{ lemma: "μεγάλος", english: "big; old (of people)", cefrLevel: "A1" },
	],

	adverbs: [
		{ lemma: "φυσικά", english: "of course", cefrLevel: "A1" },
		{ lemma: "μακριά", english: "far away", cefrLevel: "A2" },
		{ lemma: "ήδη", english: "already", cefrLevel: "A2" },
	],

	phrases: [
		// The role cards
		{
			text: "Συναντάω μια φίλη μετά από χρόνια.",
			english: "I meet a (female) friend after many years.",
			metadata: { pattern: "μετά από + length of time", note: "for a male friend: έναν φίλο" },
		},
		{ text: "Συναντάω έναν φίλο μετά από χρόνια.", english: "I meet a (male) friend after many years." },
		{
			text: "Λέμε τα νέα της οικογένειάς μας.",
			english: "We share our family news.",
			metadata: {
				pattern: "τα νέα + Owner: της οικογένειας",
				note: "οικογένεια takes a second accent before μας",
			},
		},
		{
			text: "Τώρα τα παιδιά μου είναι παντρεμένα και έχω δύο εγγόνια.",
			english: "My children are married now, and I have two grandchildren.",
			metadata: { pattern: "παντρεμένα agrees with τα παιδιά: neuter plural" },
		},
		{
			text: "Ο γιος μου είναι τώρα παντρεμένος και περιμένει παιδί.",
			english: "My son is married now and expecting a child.",
			metadata: { pattern: "περιμένω παιδί = to be expecting" },
		},
		{
			text: "Η κόρη μου έχει έναν γιο εκτός γάμου.",
			english: "My daughter has a son outside marriage.",
			metadata: { pattern: "εκτός + Owner form" },
		},
		// From the role-play
		{
			text: "Θα γίνεις παππούς!",
			english: "You're going to be a grandfather!",
			metadata: { pattern: "γίνομαι + plain form" },
		},
		{ text: "Είσαι ήδη παππούς.", english: "You're already a grandfather." },
		{
			text: "Είναι μεγάλος.",
			english: "He's old.",
			metadata: { note: "literally big; Greek uses μεγάλος for the age of people" },
		},
		{ text: "Φυσικά.", english: "Of course." },
		{ text: "Μένουν μακριά.", english: "They live far away." },
		{
			text: "Σου αρέσει;",
			english: "Do you like it?",
			metadata: { pattern: "σου before αρέσει", note: "not αρέσει σου" },
		},
		{ text: "Αγόρι ή κορίτσι;", english: "A boy or a girl?" },
		{
			text: "ο γιος της κόρης μου",
			english: "my daughter's son",
			metadata: { pattern: "Owner: η κόρη → της κόρης" },
		},
		{
			text: "Να σας ζήσει!",
			english: "Congratulations! (the wish for a new baby)",
			metadata: { note: "literally may it live for you" },
		},
		{
			text: "Να σας ζήσουν!",
			english: "Congratulations! (the wish for more than one child)",
			metadata: { pattern: "ζήσουν: more than one child" },
		},
		{ text: "Αλήθεια;", english: "Really?" },
		// Questions to prepare for next time
		{ text: "Είναι παντρεμένος;", english: "Is he married?" },
		{ text: "Πόσων χρονών είναι;", english: "How old is he?" },
		{ text: "Πού μένουν;", english: "Where do they live?" },
	],

	grammarNotes: [
		{
			pattern: "παντρεμένος agrees with who is married",
			examples: [
				{ greek: "Ο γιος μου είναι παντρεμένος.", english: "My son is married.", marks: [mark("Ο γιος", "nominative", "masculine"), mark("παντρεμένος", "nominative", "masculine")] },
				{ greek: "Η κόρη μου είναι παντρεμένη.", english: "My daughter is married.", marks: [mark("Η κόρη", "nominative", "feminine"), mark("παντρεμένη", "nominative", "feminine")] },
				{ greek: "Τα παιδιά μου είναι παντρεμένα.", english: "My children are married.", marks: [mark("Τα παιδιά", "nominative", "neuter", true), mark("παντρεμένα", "nominative", "neuter", true)] },
			],
			explanation:
				"After είμαι, παντρεμένος copies the gender and number of the person described. τα παιδιά is neuter plural, so the ending is -α: παντρεμένα.",
			section: "agreement/describing-yourself",
		},
		{
			pattern: "εγγόνι, εγγονός, εγγονή",
			examples: [{ greek: "το εγγόνι · τα εγγόνια", english: "grandchild · grandchildren", marks: [mark("το εγγόνι", "nominative", "neuter"), mark("τα εγγόνια", "nominative", "neuter", true)] }, { greek: "ο εγγονός", english: "grandson", marks: [mark("ο εγγονός", "nominative", "masculine")] }, { greek: "η εγγονή", english: "granddaughter", marks: [mark("η εγγονή", "nominative", "feminine")] }],
			explanation:
				"ο εγγονός and η εγγονή are a masculine and feminine pair. το εγγόνι is neuter and covers either, like το παιδί: έχω δύο εγγόνια.",
			section: "gender/gender-pairs",
		},
		{
			pattern: "γίνομαι and είμαι + plain form",
			examples: [{ greek: "Θα γίνεις παππούς.", english: "You're going to be a grandfather.", marks: [mark("παππούς", "nominative", "masculine")] }, { greek: "Είσαι ήδη παππούς.", english: "You're already a grandfather.", marks: [mark("παππούς", "nominative", "masculine")] }],
			explanation:
				"γίνομαι, I become, links like είμαι, so παππούς keeps its plain form. θα γίνεις is its future: you'll become.",
			section: "roles/linking",
		},
		{
			pattern: "Σου αρέσει; σου comes first",
			examples: ["Σου αρέσει;", "not: Αρέσει σου;"],
			explanation: "The short word for the person who likes goes before αρέσει.",
			section: "little-words/likes",
		},
		{
			pattern: "My daughter's son: ο γιος της κόρης μου",
			examples: [{ greek: "ο γιος της κόρης μου", english: "my daughter's son", marks: [mark("ο γιος", "nominative", "masculine"), mark("της κόρης", "genitive", "feminine"), mark("μου", "genitive")] }, { greek: "η κόρη του γιου μου", english: "my son's daughter", marks: [mark("η κόρη", "nominative", "feminine"), mark("του γιου", "genitive", "masculine"), mark("μου", "genitive")] }],
			explanation:
				"The owner comes second, in the Owner form. Feminines add -ς: η κόρη → της κόρης. μου at the end belongs to κόρη.",
			section: "owner-calling/owner",
		},
		{
			pattern: "Second accent: της οικογένειάς μας",
			examples: [{ greek: "η οικογένεια → της οικογένειάς μας", english: "the family → of our family", marks: [mark("η οικογένεια", "nominative", "feminine"), mark("της οικογένειάς", "genitive", "feminine"), mark("μας", "genitive")] }],
			explanation:
				"οικογένεια is stressed on its third-last syllable, so before μας it takes a second accent on its last syllable.",
			section: "little-words/forms",
		},
		{
			pattern: "μετά από χρόνια: after years",
			examples: [{ greek: "Συναντάω μια φίλη μετά από χρόνια.", english: "I'm meeting a friend after years.", marks: [mark("χρόνια", "accusative", "neuter", true)] }],
			explanation: "Before a length of time, μετά από means after. χρόνια here is years.",
			section: "place/without-until",
		},
		{
			pattern: "εκτός + Owner form",
			examples: [{ greek: "εκτός γάμου", english: "outside marriage", marks: [mark("γάμου", "genitive", "masculine")] }],
			explanation:
				"εκτός, outside or except, takes the Owner form, with no article here: ο γάμος → εκτός γάμου. Most small words of place take the Target form instead.",
			section: "word",
		},
		{
			pattern: "Να σας ζήσει! The wish for a new child",
			examples: ["Να σας ζήσει! (one child)", "Να σας ζήσουν! (more than one)"],
			explanation:
				"Said to new parents: may it live for you. The verb agrees with the child, so ζήσει for one and ζήσουν for more.",
			section: "word",
		},
		{
			pattern: "περιμένω παιδί: to be expecting",
			examples: ["Ο γιος μου περιμένει παιδί."],
			explanation: "περιμένω is to wait for, so περιμένω παιδί, I'm waiting for a child, means a baby is on the way.",
			section: "word",
		},
		{
			pattern: "μεγάλος for old",
			examples: ["Είναι μεγάλος. (he's old)"],
			explanation: "For the age of a person, Greek says big: μεγάλος, μεγάλη.",
			section: "word",
		},
	],
});
