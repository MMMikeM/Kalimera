import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../components/engines/deck";
import { Drill } from "../components/engines/drill";

const IMPERATIVES: SimpleListItem[] = [
	// Tier A — 5 most frequent, drill first
	{
		id: "ela",
		greek: "Έλα!",
		label: "Come!",
		category: "tier-a",
	},
	{
		id: "pes",
		greek: "Πες!",
		label: "Say! / Tell me!",
		category: "tier-a",
	},
	{
		id: "dose",
		greek: "Δώσε!",
		label: "Give!",
		category: "tier-a",
	},
	{
		id: "fere",
		greek: "Φέρε!",
		label: "Bring!",
		category: "tier-a",
	},
	{
		id: "kane",
		greek: "Κάνε!",
		label: "Do it! / Make it!",
		category: "tier-a",
	},
	// Full set
	{
		id: "pare",
		greek: "Πάρε!",
		label: "Take! / Pick up!",
		category: "full",
	},
	{
		id: "fate",
		greek: "Φάε!",
		label: "Eat!",
		category: "full",
	},
	{
		id: "pies",
		greek: "Πιες!",
		label: "Drink!",
		category: "full",
	},
	{
		id: "koita",
		greek: "Κοίτα!",
		label: "Look! / Watch!",
		category: "full",
	},
	{
		id: "perimene",
		greek: "Περίμενε!",
		label: "Wait!",
		category: "full",
	},
	{
		id: "grapso",
		greek: "Γράψε!",
		label: "Write!",
		category: "full",
	},
	{
		id: "diavase",
		greek: "Διάβασε!",
		label: "Read!",
		category: "full",
	},
	{
		id: "akouso",
		greek: "Άκουσε!",
		label: "Listen!",
		category: "full",
	},
	{
		id: "pigaine",
		greek: "Πήγαινε!",
		label: "Go!",
		category: "full",
	},
	{
		id: "vres",
		greek: "Βρες!",
		label: "Find!",
		category: "full",
	},
];

const CATEGORIES = [
	{ id: "tier-a", label: "Tier A (5)" },
	{ id: "full", label: "All 15" },
];

export const Route = createFileRoute("/practice/verbs/imperatives")({
	component: ImperativesDrill,
});

function ImperativesDrill() {
	return (
		<Drill
			drillId="verbs-imperatives"
			items={IMPERATIVES}
			subtitle="15 forms / timed"
			colorTheme="terracotta"
			forwardDesc="English command → Greek imperative"
			reverseDesc="Greek imperative → English (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
