import type React from "react";

import { type ColorScheme, colorStyles } from "@/lib/colors";
import { cn } from "@/lib/utils";

import { MonoText } from "./MonoText";

interface ConversationHeroProps {
	icon: React.ReactNode;
	title: string;
	greekPhrase: string;
	description: string;
	colorScheme: ColorScheme;
	className?: string;
}

export const ConversationHero: React.FC<ConversationHeroProps> = ({
	icon,
	title,
	greekPhrase,
	description,
	colorScheme,
	className,
}) => {
	const styles = colorStyles[colorScheme];

	return (
		<div className={cn("rounded-xl border-2 p-6", styles.bg, styles.borderMuted, className)}>
			<div className="flex items-start gap-4">
				<div
					className={cn(
						"flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
						styles.bg,
						"border",
						styles.borderMuted,
					)}
				>
					<span className={styles.text}>{icon}</span>
				</div>
				<div className="min-w-0 flex-1">
					<h2 className={cn("text-xl font-bold", styles.text)}>{title}</h2>
					<MonoText variant="greek" size="sm" className="mt-1 block text-stone-600">
						{greekPhrase}
					</MonoText>
					<p className="mt-2 text-sm leading-relaxed text-stone-600">{description}</p>
				</div>
			</div>
		</div>
	);
};
