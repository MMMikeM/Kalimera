import type React from "react";
import { useMemo } from "react";
import DrillCard from "./DrillCard";
import type { Question } from "./types";
import { OBJECT_PRONOUNS, POSSESSIVE_PRONOUNS } from "../../constants/pronouns";

const generateQuestions = (): Question[] => {
	const questions: Question[] = [];

	// Helper to get all pronouns for wrong options
	const getAllPronouns = (): Array<{ greek: string; english: string; type: string }> => {
		const pronouns: Array<{ greek: string; english: string; type: string }> = [];

		for (const paradigm of OBJECT_PRONOUNS) {
			pronouns.push({ greek: paradigm.singular.greek, english: paradigm.singular.english, type: "object" });
			pronouns.push({ greek: paradigm.plural.greek, english: paradigm.plural.english, type: "object" });
		}

		for (const paradigm of POSSESSIVE_PRONOUNS) {
			pronouns.push({ greek: paradigm.singular.greek, english: paradigm.singular.english, type: "possessive" });
			pronouns.push({ greek: paradigm.plural.greek, english: paradigm.plural.english, type: "possessive" });
		}

		return pronouns;
	};

	const getWrongOptions = (correctGreek: string, correctEnglish: string, count: number): string[] => {
		const allPronouns = getAllPronouns();
		const wrong = allPronouns
			.filter((p) => p.greek !== correctGreek && p.english !== correctEnglish)
			.sort(() => Math.random() - 0.5)
			.slice(0, count)
			.map((p) => p.greek);
		return wrong;
	};

	const getWrongEnglish = (correctEnglish: string, count: number): string[] => {
		const allPronouns = getAllPronouns();
		const wrong = allPronouns
			.filter((p) => p.english !== correctEnglish)
			.sort(() => Math.random() - 0.5)
			.slice(0, count)
			.map((p) => p.english);
		return wrong;
	};

	// Object pronouns questions
	for (const paradigm of OBJECT_PRONOUNS) {
		// Singular: Greek → English
		{
			const correct = paradigm.singular.english;
			const wrong = getWrongEnglish(correct, 3);
			const options = [correct, ...wrong].sort(() => Math.random() - 0.5);

			questions.push({
				id: `obj-sing-greek-${paradigm.person}`,
				prompt: paradigm.singular.greek,
				promptSubtext: "(Object pronoun - singular)",
				options,
				correctIndex: options.indexOf(correct),
				explanation: `"${paradigm.singular.greek}" is the object pronoun meaning "${correct}" (${paradigm.person} person singular).`,
			});
		}

		// Plural: Greek → English
		{
			const correct = paradigm.plural.english;
			const wrong = getWrongEnglish(correct, 3);
			const options = [correct, ...wrong].sort(() => Math.random() - 0.5);

			questions.push({
				id: `obj-plur-greek-${paradigm.person}`,
				prompt: paradigm.plural.greek,
				promptSubtext: "(Object pronoun - plural)",
				options,
				correctIndex: options.indexOf(correct),
				explanation: `"${paradigm.plural.greek}" is the object pronoun meaning "${correct}" (${paradigm.person} person plural).`,
			});
		}

		// Singular: English → Greek
		{
			const correct = paradigm.singular.greek;
			const wrong = getWrongOptions(correct, paradigm.singular.english, 3);
			const options = [correct, ...wrong].sort(() => Math.random() - 0.5);

			questions.push({
				id: `obj-sing-eng-${paradigm.person}`,
				prompt: `Which object pronoun means "${paradigm.singular.english}"?`,
				options,
				correctIndex: options.indexOf(correct),
				explanation: `The object pronoun for "${paradigm.singular.english}" is "${correct}" (${paradigm.person} person singular). Object pronouns go before the verb in Greek.`,
			});
		}

		// Plural: English → Greek
		{
			const correct = paradigm.plural.greek;
			const wrong = getWrongOptions(correct, paradigm.plural.english, 3);
			const options = [correct, ...wrong].sort(() => Math.random() - 0.5);

			questions.push({
				id: `obj-plur-eng-${paradigm.person}`,
				prompt: `Which object pronoun means "${paradigm.plural.english}"?`,
				options,
				correctIndex: options.indexOf(correct),
				explanation: `The object pronoun for "${paradigm.plural.english}" is "${correct}" (${paradigm.person} person plural). Object pronouns go before the verb in Greek.`,
			});
		}
	}

	// Possessive pronouns questions
	for (const paradigm of POSSESSIVE_PRONOUNS) {
		// Singular: Greek → English
		{
			const correct = paradigm.singular.english;
			const wrong = getWrongEnglish(correct, 3);
			const options = [correct, ...wrong].sort(() => Math.random() - 0.5);

			questions.push({
				id: `poss-sing-greek-${paradigm.person}`,
				prompt: paradigm.singular.greek,
				promptSubtext: "(Possessive pronoun - singular)",
				options,
				correctIndex: options.indexOf(correct),
				explanation: `"${paradigm.singular.greek}" is the possessive pronoun meaning "${correct}" (${paradigm.person} person singular). Possessive pronouns go AFTER the noun.`,
			});
		}

		// Plural: Greek → English
		{
			const correct = paradigm.plural.english;
			const wrong = getWrongEnglish(correct, 3);
			const options = [correct, ...wrong].sort(() => Math.random() - 0.5);

			questions.push({
				id: `poss-plur-greek-${paradigm.person}`,
				prompt: paradigm.plural.greek,
				promptSubtext: "(Possessive pronoun - plural)",
				options,
				correctIndex: options.indexOf(correct),
				explanation: `"${paradigm.plural.greek}" is the possessive pronoun meaning "${correct}" (${paradigm.person} person plural). Possessive pronouns go AFTER the noun.`,
			});
		}

		// Singular: English → Greek
		{
			const correct = paradigm.singular.greek;
			const wrong = getWrongOptions(correct, paradigm.singular.english, 3);
			const options = [correct, ...wrong].sort(() => Math.random() - 0.5);

			questions.push({
				id: `poss-sing-eng-${paradigm.person}`,
				prompt: `Which possessive pronoun means "${paradigm.singular.english}"?`,
				options,
				correctIndex: options.indexOf(correct),
				explanation: `The possessive pronoun for "${paradigm.singular.english}" is "${correct}" (${paradigm.person} person singular). It goes after the noun: article + noun + possessive.`,
			});
		}

		// Plural: English → Greek
		{
			const correct = paradigm.plural.greek;
			const wrong = getWrongOptions(correct, paradigm.plural.english, 3);
			const options = [correct, ...wrong].sort(() => Math.random() - 0.5);

			questions.push({
				id: `poss-plur-eng-${paradigm.person}`,
				prompt: `Which possessive pronoun means "${paradigm.plural.english}"?`,
				options,
				correctIndex: options.indexOf(correct),
				explanation: `The possessive pronoun for "${paradigm.plural.english}" is "${correct}" (${paradigm.person} person plural). It goes after the noun: article + noun + possessive.`,
			});
		}
	}

	// Context-based questions mixing both types
	const contextQuestions: Question[] = [
		{
			id: "context-object-1",
			prompt: "Με αγαπάς;",
			promptSubtext: "(I love you) - What does με mean?",
			options: ["me", "you", "him", "us"],
			correctIndex: 0,
			explanation: 'Με means "me" (object pronoun). The sentence "Με αγαπάς;" means "Do you love me?"',
		},
		{
			id: "context-object-2",
			prompt: "Σας καλώ.",
			promptSubtext: "(I call...) - What does σας mean?",
			options: ["you (pl/formal)", "us", "them", "you (sing)"],
			correctIndex: 0,
			explanation: 'Σας means "you (plural/formal)" (object pronoun). "Σας καλώ" means "I call you (formal)."',
		},
		{
			id: "context-possessive-1",
			prompt: "Το όνομα σου",
			promptSubtext: "(Name of...) - What does σου mean?",
			options: ["your", "my", "his", "our"],
			correctIndex: 0,
			explanation: 'Σου means "your" (singular possessive). "Το όνομα σου" means "your name."',
		},
		{
			id: "context-possessive-2",
			prompt: "Η μητέρα μας",
			promptSubtext: "(Mother of...) - What does μας mean?",
			options: ["our", "my", "your (pl)", "his"],
			correctIndex: 0,
			explanation: 'Μας means "our" (plural possessive). "Η μητέρα μας" means "our mother."',
		},
	];

	questions.push(...contextQuestions);

	return questions;
};

const PronounDrill: React.FC = () => {
	const questions = useMemo(() => generateQuestions(), []);

	return (
		<DrillCard
			title="Pronoun Practice"
			description="Learn object and possessive pronouns in context"
			questions={questions}
			colorClass="border-aegean/30"
			bgClass="bg-aegean/5"
		/>
	);
};

export default PronounDrill;
