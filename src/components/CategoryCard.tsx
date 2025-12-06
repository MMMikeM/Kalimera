import type { ReactNode } from "react";
import { Card } from "./Card";
import { cn } from "@/lib/utils";

export type CardPriority = "primary" | "secondary" | "tertiary";
export type CategoryColorScheme = "aegean" | "terracotta" | "olive" | "honey";

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
		shadowColor: string;
	}
> = {
	aegean: {
		bg: "bg-aegean/10",
		bgPrimary: "bg-aegean/20",
		border: "border-aegean/40",
		text: "text-aegean-text",
		shadowColor: "shadow-aegean/15",
	},
	terracotta: {
		bg: "bg-terracotta/10",
		bgPrimary: "bg-terracotta/20",
		border: "border-terracotta/40",
		text: "text-terracotta-text",
		shadowColor: "shadow-terracotta/15",
	},
	olive: {
		bg: "bg-olive/10",
		bgPrimary: "bg-olive/20",
		border: "border-olive/40",
		text: "text-olive-text",
		shadowColor: "shadow-olive/15",
	},
	honey: {
		bg: "bg-honey/10",
		bgPrimary: "bg-honey/20",
		border: "border-honey/40",
		text: "text-honey-text",
		shadowColor: "shadow-honey/15",
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
				colors.shadowColor,
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
