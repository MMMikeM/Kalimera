import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

export const buttonVariants = tv({
	base: "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transform hover:-translate-y-0.5",
	variants: {
		variant: {
			primary:
				"bg-terracotta text-white hover:bg-terracotta-600 shadow-terracotta-200",
			secondary:
				"bg-white/80 backdrop-blur-sm text-stone-700 hover:bg-white border border-stone-200 hover:border-stone-300 shadow-stone-100",
			outline:
				"border-2 border-stone-300 bg-white/50 text-stone-700 hover:bg-stone-50 hover:border-stone-400",
			ghost: "text-stone-700 hover:bg-white/60 backdrop-blur-sm",
		},
		size: {
			sm: "px-3 py-1.5 text-sm",
			md: "px-4 py-2 text-base",
			lg: "px-6 py-3 text-lg",
		},
		active: {
			true: "",
			false: "",
		},
	},
	compoundVariants: [
		{
			variant: "secondary",
			active: true,
			class:
				"bg-terracotta text-white border-terracotta shadow-lg shadow-terracotta-300 hover:bg-terracotta-600",
		},
		{
			variant: "primary",
			active: true,
			class: "shadow-lg shadow-terracotta-300",
		},
	],
	defaultVariants: {
		variant: "secondary",
		size: "md",
		active: false,
	},
});

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "outline" | "ghost";
	size?: "sm" | "md" | "lg";
	active?: boolean;
	children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
	variant,
	size,
	active,
	className,
	children,
	...props
}) => {
	return (
		<button
			className={buttonVariants({ variant, size, active, className })}
			{...props}
		>
			{children}
		</button>
	);
};
