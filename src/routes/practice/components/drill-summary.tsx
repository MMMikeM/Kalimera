import { RotateCcw, XCircle } from "lucide-react";
import type React from "react";
import { Link } from "react-router";

import { Card } from "@/components/Card";
import { MonoText } from "@/components/MonoText";
import { Button } from "@/components/ui/button";
import { greekToPhonetic } from "@/lib/greek-transliteration";

import type { SessionStats, UnifiedQuestion } from "./unified-drill";

interface DrillSummaryProps {
	stats: SessionStats;
	onRestart: () => void;
	userId?: number | null;
	sessionCount?: number;
	streakDays?: number;
	onDrillMistakes?: (questions: UnifiedQuestion[]) => void;
}

const DrillSummary: React.FC<DrillSummaryProps> = ({ stats, onRestart, onDrillMistakes }) => {
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
					userAnswer: attempt.userAnswer,
					count: 0,
				};
			}
			acc[key].userAnswer = attempt.userAnswer; // keep most recent wrong answer
			acc[key].count++;
			return acc;
		},
		{} as Record<
			string,
			{
				prompt: string;
				correctGreek: string;
				userAnswer: string;
				count: number;
			}
		>,
	);

	const sortedMissed = Object.values(missedByQuestion).sort((a, b) => b.count - a.count);

	return (
		<Card variant="bordered" padding="lg" className="bg-stone-50">
			<div className="py-6">
				<h2 className="mb-6 font-serif text-2xl text-navy-text">Done</h2>

				<div className="mb-6 text-center">
					<p className="font-serif text-4xl text-foreground tabular-nums">
						{stats.correct} <span className="text-stone-300">/</span> {stats.total}
					</p>
					<p className="mt-1 text-sm text-muted-foreground">
						{percentage}% correct · {avgTime}s avg
					</p>
				</div>

				{sortedMissed.length > 0 && (
					<>
						<p className="mb-4 text-center text-sm text-stone-600 italic">
							These caught you — that's where lasting learning happens.
						</p>
						<div className="mb-6">
							<h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-stone-700">
								<XCircle size={16} className="text-incorrect" />
								Items to Review ({sortedMissed.length})
							</h4>
							<div className="max-h-48 space-y-2 overflow-y-auto">
								{sortedMissed.slice(0, 5).map((item) => (
									<div
										key={item.correctGreek}
										className="flex items-center justify-between rounded-lg border bg-white p-3 text-sm"
									>
										<div className="min-w-0 flex-1 space-y-0.5">
											<p className="truncate text-xs text-stone-600">{item.prompt}</p>
											{item.userAnswer && (
												<div className="flex items-center gap-2">
													<span className="w-16 shrink-0 text-xs text-stone-400">you typed</span>
													<MonoText className="text-xs text-incorrect line-through">
														{item.userAnswer}
													</MonoText>
												</div>
											)}
											<div className="flex items-center gap-2">
												<span className="w-16 shrink-0 text-xs text-stone-400">correct</span>
												<MonoText className="font-medium text-stone-900">
													{item.correctGreek}
												</MonoText>
												<span className="font-mono text-xs text-stone-400">
													/{greekToPhonetic(item.correctGreek)}/
												</span>
											</div>
										</div>
										{item.count > 1 && (
											<span className="bg-incorrect-100 ml-2 rounded-full px-2 py-0.5 text-xs text-incorrect">
												{item.count}x
											</span>
										)}
									</div>
								))}
								{sortedMissed.length > 5 && (
									<p className="py-1 text-center text-xs text-stone-400">
										+{sortedMissed.length - 5} more items
									</p>
								)}
							</div>
							<p className="mt-3 text-center text-xs text-stone-500 italic">
								These items will appear more often in future sessions
							</p>
						</div>
					</>
				)}

				{sortedMissed.length === 0 && (
					<div className="mb-6 rounded-lg bg-stone-100 py-3 text-center">
						<p className="text-sm text-stone-600">No items to review</p>
					</div>
				)}

				<div className="mb-6 text-center">
					{onDrillMistakes && missedAttempts.length > 0 && (
						<Button
							variant="outline"
							onClick={() => {
								const seen = new Set<string>();
								const missedQuestions: UnifiedQuestion[] = stats.attempts
									.filter((a) => !a.isCorrect)
									.filter((a) => {
										if (seen.has(a.questionId)) return false;
										seen.add(a.questionId);
										return true;
									})
									.map((a) => ({
										id: a.questionId,
										prompt: a.prompt,
										correctGreek: a.correctGreek,
										timeLimit: 5000,
									}));
								onDrillMistakes(missedQuestions);
							}}
							className="mb-3 w-full gap-2"
						>
							<RotateCcw size={16} />
							Drill mistakes ({sortedMissed.length})
						</Button>
					)}
					<Button onClick={onRestart} className="gap-2">
						<RotateCcw size={16} />
						Practice Again
					</Button>
				</div>

				<div className="text-center">
					<Link to=".." className="text-xs text-stone-500 underline hover:text-stone-700">
						← back
					</Link>
				</div>
			</div>
		</Card>
	);
};

export default DrillSummary;
