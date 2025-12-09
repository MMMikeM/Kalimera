import type React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { MonoText } from "./MonoText";
import { SpeakerBadge, type SpeakerRole } from "./SpeakerBadge";

export type ConversationMode = "read" | "practice" | "roleplay";

export interface DialogueLine {
	speaker: SpeakerRole;
	greek: string;
	english: string;
	note?: string; // Optional context note
}

export type ColorScheme = "olive" | "terracotta" | "ocean" | "honey";

const speakerBubbleStyles: Record<SpeakerRole, string> = {
	you: "bg-navy-100 border-r-4 border-navy-500",
	host: "bg-stone-50 border-l-4 border-stone-300",
	friend: "bg-stone-50 border-l-4 border-stone-300",
	waiter: "bg-stone-50 border-l-4 border-stone-300",
	shopkeeper: "bg-stone-50 border-l-4 border-stone-300",
	stranger: "bg-stone-50 border-l-4 border-stone-300",
};

interface DialogueExchangeProps {
	lines: DialogueLine[];
	colorScheme?: ColorScheme;
	mode?: ConversationMode;
	className?: string;
}

interface RevealableTextProps {
	text: string;
	isHidden: boolean;
	onReveal: () => void;
	className?: string;
}

const RevealableText: React.FC<RevealableTextProps> = ({
	text,
	isHidden,
	onReveal,
	className,
}) => {
	if (!isHidden) {
		return <span className={className}>{text}</span>;
	}

	return (
		<button
			type="button"
			onClick={onReveal}
			className={cn(
				"text-stone-400 hover:text-stone-500 transition-colors cursor-pointer",
				"border-b border-dashed border-stone-300 hover:border-stone-400",
				className,
			)}
		>
			tap to reveal
		</button>
	);
};

export const DialogueExchange: React.FC<DialogueExchangeProps> = ({
	lines,
	colorScheme: _colorScheme,
	mode = "read",
	className,
}) => {
	const [revealedLines, setRevealedLines] = useState<Set<number>>(new Set());

	const revealLine = (idx: number) => {
		setRevealedLines((prev) => new Set(prev).add(idx));
	};

	const shouldHideEnglish = (_line: DialogueLine, idx: number) => {
		if (mode === "read") return false;
		if (revealedLines.has(idx)) return false;
		return true;
	};

	const shouldHideGreek = (line: DialogueLine, idx: number) => {
		if (mode !== "roleplay") return false;
		if (line.speaker !== "you") return false;
		if (revealedLines.has(idx)) return false;
		return true;
	};

	return (
		<div className={cn("space-y-3", className)}>
			{lines.map((line, idx) => (
				<motion.div
					key={line.greek}
					initial={{ opacity: 0, x: line.speaker === "you" ? 20 : -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: idx * 0.1, duration: 0.3, ease: "easeOut" }}
					className={cn(
						"flex",
						line.speaker === "you" ? "justify-end" : "justify-start",
					)}
				>
					<div
						className={cn(
							"max-w-[85%] p-3 rounded-lg",
							speakerBubbleStyles[line.speaker],
							line.speaker === "you" ? "rounded-br-none" : "rounded-bl-none",
						)}
					>
						<SpeakerBadge role={line.speaker} className="mb-2" />
						<MonoText variant="greek" size="lg" className="block mt-2">
							{shouldHideGreek(line, idx) ? (
								<RevealableText
									text={line.greek}
									isHidden={true}
									onReveal={() => revealLine(idx)}
									className="font-mono"
								/>
							) : (
								line.greek
							)}
						</MonoText>
						<div className="text-stone-600 text-sm mt-1">
							<RevealableText
								text={line.english}
								isHidden={shouldHideEnglish(line, idx)}
								onReveal={() => revealLine(idx)}
							/>
						</div>
						{line.note && !shouldHideEnglish(line, idx) && (
							<div className="text-stone-500 text-xs mt-2 italic">
								{line.note}
							</div>
						)}
					</div>
				</motion.div>
			))}
		</div>
	);
};

export type Formality = "formal" | "informal" | "mixed";

export interface DialogueScenarioProps {
	title: string;
	description?: string;
	dialogue: DialogueLine[];
	colorScheme?: ColorScheme;
	mode?: ConversationMode;
	formality?: Formality;
	className?: string;
}

const formalityLabels: Record<Formality, { text: string; className: string }> =
	{
		formal: { text: "Formal", className: "bg-stone-100 text-stone-600" },
		informal: { text: "Informal", className: "bg-olive-100 text-olive-700" },
		mixed: { text: "Mixed", className: "bg-ocean-100 text-ocean-700" },
	};

export const DialogueScenario: React.FC<DialogueScenarioProps> = ({
	title,
	description,
	dialogue,
	colorScheme,
	mode,
	formality,
	className,
}) => (
	<div className={cn("space-y-4", className)}>
		<div>
			<div className="flex items-center gap-2">
				<h4 className="font-semibold text-stone-800">{title}</h4>
				{formality && (
					<span
						className={cn(
							"text-xs px-2 py-0.5 rounded-full font-medium",
							formalityLabels[formality].className,
						)}
					>
						{formalityLabels[formality].text}
					</span>
				)}
			</div>
			{description && (
				<p className="text-sm text-stone-600 mt-1">{description}</p>
			)}
		</div>
		<DialogueExchange lines={dialogue} colorScheme={colorScheme} mode={mode} />
	</div>
);
