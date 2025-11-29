import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

export const monoTextVariants = tv({
	base: "font-mono tracking-wide leading-relaxed",
	variants: {
		variant: {
			default: "text-gray-900",
			primary: "text-blue-600 font-semibold",
			secondary: "text-purple-600 font-medium",
			success: "text-green-600 font-medium",
			warning: "text-yellow-700 font-medium",
			error: "text-red-600 font-medium",
			masculine: "text-blue-600 font-semibold",
			feminine: "text-pink-600 font-semibold",
			neuter: "text-green-600 font-semibold",
			highlighted:
				"bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-2 py-1 rounded font-semibold",
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
		| "primary"
		| "secondary"
		| "success"
		| "warning"
		| "error"
		| "masculine"
		| "feminine"
		| "neuter"
		| "highlighted";
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
		<span
			className={monoTextVariants({ variant, size, weight, className })}
			{...props}
		>
			{children}
		</span>
	);
};
