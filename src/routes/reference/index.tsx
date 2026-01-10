import { Link } from "react-router";
import { Scale, Users, FileText, Palette, ArrowRightLeft, Languages, Blocks } from "lucide-react";

const sections = [
	{
		id: "cases",
		label: "Cases",
		description: "The framework for understanding Greek grammar",
		icon: <Scale size={24} />,
		href: "/reference/cases",
		color: "bg-ocean-100 text-ocean-700 border-ocean-200",
	},
	{
		id: "pronouns",
		label: "Pronouns",
		description: "Cases in action - the words you'll use most",
		icon: <Users size={24} />,
		href: "/reference/pronouns",
		color: "bg-ocean-100 text-ocean-700 border-ocean-200",
	},
	{
		id: "articles",
		label: "Articles",
		description: "Article paradigms and gender agreement",
		icon: <FileText size={24} />,
		href: "/reference/articles",
		color: "bg-olive-100 text-olive-700 border-olive-200",
	},
	{
		id: "adjectives",
		label: "Adjectives",
		description: "Agreement patterns that follow the noun",
		icon: <Palette size={24} />,
		href: "/reference/adjectives",
		color: "bg-honey-100 text-honey-700 border-honey-200",
	},
	{
		id: "prepositions",
		label: "Prepositions",
		description: "Connecting words and their case requirements",
		icon: <ArrowRightLeft size={24} />,
		href: "/reference/prepositions",
		color: "bg-terracotta-100 text-terracotta-700 border-terracotta-200",
	},
	{
		id: "verbs",
		label: "Verbs",
		description: "Conjugation patterns and verb families",
		icon: <Languages size={24} />,
		href: "/reference/verbs",
		color: "bg-ocean-100 text-ocean-700 border-ocean-200",
	},
	{
		id: "patterns",
		label: "Patterns",
		description: "Greek-specific constructions like μου αρέσει",
		icon: <Blocks size={24} />,
		href: "/reference/patterns",
		color: "bg-honey-100 text-honey-700 border-honey-200",
	},
];

export default function ReferenceIndex() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-stone-800">Reference</h1>
				<p className="text-stone-600 mt-1">Grammar patterns and paradigms</p>
			</div>

			<div className="grid gap-3">
				{sections.map((section) => (
					<Link
						key={section.id}
						to={section.href}
						className={`flex items-center gap-4 p-4 rounded-xl border-2 ${section.color} hover:shadow-md transition-shadow`}
					>
						<div className="shrink-0">{section.icon}</div>
						<div>
							<h2 className="font-semibold">{section.label}</h2>
							<p className="text-sm opacity-80">{section.description}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
