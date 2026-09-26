import { createFileRoute } from "@tanstack/react-router";

import { DrillIndex } from "../components/drill-index";
import { PRONOUN_DRILLS } from "./drills.data";

export const Route = createFileRoute("/practice/pronouns/")({
	component: PronounsPage,
});

function PronounsPage() {
	return (
		<DrillIndex
			title="Pronouns"
			subtitle="Object forms, possessives, and where they sit in a sentence."
			drills={PRONOUN_DRILLS}
		/>
	);
}
