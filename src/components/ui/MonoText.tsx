import { tv } from "tailwind-variants";
import type { ReactNode } from "react";

export const monoTextVariants = tv({
	base: "font-mono",
	variants: {
		variant: {
			default: "text-gray-900",
			primary: "text-blue-600",
			secondary: "text-purple-600",
			success: "text-green-600",
			warning: "text-yellow-600",
			error: "text-red-600",
			masculine: "text-blue-600",
			feminine: "text-pink-600",
			neuter: "text-green-600",
		},
		size: {
			xs: "text-xs",
			sm: "text-sm",
			md: "text-base",
			lg: "text-lg",
			xl: "text-xl",
		},
		weight: {
			normal: "font-normal",
			medium: "font-medium",
			semibold: "font-semibold",
			bold: "font-bold",
		},
	},
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
		| "neuter";
	size?: "xs" | "sm" | "md" | "lg" | "xl";
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
