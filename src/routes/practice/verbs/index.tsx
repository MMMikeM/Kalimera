import { createFileRoute } from "@tanstack/react-router";

import { listStepProgressFn } from "@/server/fns/steps";

import { DrillIndex } from "../components/drill-index";
import { pathPhases } from "../components/path";
import { VERB_PATH } from "./drills.data";

export const Route = createFileRoute("/practice/verbs/")({
	loader: () => listStepProgressFn(),
	component: VerbsPage,
});

function VerbsPage() {
	const progress = Route.useLoaderData();
	return <DrillIndex title="Verbs" phases={pathPhases(VERB_PATH, progress)} />;
}
