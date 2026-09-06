import { createFileRoute } from "@tanstack/react-router";

import type { Gender } from "@/server/db/enums";

import { GENDER_CHIP, HERO_TEXT, NUMBER_CHIP, PERSON_CHIP } from "../components/engines/chip-specs";
import type { DrillForm } from "../components/engines/deck";
import { Drill, type DimensionSpec } from "../components/engines/drill";
import { GENDER_STYLE, PERSON_LABELS } from "../components/engines/drill-constants";
import { ForwardPromptCard } from "../components/engines/forward-prompt-card";
import { NUMBER_COLUMNS, Paradigm, type ParadigmRow } from "../components/paradigm";

type Person = "first" | "second" | "third";
type Num = "singular" | "plural";
type DimKey = "person" | "number" | "gender";

interface ObjectPronoun extends DrillForm {
	person: Person;
	number: Num;
	gender: Gender | "";
}

// Bare pronouns ("you", "her") don't show object function in English and
// collide with the possessives drill — a fixed "see" frame keeps the role clear.
const ENGLISH: Record<string, string> = {
	"1sg": "he sees me",
	"2sg": "I see you",
	"3sg-m": "I see him",
	"3sg-f": "I see her",
	"3sg-n": "I see it",
	"1pl": "he sees us",
	"2pl": "I see you all",
	"3pl-m": "I see them",
	"3pl-f": "I see them",
	"3pl-n": "I see them",
};

const PRONOUNS: ObjectPronoun[] = [
	{
		id: "1sg",
		person: "first",
		number: "singular",
		gender: "",
		greek: "με",
		label: "he sees me / 1st singular",
	},
	{
		id: "2sg",
		person: "second",
		number: "singular",
		gender: "",
		greek: "σε",
		label: "I see you / 2nd singular",
	},
	{
		id: "3sg-m",
		person: "third",
		number: "singular",
		gender: "masculine",
		greek: "τον",
		label: "I see him / 3rd singular",
	},
	{
		id: "3sg-f",
		person: "third",
		number: "singular",
		gender: "feminine",
		greek: "την",
		label: "I see her / 3rd singular",
	},
	{
		id: "3sg-n",
		person: "third",
		number: "singular",
		gender: "neuter",
		greek: "το",
		label: "I see it / 3rd singular",
	},
	{
		id: "1pl",
		person: "first",
		number: "plural",
		gender: "",
		greek: "μας",
		label: "he sees us / 1st plural",
	},
	{
		id: "2pl",
		person: "second",
		number: "plural",
		gender: "",
		greek: "σας",
		label: "I see you all / 2nd plural",
	},
	{
		id: "3pl-m",
		person: "third",
		number: "plural",
		gender: "masculine",
		greek: "τους",
		label: "I see them (m) / 3rd plural",
	},
	{
		id: "3pl-f",
		person: "third",
		number: "plural",
		gender: "feminine",
		greek: "τις",
		label: "I see them (f) / 3rd plural",
	},
	{
		id: "3pl-n",
		person: "third",
		number: "plural",
		gender: "neuter",
		greek: "τα",
		label: "I see them (n) / 3rd plural",
	},
];

const PARADIGM_ROWS: ParadigmRow[] = [
	{ label: "1st", forms: ["με", "μας"] },
	{ label: "2nd", forms: ["σε", "σας"] },
	{ label: "3rd masculine", forms: ["τον", "τους"] },
	{ label: "3rd feminine", forms: ["την", "τις"] },
	{ label: "3rd neuter", forms: ["το", "τα"] },
];

const PronounParadigm = () => <Paradigm columns={NUMBER_COLUMNS} rows={PARADIGM_ROWS} />;

const DIMENSIONS: DimensionSpec<DimKey>[] = [
	{
		key: "person",
		values: ["first", "second", "third"] as const,
		label: (v) => PERSON_LABELS[v as Person],
		selectorStyle: () => ({ bg: "bg-terracotta-100", text: "text-terracotta-text" }),
	},
	{
		key: "number",
		values: ["singular", "plural"] as const,
		selectorStyle: () => ({ bg: "bg-terracotta-100", text: "text-terracotta-text" }),
	},
	{
		key: "gender",
		values: ["masculine", "feminine", "neuter"] as const,
		selectorStyle: (v) => {
			const s = GENDER_STYLE[v as Gender];
			return { bg: s.selectorBg, text: s.selectorText };
		},
		shown: (sel) => sel.person === "third",
		required: (sel) => sel.person === "third",
	},
];

export const Route = createFileRoute("/practice/pronouns/object")({
	component: PronounsDrill,
});

function PronounsDrill() {
	return (
		<Drill<DimKey, ObjectPronoun>
			drillId="pronouns-object"
			subtitle="10 forms / timed"
			colorTheme="terracotta"
			forwardDesc="e.g. he sees me → με"
			reverseDesc="e.g. με → 1st / singular"
			items={PRONOUNS}
			reverse={{ kind: "multi-select", dimensions: DIMENSIONS }}
			configExtras={<PronounParadigm />}
			sessionSize={10}
			forwardPrompt={(form) => {
				const english = ENGLISH[form.id] ?? "";
				const person = PERSON_CHIP[form.person];
				const number = NUMBER_CHIP[form.number];
				const gender = form.gender ? GENDER_CHIP[form.gender] : null;
				const facets = [
					{
						icon: person.icon,
						label: person.longLabel,
						colorText: HERO_TEXT.person[form.person],
					},
					{
						icon: number.icon,
						label: number.longLabel,
						colorText: HERO_TEXT.number[form.number],
					},
				];
				if (gender && form.gender) {
					facets.push({
						icon: gender.icon,
						label: gender.longLabel,
						colorText: HERO_TEXT.gender[form.gender],
					});
				}
				return <ForwardPromptCard facets={facets} gloss={`"${english}"`} />;
			}}
		/>
	);
}
