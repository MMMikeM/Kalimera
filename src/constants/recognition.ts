// Quick case recognition patterns
export const CASE_RECOGNITION = {
	patterns: [
		{
			pattern: "Articles ending in -ν",
			rule: "Usually accusative",
			examples: ["τον", "την", "τους"],
		},
		{
			pattern: "Same form nom/acc",
			rule: "Neuter nouns",
			examples: ["το σπίτι", "το παιδί", "το τραπέζι"],
		},
		{
			pattern: "Articles του/της/των",
			rule: "Always genitive",
			examples: ["του πατέρα", "της μητέρας", "των παιδιών"],
		},
	],
	quickSpotCheck: [
		{
			pattern: "Ends in -ν?",
			meaning: "Probably accusative object",
			examples: ["βλέπω τον καφέ", "αγοράζω την εφημερίδα"],
		},
		{
			pattern: "After στο/στη/στον?",
			meaning: "Going somewhere (accusative)",
			examples: ["πηγαίνω στο σπίτι", "στη δουλειά"],
		},
		{
			pattern: '"του/της + name"?',
			meaning: "Belongs to them (genitive)",
			examples: ["της Μαρίας", "του Νίκου"],
		},
		{
			pattern: "After με/από/για?",
			meaning: "These prepositions = accusative",
			examples: ["με τον φίλο", "από το σπίτι"],
		},
		{
			pattern: "Time expressions?",
			meaning: "Usually accusative",
			examples: ["τη Δευτέρα", "το πρωί"],
		},
	],
	quickRules: [
		{
			question: "WHO does it?",
			answer: "Nominative",
			example: "ο άντρας τρέχει",
		},
		{
			question: "WHAT/WHERE to?",
			answer: "Accusative",
			example: "βλέπω τον άντρα",
		},
		{
			question: "WHOSE is it?",
			answer: "Genitive",
			example: "το σπίτι του άντρα",
		},
	],
};

// Common mistakes and corrections
export const COMMON_MISTAKES = [
	{
		wrong: "Θέλω ο καφές",
		correct: "Θέλω τον καφέ",
		explanation: "Object of the verb needs accusative, not nominative",
	},
	{
		wrong: "Πηγαίνω ο σπίτι",
		correct: "Πηγαίνω στο σπίτι",
		explanation: "Direction needs στο + accusative",
	},
	{
		wrong: "Το αυτοκίνητο ο Νίκος",
		correct: "Το αυτοκίνητο του Νίκου",
		explanation: "Possession needs genitive του, not nominative ο",
	},
	{
		wrong: "Με ο φίλος μου",
		correct: "Με τον φίλο μου",
		explanation: "Preposition με takes accusative τον, not nominative ο",
	},
];
