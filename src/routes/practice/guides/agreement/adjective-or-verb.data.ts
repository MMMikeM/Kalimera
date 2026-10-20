import type { SimpleListItem } from "../../components/engines/deck";

/** καλή, καλοί and καλεί sound the same, and so do καλό and καλώ: only the spelling differs. */
export const OPTIONS = ["καλή", "καλεί", "καλοί", "καλό", "καλώ"];

export const ITEMS: SimpleListItem[] = [
	{ id: "mera-kali", reverseGreek: "Η μέρα είναι ___.", label: "The day is good.", greek: "Η μέρα είναι καλή.", dimension: "καλή" },
	{ id: "idea-kali", reverseGreek: "Έχω μια ___ ιδέα.", label: "I have a good idea.", greek: "Έχω μια καλή ιδέα.", dimension: "καλή" },
	{ id: "kali-orexi", reverseGreek: "___ όρεξη!", label: "Enjoy your meal!", greek: "Καλή όρεξη!", dimension: "καλή" },
	{ id: "poios-kalei", reverseGreek: "Ποιος ___;", label: "Who's calling?", greek: "Ποιος καλεί;", dimension: "καλεί" },
	{ id: "mama-kalei", reverseGreek: "Η μαμά ___ τα παιδιά για φαγητό.", label: "Mum is calling the children to eat.", greek: "Η μαμά καλεί τα παιδιά για φαγητό.", dimension: "καλεί" },
	{ id: "maria-kalei", reverseGreek: "Η Μαρία μας ___ κάθε Κυριακή.", label: "Maria invites us every Sunday.", greek: "Η Μαρία μας καλεί κάθε Κυριακή.", dimension: "καλεί" },
	{ id: "giatros-kalei", reverseGreek: "Ο γιατρός ___ τον επόμενο.", label: "The doctor calls in the next one.", greek: "Ο γιατρός καλεί τον επόμενο.", dimension: "καλεί" },
	{ id: "filoi-kaloi", reverseGreek: "Οι φίλοι μου είναι ___.", label: "My friends are kind.", greek: "Οι φίλοι μου είναι καλοί.", dimension: "καλοί" },
	{ id: "geitones-kaloi", reverseGreek: "Οι γείτονες είναι ___ άνθρωποι.", label: "The neighbours are good people.", greek: "Οι γείτονες είναι καλοί άνθρωποι.", dimension: "καλοί" },
	{ id: "kafedes-kaloi", reverseGreek: "Οι καφέδες εδώ είναι ___.", label: "The coffees here are good.", greek: "Οι καφέδες εδώ είναι καλοί.", dimension: "καλοί" },
	{ id: "fagito-kalo", reverseGreek: "Το φαγητό είναι ___.", label: "The food is good.", greek: "Το φαγητό είναι καλό.", dimension: "καλό" },
	{ id: "paidi-kalo", reverseGreek: "Είναι ένα ___ παιδί.", label: "He's a good child.", greek: "Είναι ένα καλό παιδί.", dimension: "καλό" },
	{ id: "kalo-taxidi", reverseGreek: "___ ταξίδι!", label: "Have a good trip!", greek: "Καλό ταξίδι!", dimension: "καλό" },
	{ id: "parti-kalo", reverseGreek: "Σας ___ στο πάρτι μου.", label: "I'm inviting you to my party.", greek: "Σας καλώ στο πάρτι μου.", dimension: "καλώ" },
	{ id: "fagito-kalo-verb", reverseGreek: "Τον ___ για φαγητό.", label: "I'm inviting him for a meal.", greek: "Τον καλώ για φαγητό.", dimension: "καλώ" },
	{ id: "kanenan-kalo", reverseGreek: "Δεν ___ κανέναν.", label: "I'm not inviting anyone.", greek: "Δεν καλώ κανέναν.", dimension: "καλώ" },
];
