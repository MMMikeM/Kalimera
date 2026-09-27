import { createFileRoute } from "@tanstack/react-router";

import { type IndexGroup, SectionIndex } from "@/components/SectionIndex";
import { pageTitle } from "@/lib/page-title";

const groups: IndexGroup[] = [
	{
		title: "The case system",
		topics: [
			{
				id: "cases",
				label: "Cases",
				greek: "Πτώσεις",
				description: "What each ending is for",
				href: "/reference/cases",
			},
			{
				id: "pronouns",
				label: "Pronouns",
				greek: "Αντωνυμίες",
				description: "Cases in the words you use most",
				href: "/reference/pronouns",
			},
		],
	},
	{
		title: "Words that agree",
		topics: [
			{
				id: "articles",
				label: "Articles",
				greek: "Άρθρα",
				description: "The definite article, case by case",
				href: "/reference/articles",
			},
			{
				id: "nouns",
				label: "Nouns",
				greek: "Ουσιαστικά",
				description: "Endings by gender",
				href: "/reference/nouns",
			},
			{
				id: "adjectives",
				label: "Adjectives",
				greek: "Επίθετα",
				description: "The noun's grammar, copied",
				href: "/reference/adjectives",
			},
		],
	},
	{
		title: "Building sentences",
		topics: [
			{
				id: "prepositions",
				label: "Prepositions",
				greek: "Προθέσεις",
				description: "Little words, big relationships",
				href: "/reference/prepositions",
			},
			{
				id: "verbs",
				label: "Verbs",
				greek: "Ρήματα",
				description: "Three patterns, thousands of verbs",
				href: "/reference/verbs",
			},
			{
				id: "patterns",
				label: "Patterns",
				greek: "Δομές",
				description: "Constructions that don't translate",
				href: "/reference/patterns",
			},
		],
	},
];

export const Route = createFileRoute("/reference/")({
	head: () => ({ meta: [{ title: pageTitle("Reference") }] }),
	component: ReferenceIndex,
});

function ReferenceIndex() {
	return <SectionIndex title="Reference" lede="Grammar patterns and paradigms" groups={groups} />;
}
