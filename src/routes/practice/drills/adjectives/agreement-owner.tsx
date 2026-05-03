import { SPEEDS } from "../../drill-speeds";
import { GENDER_STYLE } from "../../engines/drill-constants";
import { SimpleListDrill, type SimpleListItem } from "../../engines/simple-list-drill";

// Adjective three-form agreement in Owner (genitive singular).
// m -ος → -ου · f -η → -ης / -α → -ας · n -ο → -ου
// Forward: "good (m, owner)" → type "kalou"
// Reverse: show "καλής" → tap masculine / feminine / neuter chip

interface AdjGroup {
	id: string;
	english: string;
	masculine: { greek: string; greeklish: string };
	feminine: { greek: string; greeklish: string };
	neuter: { greek: string; greeklish: string };
}

const ADJECTIVES: AdjGroup[] = [
	{
		id: "kalou",
		english: "good",
		masculine: { greek: "καλού", greeklish: "kalou" },
		feminine: { greek: "καλής", greeklish: "kalis" },
		neuter: { greek: "καλού", greeklish: "kalou" },
	},
	{
		id: "megalou",
		english: "big",
		masculine: { greek: "μεγάλου", greeklish: "megalou" },
		feminine: { greek: "μεγάλης", greeklish: "megalis" },
		neuter: { greek: "μεγάλου", greeklish: "megalou" },
	},
	{
		id: "mikrou",
		english: "small",
		masculine: { greek: "μικρού", greeklish: "mikrou" },
		feminine: { greek: "μικρής", greeklish: "mikris" },
		neuter: { greek: "μικρού", greeklish: "mikrou" },
	},
	{
		id: "neou",
		english: "new / young",
		masculine: { greek: "νέου", greeklish: "neou" },
		feminine: { greek: "νέας", greeklish: "neas" },
		neuter: { greek: "νέου", greeklish: "neou" },
	},
	{
		id: "paliou",
		english: "old",
		masculine: { greek: "παλιού", greeklish: "paliou" },
		feminine: { greek: "παλιάς", greeklish: "palias" },
		neuter: { greek: "παλιού", greeklish: "paliou" },
	},
	{
		id: "omorfou",
		english: "pretty / handsome",
		masculine: { greek: "όμορφου", greeklish: "omorfou" },
		feminine: { greek: "όμορφης", greeklish: "omorfis" },
		neuter: { greek: "όμορφου", greeklish: "omorfou" },
	},
	{
		id: "zestou",
		english: "hot",
		masculine: { greek: "ζεστού", greeklish: "zestou" },
		feminine: { greek: "ζεστής", greeklish: "zestis" },
		neuter: { greek: "ζεστού", greeklish: "zestou" },
	},
	{
		id: "kryou",
		english: "cold",
		masculine: { greek: "κρύου", greeklish: "kryou" },
		feminine: { greek: "κρύας", greeklish: "kryas" },
		neuter: { greek: "κρύου", greeklish: "kryou" },
	},
	{
		id: "efkolou",
		english: "easy",
		masculine: { greek: "εύκολου", greeklish: "efkolou" },
		feminine: { greek: "εύκολης", greeklish: "efkolis" },
		neuter: { greek: "εύκολου", greeklish: "efkolou" },
	},
	{
		id: "dyskolou",
		english: "difficult",
		masculine: { greek: "δύσκολου", greeklish: "dyskolou" },
		feminine: { greek: "δύσκολης", greeklish: "dyskolis" },
		neuter: { greek: "δύσκολου", greeklish: "dyskolou" },
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
]);

const CATEGORIES = [
	{ id: "masculine", label: "Masculine (-ου)" },
	{ id: "feminine", label: "Feminine (-ης/-ας)" },
	{ id: "neuter", label: "Neuter (-ου)" },
];

const DIMENSION_OPTIONS = [
	{ id: "masculine", label: "Masculine", ...GENDER_STYLE.masculine },
	{ id: "feminine", label: "Feminine", ...GENDER_STYLE.feminine },
	{ id: "neuter", label: "Neuter", ...GENDER_STYLE.neuter },
];

export default function AdjectiveAgreementOwnerDrill() {
	return (
		<SimpleListDrill
			drillId="adjectives-agreement-owner"
			items={ITEMS}
			title="Adjective agreement (Owner)"
			subtitle="30 forms / timed"
			colorTheme="olive"
			speeds={SPEEDS}
			forwardDesc="English + gender → adjective form (Owner)"
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
