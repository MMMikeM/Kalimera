import type { SimpleListItem } from "../../components/engines/deck";

/** The answer is the grid word alone; the sentence around the gap shows which row and column. */
export const ITEMS: SimpleListItem[] = [
	{ id: "kati-thelo-po", context: "Θέλω να σου πω ___.", label: "I want to tell you something.", greek: "κάτι" },
	{ id: "kati-gia-sena", context: "Έχω ___ για σένα.", label: "I have something for you.", greek: "κάτι" },
	{ id: "tipota-vrika", context: "Δεν βρήκα ___.", label: "I didn't find anything.", greek: "τίποτα" },
	{ id: "tipota-kano", context: "Δεν κάνω ___ σήμερα.", label: "I'm not doing anything today.", greek: "τίποτα" },
	{ id: "ola-entaxei", context: "___ είναι εντάξει.", label: "Everything is fine.", greek: "Όλα" },
	{ id: "ola-efaga", context: "Τα έφαγα ___.", label: "I ate everything.", greek: "όλα" },
	{ id: "kapoios-porta", context: "___ χτυπάει την πόρτα.", label: "Someone is knocking at the door.", greek: "Κάποιος" },
	{ id: "kapoion-perimeno", context: "Περιμένω ___.", label: "I'm waiting for someone.", greek: "κάποιον" },
	{ id: "kanenas-xerei", context: "___ δεν ξέρει.", label: "No one knows.", greek: "Κανένας", acceptAlso: "Κανείς" },
	{ id: "kanenan-eida", context: "Δεν είδα ___.", label: "I didn't see anyone.", greek: "κανέναν" },
	{ id: "oloi-mazi", context: "___ μαζί!", label: "All together!", greek: "Όλοι" },
	{ id: "oloi-xeroun", context: "___ το ξέρουν.", label: "Everyone knows it.", greek: "Όλοι" },
	{ id: "kapou-kleidia", context: "Έχασα ___ τα κλειδιά μου.", label: "I've lost my keys somewhere.", greek: "κάπου" },
	{ id: "kapou-savvato", context: "Πάμε ___ το Σάββατο;", label: "Shall we go somewhere on Saturday?", greek: "κάπου" },
	{ id: "pouthena-piga", context: "Δεν πήγα ___.", label: "I didn't go anywhere.", greek: "πουθενά" },
	{ id: "pouthena-vrisko", context: "Δεν τα βρίσκω ___.", label: "I can't find them anywhere.", greek: "πουθενά" },
	{ id: "pantou-psachno", context: "Σε ψάχνω ___!", label: "I've been looking for you everywhere!", greek: "παντού" },
	{ id: "pantou-touristes", context: "Υπάρχουν τουρίστες ___.", label: "There are tourists everywhere.", greek: "παντού" },
	{ id: "kapote-londino", context: "___ έμενα στο Λονδίνο.", label: "At one time I lived in London.", greek: "Κάποτε" },
	{ id: "kapote-psaras", context: "___ ήταν ψαράς.", label: "He was once a fisherman.", greek: "Κάποτε" },
	{ id: "pote-kafe", context: "___ δεν πίνω καφέ.", label: "I never drink coffee.", greek: "Ποτέ" },
	{ id: "pote-xechaso", context: "Δεν θα το ξεχάσω ___.", label: "I'll never forget it.", greek: "ποτέ" },
	{ id: "panta-kafe", context: "___ πίνω καφέ το πρωί.", label: "I always drink coffee in the morning.", greek: "Πάντα" },
	{ id: "panta-edo", context: "Είναι ___ εδώ.", label: "He's always here.", greek: "πάντα" },
];
