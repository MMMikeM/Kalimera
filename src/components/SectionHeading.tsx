import { tv } from "tailwind-variants";

const sectionHeadingVariants = tv({
	slots: {
		container: "",
		title: "font-bold text-navy-text",
		subtitle: "mt-1 text-slate-text",
	},
	variants: {
		level: {
			h2: { title: "font-serif text-2xl" },
			h3: { title: "text-xl" },
			h4: { title: "text-lg" },
		},
	},
	defaultVariants: {
		level: "h2",
	},
});

interface SectionHeadingProps {
	title: string;
	subtitle?: string;
	level?: "h2" | "h3" | "h4";
	className?: string;
}

export const SectionHeading = ({
	title,
	subtitle,
	level = "h2",
	className,
}: SectionHeadingProps) => {
	const Tag = level;
	const styles = sectionHeadingVariants({ level });

	return (
		<div className={styles.container({ className })}>
			<Tag className={styles.title()}>{title}</Tag>
			{subtitle && <p className={styles.subtitle()}>{subtitle}</p>}
		</div>
	);
};
