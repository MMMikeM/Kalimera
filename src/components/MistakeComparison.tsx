import { AlertCircle, CheckCircle } from "lucide-react";
import { Card } from "./Card";
import { MonoText } from "./MonoText";

export interface Mistake {
	wrong: string;
	correct: string;
	explanation: string;
}

export interface MistakeComparisonProps {
	mistakes: Mistake[];
	title?: string;
	layout?: "grid" | "list";
}

export const MistakeComparison = ({
	mistakes,
	title = "Common Mistakes",
	layout = "list",
}: MistakeComparisonProps) => (
	<div className="space-y-4">
		{title && <h3 className="text-lg font-bold text-navy-text">{title}</h3>}

		<div
			className={layout === "grid" ? "grid md:grid-cols-2 gap-3" : "space-y-3"}
		>
			{mistakes.map((mistake) => (
				<Card
					key={mistake.wrong}
					variant="bordered"
					padding="sm"
					className="bg-white"
				>
					<div className="flex items-start gap-2 mb-1">
						<span className="text-xs font-semibold text-incorrect uppercase tracking-wide w-16 shrink-0">
							Wrong:
						</span>
						<AlertCircle
							className="text-incorrect mt-0.5 shrink-0"
							size={14}
							aria-hidden="true"
						/>
						<MonoText variant="error" size="sm" className="line-through">
							{mistake.wrong}
						</MonoText>
					</div>
					<div className="flex items-start gap-2 mb-2">
						<span className="text-xs font-semibold text-correct uppercase tracking-wide w-16 shrink-0">
							Correct:
						</span>
						<CheckCircle
							className="text-correct mt-0.5 shrink-0"
							size={14}
							aria-hidden="true"
						/>
						<MonoText variant="success" size="sm">
							{mistake.correct}
						</MonoText>
					</div>
					<div className="text-xs text-stone-600 pl-18">
						{mistake.explanation}
					</div>
				</Card>
			))}
		</div>
	</div>
);
