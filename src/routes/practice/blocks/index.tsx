import { createFileRoute } from "@tanstack/react-router";

import { DrillIndex } from "../components/drill-index";
import { BLOCK_DRILLS, QUESTION_WORDS_LINK } from "./drills.data";

export const Route = createFileRoute("/practice/blocks/")({
	component: BlocksPage,
});

function BlocksPage() {
	return (
		<DrillIndex
			title="Building blocks"
			subtitle="Phrases, numbers, and time words you reach for every day."
			drills={[...BLOCK_DRILLS, QUESTION_WORDS_LINK]}
		/>
	);
}
