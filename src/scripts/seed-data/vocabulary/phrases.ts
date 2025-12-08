import type { Phrase } from "../../../types/phrase";

// Essential phrases - THE most important phrases for a beginner
// These should be learned first
export const ESSENTIAL_PHRASES: Phrase[] = [
	{ text: "Ευχαριστώ", english: "thank you" },
	{ text: "Παρακαλώ", english: "please / you're welcome" },
	{ text: "Συγγνώμη", english: "sorry / excuse me" },
	{ text: "Ναι", english: "yes" },
	{ text: "Όχι", english: "no" },
	{ text: "Γεια σας", english: "hello / goodbye (formal)" },
	{ text: "Γεια σου", english: "hi / bye (informal)" },
	{ text: "Καλημέρα", english: "good morning" },
	{ text: "Καλησπέρα", english: "good evening" },
	{ text: "Καληνύχτα", english: "good night" },
];

// Survival phrases - critical for getting by when you don't understand
export const SURVIVAL_PHRASES: Phrase[] = [
	{ text: "Δεν καταλαβαίνω", english: "I don't understand" },
	{ text: "Μιλάτε αγγλικά;", english: "do you speak English?" },
	{ text: "Μιλάτε πιο αργά;", english: "can you speak more slowly?" },
	{ text: "Πού είναι η τουαλέτα;", english: "where is the bathroom?" },
	{ text: "Βοήθεια!", english: "help!" },
	{ text: "Πόσο κάνει;", english: "how much does it cost?" },
	{ text: "Τι σημαίνει αυτό;", english: "what does this mean?" },
	{ text: "Πώς λέγεται αυτό;", english: "what is this called?" },
	{ text: "Εντάξει", english: "okay" },
];

// Polite request phrases - asking for things nicely
export const REQUEST_PHRASES: Phrase[] = [
	{ text: "Θα ήθελα...", english: "I would like..." },
	{ text: "Μπορώ να έχω...;", english: "can I have...?" },
	{ text: "Μπορείτε να με βοηθήσετε;", english: "can you help me? (formal)" },
	{ text: "Μπορείς να μου πεις;", english: "can you tell me? (informal)" },
	{ text: "Μου δίνετε...;", english: "can you give me...? (polite)" },
	{ text: "Θέλω...", english: "I want..." },
	{ text: "Χρειάζομαι...", english: "I need..." },
];

// Days of the week - all feminine except Saturday (neuter)
export const DAYS_OF_WEEK: Phrase[] = [
	{ text: "η Δευτέρα", english: "Monday" },
	{ text: "η Τρίτη", english: "Tuesday" },
	{ text: "η Τετάρτη", english: "Wednesday" },
	{ text: "η Πέμπτη", english: "Thursday" },
	{ text: "η Παρασκευή", english: "Friday" },
	{ text: "το Σάββατο", english: "Saturday" },
	{ text: "η Κυριακή", english: "Sunday" },
];

// Months of the year - all masculine
export const MONTHS: Phrase[] = [
	{ text: "ο Ιανουάριος", english: "January" },
	{ text: "ο Φεβρουάριος", english: "February" },
	{ text: "ο Μάρτιος", english: "March" },
	{ text: "ο Απρίλιος", english: "April" },
	{ text: "ο Μάιος", english: "May" },
	{ text: "ο Ιούνιος", english: "June" },
	{ text: "ο Ιούλιος", english: "July" },
	{ text: "ο Αύγουστος", english: "August" },
	{ text: "ο Σεπτέμβριος", english: "September" },
	{ text: "ο Οκτώβριος", english: "October" },
	{ text: "ο Νοέμβριος", english: "November" },
	{ text: "ο Δεκέμβριος", english: "December" },
];

// Discourse fillers & connectors - words that connect natural speech
export const DISCOURSE_FILLERS: Phrase[] = [
	{ text: "φυσικά", english: "of course" },
	{ text: "επίσης", english: "also" },
	{ text: "γι' αυτό", english: "that's why/therefore" },
	{ text: "αν", english: "if" },
	{ text: "όταν", english: "when" },
	{ text: "σιγά σιγά", english: "slowly/little by little" },
	{ text: "μαζί", english: "together" },
];

// Social phrases - common things to say
export const SOCIAL_PHRASES: Phrase[] = [
	{ text: "τι γίνεται;", english: "what's happening?" },
	{ text: "τα λέμε", english: "see ya" },
	{ text: "καλή όρεξη", english: "bon appetit/enjoy your meal" },
	{ text: "κάτι", english: "something" },
	{ text: "τα πάντα", english: "everything" },
];

// Question words - separate from expressions to avoid duplication
export const QUESTION_WORDS: Phrase[] = [
	// Basic interrogatives
	{ text: "τι;", english: "what?" },
	{ text: "πού;", english: "where?" },
	{ text: "πότε;", english: "when?" },
	{ text: "πώς;", english: "how?" },
	{ text: "γιατί;", english: "why?" },

	// "Who/which" - declines by gender
	{ text: "ποιος;", english: "who/which? (m)" },
	{ text: "ποια;", english: "who/which? (f)" },
	{ text: "ποιο;", english: "which? (n)" },

	// "Whose" - genitive of ποιος
	{ text: "ποιανού;", english: "whose?" },

	// "How much/many"
	{ text: "πόσο;", english: "how much?" },
	{ text: "πόσοι;", english: "how many? (m)" },
	{ text: "πόσες;", english: "how many? (f)" },
	{ text: "πόσα;", english: "how many? (n)" },

	// Compound
	{ text: "τι είδους;", english: "what kind of?" },
];

