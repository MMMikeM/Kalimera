import type { Guide } from "@/types/guide";

export const JOINING_GUIDE: Guide = {
	slug: "joining",
	tone: "slate",
	title: "Joining ideas: when, why, if",
	greek: "Σύνδεση",
	description: "The words that link one idea to the next",
	idea: "Each question word has a partner that links two ideas and another that points back to them. Learn them as rows: πότε asks when, όταν joins a when, τότε points back to it.",
	key: [
		{ label: "Ask", tone: "honey" },
		{ label: "Link", tone: "sunset" },
		{ label: "Point back", tone: "navy" },
	],
	sections: [
		{
			id: "when-why",
			title: "Ask, link, point back",
			rule: "The question word asks. The linking word joins two ideas inside one sentence. The pointing word refers back to what was just said. γιατί can also mean because in speech, but only επειδή can start a sentence.",
			table: {
				columns: [
					{ label: "Ask", greek: true, tone: "honey" },
					{ label: "Link", greek: true, tone: "sunset" },
					{ label: "Point back", greek: true, tone: "navy" },
					{ label: "Meaning" },
				],
				rows: [
					["πότε;", { text: "όταν", weight: "anchor" }, "τότε", "when? · when · then"],
					["γιατί;", { text: "επειδή", weight: "anchor" }, "γι' αυτό", "why? · because · that's why"],
					["πού;", { text: "όπου", weight: "anchor" }, "εκεί", "where? · where · there"],
					["πώς;", { text: "όπως", weight: "anchor" }, "έτσι", "how? · as · like this"],
				],
			},
			examples: [
				{ greek: "Πότε θα έρθεις;", english: "When will you come?" },
				{ greek: "Όταν ήμουν παιδί…", english: "When I was a child…" },
				{
					greek: "Δουλεύω από το σπίτι, γι' αυτό δεν βγαίνω.",
					english: "I work from home, that's why I don't go out.",
				},
				{ greek: "Δεν βγαίνω επειδή βρέχει.", english: "I'm not going out because it's raining." },
			],
			confuse: {
				text: "όταν (when) and ήταν (was) sound almost the same. Ό- goes with πότε and τότε; ή- goes with ήμουν and ήσουν.",
				section: "verbs/eimai",
			},
			drills: ["blocks-qw-basics"],
		},
		{
			id: "if-then",
			title: "If … then: αν … τότε",
			rule: "αν opens a condition and τότε picks up the result. τότε can be left out, just as then can in English.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["αν όχι, τότε δεν ξέρω", "if not, then I don't know"],
					["αν βρέχει, δεν βγαίνω", "if it rains, I don't go out"],
				],
			},
			examples: [{ greek: "Αν όχι, τότε δεν ξέρω.", english: "If not, then I don't know." }],
			drills: [],
		},
		{
			id: "thinking",
			title: "I think that…: νομίζω ότι",
			rule: "νομίζω and πιστεύω take ότι before a full sentence, as think takes that in English. ίσως goes in front of whatever you are unsure of.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["νομίζω ότι είναι καλό", "I think it's good"],
					["πιστεύω ότι θα έρθει", "I believe he'll come"],
					["έτσι νομίζω", "I think so"],
					["ίσως αύριο", "maybe tomorrow"],
				],
			},
			examples: [{ greek: "Ίσως πάω.", english: "Maybe I'll go." }],
			drills: [],
		},
		{
			id: "either-or",
			title: "Or, and either … or: ή",
			rule: "ή means or; doubled, ή … ή means either … or. Mind the accent: ή is or, η is the article.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["καφέ ή τσάι;", "coffee or tea?"],
					["ή στα σχολεία ή στα πανεπιστήμια", "either to schools or to universities"],
				],
			},
			examples: [
				{
					greek: "Για τα ψώνια πάμε ή στο μίνι μάρκετ ή στα καταστήματα ρούχων.",
					english: "For shopping we go either to the mini market or to the clothes shops.",
				},
			],
			drills: [],
		},
		{
			id: "before",
			title: "Before and after: πριν, μετά",
			rule: "πριν means before and takes the short form, just as θα does: πριν πάω, before I go. μετά means after.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["πριν πάω για ύπνο", "before I go to sleep"],
					["πριν φάω", "before I eat"],
					["μετά το σχολείο", "after school"],
				],
			},
			examples: [
				{ greek: "Διαβάζω πριν πάω για ύπνο.", english: "I read before I go to sleep." },
			],
			drills: [],
		},
	],
	reference: [],
};
