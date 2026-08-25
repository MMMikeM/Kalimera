import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";

// Teaches the regular aorist fusion rules:
//   π/β/φ/ευ + σ → ψ   (γράφω → έγραψα)
//   κ/γ/χ/ζ   + σ → ξ   (ανοίγω → άνοιξα)
//   vowel/ν/σ/ζ + σ → σ (αγοράζω → αγόρασα)
// Forward: "write (γράφω)" → type "egrapsa" / "έγραψα"
// Reverse: show "έγραψα" → recall "γράφω → έγραψα" (self-assess)

const ITEMS: SimpleListItem[] = [
	// ── ψ fusion: π / β / φ / ευ ──
	{
		id: "grapho",
		greek: "έγραψα",
		label: "write (γράφω)",
		context: "φ + σ → ψ",
		category: "psi",
	},
	{
		id: "doulevo",
		greek: "δούλεψα",
		label: "work (δουλεύω)",
		context: "ευ + σ → ψ",
		category: "psi",
	},
	{
		id: "taxidevo",
		greek: "ταξίδεψα",
		label: "travel (ταξιδεύω)",
		context: "ευ + σ → ψ",
		category: "psi",
	},
	{
		id: "kovo",
		greek: "έκοψα",
		label: "cut (κόβω)",
		context: "β + σ → ψ",
		category: "psi",
	},
	{
		id: "leipo",
		greek: "έλειψα",
		label: "be missing / away (λείπω)",
		context: "π + σ → ψ",
		category: "psi",
	},
	{
		id: "anavo",
		greek: "άναψα",
		label: "turn on / light (ανάβω)",
		context: "β + σ → ψ",
		category: "psi",
	},

	// ── ξ fusion: κ / γ / χ / ζ (some) ──
	{
		id: "anoigo",
		greek: "άνοιξα",
		label: "open (ανοίγω)",
		context: "γ + σ → ξ",
		category: "ksi",
	},
	{
		id: "ftiachno",
		greek: "έφτιαξα",
		label: "make (φτιάχνω)",
		context: "-χνω: χν cluster → ξ",
		category: "ksi",
	},
	{
		id: "prosecho",
		greek: "πρόσεξα",
		label: "take care (προσέχω)",
		context: "χ + σ → ξ",
		category: "ksi",
	},
	{
		id: "allazo",
		greek: "άλλαξα",
		label: "change (αλλάζω)",
		context: "ζ + σ → ξ",
		category: "ksi",
	},

	// ── σ fusion: vowel / ν / ζ (most -ιζω / -ωνω verbs) ──
	{
		id: "teleiono",
		greek: "τελείωσα",
		label: "finish (τελειώνω)",
		context: "-νω: ν drops, then + σα",
		category: "sigma",
	},
	{
		id: "agorazo",
		greek: "αγόρασα",
		label: "buy (αγοράζω)",
		context: "ζ + σ → σ",
		category: "sigma",
	},
	{
		id: "diavazo",
		greek: "διάβασα",
		label: "read (διαβάζω)",
		context: "ζ + σ → σ",
		category: "sigma",
	},
	{
		id: "akouo",
		greek: "άκουσα",
		label: "listen (ακούω)",
		context: "vowel + σ → σ",
		category: "sigma",
	},
	{
		id: "apofasizo",
		greek: "αποφάσισα",
		label: "decide (αποφασίζω)",
		context: "ζ + σ → σ",
		category: "sigma",
	},
	{
		id: "gyrizo",
		greek: "γύρισα",
		label: "turn (γυρίζω)",
		context: "ζ + σ → σ",
		category: "sigma",
	},

	// ── -ησα pattern: group 2 contracted verbs (-άω / -ώ) ──
	{
		id: "milao",
		greek: "μίλησα",
		label: "speak (μιλάω)",
		context: "-άω → -ησα",
		category: "isa",
	},
	{
		id: "rotao",
		greek: "ρώτησα",
		label: "ask (ρωτάω)",
		context: "-άω → -ησα",
		category: "isa",
	},
	{
		id: "agapao",
		greek: "αγάπησα",
		label: "love (αγαπάω)",
		context: "-άω → -ησα",
		category: "isa",
	},
	{
		id: "boro",
		greek: "μπόρεσα",
		label: "can / be able (μπορώ)",
		context: "-ώ → -εσα",
		category: "isa",
	},

	// ── -θηκα pattern: deponent (-μαι) verbs ──
	{
		id: "lypamai",
		greek: "λυπήθηκα",
		label: "be sorry (λυπάμαι)",
		context: "-μαι → -θηκα",
		category: "thika",
	},
	{
		id: "chreiazomai",
		greek: "χρειάστηκα",
		label: "need (χρειάζομαι)",
		context: "-ζομαι → -στηκα",
		category: "thika",
	},
	{
		id: "chairomai",
		greek: "χάρηκα",
		label: "be glad (χαίρομαι)",
		context: "-ομαι → -ηκα",
		category: "thika",
	},
	{
		id: "thymamai",
		greek: "θυμήθηκα",
		label: "remember (θυμάμαι)",
		context: "-μαι → -θηκα",
		category: "thika",
	},
	{
		id: "fovamai",
		greek: "φοβήθηκα",
		label: "be afraid (φοβάμαι)",
		context: "-μαι → -θηκα",
		category: "thika",
	},
	{
		id: "skeftomai",
		greek: "σκέφτηκα",
		label: "think (σκέφτομαι)",
		context: "-φτομαι → -φτηκα",
		category: "thika",
	},
];

const CATEGORIES = [
	{ id: "psi", label: "π/β/φ/ευ → ψ" },
	{ id: "ksi", label: "κ/γ/χ/ζ* → ξ" },
	{ id: "sigma", label: "vowel/ζ* → σ" },
	{ id: "isa", label: "-άω/-ώ → -ησα/-εσα" },
	{ id: "thika", label: "-μαι → -θηκα" },
];

export const Route = createFileRoute("/practice/verbs/past/aorist-formation")({
	component: AoristFormationDrill,
});

function AoristFormationDrill() {
	return (
		<Drill
			drillId="verbs-aorist-formation"
			items={ITEMS}
			backTo="/practice/verbs"
			title="Aorist formation"
			subtitle="25 rules / timed"
			colorTheme="terracotta"
			forwardDesc="Present (English) → aorist sg1"
			reverseDesc="Aorist form → present verb (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
