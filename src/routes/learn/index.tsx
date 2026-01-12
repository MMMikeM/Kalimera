import { Boxes, Hash, Languages, MessageCircle, Quote } from "lucide-react";
import { Link } from "react-router";

interface Section {
	id: string;
	label: string;
	description: string;
	icon: React.ReactNode;
	href: string;
	color: string;
}

const communicationSections: Section[] = [
	{
		id: "conversations",
		label: "Conversations",
		description: "Real situations with family and friends",
		icon: <MessageCircle size={24} />,
		href: "/learn/conversations/arriving",
		color: "bg-olive-100 text-olive-700 border-olive-200",
	},
	{
		id: "phrases",
		label: "Phrases",
		description: "Common expressions and useful phrases",
		icon: <Quote size={24} />,
		href: "/learn/phrases/survival",
		color: "bg-ocean-100 text-ocean-700 border-ocean-200",
	},
];

const wordsSections: Section[] = [
	{
		id: "nouns",
		label: "Nouns",
		description: "Objects, people, places — with gender",
		icon: <Boxes size={24} />,
		href: "/learn/nouns",
		color: "bg-ocean-100 text-ocean-700 border-ocean-200",
	},
	{
		id: "verbs",
		label: "Verbs",
		description: "Actions by conjugation family",
		icon: <Languages size={24} />,
		href: "/learn/verbs",
		color: "bg-honey-100 text-honey-700 border-honey-200",
	},
	{
		id: "essentials",
		label: "Essentials",
		description: "Numbers, colours, time, position",
		icon: <Hash size={24} />,
		href: "/learn/essentials",
		color: "bg-olive-100 text-olive-700 border-olive-200",
	},
];

const SectionCard = ({ section }: { section: Section }) => (
	<Link
		to={section.href}
		className={`flex items-center gap-4 p-4 rounded-xl border-2 ${section.color} hover:shadow-md transition-shadow`}
	>
		<div className="shrink-0">{section.icon}</div>
		<div>
			<h2 className="font-semibold">{section.label}</h2>
			<p className="text-sm opacity-80">{section.description}</p>
		</div>
	</Link>
);

export default function LearnIndex() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-stone-800">Learn</h1>
				<p className="text-stone-600 mt-1">Browse Greek content by topic</p>
			</div>

			<section>
				<h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">
					Communication
				</h2>
				<div className="grid gap-3">
					{communicationSections.map((section) => (
						<SectionCard key={section.id} section={section} />
					))}
				</div>
			</section>

			<section>
				<h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">
					Words
				</h2>
				<div className="grid gap-3">
					{wordsSections.map((section) => (
						<SectionCard key={section.id} section={section} />
					))}
				</div>
			</section>
		</div>
	);
}
