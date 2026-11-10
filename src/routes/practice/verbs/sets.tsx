import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { isUnlocked } from "@/lib/step-progress";
import { nowInstant } from "@/lib/time";
import { listStepProgressFn } from "@/server/fns/steps";
import { getVerbSetQuestionsFn } from "@/server/fns/verbs";

import { NEUTRAL } from "../components/engines/drill-constants";
import { VocabDrillPage } from "../components/engines/vocab-drill";
import { MeetSet } from "../components/meet-set";
import { progressMap } from "../components/step-result";
import { findStep } from "../drill-catalogue.data";
import { VERB_SETS_DRILL, findVerbSet } from "./sets.data";

/** A set's stage, chosen by the `?step` the path links with. */
const resolveSetStep = (stepId: string | undefined) => {
	const found = stepId ? findStep(stepId) : undefined;
	const set = found?.step.set && findVerbSet(found.step.set.id);
	return found && set ? { ...found, set, stage: found.step.set!.stage } : undefined;
};

export const Route = createFileRoute("/practice/verbs/sets")({
	loaderDeps: ({ search }) => ({ step: search.step }),
	loader: async ({ deps }) => {
		const resolved = resolveSetStep(deps.step);
		if (!resolved) throw notFound();
		const [questions, rows] = await Promise.all([
			getVerbSetQuestionsFn({ data: { setId: resolved.set.id } }),
			listStepProgressFn(),
		]);
		const progress = progressMap(rows);
		const ticked = progress.get(resolved.step.id)?.tickedAt;
		if (!ticked && !isUnlocked(resolved.step, progress, nowInstant())) {
			throw redirect({ to: "/practice/verbs" });
		}
		return { questions };
	},
	staleTime: 0,
	component: VerbSetStage,
});

const RECOGNISE_DESC = "Greek → pick its meaning";

function VerbSetStage() {
	const { questions } = Route.useLoaderData();
	const { step: stepId } = Route.useSearch();
	const resolved = resolveSetStep(stepId);
	if (!resolved) return null;
	const { step, path, set, stage } = resolved;

	if (stage === "meet") return <MeetSet step={step} path={path} set={set} questions={questions} />;

	const shared = {
		drillId: VERB_SETS_DRILL.id,
		backTo: "/practice/verbs",
		questions,
		sessionSize: set.verbs.length * 2,
		deckOrder: "each-first",
		recordAttempts: stage === "recall-timed",
	} as const;

	if (stage === "recognise") {
		return (
			<VocabDrillPage
				{...shared}
				subtitle="Which meaning?"
				defaultMode="reverse"
				reverseDesc={RECOGNISE_DESC}
				reverse={{
					kind: "single-select",
					options: questions.map((q) => ({ id: q.dimension!, label: q.prompt, ...NEUTRAL })),
				}}
			/>
		);
	}
	return <VocabDrillPage {...shared} subtitle="Type the Greek" forwardOnly />;
}
