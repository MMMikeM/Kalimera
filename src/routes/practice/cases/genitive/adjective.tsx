import { createFileRoute } from "@tanstack/react-router";

import { SPEEDS } from "../../components/drill-speeds";
import { GENDER_DIMENSION_OPTIONS } from "../../components/engines/drill-constants";
import { SimpleListDrill, type SimpleListItem } from "../../components/engines/simple-list-drill";

// Adjective three-form agreement in Owner (genitive).
// Singular: m -ου · f -ης/-ας · n -ου
// Plural:   -ων for all three genders
// Forward: "good (m, owner)" → type "kalou" / "good (pl, owner)" → type "kalon"
// Reverse: show Greek form → tap gender chip (note: pl -ων is gender-ambiguous)

interface AdjGroup {
	id: string;
	english: string;
	masculine: { greek: string; greeklish: string };
	feminine: { greek: string; greeklish: string };
	neuter: { greek: string; greeklish: string };
	plural: { greek: string; greeklish: string };
}

const ADJECTIVES: AdjGroup[] = [
	{
		id: "kalou",
		english: "good",
		masculine: { greek: "καλού", greeklish: "kalou" },
		feminine: { greek: "καλής", greeklish: "kalis" },
		neuter: { greek: "καλού", greeklish: "kalou" },
		plural: { greek: "καλών", greeklish: "kalon" },
	},
	{
		id: "megalou",
		english: "big",
		masculine: { greek: "μεγάλου", greeklish: "megalou" },
		feminine: { greek: "μεγάλης", greeklish: "megalis" },
		neuter: { greek: "μεγάλου", greeklish: "megalou" },
		plural: { greek: "μεγάλων", greeklish: "megalon" },
	},
	{
		id: "mikrou",
		english: "small",
		masculine: { greek: "μικρού", greeklish: "mikrou" },
		feminine: { greek: "μικρής", greeklish: "mikris" },
		neuter: { greek: "μικρού", greeklish: "mikrou" },
		plural: { greek: "μικρών", greeklish: "mikron" },
	},
	{
		id: "neou",
		english: "new / young",
		masculine: { greek: "νέου", greeklish: "neou" },
		feminine: { greek: "νέας", greeklish: "neas" },
		neuter: { greek: "νέου", greeklish: "neou" },
		plural: { greek: "νέων", greeklish: "neon" },
	},
	{
		id: "paliou",
		english: "old",
		masculine: { greek: "παλιού", greeklish: "paliou" },
		feminine: { greek: "παλιάς", greeklish: "palias" },
		neuter: { greek: "παλιού", greeklish: "paliou" },
		plural: { greek: "παλιών", greeklish: "palion" },
	},
	{
		id: "omorfou",
		english: "pretty / handsome",
		masculine: { greek: "όμορφου", greeklish: "omorfou" },
		feminine: { greek: "όμορφης", greeklish: "omorfis" },
		neuter: { greek: "όμορφου", greeklish: "omorfou" },
		plural: { greek: "όμορφων", greeklish: "omorfon" },
	},
	{
		id: "zestou",
		english: "hot",
		masculine: { greek: "ζεστού", greeklish: "zestou" },
		feminine: { greek: "ζεστής", greeklish: "zestis" },
		neuter: { greek: "ζεστού", greeklish: "zestou" },
		plural: { greek: "ζεστών", greeklish: "zeston" },
	},
	{
		id: "kryou",
		english: "cold",
		masculine: { greek: "κρύου", greeklish: "kryou" },
		feminine: { greek: "κρύας", greeklish: "kryas" },
		neuter: { greek: "κρύου", greeklish: "kryou" },
		plural: { greek: "κρύων", greeklish: "kryon" },
	},
	{
		id: "efkolou",
		english: "easy",
		masculine: { greek: "εύκολου", greeklish: "efkolou" },
		feminine: { greek: "εύκολης", greeklish: "efkolis" },
		neuter: { greek: "εύκολου", greeklish: "efkolou" },
		plural: { greek: "εύκολων", greeklish: "efkolon" },
	},
	{
		id: "dyskolou",
		english: "difficult",
		masculine: { greek: "δύσκολου", greeklish: "dyskolou" },
		feminine: { greek: "δύσκολης", greeklish: "dyskolis" },
		neuter: { greek: "δύσκολου", greeklish: "dyskolou" },
		plural: { greek: "δύσκολων", greeklish: "dyskolon" },
	},
];

const ITEMS: SimpleListItem[] = ADJECTIVES.flatMap((adj) => [
	{
		id: `${adj.id}-m`,
		greek: adj.masculine.greek,
		greeklish: adj.masculine.greeklish,
		english: `${adj.english} (m, owner)`,
		label: "masculine",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: `${adj.id}-f`,
		greek: adj.feminine.greek,
		greeklish: adj.feminine.greeklish,
		english: `${adj.english} (f, owner)`,
		label: "feminine",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: `${adj.id}-n`,
		greek: adj.neuter.greek,
		greeklish: adj.neuter.greeklish,
		english: `${adj.english} (n, owner)`,
		label: "neuter",
		category: "neuter",
		dimension: "neuter",
	},
	// Plural -ων is identical across all three genders — one item per adjective
	{
		id: `${adj.id}-pl`,
		greek: adj.plural.greek,
		greeklish: adj.plural.greeklish,
		english: `${adj.english} (pl, owner — all genders)`,
		label: "plural",
		category: "plural",
	},
]);

const CATEGORIES = [
	{ id: "masculine", label: "Masculine (-ου)" },
	{ id: "feminine", label: "Feminine (-ης/-ας)" },
	{ id: "neuter", label: "Neuter (-ου)" },
	{ id: "plural", label: "Plural (-ων)" },
];

export const Route = createFileRoute("/practice/cases/genitive/adjective")({
	component: AdjectiveAgreementOwnerDrill,
});

function AdjectiveAgreementOwnerDrill() {
	return (
		<SimpleListDrill
			drillId="adjectives-agreement-owner"
			items={ITEMS}
			title="Adjective agreement (Owner)"
			subtitle="40 forms / timed"
			colorTheme="olive"
			speeds={SPEEDS}
			forwardDesc="English + gender → adjective form (Owner)"
			reverseLabel="Greek → gender"
			reverseDesc="Adjective form → select gender"
			categories={CATEGORIES}
			reverseDimension={{
				options: GENDER_DIMENSION_OPTIONS,
				getCorrectId: (item) => item.dimension ?? "",
			}}
		/>
	);
}
