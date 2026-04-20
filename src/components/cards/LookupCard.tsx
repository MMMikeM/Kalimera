import type { ReactNode } from "react";

import { type GrammarScheme, SCHEME } from "@/constants/grammar-palette";
import { cn } from "@/lib/utils";

interface LookupCardProps {
	/** Grammar scheme driving tint + chip colour. */
	scheme: GrammarScheme;
	/** Label inside the coloured chip (grammar term — e.g. "Accusative"). */
	chip: string;
	/** Small caps label next to the chip (plain-English role — e.g. "Target", "Target triggers"). */
	eyebrow?: string;
	/** Body slot. Consumer renders paradigm, trigger list, etc. */
	children: ReactNode;
	className?: string;
}

/**
 * Tinted reference lookup container. Shared shell for case-keyed reference surfaces
 * (pronoun paradigms, case trigger-word lists). Same idiom across /reference/** so
 * lookup feels consistent wherever it appears. Not a teaching surface —
 * reach for TeachingCard when introducing a concept.
 */
export const LookupCard = ({ scheme, chip, eyebrow, children, className }: LookupCardProps) => {
	const style = SCHEME[scheme];
	return (
		<div
			className={cn(
				"flex h-full flex-col overflow-hidden rounded-lg border",
				style.borderSoft,
				style.bgSoft,
				className,
			)}
		>
			<div className="flex flex-wrap items-baseline gap-3 px-5 pt-4 pb-3">
				<span
					className={cn(
						"rounded-full px-3 py-0.5 text-xs font-semibold tracking-wider uppercase",
						style.badgeBg,
						style.text,
					)}
				>
					{chip}
				</span>
				{eyebrow ? (
					<span className="text-xs font-semibold tracking-wider text-stone-500 uppercase">
						{eyebrow}
					</span>
				) : null}
			</div>
			<div className={cn("flex-1 border-t", style.borderSoft)}>{children}</div>
		</div>
	);
};
