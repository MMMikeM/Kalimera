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
			plannedDrills: [
				{
					id: "joining-if-then",
					title: "If … then",
					greek: "αν βρέχει · αν όχι, τότε",
					tests: "Shows an English if-sentence; the answer is the Greek with αν opening the condition, τότε optional before the result.",
				},
			],
		},
		{
			id: "thinking",
			title: "I think that…: νομίζω ότι",
			rule: "νομίζω and πιστεύω take ότι before a full sentence, as think takes that in English. ίσως, maybe, goes in front of whatever you are unsure of, in a statement. For a maybe about the future the short form is common, with no θα: ίσως πάω. To ask something softly, by any chance, use μήπως in a question: Μήπως ξέρεις τι ώρα είναι;",
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
					["μήπως ξέρεις;", "do you happen to know?"],
				],
			},
			examples: [
				{ greek: "Ίσως πάω.", english: "Maybe I'll go." },
				{ greek: "Μήπως ξέρεις τι ώρα είναι;", english: "Do you happen to know the time?" },
			],
			drills: [],
			plannedDrills: [
				{
					id: "joining-think-that",
					title: "I think that…",
					greek: "νομίζω ότι · πιστεύω ότι · ίσως · μήπως",
					tests: "Shows an English sentence such as I think it's good, maybe tomorrow or do you happen to know?; the answer is the Greek with ότι after νομίζω or πιστεύω, ίσως in a statement, or μήπως in a question.",
				},
			],
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
			plannedDrills: [
				{
					id: "joining-either-or",
					title: "Or, either … or",
					greek: "καφέ ή τσάι · ή … ή",
					tests: "Shows an English choice with or or either … or; the answer is the Greek with ή, accented, once or doubled.",
				},
			],
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
			plannedDrills: [
				{
					id: "joining-before-after",
					title: "Before and after",
					greek: "πριν πάω · πριν φάω · μετά το σχολείο",
					tests: "Shows an English phrase with before or after; the answer is the Greek with πριν and the short form of the verb, or μετά.",
				},
			],
		},
		{
			id: "which-how-many",
			title: "Which, how many, what: ποιος, πόσος, τι",
			rule: "ποιος asks which or who, and πόσος asks how much or how many. Both change like adjectives to match the noun they ask about: ποιον καφέ, ποια μέρα, ποιο σπίτι; πόση ζάχαρη, πόσα παιδιά. The he-words change for the Target too: ποιος becomes ποιον, and πόσος καιρός becomes πόσο καιρό. τι asks what and does not change; τι είδους asks what kind of. With the accent, πού and πώς ask; without it, που and πως link two ideas.",
			table: {
				columns: [
					{ label: "Masculine", greek: true },
					{ label: "Feminine", greek: true },
					{ label: "Neuter", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[{ text: "ποιος", weight: "anchor" }, "ποια", "ποιο", "which? who?"],
					[{ text: "ποιον", weight: "deviate" }, "ποια", "ποιο", "which? as the Target"],
					["ποιοι", "ποιες", "ποια", "which? more than one"],
					[{ text: "ποιους", weight: "deviate" }, "ποιες", "ποια", "more than one, as the Target"],
					[{ text: "πόσος", weight: "anchor" }, "πόση", "πόσο", "how much?"],
					["πόσοι", "πόσες", "πόσα", "how many?"],
				],
			},
			examples: [
				{ greek: "Ποιους βλέπετε;", english: "Who do you see?" },
				{ greek: "Με ποιον πηγαίνεις στις συναυλίες;", english: "Who do you go to concerts with?" },
				{ greek: "Πόσο κάνει;", english: "How much does it cost?" },
				{ greek: "Τι είδους;", english: "What kind?" },
			],
			confuse: {
				text: "πού, with the accent, asks where; που, without it, links: ο φίλος που μένει στην Πάφο.",
				section: "pou",
			},
			drills: [
				"blocks-qw-which-forms",
				"blocks-qw-which-phrase",
				"blocks-qw-how-many-forms",
				"blocks-qw-how-many-phrase",
				"blocks-qw-review",
			],
		},
		{
			id: "pou",
			title: "That, who, which: που",
			rule: "που, with no accent, joins a second idea to what came before. After a noun it means who, which or that: ο φίλος που μένει στην Πάφο. After a feeling it means that: είμαι χαρούμενος που είναι Παρασκευή. που itself does not change, whatever the noun. Careful writing sometimes uses ο οποίος, η οποία, το οποίο instead, which does match the noun.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["ο φίλος που μένει στην Πάφο", "the friend who lives in Paphos"],
					["ο ήλιος που λάμπει", "the sun that shines"],
					["είμαι χαρούμενος που είναι Παρασκευή", "I'm happy that it's Friday"],
					["είμαι περήφανος που είμαι Νιγηριανός", "I'm proud to be Nigerian"],
				],
			},
			examples: [
				{
					greek: "Μετά το καλοκαίρι έρχεται το φθινόπορο, που αποτελείται από τον Σεπτέμβριο, τον Οκτώβριο και τον Νοέμβριο.",
					english: "After summer comes autumn, which is made up of September, October and November.",
				},
				{
					greek: "Στη συνέχεια έρχεται το καλοκαίρι, το οποίο περιλαμβάνει τον Ιούνιο, τον Ιούλιο και τον Αύγουστο.",
					english: "Next comes summer, which includes June, July and August.",
				},
			],
			confuse: {
				text: "που links; πού, with the accent, asks where.",
				section: "when-why",
			},
			drills: [],
			plannedDrills: [
				{
					id: "joining-pou",
					title: "That, who, which: που",
					greek: "ο φίλος που · χαρούμενος που",
					tests: "Shows two short English ideas joined by who, which or that; the answer is the Greek joined with που, unaccented.",
				},
			],
		},
		{
			id: "purpose",
			title: "So that: για να, για να μην",
			rule: "για να before a verb says what something is for: in order to, so that. For so that … not, add μην: για να μην. After να the verb follows the usual choice: the short form for one action, the present for something ongoing. για on its own goes before a noun.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["για να απολαύσουν τον ήλιο", "to enjoy the sun"],
					["για να μάθω ελληνικά", "to learn Greek"],
					[{ text: "για να μην κρυώνουμε", weight: "deviate" }, "so that we don't get cold"],
				],
			},
			examples: [
				{
					greek: "Το χειμώνα φοράμε ζεστά ρούχα για να μην κρυώνουμε.",
					english: "In winter we wear warm clothes so that we don't get cold.",
				},
				{
					greek: "Πολλοί τουρίστες έρχονται στην Ελλάδα για να ευχαριστηθούν τον ήλιο.",
					english: "Many tourists come to Greece to enjoy the sun.",
				},
			],
			confuse: {
				text: "για before a noun means for; για να needs a verb after it.",
				section: "place/purpose",
			},
			drills: [],
			plannedDrills: [
				{
					id: "joining-purpose",
					title: "So that: για να",
					greek: "για να μάθω · για να μην κρυώνουμε",
					tests: "Shows an English sentence with to, in order to or so that … not; the answer is the Greek with για να, or για να μην, before the verb.",
				},
			],
		},
		{
			id: "but-so-also",
			title: "But, so, also: αλλά, όμως, λοιπόν, επίσης",
			rule: "αλλά, but, starts the second of two ideas. όμως also means but, and it can come later, after the first word or phrase. λοιπόν means so or well: it moves the talk on. επίσης means also; on its own it answers a good wish, you too.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["αλλά", "but"],
					["όμως", "but, though, however"],
					["λοιπόν", "so, well"],
					["επίσης", "also, as well; you too"],
				],
			},
			examples: [
				{
					greek: "Υπάρχει ένα βιβλιοπωλείο, αλλά δεν υπάρχει βιβλιοθήκη.",
					english: "There is a bookshop, but there isn't a library.",
				},
				{
					greek: "Στην Ελλάδα όμως ο χειμώνας είναι λίγο πιο ήπιος.",
					english: "In Greece, though, the winter is a little milder.",
				},
				{ greek: "Σήμερα θα γνωρίσουμε λοιπόν μερικά βασικά χρώματα.", english: "So today we will get to know some basic colours." },
				{ greek: "Καλή σου μέρα! Επίσης!", english: "Have a good day! You too!" },
			],
			drills: [],
			plannedDrills: [
				{
					id: "joining-but-so-also",
					title: "But, so, also",
					greek: "αλλά · όμως · λοιπόν · επίσης",
					tests: "Shows two short English ideas joined by but, so or also; the answer is the Greek with αλλά or όμως, λοιπόν or επίσης in its place.",
				},
			],
		},
	],
	reference: [],
};
