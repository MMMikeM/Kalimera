import {
	BookOpen,
	ChevronLeft,
	Hash,
	MapPin,
	Palette,
	Sun,
	TrendingUp,
} from "lucide-react";
import { Link } from "react-router";
import { Card } from "@/components/Card";
import { TabHero } from "@/components/TabHero";

const TOOLKIT_SECTIONS = [
	{
		id: "numbers",
		label: "Numbers",
		icon: Hash,
		color: "ocean" as const,
		description: "Count, tell time, give prices",
	},
	{
		id: "position",
		label: "Position",
		icon: MapPin,
		color: "ocean" as const,
		description: "Give and understand directions",
	},
	{
		id: "time",
		label: "Time",
		icon: Sun,
		color: "honey" as const,
		description: "Times of day and scheduling",
	},
	{
		id: "frequency",
		label: "Frequency",
		icon: TrendingUp,
		color: "olive" as const,
		description: "How often things happen",
	},
	{
		id: "colours",
		label: "Colours",
		icon: Palette,
		color: "terracotta" as const,
		description: "Describe what you see",
	},
];

const COLOR_CLASSES = {
	ocean: "bg-ocean-50 border-ocean-300 hover:border-ocean-400",
	honey: "bg-honey-50 border-honey-300 hover:border-honey-400",
	olive: "bg-olive-50 border-olive-300 hover:border-olive-400",
	terracotta:
		"bg-terracotta-50 border-terracotta-300 hover:border-terracotta-400",
} as const;

const ICON_CLASSES = {
	ocean: "bg-ocean-200 text-ocean-text",
	honey: "bg-honey-200 text-honey-text",
	olive: "bg-olive-200 text-olive-text",
	terracotta: "bg-terracotta-200 text-terracotta-text",
} as const;

export default function EssentialsIndex() {
	return (
		<div className="space-y-6">
			<Link
				to="/learn/vocabulary"
				className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900"
			>
				<ChevronLeft size={16} />
				Words
			</Link>

			<TabHero
				title="Quick reference essentials"
				greekPhrase="ένα, δύο, τρία..."
				colorScheme="honey"
				icon={<BookOpen size={18} />}
			>
				Numbers, colours, times, and position words — the building blocks you'll
				need constantly in everyday Greek.
			</TabHero>

			<div className="grid grid-cols-2 gap-4">
				{TOOLKIT_SECTIONS.map((section) => {
					const Icon = section.icon;
					return (
						<Link
							key={section.id}
							to={`/learn/vocabulary/essentials/${section.id}`}
							className="block"
						>
							<Card
								variant="bordered"
								padding="md"
								className={`${COLOR_CLASSES[section.color]} transition-colors h-full`}
							>
								<div className="flex flex-col items-center text-center gap-2">
									<div
										className={`p-2 rounded-lg ${ICON_CLASSES[section.color]}`}
									>
										<Icon size={20} />
									</div>
									<h3 className="font-semibold text-stone-900">
										{section.label}
									</h3>
									<p className="text-xs text-stone-600">
										{section.description}
									</p>
								</div>
							</Card>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
