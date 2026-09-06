import { createFileRoute } from "@tanstack/react-router";

import { genderScheme } from "@/constants/grammar-palette";
import { type Gender, genders } from "@/server/db/enums";

import { GENDER_CHIP, HERO_TEXT, NUMBER_CHIP, PERSON_CHIP } from "../components/engines/chip-specs";
import type { DrillForm } from "../components/engines/deck";
import { Drill, type DimensionSpec } from "../components/engines/drill";
import { PERSON_LABELS, numbers, persons } from "../components/engines/drill-constants";
import { ForwardPromptCard } from "../components/engines/forward-prompt-card";
import { dimensionFor } from "../components/engines/reverse/multi-select";
import { NUMBER_COLUMNS, Paradigm, type ParadigmRow } from "../components/paradigm";

type Person = "first" | "second" | "third";
type Num = "singular" | "plural";
type DimKey = "person" | "number" | "gender";

interface Possessive extends DrillForm {
	person: Person;
	number: Num;
	gender: Gender | "";
}

const ENGLISH: Record<string, string> = {
	"1sg": "my",
	"2sg": "your",
	"3sg-m": "his",
	"3sg-f": "her",
	"3sg-n": "its",
	"1pl": "our",
	"2pl": "your",
	"3pl": "their",
};

const POSSESSIVES: Possessive[] = [
	{
		id: "1sg",
		person: "first",
		number: "singular",
		gender: "",
		greek: "μου",
		label: "my / 1st singular",
	},
	{
		id: "2sg",
		person: "second",
		number: "singular",
		gender: "",
		greek: "σου",
		label: "your / 2nd singular",
	},
	{
		id: "3sg-m",
		person: "third",
		number: "singular",
		gender: "masculine",
		greek: "του",
		label: "his / 3rd singular",
	},
	{
		id: "3sg-f",
		person: "third",
		number: "singular",
		gender: "feminine",
		greek: "της",
		label: "her / 3rd singular",
	},
	{
		id: "3sg-n",
		person: "third",
		number: "singular",
		gender: "neuter",
		greek: "του",
		label: "its / 3rd singular",
	},
	{
		id: "1pl",
		person: "first",
		number: "plural",
		gender: "",
		greek: "μας",
		label: "our / 1st plural",
	},
	{
		id: "2pl",
		person: "second",
		number: "plural",
		gender: "",
		greek: "σας",
		label: "your / 2nd plural",
	},
	{
		id: "3pl",
		person: "third",
		number: "plural",
		gender: "",
		greek: "τους",
		label: "their / 3rd plural",
	},
];

const PARADIGM_ROWS: ParadigmRow[] = [
	{ label: "1st", forms: ["μου", "μας"] },
	{ label: "2nd", forms: ["σου", "σας"] },
	{ label: "3rd masculine", forms: ["του", "τους"] },
	{ label: "3rd feminine", forms: ["της", "τους"] },
	{ label: "3rd neuter", forms: ["του", "τους"] },
];

const PronounParadigm = () => <Paradigm columns={NUMBER_COLUMNS} rows={PARADIGM_ROWS} />;

const dim = dimensionFor<DimKey>();

const local = () => ({ bg: "bg-olive-100", text: "text-olive-text" });

const DIMENSIONS: DimensionSpec<DimKey>[] = [
	dim({ key: "person", values: persons, label: (v) => PERSON_LABELS[v], selectorStyle: local }),
	dim({ key: "number", values: numbers, selectorStyle: local }),
	dim({
		key: "gender",
		values: genders,
		selectorStyle: genderScheme,
		shown: (sel) => sel.person === "third" && sel.number === "singular",
	}),
];

export const Route = createFileRoute("/practice/pronouns/possessives")({
	component: PossessivesDrill,
});

function PossessivesDrill() {
	return (
		<Drill<DimKey, Possessive>
			drillId="pronouns-possessives"
			subtitle="8 forms / timed"
			colorTheme="olive"
			forwardDesc="e.g. my → μου"
			reverseDesc="e.g. μου → 1st / singular"
			items={POSSESSIVES}
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
						colorText: "text-olive-700",
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
