import type { ReactNode } from "react";
import { Card } from "./Card";
import { cn } from "@/lib/utils";

export type CardPriority = "primary" | "secondary" | "tertiary";
export type CategoryColorScheme = "ocean" | "terracotta" | "olive" | "honey";

export interface CategoryCardProps {
	title: string;
	subtitle?: string;
	priority?: CardPriority;
	badge?: string;
	colorScheme: CategoryColorScheme;
	children: ReactNode;
	className?: string;
}

const priorityStyles: Record<CardPriority, { border: string; shadow: string }> =
	{
		primary: {
			border: "border-2",
			shadow: "shadow-lg",
		},
		secondary: {
			border: "border",
			shadow: "shadow-md",
		},
		tertiary: {
			border: "border",
			shadow: "shadow-sm",
		},
	};

const colorStyles: Record<
	CategoryColorScheme,
	{
		bg: string;
		bgPrimary: string;
		border: string;
		text: string;
	}
> = {
	ocean: {
		bg: "bg-ocean-100",
		bgPrimary: "bg-ocean-200",
		border: "border-ocean-400",
		text: "text-ocean-text",
	},
	terracotta: {
		bg: "bg-terracotta-100",
		bgPrimary: "bg-terracotta-200",
		border: "border-terracotta-400",
		text: "text-terracotta-text",
	},
	olive: {
		bg: "bg-olive-100",
		bgPrimary: "bg-olive-200",
		border: "border-olive-400",
		text: "text-olive-text",
	},
	honey: {
		bg: "bg-honey-100",
		bgPrimary: "bg-honey-200",
		border: "border-honey-400",
		text: "text-honey-text",
	},
};

export const CategoryCard = ({
	title,
	subtitle,
	priority = "secondary",
	badge,
	colorScheme,
	children,
	className,
}: CategoryCardProps) => {
	const colors = colorStyles[colorScheme];
	const priorityStyle = priorityStyles[priority];
	const bgClass = priority === "primary" ? colors.bgPrimary : colors.bg;

	return (
		<Card
			variant="bordered"
			padding="lg"
			className={cn(
				bgClass,
				colors.border,
				priorityStyle.border,
				priorityStyle.shadow,
				className,
			)}
		>
			<div className="flex items-start justify-between mb-3">
				<div>
					<h3 className={`text-lg font-bold ${colors.text}`}>{title}</h3>
					{subtitle && <p className="text-sm text-stone-600">{subtitle}</p>}
				</div>
				{badge && (
					<span
						className={cn(
							"text-xs px-2.5 py-1 rounded-full font-semibold border",
							priority === "primary"
								? `${colors.bgPrimary} ${colors.text} ${colors.border}`
								: `${colors.bg} ${colors.text} ${colors.border}`,
						)}
					>
						{badge}
					</span>
				)}
			</div>
			{children}
		</Card>
	);
};
