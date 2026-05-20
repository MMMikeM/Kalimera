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
		isSuppletive: true,
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
		lemma: "θέλω",
		english: "I want",
		conjugationFamily: "-ω",
		isSuppletive: true,
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
		lemma: "ξέρω",
		english: "I know",
		conjugationFamily: "-ω",
		isSuppletive: true,
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
		lemma: "ακούω",
		english: "I hear/listen",
		conjugationFamily: "-ω",
		isSuppletive: true,
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

	// ============================================
	// HIGH-FREQUENCY DEPONENTS (-μαι family)
	// ============================================

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
		isSuppletive: true,
		conjugations: [
			{
				tense: "present",
				forms: {
					sg1: "νιώθω",
					sg2: "νιώθεις",
					sg3: "νιώθει",
					pl1: "νιώθουμε",
					pl2: "νιώθετε",
					pl3: "νιώθουν",
				},
			},
			{
				tense: "aorist",
				forms: {
					sg1: "ένιωσα",
					sg2: "ένιωσες",
					sg3: "ένιωσε",
					pl1: "νιώσαμε",
					pl2: "νιώσατε",
					pl3: "ένιωσαν",
				},
			},
			{
				tense: "future",
				forms: {
					sg1: "θα νιώσω",
					sg2: "θα νιώσεις",
					sg3: "θα νιώσει",
					pl1: "θα νιώσουμε",
					pl2: "θα νιώσετε",
					pl3: "θα νιώσουν",
				},
			},
			{
				tense: "past_continuous",
				forms: {
					sg1: "ένιωθα",
					sg2: "ένιωθες",
					sg3: "ένιωθε",
					pl1: "νιώθαμε",
					pl2: "νιώθατε",
					pl3: "ένιωθαν",
				},
			},
		],
		imperatives: {
			imperfective: { singular: "νιώθε", plural: "νιώθετε" },
			perfective: { singular: "νιώσε", plural: "νιώστε" },
		},
	},

	{
		lemma: "ζω",
		english: "I live/am alive",
		cefrLevel: "A1",
		conjugationFamily: "irregular",
		conjugations: [
			{ tense: "present", forms: { sg1: "ζω", sg2: "ζεις", sg3: "ζει", pl1: "ζούμε", pl2: "ζείτε", pl3: "ζουν" } },
			{ tense: "aorist", forms: { sg1: "έζησα", sg2: "έζησες", sg3: "έζησε", pl1: "ζήσαμε", pl2: "ζήσατε", pl3: "έζησαν" } },
			{ tense: "past_continuous", forms: { sg1: "ζούσα", sg2: "ζούσες", sg3: "ζούσε", pl1: "ζούσαμε", pl2: "ζούσατε", pl3: "ζούσαν" } },
			{ tense: "future", forms: { sg1: "θα ζήσω", sg2: "θα ζήσεις", sg3: "θα ζήσει", pl1: "θα ζήσουμε", pl2: "θα ζήσετε", pl3: "θα ζήσουν" } },
		],
		imperatives: { perfective: { singular: "ζήσε", plural: "ζήστε" } },
	},
	{
		lemma: "βγαίνω",
		english: "I go out",
		cefrLevel: "A1",
		conjugationFamily: "irregular",
		conjugations: [
			{ tense: "present", forms: { sg1: "βγαίνω", sg2: "βγαίνεις", sg3: "βγαίνει", pl1: "βγαίνουμε", pl2: "βγαίνετε", pl3: "βγαίνουν" } },
			{ tense: "aorist", forms: { sg1: "βγήκα", sg2: "βγήκες", sg3: "βγήκε", pl1: "βγήκαμε", pl2: "βγήκατε", pl3: "βγήκαν" } },
			{ tense: "past_continuous", forms: { sg1: "έβγαινα", sg2: "έβγαινες", sg3: "έβγαινε", pl1: "βγαίναμε", pl2: "βγαίνατε", pl3: "έβγαιναν" } },
			{ tense: "future", forms: { sg1: "θα βγω", sg2: "θα βγεις", sg3: "θα βγει", pl1: "θα βγούμε", pl2: "θα βγείτε", pl3: "θα βγουν" } },
		],
		imperatives: { imperfective: { singular: "βγαίνε", plural: "βγαίνετε" }, perfective: { singular: "βγες", plural: "βγείτε" } },
	},
	{
		lemma: "μπαίνω",
		english: "I enter/get in",
		cefrLevel: "A1",
		conjugationFamily: "irregular",
		conjugations: [
			{ tense: "present", forms: { sg1: "μπαίνω", sg2: "μπαίνεις", sg3: "μπαίνει", pl1: "μπαίνουμε", pl2: "μπαίνετε", pl3: "μπαίνουν" } },
			{ tense: "aorist", forms: { sg1: "μπήκα", sg2: "μπήκες", sg3: "μπήκε", pl1: "μπήκαμε", pl2: "μπήκατε", pl3: "μπήκαν" } },
			{ tense: "past_continuous", forms: { sg1: "έμπαινα", sg2: "έμπαινες", sg3: "έμπαινε", pl1: "μπαίναμε", pl2: "μπαίνατε", pl3: "έμπαιναν" } },
			{ tense: "future", forms: { sg1: "θα μπω", sg2: "θα μπεις", sg3: "θα μπει", pl1: "θα μπούμε", pl2: "θα μπείτε", pl3: "θα μπουν" } },
		],
		imperatives: { imperfective: { singular: "μπαίνε", plural: "μπαίνετε" }, perfective: { singular: "μπες", plural: "μπείτε" } },
	},
	{
		lemma: "μαθαίνω",
		english: "I learn/teach",
		cefrLevel: "A1",
		conjugationFamily: "irregular",
		conjugations: [
			{ tense: "present", forms: { sg1: "μαθαίνω", sg2: "μαθαίνεις", sg3: "μαθαίνει", pl1: "μαθαίνουμε", pl2: "μαθαίνετε", pl3: "μαθαίνουν" } },
			{ tense: "aorist", forms: { sg1: "έμαθα", sg2: "έμαθες", sg3: "έμαθε", pl1: "μάθαμε", pl2: "μάθατε", pl3: "έμαθαν" } },
			{ tense: "past_continuous", forms: { sg1: "μάθαινα", sg2: "μάθαινες", sg3: "μάθαινε", pl1: "μαθαίναμε", pl2: "μαθαίνατε", pl3: "μάθαιναν" } },
			{ tense: "future", forms: { sg1: "θα μάθω", sg2: "θα μάθεις", sg3: "θα μάθει", pl1: "θα μάθουμε", pl2: "θα μάθετε", pl3: "θα μάθουν" } },
		],
		imperatives: { imperfective: { singular: "μάθαινε", plural: "μαθαίνετε" }, perfective: { singular: "μάθε", plural: "μάθετε" } },
	},
	{
		lemma: "κλαίω",
		english: "I cry",
		cefrLevel: "A1",
		conjugationFamily: "irregular",
		conjugations: [
			{ tense: "present", forms: { sg1: "κλαίω", sg2: "κλαις", sg3: "κλαίει", pl1: "κλαίμε", pl2: "κλαίτε", pl3: "κλαίνε" } },
			{ tense: "aorist", forms: { sg1: "έκλαψα", sg2: "έκλαψες", sg3: "έκλαψε", pl1: "κλάψαμε", pl2: "κλάψατε", pl3: "έκλαψαν" } },
			{ tense: "past_continuous", forms: { sg1: "έκλαιγα", sg2: "έκλαιγες", sg3: "έκλαιγε", pl1: "κλαίγαμε", pl2: "κλαίγατε", pl3: "έκλαιγαν" } },
			{ tense: "future", forms: { sg1: "θα κλάψω", sg2: "θα κλάψεις", sg3: "θα κλάψει", pl1: "θα κλάψουμε", pl2: "θα κλάψετε", pl3: "θα κλάψουν" } },
		],
		imperatives: { perfective: { singular: "κλάψε", plural: "κλάψτε" } },
	},

	// ── A1 -ομαι / -άμαι ───────────────────────────────────────────────────────

	{
		lemma: "κάθομαι",
		english: "I sit",
		cefrLevel: "A1",
		conjugationFamily: "-ομαι",
		conjugations: [
			{ tense: "present", forms: { sg1: "κάθομαι", sg2: "κάθεσαι", sg3: "κάθεται", pl1: "καθόμαστε", pl2: "κάθεστε", pl3: "κάθονται" } },
			{ tense: "aorist", forms: { sg1: "κάθισα", sg2: "κάθισες", sg3: "κάθισε", pl1: "καθίσαμε", pl2: "καθίσατε", pl3: "κάθισαν" } },
			{ tense: "past_continuous", forms: { sg1: "καθόμουν", sg2: "καθόσουν", sg3: "καθόταν", pl1: "καθόμαστε", pl2: "καθόσαστε", pl3: "κάθονταν" } },
			{ tense: "future", forms: { sg1: "θα καθίσω", sg2: "θα καθίσεις", sg3: "θα καθίσει", pl1: "θα καθίσουμε", pl2: "θα καθίσετε", pl3: "θα καθίσουν" } },
		],
		imperatives: { imperfective: { singular: "κάθου", plural: "καθίστε" }, perfective: { singular: "κάθισε", plural: "καθίστε" } },
	},
	{
		lemma: "γίνομαι",
		english: "I become",
		cefrLevel: "A1",
		conjugationFamily: "-ομαι",
		isSuppletive: true,
		conjugations: [
			{ tense: "present", forms: { sg1: "γίνομαι", sg2: "γίνεσαι", sg3: "γίνεται", pl1: "γινόμαστε", pl2: "γίνεστε", pl3: "γίνονται" } },
			{ tense: "aorist", forms: { sg1: "έγινα", sg2: "έγινες", sg3: "έγινε", pl1: "γίναμε", pl2: "γίνατε", pl3: "έγιναν" } },
			{ tense: "past_continuous", forms: { sg1: "γινόμουν", sg2: "γινόσουν", sg3: "γινόταν", pl1: "γινόμαστε", pl2: "γινόσαστε", pl3: "γίνονταν" } },
			{ tense: "future", forms: { sg1: "θα γίνω", sg2: "θα γίνεις", sg3: "θα γίνει", pl1: "θα γίνουμε", pl2: "θα γίνετε", pl3: "θα γίνουν" } },
		],
		imperatives: { perfective: { singular: "γίνε", plural: "γίνετε" } },
	},
	{
		lemma: "κουρεύομαι",
		english: "I get a haircut",
		cefrLevel: "A2",
		conjugationFamily: "-ομαι",
		conjugations: [
			{ tense: "present", forms: { sg1: "κουρεύομαι", sg2: "κουρεύεσαι", sg3: "κουρεύεται", pl1: "κουρευόμαστε", pl2: "κουρεύεστε", pl3: "κουρεύονται" } },
			{ tense: "aorist", forms: { sg1: "κουρεύτηκα", sg2: "κουρεύτηκες", sg3: "κουρεύτηκε", pl1: "κουρευτήκαμε", pl2: "κουρευτήκατε", pl3: "κουρεύτηκαν" } },
			{ tense: "past_continuous", forms: { sg1: "κουρευόμουν", sg2: "κουρευόσουν", sg3: "κουρευόταν", pl1: "κουρευόμαστε", pl2: "κουρευόσαστε", pl3: "κουρεύονταν" } },
			{ tense: "future", forms: { sg1: "θα κουρευτώ", sg2: "θα κουρευτείς", sg3: "θα κουρευτεί", pl1: "θα κουρευτούμε", pl2: "θα κουρευτείτε", pl3: "θα κουρευτούν" } },
		],
		imperatives: { perfective: { singular: "κουρέψου", plural: "κουρευτείτε" } },
	},
	{
		lemma: "υπάρχω",
		english: "I exist/there is",
		cefrLevel: "A1",
		conjugationFamily: "-ω",
		isSuppletive: true,
		conjugations: [
			{ tense: "present", forms: { sg1: "υπάρχω", sg2: "υπάρχεις", sg3: "υπάρχει", pl1: "υπάρχουμε", pl2: "υπάρχετε", pl3: "υπάρχουν" } },
			{ tense: "aorist", forms: { sg1: "υπήρξα", sg2: "υπήρξες", sg3: "υπήρξε", pl1: "υπήρξαμε", pl2: "υπήρξατε", pl3: "υπήρξαν" } },
			{ tense: "past_continuous", forms: { sg1: "υπήρχα", sg2: "υπήρχες", sg3: "υπήρχε", pl1: "υπάρχαμε", pl2: "υπάρχατε", pl3: "υπήρχαν" } },
			{ tense: "future", forms: { sg1: "θα υπάρξω", sg2: "θα υπάρξεις", sg3: "θα υπάρξει", pl1: "θα υπάρξουμε", pl2: "θα υπάρξετε", pl3: "θα υπάρξουν" } },
		],
	},
	// ── A2 irregular ───────────────────────────────────────────────────────────

	{
		lemma: "καταλαβαίνω",
		english: "I understand",
		cefrLevel: "A2",
		conjugationFamily: "irregular",
		conjugations: [
			{ tense: "present", forms: { sg1: "καταλαβαίνω", sg2: "καταλαβαίνεις", sg3: "καταλαβαίνει", pl1: "καταλαβαίνουμε", pl2: "καταλαβαίνετε", pl3: "καταλαβαίνουν" } },
			{ tense: "aorist", forms: { sg1: "κατάλαβα", sg2: "κατάλαβες", sg3: "κατάλαβε", pl1: "καταλάβαμε", pl2: "καταλάβατε", pl3: "κατάλαβαν" } },
			{ tense: "past_continuous", forms: { sg1: "καταλάβαινα", sg2: "καταλάβαινες", sg3: "καταλάβαινε", pl1: "καταλαβαίναμε", pl2: "καταλαβαίνατε", pl3: "καταλάβαιναν" } },
			{ tense: "future", forms: { sg1: "θα καταλάβω", sg2: "θα καταλάβεις", sg3: "θα καταλάβει", pl1: "θα καταλάβουμε", pl2: "θα καταλάβετε", pl3: "θα καταλάβουν" } },
		],
		imperatives: { perfective: { singular: "κατάλαβε", plural: "καταλάβτε" } },
	},
	{
		lemma: "κατεβαίνω",
		english: "I go down/get off",
		cefrLevel: "A2",
		conjugationFamily: "irregular",
		conjugations: [
			{ tense: "present", forms: { sg1: "κατεβαίνω", sg2: "κατεβαίνεις", sg3: "κατεβαίνει", pl1: "κατεβαίνουμε", pl2: "κατεβαίνετε", pl3: "κατεβαίνουν" } },
			{ tense: "aorist", forms: { sg1: "κατέβηκα", sg2: "κατέβηκες", sg3: "κατέβηκε", pl1: "κατεβήκαμε", pl2: "κατεβήκατε", pl3: "κατέβηκαν" } },
			{ tense: "past_continuous", forms: { sg1: "κατέβαινα", sg2: "κατέβαινες", sg3: "κατέβαινε", pl1: "κατεβαίναμε", pl2: "κατεβαίνατε", pl3: "κατέβαιναν" } },
			{ tense: "future", forms: { sg1: "θα κατεβώ", sg2: "θα κατεβείς", sg3: "θα κατεβεί", pl1: "θα κατεβούμε", pl2: "θα κατεβείτε", pl3: "θα κατεβούν" } },
		],
		imperatives: { imperfective: { singular: "κατέβαινε", plural: "κατεβαίνετε" }, perfective: { singular: "κατέβα", plural: "κατεβείτε" } },
	},
	{
		lemma: "ανεβαίνω",
		english: "I go up/get on",
		cefrLevel: "A2",
		conjugationFamily: "irregular",
		conjugations: [
			{ tense: "present", forms: { sg1: "ανεβαίνω", sg2: "ανεβαίνεις", sg3: "ανεβαίνει", pl1: "ανεβαίνουμε", pl2: "ανεβαίνετε", pl3: "ανεβαίνουν" } },
			{ tense: "aorist", forms: { sg1: "ανέβηκα", sg2: "ανέβηκες", sg3: "ανέβηκε", pl1: "ανεβήκαμε", pl2: "ανεβήκατε", pl3: "ανέβηκαν" } },
			{ tense: "past_continuous", forms: { sg1: "ανέβαινα", sg2: "ανέβαινες", sg3: "ανέβαινε", pl1: "ανεβαίναμε", pl2: "ανεβαίνατε", pl3: "ανέβαιναν" } },
			{ tense: "future", forms: { sg1: "θα ανεβώ", sg2: "θα ανεβείς", sg3: "θα ανεβεί", pl1: "θα ανεβούμε", pl2: "θα ανεβείτε", pl3: "θα ανεβούν" } },
		],
		imperatives: { imperfective: { singular: "ανέβαινε", plural: "ανεβαίνετε" }, perfective: { singular: "ανέβα", plural: "ανεβείτε" } },
	},

	// ── A2 -ομαι / -άμαι ───────────────────────────────────────────────────────

	{
		lemma: "επισκέπτομαι",
		english: "I visit",
		cefrLevel: "A2",
		conjugationFamily: "-ομαι",
		conjugations: [
			{ tense: "present", forms: { sg1: "επισκέπτομαι", sg2: "επισκέπτεσαι", sg3: "επισκέπτεται", pl1: "επισκεπτόμαστε", pl2: "επισκέπτεστε", pl3: "επισκέπτονται" } },
			{ tense: "aorist", forms: { sg1: "επισκέφτηκα", sg2: "επισκέφτηκες", sg3: "επισκέφτηκε", pl1: "επισκεφτήκαμε", pl2: "επισκεφτήκατε", pl3: "επισκέφτηκαν" } },
			{ tense: "past_continuous", forms: { sg1: "επισκεπτόμουν", sg2: "επισκεπτόσουν", sg3: "επισκεπτόταν", pl1: "επισκεπτόμαστε", pl2: "επισκεπτόσαστε", pl3: "επισκέπτονταν" } },
			{ tense: "future", forms: { sg1: "θα επισκεφτώ", sg2: "θα επισκεφτείς", sg3: "θα επισκεφτεί", pl1: "θα επισκεφτούμε", pl2: "θα επισκεφτείτε", pl3: "θα επισκεφτούν" } },
		],
	},
	{
		lemma: "φαίνομαι",
		english: "I seem/appear",
		cefrLevel: "A2",
		conjugationFamily: "-ομαι",
		conjugations: [
			{ tense: "present", forms: { sg1: "φαίνομαι", sg2: "φαίνεσαι", sg3: "φαίνεται", pl1: "φαινόμαστε", pl2: "φαίνεστε", pl3: "φαίνονται" } },
			{ tense: "aorist", forms: { sg1: "φάνηκα", sg2: "φάνηκες", sg3: "φάνηκε", pl1: "φανήκαμε", pl2: "φανήκατε", pl3: "φάνηκαν" } },
			{ tense: "past_continuous", forms: { sg1: "φαινόμουν", sg2: "φαινόσουν", sg3: "φαινόταν", pl1: "φαινόμαστε", pl2: "φαινόσαστε", pl3: "φαίνονταν" } },
			{ tense: "future", forms: { sg1: "θα φανώ", sg2: "θα φανείς", sg3: "θα φανεί", pl1: "θα φανούμε", pl2: "θα φανείτε", pl3: "θα φανούν" } },
		],
	},
];
