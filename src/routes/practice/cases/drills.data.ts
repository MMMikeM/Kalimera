import type { DrillPhase } from "@/constants/drills";

/**
 * The case drills, in teaching order: each role in turn, then the mixed review.
 *
 * Titles use the learner handles (Doer / Target / Owner), never the
 * grammatical terms — those belong to the route segments and the reference.
 */
export const CASE_PHASES: DrillPhase[] = [
	{
		phase: "Doer",
		drills: [
			{
				id: "articles-article-doer",
				to: "/practice/cases/nominative/article",
				title: "Article (Doer)",
				greek: "ο · η · το · οι · τα",
				minutes: 1,
				category: "articles",
				caseRole: "doer",
			},
			{
				id: "nominative-nouns",
				to: "/practice/cases/nominative/noun",
				title: "Noun (Doer)",
				greek: "ο φίλος · η θάλασσα · το σπίτι",
				minutes: 1,
				category: "nouns",
				caseRole: "doer",
			},
			{
				id: "adjectives-agreement",
				to: "/practice/cases/nominative/adjective",
				title: "Adjective (Doer)",
				greek: "καλός · καλή · καλό",
				minutes: 2,
				category: "adjectives",
				caseRole: "doer",
			},
			{
				id: "nominal-phrase-doer",
				to: "/practice/cases/nominative/phrase",
				title: "Phrase (Doer)",
				greek: "ο καλός φίλος · η μεγάλη πόλη · το νέο σπίτι",
				minutes: 2,
				category: "phrases",
				caseRole: "doer",
			},
		],
	},
	{
		phase: "Target",
		drills: [
			{
				id: "articles-article-target",
				to: "/practice/cases/accusative/article",
				title: "Article (Target)",
				greek: "τον · τη · το · τους · τις · τα",
				minutes: 1,
				category: "articles",
				caseRole: "target",
			},
			{
				id: "nominal-noun-target",
				to: "/practice/cases/accusative/noun",
				title: "Noun (Target)",
				greek: "τον φίλο · τη μέρα · το σπίτι",
				minutes: 1,
				category: "nouns",
				caseRole: "target",
			},
			{
				id: "adjectives-agreement-target",
				to: "/practice/cases/accusative/adjective",
				title: "Adjective (Target)",
				greek: "καλό · καλή · καλό",
				minutes: 2,
				category: "adjectives",
				caseRole: "target",
			},
			{
				id: "nominal-phrase-target",
				to: "/practice/cases/accusative/phrase",
				title: "Phrase (Target)",
				greek: "τον καλό φίλο · τη μεγάλη πόλη · το νέο σπίτι",
				minutes: 2,
				category: "phrases",
				caseRole: "target",
			},
		],
	},
	{
		phase: "Owner",
		drills: [
			{
				id: "articles-article-owner",
				to: "/practice/cases/genitive/article",
				title: "Article (Owner)",
				greek: "του · της · του · των",
				minutes: 1,
				category: "articles",
				caseRole: "owner",
			},
			{
				id: "nominal-noun-owner",
				to: "/practice/cases/genitive/noun",
				title: "Noun (Owner)",
				greek: "του φίλου · της μέρας · του σπιτιού",
				minutes: 1,
				category: "nouns",
				caseRole: "owner",
			},
			{
				id: "adjectives-agreement-owner",
				to: "/practice/cases/genitive/adjective",
				title: "Adjective (Owner)",
				greek: "καλού · καλής · καλού",
				minutes: 2,
				category: "adjectives",
				caseRole: "owner",
			},
			{
				id: "nominal-phrase-owner",
				to: "/practice/cases/genitive/phrase",
				title: "Phrase (Owner)",
				greek: "του καλού φίλου · της μεγάλης πόλης · του νέου σπιτιού",
				minutes: 2,
				category: "phrases",
				caseRole: "owner",
			},
		],
	},
	{
		phase: "Review",
		drills: [
			{
				id: "articles-paradigm",
				to: "/practice/cases/review/articles",
				title: "All articles",
				greek: "ο, η, το, τον, την, του, της…",
				minutes: 1,
				category: "articles",
				caseRole: "mixed",
			},
			{
				id: "nominal-all-nouns",
				to: "/practice/cases/review/nouns",
				title: "All nouns",
				greek: "φίλος · φίλο · φίλου · φίλοι · …",
				minutes: 2,
				category: "nouns",
				caseRole: "mixed",
			},
			{
				id: "nominal-all-adjectives",
				to: "/practice/cases/review/adjectives",
				title: "All adjectives",
				greek: "καλός · καλή · καλό · καλού · καλής · …",
				minutes: 2,
				category: "adjectives",
				caseRole: "mixed",
			},
			{
				id: "nominal-all-phrases",
				to: "/practice/cases/review/phrases",
				title: "All phrases",
				greek: "ο καλός φίλος · τη μεγάλη πόλη · του νέου σπιτιού",
				minutes: 2,
				category: "phrases",
				caseRole: "mixed",
			},
		],
	},
];
