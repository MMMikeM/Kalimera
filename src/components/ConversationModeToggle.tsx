import type React from "react";
import { BookOpen, Eye, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConversationMode } from "./DialogueExchange";

export interface ConversationModeToggleProps {
	mode: ConversationMode;
	onModeChange: (mode: ConversationMode) => void;
	className?: string;
}

const modes: { value: ConversationMode; label: string; icon: React.ReactNode; description: string }[] = [
	{
		value: "read",
		label: "Study",
		icon: <BookOpen size={16} />,
		description: "See Greek with English translations",
	},
	{
		value: "practice",
		label: "Recall",
		icon: <Eye size={16} />,
		description: "English hidden - tap to reveal",
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
	<div className={cn("flex items-center gap-1 p-1 bg-stone-100 rounded-lg sm:w-fit", className)}>
		{modes.map((m) => (
			<button
				key={m.value}
				type="button"
				onClick={() => onModeChange(m.value)}
				className={cn(
					"flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
					mode === m.value
						? "bg-white text-stone-800 shadow-sm"
						: "text-stone-600 hover:text-stone-800 hover:bg-stone-50"
				)}
				title={m.description}
			>
				{m.icon}
				{m.label}
			</button>
		))}
	</div>
);
