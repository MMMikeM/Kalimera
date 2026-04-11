import { eq } from "drizzle-orm";
import { planWeakAreaCommand } from "@/lib/weak-area";
import { db } from "../index";
import { type AreaType, weakAreas } from "../schema";
import type { DbTransaction } from "./transaction-client";

export const getWeakAreas = async (userId: number) => {
	return await db.query.weakAreas.findMany({
		where: { userId, needsFocus: true },
		orderBy: { mistakeCount: "desc" },
	});
};

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

	const now = new Date();
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
		await tx.update(weakAreas).set(cmd.set).where(eq(weakAreas.id, cmd.id));
	} else {
		await tx.insert(weakAreas).values(cmd.values);
	}
};
