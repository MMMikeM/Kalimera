import {
	OBJECT_PRONOUNS,
	POSSESSIVE_PRONOUNS,
} from "@/constants/pronouns";
import { VERB_CONJUGATIONS } from "@/constants/verbs";
import { declineNoun } from "@/lib/noun-declension";
import type { DeclensionPattern } from "@/db/enums";

export interface DrillQuestion {
	id: string;
	prompt: string;
	correctGreek: string;
	timeLimit?: number;
	hint?: string;
}

export type QuestionCategory = "pronouns" | "articles" | "verbs" | "nouns";

const generatePronounQuestions = (): DrillQuestion[] => {
	const questions: DrillQuestion[] = [];

	for (const paradigm of OBJECT_PRONOUNS) {
		questions.push({
			id: `speed-obj-${paradigm.person}-sg`,
			prompt: paradigm.singular.english,
			correctGreek: paradigm.singular.greek,
			timeLimit: 4000,
		});
		questions.push({
			id: `speed-obj-${paradigm.person}-pl`,
			prompt: paradigm.plural.english,
			correctGreek: paradigm.plural.greek,
			timeLimit: 4000,
		});
	}

	for (const paradigm of POSSESSIVE_PRONOUNS) {
		questions.push({
			id: `speed-poss-${paradigm.person}-sg`,
			prompt: paradigm.singular.english,
			correctGreek: paradigm.singular.greek,
			timeLimit: 4000,
		});
		questions.push({
			id: `speed-poss-${paradigm.person}-pl`,
			prompt: paradigm.plural.english,
			correctGreek: paradigm.plural.greek,
			timeLimit: 4000,
		});
	}

	const sentences = [
		{ english: "Do you see me?", greek: "Με βλέπεις" },
		{ english: "I'm waiting for you", greek: "Σε περιμένω" },
		{ english: "I know him", greek: "Τον ξέρω" },
		{ english: "I see her", greek: "Την βλέπω" },
		{ english: "my house", greek: "το σπίτι μου" },
		{ english: "your name", greek: "το όνομά σου" },
		{ english: "our family", greek: "η οικογένειά μας" },
	];

	for (const [i, sent] of sentences.entries()) {
		questions.push({
			id: `speed-sent-${i}`,
			prompt: sent.english,
			correctGreek: sent.greek,
			timeLimit: 5000,
		});
	}

	return questions;
};

const generateVerbQuestions = (): DrillQuestion[] => {
	const questions: DrillQuestion[] = [];

	const PRIORITY_VERBS = [
		{ key: "echo", english: "have" },
		{ key: "thelo", english: "want" },
		{ key: "boro", english: "can" },
		{ key: "eimai", english: "be" },
	] as const;

	for (const verb of PRIORITY_VERBS) {
		const conjugations = VERB_CONJUGATIONS[verb.key];
		if (!conjugations) continue;

		for (const conj of conjugations) {
			questions.push({
				id: `speed-verb-${verb.key}-${conj.person}`,
				prompt: conj.english,
				correctGreek: conj.form,
				timeLimit: 3500,
			});
		}
	}

	const phrases = [
		{ english: "I want coffee", greek: "Θέλω καφέ" },
		{ english: "I have time", greek: "Έχω χρόνο" },
		{ english: "I am here", greek: "Είμαι εδώ" },
		{ english: "we want water", greek: "Θέλουμε νερό" },
		{ english: "they have", greek: "έχουν" },
		{ english: "you can", greek: "μπορείς" },
	];

	for (const [i, phrase] of phrases.entries()) {
		questions.push({
			id: `speed-vphrase-${i}`,
			prompt: phrase.english,
			correctGreek: phrase.greek,
			timeLimit: 4500,
		});
	}

	return questions;
};

