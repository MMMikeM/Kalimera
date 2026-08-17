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
		greeklish: "tha grapso",
		english: "write (γράφω)",
		label: "γράφω → θα γράψω",
		context: "φ + σ → ψ",
		category: "psi",
	},
	{
		id: "doulevo",
		greek: "θα δουλέψω",
		greeklish: "tha doulepso",
		english: "work (δουλεύω)",
		label: "δουλεύω → θα δουλέψω",
		context: "ευ + σ → ψ",
		category: "psi",
	},
	{
		id: "taxidevo",
		greek: "θα ταξιδέψω",
		greeklish: "tha taxidepso",
		english: "travel (ταξιδεύω)",
		label: "ταξιδεύω → θα ταξιδέψω",
		context: "ευ + σ → ψ",
		category: "psi",
	},
	{
		id: "kovo",
		greek: "θα κόψω",
		greeklish: "tha kopso",
		english: "cut (κόβω)",
		label: "κόβω → θα κόψω",
		context: "β + σ → ψ",
		category: "psi",
	},
	{
		id: "leipo",
		greek: "θα λείψω",
		greeklish: "tha leipso",
		english: "be away (λείπω)",
		label: "λείπω → θα λείψω",
		context: "π + σ → ψ",
		category: "psi",
	},

	// ── ξ fusion: κ / γ / χ / ζ ──
	{
		id: "anoigo",
		greek: "θα ανοίξω",
		greeklish: "tha anoixo",
		english: "open (ανοίγω)",
		label: "ανοίγω → θα ανοίξω",
		context: "γ + σ → ξ",
		category: "ksi",
	},
	{
		id: "paizo",
		greek: "θα παίξω",
		greeklish: "tha paixo",
		english: "play (παίζω)",
		label: "παίζω → θα παίξω",
		context: "ζ + σ → ξ",
		category: "ksi",
	},
	{
		id: "trecho",
		greek: "θα τρέξω",
		greeklish: "tha trexo",
		english: "run (τρέχω)",
		label: "τρέχω → θα τρέξω",
		context: "χ + σ → ξ",
		category: "ksi",
	},
	{
		id: "prosecho",
		greek: "θα προσέξω",
		greeklish: "tha prosexo",
		english: "be careful (προσέχω)",
		label: "προσέχω → θα προσέξω",
		context: "χ + σ → ξ",
		category: "ksi",
	},

	// ── σ: vowel stems, -ζω, -νω ──
	{
		id: "agorazo",
		greek: "θα αγοράσω",
		greeklish: "tha agoraso",
		english: "buy (αγοράζω)",
		label: "αγοράζω → θα αγοράσω",
		context: "ζ → σ",
		category: "sigma",
	},
	{
		id: "diavazo",
		greek: "θα διαβάσω",
		greeklish: "tha diavaso",
		english: "read (διαβάζω)",
		label: "διαβάζω → θα διαβάσω",
		context: "ζ → σ",
		category: "sigma",
	},
	{
		id: "akouo",
		greek: "θα ακούσω",
		greeklish: "tha akouso",
		english: "hear (ακούω)",
		label: "ακούω → θα ακούσω",
		context: "vowel + σ",
		category: "sigma",
	},
	{
		id: "kleino",
		greek: "θα κλείσω",
		greeklish: "tha kleiso",
		english: "close (κλείνω)",
		label: "κλείνω → θα κλείσω",
		context: "ν → σ",
		category: "sigma",
	},
	{
		id: "lyno",
		greek: "θα λύσω",
		greeklish: "tha lyso",
		english: "solve (λύνω)",
		label: "λύνω → θα λύσω",
		context: "ν → σ",
		category: "sigma",
	},

	// ── -άω/-ώ → -ήσω / -έσω ──
	{
		id: "milao",
		greek: "θα μιλήσω",
		greeklish: "tha miliso",
		english: "speak (μιλάω)",
		label: "μιλάω → θα μιλήσω",
		context: "-άω → -ήσω",
		category: "isa",
	},
	{
		id: "agapao",
		greek: "θα αγαπήσω",
		greeklish: "tha agapiso",
		english: "love (αγαπάω)",
		label: "αγαπάω → θα αγαπήσω",
		context: "-άω → -ήσω",
		category: "isa",
	},
	{
		id: "rotao",
		greek: "θα ρωτήσω",
		greeklish: "tha rotiso",
		english: "ask (ρωτάω)",
		label: "ρωτάω → θα ρωτήσω",
		context: "-άω → -ήσω",
		category: "isa",
	},
	{
		id: "forao",
		greek: "θα φορέσω",
		greeklish: "tha foreso",
		english: "wear (φοράω)",
		label: "φοράω → θα φορέσω",
		context: "-άω → -έσω",
		category: "isa",
	},
	{
		id: "boro",
		greek: "θα μπορέσω",
		greeklish: "tha boreso",
		english: "be able (μπορώ)",
		label: "μπορώ → θα μπορέσω",
		context: "-ώ → -έσω",
		category: "isa",
	},

	// ── Short stems: the verb changes shape completely ──
	{
		id: "vlepo",
		greek: "θα δω",
		greeklish: "tha do",
		english: "see (βλέπω)",
		label: "βλέπω → θα δω",
		context: "past είδα",
		category: "short",
	},
	{
		id: "troo",
		greek: "θα φάω",
		greeklish: "tha fao",
		english: "eat (τρώω)",
		label: "τρώω → θα φάω",
		context: "past έφαγα",
		category: "short",
	},
	{
		id: "pino",
		greek: "θα πιω",
		greeklish: "tha pio",
		english: "drink (πίνω)",
		label: "πίνω → θα πιω",
		context: "past ήπια",
		category: "short",
	},
	{
		id: "leo",
		greek: "θα πω",
		greeklish: "tha po",
		english: "say (λέω)",
		label: "λέω → θα πω",
		context: "past είπα",
		category: "short",
	},
	{
		id: "vgaino",
		greek: "θα βγω",
		greeklish: "tha vgo",
		english: "go out (βγαίνω)",
		label: "βγαίνω → θα βγω",
		context: "past βγήκα",
		category: "short",
	},
	{
		id: "baino",
		greek: "θα μπω",
		greeklish: "tha bo",
		english: "go in (μπαίνω)",
		label: "μπαίνω → θα μπω",
		context: "past μπήκα",
		category: "short",
	},
	{
		id: "anevaino",
		greek: "θα ανέβω",
		greeklish: "tha anevo",
		english: "go up (ανεβαίνω)",
		label: "ανεβαίνω → θα ανέβω",
		context: "past ανέβηκα",
		category: "short",
	},
	{
		id: "katevaino",
		greek: "θα κατέβω",
		greeklish: "tha katevo",
		english: "go down (κατεβαίνω)",
		label: "κατεβαίνω → θα κατέβω",
		context: "past κατέβηκα",
		category: "short",
	},
	{
		id: "perno",
		greek: "θα πάρω",
		greeklish: "tha paro",
		english: "take (παίρνω)",
		label: "παίρνω → θα πάρω",
		context: "past πήρα",
		category: "short",
	},
	{
		id: "dino",
		greek: "θα δώσω",
		greeklish: "tha doso",
		english: "give (δίνω)",
		label: "δίνω → θα δώσω",
		context: "past έδωσα",
		category: "short",
	},
	{
		id: "vazo",
		greek: "θα βάλω",
		greeklish: "tha valo",
		english: "put (βάζω)",
		label: "βάζω → θα βάλω",
		context: "past έβαλα",
		category: "short",
	},
	{
		id: "vgazo",
		greek: "θα βγάλω",
		greeklish: "tha vgalo",
		english: "take out (βγάζω)",
		label: "βγάζω → θα βγάλω",
		context: "past έβγαλα",
		category: "short",
	},
	{
		id: "erchomai",
		greek: "θα έρθω",
		greeklish: "tha ertho",
		english: "come (έρχομαι)",
		label: "έρχομαι → θα έρθω",
		context: "past ήρθα",
		category: "short",
	},
	{
		id: "fevgo",
		greek: "θα φύγω",
		greeklish: "tha fygo",
		english: "leave (φεύγω)",
		label: "φεύγω → θα φύγω",
		context: "past έφυγα",
		category: "short",
	},
	{
		id: "meno",
		greek: "θα μείνω",
		greeklish: "tha meino",
		english: "stay (μένω)",
		label: "μένω → θα μείνω",
		context: "past έμεινα",
		category: "short",
	},

	// ── No change: θα does all the work ──
	{
		id: "eimai",
		greek: "θα είμαι",
		greeklish: "tha eimai",
		english: "be (είμαι)",
		label: "είμαι → θα είμαι",
		context: "state verb — no short form",
		category: "same",
	},
	{
		id: "echo",
		greek: "θα έχω",
		greeklish: "tha echo",
		english: "have (έχω)",
		label: "έχω → θα έχω",
		context: "state verb — no short form",
		category: "same",
	},
	{
		id: "xero",
		greek: "θα ξέρω",
		greeklish: "tha ksero",
		english: "know (ξέρω)",
		label: "ξέρω → θα ξέρω",
		context: "state verb — no short form",
		category: "same",
	},
	{
		id: "kano",
		greek: "θα κάνω",
		greeklish: "tha kano",
		english: "do / make (κάνω)",
		label: "κάνω → θα κάνω",
		context: "stem already short",
		category: "same",
	},
	{
		id: "perimeno",
		greek: "θα περιμένω",
		greeklish: "tha perimeno",
		english: "wait (περιμένω)",
		label: "περιμένω → θα περιμένω",
		context: "ongoing by nature",
		category: "same",
	},
	{
		id: "pao",
		greek: "θα πάω",
		greeklish: "tha pao",
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
