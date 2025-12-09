import type React from "react";
import { cn } from "@/lib/utils";

export type SpeakerRole =
	| "host"
	| "you"
	| "friend"
	| "waiter"
	| "shopkeeper"
	| "stranger";

interface SpeakerBadgeProps {
	role: SpeakerRole;
	className?: string;
}

const SPEAKER_CONFIG: Record<
	SpeakerRole,
	{ label: string; bgClass: string; textClass: string }
> = {
	you: { label: "You", bgClass: "bg-navy-600", textClass: "text-white" },
	host: { label: "Host", bgClass: "bg-olive-100", textClass: "text-olive-700" },
	friend: {
		label: "Friend",
		bgClass: "bg-ocean-100",
		textClass: "text-ocean-700",
	},
	waiter: {
		label: "Waiter",
		bgClass: "bg-terracotta-100",
		textClass: "text-terracotta-700",
	},
	shopkeeper: {
		label: "Shop",
		bgClass: "bg-terracotta-100",
		textClass: "text-terracotta-700",
	},
	stranger: {
		label: "Person",
		bgClass: "bg-stone-200",
		textClass: "text-stone-600",
	},
};

export const SpeakerBadge: React.FC<SpeakerBadgeProps> = ({
	role,
	className,
}) => {
	const config = SPEAKER_CONFIG[role];

	return (
		<span
			className={cn(
				"text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide",
				config.bgClass,
				config.textClass,
				className,
			)}
		>
			{config.label}
		</span>
	);
};
