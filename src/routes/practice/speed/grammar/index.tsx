import { Clock } from "lucide-react";
import { Link } from "react-router";

import { Card } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import {
	GRAMMAR_EXERCISE_CONFIG,
	type GrammarExerciseType,
} from "@/lib/drill/generate-questions";

const GRAMMAR_EXERCISES = Object.entries(GRAMMAR_EXERCISE_CONFIG) as [
	GrammarExerciseType,
	(typeof GRAMMAR_EXERCISE_CONFIG)[GrammarExerciseType],
][];

const formatTimeLimit = (ms: number): string => {
	const seconds = ms / 1000;
	return seconds % 1 === 0 ? `${seconds}s` : `${seconds.toFixed(1)}s`;
};

export default function GrammarIndex() {
	return (
		<div className="mx-auto max-w-xl">
			<Card variant="bordered" padding="lg">
				<div className="mb-8 text-center">
					<h2 className="mb-2 text-2xl font-bold text-foreground">Grammar Exercises</h2>
					<p className="text-muted-foreground">
						Select an exercise type to practice specific grammar patterns.
					</p>
				</div>

				<div className="space-y-3">
					{GRAMMAR_EXERCISES.map(([type, config]) => (
						<Link
							key={type}
							to={type}
							className="block rounded-lg border border-border p-4 text-left transition-colors hover:border-terracotta hover:bg-terracotta-50"
						>
							<div className="mb-2 flex items-center justify-between">
								<span className="font-semibold text-foreground">
									{config.label}
								</span>
								<Badge variant="outline" className="gap-1">
									<Clock size={12} />
									{formatTimeLimit(config.timeLimit)}
								</Badge>
							</div>
							<p className="mb-1 font-mono text-base text-terracotta">
								{config.greekExample}
							</p>
							<p className="text-sm text-muted-foreground">{config.description}</p>
						</Link>
					))}
				</div>
			</Card>
		</div>
	);
}
