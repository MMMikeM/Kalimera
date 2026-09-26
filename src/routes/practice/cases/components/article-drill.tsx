import { getArticle } from "@/lib/greek-grammar";
import {
	type Gender,
	type GrammaticalNumber,
	type NominalCase,
	genders,
	grammaticalNumbers,
} from "@/server/db/enums";

import type { DrillForm } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";
import { GENDER_COLUMNS, Paradigm, type ParadigmRow } from "../../components/paradigm";

export const GENDER_ABBR: Record<Gender, string> = { masculine: "m", feminine: "f", neuter: "n" };
export const NUMBER_ABBR: Record<GrammaticalNumber, string> = { singular: "sg", plural: "pl" };
const CASE_ABBR: Record<NominalCase, string> = {
	nominative: "Nom",
	accusative: "Acc",
	genitive: "Gen",
};

/** One paradigm row: the article for each gender in a case and number. */
export const articleParadigmRow = (
	grammaticalCase: NominalCase,
	number: GrammaticalNumber,
	shown: (gender: Gender) => string = (gender) => getArticle(gender, number, grammaticalCase),
): ParadigmRow => ({
	label: `${CASE_ABBR[grammaticalCase]} ${NUMBER_ABBR[number]}`,
	forms: genders.map(shown),
	scheme: `case-${grammaticalCase}`,
});

/** A cell drilled in a form other than getArticle's, e.g. τη for την. */
interface ArticleOverride {
	greek: string;
	acceptAlso?: string;
	/** How the paradigm table writes it, e.g. τη(ν). */
	shown: string;
}

interface CaseArticleDrillProps {
	drillId: string;
	grammaticalCase: NominalCase;
	subtitle: string;
	forwardDesc: string;
	/** The English prompt for one cell, given its abbreviations: "m", "sg". */
	prompt: (gender: string, number: string) => string;
	/** Keyed by item id, e.g. "f-sg". */
	overrides?: Record<string, ArticleOverride>;
}

/** The six articles of one case, singular and plural across the three genders. */
export function CaseArticleDrill({
	drillId,
	grammaticalCase,
	subtitle,
	forwardDesc,
	prompt,
	overrides = {},
}: CaseArticleDrillProps) {
	const cell = (gender: Gender, number: GrammaticalNumber) => {
		const id = `${GENDER_ABBR[gender]}-${NUMBER_ABBR[number]}`;
		const article = getArticle(gender, number, grammaticalCase);
		return { id, article, override: overrides[id] };
	};

	const forms: DrillForm[] = grammaticalNumbers.flatMap((number) =>
		genders.map((gender) => {
			const { id, article, override } = cell(gender, number);
			return {
				id,
				greek: override?.greek ?? article,
				acceptAlso: override?.acceptAlso,
				label: prompt(GENDER_ABBR[gender], NUMBER_ABBR[number]),
			};
		}),
	);

	const rows = grammaticalNumbers.map((number) =>
		articleParadigmRow(grammaticalCase, number, (gender) => {
			const { article, override } = cell(gender, number);
			return override?.shown ?? article;
		}),
	);

	return (
		<Drill
			backTo="/practice/cases/"
			drillId={drillId}
			items={forms}
			subtitle={subtitle}
			forwardDesc={forwardDesc}
			reverseDesc="Article → recall gender + number (self-assess)"
			configExtras={<Paradigm className="my-8 mb-12" columns={GENDER_COLUMNS} rows={rows} />}
		/>
	);
}
