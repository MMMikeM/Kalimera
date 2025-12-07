import type React from "react";
import { cn } from "@/lib/utils";
import { MonoText } from "./MonoText";
import { SpeakerBadge, type SpeakerRole } from "./SpeakerBadge";

export interface DialogueLine {
	speaker: SpeakerRole;
	greek: string;
	english: string;
	note?: string; // Optional context note
}

export type ColorScheme = "olive" | "terracotta" | "aegean" | "honey";

const colorSchemeStyles: Record<ColorScheme, { you: string; other: string }> = {
	olive: {
		you: "bg-olive/8 border-l-4 border-olive/30",
		other: "bg-cream-dark border-l-4 border-olive/20",
	},
	terracotta: {
		you: "bg-terracotta/8 border-l-4 border-terracotta/30",
		other: "bg-cream-dark border-l-4 border-terracotta/20",
	},
	aegean: {
		you: "bg-aegean/8 border-l-4 border-aegean/30",
		other: "bg-cream-dark border-l-4 border-aegean/20",
	},
	honey: {
		you: "bg-honey/8 border-l-4 border-honey/30",
		other: "bg-cream-dark border-l-4 border-honey/20",
	},
};

interface DialogueExchangeProps {
	lines: DialogueLine[];
	colorScheme?: ColorScheme;
	className?: string;
}

export const DialogueExchange: React.FC<DialogueExchangeProps> = ({
	lines,
	colorScheme = "aegean",
	className,
}) => {
	const styles = colorSchemeStyles[colorScheme];

	return (
		<div className={cn("space-y-3", className)}>
			{lines.map((line, idx) => (
				<div
					key={idx}
					className={cn("flex", line.speaker === "you" ? "justify-end" : "justify-start")}
				>
					<div
						className={cn(
							"max-w-[85%] p-3 rounded-lg",
							line.speaker === "you"
								? `${styles.you} rounded-br-none`
								: `${styles.other} rounded-bl-none`
						)}
					>
						<SpeakerBadge role={line.speaker} className="mb-2" />
						<MonoText variant="greek" size="lg" className="block mt-2">
							{line.greek}
						</MonoText>
						<div className="text-stone-600 text-sm mt-1">{line.english}</div>
						{line.note && (
							<div className="text-stone-500 text-xs mt-2 italic">{line.note}</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export interface DialogueScenarioProps {
	title: string;
	description?: string;
	dialogue: DialogueLine[];
	colorScheme?: ColorScheme;
	className?: string;
}

export const DialogueScenario: React.FC<DialogueScenarioProps> = ({
	title,
	description,
	dialogue,
	colorScheme,
	className,
}) => (
	<div className={cn("space-y-4", className)}>
		<div>
			<h4 className="font-semibold text-stone-800">{title}</h4>
			{description && <p className="text-sm text-stone-600">{description}</p>}
		</div>
		<DialogueExchange lines={dialogue} colorScheme={colorScheme} />
	</div>
);
