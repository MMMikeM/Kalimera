import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";
import { GENDER_DIMENSION_OPTIONS } from "../../components/engines/drill-constants";

// Adjective three-form agreement (Doer / nominative).
// Singular: m -ος · f -η/-α · n -ο
// Plural:   m -οι · f -ες · n -α
// Forward: "good (m)" → type "kalos" / "good (m, pl)" → type "kaloi"
// Reverse: show Greek form → tap gender chip

interface AdjGroup {
	id: string;
	english: string;
	masculine: string;
	feminine: string;
	neuter: string;
	pluralMasc: string;
	pluralFem: string;
	pluralNeut: string;
}

const ADJECTIVES: AdjGroup[] = [
	{
		id: "kalos",
		english: "good",
		masculine: "καλός",
		feminine: "καλή",
		neuter: "καλό",
		pluralMasc: "καλοί",
		pluralFem: "καλές",
		pluralNeut: "καλά",
	},
	{
		id: "megalos",
		english: "big",
		masculine: "μεγάλος",
		feminine: "μεγάλη",
		neuter: "μεγάλο",
		pluralMasc: "μεγάλοι",
		pluralFem: "μεγάλες",
		pluralNeut: "μεγάλα",
	},
	{
		id: "mikros",
		english: "small",
		masculine: "μικρός",
		feminine: "μικρή",
		neuter: "μικρό",
		pluralMasc: "μικροί",
		pluralFem: "μικρές",
		pluralNeut: "μικρά",
	},
	{
		id: "neos",
		english: "new / young",
		masculine: "νέος",
		feminine: "νέα",
		neuter: "νέο",
		pluralMasc: "νέοι",
		pluralFem: "νέες",
		pluralNeut: "νέα",
	},
	{
		id: "palios",
		english: "old",
		masculine: "παλιός",
		feminine: "παλιά",
		neuter: "παλιό",
		pluralMasc: "παλιοί",
		pluralFem: "παλιές",
		pluralNeut: "παλιά",
	},
	{
		id: "omorfos",
		english: "pretty / handsome",
		masculine: "όμορφος",
		feminine: "όμορφη",
		neuter: "όμορφο",
		pluralMasc: "όμορφοι",
		pluralFem: "όμορφες",
		pluralNeut: "όμορφα",
	},
	{
		id: "zestos",
		english: "hot",
		masculine: "ζεστός",
		feminine: "ζεστή",
		neuter: "ζεστό",
		pluralMasc: "ζεστοί",
		pluralFem: "ζεστές",
		pluralNeut: "ζεστά",
	},
	{
		id: "kryos",
		english: "cold",
		masculine: "κρύος",
		feminine: "κρύα",
		neuter: "κρύο",
		pluralMasc: "κρύοι",
		pluralFem: "κρύες",
		pluralNeut: "κρύα",
	},
	{
		id: "efkolos",
		english: "easy",
		masculine: "εύκολος",
		feminine: "εύκολη",
		neuter: "εύκολο",
		pluralMasc: "εύκολοι",
		pluralFem: "εύκολες",
		pluralNeut: "εύκολα",
	},
	{
		id: "dyskolos",
		english: "difficult",
		masculine: "δύσκολος",
		feminine: "δύσκολη",
		neuter: "δύσκολο",
		pluralMasc: "δύσκολοι",
		pluralFem: "δύσκολες",
		pluralNeut: "δύσκολα",
	},
];

const ITEMS: SimpleListItem[] = ADJECTIVES.flatMap((adj) => [
	{
		id: `${adj.id}-m`,
		greek: adj.masculine,
		english: `${adj.english} (m)`,
		label: "masculine",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: `${adj.id}-f`,
		greek: adj.feminine,
		english: `${adj.english} (f)`,
		label: "feminine",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: `${adj.id}-n`,
		greek: adj.neuter,
		english: `${adj.english} (n)`,
		label: "neuter",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: `${adj.id}-pl-m`,
		greek: adj.pluralMasc,
		english: `${adj.english} (m, pl)`,
		label: "plural m",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: `${adj.id}-pl-f`,
		greek: adj.pluralFem,
		english: `${adj.english} (f, pl)`,
		label: "plural f",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: `${adj.id}-pl-n`,
		greek: adj.pluralNeut,
		english: `${adj.english} (n, pl)`,
		label: "plural n",
		category: "plural",
		dimension: "neuter",
	},
]);

const CATEGORIES = [
	{ id: "masculine", label: "Masculine (-ος)" },
	{ id: "feminine", label: "Feminine (-η/-α)" },
	{ id: "neuter", label: "Neuter (-ο)" },
	{ id: "plural", label: "Plural (-οι/-ες/-α)" },
];

export const Route = createFileRoute("/practice/cases/nominative/adjective")({
	component: AdjectiveAgreementDrill,
});

function AdjectiveAgreementDrill() {
	return (
		<Drill
			backTo={"/practice/cases/"}
			drillId="adjectives-agreement"
			items={ITEMS}
			subtitle="60 forms / timed"
			colorTheme="ocean"
			forwardDesc="English + gender → adjective form"
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
