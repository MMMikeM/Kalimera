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
	masculine: { greek: string; greeklish: string };
	feminine: { greek: string; greeklish: string };
	neuter: { greek: string; greeklish: string };
	pluralMasc: { greek: string; greeklish: string };
	pluralFem: { greek: string; greeklish: string };
	pluralNeut: { greek: string; greeklish: string };
}

const ADJECTIVES: AdjGroup[] = [
	{
		id: "kalo",
		english: "good",
		masculine: { greek: "καλό", greeklish: "kalo" },
		feminine: { greek: "καλή", greeklish: "kali" },
		neuter: { greek: "καλό", greeklish: "kalo" },
		pluralMasc: { greek: "καλούς", greeklish: "kalous" },
		pluralFem: { greek: "καλές", greeklish: "kales" },
		pluralNeut: { greek: "καλά", greeklish: "kala" },
	},
	{
		id: "megalo",
		english: "big",
		masculine: { greek: "μεγάλο", greeklish: "megalo" },
		feminine: { greek: "μεγάλη", greeklish: "megali" },
		neuter: { greek: "μεγάλο", greeklish: "megalo" },
		pluralMasc: { greek: "μεγάλους", greeklish: "megalous" },
		pluralFem: { greek: "μεγάλες", greeklish: "megales" },
		pluralNeut: { greek: "μεγάλα", greeklish: "megala" },
	},
	{
		id: "mikro",
		english: "small",
		masculine: { greek: "μικρό", greeklish: "mikro" },
		feminine: { greek: "μικρή", greeklish: "mikri" },
		neuter: { greek: "μικρό", greeklish: "mikro" },
		pluralMasc: { greek: "μικρούς", greeklish: "mikrous" },
		pluralFem: { greek: "μικρές", greeklish: "mikres" },
		pluralNeut: { greek: "μικρά", greeklish: "mikra" },
	},
	{
		id: "neo",
		english: "new / young",
		masculine: { greek: "νέο", greeklish: "neo" },
		feminine: { greek: "νέα", greeklish: "nea" },
		neuter: { greek: "νέο", greeklish: "neo" },
		pluralMasc: { greek: "νέους", greeklish: "neous" },
		pluralFem: { greek: "νέες", greeklish: "nees" },
		pluralNeut: { greek: "νέα", greeklish: "nea" },
	},
	{
		id: "palio",
		english: "old",
		masculine: { greek: "παλιό", greeklish: "palio" },
		feminine: { greek: "παλιά", greeklish: "palia" },
		neuter: { greek: "παλιό", greeklish: "palio" },
		pluralMasc: { greek: "παλιούς", greeklish: "palious" },
		pluralFem: { greek: "παλιές", greeklish: "palies" },
		pluralNeut: { greek: "παλιά", greeklish: "palia" },
	},
	{
		id: "omorfo",
		english: "pretty / handsome",
		masculine: { greek: "όμορφο", greeklish: "omorfo" },
		feminine: { greek: "όμορφη", greeklish: "omorfi" },
		neuter: { greek: "όμορφο", greeklish: "omorfo" },
		pluralMasc: { greek: "όμορφους", greeklish: "omorfous" },
		pluralFem: { greek: "όμορφες", greeklish: "omorhes" },
		pluralNeut: { greek: "όμορφα", greeklish: "omorfa" },
	},
	{
		id: "zesto",
		english: "hot",
		masculine: { greek: "ζεστό", greeklish: "zesto" },
		feminine: { greek: "ζεστή", greeklish: "zesti" },
		neuter: { greek: "ζεστό", greeklish: "zesto" },
		pluralMasc: { greek: "ζεστούς", greeklish: "zestous" },
		pluralFem: { greek: "ζεστές", greeklish: "zestes" },
		pluralNeut: { greek: "ζεστά", greeklish: "zesta" },
	},
	{
		id: "kryo",
		english: "cold",
		masculine: { greek: "κρύο", greeklish: "kryo" },
		feminine: { greek: "κρύα", greeklish: "krya" },
		neuter: { greek: "κρύο", greeklish: "kryo" },
		pluralMasc: { greek: "κρύους", greeklish: "kryous" },
		pluralFem: { greek: "κρύες", greeklish: "kryes" },
		pluralNeut: { greek: "κρύα", greeklish: "krya" },
	},
	{
		id: "efkolo",
		english: "easy",
		masculine: { greek: "εύκολο", greeklish: "efkolo" },
		feminine: { greek: "εύκολη", greeklish: "efkoli" },
		neuter: { greek: "εύκολο", greeklish: "efkolo" },
		pluralMasc: { greek: "εύκολους", greeklish: "efkolous" },
		pluralFem: { greek: "εύκολες", greeklish: "efkoles" },
		pluralNeut: { greek: "εύκολα", greeklish: "efkola" },
	},
	{
		id: "dyskolo",
		english: "difficult",
		masculine: { greek: "δύσκολο", greeklish: "dyskolo" },
		feminine: { greek: "δύσκολη", greeklish: "dyskoli" },
		neuter: { greek: "δύσκολο", greeklish: "dyskolo" },
		pluralMasc: { greek: "δύσκολους", greeklish: "dyskolous" },
		pluralFem: { greek: "δύσκολες", greeklish: "dyskoles" },
		pluralNeut: { greek: "δύσκολα", greeklish: "dyskola" },
	},
];

const ITEMS: SimpleListItem[] = ADJECTIVES.flatMap((adj) => [
	{
		id: `${adj.id}-m`,
		greek: adj.masculine.greek,
		greeklish: adj.masculine.greeklish,
		english: `${adj.english} (m, target)`,
		label: "masculine",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: `${adj.id}-f`,
		greek: adj.feminine.greek,
		greeklish: adj.feminine.greeklish,
		english: `${adj.english} (f, target)`,
		label: "feminine",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: `${adj.id}-n`,
		greek: adj.neuter.greek,
		greeklish: adj.neuter.greeklish,
		english: `${adj.english} (n, target)`,
		label: "neuter",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: `${adj.id}-pl-m`,
		greek: adj.pluralMasc.greek,
		greeklish: adj.pluralMasc.greeklish,
		english: `${adj.english} (m, pl, target)`,
		label: "plural m",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: `${adj.id}-pl-f`,
		greek: adj.pluralFem.greek,
		greeklish: adj.pluralFem.greeklish,
		english: `${adj.english} (f, pl, target)`,
		label: "plural f",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: `${adj.id}-pl-n`,
		greek: adj.pluralNeut.greek,
		greeklish: adj.pluralNeut.greeklish,
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
