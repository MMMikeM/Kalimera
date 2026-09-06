import { BookOpen, MessageSquare } from "lucide-react";
import type React from "react";
import { tv } from "tailwind-variants";

import type { ConversationMode } from "./DialogueExchange";

const modeToggleVariants = tv({
	slots: {
		root: "flex items-center gap-1 rounded-lg bg-stone-100 p-1 sm:w-fit",
		button:
			"flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all sm:flex-none",
	},
	variants: {
		active: {
			true: { button: "bg-white text-stone-800 shadow-sm" },
			false: { button: "text-stone-600 hover:bg-stone-50 hover:text-stone-800" },
		},
	},
	defaultVariants: { active: false },
});

interface ConversationModeToggleProps {
	mode: ConversationMode;
	onModeChange: (mode: ConversationMode) => void;
	className?: string;
}

const modes: {
	value: ConversationMode;
	label: string;
	icon: React.ReactNode;
	description: string;
}[] = [
	{
		value: "read",
		label: "Study",
		icon: <BookOpen size={16} />,
		description: "See Greek with English translations",
	},
	{
		value: "roleplay",
		label: "Speak",
		icon: <MessageSquare size={16} />,
		description: "Say your response before revealing",
	},
];

export const ConversationModeToggle: React.FC<ConversationModeToggleProps> = ({
	mode,
	onModeChange,
	className,
}) => (
	<div className={modeToggleVariants().root({ className })}>
		{modes.map((m) => (
			<button
				key={m.value}
				type="button"
				onClick={() => onModeChange(m.value)}
				className={modeToggleVariants({ active: mode === m.value }).button()}
				aria-label={`${m.label}: ${m.description}`}
			>
				{m.icon}
				{m.label}
			</button>
		))}
	</div>
);
