import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { Card } from "@/components/Card";
import { cn } from "@/lib/utils";

export interface NextStepCardProps {
	to: string;
	kicker: string;
	title: string;
	description: string;
	emphasis?: boolean;
	className?: string;
}

export const NextStepCard = ({
	to,
	kicker,
	title,
	description,
	emphasis = false,
	className,
}: NextStepCardProps) => {
	const emphasisText = emphasis ? "text-ocean-text" : "text-stone-800";
	const emphasisKicker = emphasis ? "text-ocean-text" : "text-stone-500";

	return (
		<Card
			variant="bordered"
			padding="md"
			className={cn(emphasis ? "border-ocean-300 bg-ocean-50" : "border-stone-200", className)}
		>
			<Link to={to} className="group flex items-center justify-between gap-3">
				<div>
					<div
						className={cn("text-xs font-semibold tracking-wider uppercase", emphasisKicker)}
					>
						{kicker}
					</div>
					<div className={cn("mt-0.5 font-semibold", emphasisText)}>{title}</div>
					<p className="text-sm text-stone-600">{description}</p>
				</div>
				<ArrowRight
					size={emphasis ? 20 : 18}
					className={cn(
						"transition-transform group-hover:translate-x-1",
						emphasis ? "text-ocean-text" : "text-stone-500",
					)}
				/>
			</Link>
		</Card>
	);
};
