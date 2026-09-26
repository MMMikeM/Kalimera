import type React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const bandHeading = tv({
	slots: {
		root: "space-y-1",
		kicker: "text-xs font-semibold tracking-widest uppercase",
		heading: "font-serif text-stone-900",
		lede: "text-sm",
	},
	variants: {
		size: {
			lg: { heading: "text-2xl" },
			md: { heading: "text-xl" },
		},
		/** `quiet` is the lighter sub-section heading used inside a band. */
		tone: {
			default: { kicker: "text-stone-500", lede: "max-w-2xl text-stone-600" },
			quiet: { kicker: "text-stone-400", lede: "text-stone-500" },
		},
	},
	defaultVariants: { size: "lg", tone: "default" },
});

type BandHeadingProps = VariantProps<typeof bandHeading> & {
	kicker: string;
	title: string;
	lede?: React.ReactNode;
	as?: "h3" | "h4";
	className?: string;
};

export const BandHeading: React.FC<BandHeadingProps> = ({
	kicker,
	title,
	lede,
	as: Heading = "h3",
	size,
	tone,
	className,
}) => {
	const styles = bandHeading({ size, tone });
	return (
		<div className={styles.root({ class: className })}>
			<div className={styles.kicker()}>{kicker}</div>
			<Heading className={styles.heading()}>{title}</Heading>
			{lede ? <p className={styles.lede()}>{lede}</p> : null}
		</div>
	);
};
