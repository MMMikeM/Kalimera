import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

export const buttonVariants = tv({
	base: "inline-flex transform items-center justify-center gap-2 rounded-xl font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:ring-2 focus:ring-terracotta-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
	variants: {
		variant: {
			primary:
				"bg-terracotta text-white shadow-terracotta-200 hover:bg-terracotta-600",
			secondary:
				"border border-stone-200 bg-white/80 text-stone-700 shadow-stone-100 backdrop-blur-sm hover:border-stone-300 hover:bg-white",
			outline:
				"border-2 border-stone-300 bg-white/50 text-stone-700 hover:border-stone-400 hover:bg-stone-50",
			ghost: "text-stone-700 backdrop-blur-sm hover:bg-white/60",
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
				"border-terracotta bg-terracotta text-white shadow-lg shadow-terracotta-300 hover:bg-terracotta-600",
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

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
