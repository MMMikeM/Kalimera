import type { ReactNode } from "react";

import { Card } from "@/components/Card";
import { type GrammarScheme, SCHEME } from "@/constants/grammar-palette";
import { cn } from "@/lib/utils";

interface TeachingCardProps {
	scheme: GrammarScheme;
	eyebrow?: string;
	title: ReactNode;
	badge?: ReactNode;
	description?: string;
	footer?: ReactNode;
	tone?: "full" | "soft";
	/**
	 * "pushed" (default): children glued to card bottom — grid-aligns a row of cards.
	 * "tight": children sit directly under title/description — use when the child IS
	 * the concrete anchor paired with the handle (e.g. a role card's Greek example).
	 */
	contentLayout?: "pushed" | "tight";
	className?: string;
	children?: ReactNode;
}

export const TeachingCard = ({
	scheme,
	eyebrow,
	title,
	badge,
	description,
	footer,
	tone = "full",
	contentLayout = "pushed",
	className,
	children,
}: TeachingCardProps) => {
	const style = SCHEME[scheme];
	const surface = tone === "full" ? style.bg : style.bgSoft;
	const border = tone === "full" ? style.border : style.borderSoft;

	return (
		<Card
			variant="bordered"
			padding="lg"
			className={cn(surface, border, "flex h-full flex-col border-2", className)}
		>
			{eyebrow ? (
				<div
					className={cn(
						"mb-2 text-xs font-semibold tracking-[0.18em] uppercase",
						style.text,
					)}
				>
					{eyebrow}
				</div>
			) : null}

			<div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
				<h3 className={cn("font-serif text-3xl leading-none", style.text)}>{title}</h3>
				{badge ? (
					<span
						className={cn(
							"rounded-full px-2.5 py-1 text-xs font-semibold",
							style.badgeBg,
							style.text,
						)}
					>
						{badge}
					</span>
				) : null}
			</div>

			{description ? (
				<p className="mt-2 text-sm leading-relaxed text-stone-700">{description}</p>
			) : null}

			{children ? (
				<div className={contentLayout === "tight" ? "mt-3" : "mt-auto pt-6"}>{children}</div>
			) : null}

			{footer ? <div className="mt-4 border-t border-stone-200/60 pt-4">{footer}</div> : null}
		</Card>
	);
};