// Legacy export for backwards compatibility
export const USEFUL_EXPRESSIONS: Phrase[] = [...DISCOURSE_FILLERS, ...SOCIAL_PHRASES];

export const COMMANDS: Phrase[] = [
	{ text: "κάτσε κάτω", english: "sit down" },
	{ text: "σήκω πάνω", english: "stand up" },
	{ text: "έλα", english: "come" },
	{ text: "πες το ξανά", english: "say it again" },
	{ text: "περίμενε", english: "wait" },
];

// "Likes" construction - grammatically interesting (dative-like construction)
// Using real examples to show usage, not abstract definitions
export const LIKES_CONSTRUCTION = {
	singular: [
		{ text: "μου αρέσει ο καφές", english: "I like coffee" },
		{ text: "σου αρέσει η μουσική;", english: "do you like the music?" },
		{ text: "του αρέσει το φαγητό", english: "he likes the food" },
		{ text: "της αρέσει η θάλασσα", english: "she likes the sea" },
		{ text: "μας αρέσει η Ελλάδα", english: "we like Greece" },
		{ text: "σας αρέσει το σπίτι;", english: "do you like the house?" },
		{ text: "τους αρέσει το κρασί", english: "they like the wine" },
	],
	plural: [
		{ text: "μου αρέσουν οι ελιές", english: "I like olives" },
		{ text: "σου αρέσουν τα φρούτα;", english: "do you like fruits?" },
		{ text: "του αρέσουν τα βιβλία", english: "he likes books" },
		{ text: "της αρέσουν οι ταινίες", english: "she likes movies" },
		{ text: "μας αρέσουν τα παιδιά", english: "we like the kids" },
		{ text: "σας αρέσουν οι γάτες;", english: "do you like cats?" },
		{ text: "τους αρέσουν τα γλυκά", english: "they like sweets" },
	],
} as const satisfies Record<string, Phrase[]>;

// "They call" construction - used for names (με λένε = my name is)
export const NAME_CONSTRUCTION: Phrase[] = [
	{ text: "με λένε", english: "my name is / they call me" },
	{ text: "σε λένε", english: "your name is / they call you" },
	{ text: "τον λένε", english: "his name is / they call him" },
	{ text: "την λένε", english: "her name is / they call her" },
	{ text: "μας λένε", english: "our name is / they call us" },
	{ text: "σας λένε", english: "your name is / they call you (pl/formal)" },
	{ text: "τους λένε", english: "their name is / they call them (m)" },
	{ text: "τις λένε", english: "their name is / they call them (f)" },
];

// Time expression phrases (with article, showing accusative usage)
export const TIME_PHRASES: Phrase[] = [{ text: "κάθε μέρα", english: "every day" }];

// Example sentences for practicing case and verb usage
export const EXAMPLE_SENTENCES: Phrase[] = [
	{
		text: "Ο Λιο κοιμάται στο σπίτι του γιατρού",
		english: "Leo sleeps at the doctor's house",
		metadata: { grammar: "genitive possession + location" },
	},
	{
		text: "τον φίλο μου τον λένε Γιώργο",
		english: "my friend is called George",
		metadata: { grammar: "accusative + λένε construction" },
	},
	{
		text: "το ποδήλατο του αδερφού μου είναι κόκκινο",
		english: "my brother's bicycle is red",
		metadata: { grammar: "genitive possession" },
	},
	{
		text: "τα νερά των ποταμών τρέχουν με δύναμη",
		english: "the waters of the rivers run with force",
		metadata: { grammar: "genitive plural" },
	},
];

// Time-telling phrases - organized by category for UI grouping
export const TIME_TELLING: Phrase[] = [
	// Basic structure
	{
		text: "τι ώρα είναι;",
		english: "what time is it?",
		metadata: { category: "basic" },
	},
	{
		text: "είναι μία",
		english: "it's one o'clock",
		metadata: { category: "basic", pattern: "είναι + hour" },
	},
	{
		text: "είναι δύο",
		english: "it's two o'clock",
		metadata: { category: "basic" },
	},
	{
		text: "είναι μία ακριβώς",
		english: "it's exactly one",
		metadata: { category: "basic", note: "ακριβώς = exactly" },
	},

	// Fractions (και/παρά)
	{
		text: "και τέταρτο",
		english: "quarter past",
		metadata: { category: "fractions", note: "και = past" },
	},
	{
		text: "και μισή",
		english: "half past",
		metadata: { category: "fractions" },
	},
	{
		text: "παρά τέταρτο",
		english: "quarter to",
		metadata: { category: "fractions", note: "παρά = to" },
	},
	{
		text: "παρά πέντε",
		english: "five to",
		metadata: { category: "fractions" },
	},
	{
		text: "και είκοσι πέντε",
		english: "twenty-five past",
		metadata: { category: "fractions" },
	},

	// "At" times (στις)
	{
		text: "στη μία",
		english: "at one",
		metadata: { category: "at-times", note: "singular exception" },
	},
	{
		text: "στις τρεις",
		english: "at three",
		metadata: { category: "at-times", pattern: "στις + hour (plural)" },
	},
	{
		text: "στις τέσσερις",
		english: "at four",
		metadata: { category: "at-times" },
	},
	{
		text: "στις τρεις και τέταρτο",
		english: "at quarter past three",
		metadata: { category: "at-times" },
	},
	{
		text: "στις τρεις και μισή",
		english: "at half past three",
		metadata: { category: "at-times" },
	},
	{
		text: "στις τέσσερις παρά τέταρτο",
		english: "at quarter to four",
		metadata: { category: "at-times" },
	},
];
