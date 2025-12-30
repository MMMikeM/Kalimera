import type React from "react";
import { useMemo } from "react";
import UnifiedDrill, { type UnifiedQuestion } from "./unified-drill";
import { shuffleArray } from "../types";

// Production drill: English → Greek (produce the correct Greek phrase with article)
// Tests ability to PRODUCE articles in context, not just recognize them

interface ProductionTemplate {
	id: string;
	english: string;
	greek: string;
	hint?: string;
}

// Simple noun phrases for article production
const ARTICLE_PRODUCTION: ProductionTemplate[] = [
	// Nominative masculine
	{
		id: "art-nom-m-1",
		english: "the father",
		greek: "ο πατέρας",
		hint: "Nominative masculine singular = ο",
	},
	{
		id: "art-nom-m-2",
		english: "the coffee",
		greek: "ο καφές",
		hint: "Nominative masculine singular = ο",
	},
	{
		id: "art-nom-m-3",
		english: "the friend",
		greek: "ο φίλος",
		hint: "Nominative masculine singular = ο",
	},
	{
		id: "art-nom-m-pl",
		english: "the friends",
		greek: "οι φίλοι",
		hint: "Nominative masculine plural = οι",
	},

	// Nominative feminine
	{
		id: "art-nom-f-1",
		english: "the mother",
		greek: "η μητέρα",
		hint: "Nominative feminine singular = η",
	},
	{
		id: "art-nom-f-2",
		english: "the door",
		greek: "η πόρτα",
		hint: "Nominative feminine singular = η",
	},
	{
		id: "art-nom-f-3",
		english: "the sister",
		greek: "η αδελφή",
		hint: "Nominative feminine singular = η",
	},
	{
		id: "art-nom-f-pl",
		english: "the sisters",
		greek: "οι αδελφές",
		hint: "Nominative feminine plural = οι",
	},

	// Nominative neuter
	{
		id: "art-nom-n-1",
		english: "the child",
		greek: "το παιδί",
		hint: "Nominative neuter singular = το",
	},
	{
		id: "art-nom-n-2",
		english: "the book",
		greek: "το βιβλίο",
		hint: "Nominative neuter singular = το",
	},
	{
		id: "art-nom-n-3",
		english: "the water",
		greek: "το νερό",
		hint: "Nominative neuter singular = το",
	},
	{
		id: "art-nom-n-pl",
		english: "the children",
		greek: "τα παιδιά",
		hint: "Nominative neuter plural = τα",
	},

	// Accusative (after verbs like βλέπω, θέλω, etc.)
	{
		id: "art-acc-m-1",
		english: "I see the father",
		greek: "Βλέπω τον πατέρα",
		hint: "Accusative masculine singular = τον",
	},
	{
		id: "art-acc-m-2",
		english: "I want the coffee",
		greek: "Θέλω τον καφέ",
		hint: "Accusative masculine singular = τον",
	},
	{
		id: "art-acc-m-pl",
		english: "I see the friends",
		greek: "Βλέπω τους φίλους",
		hint: "Accusative masculine plural = τους",
	},
	{
		id: "art-acc-f-1",
		english: "I see the mother",
		greek: "Βλέπω την μητέρα",
		hint: "Accusative feminine singular = την",
	},
	{
		id: "art-acc-f-2",
		english: "I open the door",
		greek: "Ανοίγω την πόρτα",
		hint: "Accusative feminine singular = την",
	},
	{
		id: "art-acc-f-pl",
		english: "I see the sisters",
		greek: "Βλέπω τις αδελφές",
		hint: "Accusative feminine plural = τις",
	},
	{
		id: "art-acc-n-1",
		english: "I see the child",
		greek: "Βλέπω το παιδί",
		hint: "Accusative neuter singular = το (same as nominative)",
	},
	{
		id: "art-acc-n-2",
		english: "I read the book",
		greek: "Διαβάζω το βιβλίο",
		hint: "Accusative neuter singular = το",
	},
	{
		id: "art-acc-n-pl",
		english: "I see the children",
		greek: "Βλέπω τα παιδιά",
		hint: "Accusative neuter plural = τα (same as nominative)",
	},

	// Genitive (possession)
	{
		id: "art-gen-m-1",
		english: "the father's car",
		greek: "το αυτοκίνητο του πατέρα",
		hint: "Genitive masculine singular = του",
	},
	{
		id: "art-gen-f-1",
		english: "the mother's house",
		greek: "το σπίτι της μητέρας",
		hint: "Genitive feminine singular = της",
	},
	{
		id: "art-gen-n-1",
		english: "the child's name",
		greek: "το όνομα του παιδιού",
		hint: "Genitive neuter singular = του",
	},
	{
		id: "art-gen-pl-1",
		english: "the children's toys",
		greek: "τα παιχνίδια των παιδιών",
		hint: "Genitive plural (all genders) = των",
	},
];

// Common everyday phrases with articles
const PHRASE_PRODUCTION: ProductionTemplate[] = [
	{
		id: "phrase-art-1",
		english: "the house",
		greek: "το σπίτι",
	},
	{
		id: "phrase-art-2",
		english: "the car",
		greek: "το αυτοκίνητο",
	},
	{
		id: "phrase-art-3",
		english: "the day",
		greek: "η μέρα",
	},
	{
		id: "phrase-art-4",
		english: "the night",
		greek: "η νύχτα",
	},
	{
		id: "phrase-art-5",
		english: "the man",
		greek: "ο άντρας",
	},
	{
		id: "phrase-art-6",
		english: "the woman",
		greek: "η γυναίκα",
	},
	{
		id: "phrase-art-7",
		english: "the food",
		greek: "το φαγητό",
	},
	{
		id: "phrase-art-8",
		english: "the work",
		greek: "η δουλειά",
	},
	{
		id: "phrase-art-9",
		english: "the time",
		greek: "ο χρόνος",
	},
	{
		id: "phrase-art-10",
		english: "the money",
		greek: "τα λεφτά",
		hint: "Money (τα λεφτά) is neuter plural in Greek",
	},
];

const generateProductionQuestions = (): UnifiedQuestion[] => {
	const allTemplates = [...ARTICLE_PRODUCTION, ...PHRASE_PRODUCTION];

	return shuffleArray(
		allTemplates.map((template) => ({
			id: template.id,
			prompt: template.english,
			correctGreek: template.greek,
			hint: template.hint,
		})),
	);
};

const ArticleProductionDrill: React.FC = () => {
	const questions = useMemo(() => generateProductionQuestions(), []);

	return (
		<div className="max-w-xl mx-auto">
			<UnifiedDrill title="Articles" questions={questions} />
		</div>
	);
};

export default ArticleProductionDrill;
