import { SPEEDS } from "../../drill-speeds";
import { GENDER_CATEGORIES, GENDER_DIMENSION_OPTIONS } from "../../engines/drill-constants";
import { SimpleListDrill, type SimpleListItem } from "../../engines/simple-list-drill";

// Owner (genitive) noun phrase capstone — article + adjective + noun in genitive form.
// Forward: "of the good friend" → type "tou kalou filou"
// Reverse: show "της μεγάλης πόλης" → tap gender chip
// Pure noun phrases. Tests article/adjective/noun integration in Owner form.

export const PHRASES: SimpleListItem[] = [
	// Masculine owner: του + -ου + -ου
	{
		id: "kalou-filou",
		greek: "του καλού φίλου",
		greeklish: "tou kalou filou",
		english: "of the good friend (m)",
		label: "του καλού φίλου",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "megalou-dromou",
		greek: "του μεγάλου δρόμου",
		greeklish: "tou megalou dromou",
		english: "of the big road",
		label: "του μεγάλου δρόμου",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "neou-daskalou",
		greek: "του νέου δασκάλου",
		greeklish: "tou neou daskalou",
		english: "of the new teacher (m)",
		label: "του νέου δασκάλου",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "mikrou-skylou",
		greek: "του μικρού σκύλου",
		greeklish: "tou mikrou skylou",
		english: "of the small dog",
		label: "του μικρού σκύλου",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "omorfou-anthropou",
		greek: "του όμορφου ανθρώπου",
		greeklish: "tou omorfou anthropou",
		english: "of the handsome person",
		label: "του όμορφου ανθρώπου",
		category: "masculine",
		dimension: "masculine",
	},

	// Feminine owner: της + -ης/-ας + -ης/-ας
	{
		id: "kalis-meras",
		greek: "της καλής μέρας",
		greeklish: "tis kalis meras",
		english: "of the good day",
		label: "της καλής μέρας",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "megalis-polis",
		greek: "της μεγάλης πόλης",
		greeklish: "tis megalis polis",
		english: "of the big city",
		label: "της μεγάλης πόλης",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "neas-tainias",
		greek: "της νέας ταινίας",
		greeklish: "tis neas tainias",
		english: "of the new film",
		label: "της νέας ταινίας",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "mikris-gatas",
		greek: "της μικρής γάτας",
		greeklish: "tis mikris gatas",
		english: "of the small cat",
		label: "της μικρής γάτας",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "zestis-soupas",
		greek: "της ζεστής σούπας",
		greeklish: "tis zestis soupas",
		english: "of the hot soup",
		label: "της ζεστής σούπας",
		category: "feminine",
		dimension: "feminine",
	},

	// Neuter owner: του + -ου + (varied: -ου, -ιού, -ος → -ους etc)
	{
		id: "kalou-spitiou",
		greek: "του καλού σπιτιού",
		greeklish: "tou kalou spitiou",
		english: "of the good house",
		label: "του καλού σπιτιού",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "megalou-provlimatos",
		greek: "του μεγάλου προβλήματος",
		greeklish: "tou megalou provlimatos",
		english: "of the big problem",
		label: "του μεγάλου προβλήματος",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "neou-aftokinitou",
		greek: "του νέου αυτοκινήτου",
		greeklish: "tou neou aftokinitou",
		english: "of the new car",
		label: "του νέου αυτοκινήτου",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "mikrou-paidiou",
		greek: "του μικρού παιδιού",
		greeklish: "tou mikrou paidiou",
		english: "of the small child",
		label: "του μικρού παιδιού",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "kryou-nerou",
		greek: "του κρύου νερού",
		greeklish: "tou kryou nerou",
		english: "of the cold water",
		label: "του κρύου νερού",
		category: "neuter",
		dimension: "neuter",
	},
];

export default function PhraseOwnerDrill() {
	return (
		<SimpleListDrill
			drillId="nominal-phrase-owner"
			items={PHRASES}
			title="Owner phrase"
			subtitle="15 noun phrases / timed"
			colorTheme="olive"
			speeds={SPEEDS}
			forwardDesc="English → article + adjective + noun (Owner form)"
			reverseLabel="Greek → gender"
			reverseDesc="Phrase → select gender"
			categories={GENDER_CATEGORIES}
			reverseDimension={{
				options: GENDER_DIMENSION_OPTIONS,
				getCorrectId: (item) => item.dimension ?? "",
			}}
		/>
	);
}
