import { createFileRoute } from "@tanstack/react-router";
import {
	Brush,
	Package,
	Puzzle,
	Shapes,
	Tag,
	UserRound,
	Waypoints,
	Zap,
} from "lucide-react";
import type { ReactNode } from "react";

import { type Section, SectionCard } from "@/components/SectionCard";

/**
 * Base-palette tints, one per group, never the reserved `case-*` / `gender-*`
 * tokens: the cards carry topic names rather than declined examples, so a tint
 * here names the family of grammar, not the grammatical value of any Greek.
 *
 * All three sit on the -200 step, which shares a lightness and a chroma across
 * these ramps; honey would have been half again as saturated and pulled the eye
 * to the last group.
 */
interface Group {
	title: string;
	tint: string;
	topics: Omit<Section, "color">[];
}

const TopicIcon = ({ children }: { children: ReactNode }) => (
	<div className="flex size-10 items-center justify-center rounded-lg bg-white/70">{children}</div>
);

const groups: Group[] = [
	{
		title: "The case system",
		tint: "border-ocean-300 bg-ocean-200 text-ocean-800",
		topics: [
			{
				id: "cases",
				label: "Cases",
				greek: "Πτώσεις",
				description: "What each ending is for",
				icon: (
					<TopicIcon>
						<Shapes size={20} />
					</TopicIcon>
				),
				href: "/reference/cases",
			},
			{
				id: "pronouns",
				label: "Pronouns",
				greek: "Αντωνυμίες",
				description: "Cases in the words you use most",
				icon: (
					<TopicIcon>
						<UserRound size={20} />
					</TopicIcon>
				),
				href: "/reference/pronouns",
			},
		],
	},
	{
		title: "Words that agree",
		tint: "border-olive-300 bg-olive-200 text-olive-800",
		topics: [
			{
				id: "articles",
				label: "Articles",
				greek: "Άρθρα",
				description: "The definite article, case by case",
				icon: (
					<TopicIcon>
						<Tag size={20} />
					</TopicIcon>
				),
				href: "/reference/articles",
			},
			{
				id: "nouns",
				label: "Nouns",
				greek: "Ουσιαστικά",
				description: "Endings by gender",
				icon: (
					<TopicIcon>
						<Package size={20} />
					</TopicIcon>
				),
				href: "/reference/nouns",
			},
			{
				id: "adjectives",
				label: "Adjectives",
				greek: "Επίθετα",
				description: "The noun's grammar, copied",
				icon: (
					<TopicIcon>
						<Brush size={20} />
					</TopicIcon>
				),
				href: "/reference/adjectives",
			},
		],
	},
	{
		title: "Building sentences",
		tint: "border-cream-300 bg-cream-200 text-cream-800",
		topics: [
			{
				id: "prepositions",
				label: "Prepositions",
				greek: "Προθέσεις",
				description: "Little words, big relationships",
				icon: (
					<TopicIcon>
						<Waypoints size={20} />
					</TopicIcon>
				),
				href: "/reference/prepositions",
			},
			{
				id: "verbs",
				label: "Verbs",
				greek: "Ρήματα",
				description: "Three patterns, thousands of verbs",
				icon: (
					<TopicIcon>
						<Zap size={20} />
					</TopicIcon>
				),
				href: "/reference/verbs",
			},
			{
				id: "patterns",
				label: "Patterns",
				greek: "Δομές",
				description: "Constructions that don't translate",
				icon: (
					<TopicIcon>
						<Puzzle size={20} />
					</TopicIcon>
				),
				href: "/reference/patterns",
			},
		],
	},
];

export const Route = createFileRoute("/reference/")({
	component: ReferenceIndex,
});

function ReferenceIndex() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-stone-800">Reference</h1>
				<p className="mt-1 text-stone-600">Grammar patterns and paradigms</p>
			</div>

			{groups.map((group) => (
				<section key={group.title}>
					<h2 className="mb-3 text-xs font-semibold tracking-wide text-stone-500 uppercase">
						{group.title}
					</h2>
					<div className="grid gap-3">
						{group.topics.map((topic) => (
							<SectionCard key={topic.id} section={{ ...topic, color: group.tint }} />
						))}
					</div>
				</section>
			))}
		</div>
	);
}
