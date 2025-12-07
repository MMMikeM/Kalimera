import type React from "react";
import { cn } from "@/lib/utils";

export type SpeakerRole = "host" | "you" | "friend" | "waiter" | "shopkeeper" | "stranger";

interface SpeakerBadgeProps {
	role: SpeakerRole;
	className?: string;
}

const SPEAKER_CONFIG: Record<SpeakerRole, { label: string; bgClass: string; textClass: string }> = {
	host: { label: "Host", bgClass: "bg-terracotta-200", textClass: "text-terracotta-text" },
	you: { label: "You", bgClass: "bg-ocean-200", textClass: "text-ocean-text" },
	friend: { label: "Friend", bgClass: "bg-olive-200", textClass: "text-olive-text" },
	waiter: { label: "Waiter", bgClass: "bg-honey-200", textClass: "text-honey-text" },
	shopkeeper: { label: "Shop", bgClass: "bg-stone-200", textClass: "text-stone-700" },
	stranger: { label: "Person", bgClass: "bg-stone-200", textClass: "text-stone-700" },
};

export const SpeakerBadge: React.FC<SpeakerBadgeProps> = ({ role, className }) => {
	const config = SPEAKER_CONFIG[role];

	return (
		<span
			className={cn(
				"text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide",
				config.bgClass,
				config.textClass,
				className
			)}
		>
			{config.label}
		</span>
	);
};
