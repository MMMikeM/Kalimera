import { SPEEDS } from "../../drill-speeds";
import { GENDER_STYLE } from "../../engines/drill-constants";
import { SimpleListDrill, type SimpleListItem } from "../../engines/simple-list-drill";

// Target (accusative) noun phrase capstone — article + adjective + noun in target form.
// Forward: "the good friend (target)" → type "ton kalo filo"
// Reverse: show "τη μεγάλη πόλη" → tap gender chip
// Pure noun phrases. Tests article/adjective/noun integration in Target form.

export const PHRASES: SimpleListItem[] = [
	// Masculine target: τον + -ο + -ο
	{
		id: "kalo-filo",
		greek: "τον καλό φίλο",
		greeklish: "ton kalo filo",
		english: "the good friend (m, target)",
		label: "τον καλό φίλο",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "megalo-dromo",
		greek: "τον μεγάλο δρόμο",
		greeklish: "ton megalo dromo",
		english: "the big road (target)",
		label: "τον μεγάλο δρόμο",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "neo-daskalo",
		greek: "τον νέο δάσκαλο",
		greeklish: "ton neo daskalo",
		english: "the new teacher (m, target)",
		label: "τον νέο δάσκαλο",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "mikro-skylo",
		greek: "τον μικρό σκύλο",
		greeklish: "ton mikro skylo",
		english: "the small dog (target)",
		label: "τον μικρό σκύλο",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "omorfo-anthropo",
		greek: "τον όμορφο άνθρωπο",
		greeklish: "ton omorfo anthropo",
		english: "the handsome person (target)",
		label: "τον όμορφο άνθρωπο",
		category: "masculine",
		dimension: "masculine",
	},

	// Feminine target: τη(ν) + -η/-α + -η/-α (often unchanged from nominative)
	{
		id: "kali-mera-t",
		greek: "την καλή μέρα",
		greeklish: "tin kali mera",
		english: "the good day (target)",
		label: "την καλή μέρα",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "megali-poli-t",
		greek: "τη μεγάλη πόλη",
		greeklish: "ti megali poli",
		english: "the big city (target)",
		label: "τη μεγάλη πόλη",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "nea-tainia-t",
		greek: "τη νέα ταινία",
		greeklish: "ti nea tainia",
		english: "the new film (target)",
		label: "τη νέα ταινία",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "mikri-gata-t",
		greek: "τη μικρή γάτα",
		greeklish: "ti mikri gata",
		english: "the small cat (target)",
		label: "τη μικρή γάτα",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "zesti-soupa-t",
		greek: "τη ζεστή σούπα",
		greeklish: "ti zesti soupa",
		english: "the hot soup (target)",
		label: "τη ζεστή σούπα",
		category: "feminine",
		dimension: "feminine",
	},

	// Neuter target: το + -ο + -ο (unchanged from nominative)
	{
		id: "kalo-spiti-t",
		greek: "το καλό σπίτι",
		greeklish: "to kalo spiti",
		english: "the good house (target)",
		label: "το καλό σπίτι",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "megalo-provlima-t",
		greek: "το μεγάλο πρόβλημα",
		greeklish: "to megalo provlima",
		english: "the big problem (target)",
		label: "το μεγάλο πρόβλημα",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "neo-aftokinito-t",
		greek: "το νέο αυτοκίνητο",
		greeklish: "to neo aftokinito",
		english: "the new car (target)",
		label: "το νέο αυτοκίνητο",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "mikro-paidi-t",
		greek: "το μικρό παιδί",
		greeklish: "to mikro paidi",
		english: "the small child (target)",
		label: "το μικρό παιδί",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "kryo-nero-t",
		greek: "το κρύο νερό",
		greeklish: "to kryo nero",
		english: "the cold water (target)",
		label: "το κρύο νερό",
		category: "neuter",
		dimension: "neuter",
	},
];

const CATEGORIES = [
	{ id: "masculine", label: "Masculine" },
	{ id: "feminine", label: "Feminine" },
	{ id: "neuter", label: "Neuter" },
];

const DIMENSION_OPTIONS = [
	{ id: "masculine", label: "Masculine", ...GENDER_STYLE.masculine },
	{ id: "feminine", label: "Feminine", ...GENDER_STYLE.feminine },
	{ id: "neuter", label: "Neuter", ...GENDER_STYLE.neuter },
];

export default function PhraseTargetDrill() {
	return (
		<SimpleListDrill
			drillId="nominal-phrase-target"
			items={PHRASES}
			title="Target phrase"
			subtitle="15 noun phrases / timed"
			colorTheme="terracotta"
			speeds={SPEEDS}
			forwardDesc="English → article + adjective + noun (Target form)"
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
