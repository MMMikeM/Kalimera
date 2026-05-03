import { SPEEDS } from "../../drill-speeds";
import { GENDER_STYLE } from "../../engines/drill-constants";
import { SimpleListDrill, type SimpleListItem } from "../../engines/simple-list-drill";

// Adjective three-form agreement (Doer / nominative singular).
// Forward: "good (m)" → type "kalos" (matchPhonetic → καλός)
// Reverse: show "καλή" → tap masculine / feminine / neuter chip

interface AdjGroup {
	id: string;
	english: string;
	masculine: { greek: string; greeklish: string };
	feminine: { greek: string; greeklish: string };
	neuter: { greek: string; greeklish: string };
}

const ADJECTIVES: AdjGroup[] = [
	{
		id: "kalos",
		english: "good",
		masculine: { greek: "καλός", greeklish: "kalos" },
		feminine: { greek: "καλή", greeklish: "kali" },
		neuter: { greek: "καλό", greeklish: "kalo" },
	},
	{
		id: "megalos",
		english: "big",
		masculine: { greek: "μεγάλος", greeklish: "megalos" },
		feminine: { greek: "μεγάλη", greeklish: "megali" },
		neuter: { greek: "μεγάλο", greeklish: "megalo" },
	},
	{
		id: "mikros",
		english: "small",
		masculine: { greek: "μικρός", greeklish: "mikros" },
		feminine: { greek: "μικρή", greeklish: "mikri" },
		neuter: { greek: "μικρό", greeklish: "mikro" },
	},
	{
		id: "neos",
		english: "new / young",
		masculine: { greek: "νέος", greeklish: "neos" },
		feminine: { greek: "νέα", greeklish: "nea" },
		neuter: { greek: "νέο", greeklish: "neo" },
	},
	{
		id: "palios",
		english: "old",
		masculine: { greek: "παλιός", greeklish: "palios" },
		feminine: { greek: "παλιά", greeklish: "palia" },
		neuter: { greek: "παλιό", greeklish: "palio" },
	},
	{
		id: "omorfos",
		english: "pretty / handsome",
		masculine: { greek: "όμορφος", greeklish: "omorfos" },
		feminine: { greek: "όμορφη", greeklish: "omorfi" },
		neuter: { greek: "όμορφο", greeklish: "omorfo" },
	},
	{
		id: "zestos",
		english: "hot",
		masculine: { greek: "ζεστός", greeklish: "zestos" },
		feminine: { greek: "ζεστή", greeklish: "zesti" },
		neuter: { greek: "ζεστό", greeklish: "zesto" },
	},
	{
		id: "kryos",
		english: "cold",
		masculine: { greek: "κρύος", greeklish: "kryos" },
		feminine: { greek: "κρύα", greeklish: "krya" },
		neuter: { greek: "κρύο", greeklish: "kryo" },
	},
	{
		id: "efkolos",
		english: "easy",
		masculine: { greek: "εύκολος", greeklish: "efkolos" },
		feminine: { greek: "εύκολη", greeklish: "efkoli" },
		neuter: { greek: "εύκολο", greeklish: "efkolo" },
	},
	{
		id: "dyskolos",
		english: "difficult",
		masculine: { greek: "δύσκολος", greeklish: "dyskolos" },
		feminine: { greek: "δύσκολη", greeklish: "dyskoli" },
		neuter: { greek: "δύσκολο", greeklish: "dyskolo" },
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
]);

const CATEGORIES = [
	{ id: "masculine", label: "Masculine (-ος)" },
	{ id: "feminine", label: "Feminine (-η/-α)" },
	{ id: "neuter", label: "Neuter (-ο)" },
];

const DIMENSION_OPTIONS = [
	{ id: "masculine", label: "Masculine", ...GENDER_STYLE.masculine },
	{ id: "feminine", label: "Feminine", ...GENDER_STYLE.feminine },
	{ id: "neuter", label: "Neuter", ...GENDER_STYLE.neuter },
];

export default function AdjectiveAgreementDrill() {
	return (
		<SimpleListDrill
			drillId="adjectives-agreement"
			items={ITEMS}
			title="Adjective agreement"
			subtitle="30 forms / timed"
			colorTheme="ocean"
			speeds={SPEEDS}
			forwardDesc="English + gender → adjective form"
			reverseLabel="Greek → gender"
			reverseDesc="Adjective form → select gender"
			categories={CATEGORIES}
			reverseDimension={{
				options: DIMENSION_OPTIONS,
				getCorrectId: (item) => item.dimension ?? "",
			}}
		/>
	);
}
