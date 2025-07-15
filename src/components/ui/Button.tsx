import { tv } from "tailwind-variants";
import type { ReactNode } from "react";

export const buttonVariants = tv({
	base: "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
	variants: {
		variant: {
			primary: "bg-blue-600 text-white hover:bg-blue-700",
			secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
			outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
			ghost: "text-gray-700 hover:bg-gray-100",
		},
		size: {
			sm: "px-3 py-1.5 text-sm",
			md: "px-4 py-2 text-base",
			lg: "px-6 py-3 text-lg",
		},
		active: {
			true: "bg-blue-600 text-white",
			false: "",
		},
	},
	compoundVariants: [
		{
			variant: "secondary",
			active: true,
			class: "bg-blue-600 text-white hover:bg-blue-700",
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
