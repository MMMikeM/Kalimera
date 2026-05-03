import { SPEEDS } from "../../drill-speeds";
import { GENDER_STYLE } from "../../engines/drill-constants";
import { SimpleListDrill, type SimpleListItem } from "../../engines/simple-list-drill";

// Forward: "the friend (target)" → type "ton filo" (matchPhonetic → τον φίλο)
// Reverse: show "τον φίλο" → tap masculine / feminine / neuter chip
// 15 nouns × Target (accusative) form, mixing genders.

const NOUNS: SimpleListItem[] = [
	// Masculine: τον + -ο
	{
		id: "andra",
		greek: "τον άντρα",
		greeklish: "ton andra",
		english: "man (target)",
		label: "masculine",
		category: "masculine",
		dimension: "masculine",
		reverseGreek: "τον άντρα",
	},
	{
		id: "filo",
		greek: "τον φίλο",
		greeklish: "ton filo",
		english: "friend (m, target)",
		label: "masculine",
		category: "masculine",
		dimension: "masculine",
		reverseGreek: "τον φίλο",
	},
	{
		id: "dromo",
		greek: "τον δρόμο",
		greeklish: "ton dromo",
		english: "road (target)",
		label: "masculine",
		category: "masculine",
		dimension: "masculine",
		reverseGreek: "τον δρόμο",
	},
	{
		id: "anthropo",
		greek: "τον άνθρωπο",
		greeklish: "ton anthropo",
		english: "person (target)",
		label: "masculine",
		category: "masculine",
		dimension: "masculine",
		reverseGreek: "τον άνθρωπο",
	},
	{
		id: "kairo",
		greek: "τον καιρό",
		greeklish: "ton kairo",
		english: "weather / time (target)",
		label: "masculine",
		category: "masculine",
		dimension: "masculine",
		reverseGreek: "τον καιρό",
	},

	// Feminine: τη(ν) + (mostly unchanged from nominative)
	{
		id: "mera",
		greek: "τη μέρα",
		greeklish: "ti mera",
		english: "day (target)",
		label: "feminine",
		category: "feminine",
		dimension: "feminine",
		reverseGreek: "τη μέρα",
	},
	{
		id: "ora",
		greek: "την ώρα",
		greeklish: "tin ora",
		english: "hour (target)",
		label: "feminine",
		category: "feminine",
		dimension: "feminine",
		reverseGreek: "την ώρα",
	},
	{
		id: "nichta",
		greek: "τη νύχτα",
		greeklish: "ti nichta",
		english: "night (target)",
		label: "feminine",
		category: "feminine",
		dimension: "feminine",
		reverseGreek: "τη νύχτα",
	},
	{
		id: "glossa",
		greek: "τη γλώσσα",
		greeklish: "ti glossa",
		english: "language (target)",
		label: "feminine",
		category: "feminine",
		dimension: "feminine",
		reverseGreek: "τη γλώσσα",
	},
	{
		id: "oikogeneia",
		greek: "την οικογένεια",
		greeklish: "tin oikogeneia",
		english: "family (target)",
		label: "feminine",
		category: "feminine",
		dimension: "feminine",
		reverseGreek: "την οικογένεια",
	},

	// Neuter: το + (unchanged from nominative)
	{
		id: "spiti",
		greek: "το σπίτι",
		greeklish: "to spiti",
		english: "house (target)",
		label: "neuter",
		category: "neuter",
		dimension: "neuter",
		reverseGreek: "το σπίτι",
	},
	{
		id: "nero",
		greek: "το νερό",
		greeklish: "to nero",
		english: "water (target)",
		label: "neuter",
		category: "neuter",
		dimension: "neuter",
		reverseGreek: "το νερό",
	},
	{
		id: "paidi",
		greek: "το παιδί",
		greeklish: "to paidi",
		english: "child (target)",
		label: "neuter",
		category: "neuter",
		dimension: "neuter",
		reverseGreek: "το παιδί",
	},
	{
		id: "aftokinito",
		greek: "το αυτοκίνητο",
		greeklish: "to aftokinito",
		english: "car (target)",
		label: "neuter",
		category: "neuter",
		dimension: "neuter",
		reverseGreek: "το αυτοκίνητο",
	},
	{
		id: "trapezi",
		greek: "το τραπέζι",
		greeklish: "to trapezi",
		english: "table (target)",
		label: "neuter",
		category: "neuter",
		dimension: "neuter",
		reverseGreek: "το τραπέζι",
	},
];

const CATEGORIES = [
	{ id: "masculine", label: "Masculine (τον)" },
	{ id: "feminine", label: "Feminine (τη/την)" },
	{ id: "neuter", label: "Neuter (το)" },
];

const DIMENSION_OPTIONS = [
	{ id: "masculine", label: "Masculine", ...GENDER_STYLE.masculine },
	{ id: "feminine", label: "Feminine", ...GENDER_STYLE.feminine },
	{ id: "neuter", label: "Neuter", ...GENDER_STYLE.neuter },
];

export default function NounTargetDrill() {
	return (
		<SimpleListDrill
			drillId="nominal-noun-target"
			items={NOUNS}
			title="Noun (Target)"
			subtitle="15 nouns / timed"
			colorTheme="terracotta"
			speeds={SPEEDS}
			forwardDesc="English → article + noun (Target form)"
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
