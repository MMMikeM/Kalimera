import type React from "react";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { Card, MonoText } from "@/components";
import { Button } from "@/components/ui/button";
import { greekToPhonetic } from "@/lib/greek-transliteration";
import type { SessionStats } from "./unified-drill";

interface DrillSummaryProps {
	stats: SessionStats;
	onRestart: () => void;
}

const DrillSummary: React.FC<DrillSummaryProps> = ({ stats, onRestart }) => {
	const percentage = Math.round((stats.correct / stats.total) * 100);
	const avgTime = (stats.avgResponseTime / 1000).toFixed(1);

	const missedAttempts = stats.attempts.filter((a) => !a.isCorrect);

	const missedByQuestion = missedAttempts.reduce(
		(acc, attempt) => {
			const key = attempt.questionId;
			if (!acc[key]) {
				acc[key] = {
					prompt: attempt.prompt,
					correctGreek: attempt.correctGreek,
					count: 0,
				};
			}
			acc[key].count++;
			return acc;
		},
		{} as Record<string, { prompt: string; correctGreek: string; count: number }>
	);

	const sortedMissed = Object.values(missedByQuestion).sort(
		(a, b) => b.count - a.count
	);

	return (
		<Card variant="bordered" padding="lg" className="bg-stone-50">
			<div className="py-6">
				<div className="text-center mb-6">
					<h3 className="text-2xl font-bold mb-2">
						{stats.correct} / {stats.total} correct
					</h3>

					<div className="flex justify-center gap-6 text-sm text-stone-600">
						<div>
							<span className="font-semibold">{percentage}%</span> accuracy
						</div>
						<div>
							<span className="font-semibold">{avgTime}s</span> avg
						</div>
					</div>
				</div>

				{sortedMissed.length > 0 && (
					<div className="mb-6">
						<h4 className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-2">
							<XCircle size={16} className="text-incorrect" />
							Items to Review ({sortedMissed.length})
						</h4>
						<div className="space-y-2 max-h-48 overflow-y-auto">
							{sortedMissed.slice(0, 5).map((item) => (
								<div
									key={item.correctGreek}
									className="flex items-center justify-between bg-white p-3 rounded-lg border text-sm"
								>
									<div className="flex-1 min-w-0">
										<p className="text-stone-600 truncate">{item.prompt}</p>
										<div className="flex items-center gap-2">
											<MonoText className="text-stone-900 font-medium">
												{item.correctGreek}
											</MonoText>
											<span className="text-xs text-stone-400 font-mono">
												/{greekToPhonetic(item.correctGreek)}/
											</span>
										</div>
									</div>
									{item.count > 1 && (
										<span className="text-xs bg-incorrect-100 text-incorrect px-2 py-0.5 rounded-full ml-2">
											{item.count}x
										</span>
									)}
								</div>
							))}
							{sortedMissed.length > 5 && (
								<p className="text-xs text-stone-400 text-center py-1">
									+{sortedMissed.length - 5} more items
								</p>
							)}
						</div>
						<p className="text-xs text-stone-500 mt-3 text-center italic">
							These items will appear more often in future sessions
						</p>
					</div>
				)}

				{sortedMissed.length === 0 && (
					<div className="text-center mb-6 py-4 bg-correct-100 rounded-lg">
						<CheckCircle size={32} className="text-correct mx-auto mb-2" />
						<p className="text-correct font-medium">Perfect session!</p>
					</div>
				)}

				<div className="text-center">
					<Button onClick={onRestart} className="gap-2">
						<RotateCcw size={16} />
						Practice Again
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default DrillSummary;
