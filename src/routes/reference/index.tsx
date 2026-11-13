import { createFileRoute } from "@tanstack/react-router";

import { type IndexGroup, SectionIndex } from "@/components/SectionIndex";
import { pageTitle } from "@/lib/page-title";

const groups: IndexGroup[] = [
	{
		title: "The case system",
		topics: [
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
				id: "verbs",
				label: "Verbs",
				greek: "Ρήματα",
				description: "Every tense, by verb family",
				href: "/reference/verbs",
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
