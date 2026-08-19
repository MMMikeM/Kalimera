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
		english: "the good friend (m)",
		label: "ο καλός φίλος",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "megalos-dromos",
		greek: "ο μεγάλος δρόμος",
		english: "the big road",
		label: "ο μεγάλος δρόμος",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "neos-daskalos",
		greek: "ο νέος δάσκαλος",
		english: "the new teacher (m)",
		label: "ο νέος δάσκαλος",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "mikros-skylos",
		greek: "ο μικρός σκύλος",
		english: "the small dog",
		label: "ο μικρός σκύλος",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "omorfos-anthropos",
		greek: "ο όμορφος άνθρωπος",
		english: "the handsome person",
		label: "ο όμορφος άνθρωπος",
		category: "masculine",
		dimension: "masculine",
	},

	// ── Singular feminine ───────────────────────────────────────────────────────
	{
		id: "kali-mera",
		greek: "η καλή μέρα",
		english: "the good day",
		label: "η καλή μέρα",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "megali-poli",
		greek: "η μεγάλη πόλη",
		english: "the big city",
		label: "η μεγάλη πόλη",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "nea-tainia",
		greek: "η νέα ταινία",
		english: "the new film",
		label: "η νέα ταινία",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "mikri-gata",
		greek: "η μικρή γάτα",
		english: "the small cat",
		label: "η μικρή γάτα",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "zesti-soupa",
		greek: "η ζεστή σούπα",
		english: "the hot soup",
		label: "η ζεστή σούπα",
		category: "feminine",
		dimension: "feminine",
	},

	// ── Singular neuter ─────────────────────────────────────────────────────────
	{
		id: "kalo-spiti",
		greek: "το καλό σπίτι",
		english: "the good house",
		label: "το καλό σπίτι",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "megalo-provlima",
		greek: "το μεγάλο πρόβλημα",
		english: "the big problem",
		label: "το μεγάλο πρόβλημα",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "neo-aftokinito",
		greek: "το νέο αυτοκίνητο",
		english: "the new car",
		label: "το νέο αυτοκίνητο",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "mikro-paidi",
		greek: "το μικρό παιδί",
		english: "the small child",
		label: "το μικρό παιδί",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "kryo-nero",
		greek: "το κρύο νερό",
		english: "the cold water",
		label: "το κρύο νερό",
		category: "neuter",
		dimension: "neuter",
	},

	// ── Plural masculine ────────────────────────────────────────────────────────
	{
		id: "kaloi-filoi",
		greek: "οι καλοί φίλοι",
		english: "the good friends (m, pl)",
		label: "οι καλοί φίλοι",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "megaloi-dromoi",
		greek: "οι μεγάλοι δρόμοι",
		english: "the big roads (pl)",
		label: "οι μεγάλοι δρόμοι",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "neoi-daskaloi",
		greek: "οι νέοι δάσκαλοι",
		english: "the new teachers (m, pl)",
		label: "οι νέοι δάσκαλοι",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "mikroi-skyloi",
		greek: "οι μικροί σκύλοι",
		english: "the small dogs (pl)",
		label: "οι μικροί σκύλοι",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "omorfoi-anthropoi",
		greek: "οι όμορφοι άνθρωποι",
		english: "the handsome people (pl)",
		label: "οι όμορφοι άνθρωποι",
		category: "plural",
		dimension: "masculine",
	},

	// ── Plural feminine ─────────────────────────────────────────────────────────
	{
		id: "kales-meres",
		greek: "οι καλές μέρες",
		english: "the good days (pl)",
		label: "οι καλές μέρες",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "megales-poleis",
		greek: "οι μεγάλες πόλεις",
		english: "the big cities (pl)",
		label: "οι μεγάλες πόλεις",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "nees-tainies",
		greek: "οι νέες ταινίες",
		english: "the new films (pl)",
		label: "οι νέες ταινίες",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "mikres-gates",
		greek: "οι μικρές γάτες",
		english: "the small cats (pl)",
		label: "οι μικρές γάτες",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "zestes-soupes",
		greek: "οι ζεστές σούπες",
		english: "the hot soups (pl)",
		label: "οι ζεστές σούπες",
		category: "plural",
		dimension: "feminine",
	},

	// ── Plural neuter ───────────────────────────────────────────────────────────
	{
		id: "kala-spitia",
		greek: "τα καλά σπίτια",
		english: "the good houses (pl)",
		label: "τα καλά σπίτια",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "megala-provlimata",
		greek: "τα μεγάλα προβλήματα",
		english: "the big problems (pl)",
		label: "τα μεγάλα προβλήματα",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "nea-aftokinita",
		greek: "τα νέα αυτοκίνητα",
		english: "the new cars (pl)",
		label: "τα νέα αυτοκίνητα",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "mikra-paidia",
		greek: "τα μικρά παιδιά",
		english: "the small children (pl)",
		label: "τα μικρά παιδιά",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "krya-nera",
		greek: "τα κρύα νερά",
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
