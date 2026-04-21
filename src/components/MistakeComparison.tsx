import { AlertCircle, CheckCircle } from "lucide-react";

import { Card } from "./Card";
import { MonoText } from "./MonoText";

interface Mistake {
	wrong: string;
	correct: string;
	explanation: string;
}

interface MistakeComparisonProps {
	mistakes: Mistake[];
	title?: string;
	layout?: "grid" | "list";
	cardClassName?: string;
}

export const MistakeComparison = ({
	mistakes,
	title = "Common Mistakes",
	layout = "list",
	cardClassName,
}: MistakeComparisonProps) => (
	<div className="space-y-4">
		{title && <h3 className="text-lg font-bold text-navy-text">{title}</h3>}

		<div className={layout === "grid" ? "grid gap-3 md:grid-cols-2" : "space-y-3"}>
			{mistakes.map((mistake) => (
				<Card key={mistake.wrong} variant="bordered" padding="sm" className={cardClassName ?? "bg-cream-dark"}>
					<div className="mb-1 flex items-start gap-2">
						<span className="w-16 shrink-0 text-xs font-semibold tracking-wide text-incorrect uppercase">
							Wrong:
						</span>
						<AlertCircle className="mt-0.5 shrink-0 text-incorrect" size={14} aria-hidden="true" />
						<MonoText variant="error" size="sm" className="line-through">
							{mistake.wrong}
						</MonoText>
					</div>
					<div className="mb-2 flex items-start gap-2">
						<span className="w-16 shrink-0 text-xs font-semibold tracking-wide text-correct uppercase">
							Correct:
						</span>
						<CheckCircle className="mt-0.5 shrink-0 text-correct" size={14} aria-hidden="true" />
						<MonoText variant="success" size="sm">
							{mistake.correct}
						</MonoText>
					</div>
					<div className="pl-18 text-xs text-stone-600">{mistake.explanation}</div>
				</Card>
			))}
		</div>
	</div>
);
