import type React from "react";
import { useMemo } from "react";
import UnifiedDrill, { type UnifiedQuestion } from "./unified-drill";
import { shuffleArray } from "../types";
import { VERB_CONJUGATIONS } from "../../../constants/verbs";

// Production drill: English → Greek (type the conjugated verb)
// Tests ability to PRODUCE correct verb forms, not just recognize them

const PRIORITY_VERBS = [
	{ key: "echo", infinitive: "έχω", english: "have" },
	{ key: "thelo", infinitive: "θέλω", english: "want" },
	{ key: "boro", infinitive: "μπορώ", english: "can" },
	{ key: "eimai", infinitive: "είμαι", english: "be" },
] as const;

const generateProductionQuestions = (): UnifiedQuestion[] => {
	const questions: UnifiedQuestion[] = [];

	// Verb conjugations
	for (const verb of PRIORITY_VERBS) {
		const conjugations = VERB_CONJUGATIONS[verb.key];
		if (!conjugations) continue;

		for (const conj of conjugations) {
			questions.push({
				id: `verb-${verb.key}-${conj.person}`,
				prompt: conj.english,
				correctGreek: conj.form,
				timeLimit: 4000,
			});
		}
	}

	// Common phrases with verbs
	const phraseProduction: Array<{
		id: string;
		english: string;
		greek: string;
		hint?: string;
	}> = [
		{ id: "phrase-have-1", english: "I have", greek: "έχω" },
		{ id: "phrase-have-2", english: "you have", greek: "έχεις" },
		{ id: "phrase-have-3", english: "he has", greek: "έχει" },
		{ id: "phrase-have-4", english: "we have", greek: "έχουμε" },
		{ id: "phrase-have-5", english: "they have", greek: "έχουν" },
		{ id: "phrase-want-1", english: "I want", greek: "θέλω" },
		{ id: "phrase-want-2", english: "you want", greek: "θέλεις" },
		{ id: "phrase-want-3", english: "she wants", greek: "θέλει" },
		{ id: "phrase-want-4", english: "we want", greek: "θέλουμε" },
		{ id: "phrase-want-5", english: "they want", greek: "θέλουν" },
		{ id: "phrase-can-1", english: "I can", greek: "μπορώ" },
		{ id: "phrase-can-2", english: "you can", greek: "μπορείς" },
		{ id: "phrase-can-3", english: "he can", greek: "μπορεί" },
		{ id: "phrase-can-4", english: "we can", greek: "μπορούμε" },
		{ id: "phrase-can-5", english: "they can", greek: "μπορούν" },
		{ id: "phrase-am-1", english: "I am", greek: "είμαι" },
		{ id: "phrase-am-2", english: "you are", greek: "είσαι" },
		{ id: "phrase-am-3", english: "he is", greek: "είναι" },
		{ id: "phrase-am-4", english: "we are", greek: "είμαστε" },
		{ id: "phrase-am-5", english: "they are", greek: "είναι" },
		// Longer phrases
		{
			id: "phrase-want-coffee",
			english: "I want coffee",
			greek: "Θέλω καφέ",
			hint: "θέλω = I want, καφέ = coffee",
		},
		{
			id: "phrase-have-time",
			english: "I have time",
			greek: "Έχω χρόνο",
			hint: "έχω = I have, χρόνο = time",
		},
		{
			id: "phrase-can-help",
			english: "I can help",
			greek: "Μπορώ να βοηθήσω",
			hint: "μπορώ = I can, να βοηθήσω = to help",
		},
		{
			id: "phrase-am-here",
			english: "I am here",
			greek: "Είμαι εδώ",
			hint: "είμαι = I am, εδώ = here",
		},
		{
			id: "phrase-we-want",
			english: "we want water",
			greek: "Θέλουμε νερό",
			hint: "θέλουμε = we want, νερό = water",
		},
	];

	for (const phrase of phraseProduction) {
		questions.push({
			id: phrase.id,
			prompt: phrase.english,
			correctGreek: phrase.greek,
			hint: phrase.hint,
		});
	}

	return shuffleArray(questions);
};

const VerbProductionDrill: React.FC = () => {
	const questions = useMemo(() => generateProductionQuestions(), []);

	return (
		<div className="max-w-xl mx-auto">
			<UnifiedDrill title="Verbs" questions={questions} />
		</div>
	);
};

export default VerbProductionDrill;
