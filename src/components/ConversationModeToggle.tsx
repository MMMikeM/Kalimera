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
		label: "Read",
		icon: <BookOpen size={16} />,
		description: "See all translations",
	},
	{
		value: "practice",
		label: "Practice",
		icon: <Eye size={16} />,
		description: "Tap to reveal English",
	},
	{
		value: "roleplay",
		label: "Role Play",
		icon: <MessageSquare size={16} />,
		description: "Respond before revealing",
	},
];

export const ConversationModeToggle: React.FC<ConversationModeToggleProps> = ({
	mode,
	onModeChange,
	className,
}) => (
	<div className={cn("flex items-center gap-1 p-1 bg-stone-100 rounded-lg", className)}>
		{modes.map((m) => (
			<button
				key={m.value}
				type="button"
				onClick={() => onModeChange(m.value)}
				className={cn(
					"flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
					mode === m.value
						? "bg-white text-stone-800 shadow-sm"
						: "text-stone-600 hover:text-stone-800 hover:bg-stone-50"
				)}
				title={m.description}
			>
				{m.icon}
				<span className="hidden sm:inline">{m.label}</span>
			</button>
		))}
	</div>
);
