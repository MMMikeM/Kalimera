import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";

// Mirror of past/aorist-formation: the θα form is built from the same stem as the
// aorist, so the fusion rules carry over.
//   π/β/φ/ευ + σ → ψ   (γράφω → θα γράψω)
//   κ/γ/χ/ζ   + σ → ξ   (ανοίγω → θα ανοίξω)
//   vowel/ν/ζ + σ → σ   (αγοράζω → θα αγοράσω)
//   -άω/-ώ            → -ήσω / -έσω
// Two groups have no aorist equivalent: verbs that swap to a short stem (θα δω),
// and state verbs that do not change at all (θα είμαι).
// Forward: "write (γράφω)" → type "tha grapso" / "θα γράψω"
// Reverse: show "θα γράψω" → recall "γράφω → θα γράψω" (self-assess)

const ITEMS: SimpleListItem[] = [
	// ── ψ fusion: π / β / φ / ευ ──
	{
		id: "grapho",
		greek: "θα γράψω",
		label: "write (γράφω)",
		context: "φ + σ → ψ",
		category: "psi",
	},
	{
		id: "doulevo",
		greek: "θα δουλέψω",
		label: "work (δουλεύω)",
		context: "ευ + σ → ψ",
		category: "psi",
	},
	{
		id: "taxidevo",
		greek: "θα ταξιδέψω",
		label: "travel (ταξιδεύω)",
		context: "ευ + σ → ψ",
		category: "psi",
	},
	{
		id: "kovo",
		greek: "θα κόψω",
		label: "cut (κόβω)",
		context: "β + σ → ψ",
		category: "psi",
	},
	{
		id: "leipo",
		greek: "θα λείψω",
		label: "be away (λείπω)",
		context: "π + σ → ψ",
		category: "psi",
	},

	// ── ξ fusion: κ / γ / χ / ζ ──
	{
		id: "anoigo",
		greek: "θα ανοίξω",
		label: "open (ανοίγω)",
		context: "γ + σ → ξ",
		category: "ksi",
	},
	{
		id: "paizo",
		greek: "θα παίξω",
		label: "play (παίζω)",
		context: "ζ + σ → ξ",
		category: "ksi",
	},
	{
		id: "trecho",
		greek: "θα τρέξω",
		label: "run (τρέχω)",
		context: "χ + σ → ξ",
		category: "ksi",
	},
	{
		id: "prosecho",
		greek: "θα προσέξω",
		label: "be careful (προσέχω)",
		context: "χ + σ → ξ",
		category: "ksi",
	},

	// ── σ: vowel stems, -ζω, -νω ──
	{
		id: "agorazo",
		greek: "θα αγοράσω",
		label: "buy (αγοράζω)",
		context: "ζ → σ",
		category: "sigma",
	},
	{
		id: "diavazo",
		greek: "θα διαβάσω",
		label: "read (διαβάζω)",
		context: "ζ → σ",
		category: "sigma",
	},
	{
		id: "akouo",
		greek: "θα ακούσω",
		label: "hear (ακούω)",
		context: "vowel + σ",
		category: "sigma",
	},
	{
		id: "kleino",
		greek: "θα κλείσω",
		label: "close (κλείνω)",
		context: "ν → σ",
		category: "sigma",
	},
	{
		id: "lyno",
		greek: "θα λύσω",
		label: "solve (λύνω)",
		context: "ν → σ",
		category: "sigma",
	},

	// ── -άω/-ώ → -ήσω / -έσω ──
	{
		id: "milao",
		greek: "θα μιλήσω",
		label: "speak (μιλάω)",
		context: "-άω → -ήσω",
		category: "isa",
	},
	{
		id: "agapao",
		greek: "θα αγαπήσω",
		label: "love (αγαπάω)",
		context: "-άω → -ήσω",
		category: "isa",
	},
	{
		id: "rotao",
		greek: "θα ρωτήσω",
		label: "ask (ρωτάω)",
		context: "-άω → -ήσω",
		category: "isa",
	},
	{
		id: "forao",
		greek: "θα φορέσω",
		label: "wear (φοράω)",
		context: "-άω → -έσω",
		category: "isa",
	},
	{
		id: "boro",
		greek: "θα μπορέσω",
		label: "be able (μπορώ)",
		context: "-ώ → -έσω",
		category: "isa",
	},

	// ── Short stems: the verb changes shape completely ──
	{
		id: "vlepo",
		greek: "θα δω",
		label: "see (βλέπω)",
		context: "past είδα",
		category: "short",
	},
	{
		id: "troo",
		greek: "θα φάω",
		label: "eat (τρώω)",
		context: "past έφαγα",
		category: "short",
	},
	{
		id: "pino",
		greek: "θα πιω",
		label: "drink (πίνω)",
		context: "past ήπια",
		category: "short",
	},
	{
		id: "leo",
		greek: "θα πω",
		label: "say (λέω)",
		context: "past είπα",
		category: "short",
	},
	{
		id: "vgaino",
		greek: "θα βγω",
		label: "go out (βγαίνω)",
		context: "past βγήκα",
		category: "short",
	},
	{
		id: "baino",
		greek: "θα μπω",
		label: "go in (μπαίνω)",
		context: "past μπήκα",
		category: "short",
	},
	{
		id: "anevaino",
		greek: "θα ανέβω",
		label: "go up (ανεβαίνω)",
		context: "past ανέβηκα",
		category: "short",
	},
	{
		id: "katevaino",
		greek: "θα κατέβω",
		label: "go down (κατεβαίνω)",
		context: "past κατέβηκα",
		category: "short",
	},
	{
		id: "perno",
		greek: "θα πάρω",
		label: "take (παίρνω)",
		context: "past πήρα",
		category: "short",
	},
	{
		id: "dino",
		greek: "θα δώσω",
		label: "give (δίνω)",
		context: "past έδωσα",
		category: "short",
	},
	{
		id: "vazo",
		greek: "θα βάλω",
		label: "put (βάζω)",
		context: "past έβαλα",
		category: "short",
	},
	{
		id: "vgazo",
		greek: "θα βγάλω",
		label: "take out (βγάζω)",
		context: "past έβγαλα",
		category: "short",
	},
	{
		id: "erchomai",
		greek: "θα έρθω",
		label: "come (έρχομαι)",
		context: "past ήρθα",
		category: "short",
	},
	{
		id: "fevgo",
		greek: "θα φύγω",
		label: "leave (φεύγω)",
		context: "past έφυγα",
		category: "short",
	},
	{
		id: "meno",
		greek: "θα μείνω",
		label: "stay (μένω)",
		context: "past έμεινα",
		category: "short",
	},

	// ── No change: θα does all the work ──
	{
		id: "eimai",
		greek: "θα είμαι",
		label: "be (είμαι)",
		context: "state verb — no short form",
		category: "same",
	},
	{
		id: "echo",
		greek: "θα έχω",
		label: "have (έχω)",
		context: "state verb — no short form",
		category: "same",
	},
	{
		id: "xero",
		greek: "θα ξέρω",
		label: "know (ξέρω)",
		context: "state verb — no short form",
		category: "same",
	},
	{
		id: "kano",
		greek: "θα κάνω",
		label: "do / make (κάνω)",
		context: "stem already short",
		category: "same",
	},
	{
		id: "perimeno",
		greek: "θα περιμένω",
		label: "wait (περιμένω)",
		context: "ongoing by nature",
		category: "same",
	},
	{
		id: "pao",
		greek: "θα πάω",
		label: "go (πάω)",
		context: "past πήγα, but future unchanged",
		category: "same",
	},
];

const CATEGORIES = [
	{ id: "psi", label: "π/β/φ/ευ → ψ" },
	{ id: "ksi", label: "κ/γ/χ/ζ → ξ" },
	{ id: "sigma", label: "vowel/ν/ζ → σ" },
	{ id: "isa", label: "-άω/-ώ → -ήσω" },
	{ id: "short", label: "Short stem" },
	{ id: "same", label: "No change" },
];

export const Route = createFileRoute("/practice/verbs/future/formation")({
	component: FutureFormationDrill,
});

function FutureFormationDrill() {
	return (
		<Drill
			drillId="verbs-future-formation"
			items={ITEMS}
			backTo="/practice/verbs"
			subtitle="40 rules / timed"
			colorTheme="terracotta"
			forwardDesc="Present (English) → θα form"
			reverseDesc="θα form → present verb (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
