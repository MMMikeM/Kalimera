import { createFileRoute } from "@tanstack/react-router";

import { type IndexGroup, SectionIndex } from "@/components/SectionIndex";
import { pageTitle } from "@/lib/page-title";

const groups: IndexGroup[] = [
	{
		title: "Communication",
		topics: [
			{
				id: "conversations",
				label: "Conversations",
				greek: "Διάλογοι",
				description: "Real situations with family and friends",
				href: "/learn/conversations/arriving",
			},
			{
				id: "phrases",
				label: "Phrases",
				greek: "Φράσεις",
				description: "Common expressions and useful phrases",
				href: "/learn/phrases/survival",
			},
		],
	},
	{
		title: "Words",
		topics: [
			{
				id: "nouns",
				label: "Nouns",
				greek: "Ουσιαστικά",
				description: "Objects, people, places — with gender",
				href: "/learn/nouns",
			},
			{
				id: "verbs",
				label: "Verbs",
				greek: "Ρήματα",
				description: "The irregulars, then the verbs that follow the rules",
				href: "/learn/verbs",
			},
			{
				id: "essentials",
				label: "Essentials",
				greek: "Βασικά",
				description: "Numbers, colours, time, position",
				href: "/learn/essentials",
			},
		],
	},
];

export const Route = createFileRoute("/learn/")({
	head: () => ({ meta: [{ title: pageTitle("Learn") }] }),
	component: LearnIndex,
});

function LearnIndex() {
	return <SectionIndex title="Learn" lede="Browse Greek content by topic" groups={groups} />;
}
