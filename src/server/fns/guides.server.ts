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
