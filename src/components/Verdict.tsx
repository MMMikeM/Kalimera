import { cn } from "tailwind-variants";

interface VerdictProps {
	isCorrect: boolean;
	timedOut?: boolean;
	className?: string;
}

export const Verdict = ({ isCorrect, timedOut, className }: VerdictProps) => (
	<p
		className={cn(
			"text-sm font-medium",
			isCorrect ? "text-correct-text" : "text-incorrect-text",
			className,
		)}
	>
		{isCorrect ? "Correct" : timedOut ? "Time's up" : "Incorrect"}
	</p>
);
