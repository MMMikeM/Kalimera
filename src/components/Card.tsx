import type { ReactNode } from "react";
import { Card as ShadCard, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const variantStyles = {
	default: "",
	bordered: "border-2 border-gray-300 shadow-none",
	shadow: "shadow-lg border-0",
	elevated: "shadow-md border-gray-100",
};

const paddingStyles = {
	none: "py-0 [&>[data-slot=card-content]]:px-0",
	sm: "py-2 [&>[data-slot=card-content]]:px-3",
	md: "py-4 [&>[data-slot=card-content]]:px-4",
	lg: "py-6 [&>[data-slot=card-content]]:px-6",
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
	<ShadCard
		className={cn(
			"gap-0",
			variantStyles[variant],
			paddingStyles[padding],
			hover && "hover:bg-gray-50 transition-colors cursor-pointer",
			className
		)}
		{...props}
	>
		<CardContent>{children}</CardContent>
	</ShadCard>
);
