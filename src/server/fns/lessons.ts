import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { canSeeLessons } from "@/lib/lessons-access";
import { requireAuth } from "@/server/auth/session";

import { getLessonSheet, listLessons } from "./lessons.server";

const requireLessonsOwner = async () => {
	if (!canSeeLessons(await requireAuth())) throw redirect({ to: "/" });
};

export const getLessonsFn = createServerFn({ method: "GET" }).handler(async () => {
	await requireLessonsOwner();
	return listLessons();
});

export const getLessonFn = createServerFn({ method: "GET" })
	.validator(z.object({ date: z.string().optional() }))
	.handler(async ({ data }) => {
		await requireLessonsOwner();
		return getLessonSheet(data.date);
	});
