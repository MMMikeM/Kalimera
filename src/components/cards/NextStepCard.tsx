import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "tailwind-variants";

import { Card } from "@/components/Card";

interface NextStepCardProps {
	to: string;
	title: string;
	description: string;
	emphasis?: boolean;
	className?: string;
}

export const NextStepCard = ({
	to,
	title,
	description,
	emphasis = false,
	className,
}: NextStepCardProps) => {


	return (
		<Card
			variant="bordered"
			padding="md"
			className={cn(emphasis ? "border-stone-500" : "border-stone-200", className)}
		>
			<Link to={to} className="group flex items-center justify-between gap-3">
				<div>
					<div className="font-semibold text-stone-900">{title}</div>
					<p className="text-sm text-stone-600">{description}</p>
				</div>
				<ArrowRight
					size={emphasis ? 20 : 18}
					className={cn(
						"transition-transform group-hover:translate-x-1",
						emphasis ? "text-stone-900" : "text-stone-500",
					)}
				/>
			</Link>
		</Card>
	);
};
