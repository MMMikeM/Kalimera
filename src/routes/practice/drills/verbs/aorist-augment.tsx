import { SPEEDS } from "../../drill-speeds";
import { SimpleListDrill, type SimpleListItem } from "../../engines/simple-list-drill";

// Forward: "write (γράφω)" → type aorist sg1 → "έγραψα"
// Reverse: show aorist sg1 → tap "Adds ε-" or "Stress shifts"
// `context` shows the present form so learner can count syllables.
const ITEMS: SimpleListItem[] = [
	// ── 2-syllable present → adds ε- ─────────────────────────────────────────
	{ id: "grafi",  greek: "έγραψα",  greeklish: "egrapsa",  english: "write",         context: "γράφω · 2 syllables",  label: "γράφω → 2 syl → ε-",  category: "augment",   dimension: "augment" },
	{ id: "blepo",  greek: "είδα",    greeklish: "eida",     english: "see",            context: "βλέπω · 2 syllables",  label: "βλέπω → 2 syl → ε-",  category: "augment",   dimension: "augment" },
	{ id: "leo",    greek: "είπα",    greeklish: "eipa",     english: "say",            context: "λέω · 1 syllable",     label: "λέω → 1 syl → ε-",    category: "augment",   dimension: "augment" },
	{ id: "pino",   greek: "ήπια",    greeklish: "ipia",     english: "drink",          context: "πίνω · 2 syllables",   label: "πίνω → 2 syl → ε-",   category: "augment",   dimension: "augment" },
	{ id: "psaxno", greek: "έψαξα",   greeklish: "epsaxa",   english: "search",         context: "ψάχνω · 2 syllables",  label: "ψάχνω → 2 syl → ε-",  category: "augment",   dimension: "augment" },
	{ id: "dino",   greek: "έδωσα",   greeklish: "edosa",    english: "give",           context: "δίνω · 2 syllables",   label: "δίνω → 2 syl → ε-",   category: "augment",   dimension: "augment" },
	{ id: "fevgo",  greek: "έφυγα",   greeklish: "efiga",    english: "leave",          context: "φεύγω · 2 syllables",  label: "φεύγω → 2 syl → ε-",  category: "augment",   dimension: "augment" },
	{ id: "vrisko", greek: "βρήκα",   greeklish: "vrika",    english: "find",           context: "βρίσκω · 2 syllables", label: "βρίσκω → 2 syl → ε-", category: "augment",   dimension: "augment" },

	// ── 3+ syllable present → stress shifts, no ε- ───────────────────────────
	{ id: "doulevi",  greek: "δούλεψα",  greeklish: "doulepsa",  english: "work",      context: "δουλεύω · 3 syllables",  label: "δουλεύω → 3 syl → shift",  category: "noaugment", dimension: "noaugment" },
	{ id: "milao",    greek: "μίλησα",   greeklish: "milisa",    english: "speak",     context: "μιλάω · 3 syllables",    label: "μιλάω → 3 syl → shift",    category: "noaugment", dimension: "noaugment" },
	{ id: "akouo",    greek: "άκουσα",   greeklish: "akousa",    english: "hear",      context: "ακούω · 3 syllables",    label: "ακούω → 3 syl → shift",    category: "noaugment", dimension: "noaugment" },
	{ id: "agapo",    greek: "αγάπησα",  greeklish: "agapisa",   english: "love",      context: "αγαπάω · 4 syllables",   label: "αγαπάω → 4 syl → shift",   category: "noaugment", dimension: "noaugment" },
	{ id: "diavazo",  greek: "διάβασα",  greeklish: "diavasa",   english: "read",      context: "διαβάζω · 4 syllables",  label: "διαβάζω → 4 syl → shift",  category: "noaugment", dimension: "noaugment" },
	{ id: "thymamai", greek: "θυμήθηκα", greeklish: "thimithika", english: "remember", context: "θυμάμαι · 4 syllables",  label: "θυμάμαι → 4 syl → shift",  category: "noaugment", dimension: "noaugment" },
	{ id: "erxome",   greek: "ήρθα",     greeklish: "irtha",     english: "come",      context: "έρχομαι · 3 syllables",  label: "έρχομαι → 3 syl → shift",  category: "noaugment", dimension: "noaugment" },
	{ id: "perimeno", greek: "περίμενα", greeklish: "perimena",  english: "wait",      context: "περιμένω · 4 syllables", label: "περιμένω → 4 syl → shift", category: "noaugment", dimension: "noaugment" },
];

const DIMENSION_OPTIONS = [
	{ id: "augment",   label: "Adds ε-",       selectorBg: "bg-navy-100",  selectorText: "text-navy-text" },
	{ id: "noaugment", label: "Stress shifts", selectorBg: "bg-stone-100", selectorText: "text-stone-700" },
];

const CATEGORIES = [
	{ id: "augment",   label: "Adds ε- (short)" },
	{ id: "noaugment", label: "Stress shifts (long)" },
];

export default function AoristAugmentDrill() {
	return (
		<SimpleListDrill
			drillId="verbs-aorist-augment"
			items={ITEMS}
			title="Aorist: the augment"
			subtitle="16 verbs / timed"
			colorTheme="olive"
			speeds={SPEEDS}
			forwardDesc="English + present form → aorist sg1"
			reverseLabel="Greek → augment rule"
			reverseDesc="Aorist form → adds ε- or stress shifts?"
			categories={CATEGORIES}
			reverseDimension={{
				options: DIMENSION_OPTIONS,
				getCorrectId: (item) => item.dimension ?? "",
			}}
		/>
	);
}
