import type { LucideIcon } from "lucide-react";

export type ChipSize = "sm" | "md" | "lg";

interface GrammarChipProps {
	icon: LucideIcon;
	label: string;
	colorText: string;
	size?: ChipSize;
	muted?: boolean;
	ariaLabel?: string;
}

const SIZE_CLASSES: Record<ChipSize, { text: string; icon: number; gap: string }> = {
	sm: { text: "text-[10px] tracking-[0.18em]", icon: 12, gap: "gap-1" },
	md: { text: "text-xs tracking-[0.2em]", icon: 16, gap: "gap-1.5" },
	lg: { text: "text-4xl tracking-[0.12em] font-serif normal-case leading-none", icon: 40, gap: "gap-4" },
};

export const GrammarChip = ({
	icon: Icon,
	label,
	colorText,
	size = "md",
	muted = false,
	ariaLabel,
}: GrammarChipProps) => {
	const s = SIZE_CLASSES[size];
	const upper = size === "lg" ? "" : "uppercase";
	const weight = size === "lg" ? "" : "font-medium";
	return (
		<span
			role="img"
			aria-label={ariaLabel ?? label}
			className={`inline-flex items-center ${s.gap} ${colorText} ${muted ? "opacity-50" : ""}`}
		>
			<Icon size={s.icon} strokeWidth={size === "lg" ? 1.25 : 1.75} aria-hidden />
			<span className={`${s.text} ${upper} ${weight}`}>{label}</span>
		</span>
	);
};
