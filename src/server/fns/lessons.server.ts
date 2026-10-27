import { getArticle, type Gender } from "@/lib/greek-grammar";
import { findGuide } from "@/routes/guides/guides.data";
import { isPluralCitation } from "@/scripts/seed-data/vocabulary/noun-seed-enrichment";
import type { GrammarNoteHome, Lesson, NoteExample } from "@/types/lesson-seed";

// Only the dated lesson files: lessons/index.ts pulls in node:fs and the seed pipeline.
const LESSON_MODULES = import.meta.glob<Record<string, Lesson>>(
	"/src/scripts/seed-data/vocabulary/lessons/2*.ts",
	{ eager: true },
);

export interface DatedLesson {
	date: string;
	lesson: Lesson;
}

const dateFromPath = (path: string): string => path.split("/").at(-1)?.slice(0, 10) ?? "";

/** Every lesson with the date its file is named for, newest first. */
export const datedLessons = (): DatedLesson[] =>
	Object.entries(LESSON_MODULES)
		.flatMap(([path, module]) => Object.values(module).map((lesson) => ({ date: dateFromPath(path), lesson })))
		.sort((a, b) => b.date.localeCompare(a.date));

export const guideSection = (home: GrammarNoteHome) => {
	const [slug, sectionId] = home.split("/");
	const guide = slug ? findGuide(slug) : undefined;
	const section = guide?.sections.find((s) => s.id === sectionId);
	return guide && section ? { guide, section } : undefined;
};

export interface LessonSummary {
	date: string;
	topic: string;
	wordCount: number;
	phraseCount: number;
	noteCount: number;
}

export interface LessonWord {
	greek: string;
	english: string;
	gender?: Gender;
	plural?: boolean;
}

export interface LessonNoteView {
	pattern: string;
	explanation: string;
	examples: NoteExample[];
	taughtIn?: { guideSlug: string; sectionId: string; guide: string; section: string };
}

export interface LessonSheet {
	date: string;
	topic: string;
	summary?: string;
	homework?: string;
	notes: LessonNoteView[];
	nouns: LessonWord[];
	verbs: LessonWord[];
	adjectives: LessonWord[];
	otherWords: LessonWord[];
	phrases: LessonWord[];
	drillIds: string[];
}

const topicOf = (lesson: Lesson) => String(lesson.meta.topic ?? "");

const wordCount = (lesson: Lesson) =>
	(lesson.nouns?.length ?? 0) +
	(lesson.verbs?.length ?? 0) +
	(lesson.adjectives?.length ?? 0) +
	(lesson.adverbs?.length ?? 0);

export const listLessons = (): LessonSummary[] =>
	datedLessons().map(({ date, lesson }) => ({
		date,
		topic: topicOf(lesson),
		wordCount: wordCount(lesson),
		phraseCount: lesson.phrases?.length ?? 0,
		noteCount: lesson.grammarNotes?.length ?? 0,
	}));

/** The source line reads "Weekly lesson - <what was covered>"; only the second half is worth showing. */
const summaryOf = (lesson: Lesson): string | undefined => {
	const summary = String(lesson.meta.source ?? "")
		.replace(/^weekly lesson\s*[-–—:]?\s*/i, "")
		.trim();
	if (!summary || summary === topicOf(lesson)) return undefined;
	return summary.charAt(0).toUpperCase() + summary.slice(1);
};

const sheetOf = ({ date, lesson }: DatedLesson): LessonSheet => {
	const notes = (lesson.grammarNotes ?? []).map((note) => {
		const home = guideSection(note.section);
		return {
			pattern: note.pattern,
			explanation: note.explanation,
			examples: note.examples,
			taughtIn: home && {
				guideSlug: home.guide.slug,
				sectionId: home.section.id,
				guide: home.guide.title,
				section: home.section.title,
			},
		};
	});
	const drillIds = [
		...new Set((lesson.grammarNotes ?? []).flatMap((note) => guideSection(note.section)?.section.drills ?? [])),
	];
	const homework = lesson.meta.homework;

	return {
		date,
		topic: topicOf(lesson),
		summary: summaryOf(lesson),
		homework: typeof homework === "string" && homework ? homework : undefined,
		notes,
		nouns: (lesson.nouns ?? []).map((noun) => {
			const plural = isPluralCitation(noun.lemma);
			const article = getArticle(noun.gender, plural ? "plural" : "singular", "nominative");
			return {
				greek: article ? `${article} ${noun.lemma}` : noun.lemma,
				english: noun.english,
				gender: noun.gender,
				plural,
			};
		}),
		verbs: (lesson.verbs ?? []).map((verb) => ({ greek: verb.lemma, english: verb.english })),
		adjectives: (lesson.adjectives ?? []).map((adj) => ({ greek: adj.lemma, english: adj.english })),
		otherWords: (lesson.adverbs ?? []).map((adverb) => ({ greek: adverb.lemma, english: adverb.english })),
		phrases: (lesson.phrases ?? []).map((phrase) => ({ greek: phrase.text, english: phrase.english })),
		drillIds,
	};
};

/** One lesson's sheet; the latest when no date is given. */
export const getLessonSheet = (date?: string): LessonSheet | null => {
	const lessons = datedLessons();
	const found = date ? lessons.find((entry) => entry.date === date) : lessons[0];
	return found ? sheetOf(found) : null;
};
