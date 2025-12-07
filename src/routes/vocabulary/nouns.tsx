import type React from "react";
import { useOutletContext } from "react-router";
import { Users, ShoppingCart, Home, Car, Sun } from "lucide-react";
import { Card } from "@/components";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { type VocabularyLoaderData, NounDisplay, type VocabItem } from "./shared";

const NounSection: React.FC<{
	title: string;
	subtitle?: string;
	icon: React.ReactNode;
	colorScheme: "aegean" | "terracotta" | "olive" | "honey";
	nouns: VocabItem[];
	columns?: 2 | 3;
}> = ({ title, subtitle, icon, colorScheme, nouns, columns = 3 }) => {
	const colors = {
		aegean: {
			bg: "bg-aegean/5",
			border: "border-aegean/30",
			text: "text-aegean-text",
			iconBg: "bg-aegean/20",
		},
		terracotta: {
			bg: "bg-terracotta/5",
			border: "border-terracotta/30",
			text: "text-terracotta-text",
			iconBg: "bg-terracotta/20",
		},
		olive: {
			bg: "bg-olive/5",
			border: "border-olive/30",
			text: "text-olive-text",
			iconBg: "bg-olive/20",
		},
		honey: {
			bg: "bg-honey/5",
			border: "border-honey/30",
			text: "text-honey-text",
			iconBg: "bg-honey/20",
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
					{subtitle && (
						<p className="text-sm text-stone-600">{subtitle}</p>
					)}
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
						<span className="w-3 h-3 bg-aegean/60 rounded-sm" /> masculine (ο)
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

			<div className="grid md:grid-cols-2 gap-4">
				<NounSection
					title="Shopping & Groceries"
					subtitle={`${data.nouns.shopping.length} nouns`}
					icon={<ShoppingCart size={20} />}
					colorScheme="olive"
					nouns={data.nouns.shopping}
					columns={2}
				/>

				<NounSection
					title="Household & Home"
					subtitle={`${data.nouns.household.length} nouns`}
					icon={<Home size={20} />}
					colorScheme="aegean"
					nouns={data.nouns.household}
					columns={2}
				/>
			</div>

			<NounSection
				title="Transportation"
				subtitle={`${data.nouns.vehicles.length} nouns`}
				icon={<Car size={20} />}
				colorScheme="aegean"
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
