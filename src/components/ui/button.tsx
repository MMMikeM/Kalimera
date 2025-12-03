import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

export const buttonVariants = tv({
	base: "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transform hover:-translate-y-0.5",
	variants: {
		variant: {
			primary:
				"bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-blue-200",
			secondary:
				"bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200 hover:border-gray-300 shadow-gray-100",
			outline:
				"border-2 border-gray-300 bg-white/50 text-gray-700 hover:bg-gray-50 hover:border-gray-400",
			ghost: "text-gray-700 hover:bg-white/60 backdrop-blur-sm",
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
				"bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-lg shadow-blue-200/50 hover:from-blue-700 hover:to-indigo-700",
		},
		{
			variant: "primary",
			active: true,
			class: "shadow-lg shadow-blue-300/50",
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
