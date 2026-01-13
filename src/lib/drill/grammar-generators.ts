import {
	AGREEMENT_MISTAKES,
	AGREEMENT_PARADIGMS,
	ARTICLE_AGREEMENT_QUICK_REF,
} from "@/constants/agreement";
import { VERB_CONJUGATIONS } from "@/constants/verbs";
import type { DrillQuestion } from "./generate-questions";

export type GrammarExerciseType =
	| "article-sprint"
	| "case-transform"
	| "contextual-fill"
	| "verb-person"
	| "error-correction";

export const GRAMMAR_EXERCISE_CONFIG: Record<
	GrammarExerciseType,
	{ label: string; greekExample: string; description: string; timeLimit: number }
> = {
	"article-sprint": {
		label: "The Right Word",
		greekExample: "___ φίλο → τον",
		description: "Pick the article that matches the noun",
		timeLimit: 2500,
	},
	"case-transform": {
		label: "Say It Right",
		greekExample: "ο φίλος → τον φίλο",
		description: "Change the case: 'the friend' to 'the friend (object)'",
		timeLimit: 3000,
	},
	"contextual-fill": {
		label: "Complete the Sentence",
		greekExample: "βλέπω ___ φίλο → τον",
		description: "The verb tells you which article fits",
		timeLimit: 3000,
	},
	"verb-person": {
		label: "Who's Speaking?",
		greekExample: "έχω → εσύ → έχεις",
		description: "Switch 'I have' to 'you have' to 'they have'",
		timeLimit: 2500,
	},
	"error-correction": {
		label: "Spot the Mistake",
		greekExample: "τα άνθρωπο → τον άνθρωπο",
		description: "Find what's wrong and fix it",
		timeLimit: 4000,
	},
};

type Gender = "masculine" | "feminine" | "neuter";

export const generateArticleSprintQuestions = (): DrillQuestion[] => {
	const questions: DrillQuestion[] = [];

	for (const paradigm of AGREEMENT_PARADIGMS) {
		for (const form of paradigm.forms) {
			if (form.article === "—") continue;

			const noun = form.full.replace(form.article, "").trim();
			const cleanArticle = form.article.replace("(ν)", "");

			questions.push({
				id: `grammar-art-${paradigm.id}-${form.case.toLowerCase()}-sg`,
				prompt: `___ ${noun}`,
				correctGreek: cleanArticle,
				timeLimit: GRAMMAR_EXERCISE_CONFIG["article-sprint"].timeLimit,
				hint: `${paradigm.example} - ${form.english}`,
			});
		}

		for (const form of paradigm.pluralForms) {
			if (form.article === "—") continue;

			const noun = form.full.replace(form.article, "").trim();

			questions.push({
				id: `grammar-art-${paradigm.id}-${form.case.toLowerCase()}-pl`,
				prompt: `___ ${noun}`,
				correctGreek: form.article,
				timeLimit: GRAMMAR_EXERCISE_CONFIG["article-sprint"].timeLimit,
				hint: `${paradigm.example} - ${form.english}`,
			});
		}
	}

	return questions;
};

export const generateCaseTransformQuestions = (): DrillQuestion[] => {
	const questions: DrillQuestion[] = [];

	for (const paradigm of AGREEMENT_PARADIGMS) {
		const nomSingular = paradigm.forms.find((f) => f.case === "Nom");
		const accSingular = paradigm.forms.find((f) => f.case === "Acc");
		const genSingular = paradigm.forms.find((f) => f.case === "Gen");

		const nomPlural = paradigm.pluralForms.find((f) => f.case === "Nom");
		const accPlural = paradigm.pluralForms.find((f) => f.case === "Acc");
		const genPlural = paradigm.pluralForms.find((f) => f.case === "Gen");

		if (nomSingular && accSingular) {
			questions.push({
				id: `grammar-case-${paradigm.id}-sg-acc`,
				prompt: `${nomSingular.full} → accusative`,
				correctGreek: accSingular.full,
				timeLimit: GRAMMAR_EXERCISE_CONFIG["case-transform"].timeLimit,
				hint: `${paradigm.title}: nominative → accusative`,
			});
		}

		if (nomSingular && genSingular) {
			questions.push({
				id: `grammar-case-${paradigm.id}-sg-gen`,
				prompt: `${nomSingular.full} → genitive`,
				correctGreek: genSingular.full,
				timeLimit: GRAMMAR_EXERCISE_CONFIG["case-transform"].timeLimit,
				hint: `${paradigm.title}: nominative → genitive`,
			});
		}

		if (nomPlural && accPlural) {
			questions.push({
				id: `grammar-case-${paradigm.id}-pl-acc`,
				prompt: `${nomPlural.full} → accusative`,
				correctGreek: accPlural.full,
				timeLimit: GRAMMAR_EXERCISE_CONFIG["case-transform"].timeLimit,
				hint: `${paradigm.title}: nominative plural → accusative`,
			});
		}

		if (nomPlural && genPlural) {
			questions.push({
				id: `grammar-case-${paradigm.id}-pl-gen`,
				prompt: `${nomPlural.full} → genitive`,
				correctGreek: genPlural.full,
				timeLimit: GRAMMAR_EXERCISE_CONFIG["case-transform"].timeLimit,
				hint: `${paradigm.title}: nominative plural → genitive`,
			});
		}
	}

	return questions;
};

const ACCUSATIVE_CONTEXTS = [
	{ verb: "βλέπω", english: "see" },
	{ verb: "θέλω", english: "want" },
	{ verb: "έχω", english: "have" },
	{ verb: "αγαπάω", english: "love" },
	{ verb: "διαβάζω", english: "read" },
	{ verb: "ανοίγω", english: "open" },
];

