import type React from "react";
import { useOutletContext } from "react-router";
import { Users, ShoppingCart, Home, Car, Sun } from "lucide-react";
import { Card } from "@/components";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	type VocabularyLoaderData,
	NounDisplay,
	type VocabItem,
} from "./shared";

const NounSection: React.FC<{
	title: string;
	subtitle?: string;
	icon: React.ReactNode;
	colorScheme: "ocean" | "terracotta" | "olive" | "honey" | "stone";
	nouns: VocabItem[];
	columns?: 2 | 3;
}> = ({ title, subtitle, icon, colorScheme, nouns, columns = 3 }) => {
	const colors = {
		ocean: {
			bg: "bg-ocean-50",
			border: "border-ocean-300",
			text: "text-ocean-text",
			iconBg: "bg-ocean-200",
		},
		terracotta: {
			bg: "bg-terracotta-50",
			border: "border-terracotta-300",
			text: "text-terracotta-text",
			iconBg: "bg-terracotta-200",
		},
		olive: {
			bg: "bg-olive-50",
			border: "border-olive-300",
			text: "text-olive-text",
			iconBg: "bg-olive-200",
		},
		honey: {
			bg: "bg-honey-50",
			border: "border-honey-300",
			text: "text-honey-text",
			iconBg: "bg-honey-200",
		},
		stone: {
			bg: "bg-stone",
			border: "border-stone-200",
			text: "text-stone-700",
			iconBg: "bg-stone-100",
		},
	};
	const c = colors[colorScheme];
	const gridCols =
		columns === 2
			? "grid-cols-1 md:grid-cols-2"
			: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

	return (
		<Card variant="bordered" padding="lg" className={`${c.bg} ${c.border}`}>
			<div className="flex items-center gap-3 mb-4">
				<div className={`p-2 rounded-lg ${c.iconBg}`}>
					<span className={c.text}>{icon}</span>
				</div>
				<div>
					<h3 className={`text-lg font-bold ${c.text}`}>{title}</h3>
					{subtitle && <p className="text-sm text-stone-600">{subtitle}</p>}
				</div>
			</div>
			<div className={`grid ${gridCols} gap-2`}>
				{nouns.map((noun) => (
					<NounDisplay
						key={noun.id}
						greek={noun.greek}
						english={noun.english}
						showGenderBadge
					/>
				))}
			</div>
		</Card>
	);
};

export default function NounsRoute() {
	const data = useOutletContext<VocabularyLoaderData>();

	return (
		<div className="space-y-6">
			<Alert variant="info" className="bg-stone-50">
				<AlertDescription className="text-stone-700">
					<strong>Gender color key:</strong>{" "}
					<span className="inline-flex items-center gap-1">
						<span className="w-3 h-3 bg-ocean-600 rounded-sm" /> masculine (ο)
					</span>{" "}
					<span className="inline-flex items-center gap-1">
						<span className="w-3 h-3 bg-rose-400/60 rounded-sm" /> feminine (η)
					</span>{" "}
					<span className="inline-flex items-center gap-1">
						<span className="w-3 h-3 bg-stone-400/60 rounded-sm" /> neuter (το)
					</span>
				</AlertDescription>
			</Alert>

			<NounSection
				title="Family & People"
				subtitle={`${data.nouns.people.length} nouns`}
				icon={<Users size={20} />}
				colorScheme="terracotta"
				nouns={data.nouns.people}
			/>

			<NounSection
				title="Shopping & Groceries"
				subtitle={`${data.nouns.shopping.length} nouns`}
				icon={<ShoppingCart size={20} />}
				colorScheme="olive"
				nouns={data.nouns.shopping}
			/>

			<NounSection
				title="Household & Home"
				subtitle={`${data.nouns.household.length} nouns`}
				icon={<Home size={20} />}
				colorScheme="ocean"
				nouns={data.nouns.household}
			/>

			<NounSection
				title="Transportation"
				subtitle={`${data.nouns.vehicles.length} nouns`}
				icon={<Car size={20} />}
				colorScheme="ocean"
				nouns={data.nouns.vehicles}
			/>

			<NounSection
				title="Summer & Beach"
				subtitle={`${data.nouns.summer.length} nouns`}
				icon={<Sun size={20} />}
				colorScheme="honey"
				nouns={data.nouns.summer}
			/>
		</div>
	);
}
