import { SPEEDS } from "../../drill-speeds";
import { GENDER_DIMENSION_OPTIONS, GENDER_PLURAL_CATEGORIES } from "../../engines/drill-constants";
import { SimpleListDrill, type SimpleListItem } from "../../engines/simple-list-drill";

// Target (accusative) noun phrase capstone — article + adjective + noun.
// Singular: τον/τη(ν)/το + adj(sg, acc) + noun(sg, acc)
// Plural:   τους/τις/τα + adj(pl, acc) + noun(pl, acc)
// Forward: "the good friend (m, target)" → type "ton kalo filo"
// Reverse: show Greek phrase → tap gender chip

export const PHRASES: SimpleListItem[] = [
	// ── Singular masculine ──────────────────────────────────────────────────────
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

	// ── Singular feminine ───────────────────────────────────────────────────────
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

	// ── Singular neuter ─────────────────────────────────────────────────────────
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

	// ── Plural masculine ────────────────────────────────────────────────────────
	{
		id: "kalous-filous",
		greek: "τους καλούς φίλους",
		greeklish: "tous kalous filous",
		english: "the good friends (m, pl, target)",
		label: "τους καλούς φίλους",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "megalous-dromous",
		greek: "τους μεγάλους δρόμους",
		greeklish: "tous megalous dromous",
		english: "the big roads (pl, target)",
		label: "τους μεγάλους δρόμους",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "neous-daskalous",
		greek: "τους νέους δασκάλους",
		greeklish: "tous neous daskalous",
		english: "the new teachers (m, pl, target)",
		label: "τους νέους δασκάλους",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "mikrous-skylous",
		greek: "τους μικρούς σκύλους",
		greeklish: "tous mikrous skylous",
		english: "the small dogs (pl, target)",
		label: "τους μικρούς σκύλους",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "omorfous-anthropous",
		greek: "τους όμορφους ανθρώπους",
		greeklish: "tous omorfous anthropous",
		english: "the handsome people (pl, target)",
		label: "τους όμορφους ανθρώπους",
		category: "plural",
		dimension: "masculine",
	},

	// ── Plural feminine ─────────────────────────────────────────────────────────
	{
		id: "kales-meres-t",
		greek: "τις καλές μέρες",
		greeklish: "tis kales meres",
		english: "the good days (pl, target)",
		label: "τις καλές μέρες",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "megales-poleis-t",
		greek: "τις μεγάλες πόλεις",
		greeklish: "tis megales poleis",
		english: "the big cities (pl, target)",
		label: "τις μεγάλες πόλεις",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "nees-tainies-t",
		greek: "τις νέες ταινίες",
		greeklish: "tis nees tainies",
		english: "the new films (pl, target)",
		label: "τις νέες ταινίες",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "mikres-gates-t",
		greek: "τις μικρές γάτες",
		greeklish: "tis mikres gates",
		english: "the small cats (pl, target)",
		label: "τις μικρές γάτες",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "zestes-soupes-t",
		greek: "τις ζεστές σούπες",
		greeklish: "tis zestes soupes",
		english: "the hot soups (pl, target)",
		label: "τις ζεστές σούπες",
		category: "plural",
		dimension: "feminine",
	},

	// ── Plural neuter ───────────────────────────────────────────────────────────
	{
		id: "kala-spitia-t",
		greek: "τα καλά σπίτια",
		greeklish: "ta kala spitia",
		english: "the good houses (pl, target)",
		label: "τα καλά σπίτια",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "megala-provlimata-t",
		greek: "τα μεγάλα προβλήματα",
		greeklish: "ta megala provlimata",
		english: "the big problems (pl, target)",
		label: "τα μεγάλα προβλήματα",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "nea-aftokinita-t",
		greek: "τα νέα αυτοκίνητα",
		greeklish: "ta nea aftokinita",
		english: "the new cars (pl, target)",
		label: "τα νέα αυτοκίνητα",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "mikra-paidia-t",
		greek: "τα μικρά παιδιά",
		greeklish: "ta mikra paidia",
		english: "the small children (pl, target)",
		label: "τα μικρά παιδιά",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "krya-nera-t",
		greek: "τα κρύα νερά",
		greeklish: "ta krya nera",
		english: "the cold waters (pl, target)",
		label: "τα κρύα νερά",
		category: "plural",
		dimension: "neuter",
	},
];

export default function PhraseTargetDrill() {
	return (
		<SimpleListDrill
			drillId="nominal-phrase-target"
			items={PHRASES}
			title="Target phrase"
			subtitle="30 noun phrases / timed"
			colorTheme="terracotta"
			speeds={SPEEDS}
			forwardDesc="English → article + adjective + noun (Target form)"
			reverseLabel="Greek → gender"
			reverseDesc="Phrase → select gender"
			categories={GENDER_PLURAL_CATEGORIES}
			reverseDimension={{
				options: GENDER_DIMENSION_OPTIONS,
				getCorrectId: (item) => item.dimension ?? "",
			}}
		/>
	);
}
