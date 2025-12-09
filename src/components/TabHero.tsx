import type { ReactNode } from "react";
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./Card";
import { MonoText } from "./MonoText";

export type TabHeroColorScheme =
	| "ocean"
	| "terracotta"
	| "olive"
	| "honey"
	| "stone";

export interface TabHeroProps {
	title: string;
	children: ReactNode;
	icon?: ReactNode;
	greekPhrase?: string;
	expandedExample?: {
		label: string;
		content: ReactNode;
	};
	colorScheme?: TabHeroColorScheme;
	className?: string;
}

const colorStyles: Record<
	TabHeroColorScheme,
	{
		bg: string;
		border: string;
		iconBg: string;
		iconText: string;
		titleText: string;
		expandedBg: string;
		expandedBorder: string;
	}
> = {
	ocean: {
		bg: "bg-ocean-100",
		border: "border-ocean-400",
		iconBg: "bg-ocean-300",
		iconText: "text-ocean-text",
		titleText: "text-ocean-text",
		expandedBg: "bg-white",
		expandedBorder: "border-ocean-200",
	},
	terracotta: {
		bg: "bg-terracotta-100",
		border: "border-terracotta-400",
		iconBg: "bg-terracotta-300",
		iconText: "text-terracotta-text",
		titleText: "text-terracotta-text",
		expandedBg: "bg-white",
		expandedBorder: "border-terracotta-200",
	},
	olive: {
		bg: "bg-olive-100",
		border: "border-olive-400",
		iconBg: "bg-olive-300",
		iconText: "text-olive-text",
		titleText: "text-olive-text",
		expandedBg: "bg-white",
		expandedBorder: "border-olive-200",
	},
	honey: {
		bg: "bg-honey-100",
		border: "border-honey-400",
		iconBg: "bg-honey-300",
		iconText: "text-honey-text",
		titleText: "text-honey-text",
		expandedBg: "bg-white",
		expandedBorder: "border-honey-200",
	},
	stone: {
		bg: "bg-stone-100",
		border: "border-stone-400",
		iconBg: "bg-stone-300",
		iconText: "text-stone-700",
		titleText: "text-stone-700",
		expandedBg: "bg-white",
		expandedBorder: "border-stone-200",
	},
};

export const TabHero = ({
	title,
	children,
	icon = <Lightbulb size={18} />,
	greekPhrase,
	expandedExample,
	colorScheme = "ocean",
	className,
}: TabHeroProps) => {
	const styles = colorStyles[colorScheme];

	return (
		<Card
			variant="elevated"
			padding="lg"
			className={cn(styles.bg, "border-2", styles.border, className)}
		>
			<div className="flex items-start gap-3">
				<div
					className={cn(
						"p-2.5 rounded-xl shrink-0 shadow-sm",
						styles.iconBg
					)}
				>
					<span className={styles.iconText}>{icon}</span>
				</div>
				<div className="flex-1">
					<h3 className={cn("font-bold mb-1", styles.titleText)}>
						{title}
					</h3>
					{greekPhrase && (
						<MonoText
							variant="greek"
							size="lg"
							className="block text-stone-700 mb-1"
						>
							{greekPhrase}
						</MonoText>
					)}
					<div className="text-slate-text">{children}</div>
					{expandedExample && (
						<div
							className={cn(
								"mt-3 p-3 rounded-lg border",
								styles.expandedBg,
								styles.expandedBorder
							)}
						>
							<div
								className={cn(
									"text-sm font-medium mb-1",
									styles.titleText
								)}
							>
								{expandedExample.label}
							</div>
							{expandedExample.content}
						</div>
					)}
				</div>
			</div>
		</Card>
	);
};
