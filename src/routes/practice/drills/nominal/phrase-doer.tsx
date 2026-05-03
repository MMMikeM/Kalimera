import { SPEEDS } from "../../drill-speeds";
import { GENDER_CATEGORIES, GENDER_DIMENSION_OPTIONS } from "../../engines/drill-constants";
import { SimpleListDrill, type SimpleListItem } from "../../engines/simple-list-drill";

// Doer (nominative) noun phrase capstone — article + adjective + noun.
// Forward: "the good friend (m)" → type "o kalos filos" (matchPhonetic → ο καλός φίλος)
// Reverse: show "η μεγάλη πόλη" → tap gender chip
// Pure noun phrases — no verb. Tests article/adjective/noun integration in Doer form.

export const PHRASES: SimpleListItem[] = [
	// Masculine (ο + -ος adjective + masculine noun)
	{
		id: "kalos-filos",
		greek: "ο καλός φίλος",
		greeklish: "o kalos filos",
		english: "the good friend (m)",
		label: "ο καλός φίλος",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "megalos-dromos",
		greek: "ο μεγάλος δρόμος",
		greeklish: "o megalos dromos",
		english: "the big road",
		label: "ο μεγάλος δρόμος",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "neos-daskalos",
		greek: "ο νέος δάσκαλος",
		greeklish: "o neos daskalos",
		english: "the new teacher (m)",
		label: "ο νέος δάσκαλος",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "mikros-skylos",
		greek: "ο μικρός σκύλος",
		greeklish: "o mikros skylos",
		english: "the small dog",
		label: "ο μικρός σκύλος",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "omorfos-anthropos",
		greek: "ο όμορφος άνθρωπος",
		greeklish: "o omorfos anthropos",
		english: "the handsome person",
		label: "ο όμορφος άνθρωπος",
		category: "masculine",
		dimension: "masculine",
	},

	// Feminine (η + -η/-α adjective + feminine noun)
	{
		id: "kali-mera",
		greek: "η καλή μέρα",
		greeklish: "i kali mera",
		english: "the good day",
		label: "η καλή μέρα",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "megali-poli",
		greek: "η μεγάλη πόλη",
		greeklish: "i megali poli",
		english: "the big city",
		label: "η μεγάλη πόλη",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "nea-tainia",
		greek: "η νέα ταινία",
		greeklish: "i nea tainia",
		english: "the new film",
		label: "η νέα ταινία",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "mikri-gata",
		greek: "η μικρή γάτα",
		greeklish: "i mikri gata",
		english: "the small cat",
		label: "η μικρή γάτα",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "zesti-soupa",
		greek: "η ζεστή σούπα",
		greeklish: "i zesti soupa",
		english: "the hot soup",
		label: "η ζεστή σούπα",
		category: "feminine",
		dimension: "feminine",
	},

	// Neuter (το + -ο adjective + neuter noun)
	{
		id: "kalo-spiti",
		greek: "το καλό σπίτι",
		greeklish: "to kalo spiti",
		english: "the good house",
		label: "το καλό σπίτι",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "megalo-provlima",
		greek: "το μεγάλο πρόβλημα",
		greeklish: "to megalo provlima",
		english: "the big problem",
		label: "το μεγάλο πρόβλημα",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "neo-aftokinito",
		greek: "το νέο αυτοκίνητο",
		greeklish: "to neo aftokinito",
		english: "the new car",
		label: "το νέο αυτοκίνητο",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "mikro-paidi",
		greek: "το μικρό παιδί",
		greeklish: "to mikro paidi",
		english: "the small child",
		label: "το μικρό παιδί",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "kryo-nero",
		greek: "το κρύο νερό",
		greeklish: "to kryo nero",
		english: "the cold water",
		label: "το κρύο νερό",
		category: "neuter",
		dimension: "neuter",
	},
];

export default function PhraseDoerDrill() {
	return (
		<SimpleListDrill
			drillId="nominal-phrase-doer"
			items={PHRASES}
			title="Doer phrase"
			subtitle="15 noun phrases / timed"
			colorTheme="ocean"
			speeds={SPEEDS}
			forwardDesc="English → article + adjective + noun (Doer form)"
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
