import { createFileRoute } from "@tanstack/react-router";

import { greekToPhonetic } from "@/lib/greek-transliteration";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";
import {
	GENDER_DIMENSION_OPTIONS,
	GENDER_PLURAL_CATEGORIES,
} from "../../components/engines/drill-constants";

const item = (
	id: string,
	greek: string,
	english: string,
	label: string,
	dimension: string,
	category?: string,
): SimpleListItem => ({
	id,
	greek,
	greeklish: greekToPhonetic(greek),
	english,
	label,
	dimension,
	category,
});

// Masculine singular is the only πόσος form that visibly changes case
// (πόσος καιρός → πόσο καιρό), so Target items live in the masculine category.
// Genitive πόσου/πόσης is deliberately excluded — rare in modern speech.
export const HOW_MANY_PHRASES: SimpleListItem[] = [
	// Masculine singular
	item("qw-posos-kairos", "πόσος καιρός", "how much time?", "how much time?", "masculine", "masculine"),
	item("qw-posos-kosmos", "πόσος κόσμος", "how many people?", "how many people? (crowd)", "masculine", "masculine"),
	item("qw-poso-kairo", "πόσο καιρό", "how long?", "how long? (for how much time)", "masculine", "masculine"),
	item("qw-poso-chrono", "πόσο χρόνο", "how much time?", "how much time? (you need it)", "masculine", "masculine"),

	// Feminine singular
	item("qw-posi-zachari", "πόση ζάχαρη", "how much sugar?", "how much sugar?", "feminine", "feminine"),
	item("qw-posi-ora", "πόση ώρα", "how long?", "how long? (hours, minutes)", "feminine", "feminine"),

	// Neuter singular
	item("qw-poso-gala", "πόσο γάλα", "how much milk?", "how much milk?", "neuter", "neuter"),
	item("qw-poso-psomi", "πόσο ψωμί", "how much bread?", "how much bread?", "neuter", "neuter"),

	// Plural
	item("qw-posoi-filoi", "πόσοι φίλοι", "how many friends?", "how many friends? (m)", "masculine", "plural"),
	item("qw-posoi-anthropoi", "πόσοι άνθρωποι", "how many people?", "how many people? (individuals)", "masculine", "plural"),
	item("qw-poses-meres", "πόσες μέρες", "how many days?", "how many days?", "feminine", "plural"),
	item("qw-poses-ores", "πόσες ώρες", "how many hours?", "how many hours?", "feminine", "plural"),
	item("qw-posa-paidia", "πόσα παιδιά", "how many children?", "how many children?", "neuter", "plural"),
	item("qw-posa-chronia", "πόσα χρόνια", "how many years?", "how many years?", "neuter", "plural"),

	// Invariable usage — appears under "All" only
	item("qw-poso-kanei", "πόσο κάνει", "how much does it cost?", "how much does it cost?", "invariable"),
];

const REVERSE_OPTIONS = [
	...GENDER_DIMENSION_OPTIONS,
	{ id: "invariable", label: "Doesn't change", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
];

export const Route = createFileRoute("/practice/blocks/question-words/how-many-phrase")({
	component: HowManyPhraseDrill,
});

function HowManyPhraseDrill() {
	return (
		<Drill
			drillId="blocks-qw-how-many-phrase"
			items={HOW_MANY_PHRASES}
			title="How much + noun"
			subtitle={`${HOW_MANY_PHRASES.length} phrases / timed`}
			colorTheme="terracotta"
			backTo="/practice/blocks/question-words/"
			forwardDesc="English → πόσος + noun, agreeing"
			reverseLabel="Greek → gender"
			reverseDesc="Phrase → select gender"
			categories={GENDER_PLURAL_CATEGORIES}
			reverse={{
				kind: "single-select",
				options: REVERSE_OPTIONS,
				getCorrectId: (form) => String(form.dimension ?? ""),
			}}
		/>
	);
}
