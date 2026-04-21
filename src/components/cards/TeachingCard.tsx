import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

import { Card } from "@/components/Card";
import { type GrammarScheme, SCHEME } from "@/constants/grammar-palette";
import { cn } from "@/lib/utils";

const teachingCard = tv({
	slots: {
		eyebrow: "mb-2 text-xs font-semibold tracking-[0.18em] uppercase",
		titleRow: "flex flex-wrap items-baseline gap-x-3 gap-y-1",
		title: "font-serif text-3xl leading-none",
		badge: "rounded-full px-2.5 py-1 text-xs font-semibold",
		description: "mt-2 text-sm leading-relaxed text-stone-700",
		content: "mt-auto pt-6",
		footer: "mt-4 border-t border-stone-200/60 pt-4",
	},
});

interface TeachingCardProps {
	scheme: GrammarScheme;
	eyebrow?: string;
	title: ReactNode;
	badge?: ReactNode;
	description?: string;
	footer?: ReactNode;
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
	className,
	children,
}: TeachingCardProps) => {
	const style = SCHEME[scheme];
	const { eyebrow: eyebrowSlot, titleRow, title: titleSlot, badge: badgeSlot, description: descSlot, content, footer: footerSlot } = teachingCard();

	return (
		<Card
			variant="bordered"
			padding="lg"
			className={cn("flex h-full flex-col border-2", style.bg, style.border, className)}
		>
			{eyebrow ? (
				<div className={eyebrowSlot({ class: style.text })}>{eyebrow}</div>
			) : null}

			<div className={titleRow()}>
				<h3 className={titleSlot({ class: style.text })}>{title}</h3>
				{badge ? (
					<span className={badgeSlot({ class: cn(style.badgeBg, style.text) })}>{badge}</span>
				) : null}
			</div>

			{description ? <p className={descSlot()}>{description}</p> : null}

			{children ? <div className={content()}>{children}</div> : null}

			{footer ? <div className={footerSlot()}>{footer}</div> : null}
		</Card>
	);
};
