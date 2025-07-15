import { tv } from "tailwind-variants";
import type { ReactNode } from "react";

export const badgeVariants = tv({
	base: "inline-flex items-center rounded font-medium",
	variants: {
		variant: {
			default: "bg-gray-200 text-gray-800",
			primary: "bg-blue-200 text-blue-800",
			secondary: "bg-purple-200 text-purple-800",
			success: "bg-green-200 text-green-800",
			warning: "bg-yellow-200 text-yellow-800",
			error: "bg-red-200 text-red-800",
			outline: "border border-gray-300 bg-white text-gray-700",
		},
		size: {
			xs: "px-1.5 py-0.5 text-xs",
			sm: "px-2 py-1 text-xs",
			md: "px-2.5 py-1.5 text-sm",
			lg: "px-3 py-2 text-base",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "xs",
	},
});

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
	variant?:
		| "default"
		| "primary"
		| "secondary"
		| "success"
		| "warning"
		| "error"
		| "outline";
	size?: "xs" | "sm" | "md" | "lg";
	children: ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
	variant,
	size,
	className,
	children,
	...props
}) => {
	return (
		<span className={badgeVariants({ variant, size, className })} {...props}>
			{children}
		</span>
	);
};
