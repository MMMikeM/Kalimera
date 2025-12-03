import type React from "react";
import { useMemo } from "react";
import DrillCard from "./DrillCard";
import type { Question } from "./types";
import { VERB_CONJUGATIONS } from "../../constants/verbs";

const generateQuestions = (): Question[] => {
	const questions: Question[] = [];

	const priorityVerbs = [
		{ key: "echo", name: "έχω", english: "have" },
		{ key: "thelo", name: "θέλω", english: "want" },
		{ key: "boro", name: "μπορώ", english: "can" },
		{ key: "eimai", name: "είμαι", english: "am/are" },
	];

	const personToEnglish: Record<string, string> = {
		"εγώ": "I",
		"εσύ": "you (singular)",
		"αυτός/ή/ό": "he/she/it",
		"εμείς": "we",
		"εσείς": "you (plural)",
		"αυτοί/ές/ά": "they",
	};

	// Generate questions: English -> Greek conjugation
	for (const verb of priorityVerbs) {
		const conjugations = VERB_CONJUGATIONS[verb.key];

		for (const conj of conjugations) {
			const correctForm = conj.form;
			const otherForms = conjugations
				.filter((c) => c.form !== correctForm)
				.map((c) => c.form);

			const shuffledWrongOptions = otherForms
				.sort(() => Math.random() - 0.5)
				.slice(0, 3);

			const options = [correctForm, ...shuffledWrongOptions].sort(
				() => Math.random() - 0.5
			);
			const correctIndex = options.indexOf(correctForm);

			questions.push({
				id: `${verb.key}-english-${conj.person}`,
				prompt: `How do you say "${personToEnglish[conj.person]} ${verb.english}"?`,
				options,
				correctIndex,
				explanation: `The correct form is ${correctForm}. It means "${conj.english}" in English.`,
			});
		}
	}

	// Generate questions: Identify the person for a given form
	for (const verb of priorityVerbs) {
		const conjugations = VERB_CONJUGATIONS[verb.key];

		for (let i = 0; i < 3; i++) {
			const randomConj = conjugations[Math.floor(Math.random() * conjugations.length)];
			const form = randomConj.form;
			const correctPerson = personToEnglish[randomConj.person];

			const otherPeople = Object.values(personToEnglish).filter(
				(p) => p !== correctPerson
			);
			const shuffledWrongOptions = otherPeople
				.sort(() => Math.random() - 0.5)
				.slice(0, 3);

			const options = [correctPerson, ...shuffledWrongOptions].sort(
				() => Math.random() - 0.5
			);
			const correctIndex = options.indexOf(correctPerson);

			questions.push({
				id: `${verb.key}-person-${form}-${i}`,
				prompt: `What person is "${form}" (${verb.english})?`,
				options,
				correctIndex,
				explanation: `"${form}" is the form for "${correctPerson}" when saying "${verb.english}".`,
			});
		}
	}

	// Generate questions: Conjugate for a specific person
	for (const verb of priorityVerbs) {
		const conjugations = VERB_CONJUGATIONS[verb.key];

		const selectedPeople = [
			conjugations.find((c) => c.person === "εγώ"),
			conjugations.find((c) => c.person === "εσύ"),
			conjugations.find((c) => c.person === "εμείς"),
			conjugations.find((c) => c.person === "αυτοί/ές/ά"),
		].filter((c): c is typeof conjugations[0] => c !== undefined);

		for (const targetConj of selectedPeople) {
			const correctForm = targetConj.form;
			const otherForms = conjugations
				.filter((c) => c.form !== correctForm)
				.map((c) => c.form);

			const shuffledWrongOptions = otherForms
				.sort(() => Math.random() - 0.5)
				.slice(0, 3);

			const options = [correctForm, ...shuffledWrongOptions].sort(
				() => Math.random() - 0.5
			);
			const correctIndex = options.indexOf(correctForm);

			questions.push({
				id: `${verb.key}-conjugate-${targetConj.person}`,
				prompt: `Conjugate "${verb.name}" for "${personToEnglish[targetConj.person]}"`,
				promptSubtext: `(${verb.english})`,
				options,
				correctIndex,
				explanation: `For "${personToEnglish[targetConj.person]}", you use ${correctForm} (${targetConj.english}).`,
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
			colorClass="border-purple-200"
			bgClass="bg-purple-50/50"
		/>
	);
};

export default VerbDrill;
