import type React from "react";
import { Card, MonoText } from "@/components";

export interface PhraseItem {
	id: number;
	greek: string;
	english: string;
	wordType: string | null;
	metadata: unknown;
	tagSlug: string;
}

export interface PhrasesLoaderData {
	survival: {
		essential: PhraseItem[];
		survival: PhraseItem[];
	};
	responses: {
		responses: PhraseItem[];
		socialPhrases: PhraseItem[];
	};
	requests: {
		requests: PhraseItem[];
		commands: PhraseItem[];
	};
	opinions: {
		opinions: PhraseItem[];
	};
	connectors: {
		discourseMarkers: PhraseItem[];
		discourseFillers: PhraseItem[];
	};
	time: {
		daysOfWeek: PhraseItem[];
		months: PhraseItem[];
		timeTelling: PhraseItem[];
	};
	constructions: {
		likesConstruction: {
			singular: PhraseItem[];
			plural: PhraseItem[];
		};
		nameConstruction: PhraseItem[];
		questionWords: PhraseItem[];
	};
}

export const PhraseItemDisplay: React.FC<{
	greek: string;
	english: string;
	variant?: "default" | "highlighted";
}> = ({ greek, english, variant = "default" }) => (
	<div className="flex items-baseline gap-2">
		<MonoText variant={variant} size="md">
			{greek}
		</MonoText>
		<span className="text-stone-600 text-sm">{english}</span>
	</div>
);

export const PhraseSection: React.FC<{
	title: string;
	icon: React.ReactNode;
	colorScheme: "ocean" | "terracotta" | "olive" | "honey";
	children: React.ReactNode;
	columns?: 2 | 3;
}> = ({ title, icon, colorScheme, children, columns = 2 }) => {
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
	};
	const c = colors[colorScheme];
	const gridCols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

	return (
		<Card variant="bordered" padding="lg" className={`${c.bg} ${c.border}`}>
			<div className="flex items-center gap-3 mb-4">
				<div className={`p-2 rounded-lg ${c.iconBg}`}>
					<span className={c.text}>{icon}</span>
				</div>
				<h3 className={`text-lg font-bold ${c.text}`}>{title}</h3>
			</div>
			<div className={`grid ${gridCols} gap-3`}>{children}</div>
		</Card>
	);
};
