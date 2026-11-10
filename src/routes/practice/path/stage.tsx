import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { isUnlocked } from "@/lib/step-progress";
import { nowInstant } from "@/lib/time";
import { type UnitItem, type UnitStage, patternsSoFar } from "@/lib/units";
import { listStepProgressFn } from "@/server/fns/steps";
import { getUnitStageFn } from "@/server/fns/units";

import type { SimpleListItem } from "../components/engines/deck";
import { Drill } from "../components/engines/drill";
import { NEUTRAL } from "../components/engines/drill-constants";
import { MeetWords } from "../components/meet-words";
import { PatternIntro } from "../components/pattern-intro";
import { progressMap } from "../components/step-result";
import { findStep } from "../drill-catalogue.data";
import { UNITS, findUnit } from "./units.data";

/** The unit and stage the path's `?step` names. */
const resolveStage = (stepId: string | undefined) => {
	const found = stepId ? findStep(stepId) : undefined;
	const unit = found?.step.unit && findUnit(found.step.unit.id);
	return found && unit ? { ...found, ...unit, stage: found.step.unit!.stage } : undefined;
};

export const Route = createFileRoute("/practice/path/stage")({
	loaderDeps: ({ search }) => ({ step: search.step }),
	loader: async ({ deps }) => {
		const resolved = resolveStage(deps.step);
		if (!resolved) throw notFound();
		const [stage, rows] = await Promise.all([
			getUnitStageFn({ data: { unitId: resolved.unit.id, stage: resolved.stage } }),
			listStepProgressFn(),
		]);
		const progress = progressMap(rows);
		const ticked = progress.get(resolved.step.id)?.tickedAt;
		if (!ticked && !isUnlocked(resolved.step, progress, nowInstant())) {
			throw redirect({ to: "/practice/path" });
		}
		return stage;
	},
	staleTime: 0,
	component: UnitStagePage,
});

const toForm = (item: UnitItem): SimpleListItem => ({
	id: item.id,
	greek: item.greek,
	label: item.label,
	...(item.context && { context: item.context }),
	...(item.detail && { detail: item.detail }),
	...(item.vocabId && { vocabId: item.vocabId }),
	...(item.dimension && { dimension: item.dimension }),
	...(item.acceptAlso && { acceptAlso: item.acceptAlso }),
});

const COPY: Record<Exclude<UnitStage, "meet">, { subtitle: string; forwardDesc: string }> = {
	recognise: { subtitle: "Which meaning?", forwardDesc: "Greek → pick its meaning" },
	recall: { subtitle: "Type the Greek", forwardDesc: "English → Greek, no clock" },
	pattern: { subtitle: "The forms of these words", forwardDesc: "Change the word, no clock" },
	sentences: { subtitle: "Put the words in order", forwardDesc: "The words are given, the order is yours" },
	check: { subtitle: "Everything in this unit, against the clock", forwardDesc: "English → Greek" },
};

function UnitStagePage() {
	const { items, forms } = Route.useLoaderData();
	const { step: stepId } = Route.useSearch();
	const resolved = resolveStage(stepId);
	if (!resolved) return null;
	const { step, path, unit, index, stage } = resolved;

	if (stage === "meet") return <MeetWords step={step} path={path} words={unit.words} items={items} />;

	const drillItems = items.map(toForm);
	const words = stage === "recognise" || stage === "recall";
	return (
		<Drill
			drillId="units-check"
			backTo="/practice/path"
			items={drillItems}
			sessionSize={words ? items.length * 2 : items.length}
			deckOrder="each-first"
			recordAttempts={stage === "check"}
			subtitle={COPY[stage].subtitle}
			forwardDesc={COPY[stage].forwardDesc}
			reverseDesc={COPY[stage].forwardDesc}
			{...(stage === "recognise"
				? {
						defaultMode: "reverse" as const,
						reverse: {
							kind: "single-select" as const,
							options: items.map((item) => ({ id: item.dimension!, label: item.label, ...NEUTRAL })),
						},
					}
				: { forwardOnly: true })}
			configExtras={
				stage === "pattern" ? (
					<PatternIntro unit={unit} patterns={patternsSoFar(UNITS, index)} forms={forms} />
				) : undefined
			}
		/>
	);
}
