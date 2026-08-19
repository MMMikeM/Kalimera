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
		english: "write (γράφω)",
		label: "γράφω → θα γράψω",
		context: "φ + σ → ψ",
		category: "psi",
	},
	{
		id: "doulevo",
		greek: "θα δουλέψω",
		english: "work (δουλεύω)",
		label: "δουλεύω → θα δουλέψω",
		context: "ευ + σ → ψ",
		category: "psi",
	},
	{
		id: "taxidevo",
		greek: "θα ταξιδέψω",
		english: "travel (ταξιδεύω)",
		label: "ταξιδεύω → θα ταξιδέψω",
		context: "ευ + σ → ψ",
		category: "psi",
	},
	{
		id: "kovo",
		greek: "θα κόψω",
		english: "cut (κόβω)",
		label: "κόβω → θα κόψω",
		context: "β + σ → ψ",
		category: "psi",
	},
	{
		id: "leipo",
		greek: "θα λείψω",
		english: "be away (λείπω)",
		label: "λείπω → θα λείψω",
		context: "π + σ → ψ",
		category: "psi",
	},

	// ── ξ fusion: κ / γ / χ / ζ ──
	{
		id: "anoigo",
		greek: "θα ανοίξω",
		english: "open (ανοίγω)",
		label: "ανοίγω → θα ανοίξω",
		context: "γ + σ → ξ",
		category: "ksi",
	},
	{
		id: "paizo",
		greek: "θα παίξω",
		english: "play (παίζω)",
		label: "παίζω → θα παίξω",
		context: "ζ + σ → ξ",
		category: "ksi",
	},
	{
		id: "trecho",
		greek: "θα τρέξω",
		english: "run (τρέχω)",
		label: "τρέχω → θα τρέξω",
		context: "χ + σ → ξ",
		category: "ksi",
	},
	{
		id: "prosecho",
		greek: "θα προσέξω",
		english: "be careful (προσέχω)",
		label: "προσέχω → θα προσέξω",
		context: "χ + σ → ξ",
		category: "ksi",
	},

	// ── σ: vowel stems, -ζω, -νω ──
	{
		id: "agorazo",
		greek: "θα αγοράσω",
		english: "buy (αγοράζω)",
		label: "αγοράζω → θα αγοράσω",
		context: "ζ → σ",
		category: "sigma",
	},
	{
		id: "diavazo",
		greek: "θα διαβάσω",
		english: "read (διαβάζω)",
		label: "διαβάζω → θα διαβάσω",
		context: "ζ → σ",
		category: "sigma",
	},
	{
		id: "akouo",
		greek: "θα ακούσω",
		english: "hear (ακούω)",
		label: "ακούω → θα ακούσω",
		context: "vowel + σ",
		category: "sigma",
	},
	{
		id: "kleino",
		greek: "θα κλείσω",
		english: "close (κλείνω)",
		label: "κλείνω → θα κλείσω",
		context: "ν → σ",
		category: "sigma",
	},
	{
		id: "lyno",
		greek: "θα λύσω",
		english: "solve (λύνω)",
		label: "λύνω → θα λύσω",
		context: "ν → σ",
		category: "sigma",
	},

	// ── -άω/-ώ → -ήσω / -έσω ──
	{
		id: "milao",
		greek: "θα μιλήσω",
		english: "speak (μιλάω)",
		label: "μιλάω → θα μιλήσω",
		context: "-άω → -ήσω",
		category: "isa",
	},
	{
		id: "agapao",
		greek: "θα αγαπήσω",
		english: "love (αγαπάω)",
		label: "αγαπάω → θα αγαπήσω",
		context: "-άω → -ήσω",
		category: "isa",
	},
	{
		id: "rotao",
		greek: "θα ρωτήσω",
		english: "ask (ρωτάω)",
		label: "ρωτάω → θα ρωτήσω",
		context: "-άω → -ήσω",
		category: "isa",
	},
	{
		id: "forao",
		greek: "θα φορέσω",
		english: "wear (φοράω)",
		label: "φοράω → θα φορέσω",
		context: "-άω → -έσω",
		category: "isa",
	},
	{
		id: "boro",
		greek: "θα μπορέσω",
		english: "be able (μπορώ)",
		label: "μπορώ → θα μπορέσω",
		context: "-ώ → -έσω",
		category: "isa",
	},

	// ── Short stems: the verb changes shape completely ──
	{
		id: "vlepo",
		greek: "θα δω",
		english: "see (βλέπω)",
		label: "βλέπω → θα δω",
		context: "past είδα",
		category: "short",
	},
	{
		id: "troo",
		greek: "θα φάω",
		english: "eat (τρώω)",
		label: "τρώω → θα φάω",
		context: "past έφαγα",
		category: "short",
	},
	{
		id: "pino",
		greek: "θα πιω",
		english: "drink (πίνω)",
		label: "πίνω → θα πιω",
		context: "past ήπια",
		category: "short",
	},
	{
		id: "leo",
		greek: "θα πω",
		english: "say (λέω)",
		label: "λέω → θα πω",
		context: "past είπα",
		category: "short",
	},
	{
		id: "vgaino",
		greek: "θα βγω",
		english: "go out (βγαίνω)",
		label: "βγαίνω → θα βγω",
		context: "past βγήκα",
		category: "short",
	},
	{
		id: "baino",
		greek: "θα μπω",
		english: "go in (μπαίνω)",
		label: "μπαίνω → θα μπω",
		context: "past μπήκα",
		category: "short",
	},
	{
		id: "anevaino",
		greek: "θα ανέβω",
		english: "go up (ανεβαίνω)",
		label: "ανεβαίνω → θα ανέβω",
		context: "past ανέβηκα",
		category: "short",
	},
	{
		id: "katevaino",
		greek: "θα κατέβω",
		english: "go down (κατεβαίνω)",
		label: "κατεβαίνω → θα κατέβω",
		context: "past κατέβηκα",
		category: "short",
	},
	{
		id: "perno",
		greek: "θα πάρω",
		english: "take (παίρνω)",
		label: "παίρνω → θα πάρω",
		context: "past πήρα",
		category: "short",
	},
	{
		id: "dino",
		greek: "θα δώσω",
		english: "give (δίνω)",
		label: "δίνω → θα δώσω",
		context: "past έδωσα",
		category: "short",
	},
	{
		id: "vazo",
		greek: "θα βάλω",
		english: "put (βάζω)",
		label: "βάζω → θα βάλω",
		context: "past έβαλα",
		category: "short",
	},
	{
		id: "vgazo",
		greek: "θα βγάλω",
		english: "take out (βγάζω)",
		label: "βγάζω → θα βγάλω",
		context: "past έβγαλα",
		category: "short",
	},
	{
		id: "erchomai",
		greek: "θα έρθω",
		english: "come (έρχομαι)",
		label: "έρχομαι → θα έρθω",
		context: "past ήρθα",
		category: "short",
	},
	{
		id: "fevgo",
		greek: "θα φύγω",
		english: "leave (φεύγω)",
		label: "φεύγω → θα φύγω",
		context: "past έφυγα",
		category: "short",
	},
	{
		id: "meno",
		greek: "θα μείνω",
		english: "stay (μένω)",
		label: "μένω → θα μείνω",
		context: "past έμεινα",
		category: "short",
	},

	// ── No change: θα does all the work ──
	{
		id: "eimai",
		greek: "θα είμαι",
		english: "be (είμαι)",
		label: "είμαι → θα είμαι",
		context: "state verb — no short form",
		category: "same",
	},
	{
		id: "echo",
		greek: "θα έχω",
		english: "have (έχω)",
		label: "έχω → θα έχω",
		context: "state verb — no short form",
		category: "same",
	},
	{
		id: "xero",
		greek: "θα ξέρω",
		english: "know (ξέρω)",
		label: "ξέρω → θα ξέρω",
		context: "state verb — no short form",
		category: "same",
	},
	{
		id: "kano",
		greek: "θα κάνω",
		english: "do / make (κάνω)",
		label: "κάνω → θα κάνω",
		context: "stem already short",
		category: "same",
	},
	{
		id: "perimeno",
		greek: "θα περιμένω",
		english: "wait (περιμένω)",
		label: "περιμένω → θα περιμένω",
		context: "ongoing by nature",
		category: "same",
	},
	{
		id: "pao",
		greek: "θα πάω",
		english: "go (πάω)",
		label: "πάω → θα πάω",
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
			title="Future formation"
			subtitle="40 rules / timed"
			colorTheme="terracotta"
			forwardDesc="Present (English) → θα form"
			reverseDesc="θα form → present verb (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
