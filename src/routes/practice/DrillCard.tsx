import type React from "react";
import { useReducer, useMemo, useEffect, useRef } from "react";
import { CheckCircle, XCircle, RotateCcw, ChevronRight } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Card, MonoText } from "../../components";
import { Button } from "@/components/ui/button";
import {
	type Question,
	initialDrillState,
	drillReducer,
	shuffleArray,
} from "./types";

export interface AttemptResult {
	questionId: string;
	questionText: string;
	correctAnswer: string;
	userAnswer: string;
	isCorrect: boolean;
	timeTaken: number; // milliseconds
}

interface DrillCardProps {
	title: string;
	description: string;
	questions: Question[];
	colorClass: string;
	bgClass: string;
	onAttempt?: (result: AttemptResult) => void;
	onComplete?: (score: { correct: number; total: number }) => void;
}

const DrillCard: React.FC<DrillCardProps> = ({
	title,
	description,
	questions,
	colorClass,
	bgClass,
	onAttempt,
	onComplete,
}) => {
	const shuffledQuestions = useMemo(() => shuffleArray(questions), [questions]);
	const [state, dispatch] = useReducer(drillReducer, shuffledQuestions, initialDrillState);
	const questionStartTimeRef = useRef<number>(Date.now());

	const currentQuestion = state.questions[state.currentIndex];
	const progressPercent = (state.currentIndex / state.questions.length) * 100;
	const isCorrect = state.selectedAnswer === currentQuestion?.correctIndex;

	// Reset timer when question changes
	useEffect(() => {
		if (!state.showFeedback) {
			questionStartTimeRef.current = Date.now();
		}
	}, [state.currentIndex, state.showFeedback]);

	// Call onComplete when drill is complete
	useEffect(() => {
		if (state.isComplete && onComplete) {
			onComplete(state.score);
		}
	}, [state.isComplete, state.score, onComplete]);

	if (state.isComplete) {
		const percentage = Math.round((state.score.correct / state.score.total) * 100);
		return (
			<Card variant="bordered" padding="lg" className={`${bgClass} ${colorClass}`}>
				<div className="text-center py-8">
					<div className="text-6xl mb-4">
						{percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "💪"}
					</div>
					<h3 className="text-2xl font-bold mb-2">
						{state.score.correct} / {state.score.total} correct
					</h3>
					<p className="text-gray-600 mb-6">
						{percentage >= 80
							? "Excellent work!"
							: percentage >= 60
								? "Good progress, keep practicing!"
								: "Keep going, you'll get there!"}
					</p>
					<Button
						onClick={() => dispatch({ type: "RESTART" })}
						className="gap-2"
					>
						<RotateCcw size={16} />
						Practice Again
					</Button>
				</div>
			</Card>
		);
	}

	return (
		<Card variant="bordered" padding="lg" className={`${bgClass} ${colorClass}`}>
			{/* Header */}
			<div className="mb-4">
				<div className="flex items-center justify-between mb-2">
					<h3 className="text-lg font-bold">{title}</h3>
					<span className="text-sm text-gray-500">
						{state.currentIndex + 1} / {state.questions.length}
					</span>
				</div>
				<Progress value={progressPercent} className="h-2" />
				<p className="text-sm text-gray-600 mt-2">{description}</p>
			</div>

			{/* Question */}
			<div className="bg-white rounded-lg p-6 mb-4 border">
				<div className="text-center mb-6">
					<MonoText variant="highlighted" size="lg" className="text-2xl block mb-2">
						{currentQuestion.prompt}
					</MonoText>
					{currentQuestion.promptSubtext && (
						<p className="text-gray-500 text-sm">{currentQuestion.promptSubtext}</p>
					)}
				</div>

				{/* Options */}
				<RadioGroup
					value={state.selectedAnswer?.toString() ?? ""}
					onValueChange={(value) =>
						dispatch({ type: "SELECT_ANSWER", index: parseInt(value, 10) })
					}
					className="space-y-3"
					disabled={state.showFeedback}
				>
					{currentQuestion.options.map((option, index) => {
						const isSelected = state.selectedAnswer === index;
						const isCorrectOption = index === currentQuestion.correctIndex;

						let optionClass = "border-gray-200 bg-gray-50";
						if (state.showFeedback) {
							if (isCorrectOption) {
								optionClass = "border-green-500 bg-green-50";
							} else if (isSelected && !isCorrectOption) {
								optionClass = "border-red-500 bg-red-50";
							}
						} else if (isSelected) {
							optionClass = "border-blue-500 bg-blue-50";
						}

						return (
							<label
								key={index}
								className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${optionClass}`}
							>
								<RadioGroupItem value={index.toString()} id={`option-${index}`} />
								<MonoText size="lg" className="flex-1">
									{option}
								</MonoText>
								{state.showFeedback && isCorrectOption && (
									<CheckCircle className="text-green-500" size={20} />
								)}
								{state.showFeedback && isSelected && !isCorrectOption && (
									<XCircle className="text-red-500" size={20} />
								)}
							</label>
						);
					})}
				</RadioGroup>
			</div>

			{/* Feedback */}
			{state.showFeedback && (
				<div
					className={`p-4 rounded-lg mb-4 ${
						isCorrect ? "bg-green-100 border border-green-300" : "bg-red-100 border border-red-300"
					}`}
				>
					<div className="flex items-center gap-2 mb-1">
						{isCorrect ? (
							<CheckCircle className="text-green-600" size={18} />
						) : (
							<XCircle className="text-red-600" size={18} />
						)}
						<span className={`font-semibold ${isCorrect ? "text-green-700" : "text-red-700"}`}>
							{isCorrect ? "Correct!" : "Not quite"}
						</span>
					</div>
					<p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
				</div>
			)}

			{/* Actions */}
			<div className="flex justify-end">
				{!state.showFeedback ? (
					<Button
						onClick={() => {
							const timeTaken = Date.now() - questionStartTimeRef.current;
							dispatch({ type: "CHECK_ANSWER" });

							// Report attempt if callback provided
							if (onAttempt && state.selectedAnswer !== null) {
								const selectedOption = currentQuestion.options[state.selectedAnswer];
								const correctOption = currentQuestion.options[currentQuestion.correctIndex];
								onAttempt({
									questionId: currentQuestion.id,
									questionText: currentQuestion.prompt,
									correctAnswer: correctOption,
									userAnswer: selectedOption,
									isCorrect: state.selectedAnswer === currentQuestion.correctIndex,
									timeTaken,
								});
							}
						}}
						disabled={state.selectedAnswer === null}
					>
						Check Answer
					</Button>
				) : (
					<Button onClick={() => dispatch({ type: "NEXT_QUESTION" })} className="gap-2">
						{state.currentIndex < state.questions.length - 1 ? (
							<>
								Next <ChevronRight size={16} />
							</>
						) : (
							"See Results"
						)}
					</Button>
				)}
			</div>
		</Card>
	);
};

export default DrillCard;
