import type { ReactNode } from "react";

import { GreekText } from "@/components/GreekText";
import { Pronunciation } from "@/components/Pronunciation";

/**
 * A Greek word with its pronunciation beneath — the pairing the drill feedback
 * and summary screens show after every answer.
 *
 * It exists because that pairing was hand-assembled at five call sites in
 * `shells.tsx` and had already drifted into two different stylings (`font-sans
 * text-sm` at two of them, `font-mono text-xs` at the other three). Pairing them
 * in one component makes that divergence unrepresentable.
 */
interface GreekGlossProps {
	greek: string;
	size?: "sm" | "base" | "lg" | "xl" | "2xl";
	/** Small uppercase eyebrow, e.g. "ending". */
	label?: ReactNode;
	className?: string;
}

const GLOSS_SIZE = {
	sm: "xs",
	base: "xs",
	lg: "sm",
	xl: "sm",
	"2xl": "sm",
} as const;

export const GreekGloss: React.FC<GreekGlossProps> = ({ greek, size = "base", label, className }) => (
	<div className={`flex items-baseline gap-2 ${className ?? ""}`}>
		{label && (
			<span className="text-xs tracking-widest text-muted-foreground uppercase">{label}</span>
		)}
		<GreekText size={size}>{greek}</GreekText>
		<Pronunciation greek={greek} size={GLOSS_SIZE[size]} />
	</div>
);
