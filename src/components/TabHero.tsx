import type { ReactNode } from "react";
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./Card";
import { MonoText } from "./MonoText";

/**
 * Enforces a maximum character length on string literals at compile time.
 * If the string exceeds maxLength, TypeScript will error.
 */
type MaxLength<
	S extends string,
	MaxLen extends number,
	Acc extends unknown[] = [],
> = Acc["length"] extends MaxLen
	? S extends ""
		? S
		: never
	: S extends `${infer _}${infer Rest}`
		? MaxLength<Rest, MaxLen, [...Acc, unknown]>
		: S;

/** Title must be 30 characters or fewer */
type ShortTitle<S extends string> = MaxLength<S, 30>;

export type TabHeroColorScheme =
	| "ocean"
	| "terracotta"
	| "olive"
	| "honey"
	| "stone";

export interface TabHeroProps<T extends string = string> {
	title: ShortTitle<T> extends never ? `Title too long (max 30 chars): ${T}` : T;
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

export const TabHero = <T extends string>({
	title,
	children,
	icon = <Lightbulb size={24} />,
	greekPhrase,
	expandedExample,
	colorScheme = "ocean",
	className,
}: TabHeroProps<T>) => {
	const styles = colorStyles[colorScheme];

	return (
		<Card
			variant="elevated"
			padding="md"
			className={cn(styles.bg, "border-2", styles.border, "sm:p-6", className)}
		>
			<div className="space-y-3 sm:space-y-4">
				<div className="flex items-stretch gap-3 sm:gap-4 h-12 sm:h-14">
					<div
						className={cn(
							"aspect-square h-full rounded-xl shrink-0 shadow-sm flex items-center justify-center",
							styles.iconBg,
						)}
					>
						<span className={cn("block", styles.iconText)}>{icon}</span>
					</div>
					<div className="min-w-0 flex flex-col justify-center">
						<h3
							className={cn(
								"sm:text-xl font-bold leading-tight",
								styles.titleText,
							)}
						>
							{title}
						</h3>
						{greekPhrase && (
							<MonoText
								variant="greek"
								size="sm"
								className="text-stone-600 mt-0.5"
							>
								{greekPhrase}
							</MonoText>
						)}
					</div>
				</div>
				<div className="text-slate-text text-sm leading-relaxed">
					{children}
				</div>
				{expandedExample && (
					<div
						className={cn(
							"p-3 sm:p-4 rounded-lg border",
							styles.expandedBg,
							styles.expandedBorder,
						)}
					>
						<div className={cn("text-sm font-medium mb-1.5", styles.titleText)}>
							{expandedExample.label}
						</div>
						{expandedExample.content}
					</div>
				)}
			</div>
		</Card>
	);
};
