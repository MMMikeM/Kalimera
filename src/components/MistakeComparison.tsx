import { AlertCircle, CheckCircle } from "lucide-react";

import { GreekText } from "@/components/GreekText";

import { Card } from "./Card";

interface Mistake {
	wrong: string;
	correct: string;
	explanation: string;
}

interface MistakeComparisonProps {
	mistakes: Mistake[];
	cardClassName?: string;
}

export const MistakeComparison = ({ mistakes, cardClassName }: MistakeComparisonProps) => (
	<div className="space-y-3">
		{mistakes.map((mistake) => (
			<Card
				key={mistake.wrong}
				variant="bordered"
				padding="sm"
				className={cardClassName ?? "bg-cream-dark"}
			>
				<div className="mb-1 flex items-start gap-2">
					<span className="w-16 shrink-0 text-xs font-semibold tracking-wide text-incorrect uppercase">
						Wrong:
					</span>
					<AlertCircle className="mt-0.5 shrink-0 text-incorrect" size={14} aria-hidden="true" />
					<GreekText tone="incorrect" size="sm" className="font-medium line-through">
						{mistake.wrong}
					</GreekText>
				</div>
				<div className="mb-2 flex items-start gap-2">
					<span className="w-16 shrink-0 text-xs font-semibold tracking-wide text-correct uppercase">
						Correct:
					</span>
					<CheckCircle className="mt-0.5 shrink-0 text-correct" size={14} aria-hidden="true" />
					<GreekText tone="correct" size="sm" className="font-medium">
						{mistake.correct}
					</GreekText>
				</div>
				<div className="pl-18 text-xs text-stone-600">{mistake.explanation}</div>
			</Card>
		))}
	</div>
);
