import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../components/engines/deck";
import { Drill } from "../components/engines/drill";

const CHUNKS: SimpleListItem[] = [
	// Social ritual — drill first, most automatic in real conversation
	{
		id: "hello",
		greek: "Γεια σου",
		english: "Hello / Hi",
		label: "greeting",
		category: "social",
	},
	{
		id: "hello-formal",
		greek: "Γεια σας",
		english: "Hello (formal)",
		label: "greeting",
		category: "social",
	},
	{
		id: "good-morning",
		greek: "Καλημέρα",
		english: "Good morning",
		label: "greeting",
		category: "social",
	},
	{
		id: "good-evening",
		greek: "Καλησπέρα",
		english: "Good evening",
		label: "greeting",
		category: "social",
	},
	{
		id: "good-night",
		greek: "Καληνύχτα",
		english: "Good night",
		label: "greeting",
		category: "social",
	},
	{
		id: "goodbye",
		greek: "Αντίο",
		english: "Goodbye",
		label: "parting",
		category: "social",
	},
	{
		id: "see-you",
		greek: "Τα λέμε",
		english: "See you later",
		label: "parting",
		category: "social",
	},
	{
		id: "thank-you",
		greek: "Ευχαριστώ",
		english: "Thank you",
		label: "politeness",
		category: "social",
	},
	{
		id: "please",
		greek: "Παρακαλώ",
		english: "Please / You're welcome",
		label: "politeness",
		category: "social",
	},
	{
		id: "sorry",
		greek: "Συγγνώμη",
		english: "Excuse me / Sorry",
		label: "politeness",
		category: "social",
	},
	{
		id: "how-are-you",
		greek: "Τι κάνεις;",
		english: "How are you?",
		label: "social",
		category: "social",
	},
	// Comprehension survival — second priority
	{
		id: "dont-understand",
		greek: "Δεν καταλαβαίνω",
		english: "I don't understand",
		label: "survival",
		category: "survival",
	},
	{
		id: "dont-know",
		greek: "Δεν ξέρω",
		english: "I don't know",
		label: "survival",
		category: "survival",
	},
	{
		id: "speak-slowly",
		greek: "Μπορείτε να μιλάτε πιο αργά;",
		english: "Can you speak more slowly?",
		label: "survival",
		category: "survival",
	},
	{
		id: "how-say",
		greek: "Πώς λέγεται;",
		english: "How do you say...?",
		label: "survival",
		category: "survival",
	},
	{
		id: "what-means",
		greek: "Τι σημαίνει;",
		english: "What does ... mean?",
		label: "survival",
		category: "survival",
	},
	// Sentence starters — openers to memorise as chunks
	{
		id: "my-name",
		greek: "Με λένε",
		english: "My name is... (opener)",
		label: "sentence starter",
		category: "starters",
	},
	{
		id: "i-would-like",
		greek: "Θα ήθελα",
		english: "I would like... (opener)",
		label: "sentence starter",
		category: "starters",
	},
	{
		id: "where-is",
		greek: "Πού είναι;",
		english: "Where is...?",
		label: "sentence starter",
		category: "starters",
	},
	{
		id: "how-much",
		greek: "Πόσο κάνει;",
		english: "How much is...?",
		label: "sentence starter",
		category: "starters",
	},
	{
		id: "can-i",
		greek: "Μπορώ να",
		english: "Can I... (opener)",
		label: "sentence starter",
		category: "starters",
	},
	{
		id: "i-need",
		greek: "Πρέπει να",
		english: "I need to... (opener)",
		label: "sentence starter",
		category: "starters",
	},
	{
		id: "i-want",
		greek: "Θέλω να",
		english: "I want to... (opener)",
		label: "sentence starter",
		category: "starters",
	},
	{
		id: "do-you-have",
		greek: "Έχετε;",
		english: "Do you have...?",
		label: "sentence starter",
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
