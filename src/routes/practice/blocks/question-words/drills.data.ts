import type { DrillPhase } from "@/constants/drills";

export const QUESTION_WORD_PHASES: DrillPhase[] = [
	{
		phase: "Basics",
		drills: [
			{
				id: "blocks-qw-basics",
				to: "/practice/blocks/question-words/basics",
				title: "The five invariables",
				greek: "τι · πού · πότε · πώς · γιατί",
				minutes: 1,
				category: "blocks",
				caseRole: null,
			},
		],
	},
	{
		phase: "Which? (ποιος)",
		drills: [
			{
				id: "blocks-qw-which-forms",
				to: "/practice/blocks/question-words/which-forms",
				title: "Which — forms",
				greek: "ποιος · ποια · ποιο · ποιανού",
				minutes: 2,
				category: "blocks",
				caseRole: null,
			},
			{
				id: "blocks-qw-which-phrase",
				to: "/practice/blocks/question-words/which-phrase",
				title: "Which + noun",
				greek: "ποιον καφέ · ποια μέρα · ποιο σπίτι",
				minutes: 2,
				category: "blocks",
				caseRole: null,
			},
		],
	},
	{
		phase: "How much? (πόσος)",
		drills: [
			{
				id: "blocks-qw-how-many-forms",
				to: "/practice/blocks/question-words/how-many-forms",
				title: "How much — forms",
				greek: "πόσος · πόση · πόσο · πόσα",
				minutes: 1,
				category: "blocks",
				caseRole: null,
			},
			{
				id: "blocks-qw-how-many-phrase",
				to: "/practice/blocks/question-words/how-many-phrase",
				title: "How much + noun",
				greek: "πόση ζάχαρη · πόσο καιρό · πόσα παιδιά",
				minutes: 2,
				category: "blocks",
				caseRole: null,
			},
		],
	},
	{
		phase: "Review",
		drills: [
			{
				id: "blocks-qw-review",
				to: "/practice/blocks/question-words/review",
				title: "All question words",
				greek: "τι · ποιανού · πόσες · γιατί",
				minutes: 2,
				category: "blocks",
				caseRole: null,
			},
		],
	},
];
