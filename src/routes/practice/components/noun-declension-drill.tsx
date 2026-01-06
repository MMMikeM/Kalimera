import type React from "react";
import { useMemo } from "react";
import UnifiedDrill, { type UnifiedQuestion } from "./unified-drill";
import { shuffleArray } from "../types";
import { NOUN_PATTERNS, type NounPattern } from "../../../constants/nouns";

interface NounDrillProps {
	nouns?: Array<{
		id: number;
		lemma: string;
		pattern: string;
		english: string;
	}>;
}

type TargetCase = "accusative" | "genitive";

interface DeclensionQuestion {
	nominativeForm: string;
	targetCase: TargetCase;
	correctAnswer: string;
	pattern: string;
	hint: string;
}

const CASE_LABELS: Record<TargetCase, string> = {
	accusative: "accusative",
	genitive: "genitive",
};

const CASE_HINTS: Record<TargetCase, string> = {
	accusative: "Accusative = direct object (whom/what you see, want, etc.)",
	genitive: "Genitive = possession (of whom/what)",
};

const findDeclensionByCase = (
	pattern: NounPattern,
	caseAbbrev: string
): { singular: string; plural: string } | undefined => {
	const declension = pattern.declension.find((d) => d.case === caseAbbrev);
	return declension
		? { singular: declension.singular, plural: declension.plural }
		: undefined;
};

const generateQuestionsFromPatterns = (): DeclensionQuestion[] => {
	const questions: DeclensionQuestion[] = [];

	for (const pattern of NOUN_PATTERNS) {
		const nomForm = findDeclensionByCase(pattern, "Nom");
		const accForm = findDeclensionByCase(pattern, "Acc");
		const genForm = findDeclensionByCase(pattern, "Gen");

		if (!nomForm) continue;

		if (accForm) {
			questions.push({
				nominativeForm: nomForm.singular,
				targetCase: "accusative",
				correctAnswer: accForm.singular,
				pattern: pattern.pattern,
				hint: `${pattern.pattern} nouns: ${CASE_HINTS.accusative}`,
			});
		}

		if (genForm) {
			questions.push({
				nominativeForm: nomForm.singular,
				targetCase: "genitive",
				correctAnswer: genForm.singular,
				pattern: pattern.pattern,
				hint: `${pattern.pattern} nouns: ${CASE_HINTS.genitive}`,
			});
		}
	}

	return questions;
};

const generateQuestionsFromNouns = (
	nouns: NounDrillProps["nouns"]
): DeclensionQuestion[] => {
	if (!nouns || nouns.length === 0) return [];

	const questions: DeclensionQuestion[] = [];

	for (const noun of nouns) {
		const matchingPattern = NOUN_PATTERNS.find((p) => {
			const nomForm = findDeclensionByCase(p, "Nom");
			return nomForm?.singular === noun.lemma;
		});

		if (matchingPattern) {
			const accForm = findDeclensionByCase(matchingPattern, "Acc");
			if (accForm) {
				questions.push({
					nominativeForm: noun.lemma,
					targetCase: "accusative",
					correctAnswer: accForm.singular,
					pattern: matchingPattern.pattern,
					hint: `${matchingPattern.pattern} nouns: ${CASE_HINTS.accusative}`,
				});
			}
		}
	}

	return questions;
};

const NounDeclensionDrill: React.FC<NounDrillProps> = ({ nouns }) => {
	const questions = useMemo((): UnifiedQuestion[] => {
		const declensionQuestions =
			nouns && nouns.length > 0
				? generateQuestionsFromNouns(nouns)
				: generateQuestionsFromPatterns();

		return shuffleArray(
			declensionQuestions.map((q, idx) => ({
				id: `noun-${q.pattern}-${q.targetCase}-${idx}`,
				prompt: `${q.nominativeForm} → ${CASE_LABELS[q.targetCase]}`,
				correctGreek: q.correctAnswer,
				timeLimit: 4000,
				hint: q.hint,
			}))
		);
	}, [nouns]);

	return (
		<div className="max-w-xl mx-auto">
			<UnifiedDrill title="Noun Declension" questions={questions} />
		</div>
	);
};

export default NounDeclensionDrill;
