import { motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import { cn } from "tailwind-variants";

import { GreekText } from "@/components/GreekText";

import { SpeakerBadge, type SpeakerRole } from "./SpeakerBadge";

export type ConversationMode = "read" | "roleplay";

export interface DialogueLine {
	speaker: SpeakerRole;
	greek: string;
	english: string;
	note?: string; // Optional context note
}

interface DialogueExchangeProps {
	lines: DialogueLine[];
	mode: ConversationMode;
}

interface RevealableTextProps {
	text: string;
	isHidden: boolean;
	onReveal: () => void;
	className?: string;
}

const RevealableText: React.FC<RevealableTextProps> = ({ text, isHidden, onReveal, className }) => {
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

export const DialogueExchange: React.FC<DialogueExchangeProps> = ({ lines, mode }) => {
	const [revealedLines, setRevealedLines] = useState<Set<number>>(new Set());

	const revealLine = (idx: number) => {
		setRevealedLines((prev) => new Set(prev).add(idx));
	};

	const shouldHideEnglish = (_line: DialogueLine, idx: number) => {
		if (mode === "read") return false;
		if (revealedLines.has(idx)) return false;
		return true;
	};

	// In roleplay mode, hide Greek for "you" lines so the user must recall before revealing
	const shouldHideGreek = (line: DialogueLine, idx: number) => {
		if (mode !== "roleplay") return false;
		if (line.speaker !== "you") return false;
		if (revealedLines.has(idx)) return false;
		return true;
	};

	return (
		<div className="space-y-3">
			{lines.map((line, idx) => (
				<motion.div
					key={line.greek}
					initial={{ opacity: 0, x: line.speaker === "you" ? 20 : -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: idx * 0.1, duration: 0.3, ease: "easeOut" }}
					className={cn("flex", line.speaker === "you" ? "justify-end" : "justify-start")}
				>
					<div
						className={cn(
							"max-w-bubble p-3 rounded-lg",
							line.speaker === "you"
								? "bg-cream-dark rounded-br-none"
								: "bg-stone-50 rounded-bl-none",
						)}
					>
						<SpeakerBadge role={line.speaker} className="mb-2" />
						<GreekText tone="accent" size="xl" className="mt-2 block">
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
						</GreekText>
						<div className="mt-1 text-sm text-stone-600">
							<RevealableText
								text={line.english}
								isHidden={shouldHideEnglish(line, idx)}
								onReveal={() => revealLine(idx)}
							/>
						</div>
						{line.note && !shouldHideEnglish(line, idx) && (
							<div className="mt-2 text-xs text-stone-500 italic">{line.note}</div>
						)}
					</div>
				</motion.div>
			))}
		</div>
	);
};
