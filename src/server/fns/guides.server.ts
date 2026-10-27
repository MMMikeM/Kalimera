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

/** The latest lessons whose notes point at a guide section with a drill, newest first. */
export const getRecentLessonDrills = (count: number): LessonDrills[] => {
	const lessons = new Map<string, LessonDrills>();
	for (const note of getLessonNotes()) {
		const key = `${note.date} ${note.topic}`;
		const lesson = lessons.get(key) ?? { date: note.date, topic: note.topic, drillIds: [] };
		for (const id of sectionDrills(note.section)) if (!lesson.drillIds.includes(id)) lesson.drillIds.push(id);
		lessons.set(key, lesson);
	}
	return [...lessons.values()]
		.filter((lesson) => lesson.drillIds.length > 0)
		.sort((a, b) => b.date.localeCompare(a.date))
		.slice(0, count);
};
