import type React from "react";
import { useMemo } from "react";
import DrillCard from "./drill-card";
import type { Question } from "./types";
import { shuffleArray } from "./types";

// Greek-first article drill: Show Greek sentences with blanks, ask for correct article
// This teaches articles in context rather than abstract grammar rules

interface SentenceTemplate {
	id: string;
	sentence: string; // Greek sentence with ___ for blank
	english: string; // English translation
	correctArticle: string;
	wrongArticles: string[];
	case: string;
	gender: string;
	number: string;
}

const SENTENCE_TEMPLATES: SentenceTemplate[] = [
	// Nominative (subject) - masculine
	{
		id: "nom-m-sg-1",
		sentence: "___ πατέρας είναι εδώ",
		english: "The father is here",
		correctArticle: "Ο",
		wrongArticles: ["Τον", "Του", "Οι"],
		case: "nominative",
		gender: "masculine",
		number: "singular",
	},
	{
		id: "nom-m-sg-2",
		sentence: "___ καφές είναι ζεστός",
		english: "The coffee is hot",
		correctArticle: "Ο",
		wrongArticles: ["Τον", "Του", "Το"],
		case: "nominative",
		gender: "masculine",
		number: "singular",
	},
	{
		id: "nom-m-pl-1",
		sentence: "___ φίλοι έρχονται",
		english: "The friends are coming",
		correctArticle: "Οι",
		wrongArticles: ["Τους", "Των", "Ο"],
		case: "nominative",
		gender: "masculine",
		number: "plural",
	},

	// Nominative - feminine
	{
		id: "nom-f-sg-1",
		sentence: "___ μητέρα μαγειρεύει",
		english: "The mother is cooking",
		correctArticle: "Η",
		wrongArticles: ["Την", "Της", "Οι"],
		case: "nominative",
		gender: "feminine",
		number: "singular",
	},
	{
		id: "nom-f-sg-2",
		sentence: "___ πόρτα είναι ανοιχτή",
		english: "The door is open",
		correctArticle: "Η",
		wrongArticles: ["Την", "Της", "Το"],
		case: "nominative",
		gender: "feminine",
		number: "singular",
	},
	{
		id: "nom-f-pl-1",
		sentence: "___ αδελφές παίζουν",
		english: "The sisters are playing",
		correctArticle: "Οι",
		wrongArticles: ["Τις", "Των", "Η"],
		case: "nominative",
		gender: "feminine",
		number: "plural",
	},

	// Nominative - neuter
	{
		id: "nom-n-sg-1",
		sentence: "___ παιδί τρέχει",
		english: "The child is running",
		correctArticle: "Το",
		wrongArticles: ["Του", "Τα", "Ο"],
		case: "nominative",
		gender: "neuter",
		number: "singular",
	},
	{
		id: "nom-n-sg-2",
		sentence: "___ βιβλίο είναι εδώ",
		english: "The book is here",
		correctArticle: "Το",
		wrongArticles: ["Του", "Τα", "Η"],
		case: "nominative",
		gender: "neuter",
		number: "singular",
	},
	{
		id: "nom-n-pl-1",
		sentence: "___ παιδιά παίζουν",
		english: "The children are playing",
		correctArticle: "Τα",
		wrongArticles: ["Το", "Των", "Οι"],
		case: "nominative",
		gender: "neuter",
		number: "plural",
	},

	// Accusative (direct object) - masculine
	{
		id: "acc-m-sg-1",
		sentence: "Βλέπω ___ πατέρα",
		english: "I see the father",
		correctArticle: "τον",
		wrongArticles: ["ο", "του", "τους"],
		case: "accusative",
		gender: "masculine",
		number: "singular",
	},
	{
		id: "acc-m-sg-2",
		sentence: "Πίνω ___ καφέ",
		english: "I drink the coffee",
		correctArticle: "τον",
		wrongArticles: ["ο", "του", "το"],
		case: "accusative",
		gender: "masculine",
		number: "singular",
	},
	{
		id: "acc-m-pl-1",
		sentence: "Βλέπω ___ φίλους",
		english: "I see the friends",
		correctArticle: "τους",
		wrongArticles: ["οι", "των", "τον"],
		case: "accusative",
		gender: "masculine",
		number: "plural",
	},

	// Accusative - feminine
	{
		id: "acc-f-sg-1",
		sentence: "Βλέπω ___ μητέρα",
		english: "I see the mother",
		correctArticle: "την",
		wrongArticles: ["η", "της", "τις"],
		case: "accusative",
		gender: "feminine",
		number: "singular",
	},
	{
		id: "acc-f-sg-2",
		sentence: "Ανοίγω ___ πόρτα",
		english: "I open the door",
		correctArticle: "την",
		wrongArticles: ["η", "της", "το"],
		case: "accusative",
		gender: "feminine",
		number: "singular",
	},
	{
		id: "acc-f-pl-1",
		sentence: "Βλέπω ___ αδελφές",
		english: "I see the sisters",
		correctArticle: "τις",
		wrongArticles: ["οι", "των", "την"],
		case: "accusative",
		gender: "feminine",
		number: "plural",
	},

	// Accusative - neuter (same as nominative)
	{
		id: "acc-n-sg-1",
		sentence: "Βλέπω ___ παιδί",
		english: "I see the child",
		correctArticle: "το",
		wrongArticles: ["του", "τα", "τον"],
		case: "accusative",
		gender: "neuter",
		number: "singular",
	},
	{
		id: "acc-n-sg-2",
		sentence: "Διαβάζω ___ βιβλίο",
		english: "I read the book",
		correctArticle: "το",
		wrongArticles: ["του", "τα", "την"],
		case: "accusative",
		gender: "neuter",
		number: "singular",
	},
	{
		id: "acc-n-pl-1",
		sentence: "Βλέπω ___ παιδιά",
		english: "I see the children",
		correctArticle: "τα",
		wrongArticles: ["το", "των", "τους"],
		case: "accusative",
		gender: "neuter",
		number: "plural",
	},

	// Genitive (possession) - masculine
	{
		id: "gen-m-sg-1",
		sentence: "Το αυτοκίνητο ___ πατέρα",
		english: "The father's car",
		correctArticle: "του",
		wrongArticles: ["ο", "τον", "των"],
		case: "genitive",
		gender: "masculine",
		number: "singular",
	},
	{
		id: "gen-m-sg-2",
		sentence: "Το χρώμα ___ καφέ",
		english: "The color of the coffee",
		correctArticle: "του",
		wrongArticles: ["ο", "τον", "το"],
		case: "genitive",
		gender: "masculine",
		number: "singular",
	},
	{
		id: "gen-m-pl-1",
		sentence: "Τα σπίτια ___ φίλων",
		english: "The friends' houses",
		correctArticle: "των",
		wrongArticles: ["οι", "τους", "του"],
		case: "genitive",
		gender: "masculine",
		number: "plural",
	},

	// Genitive - feminine
	{
		id: "gen-f-sg-1",
		sentence: "Το σπίτι ___ μητέρας",
		english: "The mother's house",
		correctArticle: "της",
		wrongArticles: ["η", "την", "των"],
		case: "genitive",
		gender: "feminine",
		number: "singular",
	},
	{
		id: "gen-f-sg-2",
		sentence: "Το χρώμα ___ πόρτας",
		english: "The color of the door",
		correctArticle: "της",
		wrongArticles: ["η", "την", "το"],
		case: "genitive",
		gender: "feminine",
		number: "singular",
	},
	{
		id: "gen-f-pl-1",
		sentence: "Τα δωμάτια ___ αδελφών",
		english: "The sisters' rooms",
		correctArticle: "των",
		wrongArticles: ["οι", "τις", "της"],
		case: "genitive",
		gender: "feminine",
		number: "plural",
	},

	// Genitive - neuter
	{
		id: "gen-n-sg-1",
		sentence: "Το όνομα ___ παιδιού",
		english: "The child's name",
		correctArticle: "του",
		wrongArticles: ["το", "τα", "των"],
		case: "genitive",
		gender: "neuter",
		number: "singular",
	},
	{
		id: "gen-n-sg-2",
		sentence: "Ο τίτλος ___ βιβλίου",
		english: "The title of the book",
		correctArticle: "του",
		wrongArticles: ["το", "τα", "της"],
		case: "genitive",
		gender: "neuter",
		number: "singular",
	},
	{
		id: "gen-n-pl-1",
		sentence: "Τα ονόματα ___ παιδιών",
		english: "The children's names",
		correctArticle: "των",
		wrongArticles: ["τα", "το", "του"],
		case: "genitive",
		gender: "neuter",
		number: "plural",
	},
];

