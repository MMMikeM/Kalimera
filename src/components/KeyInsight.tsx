import type { ReactNode } from "react";
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
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

const styles = {
	bg: "bg-ocean-100",
	border: "border-ocean-400",
	iconBg: "bg-ocean-300",
	iconText: "text-ocean-text",
	titleText: "text-ocean-text",
	expandedBorder: "border-ocean-200",
};

export const KeyInsight = ({
	title,
	children,
	icon = <Lightbulb size={18} />,
	expandedExample,
}: KeyInsightProps) => {

	return (
		<Card
			variant="elevated"
			padding="lg"
			className={cn(styles.bg, "border-2", styles.border)}
		>
			<div className="flex items-start gap-3">
				<div
					className={cn(
						"p-2.5 rounded-xl shrink-0 shadow-sm",
						styles.iconBg
					)}
				>
					<span className={styles.iconText}>{icon}</span>
				</div>
				<div className="flex-1">
					<h3 className={cn("font-bold mb-1", styles.titleText)}>{title}</h3>
					<div className="text-slate-text">{children}</div>
					{expandedExample && (
						<div
							className={cn(
								"mt-3 p-3 bg-white rounded-lg border",
								styles.expandedBorder
							)}
						>
							<div className={cn("text-sm font-medium mb-1", styles.titleText)}>
								{expandedExample.label}
							</div>
							{expandedExample.content}
						</div>
					)}
				</div>
			</div>
		</Card>
	);
};
