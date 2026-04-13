import type { NounDeclensionPattern } from "@/db.server/enums";
import { declineNoun } from "@/lib/noun-declension";

import type { DrillQuestion } from "./generate-questions";

const ARTICLE_DRILL_NOUNS: Array<{
	lemma: string;
	pattern: NounDeclensionPattern;
	english: string;
}> = [
	// Masculine -ος
	{ lemma: "φίλος", pattern: "masc-os", english: "friend" },
	{ lemma: "άνθρωπος", pattern: "masc-os", english: "person" },
	{ lemma: "αδερφός", pattern: "masc-os", english: "brother" },
	{ lemma: "δρόμος", pattern: "masc-os", english: "street" },
	{ lemma: "κόσμος", pattern: "masc-os", english: "world" },
	// Masculine -ας
	{ lemma: "πατέρας", pattern: "masc-as", english: "father" },
	{ lemma: "άντρας", pattern: "masc-as", english: "man" },
	// Masculine -ης
	{ lemma: "μαθητής", pattern: "masc-is", english: "student" },
	// Masculine -ές
	{ lemma: "καφές", pattern: "masc-es", english: "coffee" },
	// Feminine -α
	{ lemma: "μητέρα", pattern: "fem-a", english: "mother" },
	{ lemma: "γυναίκα", pattern: "fem-a", english: "woman" },
	{ lemma: "πόρτα", pattern: "fem-a", english: "door" },
	{ lemma: "ώρα", pattern: "fem-a", english: "hour" },
	{ lemma: "θάλασσα", pattern: "fem-a", english: "sea" },
	// Feminine -η
	{ lemma: "αδερφή", pattern: "fem-i", english: "sister" },
	// Neuter -ο
	{ lemma: "βιβλίο", pattern: "neut-o", english: "book" },
	// Neuter -ι
	{ lemma: "παιδί", pattern: "neut-i", english: "child" },
	{ lemma: "σπίτι", pattern: "neut-i", english: "house" },
	// Neuter -μα
	{ lemma: "όνομα", pattern: "neut-ma", english: "name" },
	{ lemma: "γράμμα", pattern: "neut-ma", english: "letter" },
];

export const generateArticleQuestions = (): DrillQuestion[] => {
	const questions: DrillQuestion[] = [];

	for (const noun of ARTICLE_DRILL_NOUNS) {
		const forms = declineNoun(noun.lemma, noun.pattern);
		const nomSg = forms.find((f) => f.case === "nominative" && f.number === "singular");
		const nomPl = forms.find((f) => f.case === "nominative" && f.number === "plural");

		if (!nomSg || !nomPl) continue;

		// C-format: Greek transformation (accusative + genitive, both numbers)
		for (const caseType of ["accusative", "genitive"] as const) {
			for (const number of ["singular", "plural"] as const) {
				const form = forms.find((f) => f.case === caseType && f.number === number);
				if (!form) continue;
				const baseForm = number === "singular" ? nomSg : nomPl;
				questions.push({
					id: `art-c-${noun.lemma}-${caseType}-${number}`,
					prompt: `${baseForm.full} → ${caseType} ${number}`,
					correctGreek: form.full,
					timeLimit: 5000,
					targetMs: 5000,
				});
			}
		}

		// A-format: English + case label (all three cases, both numbers)
		for (const caseType of ["nominative", "accusative", "genitive"] as const) {
			for (const number of ["singular", "plural"] as const) {
				const form = forms.find((f) => f.case === caseType && f.number === number);
				if (!form) continue;
				questions.push({
					id: `art-a-${noun.lemma}-${caseType}-${number}`,
					prompt: `the ${noun.english} (${caseType} ${number})`,
					correctGreek: form.full,
					timeLimit: 5000,
					targetMs: 5000,
				});
			}
		}
	}

	return questions;
};
