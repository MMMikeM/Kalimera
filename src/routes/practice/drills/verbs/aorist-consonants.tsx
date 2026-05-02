import { SPEEDS } from "../../drill-speeds";
import { SimpleListDrill, type SimpleListItem } from "../../engines/simple-list-drill";

// Forward: "write (γράφω)" → type aorist sg1 → "έγραψα"
// Reverse: show "έγραψα" → tap suffix category (-ψα / -ξα / -σα / -ησα)
const ITEMS: SimpleListItem[] = [
	// ── -ψα: stem ends in π, β, or φ ─────────────────────────────────────────
	{
		id: "grafi",
		greek: "έγραψα",
		greeklish: "egrapsa",
		english: "write (γράφω)",
		label: "φ → ψ",
		category: "psa",
		dimension: "psa",
	},
	{
		id: "doulevi",
		greek: "δούλεψα",
		greeklish: "doulepsa",
		english: "work (δουλεύω)",
		label: "β/υ → ψ",
		category: "psa",
		dimension: "psa",
	},
	{
		id: "kobo",
		greek: "έκοψα",
		greeklish: "ekopsa",
		english: "cut (κόβω)",
		label: "β → ψ",
		category: "psa",
		dimension: "psa",
	},
	{
		id: "leipo",
		greek: "έλειψα",
		greeklish: "eleipsa",
		english: "be absent (λείπω)",
		label: "π → ψ",
		category: "psa",
		dimension: "psa",
	},

	// ── -ξα: stem ends in κ, γ, or χ ─────────────────────────────────────────
	{
		id: "psaxno",
		greek: "έψαξα",
		greeklish: "epsaxa",
		english: "search (ψάχνω)",
		label: "χ → ξ",
		category: "ksa",
		dimension: "ksa",
	},
	{
		id: "anoigo",
		greek: "άνοιξα",
		greeklish: "anixa",
		english: "open (ανοίγω)",
		label: "γ → ξ",
		category: "ksa",
		dimension: "ksa",
	},
	{
		id: "pleko",
		greek: "έπλεξα",
		greeklish: "eplexa",
		english: "knit / weave (πλέκω)",
		label: "κ → ξ",
		category: "ksa",
		dimension: "ksa",
	},
	{
		id: "dioxno",
		greek: "έδιωξα",
		greeklish: "edioxa",
		english: "chase away (διώχνω)",
		label: "χ → ξ",
		category: "ksa",
		dimension: "ksa",
	},

	// ── -σα: dental or vowel stem ─────────────────────────────────────────────
	{
		id: "akouo",
		greek: "άκουσα",
		greeklish: "akousa",
		english: "hear (ακούω)",
		label: "vowel → σ",
		category: "sa",
		dimension: "sa",
	},
	{
		id: "arxizo",
		greek: "άρχισα",
		greeklish: "arxisa",
		english: "begin (αρχίζω)",
		label: "ζ → σ",
		category: "sa",
		dimension: "sa",
	},
	{
		id: "meno",
		greek: "έμεινα",
		greeklish: "emeina",
		english: "stay / live (μένω)",
		label: "ν → σ",
		category: "sa",
		dimension: "sa",
	},
	{
		id: "perno",
		greek: "πέρασα",
		greeklish: "perasa",
		english: "pass (περνάω)",
		label: "ν → σ",
		category: "sa",
		dimension: "sa",
	},

	// ── -ησα: contracted -άω verbs ────────────────────────────────────────────
	{
		id: "milao",
		greek: "μίλησα",
		greeklish: "milisa",
		english: "speak (μιλάω)",
		label: "-άω → ησα",
		category: "contracted",
		dimension: "contracted",
	},
	{
		id: "agapo",
		greek: "αγάπησα",
		greeklish: "agapisa",
		english: "love (αγαπάω)",
		label: "-άω → ησα",
		category: "contracted",
		dimension: "contracted",
	},
	{
		id: "rotao",
		greek: "ρώτησα",
		greeklish: "rotisa",
		english: "ask (ρωτάω)",
		label: "-άω → ησα",
		category: "contracted",
		dimension: "contracted",
	},
	{
		id: "perno2",
		greek: "πέρασα",
		greeklish: "perasa",
		english: "pass time (περνάω)",
		label: "-άω → ησα",
		category: "contracted",
		dimension: "contracted",
	},
];

const DIMENSION_OPTIONS = [
	{
		id: "psa",
		label: "-ψα",
		selectorBg: "bg-terracotta-100",
		selectorText: "text-terracotta-text",
	},
	{ id: "ksa", label: "-ξα", selectorBg: "bg-navy-100", selectorText: "text-navy-text" },
	{ id: "sa", label: "-σα", selectorBg: "bg-olive-100", selectorText: "text-olive-text" },
	{
		id: "contracted",
		label: "-ησα (-άω)",
		selectorBg: "bg-slate-100",
		selectorText: "text-slate-text",
	},
];

const CATEGORIES = [
	{ id: "psa", label: "-ψα · φ/β/π stems" },
	{ id: "ksa", label: "-ξα · κ/γ/χ stems" },
	{ id: "sa", label: "-σα · vowel/ζ/ν stems" },
	{ id: "contracted", label: "-ησα · -άω verbs" },
];

export default function AoristConsonantsDrill() {
	return (
		<SimpleListDrill
			drillId="verbs-aorist-consonants"
			items={ITEMS}
			title="Aorist: consonant rules"
			subtitle="16 verbs / timed"
			colorTheme="terracotta"
			speeds={SPEEDS}
			forwardDesc="English + present form → aorist sg1"
			reverseLabel="Greek → suffix type"
			reverseDesc="Aorist form → which suffix rule?"
			categories={CATEGORIES}
			reverseDimension={{
				options: DIMENSION_OPTIONS,
				getCorrectId: (item) => item.dimension ?? "",
			}}
		/>
	);
}
