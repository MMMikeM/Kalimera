import { createFileRoute } from "@tanstack/react-router";

import { listStepProgressFn } from "@/server/fns/steps";

import { DrillIndex } from "../components/drill-index";
import { pathPhases } from "../components/path";
import { UNIT_PATH } from "./units.data";

export const Route = createFileRoute("/practice/path/")({
	loader: () => listStepProgressFn(),
	component: PathPage,
});

function PathPage() {
	const progress = Route.useLoaderData();
	return (
		<DrillIndex
			title="Your path"
			subtitle="A few words at a time, from first sight to sentences. The app picks what's next."
			phases={pathPhases(UNIT_PATH, progress)}
		/>
	);
}
