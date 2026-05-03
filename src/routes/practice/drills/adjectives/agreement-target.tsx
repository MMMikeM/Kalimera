import { SPEEDS } from "../../drill-speeds";
import { GENDER_STYLE } from "../../engines/drill-constants";
import { SimpleListDrill, type SimpleListItem } from "../../engines/simple-list-drill";

// Adjective three-form agreement in Target (accusative singular).
// m -ος → -ο · f -η/-α unchanged · n -ο unchanged
// Forward: "good (m, target)" → type "kalo"
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
		id: "kalo",
		english: "good",
		masculine: { greek: "καλό", greeklish: "kalo" },
		feminine: { greek: "καλή", greeklish: "kali" },
		neuter: { greek: "καλό", greeklish: "kalo" },
	},
	{
		id: "megalo",
		english: "big",
		masculine: { greek: "μεγάλο", greeklish: "megalo" },
		feminine: { greek: "μεγάλη", greeklish: "megali" },
		neuter: { greek: "μεγάλο", greeklish: "megalo" },
	},
	{
		id: "mikro",
		english: "small",
		masculine: { greek: "μικρό", greeklish: "mikro" },
		feminine: { greek: "μικρή", greeklish: "mikri" },
		neuter: { greek: "μικρό", greeklish: "mikro" },
	},
	{
		id: "neo",
		english: "new / young",
		masculine: { greek: "νέο", greeklish: "neo" },
		feminine: { greek: "νέα", greeklish: "nea" },
		neuter: { greek: "νέο", greeklish: "neo" },
	},
	{
		id: "palio",
		english: "old",
		masculine: { greek: "παλιό", greeklish: "palio" },
		feminine: { greek: "παλιά", greeklish: "palia" },
		neuter: { greek: "παλιό", greeklish: "palio" },
	},
	{
		id: "omorfo",
		english: "pretty / handsome",
		masculine: { greek: "όμορφο", greeklish: "omorfo" },
		feminine: { greek: "όμορφη", greeklish: "omorfi" },
		neuter: { greek: "όμορφο", greeklish: "omorfo" },
	},
	{
		id: "zesto",
		english: "hot",
		masculine: { greek: "ζεστό", greeklish: "zesto" },
		feminine: { greek: "ζεστή", greeklish: "zesti" },
		neuter: { greek: "ζεστό", greeklish: "zesto" },
	},
	{
		id: "kryo",
		english: "cold",
		masculine: { greek: "κρύο", greeklish: "kryo" },
		feminine: { greek: "κρύα", greeklish: "krya" },
		neuter: { greek: "κρύο", greeklish: "kryo" },
	},
	{
		id: "efkolo",
		english: "easy",
		masculine: { greek: "εύκολο", greeklish: "efkolo" },
		feminine: { greek: "εύκολη", greeklish: "efkoli" },
		neuter: { greek: "εύκολο", greeklish: "efkolo" },
	},
	{
		id: "dyskolo",
		english: "difficult",
		masculine: { greek: "δύσκολο", greeklish: "dyskolo" },
		feminine: { greek: "δύσκολη", greeklish: "dyskoli" },
		neuter: { greek: "δύσκολο", greeklish: "dyskolo" },
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
]);

const CATEGORIES = [
	{ id: "masculine", label: "Masculine (-ο)" },
	{ id: "feminine", label: "Feminine (-η/-α)" },
	{ id: "neuter", label: "Neuter (-ο)" },
];

const DIMENSION_OPTIONS = [
	{ id: "masculine", label: "Masculine", ...GENDER_STYLE.masculine },
	{ id: "feminine", label: "Feminine", ...GENDER_STYLE.feminine },
	{ id: "neuter", label: "Neuter", ...GENDER_STYLE.neuter },
];

export default function AdjectiveAgreementTargetDrill() {
	return (
		<SimpleListDrill
			drillId="adjectives-agreement-target"
			items={ITEMS}
			title="Adjective agreement (Target)"
			subtitle="30 forms / timed"
			colorTheme="terracotta"
			speeds={SPEEDS}
			forwardDesc="English + gender → adjective form (Target)"
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
