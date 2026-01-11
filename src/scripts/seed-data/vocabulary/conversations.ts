import type { Phrase } from "../../../types/phrase";

// Discourse Markers - words that connect natural speech
export const DISCOURSE_MARKERS: Phrase[] = [
	{ text: "λοιπόν", english: "so, well, anyway" },
	{ text: "δηλαδή", english: "that is, I mean" },
	{ text: "ξέρεις", english: "you know" },
	{ text: "κοίτα", english: "look, listen" },
	{ text: "τέλος πάντων", english: "anyway, in any case" },
	{ text: "εντάξει", english: "okay, alright" },
	{ text: "μάλιστα", english: "indeed, certainly" },
	{ text: "βέβαια", english: "of course, certainly" },
	{ text: "ακριβώς", english: "exactly" },
	{ text: "πράγματι", english: "indeed, really" },
];

// Common Responses - things people say TO you
export const COMMON_RESPONSES: Phrase[] = [
	{ text: "ορίστε", english: "here you go / pardon?" },
	{ text: "αμέσως", english: "right away" },
	{ text: "σίγουρα", english: "sure, certainly" },
	{ text: "καλά", english: "okay, fine, good" },
	{ text: "έγινε", english: "done, got it" },
	{ text: "περίμενε", english: "wait" },
	{ text: "δεν πειράζει", english: "it doesn't matter, no problem" },
	{ text: "τίποτα", english: "nothing / you're welcome" },
	{ text: "με συγχωρείς", english: "excuse me / sorry" },
];

// Opinion & Feeling Expressions
export const OPINION_PHRASES: Phrase[] = [
	{ text: "νομίζω", english: "I think" },
	{ text: "πιστεύω", english: "I believe" },
	{ text: "μου φαίνεται", english: "it seems to me" },
	{ text: "δεν ξέρω", english: "I don't know" },
	{ text: "έχεις δίκιο", english: "you're right" },
	{ text: "δεν συμφωνώ", english: "I don't agree" },
	{ text: "ίσως", english: "maybe, perhaps" },
	{ text: "μακάρι", english: "I wish, hopefully" },
	{ text: "ελπίζω", english: "I hope" },
];

// Arriving & Leaving phrases
export const ARRIVING_PHRASES: Phrase[] = [
	{ text: "Καλώς ήρθες", english: "Welcome (singular informal)" },
	{ text: "Καλώς ήρθατε", english: "Welcome (plural/formal)" },
	{ text: "Πέρνα μέσα", english: "Come in" },
	{ text: "Κάτσε", english: "Sit down (informal)" },
	{ text: "Καθίστε", english: "Sit down (formal/plural)" },
	{ text: "Να προσέχεις", english: "Take care" },
	{ text: "Καλό δρόμο", english: "Have a good trip/journey" },
	{ text: "Στο καλό", english: "Goodbye (go well)" },
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
