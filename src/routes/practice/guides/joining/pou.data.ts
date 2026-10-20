import type { SimpleListItem } from "../../components/engines/deck";

/**
 * The answer is the whole phrase, so dropping που, as English drops that, fails.
 * Typing cannot tell που from πού; the guide section carries the accent.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "vivlio-diavazo", label: "the book I'm reading", greek: "το βιβλίο που διαβάζω" },
	{ id: "tainia-eidame", label: "the film we saw", greek: "η ταινία που είδαμε" },
	{ id: "kafes-pino", label: "the coffee I drink", greek: "ο καφές που πίνω" },
	{ id: "gynaika-douleuei", label: "the woman who works here", greek: "η γυναίκα που δουλεύει εδώ" },
	{ id: "antras-milaei", label: "the man who speaks Greek", greek: "ο άντρας που μιλάει ελληνικά" },
	{ id: "paidia-paizoun", label: "the children who are playing", greek: "τα παιδιά που παίζουν" },
	{ id: "fagito-aresei", label: "the food I like", greek: "το φαγητό που μου αρέσει" },
	{ id: "kinito-agorasa", label: "the mobile I bought", greek: "το κινητό που αγόρασα" },
	{ id: "leoforeio-kentro", label: "the bus that goes to the centre", greek: "το λεωφορείο που πάει στο κέντρο" },
	{ id: "lexeis-xero", label: "the words I know", greek: "οι λέξεις που ξέρω" },
	{ id: "geitonas-skylo", label: "the neighbour who has a dog", greek: "ο γείτονας που έχει σκύλο", acceptAlso: "ο γείτονας που έχει έναν σκύλο" },
	{ id: "filos-pafo", label: "the friend who lives in Paphos", greek: "ο φίλος που μένει στην Πάφο", acceptAlso: "η φίλη που μένει στην Πάφο" },
	{ id: "magazi-anoixto", label: "the shop that's open", greek: "το μαγαζί που είναι ανοιχτό" },
	{ id: "glyko-eftiaxes", label: "the dessert you made", greek: "το γλυκό που έφτιαξες" },
	{ id: "xairomai-irthes", label: "I'm glad you came.", greek: "χαίρομαι που ήρθες" },
	{ id: "xairomai-edo", label: "I'm glad you're here.", greek: "χαίρομαι που είσαι εδώ" },
	{ id: "lypamai-arrostos", label: "I'm sorry you're ill.", greek: "λυπάμαι που είσαι άρρωστος", acceptAlso: "λυπάμαι που είσαι άρρωστη" },
	{ id: "xaroumenos-paraskevi", label: "I'm happy that it's Friday.", greek: "είμαι χαρούμενος που είναι Παρασκευή", acceptAlso: "είμαι χαρούμενη που είναι Παρασκευή" },
];
