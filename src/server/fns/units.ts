import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { lemmaOf, unitStageItems } from "@/lib/units";
import { UNITS, findUnit } from "@/routes/practice/path/units.data";
import { requireAuth } from "@/server/auth/session";

import { getUnitWordForms } from "./units.server";

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
		const forms = await getUnitWordForms(found.unit.words.map(lemmaOf));
		return {
			items: unitStageItems(UNITS, found.index, stage, forms),
			forms: Object.fromEntries(forms),
		};
	});
