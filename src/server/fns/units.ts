import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { type WordForms, lemmaOf, unitStageItems } from "@/lib/units";
import { UNITS, findUnit } from "@/routes/practice/path/units.data";
import { requireAuth } from "@/server/auth/session";
import { getUnitWords } from "@/server/db/queries/vocabulary";

type UnitWordRow = Awaited<ReturnType<typeof getUnitWords>>[number];

const withArticle = (row: UnitWordRow, grammaticalCase: "nominative" | "accusative") => {
	const form = row.nominalForms.find((f) => f.grammaticalCase === grammaticalCase);
	return form && [form.article, form.form].filter(Boolean).join(" ");
};

const toForms = (row: UnitWordRow): WordForms => {
	const person = (p: string) => row.verbConjugations.find((c) => c.person === p)?.form;
	const [sg1, sg2, sg3] = [person("sg1"), person("sg2"), person("sg3")];
	const name = withArticle(row, "nominative");
	const target = withArticle(row, "accusative");
	return {
		vocabId: row.id,
		english: row.englishTranslation,
		...(sg1 && sg2 && sg3 && { present: { sg1, sg2, sg3 } }),
		...(name && target && { noun: { name, target } }),
	};
};

/** What one stage of a unit drills, with each word's forms for the screens that show them. */
export const getUnitStageFn = createServerFn({ method: "GET" })
	.validator(
		z.object({
			unitId: z.string(),
			stage: z.enum(["meet", "recognise", "recall", "pattern", "sentences", "check"]),
		}),
	)
	.handler(async ({ data: { unitId, stage } }) => {
		await requireAuth();
		const found = findUnit(unitId);
		if (!found) throw new Error(`Unknown unit: ${unitId}`);
		const rows = await getUnitWords(found.unit.words.map(lemmaOf));
		const forms = new Map(rows.map((row) => [row.greekText, toForms(row)]));
		return {
			items: unitStageItems(UNITS, found.index, stage, forms),
			forms: Object.fromEntries(forms),
		};
	});
