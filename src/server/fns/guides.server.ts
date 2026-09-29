import type { GuideLessonSource } from "@/types/guide";
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

/** The lessons that fed each section of one guide, oldest first, one entry per lesson. */
export const getLessonSourcesForGuide = (slug: string): Record<string, GuideLessonSource[]> => {
	const bySection: Record<string, GuideLessonSource[]> = {};
	for (const note of getLessonNotes()) {
		const [guide, section] = note.section.split("/");
		if (guide !== slug || !section) continue;
		const sources = (bySection[section] ??= []);
		if (!sources.some((s) => s.date === note.date)) {
			sources.push({ date: note.date, topic: note.topic });
		}
	}
	for (const sources of Object.values(bySection)) sources.sort((a, b) => a.date.localeCompare(b.date));
	return bySection;
};
