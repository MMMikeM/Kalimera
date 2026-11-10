import { Link } from "@tanstack/react-router";

import type { PathStep } from "@/constants/drills";
import {
	type SessionScore,
	type StepOutcome,
	type StepState,
	passMark,
	pickNextStep,
} from "@/lib/step-progress";
import { nowInstant } from "@/lib/time";
import type { StepProgressRow } from "@/server/db/queries/step-progress";

export interface StepSessionResult {
	outcome: StepOutcome;
	progress: StepProgressRow[];
	score: SessionScore;
}

const OUTCOME_COPY: Record<StepOutcome, string> = {
	"below-pass": "This round doesn't count yet.",
	"gate-passed": "Done.",
	"passed-once": "Pass 1 of 2. Pass it again on another day to tick it off.",
	"already-passed-today": "Passed again. The second pass has to be on another day.",
	ticked: "Ticked off. It will come back now and then for a brush-up.",
	"brushed-up": "Brush-up passed. It will come back less often now.",
	"already-ticked": "Already ticked off. This round doesn't change when it comes back.",
	slipped: "Not enough for a brush-up, so it's back on your list. Pass it on another day to tick it off again.",
};

const GATE_DONE = "Already done. Replaying it changes nothing.";

export const progressMap = (rows: readonly StepProgressRow[]) =>
	new Map<string, StepState>(rows.map(({ stepId, ...state }) => [stepId, state]));

/** What a path session counted for, and the step the app picks next. */
export const StepResult = ({
	step,
	path,
	result,
}: {
	step: PathStep;
	path: readonly PathStep[];
	result: StepSessionResult | undefined;
}) => {
	if (!result) return null;
	const next = pickNextStep(path, progressMap(result.progress), nowInstant());
	const nextStep = next && path.find((s) => s.id === next.stepId);
	return (
		<div className="mt-8 border-t border-border pt-6">
			{step.unit?.stage !== "meet" && (
				<p className="mb-1 text-sm text-muted-foreground tabular-nums">
					{result.score.correct} of {result.score.total} right first time. A pass needs{" "}
					{passMark(result.score.total)} of {result.score.total}.
				</p>
			)}
			<p className="text-foreground">
				{step.gate && result.outcome === "already-ticked" ? GATE_DONE : OUTCOME_COPY[result.outcome]}
			</p>
			{nextStep && nextStep.id !== step.id ? (
				<Link
					to={nextStep.drill.to}
					search={{ step: nextStep.id }}
					className="mt-4 inline-flex min-h-11 items-center font-medium text-navy-text underline-offset-2 hover:underline"
				>
					Next: {nextStep.title} →
				</Link>
			) : (
				!nextStep && (
					<p className="mt-4 text-sm text-muted-foreground">That's every step for today.</p>
				)
			)}
		</div>
	);
};
