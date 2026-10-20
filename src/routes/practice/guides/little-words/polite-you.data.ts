import type { SimpleListItem } from "../../components/engines/deck";

/** The friendly phrase is the cue; the answer is the same phrase to a stranger. */
export const ITEMS: SimpleListItem[] = [
	{ id: "geia", context: "Γεια σου", label: "hello", greek: "Γεια σας" },
	{ id: "thelis-kati", context: "Θέλεις κάτι;", label: "Do you want anything?", greek: "Θέλετε κάτι;" },
	{ id: "kalos-irthes", context: "Καλώς ήρθες", label: "Welcome", greek: "Καλώς ήρθατε" },
	{ id: "pou-meneis", context: "Πού μένεις;", label: "Where do you live?", greek: "Πού μένετε;" },
	{ id: "pos-se-lene", context: "Πώς σε λένε;", label: "What's your name?", greek: "Πώς σας λένε;" },
	{
		id: "voithiseis",
		context: "Μπορείς να με βοηθήσεις;",
		label: "Can you help me?",
		greek: "Μπορείτε να με βοηθήσετε;",
	},
	{ id: "apo-pou", context: "Από πού είσαι;", label: "Where are you from?", greek: "Από πού είστε;", acceptAlso: "Από πού είσαστε;" },
	{ id: "douleia", context: "Τι δουλειά κάνεις;", label: "What do you do for work?", greek: "Τι δουλειά κάνετε;" },
	{ id: "paidia", context: "Έχεις παιδιά;", label: "Do you have children?", greek: "Έχετε παιδιά;" },
	{ id: "ellinika", context: "Μιλάς ελληνικά;", label: "Do you speak Greek?", greek: "Μιλάτε ελληνικά;" },
	{ id: "kypros", context: "Σου αρέσει η Κύπρος;", label: "Do you like Cyprus?", greek: "Σας αρέσει η Κύπρος;" },
	{ id: "ti-kaneis", context: "Τι κάνεις;", label: "How are you?", greek: "Τι κάνετε;" },
	{ id: "asxoleisai", context: "Με τι ασχολείσαι;", label: "What do you do?", greek: "Με τι ασχολείστε;" },
	{ id: "efxaristo", context: "Σε ευχαριστώ", label: "Thank you", greek: "Σας ευχαριστώ" },
	{ id: "ti-theleis", context: "Τι θέλεις;", label: "What would you like?", greek: "Τι θέλετε;" },
	{ id: "pou-pas", context: "Πού πας;", label: "Where are you going?", greek: "Πού πάτε;" },
	{
		id: "stasi",
		context: "Ξέρεις πού είναι η στάση;",
		label: "Do you know where the stop is?",
		greek: "Ξέρετε πού είναι η στάση;",
	},
	{ id: "lepto", context: "Έχεις ένα λεπτό;", label: "Have you got a minute?", greek: "Έχετε ένα λεπτό;" },
	{ id: "pou-douleveis", context: "Πού δουλεύεις;", label: "Where do you work?", greek: "Πού δουλεύετε;" },
	{
		id: "dromo",
		context: "Θέλεις να σου δείξω τον δρόμο;",
		label: "Do you want me to show you the way?",
		greek: "Θέλετε να σας δείξω τον δρόμο;",
	},
	{ id: "parakalo", context: "Σε παρακαλώ", label: "Please", greek: "Σας παρακαλώ" },
];
