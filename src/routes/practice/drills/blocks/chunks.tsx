import { SimpleListDrill, type SimpleListItem } from "../../engines/simple-list-drill";

const CHUNKS: SimpleListItem[] = [
	// Social ritual — drill first, most automatic in real conversation
	{ id: "hello", greek: "Γεια σου", greeklish: "gia sou", english: "Hello / Hi", label: "greeting", category: "social" },
	{ id: "hello-formal", greek: "Γεια σας", greeklish: "gia sas", english: "Hello (formal)", label: "greeting", category: "social" },
	{ id: "good-morning", greek: "Καλημέρα", greeklish: "kalimera", english: "Good morning", label: "greeting", category: "social" },
	{ id: "good-evening", greek: "Καλησπέρα", greeklish: "kalispera", english: "Good evening", label: "greeting", category: "social" },
	{ id: "good-night", greek: "Καληνύχτα", greeklish: "kalinychta", english: "Good night", label: "greeting", category: "social" },
	{ id: "goodbye", greek: "Αντίο", greeklish: "antio", english: "Goodbye", label: "parting", category: "social" },
	{ id: "see-you", greek: "Τα λέμε", greeklish: "ta leme", english: "See you later", label: "parting", category: "social" },
	{ id: "thank-you", greek: "Ευχαριστώ", greeklish: "efcharisto", english: "Thank you", label: "politeness", category: "social" },
	{ id: "please", greek: "Παρακαλώ", greeklish: "parakalo", english: "Please / You're welcome", label: "politeness", category: "social" },
	{ id: "sorry", greek: "Συγγνώμη", greeklish: "signomi", english: "Excuse me / Sorry", label: "politeness", category: "social" },
	{ id: "how-are-you", greek: "Τι κάνεις;", greeklish: "ti kanis", english: "How are you?", label: "social", category: "social" },
	// Comprehension survival — second priority
	{ id: "dont-understand", greek: "Δεν καταλαβαίνω", greeklish: "den katalaveno", english: "I don't understand", label: "survival", category: "survival" },
	{ id: "dont-know", greek: "Δεν ξέρω", greeklish: "den xero", english: "I don't know", label: "survival", category: "survival" },
	{ id: "speak-slowly", greek: "Μπορείτε να μιλάτε πιο αργά;", greeklish: "borite na milate pio arga", english: "Can you speak more slowly?", label: "survival", category: "survival" },
	{ id: "how-say", greek: "Πώς λέγεται;", greeklish: "pos legetai", english: "How do you say...?", label: "survival", category: "survival" },
	{ id: "what-means", greek: "Τι σημαίνει;", greeklish: "ti simeni", english: "What does ... mean?", label: "survival", category: "survival" },
	// Sentence starters — openers to memorise as chunks
	{ id: "my-name", greek: "Με λένε", greeklish: "me lene", english: "My name is... (opener)", label: "sentence starter", category: "starters" },
	{ id: "i-would-like", greek: "Θα ήθελα", greeklish: "tha ithela", english: "I would like... (opener)", label: "sentence starter", category: "starters" },
	{ id: "where-is", greek: "Πού είναι;", greeklish: "pou einai", english: "Where is...?", label: "sentence starter", category: "starters" },
	{ id: "how-much", greek: "Πόσο κάνει;", greeklish: "poso kani", english: "How much is...?", label: "sentence starter", category: "starters" },
	{ id: "can-i", greek: "Μπορώ να", greeklish: "boro na", english: "Can I... (opener)", label: "sentence starter", category: "starters" },
	{ id: "i-need", greek: "Πρέπει να", greeklish: "prepi na", english: "I need to... (opener)", label: "sentence starter", category: "starters" },
	{ id: "i-want", greek: "Θέλω να", greeklish: "thelo na", english: "I want to... (opener)", label: "sentence starter", category: "starters" },
	{ id: "do-you-have", greek: "Έχετε;", greeklish: "echete", english: "Do you have...?", label: "sentence starter", category: "starters" },
];

const CATEGORIES = [
	{ id: "social", label: "Social" },
	{ id: "survival", label: "Survival" },
	{ id: "starters", label: "Starters" },
];

export default function ChunksDrill() {
	return (
		<SimpleListDrill
			drillId="blocks-chunks"
			items={CHUNKS}
			title="Survival Phrases"
			subtitle="24 phrases / timed"
			colorTheme="honey"
			forwardTimeLimit={5000}
			forwardDesc="English prompt → Greek phrase"
			reverseDesc="Greek phrase → English (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
