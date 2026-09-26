import { createFileRoute } from "@tanstack/react-router";

import { caseScheme, genderScheme } from "@/constants/grammar-palette";
import { getArticle } from "@/lib/greek-grammar";
import {
	type Gender,
	type GrammaticalNumber,
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
import { GENDER_ABBR, NUMBER_ABBR, articleParadigmRow } from "../components/article-drill";

type DimKey = "case" | "gender" | "number";

interface Article extends DrillForm {
	case: NominalCase;
	gender: Gender;
	number: GrammaticalNumber;
}

const ARTICLES: Article[] = grammaticalNumbers.flatMap((number) =>
	nominalCases.flatMap((grammaticalCase) =>
		genders.map((gender) => ({
			id: `${grammaticalCase.slice(0, 3)}-${GENDER_ABBR[gender]}-${NUMBER_ABBR[number]}`,
			case: grammaticalCase,
			gender,
			number,
			greek: getArticle(gender, number, grammaticalCase),
			label: `${gender} / ${number} / ${grammaticalCase}`,
		})),
	),
);

const PARADIGM_ROWS = grammaticalNumbers.flatMap((number) =>
	nominalCases.map((grammaticalCase) => articleParadigmRow(grammaticalCase, number)),
);

const ArticleParadigm = () => <Paradigm columns={GENDER_COLUMNS} rows={PARADIGM_ROWS} />;

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
