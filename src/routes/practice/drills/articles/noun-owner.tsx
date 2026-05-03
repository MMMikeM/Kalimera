import { SPEEDS } from "../../drill-speeds";
import { GENDER_STYLE } from "../../engines/drill-constants";
import { SimpleListDrill, type SimpleListItem } from "../../engines/simple-list-drill";

// Forward: "of the friend" → type "tou filou" (matchPhonetic → του φίλου)
// Reverse: show "του φίλου" → tap masculine / feminine / neuter chip
// 15 nouns × Owner (genitive) form, mixing genders.

const NOUNS: SimpleListItem[] = [
	// Masculine: του + -ου (or -α for -ας nouns)
	{
		id: "andra",
		greek: "του άντρα",
		greeklish: "tou andra",
		english: "of the man",
		label: "masculine",
		category: "masculine",
		dimension: "masculine",
		reverseGreek: "του άντρα",
	},
	{
		id: "filou",
		greek: "του φίλου",
		greeklish: "tou filou",
		english: "of the friend (m)",
		label: "masculine",
		category: "masculine",
		dimension: "masculine",
		reverseGreek: "του φίλου",
	},
	{
		id: "dromou",
		greek: "του δρόμου",
		greeklish: "tou dromou",
		english: "of the road",
		label: "masculine",
		category: "masculine",
		dimension: "masculine",
		reverseGreek: "του δρόμου",
	},
	{
		id: "anthropou",
		greek: "του ανθρώπου",
		greeklish: "tou anthropou",
		english: "of the person",
		label: "masculine",
		category: "masculine",
		dimension: "masculine",
		reverseGreek: "του ανθρώπου",
	},
	{
		id: "kairou",
		greek: "του καιρού",
		greeklish: "tou kairou",
		english: "of the weather / time",
		label: "masculine",
		category: "masculine",
		dimension: "masculine",
		reverseGreek: "του καιρού",
	},

	// Feminine: της + -ης / -ας
	{
		id: "meras",
		greek: "της μέρας",
		greeklish: "tis meras",
		english: "of the day",
		label: "feminine",
		category: "feminine",
		dimension: "feminine",
		reverseGreek: "της μέρας",
	},
	{
		id: "oras",
		greek: "της ώρας",
		greeklish: "tis oras",
		english: "of the hour",
		label: "feminine",
		category: "feminine",
		dimension: "feminine",
		reverseGreek: "της ώρας",
	},
	{
		id: "nichtas",
		greek: "της νύχτας",
		greeklish: "tis nichtas",
		english: "of the night",
		label: "feminine",
		category: "feminine",
		dimension: "feminine",
		reverseGreek: "της νύχτας",
	},
	{
		id: "glossas",
		greek: "της γλώσσας",
		greeklish: "tis glossas",
		english: "of the language",
		label: "feminine",
		category: "feminine",
		dimension: "feminine",
		reverseGreek: "της γλώσσας",
	},
	{
		id: "oikogeneias",
		greek: "της οικογένειας",
		greeklish: "tis oikogeneias",
		english: "of the family",
		label: "feminine",
		category: "feminine",
		dimension: "feminine",
		reverseGreek: "της οικογένειας",
	},

	// Neuter: του + -ού / -ιού / -τος
	{
		id: "spitiou",
		greek: "του σπιτιού",
		greeklish: "tou spitiou",
		english: "of the house",
		label: "neuter",
		category: "neuter",
		dimension: "neuter",
		reverseGreek: "του σπιτιού",
	},
	{
		id: "nerou",
		greek: "του νερού",
		greeklish: "tou nerou",
		english: "of the water",
		label: "neuter",
		category: "neuter",
		dimension: "neuter",
		reverseGreek: "του νερού",
	},
	{
		id: "paidiou",
		greek: "του παιδιού",
		greeklish: "tou paidiou",
		english: "of the child",
		label: "neuter",
		category: "neuter",
		dimension: "neuter",
		reverseGreek: "του παιδιού",
	},
	{
		id: "aftokinitou",
		greek: "του αυτοκινήτου",
		greeklish: "tou aftokinitou",
		english: "of the car",
		label: "neuter",
		category: "neuter",
		dimension: "neuter",
		reverseGreek: "του αυτοκινήτου",
	},
	{
		id: "trapeziou",
		greek: "του τραπεζιού",
		greeklish: "tou trapeziou",
		english: "of the table",
		label: "neuter",
		category: "neuter",
		dimension: "neuter",
		reverseGreek: "του τραπεζιού",
	},
];

const CATEGORIES = [
	{ id: "masculine", label: "Masculine (του)" },
	{ id: "feminine", label: "Feminine (της)" },
	{ id: "neuter", label: "Neuter (του)" },
];

const DIMENSION_OPTIONS = [
	{ id: "masculine", label: "Masculine", ...GENDER_STYLE.masculine },
	{ id: "feminine", label: "Feminine", ...GENDER_STYLE.feminine },
	{ id: "neuter", label: "Neuter", ...GENDER_STYLE.neuter },
];

export default function NounOwnerDrill() {
	return (
		<SimpleListDrill
			drillId="nominal-noun-owner"
			items={NOUNS}
			title="Noun (Owner)"
			subtitle="15 nouns / timed"
			colorTheme="olive"
			speeds={SPEEDS}
			forwardDesc="English → article + noun (Owner form)"
			reverseLabel="Greek → gender"
			reverseDesc="Phrase → select gender"
			categories={CATEGORIES}
			reverseDimension={{
				options: DIMENSION_OPTIONS,
				getCorrectId: (item) => item.dimension ?? "",
			}}
		/>
	);
}
