import { createFileRoute } from "@tanstack/react-router";
import { Hash, MessageCircle, Package, Quote, Zap } from "lucide-react";

import { type IndexGroup, SectionIndex } from "@/components/SectionIndex";

const groups: IndexGroup[] = [
	{
		title: "Communication",
		topics: [
			{
				id: "conversations",
				label: "Conversations",
				greek: "Διάλογοι",
				description: "Real situations with family and friends",
				icon: <MessageCircle size={20} />,
				href: "/learn/conversations/arriving",
			},
			{
				id: "phrases",
				label: "Phrases",
				greek: "Φράσεις",
				description: "Common expressions and useful phrases",
				icon: <Quote size={20} />,
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
				icon: <Package size={20} />,
				href: "/learn/nouns",
			},
			{
				id: "verbs",
				label: "Verbs",
				greek: "Ρήματα",
				description: "Actions by conjugation family",
				icon: <Zap size={20} />,
				href: "/learn/verbs",
			},
			{
				id: "essentials",
				label: "Essentials",
				greek: "Βασικά",
				description: "Numbers, colours, time, position",
				icon: <Hash size={20} />,
				href: "/learn/essentials",
			},
		],
	},
];

export const Route = createFileRoute("/learn/")({
	component: LearnIndex,
});

function LearnIndex() {
	return <SectionIndex title="Learn" lede="Browse Greek content by topic" groups={groups} />;
}
