import type { AreaType } from "@/db.server/schema";
import { weakAreas } from "@/db.server/schema";

type WeakAreaInsertCore = Pick<
	typeof weakAreas.$inferInsert,
	"userId" | "areaType" | "areaIdentifier" | "mistakeCount" | "needsFocus"
>;

export type WeakAreaCommand =
	| { kind: "delete"; id: number }
	| {
			kind: "update";
			id: number;
			set: { mistakeCount: number; needsFocus: boolean; lastMistakeAt?: Date };
	  }
	| { kind: "insert"; values: WeakAreaInsertCore };

/**
 * Next persistence step for a weak-area row after one graded attempt (no DB).
 */
export const planWeakAreaCommand = (
	existing: { id: number; mistakeCount: number } | null | undefined,
	userId: number,
	areaType: AreaType,
	areaIdentifier: string,
	isCorrect: boolean,
	now: Date,
): WeakAreaCommand | null => {
	if (isCorrect) {
		if (!existing) return null;
		if (existing.mistakeCount <= 1) {
			return { kind: "delete", id: existing.id };
		}
		const next = existing.mistakeCount - 1;
		return { kind: "update", id: existing.id, set: { mistakeCount: next, needsFocus: next >= 3 } };
	}

	if (existing) {
		return {
			kind: "update",
			id: existing.id,
			set: {
				mistakeCount: existing.mistakeCount + 1,
				needsFocus: true,
				lastMistakeAt: now,
			},
		};
	}

	return {
		kind: "insert",
		values: {
			userId,
			areaType,
			areaIdentifier,
			mistakeCount: 1,
			needsFocus: false,
		},
	};
};
