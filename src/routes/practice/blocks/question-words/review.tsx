import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";

import { BASICS } from "./basics";
import { HOW_MANY_FORMS } from "./how-many-forms";
import { WHICH_FORMS } from "./which-forms";

const REVIEW_ITEMS: SimpleListItem[] = [
	...BASICS.map((i) => ({ ...i, category: "basics" })),
	...WHICH_FORMS.map((i) => ({ ...i, category: "which" })),
	...HOW_MANY_FORMS.map((i) => ({ ...i, category: "how-many" })),
];

const CATEGORIES = [
	{ id: "basics", label: "Basics" },
	{ id: "which", label: "Which? (ποιος)" },
	{ id: "how-many", label: "How many? (πόσος)" },
];

export const Route = createFileRoute("/practice/blocks/question-words/review")({
	component: ReviewDrill,
});

function ReviewDrill() {
	return (
		<Drill
			drillId="blocks-qw-review"
			items={REVIEW_ITEMS}
			title="All question words"
			subtitle={`${REVIEW_ITEMS.length} forms mixed — mixing is harder, and sticks better`}
			colorTheme="terracotta"
			backTo="/practice/blocks/question-words/"
			forwardDesc="English → Greek"
			reverseDesc="Greek → recall meaning (self-assess)"
			categories={CATEGORIES}
			sessionSize={20}
		/>
	);
}
