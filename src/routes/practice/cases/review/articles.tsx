import { createFileRoute } from "@tanstack/react-router";

import { caseScheme, genderScheme } from "@/constants/grammar-palette";
import {
	type Gender,
	type NominalCase,
	genders,
	grammaticalNumbers,
	nominalCases,
} from "@/server/db/enums";

import {
	CASE_CHIP,
	GENDER_CHIP,
	HERO_TEXT,
	NUMBER_CHIP,
} from "../../components/engines/chip-specs";
import type { DrillForm } from "../../components/engines/deck";
import { Drill, type DimensionSpec } from "../../components/engines/drill";
import { ForwardPromptCard } from "../../components/engines/forward-prompt-card";
import { dimensionFor } from "../../components/engines/reverse/multi-select";
import { GENDER_COLUMNS, Paradigm } from "../../components/paradigm";

type Num = "singular" | "plural";

type DimKey = "case" | "gender" | "number";

interface Article extends DrillForm {
	case: NominalCase;
	gender: Gender;
	number: Num;
}

const ARTICLES: Article[] = [
	{
		id: "nom-m-sg",
		case: "nominative",
		gender: "masculine",
		number: "singular",
		greek: "ο",
		label: "masculine / singular / nominative",
	},
	{
		id: "nom-f-sg",
		case: "nominative",
		gender: "feminine",
		number: "singular",
		greek: "η",
		label: "feminine / singular / nominative",
	},
	{
		id: "nom-n-sg",
		case: "nominative",
		gender: "neuter",
		number: "singular",
		greek: "το",
		label: "neuter / singular / nominative",
	},
	{
		id: "acc-m-sg",
		case: "accusative",
		gender: "masculine",
		number: "singular",
		greek: "τον",
		label: "masculine / singular / accusative",
	},
	{
		id: "acc-f-sg",
		case: "accusative",
		gender: "feminine",
		number: "singular",
		greek: "την",
		label: "feminine / singular / accusative",
	},
	{
		id: "acc-n-sg",
		case: "accusative",
		gender: "neuter",
		number: "singular",
		greek: "το",
		label: "neuter / singular / accusative",
	},
	{
		id: "gen-m-sg",
		case: "genitive",
		gender: "masculine",
		number: "singular",
		greek: "του",
		label: "masculine / singular / genitive",
	},
	{
		id: "gen-f-sg",
		case: "genitive",
		gender: "feminine",
		number: "singular",
		greek: "της",
		label: "feminine / singular / genitive",
	},
	{
		id: "gen-n-sg",
		case: "genitive",
		gender: "neuter",
		number: "singular",
		greek: "του",
		label: "neuter / singular / genitive",
	},
	{
		id: "nom-m-pl",
		case: "nominative",
		gender: "masculine",
		number: "plural",
		greek: "οι",
		label: "masculine / plural / nominative",
	},
	{
		id: "nom-f-pl",
		case: "nominative",
		gender: "feminine",
		number: "plural",
		greek: "οι",
		label: "feminine / plural / nominative",
	},
	{
		id: "nom-n-pl",
		case: "nominative",
		gender: "neuter",
		number: "plural",
		greek: "τα",
		label: "neuter / plural / nominative",
	},
	{
		id: "acc-m-pl",
		case: "accusative",
		gender: "masculine",
		number: "plural",
		greek: "τους",
		label: "masculine / plural / accusative",
	},
	{
		id: "acc-f-pl",
		case: "accusative",
		gender: "feminine",
		number: "plural",
		greek: "τις",
		label: "feminine / plural / accusative",
	},
	{
		id: "acc-n-pl",
		case: "accusative",
		gender: "neuter",
		number: "plural",
		greek: "τα",
		label: "neuter / plural / accusative",
	},
	{
		id: "gen-m-pl",
		case: "genitive",
		gender: "masculine",
		number: "plural",
		greek: "των",
		label: "masculine / plural / genitive",
	},
	{
		id: "gen-f-pl",
		case: "genitive",
		gender: "feminine",
		number: "plural",
		greek: "των",
		label: "feminine / plural / genitive",
	},
	{
		id: "gen-n-pl",
		case: "genitive",
		gender: "neuter",
		number: "plural",
		greek: "των",
		label: "neuter / plural / genitive",
	},
];

const PARADIGM_ROWS: { label: string; caseKey: NominalCase; forms: string[] }[] = [
	{ label: "Nom sg", caseKey: "nominative", forms: ["ο", "η", "το"] },
	{ label: "Acc sg", caseKey: "accusative", forms: ["τον", "την", "το"] },
	{ label: "Gen sg", caseKey: "genitive", forms: ["του", "της", "του"] },
	{ label: "Nom pl", caseKey: "nominative", forms: ["οι", "οι", "τα"] },
	{ label: "Acc pl", caseKey: "accusative", forms: ["τους", "τις", "τα"] },
	{ label: "Gen pl", caseKey: "genitive", forms: ["των", "των", "των"] },
];

const ArticleParadigm = () => (
	<Paradigm
		columns={GENDER_COLUMNS}
		rows={PARADIGM_ROWS.map((r) => ({ ...r, scheme: `case-${r.caseKey}` as const }))}
	/>
);

const dim = dimensionFor<DimKey>();

const DIMENSIONS: DimensionSpec<DimKey>[] = [
	dim({ key: "gender", values: genders, selectorStyle: genderScheme }),
	{
		key: "number",
		values: grammaticalNumbers,
		selectorStyle: () => ({ bg: "bg-terracotta-100", text: "text-terracotta-text" }),
	},
	dim({ key: "case", values: nominalCases, selectorStyle: caseScheme }),
];

export const Route = createFileRoute("/practice/cases/review/articles")({
	component: ArticlesDrill,
});

function ArticlesDrill() {
	return (
		<Drill<DimKey, Article>
			drillId="articles-paradigm"
			subtitle="18 forms / timed"
			colorTheme="honey"
			forwardDesc="e.g. masculine / singular / accusative → τον"
			reverseDesc="e.g. τον → masculine / singular / accusative"
			items={ARTICLES}
			reverse={{ kind: "multi-select", dimensions: DIMENSIONS }}
			configExtras={<ArticleParadigm />}
			forwardPrompt={(form) => {
				const gender = GENDER_CHIP[form.gender];
				const number = NUMBER_CHIP[form.number];
				const caseSpec = CASE_CHIP[form.case];
				return (
					<ForwardPromptCard
						facets={[
							{
								icon: gender.icon,
								label: gender.longLabel,
								colorText: HERO_TEXT.gender[form.gender],
							},
							{
								icon: number.icon,
								label: number.longLabel,
								colorText: HERO_TEXT.number[form.number],
							},
							{
								icon: caseSpec.icon,
								label: caseSpec.longLabel,
								colorText: HERO_TEXT.case[form.case],
							},
						]}
					/>
				);
			}}
		/>
	);
}
