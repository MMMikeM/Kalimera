import type { ReactNode } from "react";
import { Lightbulb } from "lucide-react";
import { Card } from "./Card";

export interface KeyInsightProps {
	title: string;
	children: ReactNode;
	icon?: ReactNode;
	expandedExample?: {
		label: string;
		content: ReactNode;
	};
}

export const KeyInsight = ({
	title,
	children,
	icon = <Lightbulb size={18} />,
	expandedExample,
}: KeyInsightProps) => (
	<Card
		variant="elevated"
		padding="lg"
		className="bg-santorini/10 border-2 border-santorini/40"
	>
		<div className="flex items-start gap-3">
			<div className="p-2.5 rounded-xl bg-santorini/25 shrink-0 shadow-sm">
				<span className="text-santorini-text">{icon}</span>
			</div>
			<div className="flex-1">
				<h3 className="font-bold text-santorini-text mb-1">{title}</h3>
				<div className="text-slate-text">{children}</div>
				{expandedExample && (
					<div className="mt-3 p-3 bg-white rounded-lg border border-santorini/20">
						<div className="text-sm font-medium text-santorini-text mb-1">
							{expandedExample.label}
						</div>
						{expandedExample.content}
					</div>
				)}
			</div>
		</div>
	</Card>
);
