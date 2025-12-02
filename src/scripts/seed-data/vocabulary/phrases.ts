import type { Phrase } from "../../../types/phrase";

export const USEFUL_EXPRESSIONS: Phrase[] = [
	{ text: "φυσικά", english: "of course" },
	{ text: "επίσης", english: "also" },
	{ text: "κάτι", english: "something" },
	{ text: "τα πάντα", english: "everything" },
	{ text: "τι γίνεται;", english: "what's happening?" },
	{ text: "τα λέμε", english: "see ya" },
	{ text: "καλή όρεξη", english: "bon appetit/enjoy your meal" },
	{ text: "σιγά σιγά", english: "slowly/little by little" },
	{ text: "μαζί", english: "together" },
	{ text: "γι' αυτό", english: "that's why/therefore" },
	{ text: "αν", english: "if" },
	{ text: "όταν", english: "when" },
	{ text: "πού;", english: "where?" },
	{ text: "πώς;", english: "how?" },
	{ text: "γιατί;", english: "why?" },
	{ text: "ποιος;", english: "who?" },
	{ text: "τι;", english: "what?" },
	{ text: "πόσο;", english: "how much?" },
];

export const COMMANDS: Phrase[] = [
	{ text: "κάτσε κάτω", english: "sit down" },
	{ text: "σήκω πάνω", english: "stand up" },
	{ text: "έλα", english: "come" },
	{ text: "πες το ξανά", english: "say it again" },
	{ text: "περίμενε", english: "wait" },
];

// "Likes" construction - grammatically interesting (dative-like construction)
export const LIKES_CONSTRUCTION = {
	singular: [
		{ text: "μου αρέσει", english: "I like" },
		{ text: "σου αρέσει", english: "you like" },
		{ text: "του/της αρέσει", english: "he/she likes" },
		{ text: "μας αρέσει", english: "we like" },
		{ text: "σας αρέσει", english: "you like" },
		{ text: "τους αρέσει", english: "they like" },
	],
	plural: [
		{ text: "μου αρέσουν", english: "I like (them)" },
		{ text: "σου αρέσουν", english: "you like (them)" },
		{ text: "του/της αρέσουν", english: "he/she likes (them)" },
		{ text: "μας αρέσουν", english: "we like (them)" },
		{ text: "σας αρέσουν", english: "you like (them)" },
		{ text: "τους αρέσουν", english: "they like (them)" },
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
