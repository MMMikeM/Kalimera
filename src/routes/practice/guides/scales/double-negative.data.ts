import type { SimpleListItem } from "../../components/engines/deck";

/** Where the nothing-word can sit either first or after the verb, `acceptAlso` takes the other order. */
export const ITEMS: SimpleListItem[] = [
	{ id: "kano-tipota", label: "I don't do anything.", greek: "Δεν κάνω τίποτα." },
	{ id: "thelo-tipota", label: "I don't want anything.", greek: "Δεν θέλω τίποτα." },
	{ id: "vrika-tipota", label: "I didn't find anything.", greek: "Δεν βρήκα τίποτα." },
	{ id: "fagame-tipota", label: "We didn't eat anything.", greek: "Δεν φάγαμε τίποτα." },
	{ id: "eipa-tipota", label: "I didn't say anything.", greek: "Δεν είπα τίποτα." },
	{ id: "katalavaino-tipota", label: "I don't understand anything.", greek: "Δεν καταλαβαίνω τίποτα." },
	{ id: "egine-tipota", label: "Nothing happened.", greek: "Δεν έγινε τίποτα.", acceptAlso: "Τίποτα δεν έγινε." },
	{ id: "piga-pouthena", label: "I didn't go anywhere.", greek: "Δεν πήγα πουθενά." },
	{ id: "vrisko-pouthena", label: "I can't find it anywhere.", greek: "Δεν το βρίσκω πουθενά." },
	{ id: "simera-pouthena", label: "Today I'm not going anywhere.", greek: "Σήμερα δεν πάω πουθενά.", acceptAlso: "Δεν πάω πουθενά σήμερα." },
	{ id: "kanenas-xerei", label: "No one knows.", greek: "Κανένας δεν ξέρει.", acceptAlso: "Δεν ξέρει κανένας." },
	{ id: "kanenas-irthe", label: "No one came.", greek: "Κανένας δεν ήρθε.", acceptAlso: "Δεν ήρθε κανένας." },
	{ id: "xero-kanenan", label: "I don't know anyone.", greek: "Δεν ξέρω κανέναν." },
	{ id: "kanenan-pouthena", label: "I didn't see anyone anywhere.", greek: "Δεν είδα κανέναν πουθενά." },
	{ id: "pote-kafe", label: "I never drink coffee.", greek: "Ποτέ δεν πίνω καφέ.", acceptAlso: "Δεν πίνω ποτέ καφέ." },
	{ id: "pote-kreas", label: "He never eats meat.", greek: "Ποτέ δεν τρώει κρέας.", acceptAlso: "Δεν τρώει ποτέ κρέας." },
	{ id: "pote-vgainoume", label: "We never go out.", greek: "Ποτέ δεν βγαίνουμε.", acceptAlso: "Δεν βγαίνουμε ποτέ." },
	{ id: "pote-xechaso", label: "I'll never forget it.", greek: "Ποτέ δεν θα το ξεχάσω.", acceptAlso: "Δεν θα το ξεχάσω ποτέ." },
	{ id: "katholou-tileorasi", label: "I didn't watch any TV at all.", greek: "Δεν είδα καθόλου τηλεόραση." },
	{ id: "katholou-aresei", label: "I don't like it at all.", greek: "Δεν μου αρέσει καθόλου." },
	{ id: "katholou-kourasmenos", label: "I'm not tired at all.", greek: "Δεν είμαι καθόλου κουρασμένος." },
];
