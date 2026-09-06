import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";
import {
	GENDER_DIMENSION_OPTIONS,
	GENDER_PLURAL_CATEGORIES,
} from "../../components/engines/drill-constants";

// Owner (genitive) noun phrase capstone — article + adjective + noun.
// Singular: του/της/του + adj(sg, gen) + noun(sg, gen)
// Plural:   των + adj(-ων) + noun(pl, gen)  — article identical across genders; noun endings differ
// Forward: "of the good friend (m)" → type "tou kalou filou"
// Reverse: show Greek phrase → tap gender chip

export const PHRASES: SimpleListItem[] = [
	// ── Singular masculine ──────────────────────────────────────────────────────
	{
		id: "kalou-filou",
		greek: "του καλού φίλου",
		label: "of the good friend (m)",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "megalou-dromou",
		greek: "του μεγάλου δρόμου",
		label: "of the big road",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "neou-daskalou",
		greek: "του νέου δασκάλου",
		label: "of the new teacher (m)",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "mikrou-skylou",
		greek: "του μικρού σκύλου",
		label: "of the small dog",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "omorfou-anthropou",
		greek: "του όμορφου ανθρώπου",
		label: "of the handsome person",
		category: "masculine",
		dimension: "masculine",
	},

	// ── Singular feminine ───────────────────────────────────────────────────────
	{
		id: "kalis-meras",
		greek: "της καλής μέρας",
		label: "of the good day",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "megalis-polis",
		greek: "της μεγάλης πόλης",
		label: "of the big city",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "neas-tainias",
		greek: "της νέας ταινίας",
		label: "of the new film",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "mikris-gatas",
		greek: "της μικρής γάτας",
		label: "of the small cat",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "zestis-soupas",
		greek: "της ζεστής σούπας",
		label: "of the hot soup",
		category: "feminine",
		dimension: "feminine",
	},

	// ── Singular neuter ─────────────────────────────────────────────────────────
	{
		id: "kalou-spitiou",
		greek: "του καλού σπιτιού",
		label: "of the good house",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "megalou-provlimatos",
		greek: "του μεγάλου προβλήματος",
		label: "of the big problem",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "neou-aftokinitou",
		greek: "του νέου αυτοκινήτου",
		label: "of the new car",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "mikrou-paidiou",
		greek: "του μικρού παιδιού",
		label: "of the small child",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "kryou-nerou",
		greek: "του κρύου νερού",
		label: "of the cold water",
		category: "neuter",
		dimension: "neuter",
	},

	// ── Plural masculine ────────────────────────────────────────────────────────
	{
		id: "kalon-filon",
		greek: "των καλών φίλων",
		label: "of the good friends (m, pl)",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "megalon-dromon",
		greek: "των μεγάλων δρόμων",
		label: "of the big roads (pl)",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "neon-daskalon",
		greek: "των νέων δασκάλων",
		label: "of the new teachers (m, pl)",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "mikron-skylaon",
		greek: "των μικρών σκύλων",
		label: "of the small dogs (pl)",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "omorfon-anthropon",
		greek: "των όμορφων ανθρώπων",
		label: "of the handsome people (pl)",
		category: "plural",
		dimension: "masculine",
	},

	// ── Plural feminine ─────────────────────────────────────────────────────────
	{
		id: "kalon-meron",
		greek: "των καλών μερών",
		label: "of the good days (pl)",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "megalon-poleon",
		greek: "των μεγάλων πόλεων",
		label: "of the big cities (pl)",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "neon-tainion",
		greek: "των νέων ταινιών",
		label: "of the new films (pl)",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "mikron-gaton",
		greek: "των μικρών γατών",
		label: "of the small cats (pl)",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "zeston-soupon",
		greek: "των ζεστών σουπών",
		label: "of the hot soups (pl)",
		category: "plural",
		dimension: "feminine",
	},

	// ── Plural neuter ───────────────────────────────────────────────────────────
	{
		id: "kalon-spition",
		greek: "των καλών σπιτιών",
		label: "of the good houses (pl)",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "megalon-provlimaton",
		greek: "των μεγάλων προβλημάτων",
		label: "of the big problems (pl)",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "neon-aftokiniton",
		greek: "των νέων αυτοκινήτων",
		label: "of the new cars (pl)",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "mikron-paidion",
		greek: "των μικρών παιδιών",
		label: "of the small children (pl)",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "kryon-neron",
		greek: "των κρύων νερών",
		label: "of the cold waters (pl)",
		category: "plural",
		dimension: "neuter",
	},
];

export const Route = createFileRoute("/practice/cases/genitive/phrase")({
	component: PhraseOwnerDrill,
});

function PhraseOwnerDrill() {
	return (
		<Drill
			backTo={"/practice/cases/"}
			drillId="nominal-phrase-owner"
			items={PHRASES}
			subtitle="30 noun phrases / timed"
			forwardDesc="English → article + adjective + noun (Owner form)"
			reverseLabel="Greek → gender"
			reverseDesc="Phrase → select gender"
			categories={GENDER_PLURAL_CATEGORIES}
			reverse={{
				kind: "single-select",
				options: GENDER_DIMENSION_OPTIONS,
				getCorrectId: (item) => String(item.dimension ?? ""),
			}}
		/>
	);
}
