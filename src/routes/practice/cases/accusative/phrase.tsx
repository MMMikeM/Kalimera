import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";
import {
	GENDER_DIMENSION_OPTIONS,
	GENDER_PLURAL_CATEGORIES,
} from "../../components/engines/drill-constants";

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
		label: "the good friend (m, target)",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "megalo-dromo",
		greek: "τον μεγάλο δρόμο",
		label: "the big road (target)",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "neo-daskalo",
		greek: "τον νέο δάσκαλο",
		label: "the new teacher (m, target)",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "mikro-skylo",
		greek: "τον μικρό σκύλο",
		label: "the small dog (target)",
		category: "masculine",
		dimension: "masculine",
	},
	{
		id: "omorfo-anthropo",
		greek: "τον όμορφο άνθρωπο",
		label: "the handsome person (target)",
		category: "masculine",
		dimension: "masculine",
	},

	// ── Singular feminine ───────────────────────────────────────────────────────
	{
		id: "kali-mera-t",
		greek: "την καλή μέρα",
		label: "the good day (target)",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "megali-poli-t",
		greek: "τη μεγάλη πόλη",
		label: "the big city (target)",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "nea-tainia-t",
		greek: "τη νέα ταινία",
		label: "the new film (target)",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "mikri-gata-t",
		greek: "τη μικρή γάτα",
		label: "the small cat (target)",
		category: "feminine",
		dimension: "feminine",
	},
	{
		id: "zesti-soupa-t",
		greek: "τη ζεστή σούπα",
		label: "the hot soup (target)",
		category: "feminine",
		dimension: "feminine",
	},

	// ── Singular neuter ─────────────────────────────────────────────────────────
	{
		id: "kalo-spiti-t",
		greek: "το καλό σπίτι",
		label: "the good house (target)",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "megalo-provlima-t",
		greek: "το μεγάλο πρόβλημα",
		label: "the big problem (target)",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "neo-aftokinito-t",
		greek: "το νέο αυτοκίνητο",
		label: "the new car (target)",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "mikro-paidi-t",
		greek: "το μικρό παιδί",
		label: "the small child (target)",
		category: "neuter",
		dimension: "neuter",
	},
	{
		id: "kryo-nero-t",
		greek: "το κρύο νερό",
		label: "the cold water (target)",
		category: "neuter",
		dimension: "neuter",
	},

	// ── Plural masculine ────────────────────────────────────────────────────────
	{
		id: "kalous-filous",
		greek: "τους καλούς φίλους",
		label: "the good friends (m, pl, target)",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "megalous-dromous",
		greek: "τους μεγάλους δρόμους",
		label: "the big roads (pl, target)",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "neous-daskalous",
		greek: "τους νέους δασκάλους",
		label: "the new teachers (m, pl, target)",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "mikrous-skylous",
		greek: "τους μικρούς σκύλους",
		label: "the small dogs (pl, target)",
		category: "plural",
		dimension: "masculine",
	},
	{
		id: "omorfous-anthropous",
		greek: "τους όμορφους ανθρώπους",
		label: "the handsome people (pl, target)",
		category: "plural",
		dimension: "masculine",
	},

	// ── Plural feminine ─────────────────────────────────────────────────────────
	{
		id: "kales-meres-t",
		greek: "τις καλές μέρες",
		label: "the good days (pl, target)",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "megales-poleis-t",
		greek: "τις μεγάλες πόλεις",
		label: "the big cities (pl, target)",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "nees-tainies-t",
		greek: "τις νέες ταινίες",
		label: "the new films (pl, target)",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "mikres-gates-t",
		greek: "τις μικρές γάτες",
		label: "the small cats (pl, target)",
		category: "plural",
		dimension: "feminine",
	},
	{
		id: "zestes-soupes-t",
		greek: "τις ζεστές σούπες",
		label: "the hot soups (pl, target)",
		category: "plural",
		dimension: "feminine",
	},

	// ── Plural neuter ───────────────────────────────────────────────────────────
	{
		id: "kala-spitia-t",
		greek: "τα καλά σπίτια",
		label: "the good houses (pl, target)",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "megala-provlimata-t",
		greek: "τα μεγάλα προβλήματα",
		label: "the big problems (pl, target)",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "nea-aftokinita-t",
		greek: "τα νέα αυτοκίνητα",
		label: "the new cars (pl, target)",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "mikra-paidia-t",
		greek: "τα μικρά παιδιά",
		label: "the small children (pl, target)",
		category: "plural",
		dimension: "neuter",
	},
	{
		id: "krya-nera-t",
		greek: "τα κρύα νερά",
		label: "the cold waters (pl, target)",
		category: "plural",
		dimension: "neuter",
	},
];

export const Route = createFileRoute("/practice/cases/accusative/phrase")({
	component: PhraseTargetDrill,
});

function PhraseTargetDrill() {
	return (
		<Drill
			backTo={"/practice/cases/"}
			drillId="nominal-phrase-target"
			items={PHRASES}
			title="Target phrase"
			subtitle="30 noun phrases / timed"
			colorTheme="terracotta"
			forwardDesc="English → article + adjective + noun (Target form)"
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
