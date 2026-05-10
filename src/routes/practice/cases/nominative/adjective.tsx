import { createFileRoute } from "@tanstack/react-router";

import { SPEEDS } from "../../components/drill-speeds";
import { GENDER_DIMENSION_OPTIONS } from "../../components/engines/drill-constants";
import { SimpleListDrill, type SimpleListItem } from "../../components/engines/simple-list-drill";

// Adjective three-form agreement (Doer / nominative).
// Singular: m -ος · f -η/-α · n -ο
// Plural:   m -οι · f -ες · n -α
// Forward: "good (m)" → type "kalos" / "good (m, pl)" → type "kaloi"
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
		id: "kalos",
		english: "good",
		masculine: { greek: "καλός", greeklish: "kalos" },
		feminine: { greek: "καλή", greeklish: "kali" },
		neuter: { greek: "καλό", greeklish: "kalo" },
		pluralMasc: { greek: "καλοί", greeklish: "kaloi" },
		pluralFem: { greek: "καλές", greeklish: "kales" },
		pluralNeut: { greek: "καλά", greeklish: "kala" },
	},
	{
		id: "megalos",
		english: "big",
		masculine: { greek: "μεγάλος", greeklish: "megalos" },
		feminine: { greek: "μεγάλη", greeklish: "megali" },
		neuter: { greek: "μεγάλο", greeklish: "megalo" },
		pluralMasc: { greek: "μεγάλοι", greeklish: "megaloi" },
		pluralFem: { greek: "μεγάλες", greeklish: "megales" },
		pluralNeut: { greek: "μεγάλα", greeklish: "megala" },
	},
	{
		id: "mikros",
		english: "small",
		masculine: { greek: "μικρός", greeklish: "mikros" },
		feminine: { greek: "μικρή", greeklish: "mikri" },
		neuter: { greek: "μικρό", greeklish: "mikro" },
		pluralMasc: { greek: "μικροί", greeklish: "mikroi" },
		pluralFem: { greek: "μικρές", greeklish: "mikres" },
		pluralNeut: { greek: "μικρά", greeklish: "mikra" },
	},
	{
		id: "neos",
		english: "new / young",
		masculine: { greek: "νέος", greeklish: "neos" },
		feminine: { greek: "νέα", greeklish: "nea" },
		neuter: { greek: "νέο", greeklish: "neo" },
		pluralMasc: { greek: "νέοι", greeklish: "neoi" },
		pluralFem: { greek: "νέες", greeklish: "nees" },
		pluralNeut: { greek: "νέα", greeklish: "nea" },
	},
	{
		id: "palios",
		english: "old",
		masculine: { greek: "παλιός", greeklish: "palios" },
		feminine: { greek: "παλιά", greeklish: "palia" },
		neuter: { greek: "παλιό", greeklish: "palio" },
		pluralMasc: { greek: "παλιοί", greeklish: "palioi" },
		pluralFem: { greek: "παλιές", greeklish: "palies" },
		pluralNeut: { greek: "παλιά", greeklish: "palia" },
	},
	{
		id: "omorfos",
		english: "pretty / handsome",
		masculine: { greek: "όμορφος", greeklish: "omorfos" },
		feminine: { greek: "όμορφη", greeklish: "omorfi" },
		neuter: { greek: "όμορφο", greeklish: "omorfo" },
		pluralMasc: { greek: "όμορφοι", greeklish: "omorfoi" },
		pluralFem: { greek: "όμορφες", greeklish: "omorhes" },
		pluralNeut: { greek: "όμορφα", greeklish: "omorfa" },
	},
	{
		id: "zestos",
		english: "hot",
		masculine: { greek: "ζεστός", greeklish: "zestos" },
		feminine: { greek: "ζεστή", greeklish: "zesti" },
		neuter: { greek: "ζεστό", greeklish: "zesto" },
		pluralMasc: { greek: "ζεστοί", greeklish: "zestoi" },
		pluralFem: { greek: "ζεστές", greeklish: "zestes" },
		pluralNeut: { greek: "ζεστά", greeklish: "zesta" },
	},
	{
		id: "kryos",
		english: "cold",
		masculine: { greek: "κρύος", greeklish: "kryos" },
		feminine: { greek: "κρύα", greeklish: "krya" },
		neuter: { greek: "κρύο", greeklish: "kryo" },
		pluralMasc: { greek: "κρύοι", greeklish: "kryoi" },
		pluralFem: { greek: "κρύες", greeklish: "kryes" },
		pluralNeut: { greek: "κρύα", greeklish: "krya" },
	},
	{
		id: "efkolos",
		english: "easy",
		masculine: { greek: "εύκολος", greeklish: "efkolos" },
		feminine: { greek: "εύκολη", greeklish: "efkoli" },
		neuter: { greek: "εύκολο", greeklish: "efkolo" },
		pluralMasc: { greek: "εύκολοι", greeklish: "efkoloi" },
		pluralFem: { greek: "εύκολες", greeklish: "efkoles" },
		pluralNeut: { greek: "εύκολα", greeklish: "efkola" },
	},
	{
		id: "dyskolos",
		english: "difficult",
		masculine: { greek: "δύσκολος", greeklish: "dyskolos" },
		feminine: { greek: "δύσκολη", greeklish: "dyskoli" },
		neuter: { greek: "δύσκολο", greeklish: "dyskolo" },
		pluralMasc: { greek: "δύσκολοι", greeklish: "dyskoloi" },
		pluralFem: { greek: "δύσκολες", greeklish: "dyskoles" },
		pluralNeut: { greek: "δύσκολα", greeklish: "dyskola" },
	},
];

const ITEMS: SimpleListItem[] = ADJECTIVES.flatMap((adj) => [
	{
		id: `${adj.id}-m`,
		greek: adj.masculine.greek,
		greeklish: adj.masculine.greeklish,
		english: `${adj.english} (m)`,
		label: "masculine",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: `${adj.id}-f`,
		greek: adj.feminine.greek,
		greeklish: adj.feminine.greeklish,
		english: `${adj.english} (f)`,
		label: "feminine",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: `${adj.id}-n`,
		greek: adj.neuter.greek,
		greeklish: adj.neuter.greeklish,
		english: `${adj.english} (n)`,
		label: "neuter",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: `${adj.id}-pl-m`,
		greek: adj.pluralMasc.greek,
		greeklish: adj.pluralMasc.greeklish,
		english: `${adj.english} (m, pl)`,
		label: "plural m",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: `${adj.id}-pl-f`,
		greek: adj.pluralFem.greek,
		greeklish: adj.pluralFem.greeklish,
		english: `${adj.english} (f, pl)`,
		label: "plural f",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: `${adj.id}-pl-n`,
		greek: adj.pluralNeut.greek,
		greeklish: adj.pluralNeut.greeklish,
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
		<SimpleListDrill
			drillId="adjectives-agreement"
			items={ITEMS}
			title="Adjective agreement"
			subtitle="60 forms / timed"
			colorTheme="ocean"
			speeds={SPEEDS}
			forwardDesc="English + gender → adjective form"
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
