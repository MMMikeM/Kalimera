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
	/** Before a noun — the article. */
	article: string;
	/** Before a verb — the object pronoun. */
	object: string;
	/** After a noun — the possessive. Absent for the accusative-only forms. */
	possessive?: string;
}

export const HOMOGRAPH_ROWS: HomographRow[] = [
	{ form: "τον", article: "τον φίλο", object: "τον ξέρω" },
	{ form: "την", article: "την πόρτα", object: "την ακούω" },
	{ form: "το", article: "το σπίτι", object: "το θέλω" },
	{ form: "τους", article: "τους φίλους", object: "τους ξέρω", possessive: "το σπίτι τους" },
	{ form: "τις", article: "τις μέρες", object: "τις βλέπω" },
	{ form: "τα", article: "τα παιδιά", object: "τα βλέπω" },
	{ form: "του", article: "του φίλου", object: "του λέω", possessive: "ο φίλος του" },
	{ form: "της", article: "της Μαρίας", object: "της λέω", possessive: "η μητέρα της" },
];
