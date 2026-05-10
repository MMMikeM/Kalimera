import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";
import {
	GENDER_DIMENSION_OPTIONS,
	GENDER_PLURAL_CATEGORIES,
} from "../../components/engines/drill-constants";

// Doer (nominative) noun phrase capstone — article + adjective + noun.
// Singular: ο/η/το + adj(sg) + noun(sg)
// Plural:   οι/οι/τα + adj(pl) + noun(pl)
// Forward: "the good friend (m)" → type "o kalos filos"
// Reverse: show Greek phrase → tap gender chip

export const PHRASES: SimpleListItem[] = [
	// ── Singular masculine ──────────────────────────────────────────────────────
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

	// ── Singular feminine ───────────────────────────────────────────────────────
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

	// ── Singular neuter ─────────────────────────────────────────────────────────
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

	// ── Plural masculine ────────────────────────────────────────────────────────
	{
		id: "kaloi-filoi",
		greek: "οι καλοί φίλοι",
		greeklish: "i kaloi filoi",
		english: "the good friends (m, pl)",
		label: "οι καλοί φίλοι",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "megaloi-dromoi",
		greek: "οι μεγάλοι δρόμοι",
		greeklish: "i megaloi dromoi",
		english: "the big roads (pl)",
		label: "οι μεγάλοι δρόμοι",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "neoi-daskaloi",
		greek: "οι νέοι δάσκαλοι",
		greeklish: "i neoi daskaloi",
		english: "the new teachers (m, pl)",
		label: "οι νέοι δάσκαλοι",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "mikroi-skyloi",
		greek: "οι μικροί σκύλοι",
		greeklish: "i mikroi skyloi",
		english: "the small dogs (pl)",
		label: "οι μικροί σκύλοι",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "omorfoi-anthropoi",
		greek: "οι όμορφοι άνθρωποι",
		greeklish: "i omorfoi anthropoi",
		english: "the handsome people (pl)",
		label: "οι όμορφοι άνθρωποι",
		category: "plural",
		dimension: "masculine",
	},

	// ── Plural feminine ─────────────────────────────────────────────────────────
	{
		id: "kales-meres",
		greek: "οι καλές μέρες",
		greeklish: "i kales meres",
		english: "the good days (pl)",
		label: "οι καλές μέρες",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "megales-poleis",
		greek: "οι μεγάλες πόλεις",
		greeklish: "i megales poleis",
		english: "the big cities (pl)",
		label: "οι μεγάλες πόλεις",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "nees-tainies",
		greek: "οι νέες ταινίες",
		greeklish: "i nees tainies",
		english: "the new films (pl)",
		label: "οι νέες ταινίες",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "mikres-gates",
		greek: "οι μικρές γάτες",
		greeklish: "i mikres gates",
		english: "the small cats (pl)",
		label: "οι μικρές γάτες",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "zestes-soupes",
		greek: "οι ζεστές σούπες",
		greeklish: "i zestes soupes",
		english: "the hot soups (pl)",
		label: "οι ζεστές σούπες",
		category: "plural",
		dimension: "feminine",
	},

	// ── Plural neuter ───────────────────────────────────────────────────────────
	{
		id: "kala-spitia",
		greek: "τα καλά σπίτια",
		greeklish: "ta kala spitia",
		english: "the good houses (pl)",
		label: "τα καλά σπίτια",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "megala-provlimata",
		greek: "τα μεγάλα προβλήματα",
		greeklish: "ta megala provlimata",
		english: "the big problems (pl)",
		label: "τα μεγάλα προβλήματα",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "nea-aftokinita",
		greek: "τα νέα αυτοκίνητα",
		greeklish: "ta nea aftokinita",
		english: "the new cars (pl)",
		label: "τα νέα αυτοκίνητα",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "mikra-paidia",
		greek: "τα μικρά παιδιά",
		greeklish: "ta mikra paidia",
		english: "the small children (pl)",
		label: "τα μικρά παιδιά",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "krya-nera",
		greek: "τα κρύα νερά",
		greeklish: "ta krya nera",
		english: "the cold waters (pl)",
		label: "τα κρύα νερά",
		category: "plural",
		dimension: "neuter",
	},
];

export const Route = createFileRoute("/practice/cases/nominative/phrase")({
	component: PhraseDoerDrill,
});

function PhraseDoerDrill() {
	return (
		<Drill
			backTo={"/practice/cases/"}
			drillId="nominal-phrase-doer"
			items={PHRASES}
			title="Doer phrase"
			subtitle="30 noun phrases / timed"
			colorTheme="ocean"
			forwardDesc="English → article + adjective + noun (Doer form)"
			reverseLabel="Greek → gender"
			reverseDesc="Phrase → select gender"
			categories={GENDER_PLURAL_CATEGORIES}
			reverse={{
				kind: "single-select",
				options: GENDER_DIMENSION_OPTIONS,
				getCorrectId: (item) => String(item.dimension ?? ""),
			}}
		/>
	);
}
