import type { SimpleListItem } from "../../components/engines/deck";

/**
 * Weather with no word for it: κάνει with a noun, βρέχει and χιονίζει on their own, έχει
 * with a noun. It isn't raining is δεν βρέχει; there's no rain is δεν έχει βροχή.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "kryo", label: "It's cold.", greek: "Κάνει κρύο." },
	{ id: "zesti", label: "It's hot.", greek: "Κάνει ζέστη." },
	{ id: "kalos-kairos", label: "The weather's good.", greek: "Κάνει καλό καιρό.", acceptAlso: "Έχει καλό καιρό." },
	{ id: "vrechei", label: "It's raining.", greek: "Βρέχει." },
	{ id: "chionizei", label: "It's snowing.", greek: "Χιονίζει." },
	{ id: "ilios", label: "It's sunny.", greek: "Έχει ήλιο." },
	{ id: "vrochi-simera", label: "There's rain today.", greek: "Σήμερα έχει βροχή.", acceptAlso: "Έχει βροχή σήμερα." },
	{ id: "den-vrechei", label: "It isn't raining.", greek: "Δεν βρέχει.", acceptAlso: "Δε βρέχει." },
	{ id: "den-vrochi", label: "There's no rain.", greek: "Δεν έχει βροχή." },
	{ id: "zesti-simera", label: "It's hot today.", greek: "Σήμερα κάνει ζέστη.", acceptAlso: "Κάνει ζέστη σήμερα." },
	{ id: "poly-kryo", label: "It's very cold today.", greek: "Σήμερα κάνει πολύ κρύο.", acceptAlso: "Κάνει πολύ κρύο σήμερα." },
	{ id: "kryo-q", label: "Is it cold?", greek: "Κάνει κρύο;" },
	{ id: "vrechei-poly", label: "It's raining a lot.", greek: "Βρέχει πολύ." },
	{ id: "den-kryo", label: "It isn't cold.", greek: "Δεν κάνει κρύο." },
	{ id: "vouna", label: "Is it snowing in the mountains?", greek: "Χιονίζει στα βουνά;" },
	{ id: "cheimonas", label: "It's cold in winter.", greek: "Τον χειμώνα κάνει κρύο.", acceptAlso: "Το χειμώνα κάνει κρύο." },
	{ id: "kalokairi", label: "It's hot in summer.", greek: "Το καλοκαίρι κάνει ζέστη." },
	{ id: "ekane-kryo", label: "It was cold.", greek: "Έκανε κρύο." },
	{ id: "evrexe", label: "It rained.", greek: "Έβρεξε." },
	{ id: "tha-vrexei", label: "Will it rain tomorrow?", greek: "Θα βρέξει αύριο;" },
	{ id: "kakos-kairos", label: "The weather's bad.", greek: "Κάνει κακό καιρό.", acceptAlso: "Έχει κακό καιρό." },
	{ id: "den-ilios", label: "It isn't sunny.", greek: "Δεν έχει ήλιο." },
];
