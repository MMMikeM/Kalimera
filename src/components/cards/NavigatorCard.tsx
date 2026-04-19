import type { ReactNode } from "react";

import { Card } from "@/components/Card";
import { cn } from "@/lib/utils";

export interface NavigatorCardProps {
	title: string;
	subtitle?: ReactNode;
	layout?: "grid" | "stack";
	footer?: ReactNode;
	className?: string;
	children: ReactNode;
}

export const NavigatorCard = ({
	title,
	subtitle,
	layout = "stack",
	footer,
	className,
	children,
}: NavigatorCardProps) => (
	<Card
		variant="bordered"
		padding="lg"
		className={cn("border-honey-300 bg-honey-50", className)}
	>
		<h3 className="mb-2 text-lg font-bold text-honey-text">{title}</h3>
		{subtitle ? <p className="mb-4 text-sm text-stone-600">{subtitle}</p> : null}

		<div
			className={cn(
				layout === "grid" ? "grid gap-3 sm:grid-cols-2" : "space-y-3",
			)}
		>
			{children}
		</div>

		{footer ? (
			<div className="mt-4 border-t border-honey-300 pt-3 text-sm text-honey-text">{footer}</div>
		) : null}
	</Card>
);

export interface NavigatorCellProps {
	className?: string;
	children: ReactNode;
}

export const NavigatorCell = ({ className, children }: NavigatorCellProps) => (
	<div
		className={cn(
			"rounded-lg border border-honey-300 bg-white p-3",
			className,
		)}
	>
		{children}
	</div>
);
