import type { Lesson } from "./lesson-seed";

export type { Lesson };

export const createLesson = (lesson: Lesson): Lesson => lesson;
