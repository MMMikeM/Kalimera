import type React from "react";
import { useMemo } from "react";
import DrillCard from "./DrillCard";
import type { Question } from "./types";

const generateQuestions = (): Question[] => {
	const questions: Question[] = [];

	// Question 1: Masculine nominative singular
	questions.push({
		id: "article-nom-masc-sg",
		prompt: "Which article for masculine nominative singular?",
		options: ["ο", "τον", "του"],
		correctIndex: 0,
		explanation: "ο is the masculine nominative singular form (the subject)",
	});

	// Question 2: Masculine accusative singular
	questions.push({
		id: "article-acc-masc-sg",
		prompt: "Which article for masculine accusative singular?",
		options: ["ο", "τον", "του"],
		correctIndex: 1,
		explanation: "τον is the masculine accusative singular form (direct object)",
	});

	// Question 3: Masculine genitive singular
	questions.push({
		id: "article-gen-masc-sg",
		prompt: "Which article for masculine genitive singular?",
		options: ["του", "τον", "ο"],
		correctIndex: 0,
		explanation: "του is the masculine genitive singular form (possession/of)",
	});

	// Question 4: Feminine nominative singular
	questions.push({
		id: "article-nom-fem-sg",
		prompt: "Which article for feminine nominative singular?",
		options: ["η", "τη(ν)", "της"],
		correctIndex: 0,
		explanation: "η is the feminine nominative singular form (the subject)",
	});

	// Question 5: Feminine accusative singular
	questions.push({
		id: "article-acc-fem-sg",
		prompt: "Which article for feminine accusative singular?",
		options: ["η", "τη(ν)", "της"],
		correctIndex: 1,
		explanation: "τη(ν) is the feminine accusative singular form (direct object)",
	});

	// Question 6: Feminine genitive singular
	questions.push({
		id: "article-gen-fem-sg",
		prompt: "Which article for feminine genitive singular?",
		options: ["της", "τη(ν)", "η"],
		correctIndex: 0,
		explanation: "της is the feminine genitive singular form (possession/of)",
	});

	// Question 7: Neuter nominative singular
	questions.push({
		id: "article-nom-neut-sg",
		prompt: "Which article for neuter nominative singular?",
		options: ["το", "τα", "του"],
		correctIndex: 0,
		explanation: "το is the neuter nominative singular form (the subject)",
	});

	// Question 8: Neuter accusative singular
	questions.push({
		id: "article-acc-neut-sg",
		prompt: "Which article for neuter accusative singular?",
		options: ["του", "το", "τα"],
		correctIndex: 1,
		explanation: "το is the neuter accusative singular form (direct object - same as nominative)",
	});

	// Question 9: Neuter genitive singular
	questions.push({
		id: "article-gen-neut-sg",
		prompt: "Which article for neuter genitive singular?",
		options: ["του", "το", "τα"],
		correctIndex: 0,
		explanation: "του is the neuter genitive singular form (possession/of)",
	});

	// Question 10: Identify case of ο
	questions.push({
		id: "case-id-o",
		prompt: "What case is 'ο'?",
		options: ["Accusative", "Nominative", "Genitive"],
		correctIndex: 1,
		explanation: "ο is nominative masculine singular (the subject article)",
	});

	// Question 11: Identify case of τον
	questions.push({
		id: "case-id-ton",
		prompt: "What case is 'τον'?",
		options: ["Genitive", "Nominative", "Accusative"],
		correctIndex: 2,
		explanation: "τον is accusative masculine singular (used after verbs with direct objects)",
	});

	// Question 12: Identify case of της
	questions.push({
		id: "case-id-tis",
		prompt: "What case is 'της'?",
		options: ["Nominative", "Accusative", "Genitive"],
		correctIndex: 2,
		explanation: "της is genitive feminine singular (possession or 'of')",
	});

	// Question 13: Plural masculine nominative
	questions.push({
		id: "article-nom-masc-pl",
		prompt: "Which article for masculine nominative plural?",
		options: ["τους", "οι", "των"],
		correctIndex: 1,
		explanation: "οι is the masculine nominative plural form (plural subjects)",
	});

	// Question 14: Plural masculine accusative
	questions.push({
		id: "article-acc-masc-pl",
		prompt: "Which article for masculine accusative plural?",
		options: ["οι", "τους", "των"],
		correctIndex: 1,
		explanation: "τους is the masculine accusative plural form (plural direct objects)",
	});

	// Question 15: Plural genitive (all genders)
	questions.push({
		id: "article-gen-pl",
		prompt: "Which article for genitive plural (all genders)?",
		options: ["της", "του", "των"],
		correctIndex: 2,
		explanation: "των is the genitive plural for all genders (possession/of plural)",
	});

	// Question 16: Identify case of τους
	questions.push({
		id: "case-id-tous",
		prompt: "What case is 'τους'?",
		options: ["Genitive", "Nominative", "Accusative"],
		correctIndex: 2,
		explanation: "τους is accusative masculine plural (plural direct objects)",
	});

	// Question 17: Practical usage - complete with article
	questions.push({
		id: "practical-acc-masc",
		prompt: "Complete: ___ καφές",
		promptSubtext: "(I drink the coffee - direct object, masculine accusative)",
		options: ["ο", "τον", "του"],
		correctIndex: 1,
		explanation: "τον is used for accusative masculine singular with verbs",
	});

	// Question 18: Practical usage - genitive
	questions.push({
		id: "practical-gen",
		prompt: "Complete: το αυτοκίνητο ___ πατέρα",
		promptSubtext: "(father's car - genitive for possession)",
		options: ["του", "την", "το"],
		correctIndex: 0,
		explanation: "του is genitive masculine singular for possession",
	});

	return questions;
};

const ArticleDrill: React.FC = () => {
	const questions = useMemo(() => generateQuestions(), []);

	return (
		<DrillCard
			title="Article Practice"
			description="Master the definite articles by case and gender"
			questions={questions}
			colorClass="border-olive/30"
			bgClass="bg-olive/5"
		/>
	);
};

export default ArticleDrill;
