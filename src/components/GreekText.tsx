import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

/**
 * The single component for rendering Greek script.
 *
 * It exists so that Greek-ness is one decision made in one place: the `lang`
 * attribute, the font, and the optical sizing. It replaced two unrelated
 * conventions — raw `<span lang="el">` markup and a `MonoText` component whose
 * `variant` enum fused "is this Greek" with "what colour does it carry", which
 * is why gender- and case-coloured Greek used to render with no `lang` at all.
 *
 * It never styles stress. The tonos already marks the stressed syllable, and
 * marking it twice spends salience for no added information. Stress belongs to
 * the pronunciation gloss, where it would otherwise be lost — see
 * `Pronunciation`.
 */
const greekTextVariants = tv({
	base: "greek-text",
	variants: {
		size: {
			xs: "text-xs",
			sm: "text-sm",
			base: "text-base",
			lg: "text-lg",
			xl: "text-xl",
			"2xl": "text-2xl",
			"3xl": "text-3xl",
			"4xl": "text-4xl",
			"5xl": "text-5xl leading-none",
			"8xl": "text-8xl leading-none",
		},
		tone: {
			default: "text-foreground",
			muted: "text-muted-foreground",
			accent: "text-terracotta-text",
			correct: "text-correct",
			incorrect: "text-incorrect",
			// Gender is a global grammar axis, so it gets reserved role tokens
			// rather than a colour chosen per call site. Named here because
			// Tailwind cannot see a class built as `text-gender-${g}`.
			masculine: "font-semibold text-gender-masculine",
			feminine: "font-semibold text-gender-feminine",
			neuter: "font-semibold text-gender-neuter",
			// Case is the other global axis. Ocean = doer, terracotta = target,
			// olive = owner, honey = address.
			nominative: "font-semibold text-ocean-text",
			accusative: "font-semibold text-terracotta-text",
			genitive: "font-semibold text-olive-text",
			vocative: "font-semibold text-honey-text",
			// For call sites that carry their own colour in `className`
			inherit: "",
		},
		weight: {
			normal: "font-normal",
			medium: "font-medium",
			semibold: "font-semibold",
			bold: "font-bold",
		},
	},
	defaultVariants: {
		size: "base",
		tone: "default",
		weight: "normal",
	},
});

type GreekElement = "span" | "p" | "td" | "th" | "div";

interface GreekTextProps extends React.HTMLAttributes<HTMLElement> {
	as?: GreekElement;
	size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "8xl";
	tone?:
		| "default"
		| "muted"
		| "accent"
		| "correct"
		| "incorrect"
		| "masculine"
		| "feminine"
		| "neuter"
		| "nominative"
		| "accusative"
		| "genitive"
		| "vocative"
		| "inherit";
	weight?: "normal" | "medium" | "semibold" | "bold";
	children: ReactNode;
}

export const GreekText: React.FC<GreekTextProps> = ({
	as: Component = "span",
	size,
	tone,
	weight,
	className,
	children,
	...props
}) => (
	<Component lang="el" className={greekTextVariants({ size, tone, weight, className })} {...props}>
		{children}
	</Component>
);
