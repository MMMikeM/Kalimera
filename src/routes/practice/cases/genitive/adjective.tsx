import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";
import { GENDER_DIMENSION_OPTIONS } from "../../components/engines/drill-constants";

// Adjective three-form agreement in Owner (genitive).
// Singular: m -ου · f -ης/-ας · n -ου
// Plural:   -ων for all three genders
// Forward: "good (m, owner)" → type "kalou" / "good (pl, owner)" → type "kalon"
// Reverse: show Greek form → tap gender chip (note: pl -ων is gender-ambiguous)

interface AdjGroup {
	id: string;
	english: string;
	masculine: string;
	feminine: string;
	neuter: string;
	plural: string;
}

const ADJECTIVES: AdjGroup[] = [
	{
		id: "kalou",
		english: "good",
		masculine: "καλού",
		feminine: "καλής",
		neuter: "καλού",
		plural: "καλών",
	},
	{
		id: "megalou",
		english: "big",
		masculine: "μεγάλου",
		feminine: "μεγάλης",
		neuter: "μεγάλου",
		plural: "μεγάλων",
	},
	{
		id: "mikrou",
		english: "small",
		masculine: "μικρού",
		feminine: "μικρής",
		neuter: "μικρού",
		plural: "μικρών",
	},
	{
		id: "neou",
		english: "new / young",
		masculine: "νέου",
		feminine: "νέας",
		neuter: "νέου",
		plural: "νέων",
	},
	{
		id: "paliou",
		english: "old",
		masculine: "παλιού",
		feminine: "παλιάς",
		neuter: "παλιού",
		plural: "παλιών",
	},
	{
		id: "omorfou",
		english: "pretty / handsome",
		masculine: "όμορφου",
		feminine: "όμορφης",
		neuter: "όμορφου",
		plural: "όμορφων",
	},
	{
		id: "zestou",
		english: "hot",
		masculine: "ζεστού",
		feminine: "ζεστής",
		neuter: "ζεστού",
		plural: "ζεστών",
	},
	{
		id: "kryou",
		english: "cold",
		masculine: "κρύου",
		feminine: "κρύας",
		neuter: "κρύου",
		plural: "κρύων",
	},
	{
		id: "efkolou",
		english: "easy",
		masculine: "εύκολου",
		feminine: "εύκολης",
		neuter: "εύκολου",
		plural: "εύκολων",
	},
	{
		id: "dyskolou",
		english: "difficult",
		masculine: "δύσκολου",
		feminine: "δύσκολης",
		neuter: "δύσκολου",
		plural: "δύσκολων",
	},
];

const ITEMS: SimpleListItem[] = ADJECTIVES.flatMap((adj) => [
	{
		id: `${adj.id}-m`,
		greek: adj.masculine,
		english: `${adj.english} (m, owner)`,
		label: "masculine",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: `${adj.id}-f`,
		greek: adj.feminine,
		english: `${adj.english} (f, owner)`,
		label: "feminine",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: `${adj.id}-n`,
		greek: adj.neuter,
		english: `${adj.english} (n, owner)`,
		label: "neuter",
		category: "neuter",
		dimension: "neuter",
	},
	// Plural -ων is identical across all three genders — one item per adjective
	{
		id: `${adj.id}-pl`,
		greek: adj.plural,
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
		<Drill
			backTo={"/practice/cases/"}
			drillId="adjectives-agreement-owner"
			items={ITEMS}
			title="Adjective agreement (Owner)"
			subtitle="40 forms / timed"
			colorTheme="olive"
			forwardDesc="English + gender → adjective form (Owner)"
			reverseLabel="Greek → gender"
			reverseDesc="Adjective form → select gender"
			categories={CATEGORIES}
			reverse={{
				kind: "single-select",
				options: GENDER_DIMENSION_OPTIONS,
				getCorrectId: (item) => String(item.dimension ?? ""),
			}}
		/>
	);
}
