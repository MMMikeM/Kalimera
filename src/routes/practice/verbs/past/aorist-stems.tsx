import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";

// Forward: "eat (τρώω)" → type aorist sg1 in greeklish → "efaga"
// Reverse: show "έφαγα" → recall "τρώω → έφαγα" (self-assess)
const AORIST_STEMS: SimpleListItem[] = [
	// Suppletive — completely different stems, must memorise cold
	{
		id: "troo",
		greek: "έφαγα",
		label: "eat (τρώω)",
		category: "suppletive",
	},
	{
		id: "pino",
		greek: "ήπια",
		label: "drink (πίνω)",
		category: "suppletive",
	},
	{
		id: "vlepo",
		greek: "είδα",
		label: "see (βλέπω)",
		category: "suppletive",
	},
	{
		id: "pao",
		greek: "πήγα",
		label: "go (πηγαίνω/πάω)",
		category: "suppletive",
	},
	{
		id: "leo",
		greek: "είπα",
		label: "say (λέω)",
		category: "suppletive",
	},
	// Irregular — derivable but non-obvious, drill for speed
	{
		id: "erchomai",
		greek: "ήρθα",
		label: "come (έρχομαι)",
		category: "irregular",
	},
	{
		id: "kano",
		greek: "έκανα",
		label: "do / make (κάνω)",
		category: "irregular",
	},
	{
		id: "perno",
		greek: "πήρα",
		label: "take / get (παίρνω)",
		category: "irregular",
	},
	{
		id: "fevgo",
		greek: "έφυγα",
		label: "leave (φεύγω)",
		category: "irregular",
	},
	{
		id: "vrisko",
		greek: "βρήκα",
		label: "find (βρίσκω)",
		category: "irregular",
	},
	{
		id: "dino",
		greek: "έδωσα",
		label: "give (δίνω)",
		category: "irregular",
	},
	{
		id: "mathaino",
		greek: "έμαθα",
		label: "learn (μαθαίνω)",
		category: "irregular",
	},
	{
		id: "meno",
		greek: "έμεινα",
		label: "stay / live (μένω)",
		category: "irregular",
	},
	{
		id: "katalavaino",
		greek: "κατάλαβα",
		label: "understand (καταλαβαίνω)",
		category: "irregular",
	},
	{
		id: "stelno",
		greek: "έστειλα",
		label: "send (στέλνω)",
		category: "irregular",
	},
];

const CATEGORIES = [
	{ id: "suppletive", label: "Suppletive" },
	{ id: "irregular", label: "Irregular" },
];

export const Route = createFileRoute("/practice/verbs/past/aorist-stems")({
	component: AoristStemsDrill,
});

function AoristStemsDrill() {
	return (
		<Drill
			drillId="verbs-aorist-stems"
			items={AORIST_STEMS}
			backTo="/practice/verbs"
			title="Aorist Stems"
			subtitle="15 irregular stems / timed"
			colorTheme="terracotta"
			forwardDesc="Present (English) → aorist sg1"
			reverseDesc="Aorist form → present verb (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
