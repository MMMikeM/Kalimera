import type { Gender, GrammaticalCase } from "@/server/db/enums";
import type { GuideCell, GuideMark } from "@/types/guide";

export const mark = (text: string, grammaticalCase: GrammaticalCase, gender?: Gender, plural?: boolean): GuideMark => ({
	text,
	case: grammaticalCase,
	gender,
	plural,
});

/** A cell whose whole text is one marked phrase. */
export const markedCell = (
	text: string,
	grammaticalCase: GrammaticalCase,
	gender?: Gender,
	plural?: boolean,
	weight?: "deviate" | "anchor",
): GuideCell => ({ text, weight, marks: [mark(text, grammaticalCase, gender, plural)] });

/** A cell with marks under some of its runs. */
export const cellWith = (text: string, ...marks: GuideMark[]): GuideCell => ({ text, marks });
