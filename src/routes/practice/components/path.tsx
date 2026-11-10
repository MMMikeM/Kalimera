import { Link } from "@tanstack/react-router";

import { GreekText } from "@/components/GreekText";
import type { PathStep } from "@/constants/drills";
import { type StepStatus, isUnlocked, pickNextStep, stepStatus } from "@/lib/step-progress";
import { nowInstant } from "@/lib/time";
import type { StepProgressRow } from "@/server/db/queries/step-progress";

import type { DrillLink } from "./drill-index";
import { progressMap } from "./step-result";

const STATUS_LABEL: Record<StepStatus, string | undefined> = {
	new: undefined,
	"passed-once": "1 of 2",
	ticked: "✓ Ticked off",
	"brush-up-due": "Brush-up due",
};

/** The path as index phases, each step marked with where the learner stands on it. */
export const pathPhases = (path: readonly PathStep[], rows: readonly StepProgressRow[]) => {
	const now = nowInstant();
	const progress = progressMap(rows);
	const next = pickNextStep(path, progress, now);
	const phases: Array<{ phase: string; drills: DrillLink[] }> = [];
	for (const step of path) {
		const state = progress.get(step.id);
		const locked = !state?.tickedAt && !isUnlocked(step, progress, now);
		const link: DrillLink = {
			id: step.id,
			to: step.drill.to,
			title: step.title,
			greek: step.greek,
			minutes: step.drill.minutes,
			step: step.id,
			status:
				step.id === next?.stepId
					? "Next"
					: locked
						? "Locked"
						: STATUS_LABEL[stepStatus(state, now)],
			locked,
		};
		const phase = phases.at(-1);
		if (phase?.phase === step.phase) phase.drills.push(link);
		else phases.push({ phase: step.phase, drills: [link] });
	}
	return phases;
};

const REASON: Record<StepStatus, string> = {
	new: "New step",
	"passed-once": "Second pass",
	ticked: "Ticked off",
	"brush-up-due": "Brush-up",
};

/** The one thing to practise now on a path, chosen for the learner. */
export const UpNext = ({
	name,
	path,
	rows,
}: {
	name: string;
	path: readonly PathStep[];
	rows: readonly StepProgressRow[];
}) => {
	const now = nowInstant();
	const progress = progressMap(rows);
	const next = pickNextStep(path, progress, now);
	const ticked = path.filter((s) => progress.get(s.id)?.tickedAt).length;
	const step = next && path.find((s) => s.id === next.stepId);
	const tally = `${name} · ${ticked} of ${path.length} ticked off`;

	if (!next || !step) {
		return (
			<div className="py-4">
				<p className="text-xs text-muted-foreground">{tally}</p>
				<p className="mt-1 text-foreground">That's every step for today.</p>
			</div>
		);
	}
	return (
		<Link
			to={step.drill.to}
			search={{ step: step.id }}
			className="block py-4 transition-colors hover:bg-foreground/5"
		>
			<p className="text-xs text-muted-foreground">
				{REASON[next.status]} · {tally}
			</p>
			<h3 className="mt-1 text-xl font-semibold text-navy-text">{step.title}</h3>
			<GreekText as="p" tone="muted" className="mt-1 truncate">
				{step.greek}
			</GreekText>
		</Link>
	);
};
