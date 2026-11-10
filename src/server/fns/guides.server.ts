import type { GrammarNoteHome } from "@/types/lesson-seed";

import { datedLessons, guideSection } from "./lessons.server";

interface LessonNote {
	date: string;
	topic: string;
	section: GrammarNoteHome;
}

export const getLessonNotes = (): LessonNote[] =>
	datedLessons().flatMap(({ date, lesson }) =>
		(lesson.grammarNotes ?? []).map((note) => ({
			date,
			topic: String(lesson.meta.topic ?? ""),
			section: note.section,
		})),
	);

export const countLessons = (): number => datedLessons().length;

export interface LessonDrills {
	date: string;
	topic: string;
	drillIds: string[];
}

const sectionDrills = (home: GrammarNoteHome): string[] => guideSection(home)?.section.drills ?? [];

/**
 * The latest lessons whose notes point at a guide section with a drill, newest first.
 * Each note contributes one drill, its section's first, and a drill appears once,
 * under the newest lesson that uses it.
 */
export const getRecentLessonDrills = (count: number): LessonDrills[] => {
	const lessons = new Map<string, LessonDrills>();
	for (const note of getLessonNotes()) {
		const key = `${note.date} ${note.topic}`;
		const lesson = lessons.get(key) ?? { date: note.date, topic: note.topic, drillIds: [] };
		const drillId = sectionDrills(note.section).find((id) => !lesson.drillIds.includes(id));
		if (drillId) lesson.drillIds.push(drillId);
		lessons.set(key, lesson);
	}
	const listed = new Set<string>();
	return [...lessons.values()]
		.sort((a, b) => b.date.localeCompare(a.date))
		.map((lesson) => {
			const drillIds = lesson.drillIds.filter((id) => !listed.has(id));
			for (const id of drillIds) listed.add(id);
			return { ...lesson, drillIds };
		})
		.filter((lesson) => lesson.drillIds.length > 0)
		.slice(0, count);
};
