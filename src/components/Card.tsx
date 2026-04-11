import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const variantStyles = {
	default: "",
	bordered: "border-2 border-stone-300 shadow-none",
	shadow: "shadow-lg border-0",
	elevated: "shadow-md border-stone-100",
};

const paddingStyles = {
	none: "p-0",
	sm: "px-3 py-2",
	md: "px-4 py-4",
	lg: "px-6 py-6",
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "bordered" | "shadow" | "elevated";
	padding?: "none" | "sm" | "md" | "lg";
	hover?: boolean;
	children: ReactNode;
}

export const Card = ({
	variant = "default",
	padding = "md",
	hover = false,
	className,
	children,
	...props
}: CardProps) => (
	<div
		className={cn(
			"rounded-xl border bg-card text-card-foreground shadow-sm",
			variantStyles[variant],
			paddingStyles[padding],
			hover && "hover:bg-stone-50 transition-colors cursor-pointer",
			className,
		)}
		{...props}
	>
		{children}
	</div>
);
