import { CheckCircle, Flame, RotateCcw, Sparkles, Trophy, XCircle } from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import { Card } from "@/components/Card";
import { MonoText } from "@/components/MonoText";
import { NotificationAsk } from "@/components/NotificationAsk";
import { Button } from "@/components/ui/button";
import { greekToPhonetic } from "@/lib/greek-transliteration";
import type { SessionStats, UnifiedQuestion } from "./unified-drill";

const ENCOURAGEMENT_MESSAGES = [
	{
		threshold: 100,
		messages: ["Flawless!", "Perfect score!", "You're on fire!"],
	},
	{
		threshold: 80,
		messages: ["Great session!", "Solid performance!", "Keep it up!"],
	},
	{
		threshold: 60,
		messages: ["Good effort!", "Making progress!", "Every session counts!"],
	},
	{
		threshold: 0,
		messages: [
			"Practice makes progress!",
			"You showed up - that's what matters!",
			"Keep building the habit!",
		],
	},
];

const getEncouragementMessage = (
	percentage: number,
): { message: string; icon: React.ReactNode } => {
	const tier =
		ENCOURAGEMENT_MESSAGES.find((t) => percentage >= t.threshold) ?? ENCOURAGEMENT_MESSAGES[3];
	const message =
		tier?.messages[Math.floor(Math.random() * (tier?.messages.length ?? 1))] ?? "Nice work!";

	if (percentage === 100) return { message, icon: <Trophy className="h-6 w-6 text-honey" /> };
	if (percentage >= 80) return { message, icon: <Flame className="h-6 w-6 text-terracotta" /> };
	return { message, icon: <Sparkles className="h-6 w-6 text-ocean" /> };
};

interface DrillSummaryProps {
	stats: SessionStats;
	onRestart: () => void;
	userId?: number | null;
	sessionCount?: number;
	streakDays?: number;
	onDrillMistakes?: (questions: UnifiedQuestion[]) => void;
}

const DrillSummary: React.FC<DrillSummaryProps> = ({
	stats,
	onRestart,
	userId,
	sessionCount,
	streakDays,
	onDrillMistakes,
}) => {
	const percentage = Math.round((stats.correct / stats.total) * 100);
	const avgTime = (stats.avgResponseTime / 1000).toFixed(1);
	const { message: encouragement, icon: encouragementIcon } = useMemo(
		() => getEncouragementMessage(percentage),
		[percentage],
	);

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
				{/* Encouragement header */}
				<div className="mb-4 flex items-center justify-center gap-2">
					{encouragementIcon}
					<span className="text-lg font-semibold text-stone-800">{encouragement}</span>
				</div>

				<div className="mb-6 text-center">
					<h3 className="mb-2 text-2xl font-bold">
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
				)}

				{sortedMissed.length === 0 && (
					<div className="bg-correct-100 mb-6 rounded-lg py-4 text-center">
						<CheckCircle size={32} className="mx-auto mb-2 text-correct" />
						<p className="font-medium text-correct">Perfect session!</p>
					</div>
				)}

				{userId && (
					<div className="mb-6">
						<NotificationAsk userId={userId} sessionCount={sessionCount} streakDays={streakDays} />
					</div>
				)}

				<div className="text-center">
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
					<p className="mt-4 text-xs text-stone-400">
						Consistency beats intensity. Small daily practice builds real fluency.
					</p>
				</div>
			</div>
		</Card>
	);
};

export default DrillSummary;