const generateArticleQuestions = (): DrillQuestion[] => {
	const questions: DrillQuestion[] = [];

	const articles = [
		{ english: "the father", greek: "ο πατέρας" },
		{ english: "the mother", greek: "η μητέρα" },
		{ english: "the child", greek: "το παιδί" },
		{ english: "the friends", greek: "οι φίλοι" },
		{ english: "the sisters", greek: "οι αδελφές" },
		{ english: "the children", greek: "τα παιδιά" },
		{ english: "I see the father", greek: "Βλέπω τον πατέρα" },
		{ english: "I see the mother", greek: "Βλέπω την μητέρα" },
		{ english: "I see the child", greek: "Βλέπω το παιδί" },
		{ english: "I want the coffee", greek: "Θέλω τον καφέ" },
		{ english: "I open the door", greek: "Ανοίγω την πόρτα" },
		{ english: "I read the book", greek: "Διαβάζω το βιβλίο" },
	];

	for (const [i, art] of articles.entries()) {
		questions.push({
			id: `speed-art-${i}`,
			prompt: art.english,
			correctGreek: art.greek,
			timeLimit: 4500,
		});
	}

	return questions;
};

const generateNounQuestions = (): DrillQuestion[] => {
	const questions: DrillQuestion[] = [];

	const nouns: Array<{
		lemma: string;
		pattern: DeclensionPattern;
		english: string;
	}> = [
		{ lemma: "φίλος", pattern: "masc-os", english: "friend" },
		{ lemma: "καφές", pattern: "masc-es", english: "coffee" },
		{ lemma: "γυναίκα", pattern: "fem-a", english: "woman" },
		{ lemma: "παιδί", pattern: "neut-i", english: "child" },
		{ lemma: "βιβλίο", pattern: "neut-o", english: "book" },
		{ lemma: "σπίτι", pattern: "neut-i", english: "house" },
		{ lemma: "πατέρας", pattern: "masc-as", english: "father" },
		{ lemma: "μητέρα", pattern: "fem-a", english: "mother" },
	];

	for (const noun of nouns) {
		const forms = declineNoun(noun.lemma, noun.pattern);
		const nomForm = forms.find(
			(f) => f.case === "nominative" && f.number === "singular"
		);
		const accForm = forms.find(
			(f) => f.case === "accusative" && f.number === "singular"
		);
		const genForm = forms.find(
			(f) => f.case === "genitive" && f.number === "singular"
		);

		if (nomForm && accForm) {
			questions.push({
				id: `speed-case-${noun.lemma}-acc`,
				prompt: `${nomForm.full} → accusative`,
				correctGreek: accForm.full,
				timeLimit: 4000,
			});
		}

		if (nomForm && genForm) {
			questions.push({
				id: `speed-case-${noun.lemma}-gen`,
				prompt: `${nomForm.full} → genitive`,
				correctGreek: genForm.full,
				timeLimit: 4000,
			});
		}
	}

	return questions;
};

const shuffleArray = <T,>(array: T[]): T[] => {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = shuffled[i];
		shuffled[i] = shuffled[j] as T;
		shuffled[j] = temp as T;
	}
	return shuffled;
};

const generators: Record<QuestionCategory, () => DrillQuestion[]> = {
	pronouns: generatePronounQuestions,
	articles: generateArticleQuestions,
	verbs: generateVerbQuestions,
	nouns: generateNounQuestions,
};

export const generateQuestions = (
	categories: QuestionCategory[] | "all",
	count?: number
): DrillQuestion[] => {
	const cats =
		categories === "all"
			? (Object.keys(generators) as QuestionCategory[])
			: categories;

	const all = cats.flatMap((c) => generators[c]());
	const shuffled = shuffleArray(all);

	return count ? shuffled.slice(0, count) : shuffled;
};

export const CATEGORY_CONFIG: Record<
	QuestionCategory,
	{ label: string; description: string }
> = {
	pronouns: {
		label: "Pronouns",
		description: "Object and possessive pronouns",
	},
	articles: { label: "Articles", description: "Definite articles with nouns" },
	verbs: { label: "Verbs", description: "Common verb conjugations" },
	nouns: {
		label: "Nouns",
		description: "Noun declensions (accusative/genitive)",
	},
};
