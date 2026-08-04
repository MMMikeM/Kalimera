import { createFileRoute } from "@tanstack/react-router";

import { greekToPhonetic } from "@/lib/greek-transliteration";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";
import { GENDER_DIMENSION_OPTIONS } from "../../components/engines/drill-constants";

const item = (
	id: string,
	greek: string,
	english: string,
	label: string,
	category: string,
	dimension: string,
): SimpleListItem => ({
	id,
	greek,
	greeklish: greekToPhonetic(greek),
	english,
	label,
	category,
	dimension,
});

export const WHICH_PHRASES: SimpleListItem[] = [
	// Doer
	item("qw-poios-kafes", "ποιος καφές", "which coffee?", "which coffee?", "doer", "masculine"),
	item("qw-poia-mera", "ποια μέρα", "which day?", "which day?", "doer", "feminine"),
	item("qw-poia-tsanta", "ποια τσάντα", "which bag?", "which bag?", "doer", "feminine"),
	item("qw-poio-spiti", "ποιο σπίτι", "which house?", "which house?", "doer", "neuter"),
	item("qw-poio-paidi", "ποιο παιδί", "which child?", "which child?", "doer", "neuter"),

	// Target
	item(
		"qw-poion-kafe",
		"ποιον καφέ",
		"which coffee?",
		"which coffee? (you want it)",
		"target",
		"masculine",
	),
	item(
		"qw-poion-antra",
		"ποιον άντρα",
		"which man?",
		"which man? (you see him)",
		"target",
		"masculine",
	),
	item(
		"qw-poia-tainia",
		"ποια ταινία",
		"which film?",
		"which film? (you're watching it)",
		"target",
		"feminine",
	),
	item(
		"qw-poio-vivlio",
		"ποιο βιβλίο",
		"which book?",
		"which book? (you're reading it)",
		"target",
		"neuter",
	),

	// Owner
	item(
		"qw-poianou-filou",
		"ποιανού φίλου",
		"which friend's?",
		"which friend's? (m)",
		"owner",
		"masculine",
	),
	item(
		"qw-poianis-gynaikas",
		"ποιανής γυναίκας",
		"which woman's?",
		"which woman's?",
		"owner",
		"feminine",
	),
	item(
		"qw-poianou-paidiou",
		"ποιανού παιδιού",
		"which child's?",
		"which child's?",
		"owner",
		"neuter",
	),

	// Plural
	item(
		"qw-poioi-filoi",
		"ποιοι φίλοι",
		"which friends?",
		"which friends? (m)",
		"plural",
		"masculine",
	),
	item("qw-poies-meres", "ποιες μέρες", "which days?", "which days?", "plural", "feminine"),
	item("qw-poia-paidia", "ποια παιδιά", "which children?", "which children?", "plural", "neuter"),
];

const CATEGORIES = [
	{ id: "doer", label: "Doer" },
	{ id: "target", label: "Target" },
	{ id: "owner", label: "Owner" },
	{ id: "plural", label: "Plural" },
];

export const Route = createFileRoute("/practice/blocks/question-words/which-phrase")({
	component: WhichPhraseDrill,
});

function WhichPhraseDrill() {
	return (
		<Drill
			drillId="blocks-qw-which-phrase"
			items={WHICH_PHRASES}
			title="Which + noun"
			subtitle={`${WHICH_PHRASES.length} phrases / timed`}
			colorTheme="terracotta"
			backTo="/practice/blocks/question-words/"
			forwardDesc="English → ποιος + noun, agreeing"
			reverseLabel="Greek → gender"
			reverseDesc="Phrase → select gender"
			categories={CATEGORIES}
			reverse={{
				kind: "single-select",
				options: GENDER_DIMENSION_OPTIONS,
				getCorrectId: (form) => String(form.dimension ?? ""),
			}}
		/>
	);
}
