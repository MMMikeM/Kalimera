import { SPEEDS } from "../../drill-speeds";
import { SimpleListDrill, type SimpleListItem } from "../../engines/simple-list-drill";

// Forward: "remember (θυμάμαι)" → type aorist sg1 → "θυμήθηκα"
// Reverse: show aorist sg1 → self-assess
// Three categories: -θηκα passive aorist, active-style, suppletive
const ITEMS: SimpleListItem[] = [
	// ── -θηκα pattern ─────────────────────────────────────────────────────────
	{
		id: "thymamai",
		greek: "θυμήθηκα",
		greeklish: "thimithika",
		english: "remember (θυμάμαι)",
		label: "-θηκα",
		category: "thika",
	},
	{
		id: "skeftomai",
		greek: "σκέφτηκα",
		greeklish: "skeftika",
		english: "think (σκέφτομαι)",
		label: "-θηκα",
		category: "thika",
	},
	{
		id: "sikonoame",
		greek: "σηκώθηκα",
		greeklish: "sikothika",
		english: "get up (σηκώνομαι)",
		label: "-θηκα",
		category: "thika",
	},
	{
		id: "ntinomai",
		greek: "ντύθηκα",
		greeklish: "dithika",
		english: "get dressed (ντύνομαι)",
		label: "-θηκα",
		category: "thika",
	},
	{
		id: "kolimbao",
		greek: "κολυμπήθηκα",
		greeklish: "kolimbithika",
		english: "swim (κολυμπάω)",
		label: "-θηκα",
		category: "thika",
	},

	// ── Active-style (NOT -θηκα) ───────────────────────────────────────────────
	{
		id: "ginomai",
		greek: "έγινα",
		greeklish: "egina",
		english: "become (γίνομαι)",
		label: "active-style",
		category: "active",
	},
	{
		id: "kathomai",
		greek: "κάθισα",
		greeklish: "kathisa",
		english: "sit down (κάθομαι)",
		label: "active-style",
		category: "active",
	},
	{
		id: "xairome",
		greek: "χάρηκα",
		greeklish: "xarika",
		english: "be glad (χαίρομαι)",
		label: "active-style",
		category: "active",
	},
	{
		id: "koimamai",
		greek: "κοιμήθηκα",
		greeklish: "kimithika",
		english: "fall asleep (κοιμάμαι)",
		label: "-θηκα",
		category: "thika",
	},

	// ── Suppletive (completely different aorist stem) ─────────────────────────
	{
		id: "erxomai",
		greek: "ήρθα",
		greeklish: "irtha",
		english: "come (έρχομαι)",
		label: "suppletive",
		category: "suppletive",
	},
	{
		id: "vriskomai",
		greek: "βρέθηκα",
		greeklish: "vrethika",
		english: "be found / end up (βρίσκομαι)",
		label: "-θηκα",
		category: "thika",
	},
];

const CATEGORIES = [
	{ id: "thika", label: "-θηκα" },
	{ id: "active", label: "Active-style" },
	{ id: "suppletive", label: "Suppletive" },
];

export default function AoristDeponentDrill() {
	return (
		<SimpleListDrill
			drillId="verbs-aorist-deponent"
			items={ITEMS}
			title="Aorist: -μαι verbs"
			subtitle="11 forms / timed"
			colorTheme="olive"
			speeds={SPEEDS}
			forwardDesc="English + present form → aorist sg1"
			reverseDesc="Aorist form → present verb (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
