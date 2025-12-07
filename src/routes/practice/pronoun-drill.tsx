import type React from "react";
import { useMemo } from "react";
import DrillCard from "./drill-card";
import type { Question } from "./types";
import { shuffleArray } from "./types";
import { OBJECT_PRONOUNS, POSSESSIVE_PRONOUNS } from "../../constants/pronouns";

// Greek-first pronoun drill: Show Greek pronouns in context, ask what they mean
// This teaches recognition of pronouns in real sentences rather than abstract translation

interface PronounData {
	greek: string;
	english: string;
	type: "object" | "possessive";
	person: string;
	number: "singular" | "plural";
}

const getAllPronouns = (): PronounData[] => {
	const pronouns: PronounData[] = [];

	for (const paradigm of OBJECT_PRONOUNS) {
		pronouns.push({
			greek: paradigm.singular.greek,
			english: paradigm.singular.english,
			type: "object",
			person: paradigm.person,
			number: "singular",
		});
		pronouns.push({
			greek: paradigm.plural.greek,
			english: paradigm.plural.english,
			type: "object",
			person: paradigm.person,
			number: "plural",
		});
	}

	for (const paradigm of POSSESSIVE_PRONOUNS) {
		pronouns.push({
			greek: paradigm.singular.greek,
			english: paradigm.singular.english,
			type: "possessive",
			person: paradigm.person,
			number: "singular",
		});
		pronouns.push({
			greek: paradigm.plural.greek,
			english: paradigm.plural.english,
			type: "possessive",
			person: paradigm.person,
			number: "plural",
		});
	}

	return pronouns;
};

// Greek sentences with pronouns in context
interface SentenceTemplate {
	id: string;
	sentence: string;
	english: string;
	targetPronoun: string;
	targetMeaning: string;
	pronounType: "object" | "possessive";
}

const OBJECT_PRONOUN_SENTENCES: SentenceTemplate[] = [
	// Object pronouns (go BEFORE the verb)
	{ id: "obj-me-1", sentence: "Με βλέπεις;", english: "Do you see me?", targetPronoun: "Με", targetMeaning: "me", pronounType: "object" },
	{ id: "obj-me-2", sentence: "Με αγαπάς;", english: "Do you love me?", targetPronoun: "Με", targetMeaning: "me", pronounType: "object" },
	{ id: "obj-se-1", sentence: "Σε περιμένω", english: "I'm waiting for you", targetPronoun: "Σε", targetMeaning: "you (sing)", pronounType: "object" },
	{ id: "obj-se-2", sentence: "Σε ακούω", english: "I hear you", targetPronoun: "Σε", targetMeaning: "you (sing)", pronounType: "object" },
	{ id: "obj-ton-1", sentence: "Τον ξέρω", english: "I know him", targetPronoun: "Τον", targetMeaning: "him", pronounType: "object" },
	{ id: "obj-tin-1", sentence: "Την βλέπω", english: "I see her", targetPronoun: "Την", targetMeaning: "her", pronounType: "object" },
	{ id: "obj-to-1", sentence: "Το θέλω", english: "I want it", targetPronoun: "Το", targetMeaning: "it", pronounType: "object" },
	{ id: "obj-mas-1", sentence: "Μας περιμένουν", english: "They're waiting for us", targetPronoun: "Μας", targetMeaning: "us", pronounType: "object" },
	{ id: "obj-sas-1", sentence: "Σας ακούω", english: "I hear you (all)", targetPronoun: "Σας", targetMeaning: "you (pl/formal)", pronounType: "object" },
	{ id: "obj-tous-1", sentence: "Τους βλέπω", english: "I see them", targetPronoun: "Τους", targetMeaning: "them (m)", pronounType: "object" },
	{ id: "obj-tis-1", sentence: "Τις ξέρω", english: "I know them (f)", targetPronoun: "Τις", targetMeaning: "them (f)", pronounType: "object" },
	{ id: "obj-ta-1", sentence: "Τα έχω", english: "I have them (n)", targetPronoun: "Τα", targetMeaning: "them (n)", pronounType: "object" },
];

const POSSESSIVE_PRONOUN_SENTENCES: SentenceTemplate[] = [
	// Possessive pronouns (go AFTER the noun)
	{ id: "poss-mou-1", sentence: "Το σπίτι μου", english: "my house", targetPronoun: "μου", targetMeaning: "my", pronounType: "possessive" },
	{ id: "poss-mou-2", sentence: "Η μητέρα μου", english: "my mother", targetPronoun: "μου", targetMeaning: "my", pronounType: "possessive" },
	{ id: "poss-sou-1", sentence: "Το όνομά σου", english: "your name", targetPronoun: "σου", targetMeaning: "your (sing)", pronounType: "possessive" },
	{ id: "poss-sou-2", sentence: "Ο φίλος σου", english: "your friend", targetPronoun: "σου", targetMeaning: "your (sing)", pronounType: "possessive" },
	{ id: "poss-tou-1", sentence: "Το αυτοκίνητό του", english: "his car", targetPronoun: "του", targetMeaning: "his", pronounType: "possessive" },
	{ id: "poss-tis-1", sentence: "Η τσάντα της", english: "her bag", targetPronoun: "της", targetMeaning: "her", pronounType: "possessive" },
	{ id: "poss-tou-n-1", sentence: "Το χρώμα του", english: "its color", targetPronoun: "του", targetMeaning: "its", pronounType: "possessive" },
	{ id: "poss-mas-1", sentence: "Το σπίτι μας", english: "our house", targetPronoun: "μας", targetMeaning: "our", pronounType: "possessive" },
	{ id: "poss-mas-2", sentence: "Η οικογένειά μας", english: "our family", targetPronoun: "μας", targetMeaning: "our", pronounType: "possessive" },
	{ id: "poss-sas-1", sentence: "Το όνομά σας", english: "your (pl) name", targetPronoun: "σας", targetMeaning: "your (pl/formal)", pronounType: "possessive" },
	{ id: "poss-tous-1", sentence: "Τα παιδιά τους", english: "their children", targetPronoun: "τους", targetMeaning: "their", pronounType: "possessive" },
];

