import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

/**
 * MonoText - Styled text for Greek vocabulary and grammar
 *
 * Uses semantic colors from the design system:
 * - Gender colors are subtle accents (per guidelines: never for body text)
 * - Case colors use AAA-compliant text variants
 * - Greek text renders at 1.1x size for visual balance
 */
export const monoTextVariants = tv({
	base: "font-mono leading-relaxed tracking-wide",
	variants: {
		variant: {
			// Base variants
			default: "text-stone-900",
			muted: "text-stone-600",

			// Semantic variants (AAA compliant text colors)
			primary: "font-semibold text-terracotta-text",
			secondary: "font-medium text-ocean-text",
			success: "font-medium text-[var(--color-correct)]",
			warning: "font-medium text-honey-text",
			error: "font-medium text-[var(--color-incorrect)]",

			// Gender variants - using semantic colors (AAA compliant)
			masculine: "font-semibold text-[var(--color-gender-masculine)]",
			feminine: "font-semibold text-[var(--color-gender-feminine)]",
			neuter: "font-semibold text-[var(--color-gender-neuter)]",

			// Case variants - using AAA compliant text colors
			nominative: "font-semibold text-ocean-text",
			accusative: "font-semibold text-terracotta-text",
			genitive: "font-semibold text-olive-text",
			vocative: "font-semibold text-honey-text",

			// Highlighted Greek text - warm tint instead of blue/indigo
			// Includes greek-text class for proper 1.1x scaling
			highlighted:
				"greek-text rounded border border-stone-200 bg-white px-2 py-1 font-semibold text-stone-800",

			// Greek text with terracotta accent
			greek: "greek-text font-semibold text-terracotta-text",
		},
		size: {
			xs: "text-xs",
			sm: "text-sm",
			md: "text-base",
			lg: "text-lg font-medium",
			xl: "text-xl font-medium",
			"2xl": "text-2xl font-semibold",
		},
		weight: {
			normal: "font-normal",
			medium: "font-medium",
			semibold: "font-semibold",
			bold: "font-bold",
		},
	},
	compoundVariants: [
		{
			variant: ["masculine", "feminine", "neuter"],
			size: "lg",
			class: "text-xl",
		},
		{
			variant: "highlighted",
			size: ["lg", "xl"],
			class: "px-3 py-1.5",
		},
		// Highlighted variant should also scale Greek text
		{
			variant: "highlighted",
			size: "md",
			class: "text-[1.1rem]",
		},
		// Greek text should be slightly larger for visual balance
		{
			variant: "greek",
			size: "md",
			class: "text-[1.1rem]",
		},
		{
			variant: "greek",
			size: "lg",
			class: "text-[1.25rem]",
		},
	],
	defaultVariants: {
		variant: "default",
		size: "md",
		weight: "normal",
	},
});

export interface MonoTextProps extends React.HTMLAttributes<HTMLSpanElement> {
	variant?:
		| "default"
		| "muted"
		| "primary"
		| "secondary"
		| "success"
		| "warning"
		| "error"
		| "masculine"
		| "feminine"
		| "neuter"
		| "nominative"
		| "accusative"
		| "genitive"
		| "vocative"
		| "highlighted"
		| "greek";
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
	weight?: "normal" | "medium" | "semibold" | "bold";
	children: ReactNode;
}

export const MonoText: React.FC<MonoTextProps> = ({
	variant,
	size,
	weight,
	className,
	children,
	...props
}) => {
	return (
		<span className={monoTextVariants({ variant, size, weight, className })} {...props}>
			{children}
		</span>
	);
};
