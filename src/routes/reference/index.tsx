import { createFileRoute } from "@tanstack/react-router";
import { Brush, Package, Puzzle, Shapes, Tag, UserRound, Waypoints, Zap } from "lucide-react";

import { type IndexGroup, SectionIndex } from "@/components/SectionIndex";

const groups: IndexGroup[] = [
	{
		title: "The case system",
		topics: [
			{
				id: "cases",
				label: "Cases",
				greek: "Πτώσεις",
				description: "What each ending is for",
				icon: <Shapes size={20} />,
				href: "/reference/cases",
			},
			{
				id: "pronouns",
				label: "Pronouns",
				greek: "Αντωνυμίες",
				description: "Cases in the words you use most",
				icon: <UserRound size={20} />,
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
				icon: <Tag size={20} />,
				href: "/reference/articles",
			},
			{
				id: "nouns",
				label: "Nouns",
				greek: "Ουσιαστικά",
				description: "Endings by gender",
				icon: <Package size={20} />,
				href: "/reference/nouns",
			},
			{
				id: "adjectives",
				label: "Adjectives",
				greek: "Επίθετα",
				description: "The noun's grammar, copied",
				icon: <Brush size={20} />,
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
				icon: <Waypoints size={20} />,
				href: "/reference/prepositions",
			},
			{
				id: "verbs",
				label: "Verbs",
				greek: "Ρήματα",
				description: "Three patterns, thousands of verbs",
				icon: <Zap size={20} />,
				href: "/reference/verbs",
			},
			{
				id: "patterns",
				label: "Patterns",
				greek: "Δομές",
				description: "Constructions that don't translate",
				icon: <Puzzle size={20} />,
				href: "/reference/patterns",
			},
		],
	},
];

export const Route = createFileRoute("/reference/")({
	component: ReferenceIndex,
});

function ReferenceIndex() {
	return <SectionIndex title="Reference" lede="Grammar patterns and paradigms" groups={groups} />;
}
