import type React from "react";
import { Card } from "@/components/Card";
import { MonoText } from "@/components/MonoText";

// Re-export types from data.server - single source of truth
export type {
	VerbCategory,
	VerbSubCategory,
	VerbWithPattern,
	VocabItem,
	VocabularyLoaderData,
} from "../data.server";

export const VocabItemDisplay: React.FC<{
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

type Gender = "masculine" | "feminine" | "neuter" | "unknown";

const detectGender = (greek: string): Gender => {
	const trimmed = greek.trim().toLowerCase();
	if (trimmed.startsWith("ο ") || trimmed.startsWith("οι ")) return "masculine";
	if (trimmed.startsWith("η ") || trimmed.startsWith("οι ")) return "feminine";
	if (trimmed.startsWith("το ") || trimmed.startsWith("τα ")) return "neuter";
	return "unknown";
};

const genderStyles: Record<
	Gender,
	{ border: string; label: string; abbr: string }
> = {
	masculine: {
		border: "border-l-4 border-ocean-600",
		label: "masculine",
		abbr: "m",
	},
	feminine: {
		border: "border-l-4 border-rose-400/60",
		label: "feminine",
		abbr: "f",
	},
	neuter: {
		border: "border-l-4 border-stone-400/60",
		label: "neuter",
		abbr: "n",
	},
	unknown: { border: "", label: "", abbr: "" },
};

export const NounDisplay: React.FC<{
	greek: string;
	english: string;
	showGenderBadge?: boolean;
}> = ({ greek, english, showGenderBadge = false }) => {
	const gender = detectGender(greek);
	const style = genderStyles[gender];

	return (
		<div
			className={`p-3 bg-white/50 rounded-lg ${style.border} flex items-center justify-between`}
		>
			<div className="flex items-baseline gap-2">
				<MonoText variant="greek" size="lg">
					{greek}
				</MonoText>
				<span className="text-stone-600 text-sm">{english}</span>
			</div>
			{showGenderBadge && gender !== "unknown" && (
				<span className="text-xs text-stone-500 font-medium uppercase">
					{style.abbr}
				</span>
			)}
		</div>
	);
};

export const VocabSection: React.FC<{
	title: string;
	icon: React.ReactNode;
	colorScheme: "ocean" | "terracotta" | "olive" | "honey";
	children: React.ReactNode;
	columns?: 2 | 3;
}> = ({ title, icon, colorScheme, children, columns = 3 }) => {
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
