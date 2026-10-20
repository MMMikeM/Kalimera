import type { SimpleListItem } from "../../components/engines/deck";

/**
 * δικός μου takes the gender of the thing owned, so each card names the thing. The
 * masculine plural δικοί is left out, since the grader hears it as δική, and so is
 * their (τους), which it hears as her (της).
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "my-coffee", context: "ο καφές", label: "my own coffee", greek: "ο δικός μου καφές" },
	{ id: "your-bag", context: "η τσάντα", label: "your own bag", greek: "η δική σου τσάντα" },
	{ id: "his-house", context: "το σπίτι", label: "his own house", greek: "το δικό του σπίτι" },
	{ id: "its-mine", label: "It's mine.", greek: "Είναι δικό μου." },
	{ id: "bag-yours", context: "η τσάντα", label: "Is this bag yours?", greek: "Αυτή η τσάντα είναι δική σου;" },
	{ id: "house-ours", context: "το σπίτι", label: "This house is ours.", greek: "Αυτό το σπίτι είναι δικό μας." },
	{ id: "coffee-yours", context: "ο καφές", label: "Is this coffee yours?", greek: "Αυτός ο καφές είναι δικός σου;" },
	{ id: "her-car", context: "το αυτοκίνητο", label: "her own car", greek: "το δικό της αυτοκίνητο" },
	{ id: "her-job", context: "η δουλειά", label: "her own job", greek: "η δική της δουλειά" },
	{ id: "umbrella-mine", context: "η ομπρέλα", label: "The umbrella is mine.", greek: "Η ομπρέλα είναι δική μου." },
	{ id: "my-computer", context: "ο υπολογιστής", label: "my own computer", greek: "ο δικός μου υπολογιστής" },
	{ id: "keys-mine", context: "τα κλειδιά", label: "These keys are mine.", greek: "Αυτά τα κλειδιά είναι δικά μου." },
	{ id: "phone-yours", context: "το κινητό", label: "Is this phone yours?", greek: "Αυτό το κινητό είναι δικό σου;" },
	{ id: "dog-ours", context: "ο σκύλος", label: "The dog is ours.", greek: "Ο σκύλος είναι δικός μας." },
	{ id: "my-opinion", context: "η γνώμη", label: "my own opinion", greek: "η δική μου γνώμη" },
	{ id: "our-flat", context: "το διαμέρισμα", label: "our own flat", greek: "το δικό μας διαμέρισμα" },
	{ id: "card-not-mine", context: "η κάρτα", label: "This card isn't mine.", greek: "Αυτή η κάρτα δεν είναι δική μου." },
	{ id: "his-room", context: "το δωμάτιο", label: "his own room", greek: "το δικό του δωμάτιο" },
	{ id: "glass-his", context: "το ποτήρι", label: "Is this glass his?", greek: "Αυτό το ποτήρι είναι δικό του;" },
	{ id: "coffee-not-mine", context: "ο καφές", label: "The coffee isn't mine.", greek: "Ο καφές δεν είναι δικός μου." },
	{ id: "idea-hers", context: "η ιδέα", label: "The idea is hers.", greek: "Η ιδέα είναι δική της." },
];
