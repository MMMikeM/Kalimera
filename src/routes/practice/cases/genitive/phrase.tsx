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
		english: "of the good friend (m)",
		label: "του καλού φίλου",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "megalou-dromou",
		greek: "του μεγάλου δρόμου",
		english: "of the big road",
		label: "του μεγάλου δρόμου",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "neou-daskalou",
		greek: "του νέου δασκάλου",
		english: "of the new teacher (m)",
		label: "του νέου δασκάλου",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "mikrou-skylou",
		greek: "του μικρού σκύλου",
		english: "of the small dog",
		label: "του μικρού σκύλου",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "omorfou-anthropou",
		greek: "του όμορφου ανθρώπου",
		english: "of the handsome person",
		label: "του όμορφου ανθρώπου",
		category: "masculine",
		dimension: "masculine",
	},

	// ── Singular feminine ───────────────────────────────────────────────────────
	{
		id: "kalis-meras",
		greek: "της καλής μέρας",
		english: "of the good day",
		label: "της καλής μέρας",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "megalis-polis",
		greek: "της μεγάλης πόλης",
		english: "of the big city",
		label: "της μεγάλης πόλης",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "neas-tainias",
		greek: "της νέας ταινίας",
		english: "of the new film",
		label: "της νέας ταινίας",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "mikris-gatas",
		greek: "της μικρής γάτας",
		english: "of the small cat",
		label: "της μικρής γάτας",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "zestis-soupas",
		greek: "της ζεστής σούπας",
		english: "of the hot soup",
		label: "της ζεστής σούπας",
		category: "feminine",
		dimension: "feminine",
	},

	// ── Singular neuter ─────────────────────────────────────────────────────────
	{
		id: "kalou-spitiou",
		greek: "του καλού σπιτιού",
		english: "of the good house",
		label: "του καλού σπιτιού",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "megalou-provlimatos",
		greek: "του μεγάλου προβλήματος",
		english: "of the big problem",
		label: "του μεγάλου προβλήματος",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "neou-aftokinitou",
		greek: "του νέου αυτοκινήτου",
		english: "of the new car",
		label: "του νέου αυτοκινήτου",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "mikrou-paidiou",
		greek: "του μικρού παιδιού",
		english: "of the small child",
		label: "του μικρού παιδιού",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "kryou-nerou",
		greek: "του κρύου νερού",
		english: "of the cold water",
		label: "του κρύου νερού",
		category: "neuter",
		dimension: "neuter",
	},

	// ── Plural masculine ────────────────────────────────────────────────────────
	{
		id: "kalon-filon",
		greek: "των καλών φίλων",
		english: "of the good friends (m, pl)",
		label: "των καλών φίλων",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "megalon-dromon",
		greek: "των μεγάλων δρόμων",
		english: "of the big roads (pl)",
		label: "των μεγάλων δρόμων",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "neon-daskalon",
		greek: "των νέων δασκάλων",
		english: "of the new teachers (m, pl)",
		label: "των νέων δασκάλων",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "mikron-skylaon",
		greek: "των μικρών σκύλων",
		english: "of the small dogs (pl)",
		label: "των μικρών σκύλων",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "omorfon-anthropon",
		greek: "των όμορφων ανθρώπων",
		english: "of the handsome people (pl)",
		label: "των όμορφων ανθρώπων",
		category: "plural",
		dimension: "masculine",
	},

	// ── Plural feminine ─────────────────────────────────────────────────────────
	{
		id: "kalon-meron",
		greek: "των καλών μερών",
		english: "of the good days (pl)",
		label: "των καλών μερών",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "megalon-poleon",
		greek: "των μεγάλων πόλεων",
		english: "of the big cities (pl)",
		label: "των μεγάλων πόλεων",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "neon-tainion",
		greek: "των νέων ταινιών",
		english: "of the new films (pl)",
		label: "των νέων ταινιών",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "mikron-gaton",
		greek: "των μικρών γατών",
		english: "of the small cats (pl)",
		label: "των μικρών γατών",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "zeston-soupon",
		greek: "των ζεστών σουπών",
		english: "of the hot soups (pl)",
		label: "των ζεστών σουπών",
		category: "plural",
		dimension: "feminine",
	},

	// ── Plural neuter ───────────────────────────────────────────────────────────
	{
		id: "kalon-spition",
		greek: "των καλών σπιτιών",
		english: "of the good houses (pl)",
		label: "των καλών σπιτιών",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "megalon-provlimaton",
		greek: "των μεγάλων προβλημάτων",
		english: "of the big problems (pl)",
		label: "των μεγάλων προβλημάτων",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "neon-aftokiniton",
		greek: "των νέων αυτοκινήτων",
		english: "of the new cars (pl)",
		label: "των νέων αυτοκινήτων",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "mikron-paidion",
		greek: "των μικρών παιδιών",
		english: "of the small children (pl)",
		label: "των μικρών παιδιών",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "kryon-neron",
		greek: "των κρύων νερών",
		english: "of the cold waters (pl)",
		label: "των κρύων νερών",
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
			title="Owner phrase"
			subtitle="30 noun phrases / timed"
			colorTheme="olive"
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
