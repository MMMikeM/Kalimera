import type React from "react";
import { cn } from "@/lib/utils";
import { MonoText } from "./MonoText";
import type { ColorScheme } from "./DialogueExchange";

export interface ConversationHeroProps {
	icon: React.ReactNode;
	title: string;
	greekPhrase: string;
	description: string;
	colorScheme: ColorScheme;
	className?: string;
}

const heroStyles: Record<ColorScheme, { bg: string; border: string; text: string }> = {
	olive: {
		bg: "bg-olive/5",
		border: "border-olive/20",
		text: "text-olive-dark",
	},
	terracotta: {
		bg: "bg-terracotta/5",
		border: "border-terracotta/20",
		text: "text-terracotta-dark",
	},
	aegean: {
		bg: "bg-aegean/5",
		border: "border-aegean/20",
		text: "text-aegean-dark",
	},
	honey: {
		bg: "bg-honey/5",
		border: "border-honey/20",
		text: "text-honey-dark",
	},
};

export const ConversationHero: React.FC<ConversationHeroProps> = ({
	icon,
	title,
	greekPhrase,
	description,
	colorScheme,
	className,
}) => {
	const styles = heroStyles[colorScheme];

	return (
		<div
			className={cn(
				"rounded-xl border-2 p-6",
				styles.bg,
				styles.border,
				className
			)}
		>
			<div className="flex items-start gap-4">
				<div
					className={cn(
						"flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
						styles.bg,
						"border",
						styles.border
					)}
				>
					<span className={styles.text}>{icon}</span>
				</div>
				<div className="flex-1 min-w-0">
					<h2 className={cn("text-xl font-bold", styles.text)}>{title}</h2>
					<MonoText variant="greek" size="lg" className="block mt-1 text-stone-700">
						{greekPhrase}
					</MonoText>
					<p className="text-stone-600 mt-2 text-sm leading-relaxed">
						{description}
					</p>
				</div>
			</div>
		</div>
	);
};
