import type { FullVerbSeed } from "../../../types/seed";

export const FULL_VERB_CONJUGATIONS: FullVerbSeed[] = [
	// ============================================
	// SUPPLETIVE VERBS (different stems across tenses)
	// ============================================

	{
		lemma: "βλέπω",
		english: "I see",
		conjugationFamily: "-ω",
		isSuppletive: true,
		stems: {
			present: "βλέπ-",
			aorist: "είδ-",
			future: "δ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "βλέπω",
					sg2: "βλέπεις",
					sg3: "βλέπει",
					pl1: "βλέπουμε",
					pl2: "βλέπετε",
					pl3: "βλέπουν",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "είδα",
					sg2: "είδες",
					sg3: "είδε",
					pl1: "είδαμε",
					pl2: "είδατε",
					pl3: "είδαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα δω",
					sg2: "θα δεις",
					sg3: "θα δει",
					pl1: "θα δούμε",
					pl2: "θα δείτε",
					pl3: "θα δουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "έβλεπα",
					sg2: "έβλεπες",
					sg3: "έβλεπε",
					pl1: "βλέπαμε",
					pl2: "βλέπατε",
					pl3: "έβλεπαν",
				},
			},
		],
		imperatives: {
			imperfective: { singular: "βλέπε", plural: "βλέπετε" },
			perfective: { singular: "δες", plural: "δείτε" },
		},
	},

	{
		lemma: "λέω",
		english: "I say",
		conjugationFamily: "irregular",
		isSuppletive: true,
		stems: {
			present: "λέ-",
			aorist: "είπ-",
			future: "π-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "λέω",
					sg2: "λες",
					sg3: "λέει",
					pl1: "λέμε",
					pl2: "λέτε",
					pl3: "λένε",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "είπα",
					sg2: "είπες",
					sg3: "είπε",
					pl1: "είπαμε",
					pl2: "είπατε",
					pl3: "είπαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα πω",
					sg2: "θα πεις",
					sg3: "θα πει",
					pl1: "θα πούμε",
					pl2: "θα πείτε",
					pl3: "θα πουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "έλεγα",
					sg2: "έλεγες",
					sg3: "έλεγε",
					pl1: "λέγαμε",
					pl2: "λέγατε",
					pl3: "έλεγαν",
				},
			},
		],
		imperatives: {
			imperfective: { singular: "λέγε", plural: "λέγετε" },
			perfective: { singular: "πες", plural: "πείτε" },
		},
	},

	{
		lemma: "τρώω",
		english: "I eat",
		conjugationFamily: "irregular",
		isSuppletive: true,
		stems: {
			present: "τρώ-",
			aorist: "έφαγ-",
			future: "φά-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "τρώω",
					sg2: "τρως",
					sg3: "τρώει",
					pl1: "τρώμε",
					pl2: "τρώτε",
					pl3: "τρώνε",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "έφαγα",
					sg2: "έφαγες",
					sg3: "έφαγε",
					pl1: "φάγαμε",
					pl2: "φάγατε",
					pl3: "έφαγαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα φάω",
					sg2: "θα φας",
					sg3: "θα φάει",
					pl1: "θα φάμε",
					pl2: "θα φάτε",
					pl3: "θα φάνε",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "έτρωγα",
					sg2: "έτρωγες",
					sg3: "έτρωγε",
					pl1: "τρώγαμε",
					pl2: "τρώγατε",
					pl3: "έτρωγαν",
				},
			},
		],
		imperatives: {
			imperfective: { singular: "τρώγε", plural: "τρώγετε" },
			perfective: { singular: "φάε", plural: "φάτε" },
		},
	},

	{
		lemma: "πίνω",
		english: "I drink",
		conjugationFamily: "-ω",
		isSuppletive: true,
		stems: {
			present: "πίν-",
			aorist: "ήπι-",
			future: "πι-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "πίνω",
					sg2: "πίνεις",
					sg3: "πίνει",
					pl1: "πίνουμε",
					pl2: "πίνετε",
					pl3: "πίνουν",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "ήπια",
					sg2: "ήπιες",
					sg3: "ήπιε",
					pl1: "ήπιαμε",
					pl2: "ήπιατε",
					pl3: "ήπιαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα πιω",
					sg2: "θα πιεις",
					sg3: "θα πιει",
					pl1: "θα πιούμε",
					pl2: "θα πιείτε",
					pl3: "θα πιουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "έπινα",
					sg2: "έπινες",
					sg3: "έπινε",
					pl1: "πίναμε",
					pl2: "πίνατε",
					pl3: "έπιναν",
				},
			},
		],
		imperatives: {
			imperfective: { singular: "πίνε", plural: "πίνετε" },
			perfective: { singular: "πιες", plural: "πιείτε" },
		},
	},

	{
		lemma: "πάω",
		english: "I go",
		conjugationFamily: "irregular",
		isSuppletive: true,
		stems: {
			present: "πά-",
			aorist: "πήγ-",
			future: "πά-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "πάω",
					sg2: "πας",
					sg3: "πάει",
					pl1: "πάμε",
					pl2: "πάτε",
					pl3: "πάνε",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "πήγα",
					sg2: "πήγες",
					sg3: "πήγε",
					pl1: "πήγαμε",
					pl2: "πήγατε",
					pl3: "πήγαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα πάω",
					sg2: "θα πας",
					sg3: "θα πάει",
					pl1: "θα πάμε",
					pl2: "θα πάτε",
					pl3: "θα πάνε",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "πήγαινα",
					sg2: "πήγαινες",
					sg3: "πήγαινε",
					pl1: "πηγαίναμε",
					pl2: "πηγαίνατε",
					pl3: "πήγαιναν",
				},
			},
		],
		imperatives: {
			imperfective: { singular: "πήγαινε", plural: "πηγαίνετε" },
			perfective: { singular: "πήγαινε", plural: "πηγαίνετε" },
		},
	},

	{
		lemma: "έρχομαι",
		english: "I come",
		conjugationFamily: "-ομαι",
		isSuppletive: true,
		stems: {
			present: "έρχ-",
			aorist: "ήρθ-",
			future: "έρθ-/έλθ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "έρχομαι",
					sg2: "έρχεσαι",
					sg3: "έρχεται",
					pl1: "ερχόμαστε",
					pl2: "έρχεστε",
					pl3: "έρχονται",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "ήρθα",
					sg2: "ήρθες",
					sg3: "ήρθε",
					pl1: "ήρθαμε",
					pl2: "ήρθατε",
					pl3: "ήρθαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα έρθω",
					sg2: "θα έρθεις",
					sg3: "θα έρθει",
					pl1: "θα έρθουμε",
					pl2: "θα έρθετε",
					pl3: "θα έρθουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "ερχόμουν",
					sg2: "ερχόσουν",
					sg3: "ερχόταν",
					pl1: "ερχόμασταν",
					pl2: "ερχόσασταν",
					pl3: "έρχονταν",
				},
			},
		],
		imperatives: {
			imperfective: { singular: "έρχου", plural: "έρχεστε" },
			perfective: { singular: "έλα", plural: "ελάτε" },
		},
	},

	{
		lemma: "βρίσκω",
		english: "I find",
		conjugationFamily: "-ω",
		isSuppletive: true,
		stems: {
			present: "βρίσκ-",
			aorist: "βρήκ-",
			future: "βρ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "βρίσκω",
					sg2: "βρίσκεις",
					sg3: "βρίσκει",
					pl1: "βρίσκουμε",
					pl2: "βρίσκετε",
					pl3: "βρίσκουν",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "βρήκα",
					sg2: "βρήκες",
					sg3: "βρήκε",
					pl1: "βρήκαμε",
					pl2: "βρήκατε",
					pl3: "βρήκαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα βρω",
					sg2: "θα βρεις",
					sg3: "θα βρει",
					pl1: "θα βρούμε",
					pl2: "θα βρείτε",
					pl3: "θα βρουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "έβρισκα",
					sg2: "έβρισκες",
					sg3: "έβρισκε",
					pl1: "βρίσκαμε",
					pl2: "βρίσκατε",
					pl3: "έβρισκαν",
				},
			},
		],
		imperatives: {
			imperfective: { singular: "βρίσκε", plural: "βρίσκετε" },
			perfective: { singular: "βρες", plural: "βρείτε" },
		},
	},

	// ============================================
	// IRREGULAR BUT CRITICAL
	// ============================================

	{
		lemma: "είμαι",
		english: "I am",
		conjugationFamily: "irregular",
		isSuppletive: false,
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "είμαι",
					sg2: "είσαι",
					sg3: "είναι",
					pl1: "είμαστε",
					pl2: "είστε",
					pl3: "είναι",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "ήμουν",
					sg2: "ήσουν",
					sg3: "ήταν",
					pl1: "ήμασταν",
					pl2: "ήσασταν",
					pl3: "ήταν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα είμαι",
					sg2: "θα είσαι",
					sg3: "θα είναι",
					pl1: "θα είμαστε",
					pl2: "θα είστε",
					pl3: "θα είναι",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "ήμουν",
					sg2: "ήσουν",
					sg3: "ήταν",
					pl1: "ήμασταν",
					pl2: "ήσασταν",
					pl3: "ήταν",
				},
			},
		],
		imperatives: {
			perfective: { singular: "να είσαι", plural: "να είστε" },
		},
	},

	// ============================================
	// HIGH-FREQUENCY REGULAR VERBS
	// ============================================

	{
		lemma: "έχω",
		english: "I have",
		conjugationFamily: "-ω",
		isSuppletive: false,
		stems: {
			present: "έχ-",
			aorist: "είχ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "έχω",
					sg2: "έχεις",
					sg3: "έχει",
					pl1: "έχουμε",
					pl2: "έχετε",
					pl3: "έχουν",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "είχα",
					sg2: "είχες",
					sg3: "είχε",
					pl1: "είχαμε",
					pl2: "είχατε",
					pl3: "είχαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα έχω",
					sg2: "θα έχεις",
					sg3: "θα έχει",
					pl1: "θα έχουμε",
					pl2: "θα έχετε",
					pl3: "θα έχουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "είχα",
					sg2: "είχες",
					sg3: "είχε",
					pl1: "είχαμε",
					pl2: "είχατε",
					pl3: "είχαν",
				},
			},
		],
		imperatives: {
			imperfective: { singular: "έχε", plural: "έχετε" },
		},
	},

	{
		lemma: "κάνω",
		english: "I do/make",
		conjugationFamily: "-ω",
		isSuppletive: false,
		stems: {
			present: "κάν-",
			aorist: "έκαν-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "κάνω",
					sg2: "κάνεις",
					sg3: "κάνει",
					pl1: "κάνουμε",
					pl2: "κάνετε",
					pl3: "κάνουν",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "έκανα",
					sg2: "έκανες",
					sg3: "έκανε",
					pl1: "κάναμε",
					pl2: "κάνατε",
					pl3: "έκαναν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα κάνω",
					sg2: "θα κάνεις",
					sg3: "θα κάνει",
					pl1: "θα κάνουμε",
					pl2: "θα κάνετε",
					pl3: "θα κάνουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "έκανα",
					sg2: "έκανες",
					sg3: "έκανε",
					pl1: "κάναμε",
					pl2: "κάνατε",
					pl3: "έκαναν",
				},
			},
		],
		imperatives: {
			imperfective: { singular: "κάνε", plural: "κάνετε" },
			perfective: { singular: "κάνε", plural: "κάντε" },
		},
	},

	{
		lemma: "θέλω",
		english: "I want",
		conjugationFamily: "-ω",
		isSuppletive: false,
		stems: {
			present: "θέλ-",
			aorist: "θέλησ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "θέλω",
					sg2: "θέλεις",
					sg3: "θέλει",
					pl1: "θέλουμε",
					pl2: "θέλετε",
					pl3: "θέλουν",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "ήθελα",
					sg2: "ήθελες",
					sg3: "ήθελε",
					pl1: "θέλαμε",
					pl2: "θέλατε",
					pl3: "ήθελαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα θέλω",
					sg2: "θα θέλεις",
					sg3: "θα θέλει",
					pl1: "θα θέλουμε",
					pl2: "θα θέλετε",
					pl3: "θα θέλουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "ήθελα",
					sg2: "ήθελες",
					sg3: "ήθελε",
					pl1: "θέλαμε",
					pl2: "θέλατε",
					pl3: "ήθελαν",
				},
			},
		],
	},

	{
		lemma: "μπορώ",
		english: "I can",
		conjugationFamily: "-άω/-ώ",
		isSuppletive: false,
		stems: {
			present: "μπορ-",
			aorist: "μπόρεσ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "μπορώ",
					sg2: "μπορείς",
					sg3: "μπορεί",
					pl1: "μπορούμε",
					pl2: "μπορείτε",
					pl3: "μπορούν",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "μπόρεσα",
					sg2: "μπόρεσες",
					sg3: "μπόρεσε",
					pl1: "μπορέσαμε",
					pl2: "μπορέσατε",
					pl3: "μπόρεσαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα μπορώ",
					sg2: "θα μπορείς",
					sg3: "θα μπορεί",
					pl1: "θα μπορούμε",
					pl2: "θα μπορείτε",
					pl3: "θα μπορούν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "μπορούσα",
					sg2: "μπορούσες",
					sg3: "μπορούσε",
					pl1: "μπορούσαμε",
					pl2: "μπορούσατε",
					pl3: "μπορούσαν",
				},
			},
		],
	},

	{
		lemma: "ξέρω",
		english: "I know",
		conjugationFamily: "-ω",
		isSuppletive: false,
		stems: {
			present: "ξέρ-",
			aorist: "ήξερ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "ξέρω",
					sg2: "ξέρεις",
					sg3: "ξέρει",
					pl1: "ξέρουμε",
					pl2: "ξέρετε",
					pl3: "ξέρουν",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "ήξερα",
					sg2: "ήξερες",
					sg3: "ήξερε",
					pl1: "ξέραμε",
					pl2: "ξέρατε",
					pl3: "ήξεραν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα ξέρω",
					sg2: "θα ξέρεις",
					sg3: "θα ξέρει",
					pl1: "θα ξέρουμε",
					pl2: "θα ξέρετε",
					pl3: "θα ξέρουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "ήξερα",
					sg2: "ήξερες",
					sg3: "ήξερε",
					pl1: "ξέραμε",
					pl2: "ξέρατε",
					pl3: "ήξεραν",
				},
			},
		],
	},

	{
		lemma: "μιλάω",
		english: "I speak",
		conjugationFamily: "-άω/-ώ",
		isSuppletive: false,
		stems: {
			present: "μιλ-",
			aorist: "μίλησ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "μιλάω",
					sg2: "μιλάς",
					sg3: "μιλάει",
					pl1: "μιλάμε",
					pl2: "μιλάτε",
					pl3: "μιλάνε",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "μίλησα",
					sg2: "μίλησες",
					sg3: "μίλησε",
					pl1: "μιλήσαμε",
					pl2: "μιλήσατε",
					pl3: "μίλησαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα μιλήσω",
					sg2: "θα μιλήσεις",
					sg3: "θα μιλήσει",
					pl1: "θα μιλήσουμε",
					pl2: "θα μιλήσετε",
					pl3: "θα μιλήσουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "μιλούσα",
					sg2: "μιλούσες",
					sg3: "μιλούσε",
					pl1: "μιλούσαμε",
					pl2: "μιλούσατε",
					pl3: "μιλούσαν",
				},
			},
		],
		imperatives: {
			imperfective: { singular: "μίλα", plural: "μιλάτε" },
			perfective: { singular: "μίλησε", plural: "μιλήστε" },
		},
	},

	{
		lemma: "αγαπάω",
		english: "I love",
		conjugationFamily: "-άω/-ώ",
		isSuppletive: false,
		stems: {
			present: "αγαπ-",
			aorist: "αγάπησ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "αγαπάω",
					sg2: "αγαπάς",
					sg3: "αγαπάει",
					pl1: "αγαπάμε",
					pl2: "αγαπάτε",
					pl3: "αγαπάνε",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "αγάπησα",
					sg2: "αγάπησες",
					sg3: "αγάπησε",
					pl1: "αγαπήσαμε",
					pl2: "αγαπήσατε",
					pl3: "αγάπησαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα αγαπήσω",
					sg2: "θα αγαπήσεις",
					sg3: "θα αγαπήσει",
					pl1: "θα αγαπήσουμε",
					pl2: "θα αγαπήσετε",
					pl3: "θα αγαπήσουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "αγαπούσα",
					sg2: "αγαπούσες",
					sg3: "αγαπούσε",
					pl1: "αγαπούσαμε",
					pl2: "αγαπούσατε",
					pl3: "αγαπούσαν",
				},
			},
		],
		imperatives: {
			imperfective: { singular: "αγάπα", plural: "αγαπάτε" },
			perfective: { singular: "αγάπησε", plural: "αγαπήστε" },
		},
	},

	{
		lemma: "δουλεύω",
		english: "I work",
		conjugationFamily: "-ω",
		isSuppletive: false,
		stems: {
			present: "δουλεύ-",
			aorist: "δούλεψ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "δουλεύω",
					sg2: "δουλεύεις",
					sg3: "δουλεύει",
					pl1: "δουλεύουμε",
					pl2: "δουλεύετε",
					pl3: "δουλεύουν",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "δούλεψα",
					sg2: "δούλεψες",
					sg3: "δούλεψε",
					pl1: "δουλέψαμε",
					pl2: "δουλέψατε",
					pl3: "δούλεψαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα δουλέψω",
					sg2: "θα δουλέψεις",
					sg3: "θα δουλέψει",
					pl1: "θα δουλέψουμε",
					pl2: "θα δουλέψετε",
					pl3: "θα δουλέψουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "δούλευα",
					sg2: "δούλευες",
					sg3: "δούλευε",
					pl1: "δουλεύαμε",
					pl2: "δουλεύατε",
					pl3: "δούλευαν",
				},
			},
		],
		imperatives: {
			imperfective: { singular: "δούλευε", plural: "δουλεύετε" },
			perfective: { singular: "δούλεψε", plural: "δουλέψτε" },
		},
	},

	{
		lemma: "γράφω",
		english: "I write",
		conjugationFamily: "-ω",
		isSuppletive: false,
		stems: {
			present: "γράφ-",
			aorist: "έγραψ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "γράφω",
					sg2: "γράφεις",
					sg3: "γράφει",
					pl1: "γράφουμε",
					pl2: "γράφετε",
					pl3: "γράφουν",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "έγραψα",
					sg2: "έγραψες",
					sg3: "έγραψε",
					pl1: "γράψαμε",
					pl2: "γράψατε",
					pl3: "έγραψαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα γράψω",
					sg2: "θα γράψεις",
					sg3: "θα γράψει",
					pl1: "θα γράψουμε",
					pl2: "θα γράψετε",
					pl3: "θα γράψουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "έγραφα",
					sg2: "έγραφες",
					sg3: "έγραφε",
					pl1: "γράφαμε",
					pl2: "γράφατε",
					pl3: "έγραφαν",
				},
			},
		],
		imperatives: {
			imperfective: { singular: "γράφε", plural: "γράφετε" },
			perfective: { singular: "γράψε", plural: "γράψτε" },
		},
	},

	{
		lemma: "διαβάζω",
		english: "I read",
		conjugationFamily: "-ω",
		isSuppletive: false,
		stems: {
			present: "διαβάζ-",
			aorist: "διάβασ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "διαβάζω",
					sg2: "διαβάζεις",
					sg3: "διαβάζει",
					pl1: "διαβάζουμε",
					pl2: "διαβάζετε",
					pl3: "διαβάζουν",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "διάβασα",
					sg2: "διάβασες",
					sg3: "διάβασε",
					pl1: "διαβάσαμε",
					pl2: "διαβάσατε",
					pl3: "διάβασαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα διαβάσω",
					sg2: "θα διαβάσεις",
					sg3: "θα διαβάσει",
					pl1: "θα διαβάσουμε",
					pl2: "θα διαβάσετε",
					pl3: "θα διαβάσουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "διάβαζα",
					sg2: "διάβαζες",
					sg3: "διάβαζε",
					pl1: "διαβάζαμε",
					pl2: "διαβάζατε",
					pl3: "διάβαζαν",
				},
			},
		],
		imperatives: {
			imperfective: { singular: "διάβαζε", plural: "διαβάζετε" },
			perfective: { singular: "διάβασε", plural: "διαβάστε" },
		},
	},

	{
		lemma: "ακούω",
		english: "I hear/listen",
		conjugationFamily: "-ω",
		isSuppletive: false,
		stems: {
			present: "ακού-",
			aorist: "άκουσ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "ακούω",
					sg2: "ακούς",
					sg3: "ακούει",
					pl1: "ακούμε",
					pl2: "ακούτε",
					pl3: "ακούνε",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "άκουσα",
					sg2: "άκουσες",
					sg3: "άκουσε",
					pl1: "ακούσαμε",
					pl2: "ακούσατε",
					pl3: "άκουσαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα ακούσω",
					sg2: "θα ακούσεις",
					sg3: "θα ακούσει",
					pl1: "θα ακούσουμε",
					pl2: "θα ακούσετε",
					pl3: "θα ακούσουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "άκουγα",
					sg2: "άκουγες",
					sg3: "άκουγε",
					pl1: "ακούγαμε",
					pl2: "ακούγατε",
					pl3: "άκουγαν",
				},
			},
		],
		imperatives: {
			imperfective: { singular: "άκουγε", plural: "ακούγετε" },
			perfective: { singular: "άκουσε", plural: "ακούστε" },
		},
	},

	{
		lemma: "παίρνω",
		english: "I take",
		conjugationFamily: "-ω",
		isSuppletive: true,
		stems: {
			present: "παίρν-",
			aorist: "πήρ-",
			future: "πάρ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "παίρνω",
					sg2: "παίρνεις",
					sg3: "παίρνει",
					pl1: "παίρνουμε",
					pl2: "παίρνετε",
					pl3: "παίρνουν",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "πήρα",
					sg2: "πήρες",
					sg3: "πήρε",
					pl1: "πήραμε",
					pl2: "πήρατε",
					pl3: "πήραν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα πάρω",
					sg2: "θα πάρεις",
					sg3: "θα πάρει",
					pl1: "θα πάρουμε",
					pl2: "θα πάρετε",
					pl3: "θα πάρουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "έπαιρνα",
					sg2: "έπαιρνες",
					sg3: "έπαιρνε",
					pl1: "παίρναμε",
					pl2: "παίρνατε",
					pl3: "έπαιρναν",
				},
			},
		],
		imperatives: {
			imperfective: { singular: "παίρνε", plural: "παίρνετε" },
			perfective: { singular: "πάρε", plural: "πάρτε" },
		},
	},

	{
		lemma: "δίνω",
		english: "I give",
		conjugationFamily: "-ω",
		isSuppletive: true,
		stems: {
			present: "δίν-",
			aorist: "έδωσ-",
			future: "δώσ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "δίνω",
					sg2: "δίνεις",
					sg3: "δίνει",
					pl1: "δίνουμε",
					pl2: "δίνετε",
					pl3: "δίνουν",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "έδωσα",
					sg2: "έδωσες",
					sg3: "έδωσε",
					pl1: "δώσαμε",
					pl2: "δώσατε",
					pl3: "έδωσαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα δώσω",
					sg2: "θα δώσεις",
					sg3: "θα δώσει",
					pl1: "θα δώσουμε",
					pl2: "θα δώσετε",
					pl3: "θα δώσουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "έδινα",
					sg2: "έδινες",
					sg3: "έδινε",
					pl1: "δίναμε",
					pl2: "δίνατε",
					pl3: "έδιναν",
				},
			},
		],
		imperatives: {
			imperfective: { singular: "δίνε", plural: "δίνετε" },
			perfective: { singular: "δώσε", plural: "δώστε" },
		},
	},

	{
		lemma: "φεύγω",
		english: "I leave",
		conjugationFamily: "-ω",
		isSuppletive: true,
		stems: {
			present: "φεύγ-",
			aorist: "έφυγ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "φεύγω",
					sg2: "φεύγεις",
					sg3: "φεύγει",
					pl1: "φεύγουμε",
					pl2: "φεύγετε",
					pl3: "φεύγουν",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "έφυγα",
					sg2: "έφυγες",
					sg3: "έφυγε",
					pl1: "φύγαμε",
					pl2: "φύγατε",
					pl3: "έφυγαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα φύγω",
					sg2: "θα φύγεις",
					sg3: "θα φύγει",
					pl1: "θα φύγουμε",
					pl2: "θα φύγετε",
					pl3: "θα φύγουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "έφευγα",
					sg2: "έφευγες",
					sg3: "έφευγε",
					pl1: "φεύγαμε",
					pl2: "φεύγατε",
					pl3: "έφευγαν",
				},
			},
		],
		imperatives: {
			imperfective: { singular: "φεύγε", plural: "φεύγετε" },
			perfective: { singular: "φύγε", plural: "φύγετε" },
		},
	},

	{
		lemma: "μένω",
		english: "I stay/live",
		conjugationFamily: "-ω",
		isSuppletive: false,
		stems: {
			present: "μέν-",
			aorist: "έμειν-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "μένω",
					sg2: "μένεις",
					sg3: "μένει",
					pl1: "μένουμε",
					pl2: "μένετε",
					pl3: "μένουν",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "έμεινα",
					sg2: "έμεινες",
					sg3: "έμεινε",
					pl1: "μείναμε",
					pl2: "μείνατε",
					pl3: "έμειναν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα μείνω",
					sg2: "θα μείνεις",
					sg3: "θα μείνει",
					pl1: "θα μείνουμε",
					pl2: "θα μείνετε",
					pl3: "θα μείνουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "έμενα",
					sg2: "έμενες",
					sg3: "έμενε",
					pl1: "μέναμε",
					pl2: "μένατε",
					pl3: "έμεναν",
				},
			},
		],
		imperatives: {
			imperfective: { singular: "μένε", plural: "μένετε" },
			perfective: { singular: "μείνε", plural: "μείντε" },
		},
	},

	// ============================================
	// HIGH-FREQUENCY ACTIVE VERBS (top-110 corpus)
	// ============================================

	{
		lemma: "ευχαριστώ",
		english: "I thank",
		conjugationFamily: "-άω/-ώ",
		isSuppletive: false,
		stems: {
			present: "ευχαριστ-",
			aorist: "ευχαρίστησ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "ευχαριστώ",
					sg2: "ευχαριστείς",
					sg3: "ευχαριστεί",
					pl1: "ευχαριστούμε",
					pl2: "ευχαριστείτε",
					pl3: "ευχαριστούν",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "ευχαρίστησα",
					sg2: "ευχαρίστησες",
					sg3: "ευχαρίστησε",
					pl1: "ευχαριστήσαμε",
					pl2: "ευχαριστήσατε",
					pl3: "ευχαρίστησαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα ευχαριστώ",
					sg2: "θα ευχαριστείς",
					sg3: "θα ευχαριστεί",
					pl1: "θα ευχαριστούμε",
					pl2: "θα ευχαριστείτε",
					pl3: "θα ευχαριστούν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "ευχαριστούσα",
					sg2: "ευχαριστούσες",
					sg3: "ευχαριστούσε",
					pl1: "ευχαριστούσαμε",
					pl2: "ευχαριστούσατε",
					pl3: "ευχαριστούσαν",
				},
			},
		],
	},

	{
		lemma: "παρακαλώ",
		english: "I ask / please",
		conjugationFamily: "-άω/-ώ",
		isSuppletive: false,
		stems: {
			present: "παρακαλ-",
			aorist: "παρακάλεσ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "παρακαλώ",
					sg2: "παρακαλείς",
					sg3: "παρακαλεί",
					pl1: "παρακαλούμε",
					pl2: "παρακαλείτε",
					pl3: "παρακαλούν",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "παρακάλεσα",
					sg2: "παρακάλεσες",
					sg3: "παρακάλεσε",
					pl1: "παρακαλέσαμε",
					pl2: "παρακαλέσατε",
					pl3: "παρακάλεσαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα παρακαλώ",
					sg2: "θα παρακαλείς",
					sg3: "θα παρακαλεί",
					pl1: "θα παρακαλούμε",
					pl2: "θα παρακαλείτε",
					pl3: "θα παρακαλούν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "παρακαλούσα",
					sg2: "παρακαλούσες",
					sg3: "παρακαλούσε",
					pl1: "παρακαλούσαμε",
					pl2: "παρακαλούσατε",
					pl3: "παρακαλούσαν",
				},
			},
		],
	},

	{
		lemma: "νομίζω",
		english: "I think (opinion)",
		conjugationFamily: "-ω",
		isSuppletive: false,
		stems: {
			present: "νομίζ-",
			aorist: "νόμισ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "νομίζω",
					sg2: "νομίζεις",
					sg3: "νομίζει",
					pl1: "νομίζουμε",
					pl2: "νομίζετε",
					pl3: "νομίζουν",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "νόμισα",
					sg2: "νόμισες",
					sg3: "νόμισε",
					pl1: "νομίσαμε",
					pl2: "νομίσατε",
					pl3: "νόμισαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα νομίζω",
					sg2: "θα νομίζεις",
					sg3: "θα νομίζει",
					pl1: "θα νομίζουμε",
					pl2: "θα νομίζετε",
					pl3: "θα νομίζουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "νόμιζα",
					sg2: "νόμιζες",
					sg3: "νόμιζε",
					pl1: "νομίζαμε",
					pl2: "νομίζατε",
					pl3: "νόμιζαν",
				},
			},
		],
	},

	// ============================================
	// HIGH-FREQUENCY DEPONENTS (-μαι family)
	// ============================================

	{
		lemma: "λυπάμαι",
		english: "I'm sorry",
		conjugationFamily: "-άμαι",
		isSuppletive: false,
		stems: {
			present: "λυπ-",
			aorist: "λυπήθηκ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "λυπάμαι",
					sg2: "λυπάσαι",
					sg3: "λυπάται",
					pl1: "λυπόμαστε",
					pl2: "λυπάστε",
					pl3: "λυπούνται",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "λυπήθηκα",
					sg2: "λυπήθηκες",
					sg3: "λυπήθηκε",
					pl1: "λυπηθήκαμε",
					pl2: "λυπηθήκατε",
					pl3: "λυπήθηκαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα λυπάμαι",
					sg2: "θα λυπάσαι",
					sg3: "θα λυπάται",
					pl1: "θα λυπόμαστε",
					pl2: "θα λυπάστε",
					pl3: "θα λυπούνται",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "λυπόμουν",
					sg2: "λυπόσουν",
					sg3: "λυπόταν",
					pl1: "λυπόμασταν",
					pl2: "λυπόσασταν",
					pl3: "λυπόνταν",
				},
			},
		],
	},

	{
		lemma: "χρειάζομαι",
		english: "I need",
		conjugationFamily: "-ομαι",
		isSuppletive: false,
		stems: {
			present: "χρειάζ-",
			aorist: "χρειάστηκ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "χρειάζομαι",
					sg2: "χρειάζεσαι",
					sg3: "χρειάζεται",
					pl1: "χρειαζόμαστε",
					pl2: "χρειάζεστε",
					pl3: "χρειάζονται",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "χρειάστηκα",
					sg2: "χρειάστηκες",
					sg3: "χρειάστηκε",
					pl1: "χρειαστήκαμε",
					pl2: "χρειαστήκατε",
					pl3: "χρειάστηκαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα χρειάζομαι",
					sg2: "θα χρειάζεσαι",
					sg3: "θα χρειάζεται",
					pl1: "θα χρειαζόμαστε",
					pl2: "θα χρειάζεστε",
					pl3: "θα χρειάζονται",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "χρειαζόμουν",
					sg2: "χρειαζόσουν",
					sg3: "χρειαζόταν",
					pl1: "χρειαζόμασταν",
					pl2: "χρειαζόσασταν",
					pl3: "χρειάζονταν",
				},
			},
		],
	},

	{
		lemma: "χαίρομαι",
		english: "I'm glad",
		conjugationFamily: "-ομαι",
		isSuppletive: false,
		stems: {
			present: "χαίρ-",
			aorist: "χάρηκ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "χαίρομαι",
					sg2: "χαίρεσαι",
					sg3: "χαίρεται",
					pl1: "χαιρόμαστε",
					pl2: "χαίρεστε",
					pl3: "χαίρονται",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "χάρηκα",
					sg2: "χάρηκες",
					sg3: "χάρηκε",
					pl1: "χαρήκαμε",
					pl2: "χαρήκατε",
					pl3: "χάρηκαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα χαίρομαι",
					sg2: "θα χαίρεσαι",
					sg3: "θα χαίρεται",
					pl1: "θα χαιρόμαστε",
					pl2: "θα χαίρεστε",
					pl3: "θα χαίρονται",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "χαιρόμουν",
					sg2: "χαιρόσουν",
					sg3: "χαιρόταν",
					pl1: "χαιρόμασταν",
					pl2: "χαιρόσασταν",
					pl3: "χαίρονταν",
				},
			},
		],
	},

	{
		lemma: "φοβάμαι",
		english: "I'm afraid",
		conjugationFamily: "-άμαι",
		isSuppletive: false,
		stems: {
			present: "φοβ-",
			aorist: "φοβήθηκ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "φοβάμαι",
					sg2: "φοβάσαι",
					sg3: "φοβάται",
					pl1: "φοβόμαστε",
					pl2: "φοβάστε",
					pl3: "φοβούνται",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "φοβήθηκα",
					sg2: "φοβήθηκες",
					sg3: "φοβήθηκε",
					pl1: "φοβηθήκαμε",
					pl2: "φοβηθήκατε",
					pl3: "φοβήθηκαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα φοβάμαι",
					sg2: "θα φοβάσαι",
					sg3: "θα φοβάται",
					pl1: "θα φοβόμαστε",
					pl2: "θα φοβάστε",
					pl3: "θα φοβούνται",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "φοβόμουν",
					sg2: "φοβόσουν",
					sg3: "φοβόταν",
					pl1: "φοβόμασταν",
					pl2: "φοβόσασταν",
					pl3: "φοβόνταν",
				},
			},
		],
	},

	{
		lemma: "σκέφτομαι",
		english: "I think",
		conjugationFamily: "-ομαι",
		isSuppletive: false,
		stems: {
			present: "σκέφτ-",
			aorist: "σκέφτηκ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "σκέφτομαι",
					sg2: "σκέφτεσαι",
					sg3: "σκέφτεται",
					pl1: "σκεφτόμαστε",
					pl2: "σκέφτεστε",
					pl3: "σκέφτονται",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "σκέφτηκα",
					sg2: "σκέφτηκες",
					sg3: "σκέφτηκε",
					pl1: "σκεφτήκαμε",
					pl2: "σκεφτήκατε",
					pl3: "σκέφτηκαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα σκέφτομαι",
					sg2: "θα σκέφτεσαι",
					sg3: "θα σκέφτεται",
					pl1: "θα σκεφτόμαστε",
					pl2: "θα σκέφτεστε",
					pl3: "θα σκέφτονται",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "σκεφτόμουν",
					sg2: "σκεφτόσουν",
					sg3: "σκεφτόταν",
					pl1: "σκεφτόμασταν",
					pl2: "σκεφτόσασταν",
					pl3: "σκέφτονταν",
				},
			},
		],
	},

	{
		lemma: "υπόσχομαι",
		english: "I promise",
		conjugationFamily: "-ομαι",
		isSuppletive: false,
		stems: {
			present: "υπόσχ-",
			aorist: "υποσχέθηκ-",
		},
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "υπόσχομαι",
					sg2: "υπόσχεσαι",
					sg3: "υπόσχεται",
					pl1: "υποσχόμαστε",
					pl2: "υπόσχεστε",
					pl3: "υπόσχονται",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "υποσχέθηκα",
					sg2: "υποσχέθηκες",
					sg3: "υποσχέθηκε",
					pl1: "υποσχεθήκαμε",
					pl2: "υποσχεθήκατε",
					pl3: "υποσχέθηκαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα υπόσχομαι",
					sg2: "θα υπόσχεσαι",
					sg3: "θα υπόσχεται",
					pl1: "θα υποσχόμαστε",
					pl2: "θα υπόσχεστε",
					pl3: "θα υπόσχονται",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "υποσχόμουν",
					sg2: "υποσχόσουν",
					sg3: "υποσχόταν",
					pl1: "υποσχόμασταν",
					pl2: "υποσχόσασταν",
					pl3: "υπόσχονταν",
				},
			},
		],
	},
	{
		lemma: "νιώθω",
		english: "I feel",
		conjugationFamily: "-ω",
		conjugations: [
			{
				tense: "present",
				forms: { sg1: "νιώθω", sg2: "νιώθεις", sg3: "νιώθει", pl1: "νιώθουμε", pl2: "νιώθετε", pl3: "νιώθουν" },
			},
			{
				tense: "aorist",
				forms: { sg1: "ένιωσα", sg2: "ένιωσες", sg3: "ένιωσε", pl1: "νιώσαμε", pl2: "νιώσατε", pl3: "ένιωσαν" },
			},
			{
				tense: "future",
				forms: { sg1: "θα νιώσω", sg2: "θα νιώσεις", sg3: "θα νιώσει", pl1: "θα νιώσουμε", pl2: "θα νιώσετε", pl3: "θα νιώσουν" },
			},
			{
				tense: "past_continuous",
				forms: { sg1: "ένιωθα", sg2: "ένιωθες", sg3: "ένιωθε", pl1: "νιώθαμε", pl2: "νιώθατε", pl3: "ένιωθαν" },
			},
		],
		imperatives: {
			imperfective: { singular: "νιώθε", plural: "νιώθετε" },
			perfective: { singular: "νιώσε", plural: "νιώστε" },
		},
	},
	{
		lemma: "πεθαίνω",
		english: "I die",
		conjugationFamily: "-ω",
		conjugations: [
			{
				tense: "present",
				forms: { sg1: "πεθαίνω", sg2: "πεθαίνεις", sg3: "πεθαίνει", pl1: "πεθαίνουμε", pl2: "πεθαίνετε", pl3: "πεθαίνουν" },
			},
			{
				tense: "aorist",
				forms: { sg1: "πέθανα", sg2: "πέθανες", sg3: "πέθανε", pl1: "πεθάναμε", pl2: "πεθάνατε", pl3: "πέθαναν" },
			},
			{
				tense: "future",
				forms: { sg1: "θα πεθάνω", sg2: "θα πεθάνεις", sg3: "θα πεθάνει", pl1: "θα πεθάνουμε", pl2: "θα πεθάνετε", pl3: "θα πεθάνουν" },
			},
			{
				tense: "past_continuous",
				forms: { sg1: "πέθαινα", sg2: "πέθαινες", sg3: "πέθαινε", pl1: "πεθαίναμε", pl2: "πεθαίνατε", pl3: "πέθαιναν" },
			},
		],
		imperatives: {
			imperfective: { singular: "πέθαινε", plural: "πεθαίνετε" },
			perfective: { singular: "πέθανε", plural: "πεθάνετε" },
		},
	},
];
