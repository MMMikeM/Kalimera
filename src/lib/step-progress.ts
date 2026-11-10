import { Temporal } from "@js-temporal/polyfill";

import { formatISO, fromISOString, toISOString, toPlainDate } from "./time";

const PASS_PERCENT = 90;

// Two passes on different days: recall that holds within a day can still be
// gone the next, so one good session does not tick a step off.
const PASSING_DAYS_TO_TICK = 2;

const BRUSH_UP_INTERVAL_DAYS = [3, 7, 14, 30] as const;

export interface StepState {
	passedDays: number;
	lastPassedOn: string | null;
	tickedAt: string | null;
	brushUps: number;
	nextBrushUpAt: string | null;
}

export const NEW_STEP: StepState = {
	passedDays: 0,
	lastPassedOn: null,
	tickedAt: null,
	brushUps: 0,
	nextBrushUpAt: null,
};

export type StepOutcome =
	| "below-pass"
	| "passed-once"
	| "already-passed-today"
	| "ticked"
	| "brushed-up"
	| "already-ticked"
	| "slipped";

export interface SessionScore {
	correct: number;
	total: number;
}

const brushUpAfter = (brushUps: number, now: Temporal.Instant) => {
	const days = BRUSH_UP_INTERVAL_DAYS[Math.min(brushUps, BRUSH_UP_INTERVAL_DAYS.length - 1)]!;
	return toISOString(now.add({ hours: days * 24 }));
};

/** The fewest right first time that pass a session of `total` items. */
export const passMark = (total: number) => Math.ceil((total * PASS_PERCENT) / 100);

export const isPass = ({ correct, total }: SessionScore) => total > 0 && correct >= passMark(total);

export const isBrushUpDue = (state: StepState, now: Temporal.Instant) =>
	state.tickedAt !== null &&
	state.nextBrushUpAt !== null &&
	Temporal.Instant.compare(fromISOString(state.nextBrushUpAt), now) <= 0;

export const applySession = (
	state: StepState,
	score: SessionScore,
	now: Temporal.Instant,
): { state: StepState; outcome: StepOutcome } => {
	const today = formatISO(toPlainDate(now));
	const passed = isPass(score);

	if (state.tickedAt) {
		if (!passed) {
			// Counted as passed today, so one passing session on a later day ticks it again.
			return {
				state: { ...NEW_STEP, passedDays: PASSING_DAYS_TO_TICK - 1, lastPassedOn: today },
				outcome: "slipped",
			};
		}
		if (!isBrushUpDue(state, now)) return { state, outcome: "already-ticked" };
		const brushUps = state.brushUps + 1;
		return {
			state: { ...state, brushUps, nextBrushUpAt: brushUpAfter(brushUps, now) },
			outcome: "brushed-up",
		};
	}

	if (!passed) return { state, outcome: "below-pass" };
	if (state.lastPassedOn === today) return { state, outcome: "already-passed-today" };

	const passedDays = state.passedDays + 1;
	if (passedDays < PASSING_DAYS_TO_TICK) {
		return { state: { ...state, passedDays, lastPassedOn: today }, outcome: "passed-once" };
	}
	return {
		state: {
			passedDays,
			lastPassedOn: today,
			tickedAt: toISOString(now),
			brushUps: 0,
			nextBrushUpAt: brushUpAfter(0, now),
		},
		outcome: "ticked",
	};
};

export type StepStatus = "new" | "passed-once" | "ticked" | "brush-up-due";

export const stepStatus = (state: StepState | undefined, now: Temporal.Instant): StepStatus => {
	if (!state) return "new";
	if (state.tickedAt) return isBrushUpDue(state, now) ? "brush-up-due" : "ticked";
	return state.passedDays > 0 ? "passed-once" : "new";
};

/**
 * What to practise next on a path: a due brush-up first, the longest overdue
 * of them, then the first step not yet ticked and not already passed today.
 */
export const pickNextStep = (
	stepIds: readonly string[],
	progress: ReadonlyMap<string, StepState>,
	now: Temporal.Instant,
): { stepId: string; status: StepStatus } | undefined => {
	const dueBrushUps = stepIds
		.map((stepId) => ({ stepId, state: progress.get(stepId) }))
		.filter((s): s is { stepId: string; state: StepState } => !!s.state && isBrushUpDue(s.state, now))
		.sort((a, b) => a.state.nextBrushUpAt!.localeCompare(b.state.nextBrushUpAt!));
	if (dueBrushUps[0]) return { stepId: dueBrushUps[0].stepId, status: "brush-up-due" };

	const today = formatISO(toPlainDate(now));
	const stepId = stepIds.find((id) => {
		const state = progress.get(id);
		return !state?.tickedAt && state?.lastPassedOn !== today;
	});
	return stepId ? { stepId, status: stepStatus(progress.get(stepId), now) } : undefined;
};
