import type { Phrase } from "../../../types/phrase";

// Discourse Markers - words that connect natural speech
export const DISCOURSE_MARKERS: Phrase[] = [
	{ text: "λοιπόν", english: "so, well, anyway", cefrLevel: "A1" },
	{ text: "δηλαδή", english: "that is, I mean", cefrLevel: "A1" },
	{ text: "ξέρεις", english: "you know", cefrLevel: "A2" },
	{ text: "κοίτα", english: "look, listen", cefrLevel: "A1" },
	{ text: "τέλος πάντων", english: "anyway, in any case", cefrLevel: "A2" },
	{ text: "εντάξει", english: "okay, alright", cefrLevel: "A1" },
	{ text: "μάλιστα", english: "indeed, certainly", cefrLevel: "A1" },
	{ text: "βέβαια", english: "of course, certainly", cefrLevel: "A1" },
	{ text: "ακριβώς", english: "exactly", cefrLevel: "A1" },
	{ text: "πράγματι", english: "indeed, really", cefrLevel: "A2" },
];

// Common Responses - things people say TO you
export const COMMON_RESPONSES: Phrase[] = [
	{ text: "ορίστε", english: "here you go / pardon?", cefrLevel: "A1" },
	{ text: "αμέσως", english: "right away", cefrLevel: "A1" },
	{ text: "σίγουρα", english: "sure, certainly", cefrLevel: "A1" },
	{ text: "καλά", english: "okay, fine, good", cefrLevel: "A1" },
	{ text: "έγινε", english: "done, got it", cefrLevel: "A1" },
	{ text: "περίμενε", english: "wait", cefrLevel: "A1" },
	{ text: "δεν πειράζει", english: "it doesn't matter, no problem", cefrLevel: "A1" },
	{ text: "τίποτα", english: "nothing / you're welcome", cefrLevel: "A1" },
	{ text: "με συγχωρείς", english: "excuse me / sorry", cefrLevel: "A1" },
];

// Opinion & Feeling Expressions
export const OPINION_PHRASES: Phrase[] = [
	{ text: "νομίζω", english: "I think", cefrLevel: "A1" },
	{ text: "πιστεύω", english: "I believe", cefrLevel: "A1" },
	{ text: "μου φαίνεται", english: "it seems to me", cefrLevel: "A2" },
	{ text: "δεν ξέρω", english: "I don't know", cefrLevel: "A1" },
	{ text: "έχεις δίκιο", english: "you're right", cefrLevel: "A2" },
	{ text: "δεν συμφωνώ", english: "I don't agree", cefrLevel: "A2" },
	{ text: "ίσως", english: "maybe, perhaps", cefrLevel: "A2" },
	{ text: "μακάρι", english: "I wish, hopefully", cefrLevel: "A1" },
	{ text: "ελπίζω", english: "I hope", cefrLevel: "A1" },
];

// Arriving & Leaving phrases
export const ARRIVING_PHRASES: Phrase[] = [
	{ text: "Καλώς ήρθες", english: "Welcome (singular informal)", cefrLevel: "A1" },
	{ text: "Καλώς ήρθατε", english: "Welcome (plural/formal)", cefrLevel: "A1" },
	{ text: "Πέρνα μέσα", english: "Come in", cefrLevel: "A1" },
	{ text: "Κάτσε", english: "Sit down (informal)", cefrLevel: "A1" },
	{ text: "Καθίστε", english: "Sit down (formal/plural)", cefrLevel: "A1" },
	{ text: "Να προσέχεις", english: "Take care", cefrLevel: "A2" },
	{ text: "Καλό δρόμο", english: "Have a good trip/journey", cefrLevel: "A2" },
	{ text: "Στο καλό", english: "Goodbye (go well)", cefrLevel: "A2" },
];

// Food & Hospitality phrases
export const FOOD_PHRASES: Phrase[] = [
	{ text: "Θέλεις κάτι;", english: "Do you want something? (informal)" },
	{ text: "Θέλετε κάτι;", english: "Do you want something? (formal)" },
	{ text: "Πάρε λίγο ακόμα", english: "Take some more (informal)" },
	{ text: "Άρεσε;", english: "Did you like it?" },
	{ text: "Είναι πολύ νόστιμο", english: "It's very delicious" },
	{ text: "Χόρτασα", english: "I'm full" },
	{ text: "Φάε, φάε!", english: "Eat, eat!" },
];

// Small Talk phrases
export const SMALLTALK_PHRASES: Phrase[] = [
	{ text: "Τι κάνεις στη δουλειά;", english: "How's work?" },
	{
		text: "Τι θα κάνετε το Σαββατοκύριακο;",
		english: "What are you doing this weekend?",
	},
	{ text: "Πώς είναι τα παιδιά;", english: "How are the kids?" },
	{ text: "Κάνει ζέστη σήμερα", english: "It's hot today" },
	{ text: "Κάνει κρύο σήμερα", english: "It's cold today" },
	{ text: "Δεν ξέρω ακόμα", english: "I don't know yet" },
];
