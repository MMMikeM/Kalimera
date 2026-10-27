/** The tutoring lessons are one learner's own record, so only that account sees them. */
const LESSONS_OWNER = "mike";

export const canSeeLessons = (auth: { username: string } | null | undefined): boolean =>
	auth?.username === LESSONS_OWNER;
