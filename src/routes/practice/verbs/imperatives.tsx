import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../components/engines/deck";
import { Drill } from "../components/engines/drill";

const IMPERATIVES: SimpleListItem[] = [
	// Tier A — 5 most frequent, drill first
	{
		id: "ela",
		greek: "Έλα!",
		english: "Come!",
		label: "imperative of έρχομαι",
		category: "tier-a",
	},
	{
		id: "pes",
		greek: "Πες!",
		english: "Say! / Tell me!",
		label: "imperative of λέω",
		category: "tier-a",
	},
	{
		id: "dose",
		greek: "Δώσε!",
		english: "Give!",
		label: "imperative of δίνω",
		category: "tier-a",
	},
	{
		id: "fere",
		greek: "Φέρε!",
		english: "Bring!",
		label: "imperative of φέρνω",
		category: "tier-a",
	},
	{
		id: "kane",
		greek: "Κάνε!",
		english: "Do it! / Make it!",
		label: "imperative of κάνω",
		category: "tier-a",
	},
	// Full set
	{
		id: "pare",
		greek: "Πάρε!",
		english: "Take! / Pick up!",
		label: "imperative of παίρνω",
		category: "full",
	},
	{
		id: "fate",
		greek: "Φάε!",
		english: "Eat!",
		label: "imperative of τρώω",
		category: "full",
	},
	{
		id: "pies",
		greek: "Πιες!",
		english: "Drink!",
		label: "imperative of πίνω",
		category: "full",
	},
	{
		id: "koita",
		greek: "Κοίτα!",
		english: "Look! / Watch!",
		label: "imperative of κοιτάζω",
		category: "full",
	},
	{
		id: "perimene",
		greek: "Περίμενε!",
		english: "Wait!",
		label: "imperative of περιμένω",
		category: "full",
	},
	{
		id: "grapso",
		greek: "Γράψε!",
		english: "Write!",
		label: "imperative of γράφω",
		category: "full",
	},
	{
		id: "diavase",
		greek: "Διάβασε!",
		english: "Read!",
		label: "imperative of διαβάζω",
		category: "full",
	},
	{
		id: "akouso",
		greek: "Άκουσε!",
		english: "Listen!",
		label: "imperative of ακούω",
		category: "full",
	},
	{
		id: "pigaine",
		greek: "Πήγαινε!",
		english: "Go!",
		label: "imperative of πηγαίνω",
		category: "full",
	},
	{
		id: "vres",
		greek: "Βρες!",
		english: "Find!",
		label: "imperative of βρίσκω",
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
			title="Imperatives"
			subtitle="15 forms / timed"
			colorTheme="terracotta"
			forwardDesc="English command → Greek imperative"
			reverseDesc="Greek imperative → English (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
