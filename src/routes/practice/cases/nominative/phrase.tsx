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
		label: "the good friend (m)",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "megalos-dromos",
		greek: "ο μεγάλος δρόμος",
		label: "the big road",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "neos-daskalos",
		greek: "ο νέος δάσκαλος",
		label: "the new teacher (m)",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "mikros-skylos",
		greek: "ο μικρός σκύλος",
		label: "the small dog",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "omorfos-anthropos",
		greek: "ο όμορφος άνθρωπος",
		label: "the handsome person",
		category: "masculine",
		dimension: "masculine",
	},

	// ── Singular feminine ───────────────────────────────────────────────────────
	{
		id: "kali-mera",
		greek: "η καλή μέρα",
		label: "the good day",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "megali-poli",
		greek: "η μεγάλη πόλη",
		label: "the big city",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "nea-tainia",
		greek: "η νέα ταινία",
		label: "the new film",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "mikri-gata",
		greek: "η μικρή γάτα",
		label: "the small cat",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "zesti-soupa",
		greek: "η ζεστή σούπα",
		label: "the hot soup",
		category: "feminine",
		dimension: "feminine",
	},

	// ── Singular neuter ─────────────────────────────────────────────────────────
	{
		id: "kalo-spiti",
		greek: "το καλό σπίτι",
		label: "the good house",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "megalo-provlima",
		greek: "το μεγάλο πρόβλημα",
		label: "the big problem",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "neo-aftokinito",
		greek: "το νέο αυτοκίνητο",
		label: "the new car",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "mikro-paidi",
		greek: "το μικρό παιδί",
		label: "the small child",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "kryo-nero",
		greek: "το κρύο νερό",
		label: "the cold water",
		category: "neuter",
		dimension: "neuter",
	},

	// ── Plural masculine ────────────────────────────────────────────────────────
	{
		id: "kaloi-filoi",
		greek: "οι καλοί φίλοι",
		label: "the good friends (m, pl)",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "megaloi-dromoi",
		greek: "οι μεγάλοι δρόμοι",
		label: "the big roads (pl)",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "neoi-daskaloi",
		greek: "οι νέοι δάσκαλοι",
		label: "the new teachers (m, pl)",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "mikroi-skyloi",
		greek: "οι μικροί σκύλοι",
		label: "the small dogs (pl)",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "omorfoi-anthropoi",
		greek: "οι όμορφοι άνθρωποι",
		label: "the handsome people (pl)",
		category: "plural",
		dimension: "masculine",
	},

	// ── Plural feminine ─────────────────────────────────────────────────────────
	{
		id: "kales-meres",
		greek: "οι καλές μέρες",
		label: "the good days (pl)",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "megales-poleis",
		greek: "οι μεγάλες πόλεις",
		label: "the big cities (pl)",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "nees-tainies",
		greek: "οι νέες ταινίες",
		label: "the new films (pl)",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "mikres-gates",
		greek: "οι μικρές γάτες",
		label: "the small cats (pl)",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "zestes-soupes",
		greek: "οι ζεστές σούπες",
		label: "the hot soups (pl)",
		category: "plural",
		dimension: "feminine",
	},

	// ── Plural neuter ───────────────────────────────────────────────────────────
	{
		id: "kala-spitia",
		greek: "τα καλά σπίτια",
		label: "the good houses (pl)",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "megala-provlimata",
		greek: "τα μεγάλα προβλήματα",
		label: "the big problems (pl)",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "nea-aftokinita",
		greek: "τα νέα αυτοκίνητα",
		label: "the new cars (pl)",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "mikra-paidia",
		greek: "τα μικρά παιδιά",
		label: "the small children (pl)",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "krya-nera",
		greek: "τα κρύα νερά",
		label: "the cold waters (pl)",
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
