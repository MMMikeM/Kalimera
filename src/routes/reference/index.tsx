import { ArrowRightLeft, Blocks, FileText, Languages, Palette, Scale, Users } from "lucide-react";

import { SectionCard, type Section } from "@/components/SectionCard";

const sections: Section[] = [
	{
		id: "cases",
		label: "Cases",
		description: "The framework for understanding Greek grammar",
		icon: <Scale size={24} />,
		href: "/reference/cases",
		color: "bg-stone-100 text-stone-700 border-stone-200",
	},
	{
		id: "pronouns",
		label: "Pronouns",
		description: "Cases in action - the words you'll use most",
		icon: <Users size={24} />,
		href: "/reference/pronouns",
		color: "bg-stone-100 text-stone-700 border-stone-200",
	},
	{
		id: "articles",
		label: "Articles",
		description: "The definite article and agreement rules",
		icon: <FileText size={24} />,
		href: "/reference/articles",
		color: "bg-stone-100 text-stone-700 border-stone-200",
	},
	{
		id: "nouns",
		label: "Nouns",
		description: "Noun declensions by gender and case",
		icon: <FileText size={24} />,
		href: "/reference/nouns",
		color: "bg-stone-100 text-stone-700 border-stone-200",
	},
	{
		id: "adjectives",
		label: "Adjectives",
		description: "Agreement patterns that follow the noun",
		icon: <Palette size={24} />,
		href: "/reference/adjectives",
		color: "bg-stone-100 text-stone-700 border-stone-200",
	},
	{
		id: "prepositions",
		label: "Prepositions",
		description: "Connecting words and their case requirements",
		icon: <ArrowRightLeft size={24} />,
		href: "/reference/prepositions",
		color: "bg-stone-100 text-stone-700 border-stone-200",
	},
	{
		id: "verbs",
		label: "Verbs",
		description: "Conjugation patterns and verb families",
		icon: <Languages size={24} />,
		href: "/reference/verbs",
		color: "bg-stone-100 text-stone-700 border-stone-200",
	},
	{
		id: "patterns",
		label: "Patterns",
		description: "Greek-specific constructions like μου αρέσει",
		icon: <Blocks size={24} />,
		href: "/reference/patterns",
		color: "bg-stone-100 text-stone-700 border-stone-200",
	},
];

export default function ReferenceIndex() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-stone-800">Reference</h1>
				<p className="mt-1 text-stone-600">Grammar patterns and paradigms</p>
			</div>

			<div className="grid gap-3">
				{sections.map((section) => (
					<SectionCard key={section.id} section={section} />
				))}
			</div>
		</div>
	);
}
