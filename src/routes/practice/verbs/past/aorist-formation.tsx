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
		greeklish: "egrapsa",
		english: "write (γράφω)",
		label: "γράφω → έγραψα",
		context: "φ + σ → ψ",
		category: "psi",
	},
	{
		id: "doulevo",
		greek: "δούλεψα",
		greeklish: "doulepsa",
		english: "work (δουλεύω)",
		label: "δουλεύω → δούλεψα",
		context: "ευ + σ → ψ",
		category: "psi",
	},
	{
		id: "taxidevo",
		greek: "ταξίδεψα",
		greeklish: "taxidepsa",
		english: "travel (ταξιδεύω)",
		label: "ταξιδεύω → ταξίδεψα",
		context: "ευ + σ → ψ",
		category: "psi",
	},
	{
		id: "kovo",
		greek: "έκοψα",
		greeklish: "ekopsa",
		english: "cut (κόβω)",
		label: "κόβω → έκοψα",
		context: "β + σ → ψ",
		category: "psi",
	},
	{
		id: "leipo",
		greek: "έλειψα",
		greeklish: "eleipsa",
		english: "be missing / away (λείπω)",
		label: "λείπω → έλειψα",
		context: "π + σ → ψ",
		category: "psi",
	},
	{
		id: "anavo",
		greek: "άναψα",
		greeklish: "anapsa",
		english: "turn on / light (ανάβω)",
		label: "ανάβω → άναψα",
		context: "β + σ → ψ",
		category: "psi",
	},

	// ── ξ fusion: κ / γ / χ / ζ (some) ──
	{
		id: "anoigo",
		greek: "άνοιξα",
		greeklish: "anoixa",
		english: "open (ανοίγω)",
		label: "ανοίγω → άνοιξα",
		context: "γ + σ → ξ",
		category: "ksi",
	},
	{
		id: "ftiachno",
		greek: "έφτιαξα",
		greeklish: "eftiaxa",
		english: "make (φτιάχνω)",
		label: "φτιάχνω → έφτιαξα",
		context: "-χνω: χν cluster → ξ",
		category: "ksi",
	},
	{
		id: "prosecho",
		greek: "πρόσεξα",
		greeklish: "prosexa",
		english: "take care (προσέχω)",
		label: "προσέχω → πρόσεξα",
		context: "χ + σ → ξ",
		category: "ksi",
	},
	{
		id: "allazo",
		greek: "άλλαξα",
		greeklish: "allaxa",
		english: "change (αλλάζω)",
		label: "αλλάζω → άλλαξα",
		context: "ζ + σ → ξ",
		category: "ksi",
	},

	// ── σ fusion: vowel / ν / ζ (most -ιζω / -ωνω verbs) ──
	{
		id: "teleiono",
		greek: "τελείωσα",
		greeklish: "teleiosa",
		english: "finish (τελειώνω)",
		label: "τελειώνω → τελείωσα",
		context: "-νω: ν drops, then + σα",
		category: "sigma",
	},
	{
		id: "agorazo",
		greek: "αγόρασα",
		greeklish: "agorasa",
		english: "buy (αγοράζω)",
		label: "αγοράζω → αγόρασα",
		context: "ζ + σ → σ",
		category: "sigma",
	},
	{
		id: "diavazo",
		greek: "διάβασα",
		greeklish: "diavasa",
		english: "read (διαβάζω)",
		label: "διαβάζω → διάβασα",
		context: "ζ + σ → σ",
		category: "sigma",
	},
	{
		id: "akouo",
		greek: "άκουσα",
		greeklish: "akousa",
		english: "listen (ακούω)",
		label: "ακούω → άκουσα",
		context: "vowel + σ → σ",
		category: "sigma",
	},
	{
		id: "apofasizo",
		greek: "αποφάσισα",
		greeklish: "apofasisa",
		english: "decide (αποφασίζω)",
		label: "αποφασίζω → αποφάσισα",
		context: "ζ + σ → σ",
		category: "sigma",
	},
	{
		id: "gyrizo",
		greek: "γύρισα",
		greeklish: "gyrisa",
		english: "turn (γυρίζω)",
		label: "γυρίζω → γύρισα",
		context: "ζ + σ → σ",
		category: "sigma",
	},

	// ── -ησα pattern: group 2 contracted verbs (-άω / -ώ) ──
	{
		id: "milao",
		greek: "μίλησα",
		greeklish: "milisa",
		english: "speak (μιλάω)",
		label: "μιλάω → μίλησα",
		context: "-άω → -ησα",
		category: "isa",
	},
	{
		id: "rotao",
		greek: "ρώτησα",
		greeklish: "rotisa",
		english: "ask (ρωτάω)",
		label: "ρωτάω → ρώτησα",
		context: "-άω → -ησα",
		category: "isa",
	},
	{
		id: "agapao",
		greek: "αγάπησα",
		greeklish: "agapisa",
		english: "love (αγαπάω)",
		label: "αγαπάω → αγάπησα",
		context: "-άω → -ησα",
		category: "isa",
	},
	{
		id: "boro",
		greek: "μπόρεσα",
		greeklish: "boresa",
		english: "can / be able (μπορώ)",
		label: "μπορώ → μπόρεσα",
		context: "-ώ → -εσα",
		category: "isa",
	},

	// ── -θηκα pattern: deponent (-μαι) verbs ──
	{
		id: "lypamai",
		greek: "λυπήθηκα",
		greeklish: "lypithika",
		english: "be sorry (λυπάμαι)",
		label: "λυπάμαι → λυπήθηκα",
		context: "-μαι → -θηκα",
		category: "thika",
	},
	{
		id: "chreiazomai",
		greek: "χρειάστηκα",
		greeklish: "chreiastika",
		english: "need (χρειάζομαι)",
		label: "χρειάζομαι → χρειάστηκα",
		context: "-ζομαι → -στηκα",
		category: "thika",
	},
	{
		id: "chairomai",
		greek: "χάρηκα",
		greeklish: "charika",
		english: "be glad (χαίρομαι)",
		label: "χαίρομαι → χάρηκα",
		context: "-ομαι → -ηκα",
		category: "thika",
	},
	{
		id: "thymamai",
		greek: "θυμήθηκα",
		greeklish: "thymithika",
		english: "remember (θυμάμαι)",
		label: "θυμάμαι → θυμήθηκα",
		context: "-μαι → -θηκα",
		category: "thika",
	},
	{
		id: "fovamai",
		greek: "φοβήθηκα",
		greeklish: "fovithika",
		english: "be afraid (φοβάμαι)",
		label: "φοβάμαι → φοβήθηκα",
		context: "-μαι → -θηκα",
		category: "thika",
	},
	{
		id: "skeftomai",
		greek: "σκέφτηκα",
		greeklish: "skeftika",
		english: "think (σκέφτομαι)",
		label: "σκέφτομαι → σκέφτηκα",
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
			title="Aorist formation"
			subtitle="25 rules / timed"
			colorTheme="terracotta"
			forwardDesc="Present (English) → aorist sg1"
			reverseDesc="Aorist form → present verb (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
