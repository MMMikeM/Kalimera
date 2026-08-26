import type { Gender } from "@/server/db/enums";

import { OBJECT_PRONOUNS, POSSESSIVE_PRONOUNS } from "./pronouns";
import { CASE_ROLES } from "./recognition";

/**
 * Forms that are both a definite article and a pronoun. Every third-person pronoun
 * in Greek is spelled like an article, so the form alone never tells a learner which
 * one they are reading — only the word next to it does.
 *
 * The inventory is intersected from the two owners rather than retyped, so it cannot
 * drift out of step with either paradigm.
 */
const articleForms = new Set(CASE_ROLES.flatMap((role) => role.articles));

const pronounForms = new Set(
	[...OBJECT_PRONOUNS, ...POSSESSIVE_PRONOUNS].flatMap((row) => [
		row.singular.greek,
		row.plural.greek,
	]),
);

export const HOMOGRAPH_FORMS = [...articleForms].filter((form) => pronounForms.has(form));

export interface HomographRow {
	form: string;
	/** The gender this row demonstrates — του gets one row per gender it serves. */
	gender: Gender;
	/** Before a noun — the article. */
	article: string;
	/** Before a verb — the object pronoun. */
	object: string;
	/** After a noun — the possessive. Absent for the accusative-only forms. */
	possessive?: string;
}

export const HOMOGRAPH_ROWS: HomographRow[] = [
	{ form: "τον", gender: "masculine", article: "τον φίλο", object: "τον ξέρω" },
	{ form: "την", gender: "feminine", article: "την πόρτα", object: "την ακούω" },
	{ form: "το", gender: "neuter", article: "το σπίτι", object: "το θέλω" },
	{
		form: "τους",
		gender: "masculine",
		article: "τους φίλους",
		object: "τους ξέρω",
		possessive: "το σπίτι τους",
	},
	{ form: "τις", gender: "feminine", article: "τις μέρες", object: "τις βλέπω" },
	{ form: "τα", gender: "neuter", article: "τα παιδιά", object: "τα βλέπω" },
	{
		form: "του",
		gender: "masculine",
		article: "του φίλου",
		object: "του λέω",
		possessive: "ο φίλος του",
	},
	{
		form: "του",
		gender: "neuter",
		article: "του σπιτιού",
		object: "του δίνω γάλα",
		possessive: "το χρώμα του",
	},
	{
		form: "της",
		gender: "feminine",
		article: "της Μαρίας",
		object: "της λέω",
		possessive: "η μητέρα της",
	},
];
