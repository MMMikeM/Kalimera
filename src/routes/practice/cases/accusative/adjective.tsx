import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";
import { GENDER_DIMENSION_OPTIONS } from "../../components/engines/drill-constants";

// Adjective three-form agreement in Target (accusative).
// Singular: m -ο · f -η/-α · n -ο
// Plural:   m -ους · f -ες · n -α
// Forward: "good (m, target)" → type "kalo" / "good (m, pl, target)" → type "kalous"
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
		id: "kalo",
		english: "good",
		masculine: "καλό",
		feminine: "καλή",
		neuter: "καλό",
		pluralMasc: "καλούς",
		pluralFem: "καλές",
		pluralNeut: "καλά",
	},
	{
		id: "megalo",
		english: "big",
		masculine: "μεγάλο",
		feminine: "μεγάλη",
		neuter: "μεγάλο",
		pluralMasc: "μεγάλους",
		pluralFem: "μεγάλες",
		pluralNeut: "μεγάλα",
	},
	{
		id: "mikro",
		english: "small",
		masculine: "μικρό",
		feminine: "μικρή",
		neuter: "μικρό",
		pluralMasc: "μικρούς",
		pluralFem: "μικρές",
		pluralNeut: "μικρά",
	},
	{
		id: "neo",
		english: "new / young",
		masculine: "νέο",
		feminine: "νέα",
		neuter: "νέο",
		pluralMasc: "νέους",
		pluralFem: "νέες",
		pluralNeut: "νέα",
	},
	{
		id: "palio",
		english: "old",
		masculine: "παλιό",
		feminine: "παλιά",
		neuter: "παλιό",
		pluralMasc: "παλιούς",
		pluralFem: "παλιές",
		pluralNeut: "παλιά",
	},
	{
		id: "omorfo",
		english: "pretty / handsome",
		masculine: "όμορφο",
		feminine: "όμορφη",
		neuter: "όμορφο",
		pluralMasc: "όμορφους",
		pluralFem: "όμορφες",
		pluralNeut: "όμορφα",
	},
	{
		id: "zesto",
		english: "hot",
		masculine: "ζεστό",
		feminine: "ζεστή",
		neuter: "ζεστό",
		pluralMasc: "ζεστούς",
		pluralFem: "ζεστές",
		pluralNeut: "ζεστά",
	},
	{
		id: "kryo",
		english: "cold",
		masculine: "κρύο",
		feminine: "κρύα",
		neuter: "κρύο",
		pluralMasc: "κρύους",
		pluralFem: "κρύες",
		pluralNeut: "κρύα",
	},
	{
		id: "efkolo",
		english: "easy",
		masculine: "εύκολο",
		feminine: "εύκολη",
		neuter: "εύκολο",
		pluralMasc: "εύκολους",
		pluralFem: "εύκολες",
		pluralNeut: "εύκολα",
	},
	{
		id: "dyskolo",
		english: "difficult",
		masculine: "δύσκολο",
		feminine: "δύσκολη",
		neuter: "δύσκολο",
		pluralMasc: "δύσκολους",
		pluralFem: "δύσκολες",
		pluralNeut: "δύσκολα",
	},
];

const ITEMS: SimpleListItem[] = ADJECTIVES.flatMap((adj) => [
	{
		id: `${adj.id}-m`,
		greek: adj.masculine,
		english: `${adj.english} (m, target)`,
		label: "masculine",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: `${adj.id}-f`,
		greek: adj.feminine,
		english: `${adj.english} (f, target)`,
		label: "feminine",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: `${adj.id}-n`,
		greek: adj.neuter,
		english: `${adj.english} (n, target)`,
		label: "neuter",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: `${adj.id}-pl-m`,
		greek: adj.pluralMasc,
		english: `${adj.english} (m, pl, target)`,
		label: "plural m",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: `${adj.id}-pl-f`,
		greek: adj.pluralFem,
		english: `${adj.english} (f, pl, target)`,
		label: "plural f",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: `${adj.id}-pl-n`,
		greek: adj.pluralNeut,
		english: `${adj.english} (n, pl, target)`,
		label: "plural n",
		category: "plural",
		dimension: "neuter",
	},
]);

const CATEGORIES = [
	{ id: "masculine", label: "Masculine (-ο)" },
	{ id: "feminine", label: "Feminine (-η/-α)" },
	{ id: "neuter", label: "Neuter (-ο)" },
	{ id: "plural", label: "Plural (-ους/-ες/-α)" },
];

export const Route = createFileRoute("/practice/cases/accusative/adjective")({
	component: AdjectiveAgreementTargetDrill,
});

function AdjectiveAgreementTargetDrill() {
	return (
		<Drill
			backTo={"/practice/cases/"}
			drillId="adjectives-agreement-target"
			items={ITEMS}
			title="Adjective agreement (Target)"
			subtitle="60 forms / timed"
			colorTheme="terracotta"
			forwardDesc="English + gender → adjective form (Target)"
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
