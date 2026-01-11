import { BookOpen, MessageCircle, Quote } from "lucide-react";
import { Link } from "react-router";

const sections = [
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
	{
		id: "vocabulary",
		label: "Vocabulary",
		description: "Words organised by category",
		icon: <BookOpen size={24} />,
		href: "/learn/vocabulary/nouns",
		color: "bg-honey-100 text-honey-700 border-honey-200",
	},
];

export default function LearnIndex() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-stone-800">Learn</h1>
				<p className="text-stone-600 mt-1">Browse Greek content by topic</p>
			</div>

			<div className="grid gap-4">
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
