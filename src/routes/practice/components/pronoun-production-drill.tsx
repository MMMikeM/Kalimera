import type React from "react";
import { useMemo } from "react";
import UnifiedDrill, { type UnifiedQuestion } from "./unified-drill";
import { shuffleArray } from "../types";
import {
	OBJECT_PRONOUNS,
	POSSESSIVE_PRONOUNS,
} from "../../../constants/pronouns";

// Production drill: English → Greek (type the Greek pronoun)

const generateProductionQuestions = (): UnifiedQuestion[] => {
	const questions: UnifiedQuestion[] = [];

	// Object pronouns
	for (const paradigm of OBJECT_PRONOUNS) {
		questions.push({
			id: `prod-obj-${paradigm.person}-sg`,
			prompt: paradigm.singular.english,
			correctGreek: paradigm.singular.greek,
			timeLimit: 4000,
			hint: "Object pronouns come BEFORE the verb",
		});
		questions.push({
			id: `prod-obj-${paradigm.person}-pl`,
			prompt: paradigm.plural.english,
			correctGreek: paradigm.plural.greek,
			timeLimit: 4000,
			hint: "Object pronouns come BEFORE the verb",
		});
	}

	// Possessive pronouns
	for (const paradigm of POSSESSIVE_PRONOUNS) {
		questions.push({
			id: `prod-poss-${paradigm.person}-sg`,
			prompt: paradigm.singular.english,
			correctGreek: paradigm.singular.greek,
			timeLimit: 4000,
			hint: "Possessive pronouns come AFTER the noun",
		});
		questions.push({
			id: `prod-poss-${paradigm.person}-pl`,
			prompt: paradigm.plural.english,
			correctGreek: paradigm.plural.greek,
			timeLimit: 4000,
			hint: "Possessive pronouns come AFTER the noun",
		});
	}

	// Sentences with pronouns (longer time limit)
	const sentences = [
		{ id: "sent-me-1", english: "Do you see me?", greek: "Με βλέπεις" },
		{ id: "sent-me-2", english: "Do you love me?", greek: "Με αγαπάς" },
		{ id: "sent-you-1", english: "I'm waiting for you", greek: "Σε περιμένω" },
		{ id: "sent-you-2", english: "I hear you", greek: "Σε ακούω" },
		{ id: "sent-him-1", english: "I know him", greek: "Τον ξέρω" },
		{ id: "sent-her-1", english: "I see her", greek: "Την βλέπω" },
		{ id: "sent-it-1", english: "I want it", greek: "Το θέλω" },
		{ id: "sent-us-1", english: "They're waiting for us", greek: "Μας περιμένουν" },
		{ id: "sent-youpl-1", english: "I hear you all", greek: "Σας ακούω" },
		{ id: "sent-them-1", english: "I see them", greek: "Τους βλέπω" },
		{ id: "sent-my-1", english: "my house", greek: "το σπίτι μου" },
		{ id: "sent-my-2", english: "my mother", greek: "η μητέρα μου" },
		{ id: "sent-your-1", english: "your name", greek: "το όνομά σου" },
		{ id: "sent-your-2", english: "your friend", greek: "ο φίλος σου" },
		{ id: "sent-his-1", english: "his car", greek: "το αυτοκίνητό του" },
		{ id: "sent-her-poss-1", english: "her bag", greek: "η τσάντα της" },
		{ id: "sent-our-1", english: "our house", greek: "το σπίτι μας" },
		{ id: "sent-our-2", english: "our family", greek: "η οικογένειά μας" },
		{ id: "sent-their-1", english: "their children", greek: "τα παιδιά τους" },
	];

	for (const sent of sentences) {
		questions.push({
			id: sent.id,
			prompt: sent.english,
			correctGreek: sent.greek,
			timeLimit: 5000,
		});
	}

	return shuffleArray(questions);
};

const PronounProductionDrill: React.FC = () => {
	const questions = useMemo(() => generateProductionQuestions(), []);

	return (
		<div className="max-w-xl mx-auto">
			<UnifiedDrill title="Pronouns" questions={questions} />
		</div>
	);
};

export default PronounProductionDrill;
