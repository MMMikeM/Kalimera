import type React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const bandHeading = tv({
	slots: {
		root: "space-y-1",
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
			default: { lede: "max-w-2xl text-stone-600" },
			quiet: { lede: "text-stone-600" },
		},
	},
	defaultVariants: { size: "lg", tone: "default" },
});

type BandHeadingProps = VariantProps<typeof bandHeading> & {
	title: string;
	lede?: React.ReactNode;
	as?: "h2" | "h3";
	className?: string;
};

export const BandHeading: React.FC<BandHeadingProps> = ({
	title,
	lede,
	as: Heading = "h2",
	size,
	tone,
	className,
}) => {
	const styles = bandHeading({ size, tone });
	return (
		<div className={styles.root({ class: className })}>
			<Heading className={styles.heading()}>{title}</Heading>
			{lede ? <p className={styles.lede()}>{lede}</p> : null}
		</div>
	);
};
