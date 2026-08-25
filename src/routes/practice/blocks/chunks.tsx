import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../components/engines/deck";
import { Drill } from "../components/engines/drill";

const CHUNKS: SimpleListItem[] = [
	// Social ritual — drill first, most automatic in real conversation
	{
		id: "hello",
		greek: "Γεια σου",
		label: "Hello / Hi",
		category: "social",
	},
	{
		id: "hello-formal",
		greek: "Γεια σας",
		label: "Hello (formal)",
		category: "social",
	},
	{
		id: "good-morning",
		greek: "Καλημέρα",
		label: "Good morning",
		category: "social",
	},
	{
		id: "good-evening",
		greek: "Καλησπέρα",
		label: "Good evening",
		category: "social",
	},
	{
		id: "good-night",
		greek: "Καληνύχτα",
		label: "Good night",
		category: "social",
	},
	{
		id: "goodbye",
		greek: "Αντίο",
		label: "Goodbye",
		category: "social",
	},
	{
		id: "see-you",
		greek: "Τα λέμε",
		label: "See you later",
		category: "social",
	},
	{
		id: "thank-you",
		greek: "Ευχαριστώ",
		label: "Thank you",
		category: "social",
	},
	{
		id: "please",
		greek: "Παρακαλώ",
		label: "Please / You're welcome",
		category: "social",
	},
	{
		id: "sorry",
		greek: "Συγγνώμη",
		label: "Excuse me / Sorry",
		category: "social",
	},
	{
		id: "how-are-you",
		greek: "Τι κάνεις;",
		label: "How are you?",
		category: "social",
	},
	// Comprehension survival — second priority
	{
		id: "dont-understand",
		greek: "Δεν καταλαβαίνω",
		label: "I don't understand",
		category: "survival",
	},
	{
		id: "dont-know",
		greek: "Δεν ξέρω",
		label: "I don't know",
		category: "survival",
	},
	{
		id: "speak-slowly",
		greek: "Μπορείτε να μιλάτε πιο αργά;",
		label: "Can you speak more slowly?",
		category: "survival",
	},
	{
		id: "how-say",
		greek: "Πώς λέγεται;",
		label: "How do you say...?",
		category: "survival",
	},
	{
		id: "what-means",
		greek: "Τι σημαίνει;",
		label: "What does ... mean?",
		category: "survival",
	},
	// Sentence starters — openers to memorise as chunks
	{
		id: "my-name",
		greek: "Με λένε",
		label: "My name is... (opener)",
		category: "starters",
	},
	{
		id: "i-would-like",
		greek: "Θα ήθελα",
		label: "I would like... (opener)",
		category: "starters",
	},
	{
		id: "where-is",
		greek: "Πού είναι;",
		label: "Where is...?",
		category: "starters",
	},
	{
		id: "how-much",
		greek: "Πόσο κάνει;",
		label: "How much is...?",
		category: "starters",
	},
	{
		id: "can-i",
		greek: "Μπορώ να",
		label: "Can I... (opener)",
		category: "starters",
	},
	{
		id: "i-need",
		greek: "Πρέπει να",
		label: "I need to... (opener)",
		category: "starters",
	},
	{
		id: "i-want",
		greek: "Θέλω να",
		label: "I want to... (opener)",
		category: "starters",
	},
	{
		id: "do-you-have",
		greek: "Έχετε;",
		label: "Do you have...?",
		category: "starters",
	},
];

const CATEGORIES = [
	{ id: "social", label: "Social" },
	{ id: "survival", label: "Survival" },
	{ id: "starters", label: "Starters" },
];

export const Route = createFileRoute("/practice/blocks/chunks")({
	component: ChunksDrill,
});

function ChunksDrill() {
	return (
		<Drill
			drillId="blocks-chunks"
			items={CHUNKS}
			title="Survival Phrases"
			subtitle="24 phrases / timed"
			colorTheme="honey"
			backTo="/practice/blocks"
			forwardDesc="English prompt → Greek phrase"
			reverseDesc="Greek phrase → English (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
