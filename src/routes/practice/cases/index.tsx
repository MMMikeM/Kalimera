import { createFileRoute } from "@tanstack/react-router";

import { DrillIndex } from "../components/drill-index";
import { CASE_PHASES } from "./drills.data";

export const Route = createFileRoute("/practice/cases/")({
	component: CasesPage,
});

function CasesPage() {
	return <DrillIndex title="The case system" phases={CASE_PHASES} />;
}
