import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

export const cardVariants = tv({
	base: "rounded-lg",
	variants: {
		variant: {
			default: "bg-white border border-gray-200 shadow-sm",
			bordered: "border border-gray-300",
			shadow: "bg-white shadow-lg",
			elevated: "bg-white shadow-md border border-gray-100",
		},
		padding: {
			none: "",
			sm: "p-3",
			md: "p-4",
			lg: "p-6",
		},
		hover: {
			true: "hover:bg-gray-50 transition-colors",
			false: "",
		},
	},
	defaultVariants: {
		variant: "default",
		padding: "md",
		hover: false,
	},
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "bordered" | "shadow" | "elevated";
	padding?: "none" | "sm" | "md" | "lg";
	hover?: boolean;
	children: ReactNode;
}

export const Card: React.FC<CardProps> = ({
	variant,
	padding,
	hover,
	className,
	children,
	...props
}) => {
	return (
		<div
			className={cardVariants({ variant, padding, hover, className })}
			{...props}
		>
			{children}
		</div>
	);
};
