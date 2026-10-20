import { GUIDES } from "@/routes/guides/guides.data";
import type { GrammarNoteHome, Lesson } from "@/types/lesson-seed";

// Only the dated lesson files: lessons/index.ts pulls in node:fs and the seed pipeline.
const LESSON_MODULES = import.meta.glob<Record<string, Lesson>>(
	"/src/scripts/seed-data/vocabulary/lessons/2*.ts",
	{ eager: true },
);

interface LessonNote {
	date: string;
	topic: string;
	section: GrammarNoteHome;
}

const dateFromPath = (path: string): string => path.split("/").at(-1)?.slice(0, 10) ?? "";

export const getLessonNotes = (): LessonNote[] =>
	Object.entries(LESSON_MODULES).flatMap(([path, module]) =>
		Object.values(module).flatMap((lesson) =>
			(lesson.grammarNotes ?? []).map((note) => ({
				date: dateFromPath(path),
				topic: String(lesson.meta.topic ?? ""),
				section: note.section,
			})),
		),
	);

export const countLessons = (): number => Object.keys(LESSON_MODULES).length;

export interface LessonDrills {
	date: string;
	topic: string;
	drillIds: string[];
}

const sectionDrills = (home: GrammarNoteHome): string[] => {
	const [slug, sectionId] = home.split("/");
	return GUIDES.find((guide) => guide.slug === slug)?.sections.find((section) => section.id === sectionId)?.drills ?? [];
};

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