const generateQuestions = (): Question[] => {
	const questions: Question[] = [];
	const allPronouns = getAllPronouns();

	// Type 1: Greek sentence → What does the pronoun mean?
	const allSentences = [...OBJECT_PRONOUN_SENTENCES, ...POSSESSIVE_PRONOUN_SENTENCES];

	for (const template of allSentences) {
		// Get wrong options (other pronouns of the same type)
		const wrongOptions = allPronouns
			.filter((p) => p.type === template.pronounType && p.english !== template.targetMeaning)
			.map((p) => p.english);
		const selectedWrong = shuffleArray(wrongOptions).slice(0, 3);
		const options = shuffleArray([template.targetMeaning, ...selectedWrong]);
		const correctIndex = options.indexOf(template.targetMeaning);

		const typeLabel = template.pronounType === "object" ? "object pronoun" : "possessive";
		const positionHint = template.pronounType === "object" ? "before the verb" : "after the noun";

		questions.push({
			id: template.id,
			prompt: template.sentence,
			promptSubtext: `What does "${template.targetPronoun}" mean?`,
			options,
			correctIndex,
			explanation: `"${template.targetPronoun}" means "${template.targetMeaning}" (${typeLabel}). In Greek, ${typeLabel}s go ${positionHint}. "${template.sentence}" = "${template.english}"`,
			badge: {
				label: template.pronounType === "object" ? "Object (before verb)" : "Possessive (after noun)",
				variant: template.pronounType,
			},
			hint: template.pronounType === "object"
				? "Object pronouns (με, σε, τον, την...) come BEFORE the verb"
				: "Possessive pronouns (μου, σου, του...) come AFTER the noun",
		});
	}

	// Type 2: Fill in the blank with correct pronoun
	const fillInBlankTemplates = [
		// Object pronouns
		{ id: "fill-obj-1", sentence: "___ βλέπεις;", english: "Do you see me?", correct: "Με", wrongOptions: ["Σε", "Τον", "Μας"], type: "object" },
		{ id: "fill-obj-2", sentence: "___ περιμένω", english: "I'm waiting for you", correct: "Σε", wrongOptions: ["Με", "Την", "Τους"], type: "object" },
		{ id: "fill-obj-3", sentence: "___ ξέρω καλά", english: "I know him well", correct: "Τον", wrongOptions: ["Με", "Σε", "Την"], type: "object" },
		{ id: "fill-obj-4", sentence: "___ ακούω", english: "I hear her", correct: "Την", wrongOptions: ["Τον", "Το", "Τους"], type: "object" },
		{ id: "fill-obj-5", sentence: "___ θέλω", english: "I want it", correct: "Το", wrongOptions: ["Τον", "Την", "Τα"], type: "object" },
		{ id: "fill-obj-6", sentence: "___ περιμένουν", english: "They're waiting for us", correct: "Μας", wrongOptions: ["Σας", "Με", "Τους"], type: "object" },
		// Possessive pronouns
		{ id: "fill-poss-1", sentence: "Το σπίτι ___", english: "my house", correct: "μου", wrongOptions: ["σου", "του", "μας"], type: "possessive" },
		{ id: "fill-poss-2", sentence: "Το όνομά ___", english: "your name", correct: "σου", wrongOptions: ["μου", "της", "σας"], type: "possessive" },
		{ id: "fill-poss-3", sentence: "Ο πατέρας ___", english: "his father", correct: "του", wrongOptions: ["της", "μου", "τους"], type: "possessive" },
		{ id: "fill-poss-4", sentence: "Η μητέρα ___", english: "her mother", correct: "της", wrongOptions: ["του", "σου", "μας"], type: "possessive" },
		{ id: "fill-poss-5", sentence: "Η οικογένειά ___", english: "our family", correct: "μας", wrongOptions: ["σας", "μου", "τους"], type: "possessive" },
		{ id: "fill-poss-6", sentence: "Τα παιδιά ___", english: "their children", correct: "τους", wrongOptions: ["μας", "σας", "του"], type: "possessive" },
	];

	for (const template of fillInBlankTemplates) {
		const options = shuffleArray([template.correct, ...template.wrongOptions]);
		const correctIndex = options.indexOf(template.correct);
		const typeLabel = template.type === "object" ? "object pronoun" : "possessive";

		questions.push({
			id: template.id,
			prompt: template.sentence,
			promptSubtext: template.english,
			options,
			correctIndex,
			explanation: `"${template.correct}" is the correct ${typeLabel} here. The complete phrase is "${template.sentence.replace("___", template.correct)}" = "${template.english}"`,
			badge: {
				label: template.type === "object" ? "Object (before verb)" : "Possessive (after noun)",
				variant: template.type as "object" | "possessive",
			},
			hint: template.type === "object"
				? "Object pronouns (με, σε, τον, την...) come BEFORE the verb"
				: "Possessive pronouns (μου, σου, του...) come AFTER the noun",
		});
	}

	// Type 3: Standalone pronoun recognition (Greek → English)
	for (const paradigm of OBJECT_PRONOUNS) {
		// Singular
		{
			const wrongOptions = allPronouns
				.filter((p) => p.type === "object" && p.english !== paradigm.singular.english)
				.map((p) => p.english);
			const selectedWrong = shuffleArray(wrongOptions).slice(0, 3);
			const options = shuffleArray([paradigm.singular.english, ...selectedWrong]);
			const correctIndex = options.indexOf(paradigm.singular.english);

			questions.push({
				id: `standalone-obj-${paradigm.person}-sg`,
				prompt: paradigm.singular.greek,
				promptSubtext: "What does this pronoun mean?",
				options,
				correctIndex,
				explanation: `"${paradigm.singular.greek}" means "${paradigm.singular.english}" (${paradigm.person} person singular). Object pronouns come before the verb in Greek.`,
				badge: { label: "Object (before verb)", variant: "object" },
				hint: "Object pronouns (με, σε, τον, την...) come BEFORE the verb",
			});
		}

		// Plural
		{
			const wrongOptions = allPronouns
				.filter((p) => p.type === "object" && p.english !== paradigm.plural.english)
				.map((p) => p.english);
			const selectedWrong = shuffleArray(wrongOptions).slice(0, 3);
			const options = shuffleArray([paradigm.plural.english, ...selectedWrong]);
			const correctIndex = options.indexOf(paradigm.plural.english);

			questions.push({
				id: `standalone-obj-${paradigm.person}-pl`,
				prompt: paradigm.plural.greek,
				promptSubtext: "What does this pronoun mean?",
				options,
				correctIndex,
				explanation: `"${paradigm.plural.greek}" means "${paradigm.plural.english}" (${paradigm.person} person plural). Object pronouns come before the verb in Greek.`,
				badge: { label: "Object (before verb)", variant: "object" },
				hint: "Object pronouns (με, σε, τον, την...) come BEFORE the verb",
			});
		}
	}

	for (const paradigm of POSSESSIVE_PRONOUNS) {
		// Singular
		{
			const wrongOptions = allPronouns
				.filter((p) => p.type === "possessive" && p.english !== paradigm.singular.english)
				.map((p) => p.english);
			const selectedWrong = shuffleArray(wrongOptions).slice(0, 3);
			const options = shuffleArray([paradigm.singular.english, ...selectedWrong]);
			const correctIndex = options.indexOf(paradigm.singular.english);

			questions.push({
				id: `standalone-poss-${paradigm.person}-sg`,
				prompt: paradigm.singular.greek,
				promptSubtext: "What does this pronoun mean?",
				options,
				correctIndex,
				explanation: `"${paradigm.singular.greek}" means "${paradigm.singular.english}" (${paradigm.person} person singular). Possessive pronouns come after the noun in Greek.`,
				badge: { label: "Possessive (after noun)", variant: "possessive" },
				hint: "Possessive pronouns (μου, σου, του...) come AFTER the noun",
			});
		}

		// Plural
		{
			const wrongOptions = allPronouns
				.filter((p) => p.type === "possessive" && p.english !== paradigm.plural.english)
				.map((p) => p.english);
			const selectedWrong = shuffleArray(wrongOptions).slice(0, 3);
			const options = shuffleArray([paradigm.plural.english, ...selectedWrong]);
			const correctIndex = options.indexOf(paradigm.plural.english);

			questions.push({
				id: `standalone-poss-${paradigm.person}-pl`,
				prompt: paradigm.plural.greek,
				promptSubtext: "What does this pronoun mean?",
				options,
				correctIndex,
				explanation: `"${paradigm.plural.greek}" means "${paradigm.plural.english}" (${paradigm.person} person plural). Possessive pronouns come after the noun in Greek.`,
				badge: { label: "Possessive (after noun)", variant: "possessive" },
				hint: "Possessive pronouns (μου, σου, του...) come AFTER the noun",
			});
		}
	}

	return questions;
};

const PronounDrill: React.FC = () => {
	const questions = useMemo(() => generateQuestions(), []);

	return (
		<DrillCard
			title="Pronoun Practice"
			description="Learn object and possessive pronouns in context"
			questions={questions}
			variant="pronouns"
		/>
	);
};

export default PronounDrill;
