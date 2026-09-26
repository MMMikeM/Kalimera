import { createFileRoute } from "@tanstack/react-router";

import { DrillIndex } from "../components/drill-index";
import { VERB_PHASES } from "./drills.data";

export const Route = createFileRoute("/practice/verbs/")({
	component: VerbsPage,
});

function VerbsPage() {
	return <DrillIndex title="Verbs" phases={VERB_PHASES} />;
}
