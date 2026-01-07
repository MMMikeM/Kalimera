import type React from "react";
import { useMemo } from "react";
import UnifiedDrill, { type UnifiedQuestion } from "./unified-drill";
import { getNounForm, type Case } from "@/lib/noun-declension";
import type { DeclensionPattern } from "@/db.server/enums";

interface PracticeNoun {
	lemma: string;
	pattern: DeclensionPattern;
	english: string;
}

const PRACTICE_NOUNS: PracticeNoun[] = [
	{ lemma: "φίλος", pattern: "masc-os", english: "friend" },
	{ lemma: "καφές", pattern: "masc-es", english: "coffee" },
	{ lemma: "γυναίκα", pattern: "fem-a", english: "woman" },
	{ lemma: "βιβλίο", pattern: "neut-o", english: "book" },
	{ lemma: "πατέρας", pattern: "masc-as", english: "father" },
	{ lemma: "μαθητής", pattern: "masc-is", english: "student" },
	{ lemma: "ζωή", pattern: "fem-i", english: "life" },
	{ lemma: "παιδί", pattern: "neut-i", english: "child" },
];

const CASE_LABELS: Record<Case, string> = {
	nominative: "nominative",
	accusative: "accusative",
	genitive: "genitive",
};

const generateQuestions = (count: number): UnifiedQuestion[] => {
	const questions: UnifiedQuestion[] = [];
	const usedCombinations = new Set<string>();

	while (questions.length < count) {
		const nounIndex = Math.floor(Math.random() * PRACTICE_NOUNS.length);
		const noun = PRACTICE_NOUNS[nounIndex];
		if (!noun) continue;

		const nominativeForm = getNounForm(
			noun.lemma,
			noun.pattern,
			"nominative",
			"singular",
		);
		if (!nominativeForm) continue;

		const targetCase: Case = "accusative";
		const targetForm = getNounForm(
			noun.lemma,
			noun.pattern,
			targetCase,
			"singular",
		);
		if (!targetForm) continue;

		const combinationKey = `${noun.lemma}-${targetCase}`;
		if (usedCombinations.has(combinationKey)) continue;
		usedCombinations.add(combinationKey);

		questions.push({
			id: `declension-${noun.lemma}-${targetCase}`,
			prompt: `${nominativeForm.full} → ${CASE_LABELS[targetCase]}`,
			correctGreek: targetForm.full,
			timeLimit: 4000,
			hint: `${noun.english} in ${targetCase} case`,
		});
	}

	return questions;
};

interface NounDeclensionDrillProps {
	questionCount?: number;
}

const NounDeclensionDrill: React.FC<NounDeclensionDrillProps> = ({
	questionCount = 8,
}) => {
	const questions = useMemo(
		() => generateQuestions(Math.min(questionCount, PRACTICE_NOUNS.length)),
		[questionCount],
	);

	if (questions.length === 0) {
		return (
			<div className="text-center py-12 bg-stone-100 rounded-xl border border-stone-300">
				<h3 className="text-xl font-semibold text-stone-700 mb-2">
					No questions available
				</h3>
				<p className="text-stone-600">
					Could not generate declension questions.
				</p>
			</div>
		);
	}

	return (
		<div className="max-w-xl mx-auto">
			<UnifiedDrill
				title={`Noun Declension (${questions.length} items)`}
				questions={questions}
			/>
		</div>
	);
};

export default NounDeclensionDrill;
