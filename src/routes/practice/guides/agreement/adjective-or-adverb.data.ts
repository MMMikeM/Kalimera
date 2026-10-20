import type { SimpleListItem } from "../../components/engines/deck";

/**
 * Words that agree, "καλός or καλά?". The context gives the adjective and the gap; the
 * answer is the word for the gap. No card gaps a neuter plural, which looks just like
 * the adverb. ακριβώς cards give ακριβής, never ακριβός: the grader hears ακριβός and
 * ακριβώς as the same word.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "kalos-mageiras", context: "καλός · Ο Νίκος είναι ___ μάγειρας.", label: "Nikos is a good cook.", greek: "καλός" },
	{ id: "mageirevei-kala", context: "καλός · Ο Νίκος μαγειρεύει ___.", label: "Nikos cooks well.", greek: "καλά" },
	{ id: "eimai-kala", context: "καλός · Είμαι ___.", label: "I'm well.", greek: "καλά" },
	{ id: "eimai-kalos", context: "καλός · Είμαι ___.", label: "I'm a good person. (a man speaking)", greek: "καλός" },
	{ id: "pernao-kala", context: "καλός · Περνάω ___.", label: "I'm having a good time.", greek: "καλά" },
	{ id: "mera-kali", context: "καλός · Η μέρα είναι ___.", label: "The day is good.", greek: "καλή" },
	{ id: "fagito-kalo", context: "καλός · Το φαγητό είναι ___.", label: "The food is good.", greek: "καλό" },
	{ id: "milaei-kala", context: "καλός · Η Μαρία μιλάει ___ ελληνικά.", label: "Maria speaks Greek well.", greek: "καλά" },
	{ id: "koimithika-kala", context: "καλός · Κοιμήθηκα ___.", label: "I slept well.", greek: "καλά" },
	{ id: "servitoros-grigoros", context: "γρήγορος · Ο σερβιτόρος είναι πολύ ___.", label: "The waiter is very quick.", greek: "γρήγορος" },
	{ id: "odigei-grigora", context: "γρήγορος · Ο Νίκος οδηγεί ___.", label: "Nikos drives fast.", greek: "γρήγορα" },
	{ id: "grigoro-aftokinito", context: "γρήγορος · Έχει ένα ___ αυτοκίνητο.", label: "He has a fast car.", greek: "γρήγορο" },
	{ id: "milas-grigora", context: "γρήγορος · Μιλάς πολύ ___.", label: "You speak very fast.", greek: "γρήγορα" },
	{ id: "ela-grigora", context: "γρήγορος · Έλα ___!", label: "Come quickly!", greek: "γρήγορα" },
	{ id: "kafes-akrivos", context: "ακριβός · Ο καφές εδώ είναι ___.", label: "The coffee here is expensive.", greek: "ακριβός" },
	{ id: "poulaei-akriva", context: "ακριβός · Αυτό το μαγαζί πουλάει ___.", label: "This shop is expensive. (it sells expensively)", greek: "ακριβά" },
	{ id: "akrivi-poli", context: "ακριβός · Η Αθήνα είναι ___ πόλη.", label: "Athens is an expensive city.", greek: "ακριβή" },
	{ id: "eisitirio-akrivo", context: "ακριβός · Το εισιτήριο είναι ___.", label: "The ticket is expensive.", greek: "ακριβό" },
	{ id: "plirosa-akriva", context: "ακριβός · Τα πλήρωσα ___.", label: "I paid a lot for them.", greek: "ακριβά" },
	{ id: "exi-akrivos", context: "ακριβής · Το μάθημα αρχίζει στις έξι ___.", label: "The lesson starts at exactly six.", greek: "ακριβώς" },
	{ id: "ora-akrivos", context: "ακριβής · Τι ώρα είναι ___;", label: "What time is it exactly?", greek: "ακριβώς" },
	{ id: "akrivos", context: "ακριβής · ___!", label: "Exactly!", greek: "Ακριβώς!" },
	{ id: "theleis-akrivos", context: "ακριβής · Τι ___ θέλεις;", label: "What exactly do you want?", greek: "ακριβώς" },
	{ id: "synithos-kafe", context: "συνήθης · ___ πίνω καφέ το πρωί.", label: "I usually drink coffee in the morning.", greek: "Συνήθως" },
	{ id: "synithos-spiti", context: "συνήθης · Το Σάββατο ___ μένω σπίτι.", label: "On Saturdays I usually stay home.", greek: "συνήθως" },
];
