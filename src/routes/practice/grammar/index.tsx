import { Clock, Zap } from "lucide-react";
import { Link } from "react-router";

import { Card } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import { GRAMMAR_EXERCISE_CONFIG, type GrammarExerciseType } from "@/lib/drill/generate-questions";

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
				<div className="mb-8 flex flex-col">
					<div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-terracotta-100">
						<Zap size={32} className="text-terracotta" />
					</div>
					<h2 className="mb-2 font-serif text-xl font-semibold text-navy-text">
						Grammar Exercises
					</h2>
					<p className="text-sm text-muted-foreground">
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
								<span className="font-medium text-foreground">{config.label}</span>
								<Badge variant="outline" className="gap-1">
									<Clock size={12} />
									{formatTimeLimit(config.timeLimit)}
								</Badge>
							</div>
							<p lang="el" className="greek-text mb-1 text-sm text-terracotta">
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
