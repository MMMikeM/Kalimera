import type { Guide } from "@/types/guide";

export const JOINING_GUIDE: Guide = {
	slug: "joining",
	tone: "slate",
	title: "Joining ideas with when, why and if",
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
			rule: [
				"The words for when, why, where and how come in rows of three.",
				[
					"Ask: the question word, such as when?",
					"Link: joins two ideas inside one sentence, as in when I was a child.",
					"Point back: refers to what was just said, such as then.",
				],
				"Learn each row together; the table gives all four.",
			],
			table: {
				columns: [
					{ label: "Ask", greek: true, tone: "honey" },
					{ label: "Link", greek: true, tone: "sunset" },
					{ label: "Point back", greek: true, tone: "navy" },
					{ label: "Meaning" },
				],
				rows: [
					["πότε;", "όταν", "τότε", "when? · when · then"],
					["γιατί;", "επειδή", "γι' αυτό", "why? · because · that's why"],
					["πού;", "όπου", "εκεί", "where? · where · there"],
					["πώς;", "όπως", "έτσι", "how? · as · like this"],
				],
			},
			examples: [
				{ greek: "Πότε θα έρθεις;", english: "When will you come?" },
				{ greek: "Όταν ήμουν παιδί, έμενα στην Κύπρο.", english: "When I was a child, I lived in Cyprus." },
				{
					greek: "Δουλεύω από το σπίτι, γι' αυτό δεν βγαίνω.",
					english: "I work from home, that's why I don't go out.",
				},
				{ greek: "Δεν βγαίνω επειδή βρέχει.", english: "I'm not going out because it's raining." },
			],
			details: [
				{
					label: "γιατί for because",
					text: "In speech γιατί can also mean because, but only after the idea it explains. To start a sentence with because, use επειδή.",
					examples: [
						{ greek: "Δεν βγαίνω, γιατί βρέχει.", english: "I'm not going out, because it's raining." },
						{ greek: "Επειδή βρέχει, δεν βγαίνω.", english: "Because it's raining, I'm not going out." },
					],
				},
			],
			confuse: {
				text: "όταν (when) and ήταν (was) rhyme. όταν has the ο of πότε and τότε; ήταν has the η of ήμουν and ήσουν.",
				section: "verbs/eimai",
			},
			drills: ["blocks-qw-basics"],
		},
		{
			id: "if-then",
			title: "αν … τότε",
			rule: [
				"αν, if, opens a condition: what has to be true first. τότε, then, picks up the result.",
				"τότε can be left out, just as then can in English.",
			],
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["αν όχι, τότε δεν ξέρω", "if not, then I don't know"],
					["αν βρέχει, τότε δεν βγαίνω", "if it rains, then I don't go out"],
					["αν βρέχει, δεν βγαίνω", "if it rains, I don't go out"],
				],
			},
			examples: [{ greek: "Αν θέλεις, έλα μαζί μας.", english: "If you like, come with us." }],
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
			title: "νομίζω ότι, ίσως and μήπως",
			rule: [
				"Three ways to say what you think or are unsure of.",
				[
					"νομίζω (I think) and πιστεύω (I believe) take ότι, that, before a full sentence.",
					"ίσως, maybe, goes in front of whatever you are unsure of, in a statement.",
					"μήπως asks softly, by any chance, in a question.",
				],
				"English can drop that; Greek normally keeps ότι.",
			],
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
			examples: [{ greek: "Μήπως ξέρεις τι ώρα είναι;", english: "Do you happen to know the time?" }],
			details: [
				{
					label: "ίσως about the future",
					text: "For a maybe about the future, ίσως commonly takes the short form with no θα. The short form is the one θα takes for a single action.",
					examples: [
						{ greek: "Θα πάω.", english: "I'll go." },
						{ greek: "Ίσως πάω.", english: "Maybe I'll go." },
					],
				},
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
			title: "ή and ή … ή",
			rule: "ή means or, between two choices. Doubled, ή … ή means either … or, with one ή before each choice.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["καφέ ή τσάι;", "coffee or tea?"],
					["ή σήμερα ή αύριο", "either today or tomorrow"],
				],
			},
			examples: [
				{
					greek: "Για τα ψώνια πάμε ή στο μίνι μάρκετ ή στα καταστήματα ρούχων.",
					english: "For shopping we go either to the mini market or to the clothes shops.",
				},
			],
			details: [
				{
					label: "ή or η",
					text: "Mind the accent. ή, with the accent, is or. η, with no accent, is the article: the, before a feminine noun.",
					examples: [{ greek: "Θα έρθει η Μαρία ή η Ελένη;", english: "Will Maria or Eleni come?" }],
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
			title: "πριν and μετά",
			rule: [
				"πριν means before, and μετά means after.",
				"With a verb, πριν takes the short form: the one θα takes for a single action, as in θα πάω, I'll go.",
			],
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
				{ greek: "Μετά το σχολείο πάμε στο πάρκο.", english: "After school we go to the park." },
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
			title: "ποιος, πόσος and τι",
			rule: [
				"Three words ask which, how much and what.",
				[
					"ποιος asks which or who.",
					"πόσος asks how much or how many.",
					"τι asks what, and never changes.",
				],
				"ποιος and πόσος change their ending to match the noun they ask about, in gender and in number, as an adjective does: ποιος καφές, ποια μέρα, ποιο σπίτι; πόση ζάχαρη, πόσα παιδιά.",
				"The masculine forms change again for the Target, what the action is done to or what follows a word such as με.",
			],
			table: {
				columns: [
					{ label: "Masculine", greek: true },
					{ label: "Feminine", greek: true },
					{ label: "Neuter", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["ποιος", "ποια", "ποιο", "which? who?"],
					[{ text: "ποιον", note: 0 }, "ποια", "ποιο", "which? as the Target"],
					["ποιοι", "ποιες", "ποια", "which? more than one"],
					[{ text: "ποιους", note: 0 }, "ποιες", "ποια", "more than one, as the Target"],
					["πόσος", { text: "πόση", note: 1 }, "πόσο", "how much?"],
					["πόσοι", "πόσες", "πόσα", "how many?"],
				],
				notes: [
					"For the Target, only the masculine changes.",
					"The feminine is πόση, not πόσα as ποια would suggest.",
				],
			},
			examples: [
				{ greek: "Ποιους βλέπετε;", english: "Who do you see?" },
				{ greek: "Με ποιον πηγαίνεις στις συναυλίες;", english: "Who do you go to concerts with?" },
				{ greek: "Πόσο κάνει;", english: "How much does it cost?" },
			],
			details: [
				{
					label: "πόσος as the Target",
					text: "πόσος changes for the Target the same way: πόσος καιρός becomes πόσο καιρό, how long.",
					examples: [{ greek: "Πόσο καιρό μένεις στην Κύπρο;", english: "How long have you lived in Cyprus?" }],
				},
				{
					label: "τι είδους",
					text: "τι είδους asks what kind of. Like τι, it never changes.",
					examples: [{ greek: "Τι είδους μουσική ακούς;", english: "What kind of music do you listen to?" }],
				},
			],
			confuse: {
				text: "πού and πώς, with the accent, ask; που and πως, without it, link: ο φίλος που μένει στην Πάφο.",
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
			title: "που for that, who and which",
			rule: [
				"που, with no accent, joins a second idea to the first. It never changes, whatever the noun.",
				[
					"After a noun it means who, which or that, and says more about the noun.",
					"After a word for a feeling, such as happy or proud, it means that.",
				],
				"English can drop that; Greek keeps που.",
			],
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["ο φίλος που μένει στην Πάφο", "the friend who lives in Paphos"],
					["το βιβλίο που διαβάζω", "the book I'm reading"],
					["είμαι χαρούμενος που είναι Παρασκευή", "I'm happy that it's Friday"],
					["είμαι περήφανος που είμαι Νιγηριανός", "I'm proud to be Nigerian"],
				],
			},
			examples: [
				{
					greek: "Μετά το καλοκαίρι έρχεται το φθινόπορο, που αποτελείται από τον Σεπτέμβριο, τον Οκτώβριο και τον Νοέμβριο.",
					english: "After summer comes autumn, which is made up of September, October and November.",
				},
			],
			details: [
				{
					label: "ο οποίος in careful writing",
					text: "Careful writing sometimes uses ο οποίος, η οποία, το οποίο instead of που. Unlike που, it does match the noun it refers to.",
					examples: [
						{
							greek: "Στη συνέχεια έρχεται το καλοκαίρι, το οποίο περιλαμβάνει τον Ιούνιο, τον Ιούλιο και τον Αύγουστο.",
							english: "Next comes summer, which includes June, July and August.",
						},
					],
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
					title: "που for that, who and which",
					greek: "ο φίλος που · χαρούμενος που",
					tests: "Shows two short English ideas joined by who, which or that; the answer is the Greek joined with που, unaccented.",
				},
			],
		},
		{
			id: "purpose",
			title: "για να and για να μην",
			rule: [
				"για να before a verb says what something is for: to, in order to, so that.",
				"For so that … not, add μην after να.",
			],
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["για να απολαύσουν τον ήλιο", "to enjoy the sun"],
					["για να μάθω ελληνικά", "to learn Greek"],
					["για να μην κρυώνουμε", "so that we don't get cold"],
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
			details: [
				{
					label: "Which verb form after να",
					text: [
						"The verb form after να depends on the action.",
						[
							"For one action, use the short form, the one θα takes: θα μάθω, so για να μάθω.",
							"For something ongoing or repeated, use the present: για να μην κρυώνουμε.",
						],
					],
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
					title: "για να",
					greek: "για να μάθω · για να μην κρυώνουμε",
					tests: "Shows an English sentence with to, in order to or so that … not; the answer is the Greek with για να, or για να μην, before the verb.",
				},
			],
		},
		{
			id: "but-so-also",
			title: "αλλά, όμως, λοιπόν, επίσης",
			rule: [
				"Four common words link one idea to the next.",
				[
					"αλλά, but, starts the second of two ideas.",
					"όμως also means but, and it can come later, after the first word or phrase.",
					"λοιπόν, so or well, moves the talk on.",
					"επίσης means also.",
				],
			],
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
				{ greek: "Λοιπόν, τι θα φάμε;", english: "So, what shall we eat?" },
				{ greek: "Μιλάω επίσης λίγα ελληνικά.", english: "I also speak a little Greek." },
			],
			details: [
				{
					label: "Επίσης! as a reply",
					text: "On its own, επίσης answers a good wish: you too.",
					examples: [{ greek: "Καλή σου μέρα! Επίσης!", english: "Have a good day! You too!" }],
				},
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
