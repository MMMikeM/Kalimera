import { Lightbulb } from "lucide-react";
import type { ReactNode } from "react";
import { type ColorScheme, colorStyles } from "@/lib/colors";
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

export type TabHeroColorScheme = Extract<
	ColorScheme,
	"ocean" | "terracotta" | "olive" | "honey" | "stone"
>;

export interface TabHeroProps<T extends string = string> {
	title: ShortTitle<T> extends never
		? `Title too long (max 30 chars): ${T}`
		: T;
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
			className={cn(
				styles.bgMuted,
				"border-2",
				styles.border,
				"sm:p-6",
				className,
			)}
		>
			<div className="space-y-3 sm:space-y-4">
				<div className="flex h-12 items-stretch gap-3 sm:h-14 sm:gap-4">
					<div
						className={cn(
							"aspect-square h-full rounded-xl shrink-0 shadow-sm flex items-center justify-center",
							styles.headerLight,
						)}
					>
						<span className={cn("block", styles.text)}>{icon}</span>
					</div>
					<div className="flex min-w-0 flex-col justify-center">
						<h3
							className={cn("sm:text-xl font-bold leading-tight", styles.text)}
						>
							{title}
						</h3>
						{greekPhrase && (
							<MonoText
								variant="greek"
								size="sm"
								className="mt-0.5 text-stone-600"
							>
								{greekPhrase}
							</MonoText>
						)}
					</div>
				</div>
				<div className="text-sm leading-relaxed text-slate-text">
					{children}
				</div>
				{expandedExample && (
					<div
						className={cn(
							"p-3 sm:p-4 rounded-lg border bg-cream-dark",
							styles.borderMuted,
						)}
					>
						<div className={cn("text-sm font-medium mb-1.5", styles.text)}>
							{expandedExample.label}
						</div>
						{expandedExample.content}
					</div>
				)}
			</div>
		</Card>
	);
};