const GENITIVE_CONTEXTS = [
	{ pattern: "το σπίτι", english: "house of" },
	{ pattern: "η οικογένεια", english: "family of" },
	{ pattern: "το όνομα", english: "name of" },
];

export const generateContextualFillQuestions = (): DrillQuestion[] => {
	const questions: DrillQuestion[] = [];

	const accusativeNouns = [
		{ noun: "φίλο", gender: "masculine" as Gender, english: "friend" },
		{ noun: "πατέρα", gender: "masculine" as Gender, english: "father" },
		{ noun: "καφέ", gender: "masculine" as Gender, english: "coffee" },
		{ noun: "γυναίκα", gender: "feminine" as Gender, english: "woman" },
		{ noun: "μητέρα", gender: "feminine" as Gender, english: "mother" },
		{ noun: "πόρτα", gender: "feminine" as Gender, english: "door" },
		{ noun: "παιδί", gender: "neuter" as Gender, english: "child" },
		{ noun: "βιβλίο", gender: "neuter" as Gender, english: "book" },
		{ noun: "σπίτι", gender: "neuter" as Gender, english: "house" },
	];

	for (const context of ACCUSATIVE_CONTEXTS.slice(0, 3)) {
		for (const nounData of accusativeNouns.slice(0, 3)) {
			const article = ARTICLE_AGREEMENT_QUICK_REF.singular[nounData.gender].acc;
			const cleanArticle = article.replace("(ν)", "");

			questions.push({
				id: `grammar-fill-acc-${context.verb}-${nounData.noun}`,
				prompt: `${context.verb} ___ ${nounData.noun}`,
				correctGreek: cleanArticle,
				timeLimit: GRAMMAR_EXERCISE_CONFIG["contextual-fill"].timeLimit,
				hint: `Verbs take accusative: ${context.english} the ${nounData.english}`,
			});
		}
	}

	const genitiveNouns = [
		{ noun: "φίλου", gender: "masculine" as Gender, english: "friend's" },
		{ noun: "πατέρα", gender: "masculine" as Gender, english: "father's" },
		{ noun: "γυναίκας", gender: "feminine" as Gender, english: "woman's" },
		{ noun: "μητέρας", gender: "feminine" as Gender, english: "mother's" },
		{ noun: "παιδιού", gender: "neuter" as Gender, english: "child's" },
	];

	for (const context of GENITIVE_CONTEXTS.slice(0, 2)) {
		for (const nounData of genitiveNouns.slice(0, 3)) {
			const article = ARTICLE_AGREEMENT_QUICK_REF.singular[nounData.gender].gen;

			questions.push({
				id: `grammar-fill-gen-${context.pattern.replace(/\s/g, "-")}-${nounData.noun}`,
				prompt: `${context.pattern} ___ ${nounData.noun}`,
				correctGreek: article,
				timeLimit: GRAMMAR_EXERCISE_CONFIG["contextual-fill"].timeLimit,
				hint: `Possession uses genitive: ${context.english} the ${nounData.english}`,
			});
		}
	}

	return questions;
};

const PERSON_MAP: Record<string, string> = {
	εγώ: "1st sg",
	εσύ: "2nd sg",
	"αυτός/ή/ό": "3rd sg",
	εμείς: "1st pl",
	εσείς: "2nd pl",
	"αυτοί/ές/ά": "3rd pl",
};

const TARGET_PERSONS = ["εσύ", "αυτός/ή/ό", "εμείς", "εσείς", "αυτοί/ές/ά"];

export const generateVerbPersonQuestions = (): DrillQuestion[] => {
	const questions: DrillQuestion[] = [];

	const verbKeys = ["echo", "thelo", "boro", "kano", "milao"] as const;

	for (const verbKey of verbKeys) {
		const conjugations = VERB_CONJUGATIONS[verbKey];
		if (!conjugations) continue;

		const firstPerson = conjugations.find((c) => c.person === "εγώ");
		if (!firstPerson) continue;

		for (const targetPerson of TARGET_PERSONS) {
			const targetConj = conjugations.find((c) => c.person === targetPerson);
			if (!targetConj) continue;

			questions.push({
				id: `grammar-verb-${verbKey}-${PERSON_MAP[targetPerson]?.replace(/\s/g, "")}`,
				prompt: `${firstPerson.form} → ${targetPerson}`,
				correctGreek: targetConj.form,
				timeLimit: GRAMMAR_EXERCISE_CONFIG["verb-person"].timeLimit,
				hint: `${firstPerson.english} → ${targetConj.english}`,
			});
		}
	}

	return questions;
};

export const generateErrorCorrectionQuestions = (): DrillQuestion[] => {
	const questions: DrillQuestion[] = [];

	for (const mistake of AGREEMENT_MISTAKES) {
		questions.push({
			id: `grammar-fix-${mistake.category}-${mistake.wrong.replace(/\s/g, "-")}`,
			prompt: `Fix: ${mistake.wrong}`,
			correctGreek: mistake.correct,
			timeLimit: GRAMMAR_EXERCISE_CONFIG["error-correction"].timeLimit,
			hint: mistake.explanation,
		});
	}

	return questions;
};

const grammarGenerators: Record<GrammarExerciseType, () => DrillQuestion[]> = {
	"article-sprint": generateArticleSprintQuestions,
	"case-transform": generateCaseTransformQuestions,
	"contextual-fill": generateContextualFillQuestions,
	"verb-person": generateVerbPersonQuestions,
	"error-correction": generateErrorCorrectionQuestions,
};

export const generateGrammarQuestions = (
	exerciseType: GrammarExerciseType,
): DrillQuestion[] => {
	return grammarGenerators[exerciseType]();
};