// Case descriptions for explanations
const CASE_DESCRIPTIONS: Record<string, string> = {
	nominative: "nominative (subject of the sentence)",
	accusative: "accusative (direct object - receives the action)",
	genitive: "genitive (shows possession or 'of')",
};

// Case badge labels with grammar context
const CASE_BADGE_LABELS: Record<string, string> = {
	nominative: "Nominative (subject)",
	accusative: "Accusative (object)",
	genitive: "Genitive (possession)",
};

// Pattern hints for each case
const CASE_HINTS: Record<string, string> = {
	nominative: "Nominative = WHO is doing the action (ο/η/το, οι/οι/τα)",
	accusative: "Accusative = WHAT is affected (τον/την/το, τους/τις/τα)",
	genitive: "Genitive = WHOSE or OF WHAT (του/της/του, των)",
};

const generateQuestions = (): Question[] => {
	return SENTENCE_TEMPLATES.map((template) => {
		const options = shuffleArray([template.correctArticle, ...template.wrongArticles]);
		const correctIndex = options.indexOf(template.correctArticle);
		const caseDesc = CASE_DESCRIPTIONS[template.case];
		const badgeLabel = CASE_BADGE_LABELS[template.case];

		return {
			id: template.id,
			prompt: template.sentence,
			promptSubtext: template.english,
			options,
			correctIndex,
			explanation: `"${template.correctArticle}" is the ${template.gender} ${template.number} ${caseDesc} article.`,
			badge: {
				label: `${badgeLabel} · ${template.gender} ${template.number}`,
				variant: template.case as "nominative" | "accusative" | "genitive",
			},
			hint: CASE_HINTS[template.case],
		};
	});
};

const ArticleDrill: React.FC = () => {
	const questions = useMemo(() => generateQuestions(), []);

	return (
		<DrillCard
			title="Article Practice"
			description="Master the definite articles by case and gender"
			questions={questions}
			variant="articles"
		/>
	);
};

export default ArticleDrill;
