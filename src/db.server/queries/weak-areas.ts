import { eq } from "drizzle-orm";

import { nowInstant, toEpochSeconds } from "@/lib/time";
import { planWeakAreaCommand } from "@/lib/weak-area";

import { type AreaType, weakAreas } from "../schema";
import type { DbTransaction } from "./transaction-client";

/** Update mistake counts / focus inside an existing transaction. */
export const applyWeakAreaSideEffect = async (
	tx: DbTransaction,
	input: { userId: number; areaType: AreaType; areaIdentifier: string; isCorrect: boolean },
) => {
	const { userId, areaType, areaIdentifier, isCorrect } = input;

	const existingArea = await tx.query.weakAreas.findFirst({
		where: { userId, areaType, areaIdentifier },
		columns: { id: true, mistakeCount: true },
	});

	const now = nowInstant();
	const cmd = planWeakAreaCommand(
		existingArea ?? undefined,
		userId,
		areaType,
		areaIdentifier,
		isCorrect,
		now,
	);
	if (!cmd) return;

	if (cmd.kind === "delete") {
		await tx.delete(weakAreas).where(eq(weakAreas.id, cmd.id));
	} else if (cmd.kind === "update") {
		const { lastMistakeAt, ...rest } = cmd.set;
		await tx
			.update(weakAreas)
			.set({
				...rest,
				...(lastMistakeAt != null ? { lastMistakeAt: toEpochSeconds(lastMistakeAt) } : {}),
			})
			.where(eq(weakAreas.id, cmd.id));
	} else {
		await tx.insert(weakAreas).values(cmd.values);
	}
};
