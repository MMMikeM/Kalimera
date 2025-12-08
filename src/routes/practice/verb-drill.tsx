import type React from "react";
import { useMemo } from "react";
import DrillCard from "./drill-card";
import type { Question } from "./types";
import { shuffleArray } from "./types";
import { VERB_CONJUGATIONS } from "../../constants/verbs";

// Greek-first verb drill: Show Greek verb forms, ask what they mean
// This teaches recognition of conjugated forms rather than translation from English

const PRIORITY_VERBS = [
	{ key: "echo", infinitive: "έχω", english: "have" },
	{ key: "thelo", infinitive: "θέλω", english: "want" },
	{ key: "boro", infinitive: "μπορώ", english: "can" },
	{ key: "eimai", infinitive: "είμαι", english: "be" },
] as const;

const generateQuestions = (): Question[] => {
	const questions: Question[] = [];

	// Type 1: Greek verb form → English meaning
	// "What does 'έχουμε' mean?"
	for (const verb of PRIORITY_VERBS) {
		const conjugations = VERB_CONJUGATIONS[verb.key];
		if (!conjugations) continue;

		for (const conj of conjugations) {
			// Get wrong options from same verb (different persons)
			const wrongFromSameVerb = conjugations
				.filter((c) => c.english !== conj.english)
				.map((c) => c.english);

			// Get wrong options from other verbs (same person)
			const wrongFromOtherVerbs = PRIORITY_VERBS.filter(
				(v) => v.key !== verb.key,
			).flatMap((v) => {
				const otherConj = VERB_CONJUGATIONS[v.key]?.find(
					(c) => c.person === conj.person,
				);
				return otherConj ? [otherConj.english] : [];
			});

			const allWrong = [
				...new Set([...wrongFromSameVerb, ...wrongFromOtherVerbs]),
			];
			const wrongOptions = shuffleArray(allWrong).slice(0, 3);
			const options = shuffleArray([conj.english, ...wrongOptions]);
			const correctIndex = options.indexOf(conj.english);

			questions.push({
				id: `${verb.key}-meaning-${conj.person}`,
				prompt: conj.form,
				promptSubtext: `(from ${verb.infinitive} - to ${verb.english})`,
				options,
				correctIndex,
				explanation: `"${conj.form}" means "${conj.english}". It's the ${conj.person} form of ${verb.infinitive} (to ${verb.english}).`,
				hint: "The ending tells you WHO is doing the action: -ω (I), -εις (you), -ει (he/she), -ουμε (we), -ετε (you pl), -ουν (they)",
			});
		}
	}

	// Type 2: Greek verb form → identify the person (who is doing the action)
	// Greek-first: show Greek pronoun first, English in parentheses
	const personLabels: Record<string, string> = {
		εγώ: "εγώ (I)",
		εσύ: "εσύ (you)",
		"αυτός/ή/ό": "αυτός/ή/ό (he/she/it)",
		εμείς: "εμείς (we)",
		εσείς: "εσείς (you pl/formal)",
		"αυτοί/ές/ά": "αυτοί/ές/ά (they)",
	};

	for (const verb of PRIORITY_VERBS) {
		const conjugations = VERB_CONJUGATIONS[verb.key];
		if (!conjugations) continue;

		for (const conj of conjugations) {
			const correctPerson = personLabels[conj.person];
			if (!correctPerson) continue;

			const wrongPersons = Object.values(personLabels).filter(
				(p) => p !== correctPerson,
			);
			const wrongOptions = shuffleArray(wrongPersons).slice(0, 3);
			const options = shuffleArray([correctPerson, ...wrongOptions]);
			const correctIndex = options.indexOf(correctPerson);

			questions.push({
				id: `${verb.key}-person-${conj.person}`,
				prompt: conj.form,
				promptSubtext: `Who is doing the action? (${verb.infinitive} = ${verb.english})`,
				options,
				correctIndex,
				explanation: `"${conj.form}" is the ${conj.person} form. The ending tells us who is doing the action.`,
				hint: "The ending tells you WHO is doing the action: -ω (I), -εις (you), -ει (he/she), -ουμε (we), -ετε (you pl), -ουν (they)",
			});
		}
	}

	// Type 3: Complete the sentence with correct verb form
	// "Εγώ ___ καφέ" → έχω/έχεις/έχει/έχουμε
	const sentenceTemplates = [
		{ person: "εγώ", subject: "Εγώ", context: "(I...)" },
		{ person: "εσύ", subject: "Εσύ", context: "(you...)" },
		{ person: "αυτός/ή/ό", subject: "Αυτός", context: "(he...)" },
		{ person: "εμείς", subject: "Εμείς", context: "(we...)" },
		{ person: "εσείς", subject: "Εσείς", context: "(you all...)" },
		{ person: "αυτοί/ές/ά", subject: "Αυτοί", context: "(they...)" },
	];

	for (const verb of PRIORITY_VERBS) {
		const conjugations = VERB_CONJUGATIONS[verb.key];
		if (!conjugations) continue;

		for (const template of sentenceTemplates) {
			const targetConj = conjugations.find((c) => c.person === template.person);
			if (!targetConj) continue;

			const correctForm = targetConj.form;
			const wrongForms = conjugations
				.filter((c) => c.form !== correctForm)
				.map((c) => c.form);
			const wrongOptions = shuffleArray(wrongForms).slice(0, 3);
			const options = shuffleArray([correctForm, ...wrongOptions]);
			const correctIndex = options.indexOf(correctForm);

			questions.push({
				id: `${verb.key}-complete-${template.person}`,
				prompt: `${template.subject} ___`,
				promptSubtext: `${template.context} Complete with "${verb.english}"`,
				options,
				correctIndex,
				explanation: `With "${template.subject}" ${template.context}, we use "${correctForm}". The verb ending matches the subject.`,
				hint: "Match the verb ending to the subject: εγώ→-ω, εσύ→-εις, αυτός→-ει, εμείς→-ουμε, εσείς→-ετε, αυτοί→-ουν",
			});
		}
	}

	return questions;
};

const VerbDrill: React.FC = () => {
	const questions = useMemo(() => generateQuestions(), []);

	return (
		<DrillCard
			title="Verb Conjugation"
			description="Practice essential verb forms"
			questions={questions}
			variant="verbs"
		/>
	);
};

export default VerbDrill;
